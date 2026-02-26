/**
 * Pythagorean Numerology Logic
 */

export type NumerologyResult = {
  value: number;
  math: string;
  isMaster: boolean;
  isKarmic: boolean;
  karmicNumber?: number;
};

const pythagoreanMap: Record<string, number> = {
  a: 1, j: 1, s: 1,
  b: 2, k: 2, t: 2,
  c: 3, l: 3, u: 3,
  d: 4, m: 4, v: 4,
  e: 5, n: 5, w: 5,
  f: 6, o: 6, x: 6,
  g: 7, p: 7, y: 7,
  h: 8, q: 8, z: 8,
  i: 9, r: 9
};

const vowels = ['a', 'e', 'i', 'o', 'u'];

/**
 * Reduces a number to a single digit or master number (11, 22, 33)
 */
export function reduceNumber(num: number, preserveMaster: boolean = true): NumerologyResult {
  let current = num;
  let steps: string[] = [num.toString()];
  let isKarmic = false;
  let karmicNumber: number | undefined = undefined;
  let isMaster = false;

  const karmicNumbers = [13, 14, 16, 19];
  const masterNumbers = [11, 22, 33];

  if (karmicNumbers.includes(current)) {
    isKarmic = true;
    karmicNumber = current;
  }
  if (masterNumbers.includes(current)) isMaster = true;

  while (current > 9) {
    if (preserveMaster && masterNumbers.includes(current)) {
      isMaster = true;
      break;
    }
    
    const digits = current.toString().split('').map(Number);
    current = digits.reduce((a, b) => a + b, 0);
    steps.push(current.toString());
    
    if (karmicNumbers.includes(current)) {
      isKarmic = true;
      karmicNumber = current;
    }
    if (masterNumbers.includes(current)) isMaster = true;
  }

  return {
    value: current,
    math: steps.join(' → '),
    isMaster,
    isKarmic,
    karmicNumber
  };
}

/**
 * Calculates the value of a string based on Pythagorean system
 */
export function calculateStringValue(str: string, filter?: (char: string) => boolean): { total: number, breakdown: string } {
  const cleanStr = str.toLowerCase().replace(/[^a-z]/g, '');
  let total = 0;
  let breakdownParts: string[] = [];

  for (const char of cleanStr) {
    if (filter && !filter(char)) continue;
    const val = pythagoreanMap[char] || 0;
    total += val;
    breakdownParts.push(`${char.toUpperCase()}(${val})`);
  }

  return {
    total,
    breakdown: breakdownParts.join(' + ') + ` = ${total}`
  };
}

/**
 * Life Path: Sum of Month, Day, and Year digits separately, then sum those results.
 */
export function calculateLifePath(dob: string): NumerologyResult {
  const [year, month, day] = dob.split('-').map(Number);
  
  const mRes = reduceNumber(month);
  const dRes = reduceNumber(day);
  const yRes = reduceNumber(year);
  
  const total = mRes.value + dRes.value + yRes.value;
  const final = reduceNumber(total);
  
  return {
    ...final,
    math: `Month(${month}): ${mRes.math} | Day(${day}): ${dRes.math} | Year(${year}): ${yRes.math} | Total: ${mRes.value} + ${dRes.value} + ${yRes.value} = ${total} → ${final.math}`
  };
}

/**
 * Destiny/Expression: All letters of full birth name
 */
export function calculateDestiny(name: string): NumerologyResult {
  const { total, breakdown } = calculateStringValue(name);
  const reduced = reduceNumber(total);
  return {
    ...reduced,
    math: `${breakdown} → ${reduced.math}`
  };
}

/**
 * Soul Urge: Vowels only
 */
export function calculateSoulUrge(name: string): NumerologyResult {
  const { total, breakdown } = calculateStringValue(name, (char) => vowels.includes(char));
  const reduced = reduceNumber(total);
  return {
    ...reduced,
    math: `${breakdown} → ${reduced.math}`
  };
}

/**
 * Personality: Consonants only
 */
export function calculatePersonality(name: string): NumerologyResult {
  const { total, breakdown } = calculateStringValue(name, (char) => !vowels.includes(char));
  const reduced = reduceNumber(total);
  return {
    ...reduced,
    math: `${breakdown} → ${reduced.math}`
  };
}

/**
 * Birthday Number: Day of birth reduced
 */
export function calculateBirthdayNumber(dob: string): NumerologyResult {
  const day = parseInt(dob.split('-')[2]);
  return reduceNumber(day);
}

/**
 * Personal Year: Month + Day + Current Year
 */
