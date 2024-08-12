export const operations: OperationType[] = [
  '+',
  '-',
  '*',
  '/',
  '^',
  '%',
  '(',
  ')'
];

export const operationsWithoutBrackets = operations.filter(
  (el) => el !== '(' && el !== ')'
);

export type OperationType = '+' | '-' | '*' | '/' | '^' | '%' | '(' | ')';
