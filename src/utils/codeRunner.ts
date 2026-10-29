import { TestCase } from '../types';

export interface TestResultItem {
  testCaseId: string;
  description: string;
  input: string;
  expectedOutput: string;
  actualOutput: string;
  passed: boolean;
  errorMessage?: string;
  durationMs: number;
}

export interface RunResults {
  allPassed: boolean;
  results: TestResultItem[];
  logs: string[];
  totalDurationMs: number;
  syntaxError?: string;
}

export function executeCodeWithTests(
  code: string,
  testCases: TestCase[],
  _language: string
): Promise<RunResults> {
  return new Promise((resolve) => {
    const logs: string[] = [];
    const testResults: TestResultItem[] = [];
    const startTime = performance.now();

    // Prepare sandbox console
    const originalLog = console.log;
    const capturedLogs: string[] = [];
    const mockConsole = {
      log: (...args: any[]) => {
        const formatted = args
          .map((a) => (typeof a === 'object' ? JSON.stringify(a) : String(a)))
          .join(' ');
        capturedLogs.push(formatted);
      },
      warn: (...args: any[]) => {
        capturedLogs.push('[WARN] ' + args.map((a) => String(a)).join(' '));
      },
      error: (...args: any[]) => {
        capturedLogs.push('[ERROR] ' + args.map((a) => String(a)).join(' '));
      },
    };

    try {
      // Find main function name from code
      const fnMatch = code.match(/function\s+([a-zA-Z0-9_$]+)\s*\(/);
      const constFnMatch = code.match(/(?:const|let|var)\s+([a-zA-Z0-9_$]+)\s*=\s*(?:function|\([^)]*\)\s*=>)/);
      const functionName = (fnMatch && fnMatch[1]) || (constFnMatch && constFnMatch[1]);

      if (!functionName) {
        resolve({
          allPassed: false,
          results: [],
          logs: ['Error: No main function definition detected. Please define your function properly.'],
          totalDurationMs: 0,
          syntaxError: 'No function definition found in code.',
        });
        return;
      }

      // Build evaluated context
      const wrappedFunction = new Function(
        'console',
        `
        ${code}
        if (typeof ${functionName} !== 'function') {
          throw new Error("${functionName} is not defined as a function");
        }
        return {
          fn: ${functionName}
        };
      `
      );

      const runner = wrappedFunction(mockConsole);
      const userFn = runner.fn;

      for (const tc of testCases) {
        const testStart = performance.now();
        let passed = false;
        let actualStr = '';
        let errorMsg: string | undefined;

        try {
          // Parse inputs
          // Wrap input in an array to pass as arguments: e.g. "[1, 2], 10" -> Function arguments
          const parsedArgs = new Function(`return [${tc.input}];`)();
          const rawActual = userFn(...parsedArgs);

          if (rawActual === undefined) {
            actualStr = 'undefined';
          } else {
            actualStr = JSON.stringify(rawActual);
          }

          // Normalize expected
          let normalizedExpected = tc.expectedOutput.trim();
          try {
            // Check if expected is valid JSON
            const parsedExpected = JSON.parse(normalizedExpected);
            normalizedExpected = JSON.stringify(parsedExpected);
          } catch {
            // Keep as string
          }

          // Check equality
          if (actualStr === normalizedExpected) {
            passed = true;
          } else {
            // Also check string conversion for numbers or booleans
            if (String(rawActual).trim() === tc.expectedOutput.trim()) {
              passed = true;
            }
          }
        } catch (err: any) {
          passed = false;
          errorMsg = err.message || String(err);
          actualStr = `Error: ${errorMsg}`;
        }

        const duration = Math.round((performance.now() - testStart) * 100) / 100;
        testResults.push({
          testCaseId: tc.id,
          description: tc.description,
          input: tc.input,
          expectedOutput: tc.expectedOutput,
          actualOutput: actualStr,
          passed,
          errorMessage: errorMsg,
          durationMs: duration,
        });
      }

      const allPassed = testResults.length > 0 && testResults.every((t) => t.passed);
      const totalDuration = Math.round((performance.now() - startTime) * 100) / 100;

      resolve({
        allPassed,
        results: testResults,
        logs: capturedLogs,
        totalDurationMs: totalDuration,
      });
    } catch (syntaxErr: any) {
      resolve({
        allPassed: false,
        results: [],
        logs: capturedLogs.concat([`Syntax/Execution Error: ${syntaxErr.message}`]),
        totalDurationMs: Math.round(performance.now() - startTime),
        syntaxError: syntaxErr.message,
      });
    }
  });
}
