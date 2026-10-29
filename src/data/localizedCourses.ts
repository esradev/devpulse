import { Course, Language } from '../types';
import { coursesData } from './courses';

// Persian overrides for courses, modules, lessons, challenges
const persianCourseData: Course[] = [
  {
    id: 'course-js-core',
    slug: 'modern-javascript',
    category: 'javascript',
    title: 'جاوااسکریپت مدرن و الگوهای تابعی (ES6+)',
    shortDescription: 'تسلط بر جاوااسکریپت نوین، متدهای تابعی آرایه‌ها، بسته‌ها (Closures) و برنامه‌نویسی ناهمگام با چالش‌های تعاملی.',
    description: 'از سطح صفر تا تسلط حرفه‌ای در جاوااسکریپت مدرن. یاد بگیرید چگونه از توابع مرتبه بالا مانند map ،filter و reduce استفاده کنید، تخریب اشیا (destructuring) را مسلط شوید، و تفکر الگوریتمی اصولی برای حل مسائل توسعه دهید.',
    difficulty: 'beginner',
    estimatedHours: 12,
    iconName: 'javascript',
    color: 'from-amber-500 to-yellow-400',
    badgeTitle: 'استاد صنعت‌گر جاوااسکریپت',
    totalXp: 850,
    modules: [
      {
        id: 'mod-js-1',
        title: '۱. مبانی و تسلط بر خط لوله آرایه‌ها',
        description: 'بررسی متدهای تحلیلی آرایه و ساخت پایپ‌لاین‌های تابعی تمیز.',
        lessons: [
          {
            id: 'les-js-1',
            title: 'فیلتر کردن اعداد زوج و دو برابر کردن آنها',
            durationMinutes: 15,
            xpReward: 50,
            type: 'challenge',
            challenge: {
              id: 'chal-js-1',
              titleKey: 'filter_even_square',
              title: 'دو برابر کردن اعداد زوج',
              description: 'تابعی به نام `doubleEvens(numbers)` بنویسید که آرایه‌ای از اعداد صحیح را دریافت کرده و آرایه جدیدی برگرداند که تنها شامل اعداد زوج باشد و هر یک در ۲ ضرب شده باشند. اعداد فرد باید به کلی حذف شوند.',
              theory: 'متد `filter` یک کپی از عناصر آرایه می‌سازد که شرط تابع تست را ارضا کنند. متد `map` نیز هر عضو آرایه را به مقدار جدیدی تبدیل می‌کند.\n\nمثال:\nورودی `[1, 2, 3, 4]` پس از فیلتر زوج‌ها به `[2, 4]` و پس از دو برابر شدن با `map` به `[4, 8]` تبدیل می‌شود.',
              starterCode: `/**
 * آرایه‌ای شامل اعداد زوج، دو برابر شده را برمی‌گرداند.
 * @param {number[]} numbers
 * @returns {number[]}
 */
function doubleEvens(numbers) {
  // کد خود را اینجا بنویسید
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
                  description: 'باید اعداد زوج را در [1, 2, 3, 4, 5, 6] دو برابر کند',
                  input: '[1, 2, 3, 4, 5, 6]',
                  expectedOutput: '[4, 8, 12]',
                },
                {
                  id: 'tc-2',
                  description: 'در صورت فرد بودن تمام اعداد [1, 3, 5] باید آرایه خالی برگرداند',
                  input: '[1, 3, 5]',
                  expectedOutput: '[]',
                },
                {
                  id: 'tc-3',
                  description: 'پشتیبانی از اعداد منفی و صفر [-4, -3, 0, 7]',
                  input: '[-4, -3, 0, 7]',
                  expectedOutput: '[-8, 0]',
                },
              ],
              hints: [
                'به یاد داشته باشید که شرط زوج بودن یک عدد num % 2 === 0 است.',
                'می‌توانید متد .filter(n => ...) را مستقیماً با .map(n => n * 2) زنجیره‌بندی کنید.',
                'آرایه حاصل را با return برگردانید.',
              ],
              xpReward: 50,
            },
          },
          {
            id: 'les-js-2',
            title: 'محاسبه مجموع سبد خرید با متد Reduce',
            durationMinutes: 20,
            xpReward: 60,
            type: 'challenge',
            challenge: {
              id: 'chal-js-2',
              titleKey: 'calculate_cart_total',
              title: 'مجموع سبد خرید با اعمال درصد تخفیف',
              description: 'تابعی به نام `calculateTotal(items, discountRate)` بنویسید که جمع قیمت اقلام سبد خرید را محاسبه کرده و درصد تخفیف را روی آن اعمال کند. در صورت وجود تخفیف 0.10 (۱۰ درصد)، ۱۰ درصد از مبلغ کسر شود و خروجی تا ۲ رقم اعشار گرد شود.',
              theory: 'متد `Array.prototype.reduce()` روی تمام عناصر آرایه به نوبت اجرا شده و یک مقدار انباشتگر (accumulator) را جمع‌بندی می‌کند.\n\nفرمول:\n`subtotal = items.reduce((acc, curr) => acc + curr.price, 0)`\n`final = subtotal * (1 - discountRate)`',
              starterCode: `/**
 * محاسبه مجموع نهایی اقلام با اعمال تخفیف.
 * @param {{ name: string, price: number }[]} items
 * @param {number} discountRate - به عنوان مثال 0.15 برای ۱۵ درصد
 * @returns {number}
 */
function calculateTotal(items, discountRate = 0) {
  // پیاده‌سازی خود را اینجا قرار دهید
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
                  description: 'محاسبه سبد خرید استاندارد با ۱۰ درصد تخفیف',
                  input: '[{ name: "Book", price: 20 }, { name: "Pen", price: 10 }], 0.1',
                  expectedOutput: '27',
                },
                {
                  id: 'tc-cart-2',
                  description: 'تخفیف صفر درصد باید کل مجموع را برگرداند',
                  input: '[{ name: "Coffee", price: 15.5 }, { name: "Mug", price: 12.5 }], 0',
                  expectedOutput: '28',
                },
                {
                  id: 'tc-cart-3',
                  description: 'سبد خرید خالی باید صفر برگرداند',
                  input: '[], 0.2',
                  expectedOutput: '0',
                },
              ],
              hints: [
                'ابتدا قیمت‌ها را با متد reduce جمع کنید: items.reduce((sum, item) => sum + item.price, 0)',
                'سپس نتیجه را در (1 - discountRate) ضرب کنید.',
                'برای گرد کردن از Math.round(val * 100) / 100 استفاده کنید.',
              ],
              xpReward: 60,
            },
          },
        ],
      },
      {
        id: 'mod-js-2',
        title: '۲. الگوریتم‌های پردازش رشته و الگوها',
        description: 'دستکاری رشته‌ها، تقارن کلمات (پالیندروم) و نقشه‌های فراوانی.',
        lessons: [
          {
            id: 'les-js-3',
            title: 'آیا این عبارت متقارن (پالیندروم) است؟',
            durationMinutes: 15,
            xpReward: 55,
            type: 'challenge',
            challenge: {
              id: 'chal-js-3',
              titleKey: 'is_palindrome',
              title: 'بررسی پالیندروم بدون در نظر گرفتن فاصله و نشانه‌ها',
              description: 'تابعی به نام `isPalindrome(str)` بنویسید که اگر رشته ورودی یک پالیندروم باشد (از چپ به راست و راست به چپ یکسان خوانده شود) مقدار `true` و در غیر این صورت `false` برگرداند. حروف بزرگ/کوچک و علامت‌های نگارشی باید نادیده گرفته شوند.',
              theory: 'یک پالیندروم مانند "racecar" از دو طرف یکسان خوانده می‌شود. با عبارت منظم `/[^a-z0-9]/g` می‌توانید نویسه‌های اضافی را پاکسازی کنید.',
              starterCode: `/**
 * بررسی متقارن بودن رشته.
 * @param {string} str
 * @returns {boolean}
 */
function isPalindrome(str) {
  // پاکسازی رشته و مقایسه برعکس آن
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
                  description: 'کلمه پالیندروم استاندارد "racecar"',
                  input: '"racecar"',
                  expectedOutput: 'true',
                },
                {
                  id: 'tc-p-2',
                  description: 'جمله پیچیده شامل فاصله و علائم نگارشی',
                  input: '"A man, a plan, a canal: Panama"',
                  expectedOutput: 'true',
                },
                {
                  id: 'tc-p-3',
                  description: 'رشته غیر پالیندروم "hello world"',
                  input: '"hello world"',
                  expectedOutput: 'false',
                },
              ],
              hints: [
                'ابتدا تمام حروف را با toLowerCase کوچک کرده و نشانه‌های غیرحروفی را حذف کنید.',
                'رشته پاکسازی شده را با split, reverse و join معکوس کنید.',
                'رشته اصلی تمیز را با معکوس آن مقایسه نمایید.',
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
    title: 'اصول پایتون و مهندسی داده‌ها',
    shortDescription: 'تسلط بر پایتون ۳ اصولی، لیست‌های فشرده (Comprehensions)، دیکشنری‌ها و ساختار داده‌ها.',
    description: 'پایتون را همانند مهندسان داده و توسعه‌دهندگان بک‌اند حرفه‌ای بیاموزید. تسلط بر لیست‌ها، تاپل‌ها، دیکشنری‌ها، مجموعه‌ها و حل مسائل الگوریتمی تمیز.',
    difficulty: 'beginner',
    estimatedHours: 14,
    iconName: 'python',
    color: 'from-blue-500 to-emerald-400',
    badgeTitle: 'دانش‌آموخته برتر پایتون',
    totalXp: 920,
    modules: [
      {
        id: 'mod-py-1',
        title: '۱. لیست‌ها و دیکشنری‌ها',
        description: 'شمارش فراوانی کلمات و کار با مجموعه‌ها.',
        lessons: [
          {
            id: 'les-py-1',
            title: 'شمارنده تکرار کلمات در متن',
            durationMinutes: 20,
            xpReward: 60,
            type: 'challenge',
            challenge: {
              id: 'chal-py-1',
              titleKey: 'word_frequency',
              title: 'نقشه فراوانی کلمات',
              description: 'تابعی به نام `count_words(sentence)` بنویسید که یک جمله متنی را دریافت کرده و یک دیکشنری/شیء شامل هر کلمه (با حروف کوچک) و تعداد دفعات تکرار آن در جمله برگرداند. علائم نگارشی باید حذف شوند.',
              theory: 'در پایتون، دیکشنری‌ها زمان دسترسی O(1) ارائه می‌دهند. کلمات با جداکننده فاصله تفکیک شده و شمارش آن‌ها در نقشه ذخیره می‌گردد.',
              starterCode: `/**
 * شمارش فراوانی کلمات به سبک پایتون
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
                  description: 'شمارش کلمات تکراری در "the cat sat on the mat"',
                  input: '"the cat sat on the mat"',
                  expectedOutput: '{"cat":1,"mat":1,"on":1,"sat":1,"the":2}',
                },
                {
                  id: 'tc-w-2',
                  description: 'نادیده گرفتن حروف بزرگ و کوچک در "Python python PYTHON"',
                  input: '"Python python PYTHON"',
                  expectedOutput: '{"python":3}',
                },
              ],
              hints: [
                'متن را به حروف کوچک تبدیل کرده و نشانه‌ها را پاک کنید.',
                'کلمات را بر اساس فاصله split کنید.',
                'تعداد تکرار هر کلمه را در دیکشنری نتیجه اضافه نمایید.',
              ],
              xpReward: 60,
            },
          },
          {
            id: 'les-py-2',
            title: 'فیلتر کردن اعداد اول با لیست فشرده',
            durationMinutes: 15,
            xpReward: 50,
            type: 'challenge',
            challenge: {
              id: 'chal-py-2',
              titleKey: 'find_primes',
              title: 'فیلتر اعداد اول',
              description: 'تابعی به نام `filter_primes(numbers)` بنویسید که تنها اعداد اول موجود در یک لیست از اعداد صحیح مثبت را استخراج و برگرداند.',
              theory: 'عدد اول عددی طبیعی و بزرگتر از ۱ است که به جز ۱ و خودش بر هیچ عدد دیگری بخش‌پذیر نباشد.',
              starterCode: `/**
 * استخراج اعداد اول از آرایه ورودی.
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
                  description: 'استخراج اعداد اول از [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]',
                  input: '[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]',
                  expectedOutput: '[2, 3, 5, 7]',
                },
                {
                  id: 'tc-pr-2',
                  description: 'پشتیبانی از اعداد اول بزرگتر [11, 13, 15, 17, 19, 21]',
                  input: '[11, 13, 15, 17, 19, 21]',
                  expectedOutput: '[11, 13, 17, 19]',
                },
              ],
              hints: [
                'اعداد کمتر از ۲ اول نیستند.',
                'بخش‌پذیری را از ۲ تا رادیکال عدد بررسی کنید.',
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
    title: 'تایپ‌اسکریپت پیشرفته و الگوهای تایپ‌سیف',
    shortDescription: 'تسلط بر Generics، اتحادهای متمایز (Discriminated Unions) و تبدیل انواع داده.',
    description: 'کدهای جاوااسکریپت خود را با سیستم تایپ استاتیک قدرتمند مقاوم‌سازی کنید. تعریف ساختارهای جنریک، تفکیک تایپ‌ها و حذف کامل باگ‌های زمان اجرا.',
    difficulty: 'intermediate',
    estimatedHours: 16,
    iconName: 'typescript',
    color: 'from-blue-600 to-indigo-500',
    badgeTitle: 'معمار ارشد تایپ‌اسکریپت',
    totalXp: 980,
    modules: [
      {
        id: 'mod-ts-1',
        title: '۱. جنریک‌ها و ساختارهای داده',
        description: 'طراحی کالکشن‌ها و مبدل‌های تایپ‌سیف.',
        lessons: [
          {
            id: 'les-ts-1',
            title: 'وارونه کردن کلیدها و مقادیر در اشیاء',
            durationMinutes: 25,
            xpReward: 70,
            type: 'challenge',
            challenge: {
              id: 'chal-ts-1',
              titleKey: 'invert_object',
              title: 'جابجایی کلید و مقدار شیء',
              description: 'تابعی به نام `invertObject(obj)` بنویسید که کلیدها و مقادیر یک شیء را معکوس کند. مثلاً اگر `{ a: "x", b: "y" }` داده شود، خروجی `{ x: "a", y: "b" }` باشد.',
              theory: 'در تایپ‌اسکریپت `Record<K, V>` یک نقشه دیکشنری را نمایش می‌دهد. با پیمایش entries شیء جدید معکوس را تولید کنید.',
              starterCode: `/**
 * معکوس کردن کلیدها و مقادیر در رکورد ورودی.
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
                  description: 'جابجایی کلید و مقادیر متنی استاندارد',
                  input: '{"name": "dev", "role": "admin"}',
                  expectedOutput: '{"admin":"role","dev":"name"}',
                },
                {
                  id: 'tc-inv-2',
                  description: 'پشتیبانی از شیء خالی',
                  input: '{}',
                  expectedOutput: '{}',
                },
              ],
              hints: [
                'از Object.entries(obj) برای گرفتن جفت‌های [key, value] استفاده کنید.',
                'مقدار result[value] = key را انتساب دهید.',
              ],
              xpReward: 70,
            },
          },
          {
            id: 'les-ts-2',
            title: 'تخت‌سازی عمیق آرایه‌های تو در تو (Deep Flatten)',
            durationMinutes: 20,
            xpReward: 65,
            type: 'challenge',
            challenge: {
              id: 'chal-ts-2',
              titleKey: 'flatten_array',
              title: 'تخت‌سازی آرایه با عمق دلخواه',
              description: 'تابعی به نام `deepFlatten(arr)` بنویسید که یک آرایه تو در تو با هر عمقی را به یک آرایه تک‌بعدی خطی تبدیل کند.',
              theory: 'استفاده از بازگشت (Recursion) و متد reduce به همراه Array.isArray امکان حل این چالش کلاسیک را فراهم می‌سازد.',
              starterCode: `/**
 * تبدیل آرایه تودرتو به آرایه مسطح یک بعدی.
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
                  description: 'تخت‌سازی چند سطح عمق در [1, [2, [3, 4], 5]]',
                  input: '[1, [2, [3, 4], 5]]',
                  expectedOutput: '[1, 2, 3, 4, 5]',
                },
                {
                  id: 'tc-fl-2',
                  description: 'پشتیبانی از آرایه‌ای که از قبل تخت است',
                  input: '[10, 20]',
                  expectedOutput: '[10, 20]',
                },
              ],
              hints: [
                'با Array.isArray(item) چک کنید آیا عنصر یک آرایه است یا خیر.',
                'اگر آرایه بود تابع deepFlatten را بازگشتی فراخوانی کنید.',
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
    title: 'کوئری‌نویسی پیشرفته SQL و پایگاه‌های داده',
    shortDescription: 'نوشتن کوئری‌های فیلترینگ، GROUP BY، توابع تجمیعی و تحلیل ارتباطات داده‌ای.',
    description: 'تسلط بر مفاهیم پایگاه داده رابطه‌ای، تجمیع داده‌ها، ادغام جداول، و بهینه‌سازی بازیابی اطلاعات با استانداردهای مدرن.',
    difficulty: 'beginner',
    estimatedHours: 10,
    iconName: 'sql',
    color: 'from-cyan-500 to-blue-600',
    badgeTitle: 'معمار داده‌های رابطه‌ای',
    totalXp: 780,
    modules: [
      {
        id: 'mod-sql-1',
        title: '۱. تجمیع و شروط گروهی (HAVING)',
        description: 'شبیه‌سازی کوئری‌های GROUP BY و فیلتر کردن خروجی تجمعی.',
        lessons: [
          {
            id: 'les-sql-1',
            title: 'دسته‌بندی‌های با فروش بالاتر از حد مشخص',
            durationMinutes: 15,
            xpReward: 50,
            type: 'challenge',
            challenge: {
              id: 'chal-sql-1',
              titleKey: 'sql_top_categories',
              title: 'تجمیع فروش و اعمال شرط HAVING',
              description: 'کوئری فرضی `SELECT category, SUM(amount) as total FROM sales GROUP BY category HAVING total >= 500` را با تابعی به نام `aggregateSales(sales, threshold)` شبیه‌سازی کنید که خروجی را به صورت نزولی بر اساس total مرتب کند.',
              theory: 'در SQL دستور GROUP BY ردیف‌های با دسته‌بندی مشابه را جمع‌بندی نموده و HAVING رکوردهای گروه‌بندی شده را فیلتر می‌کند.',
              starterCode: `/**
 * شبیه‌سازی GROUP BY و HAVING در پایگاه داده.
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
                  description: 'تجمیع فروش با حد آستانه ۵۰۰',
                  input: '[{ "category": "Tech", "amount": 300 }, { "category": "Tech", "amount": 400 }, { "category": "Books", "amount": 150 }], 500',
                  expectedOutput: '[{"category":"Tech","total":700}]',
                },
                {
                  id: 'tc-sql-2',
                  description: 'مرتب‌سازی چند دسته منطبق به صورت نزولی',
                  input: '[{ "category": "A", "amount": 200 }, { "category": "B", "amount": 400 }, { "category": "A", "amount": 300 }], 400',
                  expectedOutput: '[{"category":"A","total":500},{"category":"B","total":400}]',
                },
              ],
              hints: [
                'مبالغ هر دسته را در یک شیء جمع بزنید.',
                'دسته‌هایی که مجموعشان حداقل برابر آستانه است را نگه دارید.',
                'آرایه نهایی را بر اساس total به شکل نزولی sort کنید.',
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
    title: 'اصول زبان گو (Golang) و کارایی بالا',
    shortDescription: 'برنامه‌نویسی ماژولار، برش‌ها (Slices)، ساختارها و مدیریت بهینه حافظه در زبان Go.',
    description: 'فلسفه سادگی، سرعت و امنیت حافظه زبان Go را فرا بگیرید. تسلط بر Structها، اسلایس‌ها و الگوریتم‌های پرسرعت سیستم‌های مقیاس‌پذیر.',
    difficulty: 'intermediate',
    estimatedHours: 15,
    iconName: 'go',
    color: 'from-cyan-400 to-teal-500',
    badgeTitle: 'گوفر برتر (Gopher Laureate)',
    totalXp: 890,
    modules: [
      {
        id: 'mod-go-1',
        title: '۱. اسلایس‌ها و قطعه‌بندی حافظه',
        description: 'الگوریتم‌های قطعه‌بندی اسلایس و تخصیص تمیز داده‌ها.',
        lessons: [
          {
            id: 'les-go-1',
            title: 'الگوریتم قطعه‌بندی آرایه (Slice Chunking)',
            durationMinutes: 20,
            xpReward: 55,
            type: 'challenge',
            challenge: {
              id: 'chal-go-1',
              titleKey: 'chunk_slice',
              title: 'تقسیم اسلایس به زیربخش‌های مساوی',
              description: 'تابعی به نام `chunkArray(array, size)` بنویسید که یک آرایه را به زیرآرایه‌هایی با طول حداکثر `size` تقسیم کند. قطعه پایانی ممکن است کمتر از اندازه تعیین‌شده باشد.',
              theory: 'در گو، قطعه‌بندی اسلایس‌ها برای دسته‌بندی پردازش‌های پس‌زمینه و Worker Poolها بسیار پرکاربرد است.',
              starterCode: `/**
 * قطعه‌بندی آرایه به اندازه مشخص شده.
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
                  description: 'قطعه‌بندی [1, 2, 3, 4, 5] با اندازه ۲',
                  input: '[1, 2, 3, 4, 5], 2',
                  expectedOutput: '[[1,2],[3,4],[5]]',
                },
                {
                  id: 'tc-go-2',
                  description: 'تقسیم کامل مضارب زوج [10, 20, 30, 40] با اندازه ۲',
                  input: '[10, 20, 30, 40], 2',
                  expectedOutput: '[[10,20],[30,40]]',
                },
              ],
              hints: [
                'حلقه را با گام i += size جلو ببرید.',
                'از متد slice(i, i + size) استفاده نمایید.',
              ],
              xpReward: 55,
            },
          },
        ],
      },
    ],
  },
];

// Arabic overrides for courses, modules, lessons, challenges
const arabicCourseData: Course[] = [
  {
    id: 'course-js-core',
    slug: 'modern-javascript',
    category: 'javascript',
    title: 'جافاسكريبت الحديثة والأنماط الوظيفية (ES6+)',
    shortDescription: 'إتقان جافاسكريبت الحديثة، دوال المصفوفات المتقدمة، الإغلاقات (Closures) والبرمجة غير المتزامنة.',
    description: 'انطلق من الصفر وحتى الاحتراف الكامل في جافاسكريبت الحديثة. تعلّم توظيف الدوال عالية الرتبة مثل map و filter و reduce، وتفكيك الكائنات، والبرمجة الخوارزمية الفعالة.',
    difficulty: 'beginner',
    estimatedHours: 12,
    iconName: 'javascript',
    color: 'from-amber-500 to-yellow-400',
    badgeTitle: 'خبير متقدم في جافاسكريبت',
    totalXp: 850,
    modules: [
      {
        id: 'mod-js-1',
        title: '1. الأساسيات والتحكم في المصفوفات',
        description: 'استكشاف دوال المصفوفات التحويلية وسلاسل المعالجة الوظيفية.',
        lessons: [
          {
            id: 'les-js-1',
            title: 'تصفية الأعداد الزوجية ومضاعفتها',
            durationMinutes: 15,
            xpReward: 50,
            type: 'challenge',
            challenge: {
              id: 'chal-js-1',
              titleKey: 'filter_even_square',
              title: 'مضاعفة الأعداد الزوجية',
              description: 'اكتب دالة باسم `doubleEvens(numbers)` تستقبل مصفوفة أرقام صحيحة، وتعيد مصفوفة جديدة تحتوي على الأعداد الزوجية فقط مضروبة في 2 مع استبعاد الأعداد الفردية.',
              theory: 'تُنشئ دالة `filter` نسخة سطحية من المصفوفة تحتوي فقط على العناصر التي تحقق شرط الفحص، بينما تقوم دالة `map` بتحويل كل عنصر على حدة.\n\nمثال:\n`[1, 2, 3, 4]` بعد تصفية الزوجي تصبح `[2, 4]`، ومضاعفتها عبر `map` تعطي `[4, 8]`.',
              starterCode: `/**
 * تعيد مصفوفة تحتوي فقط على الأعداد الزوجية مضاعفة.
 * @param {number[]} numbers
 * @returns {number[]}
 */
function doubleEvens(numbers) {
  // اكتب الكود الخاص بك هنا
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
                  description: 'مضاعفة الأعداد الزوجية في [1, 2, 3, 4, 5, 6]',
                  input: '[1, 2, 3, 4, 5, 6]',
                  expectedOutput: '[4, 8, 12]',
                },
                {
                  id: 'tc-2',
                  description: 'إرجاع مصفوفة فارغة عندما تكون جميع الأرقام فردية [1, 3, 5]',
                  input: '[1, 3, 5]',
                  expectedOutput: '[]',
                },
                {
                  id: 'tc-3',
                  description: 'معالجة الأعداد السالبة والصفر [-4, -3, 0, 7]',
                  input: '[-4, -3, 0, 7]',
                  expectedOutput: '[-8, 0]',
                },
              ],
              hints: [
                'تذكر أن شرط العدد الزوجي هو num % 2 === 0.',
                'يمكنك ربط .filter(n => ...) مباشرة مع .map(n => n * 2).',
                'قم بإرجاع النتيجة مباشرة باستخدام return.',
              ],
              xpReward: 50,
            },
          },
          {
            id: 'les-js-2',
            title: 'حساب إجمالي سلة التسوق باستخدام Reduce',
            durationMinutes: 20,
            xpReward: 60,
            type: 'challenge',
            challenge: {
              id: 'chal-js-2',
              titleKey: 'calculate_cart_total',
              title: 'إجمالي سلة الشراء مع نسبة الخصم',
              description: 'اكتب دالة باسم `calculateTotal(items, discountRate)` لحساب مجموع أسعار المنتجات وتطبيق نسبة الخصم. إذا كانت نسبة الخصم 0.10 (أي 10%)، يتم خصم 10% من المجموع الكلي وتقريب الناتج لأقرب خانتين عشريتين.',
              theory: 'تنفذ الدالة `Array.prototype.reduce()` عملية تراكمية على عناصر المصفوفة وتنتج قيمة واحدة مجمعة.\n\nالمعادلة:\n`subtotal = items.reduce((acc, curr) => acc + curr.price, 0)`\n`final = subtotal * (1 - discountRate)`',
              starterCode: `/**
 * حساب إجمالي السلة بعد تطبيق الخصم.
 * @param {{ name: string, price: number }[]} items
 * @param {number} discountRate - مثال: 0.15 لخصم 15%
 * @returns {number}
 */
function calculateTotal(items, discountRate = 0) {
  // اكتب حلك هنا
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
                  description: 'حساب سلة قياسية بخصم 10%',
                  input: '[{ name: "Book", price: 20 }, { name: "Pen", price: 10 }], 0.1',
                  expectedOutput: '27',
                },
                {
                  id: 'tc-cart-2',
                  description: 'خصم صفر بالمائة يعيد القيمة كاملة',
                  input: '[{ name: "Coffee", price: 15.5 }, { name: "Mug", price: 12.5 }], 0',
                  expectedOutput: '28',
                },
                {
                  id: 'tc-cart-3',
                  description: 'سلة فارغة تعيد 0',
                  input: '[], 0.2',
                  expectedOutput: '0',
                },
              ],
              hints: [
                'اجمع الأسعار أولاً باستخدام items.reduce((sum, item) => sum + item.price, 0)',
                'اضرب الناتج في (1 - discountRate).',
                'قرب النتيجة عبر Math.round(val * 100) / 100.',
              ],
              xpReward: 60,
            },
          },
        ],
      },
      {
        id: 'mod-js-2',
        title: '2. خوارزميات النصوص والتناظر',
        description: 'معالجة النصوص، التحقق من التناظر اللفظي (Palindromes) ومطابقة الأنماط.',
        lessons: [
          {
            id: 'les-js-3',
            title: 'هل النص متناظر لفظياً (Palindrome)؟',
            durationMinutes: 15,
            xpReward: 55,
            type: 'challenge',
            challenge: {
              id: 'chal-js-3',
              titleKey: 'is_palindrome',
              title: 'فحص التناظر مع تجاهل الرموز والفراغات',
              description: 'اكتب دالة باسم `isPalindrome(str)` تعيد `true` إذا كانت الكلمة أو العبارة تُقرأ بنفس الطريقة من اليمين لليسار ومن اليسار لليمين، مع تجاهل حالة الأحرف والرموز غير الأبجدية الرقمية.',
              theory: 'الكلمة المتناظرة مثل "racecar" تُقرأ بنفس الطريقة في كلا الاتجاهين. يمكنك استخدام التعبير النمطي `/[^a-z0-9]/g` لإزالة الرموز الزائدة.',
              starterCode: `/**
 * فحص ما إذا كانت السلسلة متناظرة لفظياً.
 * @param {string} str
 * @returns {boolean}
 */
function isPalindrome(str) {
  // تنظيف السلسلة ومقارنتها بعكسها
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
                  description: 'كلمة متناظرة قياسية "racecar"',
                  input: '"racecar"',
                  expectedOutput: 'true',
                },
                {
                  id: 'tc-p-2',
                  description: 'جملة معقدة تحتوي على مسافات وعلامات ترقيم',
                  input: '"A man, a plan, a canal: Panama"',
                  expectedOutput: 'true',
                },
                {
                  id: 'tc-p-3',
                  description: 'نص غير متناظر "hello world"',
                  input: '"hello world"',
                  expectedOutput: 'false',
                },
              ],
              hints: [
                'قم بتحويل النص لأحرف صغيرة ثم أزل كل الحروف غير الأبجدية الرقمية.',
                'اعكس النص المنظف عبر split و reverse و join.',
                'قارن السلسلة المنظفة مع نسختها المعكوسة.',
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
    title: 'أساسيات بايثون وهندسة البيانات',
    shortDescription: 'إتقان بايثون 3، القوائم المختصرة (Comprehensions)، القواميس وهياكل البيانات الخوارزمية.',
    description: 'تعلّم بايثون المعيارية المستخدمة من قبل مهندسي البرمجيات وعلماء البيانات. تعامل باحتراف مع القوائم، القواميس، والمجموعات وحل التحديات بأسلوب أنيق.',
    difficulty: 'beginner',
    estimatedHours: 14,
    iconName: 'python',
    color: 'from-blue-500 to-emerald-400',
    badgeTitle: 'حائز وسام بايثون المتميز',
    totalXp: 920,
    modules: [
      {
        id: 'mod-py-1',
        title: '1. القوائم والقواميس',
        description: 'حساب تكرار الكلمات والتعامل مع المجموعات.',
        lessons: [
          {
            id: 'les-py-1',
            title: 'عداد تكرار الكلمات في الجملة',
            durationMinutes: 20,
            xpReward: 60,
            type: 'challenge',
            challenge: {
              id: 'chal-py-1',
              titleKey: 'word_frequency',
              title: 'خريطة تكرار الكلمات',
              description: 'اكتب دالة باسم `count_words(sentence)` تستقبل جملة نصية وتعيد قاموساً/كائناً يحتوي على كل كلمة وعدد مرات ظهورها، مع تجاهل علامات الترقيم وحالة الأحرف.',
              theory: 'في بايثون توفر القواميس سرعة بحث متقدمة بمعدل O(1). يتم تقسيم النص إلى كلمات وتخزين عدد مرات الظهور.',
              starterCode: `/**
 * عداد تكرار الكلمات بأسلوب بايثون
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
                  description: 'حساب الكلمات المكررة في "the cat sat on the mat"',
                  input: '"the cat sat on the mat"',
                  expectedOutput: '{"cat":1,"mat":1,"on":1,"sat":1,"the":2}',
                },
                {
                  id: 'tc-w-2',
                  description: 'تجاهل حالة الأحرف "Python python PYTHON"',
                  input: '"Python python PYTHON"',
                  expectedOutput: '{"python":3}',
                },
              ],
              hints: [
                'حول النص بالكامل لأحرف صغيرة وتخلص من علامات الترقيم.',
                'قسم النص باستخدام المسافات عبر split.',
                'زد عدد مرات تكرار الكلمة في القاموس النهائي.',
              ],
              xpReward: 60,
            },
          },
          {
            id: 'les-py-2',
            title: 'تصفية الأعداد الأولية',
            durationMinutes: 15,
            xpReward: 50,
            type: 'challenge',
            challenge: {
              id: 'chal-py-2',
              titleKey: 'find_primes',
              title: 'مرشح الأعداد الأولية',
              description: 'اكتب دالة باسم `filter_primes(numbers)` تعيد فقط الأعداد الأولية من قائمة الأعداد الصحيحة الموجبة المعطاة.',
              theory: 'العدد الأولي هو عدد طبيعي أكبر من 1 ولا يقبل القسمة إلا على 1 وعلى نفسه فقط.',
              starterCode: `/**
 * استخراج الأعداد الأولية من المصفوفة.
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
                  description: 'استخراج الأعداد الأولية من [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]',
                  input: '[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]',
                  expectedOutput: '[2, 3, 5, 7]',
                },
                {
                  id: 'tc-pr-2',
                  description: 'معالجة الأعداد الأولية الأكبر [11, 13, 15, 17, 19, 21]',
                  input: '[11, 13, 15, 17, 19, 21]',
                  expectedOutput: '[11, 13, 17, 19]',
                },
              ],
              hints: [
                'الأعداد الأقل من 2 ليست أولية.',
                'افحص قابلية القسمة من 2 وحتى الجذر التربيعي للعدد.',
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
    title: 'تايب سكريبت المتقدمة والأنماط الصارمة',
    shortDescription: 'إتقان الأنواع المعممة (Generics)، اتحادات التمييز والتحويلات الآمنة للأنواع.',
    description: 'عزز أكوادك عبر نظام الأنواع الثابت في TypeScript. صمم هياكل بيانات قابلة لإعادة الاستخدام وتخلص نهائياً من أخطاء وقت التشغيل.',
    difficulty: 'intermediate',
    estimatedHours: 16,
    iconName: 'typescript',
    color: 'from-blue-600 to-indigo-500',
    badgeTitle: 'مهندس تايب سكريبت المعتمد',
    totalXp: 980,
    modules: [
      {
        id: 'mod-ts-1',
        title: '1. الأنواع المعممة وهياكل البيانات',
        description: 'تصميم مجموعات ومحولات بيانات آمنة الأنواع.',
        lessons: [
          {
            id: 'les-ts-1',
            title: 'عكس المفاتيح والقيم في الكائنات',
            durationMinutes: 25,
            xpReward: 70,
            type: 'challenge',
            challenge: {
              id: 'chal-ts-1',
              titleKey: 'invert_object',
              title: 'تبديل المفاتيح بالقيم',
              description: 'اكتب دالة باسم `invertObject(obj)` تقوم بعكس مفاتيح وقيم الكائن المدخل. على سبيل المثال تحويل `{ a: "x", b: "y" }` إلى `{ x: "a", y: "b" }`.',
              theory: 'في TypeScript يمثل `Record<K, V>` قاموساً. يتم إنشاء الكائن المعكوس من خلال تكرار المدخلات مع الحفاظ على سلامة الأنواع.',
              starterCode: `/**
 * عكس مفاتيح وقيم السجل المعطى.
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
                  description: 'تبديل مفاتيح وقيم نصية قياسية',
                  input: '{"name": "dev", "role": "admin"}',
                  expectedOutput: '{"admin":"role","dev":"name"}',
                },
                {
                  id: 'tc-inv-2',
                  description: 'معالجة الكائنات الفارغة',
                  input: '{}',
                  expectedOutput: '{}',
                },
              ],
              hints: [
                'استخدم Object.entries(obj) للحصول على أزواج [key, value].',
                'قم بإسناد result[value] = key.',
              ],
              xpReward: 70,
            },
          },
          {
            id: 'les-ts-2',
            title: 'تسطيح المصفوفات المتداخلة بعمق (Deep Flatten)',
            durationMinutes: 20,
            xpReward: 65,
            type: 'challenge',
            challenge: {
              id: 'chal-ts-2',
              titleKey: 'flatten_array',
              title: 'تسطيح المصفوفات العميقة',
              description: 'اكتب دالة باسم `deepFlatten(arr)` تقوم بتحويل أي مصفوفة متداخلة لأي عمق إلى مصفوفة خطية أحادية البعد.',
              theory: 'الاستدعاء الذاتي (Recursion) مع reduce و Array.isArray يتيحان تسطيح المصفوفات متعددة المستويات بسلاسة.',
              starterCode: `/**
 * تسطيح المصفوفة المتداخلة إلى مصفوفة أحادية البعد.
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
                  description: 'تسطيح عدة مستويات في [1, [2, [3, 4], 5]]',
                  input: '[1, [2, [3, 4], 5]]',
                  expectedOutput: '[1, 2, 3, 4, 5]',
                },
                {
                  id: 'tc-fl-2',
                  description: 'التعامل مع مصفوفة مسطحة بالفعل',
                  input: '[10, 20]',
                  expectedOutput: '[10, 20]',
                },
              ],
              hints: [
                'تحقق مما إذا كان العنصر مصفوفة عبر Array.isArray(item).',
                'إذا كان مصفوفة، استدع دالة deepFlatten عليه ذاتياً.',
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
    title: 'استعلامات SQL المتقدمة وقواعد البيانات',
    shortDescription: 'صياغة استعلامات التجميع GROUP BY، الشروط التراكمية HAVING، والتحليل العلائقي.',
    description: 'تعلّم إدارة قواعد البيانات العلائقية، ودمج الجداول وتجميع الإحصائيات وتحسين أداء الاستعلامات بمقاييس هندسية متينة.',
    difficulty: 'beginner',
    estimatedHours: 10,
    iconName: 'sql',
    color: 'from-cyan-500 to-blue-600',
    badgeTitle: 'مهندس البيانات العلائقية',
    totalXp: 780,
    modules: [
      {
        id: 'mod-sql-1',
        title: '1. التجميع والشروط الإحصائية (HAVING)',
        description: 'محاكاة استعلامات GROUP BY وتصفية المجموعات التراكمية.',
        lessons: [
          {
            id: 'les-sql-1',
            title: 'الفئات الأعلى مبيعاً فوق الحد الأدنى',
            durationMinutes: 15,
            xpReward: 50,
            type: 'challenge',
            challenge: {
              id: 'chal-sql-1',
              titleKey: 'sql_top_categories',
              title: 'تجميع المبيعات وتطبيق شرط HAVING',
              description: 'قم بمحاكاة الاستعلام `SELECT category, SUM(amount) as total FROM sales GROUP BY category HAVING total >= 500` عبر دالة `aggregateSales(sales, threshold)` مع ترتيب النتائج تنازلياً حسب الإجمالي.',
              theory: 'في SQL يقوم أمر GROUP BY بتجميع الصفوف المتشابهة في الفئة، بينما يقوم HAVING بفلترة النتائج التجميعية.',
              starterCode: `/**
 * محاكاة GROUP BY و HAVING في قواعد البيانات.
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
                  description: 'تجميع المبيعات مع الحد الأدنى 500',
                  input: '[{ "category": "Tech", "amount": 300 }, { "category": "Tech", "amount": 400 }, { "category": "Books", "amount": 150 }], 500',
                  expectedOutput: '[{"category":"Tech","total":700}]',
                },
                {
                  id: 'tc-sql-2',
                  description: 'فرز الفئات المطابقة تنازلياً',
                  input: '[{ "category": "A", "amount": 200 }, { "category": "B", "amount": 400 }, { "category": "A", "amount": 300 }], 400',
                  expectedOutput: '[{"category":"A","total":500},{"category":"B","total":400}]',
                },
              ],
              hints: [
                'اجمع مبالغ كل فئة في كائن تراكمي.',
                'قم بتصفية الفئات التي يزيد مجموعها عن threshold.',
                'رتب المصفوفة تنازلياً حسب total.',
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
    title: 'أساسيات لغة غو (Golang) والأنظمة فائقة السرعة',
    shortDescription: 'برمجة السيرفرات والأنظمة المتزامنة، شرائح الذاكرة (Slices)، وهياكل البيانات في Go.',
    description: 'تعلّم فلسفة البساطة والسرعة والأمان في لغة Google Go. افهم الـ Structs و Slices وإدارة الذاكرة بدون تعقيد.',
    difficulty: 'intermediate',
    estimatedHours: 15,
    iconName: 'go',
    color: 'from-cyan-400 to-teal-500',
    badgeTitle: 'حائز وسام غوفر المتميز',
    totalXp: 890,
    modules: [
      {
        id: 'mod-go-1',
        title: '1. الشرائح وتقسيم كتل الذاكرة',
        description: 'خوارزميات تقسيم الشرائح وتوزيع الأحمال.',
        lessons: [
          {
            id: 'les-go-1',
            title: 'خوارزمية تجزئة المصفوفات (Slice Chunking)',
            durationMinutes: 20,
            xpReward: 55,
            type: 'challenge',
            challenge: {
              id: 'chal-go-1',
              titleKey: 'chunk_slice',
              title: 'تقسيم الشريحة إلى أجزاء متساوية',
              description: 'اكتب دالة باسم `chunkArray(array, size)` تقوم بتجزئة المصفوفة إلى مصفوفات فرعية لا يتجاوز طول كل منها `size`. قد يحتوي الجزء الأخير على عدد عناصر أقل.',
              theory: 'في Go تُستخدم تجزئة الشرائح على نطاق واسع في توزيع المهام المجمعة ومعالجة الـ Worker Pools المتزامنة.',
              starterCode: `/**
 * تجزئة المصفوفة إلى أجزاء بحجم محدد.
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
                  description: 'تجزئة [1, 2, 3, 4, 5] بحجم 2',
                  input: '[1, 2, 3, 4, 5], 2',
                  expectedOutput: '[[1,2],[3,4],[5]]',
                },
                {
                  id: 'tc-go-2',
                  description: 'تقسيم مضاعفات منتظمة [10, 20, 30, 40] بحجم 2',
                  input: '[10, 20, 30, 40], 2',
                  expectedOutput: '[[10,20],[30,40]]',
                },
              ],
              hints: [
                'اجعل خطوة التكرار في الحلقة i += size.',
                'استخدم array.slice(i, i + size).',
              ],
              xpReward: 55,
            },
          },
        ],
      },
    ],
  },
];

export function getLocalizedCourses(language: Language): Course[] {
  if (language === 'fa') return persianCourseData;
  if (language === 'ar') return arabicCourseData;
  return coursesData;
}
