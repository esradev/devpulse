import { Course } from '../types';

export const coursesData: Course[] = [
  {
    id: 'course-js-core',
    slug: 'modern-javascript',
    category: 'javascript',
    title: 'Modern JavaScript & Functional Patterns',
    shortDescription: 'Master ES6+, Array manipulation, closures, and asynchronous programming with hands-on challenges.',
    description: 'From zero to proficient in modern JavaScript. Learn how to wield higher-order functions like map, filter, and reduce, master object destructuring, write robust asynchronous code, and build real algorithmic thinking.',
    difficulty: 'beginner',
    estimatedHours: 12,
    iconName: 'javascript',
    color: 'from-amber-500 to-yellow-400',
    badgeTitle: 'JavaScript Master Craftsman',
    totalXp: 850,
    modules: [
      {
        id: 'mod-js-1',
        title: '1. Foundation & Array Mastery',
        description: 'Explore transformative array methods and functional pipelines.',
        lessons: [
          {
            id: 'les-js-1',
            title: 'Filter Even Numbers & Square',
            durationMinutes: 15,
            xpReward: 50,
            type: 'challenge',
            challenge: {
              id: 'chal-js-1',
              titleKey: 'filter_even_square',
              title: 'Double Even Numbers',
              description: 'Write a function `doubleEvens(numbers)` that takes an array of integers and returns a new array containing each even number multiplied by 2. Odd numbers should be omitted.',
              theory: 'The `filter` method creates a shallow copy of a portion of a given array, filtered down to just the elements from the given array that pass the test implemented by the provided function. The `map` method transforms elements one by one.\n\nExample:\n`[1, 2, 3, 4]` filtered by even becomes `[2, 4]`, and mapped by multiplying by 2 yields `[4, 8]`.',
              starterCode: `/**
 * Returns an array containing only the even numbers, doubled.
 * @param {number[]} numbers
 * @returns {number[]}
 */
function doubleEvens(numbers) {
  // Write your code here
  return numbers
    .filter(n => n % 2 === 0)
    .map(n => n * 2);
}`,
              language: 'javascript',
              solutionCode: `function doubleEvens(numbers) {
  return numbers.filter(n => n % 2 === 0).map(n => n * 2);
}`,
              testCases: [
                {
                  id: 'tc-1',
                  description: 'Should double even numbers in [1, 2, 3, 4, 5, 6]',
                  input: '[1, 2, 3, 4, 5, 6]',
                  expectedOutput: '[4, 8, 12]',
                },
                {
                  id: 'tc-2',
                  description: 'Should return empty array when all numbers are odd [1, 3, 5]',
                  input: '[1, 3, 5]',
                  expectedOutput: '[]',
                },
                {
                  id: 'tc-3',
                  description: 'Should handle negatives [-4, -3, 0, 7]',
                  input: '[-4, -3, 0, 7]',
                  expectedOutput: '[-8, 0]',
                },
              ],
              hints: [
                'Remember that an even number satisfies `num % 2 === 0`.',
                'Chain `.filter(n => ...)` with `.map(n => n * 2)`.',
                'Return the resulting chained array directly.',
              ],
              xpReward: 50,
            },
          },
          {
            id: 'les-js-2',
            title: 'Aggregate Totals with Reduce',
            durationMinutes: 20,
            xpReward: 60,
            type: 'challenge',
            challenge: {
              id: 'chal-js-2',
              titleKey: 'calculate_cart_total',
              title: 'Shopping Cart Total with Discount',
              description: 'Write a function `calculateTotal(items, discountRate)` that calculates the sum of item prices and applies a discount rate percentage. If `discountRate` is 0.10 (10%), subtract 10% from the subtotal. Round to 2 decimal places.',
              theory: '`Array.prototype.reduce()` executes a user-supplied "reducer" callback function on each element of the array, in order, passing in the return value from the calculation on the preceding element.\n\nFormula:\n`subtotal = items.reduce((acc, curr) => acc + curr.price, 0)`\n`final = subtotal * (1 - discountRate)`',
              starterCode: `/**
 * Calculates cart total after applying discount rate.
 * @param {{ name: string, price: number }[]} items
 * @param {number} discountRate - e.g. 0.15 for 15%
 * @returns {number}
 */
function calculateTotal(items, discountRate = 0) {
  // Your implementation here
  const subtotal = items.reduce((sum, item) => sum + item.price, 0);
  const total = subtotal * (1 - discountRate);
  return Math.round(total * 100) / 100;
}`,
              language: 'javascript',
              solutionCode: `function calculateTotal(items, discountRate = 0) {
  const subtotal = items.reduce((sum, item) => sum + item.price, 0);
  return Math.round(subtotal * (1 - discountRate) * 100) / 100;
}`,
              testCases: [
                {
                  id: 'tc-cart-1',
                  description: 'Calculates standard cart with 10% discount',
                  input: '[{ name: "Book", price: 20 }, { name: "Pen", price: 10 }], 0.1',
                  expectedOutput: '27',
                },
                {
                  id: 'tc-cart-2',
                  description: 'Zero discount rate returns full sum',
                  input: '[{ name: "Coffee", price: 15.5 }, { name: "Mug", price: 12.5 }], 0',
                  expectedOutput: '28',
                },
                {
                  id: 'tc-cart-3',
                  description: 'Empty cart returns 0',
                  input: '[], 0.2',
                  expectedOutput: '0',
                },
              ],
              hints: [
                'First, sum the prices: `items.reduce((sum, item) => sum + item.price, 0)`.',
                'Then multiply by `(1 - discountRate)`.',
                'Round with `Math.round(val * 100) / 100`.',
              ],
              xpReward: 60,
            },
          },
        ],
      },
      {
        id: 'mod-js-2',
        title: '2. String & Pattern Algorithms',
        description: 'String manipulation, palindromes, and frequency maps.',
        lessons: [
          {
            id: 'les-js-3',
            title: 'Is It a Palindrome?',
            durationMinutes: 15,
            xpReward: 55,
            type: 'challenge',
            challenge: {
              id: 'chal-js-3',
              titleKey: 'is_palindrome',
              title: 'Check Palindrome Ignoring Non-Alphanumerics',
              description: 'Write a function `isPalindrome(str)` that returns `true` if a string is a palindrome (reads identical forwards and backwards), ignoring casing and all non-alphanumeric characters (like spaces and punctuation).',
              theory: 'A palindrome reads the same backwards and forwards (e.g., "racecar" or "A man, a plan, a canal: Panama"). Regular expression `/[^a-z0-9]/g` can clean unwanted characters.',
              starterCode: `/**
 * Determines if string is palindrome ignoring non-alphanumerics.
 * @param {string} str
 * @returns {boolean}
 */
function isPalindrome(str) {
  // Clean string: lowercase and remove non-alphanumeric characters
  const clean = str.toLowerCase().replace(/[^a-z0-9]/g, '');
  return clean === clean.split('').reverse().join('');
}`,
              language: 'javascript',
              solutionCode: `function isPalindrome(str) {
  const clean = str.toLowerCase().replace(/[^a-z0-9]/g, '');
  return clean === clean.split('').reverse().join('');
}`,
              testCases: [
                {
                  id: 'tc-p-1',
                  description: 'Standard single word palindrome "racecar"',
                  input: '"racecar"',
                  expectedOutput: 'true',
                },
                {
                  id: 'tc-p-2',
                  description: 'Complex sentence with spaces and punctuation',
                  input: '"A man, a plan, a canal: Panama"',
                  expectedOutput: 'true',
                },
                {
                  id: 'tc-p-3',
                  description: 'Non-palindrome string "hello world"',
                  input: '"hello world"',
                  expectedOutput: 'false',
                },
              ],
              hints: [
                'Clean the string first using `str.toLowerCase().replace(/[^a-z0-9]/g, \'\')`.',
                'Reverse the cleaned string with `.split(\'\').reverse().join(\'\')`.',
                'Compare if original cleaned equals reversed cleaned.',
              ],
              xpReward: 55,
            },
          },
        ],
      },
    ],
  },
  {
    id: 'course-python-core',
    slug: 'python-algorithms',
    category: 'python',
    title: 'Python Essentials & Data Engineering',
    shortDescription: 'Master idiomatic Python 3, list comprehensions, dictionary counters, and data structures.',
    description: 'Learn idiomatic Python used by modern software engineers and data scientists. Master lists, tuples, dictionaries, set operations, list comprehensions, and clean algorithmic problem-solving.',
    difficulty: 'beginner',
    estimatedHours: 14,
    iconName: 'python',
    color: 'from-blue-500 to-emerald-400',
    badgeTitle: 'Pythonista Laureate',
    totalXp: 920,
    modules: [
      {
        id: 'mod-py-1',
        title: '1. Lists & Dictionaries',
        description: 'Frequency mapping, word counts, and collection aggregations.',
        lessons: [
          {
            id: 'les-py-1',
            title: 'Word Frequency Counter',
            durationMinutes: 20,
            xpReward: 60,
            type: 'challenge',
            challenge: {
              id: 'chal-py-1',
              titleKey: 'word_frequency',
              title: 'Word Frequency Map',
              description: 'Write a function `count_words(sentence)` that accepts a sentence string and returns a dictionary/map of each lowercased word and its occurrence count. Punctuation should be stripped.',
              theory: 'In Python, dictionaries provide $O(1)$ average time lookups. You can split words using `.split()`, strip punctuation, and tally counts using a dictionary or `collections.Counter`.',
              starterCode: `/**
 * Python-style Word Frequency Counter
 * In our arena, write standard logic that transforms sentence into frequency object.
 * @param {string} sentence
 * @returns {Record<string, number>}
 */
function count_words(sentence) {
  const words = sentence.toLowerCase().replace(/[^a-z0-9\\s]/g, '').trim().split(/\\s+/);
  const freq = {};
  for (const word of words) {
    if (!word) continue;
    freq[word] = (freq[word] || 0) + 1;
  }
  return freq;
}`,
              language: 'python',
              solutionCode: `function count_words(sentence) {
  const words = sentence.toLowerCase().replace(/[^a-z0-9\\s]/g, '').trim().split(/\\s+/);
  const freq = {};
  for (const word of words) {
    if (!word) continue;
    freq[word] = (freq[word] || 0) + 1;
  }
  return freq;
}`,
              testCases: [
                {
                  id: 'tc-w-1',
                  description: 'Counts repeated words in "the cat sat on the mat"',
                  input: '"the cat sat on the mat"',
                  expectedOutput: '{"cat":1,"mat":1,"on":1,"sat":1,"the":2}',
                },
                {
                  id: 'tc-w-2',
                  description: 'Ignores casing "Python python PYTHON"',
                  input: '"Python python PYTHON"',
                  expectedOutput: '{"python":3}',
                },
              ],
              hints: [
                'Convert the entire string to lowercase first.',
                'Split by whitespace into individual tokens.',
                'Increment count in the result map for each token.',
              ],
              xpReward: 60,
            },
          },
          {
            id: 'les-py-2',
            title: 'List Comprehension & Filtering',
            durationMinutes: 15,
            xpReward: 50,
            type: 'challenge',
            challenge: {
              id: 'chal-py-2',
              titleKey: 'find_primes',
              title: 'Prime Number Filter',
              description: 'Write a function `filter_primes(numbers)` that returns only prime numbers from a given list of positive integers.',
              theory: 'A prime number is a natural number greater than 1 that has no positive divisors other than 1 and itself.',
              starterCode: `/**
 * Returns an array of prime numbers from the input.
 * @param {number[]} numbers
 * @returns {number[]}
 */
function filter_primes(numbers) {
  function isPrime(n) {
    if (n < 2) return false;
    for (let i = 2; i <= Math.sqrt(n); i++) {
      if (n % i === 0) return false;
    }
    return true;
  }

  return numbers.filter(isPrime);
}`,
              language: 'python',
              solutionCode: `function filter_primes(numbers) {
  function isPrime(n) {
    if (n < 2) return false;
    for (let i = 2; i <= Math.sqrt(n); i++) {
      if (n % i === 0) return false;
    }
    return true;
  }
  return numbers.filter(isPrime);
}`,
              testCases: [
                {
                  id: 'tc-pr-1',
                  description: 'Extracts primes from [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]',
                  input: '[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]',
                  expectedOutput: '[2, 3, 5, 7]',
                },
                {
                  id: 'tc-pr-2',
                  description: 'Handles primes with large numbers [11, 13, 15, 17, 19, 21]',
                  input: '[11, 13, 15, 17, 19, 21]',
                  expectedOutput: '[11, 13, 17, 19]',
                },
              ],
              hints: [
                'Numbers less than 2 are not prime.',
                'Check divisibility from 2 up to `sqrt(n)`.',
              ],
              xpReward: 50,
            },
          },
        ],
      },
    ],
  },
  {
    id: 'course-ts-mastery',
    slug: 'typescript-mastery',
    category: 'typescript',
    title: 'TypeScript Type Wizardry & Contracts',
    shortDescription: 'Master Generics, Union Discriminations, Mapped Types, and Type Narrowing.',
    description: 'Elevate your JavaScript codebases with bulletproof static typing. Learn how to construct generic data stores, define strict discriminated unions, write custom type guards, and eliminate runtime bugs before they happen.',
    difficulty: 'intermediate',
    estimatedHours: 16,
    iconName: 'typescript',
    color: 'from-blue-600 to-indigo-500',
    badgeTitle: 'TypeScript Type Architect',
    totalXp: 980,
    modules: [
      {
        id: 'mod-ts-1',
        title: '1. Generics & Data Structures',
        description: 'Design type-safe collections, containers, and transformers.',
        lessons: [
          {
            id: 'les-ts-1',
            title: 'Generic Key-Value Inverter',
            durationMinutes: 25,
            xpReward: 70,
            type: 'challenge',
            challenge: {
              id: 'chal-ts-1',
              titleKey: 'invert_object',
              title: 'Invert Object Keys and Values',
              description: 'Write a function `invertObject(obj)` that swaps keys and values of a record. If `{ a: "x", b: "y" }` is passed, it returns `{ x: "a", y: "b" }`.',
              theory: 'In TypeScript, `Record<K, V>` represents a dictionary. Swapping keys requires iterating over entries and constructing the inverted record with proper type safety.',
              starterCode: `/**
 * Inverts keys and values of a given record.
 * @param {Record<string, string>} obj
 * @returns {Record<string, string>}
 */
function invertObject(obj) {
  const result = {};
  for (const [key, value] of Object.entries(obj)) {
    result[value] = key;
  }
  return result;
}`,
              language: 'typescript',
              solutionCode: `function invertObject(obj) {
  return Object.entries(obj).reduce((acc, [k, v]) => {
    acc[v] = k;
    return acc;
  }, {});
}`,
              testCases: [
                {
                  id: 'tc-inv-1',
                  description: 'Swaps basic key-value strings',
                  input: '{"name": "dev", "role": "admin"}',
                  expectedOutput: '{"admin":"role","dev":"name"}',
                },
                {
                  id: 'tc-inv-2',
                  description: 'Handles empty object',
                  input: '{}',
                  expectedOutput: '{}',
                },
              ],
              hints: [
                'Iterate through entries using `Object.entries(obj)`.',
                'Assign `inverted[value] = key`.',
              ],
              xpReward: 70,
            },
          },
          {
            id: 'les-ts-2',
            title: 'Deep Flatten Nested Arrays',
            durationMinutes: 20,
            xpReward: 65,
            type: 'challenge',
            challenge: {
              id: 'chal-ts-2',
              titleKey: 'flatten_array',
              title: 'Deep Flatten Arbitrary Nesting',
              description: 'Write a function `deepFlatten(arr)` that flattens an array of arbitrary depth into a single linear array.',
              theory: 'Recursion and array spreading or `reduce` allow flattening multi-dimensional arrays of any nested depth.',
              starterCode: `/**
 * Flattens nested array to 1D array.
 * @param {any[]} arr
 * @returns {any[]}
 */
function deepFlatten(arr) {
  return arr.reduce((flat, item) => {
    return flat.concat(Array.isArray(item) ? deepFlatten(item) : item);
  }, []);
}`,
              language: 'typescript',
              solutionCode: `function deepFlatten(arr) {
  return arr.reduce((acc, val) => Array.isArray(val) ? acc.concat(deepFlatten(val)) : acc.concat(val), []);
}`,
              testCases: [
                {
                  id: 'tc-fl-1',
                  description: 'Flattens multiple nested levels [1, [2, [3, 4], 5]]',
                  input: '[1, [2, [3, 4], 5]]',
                  expectedOutput: '[1, 2, 3, 4, 5]',
                },
                {
                  id: 'tc-fl-2',
                  description: 'Handles already flat array [10, 20]',
                  input: '[10, 20]',
                  expectedOutput: '[10, 20]',
                },
              ],
              hints: [
                'Check if element is an array using `Array.isArray(item)`.',
                'If it is an array, recursively call `deepFlatten(item)`.',
              ],
              xpReward: 65,
            },
          },
        ],
      },
    ],
  },
  {
    id: 'course-sql-queries',
    slug: 'sql-mastery',
    category: 'sql',
    title: 'SQL & Relational Database Mastery',
    shortDescription: 'Write high-performance SELECT, JOIN, AGGREGATE, and window query solutions.',
    description: 'Relational data querying is an indispensable skill for software engineering. Master database schema navigation, joining disparate tables, aggregating metrics, filtering groups with HAVING, and optimizing data retrieval.',
    difficulty: 'beginner',
    estimatedHours: 10,
    iconName: 'sql',
    color: 'from-cyan-500 to-blue-600',
    badgeTitle: 'Relational Data Architect',
    totalXp: 780,
    modules: [
      {
        id: 'mod-sql-1',
        title: '1. Filtering & Aggregations',
        description: 'GROUP BY, HAVING, and multi-condition querying.',
        lessons: [
          {
            id: 'les-sql-1',
            title: 'Top Performing Categories',
            durationMinutes: 15,
            xpReward: 50,
            type: 'challenge',
            challenge: {
              id: 'chal-sql-1',
              titleKey: 'sql_top_categories',
              title: 'Aggregate Category Sales Above Threshold',
              description: 'Simulate the SQL query `SELECT category, SUM(amount) as total FROM sales GROUP BY category HAVING total >= 500` by writing a function `aggregateSales(sales, threshold)`. Return an array of objects `{ category, total }` sorted by total descending.',
              theory: 'SQL `GROUP BY` groups rows sharing identical category values, and `HAVING` filters groups based on aggregate results (such as `SUM(amount) >= 500`).',
              starterCode: `/**
 * Simulates SQL GROUP BY and HAVING.
 * @param {{ category: string, amount: number }[]} sales
 * @param {number} threshold
 * @returns {{ category: string, total: number }[]}
 */
function aggregateSales(sales, threshold) {
  const map = {};
  for (const s of sales) {
    map[s.category] = (map[s.category] || 0) + s.amount;
  }
  const result = [];
  for (const [cat, total] of Object.entries(map)) {
    if (total >= threshold) {
      result.push({ category: cat, total });
    }
  }
  return result.sort((a, b) => b.total - a.total);
}`,
              language: 'sql',
              solutionCode: `function aggregateSales(sales, threshold) {
  const map = {};
  for (const s of sales) {
    map[s.category] = (map[s.category] || 0) + s.amount;
  }
  return Object.entries(map)
    .filter(([_, total]) => total >= threshold)
    .map(([category, total]) => ({ category, total }))
    .sort((a, b) => b.total - a.total);
}`,
              testCases: [
                {
                  id: 'tc-sql-1',
                  description: 'Aggregates sales with threshold 500',
                  input: '[{ "category": "Tech", "amount": 300 }, { "category": "Tech", "amount": 400 }, { "category": "Books", "amount": 150 }], 500',
                  expectedOutput: '[{"category":"Tech","total":700}]',
                },
                {
                  id: 'tc-sql-2',
                  description: 'Multiple matching categories sorted descending',
                  input: '[{ "category": "A", "amount": 200 }, { "category": "B", "amount": 400 }, { "category": "A", "amount": 300 }], 400',
                  expectedOutput: '[{"category":"A","total":500},{"category":"B","total":400}]',
                },
              ],
              hints: [
                'Group amounts by accumulating in a map object.',
                'Filter keys where accumulated total is >= threshold.',
                'Sort final results by total descending.',
              ],
              xpReward: 50,
            },
          },
        ],
      },
    ],
  },
  {
    id: 'course-go-essentials',
    slug: 'golang-essentials',
    category: 'go',
    title: 'Go (Golang) Systems & High Performance',
    shortDescription: 'Write concise, concurrent, and robust backend microservices with Go idiomatic patterns.',
    description: 'Learn Google Go’s philosophy of simplicity, speed, and safety. Understand structs, slices, error handling without exceptions, and fast algorithms.',
    difficulty: 'intermediate',
    estimatedHours: 15,
    iconName: 'go',
    color: 'from-cyan-400 to-teal-500',
    badgeTitle: 'Gopher Laureate',
    totalXp: 890,
    modules: [
      {
        id: 'mod-go-1',
        title: '1. Slices & Memory Layout',
        description: 'Slice chunking, rotations, and clean memory manipulation.',
        lessons: [
          {
            id: 'les-go-1',
            title: 'Slice Chunking Algorithm',
            durationMinutes: 20,
            xpReward: 55,
            type: 'challenge',
            challenge: {
              id: 'chal-go-1',
              titleKey: 'chunk_slice',
              title: 'Divide Slice into Equal Size Chunks',
              description: 'Write a function `chunkArray(array, size)` that splits an array into sub-arrays of maximum length `size`. The final chunk may contain fewer elements.',
              theory: 'In Go, slicing allows sub-array extraction using `slice[start:end]`. Chunking is ubiquitous for batching database calls and concurrent worker pools.',
              starterCode: `/**
 * Slices array into chunks of given size.
 * @param {any[]} array
 * @param {number} size
 * @returns {any[][]}
 */
function chunkArray(array, size) {
  if (size <= 0) return [];
  const chunks = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
}`,
              language: 'go',
              solutionCode: `function chunkArray(array, size) {
  const result = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
}`,
              testCases: [
                {
                  id: 'tc-go-1',
                  description: 'Chunks [1, 2, 3, 4, 5] by size 2',
                  input: '[1, 2, 3, 4, 5], 2',
                  expectedOutput: '[[1,2],[3,4],[5]]',
                },
                {
                  id: 'tc-go-2',
                  description: 'Exact multiples [10, 20, 30, 40] by size 2',
                  input: '[10, 20, 30, 40], 2',
                  expectedOutput: '[[10,20],[30,40]]',
                },
              ],
              hints: [
                'Loop with `i += size`.',
                'Use `array.slice(i, i + size)`.',
              ],
              xpReward: 55,
            },
          },
        ],
      },
    ],
  },
];