export function calculatePersonalYear(dob: string, targetYear: number = new Date().getFullYear()): NumerologyResult {
  const [_, month, day] = dob.split('-').map(Number);
  const mRes = reduceNumber(month);
  const dRes = reduceNumber(day);
  const yRes = reduceNumber(targetYear);
  
  const total = mRes.value + dRes.value + yRes.value;
  const final = reduceNumber(total);
  
  return {
    ...final,
    math: `Month(${month}): ${mRes.math} | Day(${day}): ${dRes.math} | Current Year(${targetYear}): ${yRes.math} | Total: ${mRes.value} + ${dRes.value} + ${yRes.value} = ${total} → ${final.math}`
  };
}

/**
 * Personal Month: Personal Year + Current Month
 */
export function calculatePersonalMonth(personalYear: number, targetMonth: number = new Date().getMonth() + 1): NumerologyResult {
  const mRes = reduceNumber(targetMonth);
  const total = personalYear + mRes.value;
  const final = reduceNumber(total);
  return {
    ...final,
    math: `Personal Year(${personalYear}) + Month(${targetMonth}): ${mRes.math} = ${total} → ${final.math}`
  };
}

/**
 * Personal Day: Personal Month + Current Day
 */
export function calculatePersonalDay(personalMonth: number, targetDay: number = new Date().getDate()): NumerologyResult {
  const dRes = reduceNumber(targetDay);
  const total = personalMonth + dRes.value;
  const final = reduceNumber(total);
  return {
    ...final,
    math: `Personal Month(${personalMonth}) + Day(${targetDay}): ${dRes.math} = ${total} → ${final.math}`
  };
}

/**
 * Pinnacles
 */
export function calculatePinnacles(dob: string) {
  const [year, month, day] = dob.split('-').map(Number);
  const m = reduceNumber(month).value;
  const d = reduceNumber(day).value;
  const y = reduceNumber(year).value;

  const p1 = reduceNumber(m + d);
  const p2 = reduceNumber(d + y);
  const p3 = reduceNumber(p1.value + p2.value);
  const p4 = reduceNumber(m + y);

  return { p1, p2, p3, p4 };
}

/**
 * Challenges
 */
export function calculateChallenges(dob: string) {
  const [year, month, day] = dob.split('-').map(Number);
  const m = reduceNumber(month).value;
  const d = reduceNumber(day).value;
  const y = reduceNumber(year).value;

  const c1 = Math.abs(m - d);
  const c2 = Math.abs(d - y);
  const c3 = Math.abs(c1 - c2);
  const c4 = Math.abs(m - y);

  return {
    c1: { value: c1, math: `|Month(${m}) - Day(${d})| = ${c1}` },
    c2: { value: c2, math: `|Day(${d}) - Year(${y})| = ${c2}` },
    c3: { value: c3, math: `|C1(${c1}) - C2(${c2})| = ${c3}` },
    c4: { value: c4, math: `|Month(${m}) - Year(${y})| = ${c4}` }
  };
}

/**
 * Planes of Expression
 * Categorization (Common System):
 * Mental: A, G, L, N, P, S, Z
 * Physical: B, E, K, M, R, T, W
 * Emotional: C, I, O, Q, U, X
 * Intuitive: D, F, H, J, V, Y
 */
export function calculatePlanes(name: string) {
  const planes = {
    mental: ['a', 'g', 'l', 'n', 'p', 's', 'z'],
    physical: ['b', 'e', 'k', 'm', 'r', 't', 'w'],
    emotional: ['c', 'i', 'o', 'q', 'u', 'x'],
    intuitive: ['d', 'f', 'h', 'j', 'v', 'y']
  };

  const counts = { mental: 0, physical: 0, emotional: 0, intuitive: 0 };
  const cleanName = name.toLowerCase().replace(/[^a-z]/g, '');

  for (const char of cleanName) {
    if (planes.mental.includes(char)) counts.mental++;
    else if (planes.physical.includes(char)) counts.physical++;
    else if (planes.emotional.includes(char)) counts.emotional++;
    else if (planes.intuitive.includes(char)) counts.intuitive++;
  }

  return counts;
}

/**
 * Inclusion Grid
 */
export function calculateInclusionGrid(name: string) {
  const cleanName = name.toLowerCase().replace(/[^a-z]/g, '');
  const grid: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0 };

  for (const char of cleanName) {
    const val = pythagoreanMap[char];
    if (val) grid[val]++;
  }

  return grid;
}

/**
 * Address/Phone/Business
 */
export function calculateApplied(input: string): NumerologyResult {
  // If it's mostly digits, treat as number string, else treat as name
  const isNumeric = /^[0-9\s\-()]+$/.test(input);
  if (isNumeric) {
    const digits = input.replace(/[^0-9]/g, '').split('').map(Number);
    const total = digits.reduce((a, b) => a + b, 0);
    const reduced = reduceNumber(total);
    return {
      ...reduced,
      math: `${digits.join(' + ')} = ${total} → ${reduced.math}`
    };
  } else {
    const { total, breakdown } = calculateStringValue(input);
    const reduced = reduceNumber(total);
    return {
      ...reduced,
      math: `${breakdown} → ${reduced.math}`
    };
  }
}
