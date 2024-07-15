import { OperationType, operations } from '@/shared/config';

function isOperator(char: any): char is OperationType {
  return operations.includes(char);
}

function getPrecedence(operator: OperationType): number {
  switch (operator) {
    case '+':
    case '-':
      return 1;
    case '*':
    case '/':
    case '%':
      return 2;
    case '^':
      return 3;
    default:
      return 0;
  }
}

function applyOperation(
  left: number,
  right: number,
  operator: OperationType
): number {
  console.log(left, right, operator);
  switch (operator) {
    case '+':
      return left + right;
    case '-':
      return left - right;
    case '*':
      return left * right;
    case '/':
      if (right === 0) {
        throw new Error('Division by zero');
      }
      return left / right;
    case '%':
      return right * 100;
    case '^':
      if (left < 0) {
        throw new Error('Square root of a negative number');
      }
      return Math.pow(left, right);
    default:
      throw new Error('Unknown operator');
  }
}
export function calculate(expression: string): number | string {
  try {
    const operators: OperationType[] = [];
    const values: number[] = [];
    let i = 0;

    while (i < expression.length) {
      const char = expression[i];

      if (char === ' ') {
        i++;
        continue;
      }

      if (isOperator(char)) {
        // Check if '-' is a negative sign or operator
        if (char === '-' && (i === 0 || isOperator(expression[i - 1]))) {
          // Negative sign handling
          let num = '-';
          i++;
          while (
            i < expression.length &&
            !isOperator(expression[i]) &&
            expression[i] !== ' '
          ) {
            num += expression[i];
            i++;
          }
          i--;

          const parsedNum = parseFloat(num);
          if (isNaN(parsedNum)) {
            throw new Error('Invalid expression');
          }
          values.push(parsedNum);
        } else {
          // Normal operator handling
          while (
            operators.length > 0 &&
            getPrecedence(operators[operators.length - 1]) >=
              getPrecedence(char)
          ) {
            const right = values.pop()!;
            const left = values.pop()!;
            const op = operators.pop()!;
            values.push(applyOperation(left, right, op));
          }
          operators.push(char);
        }
      } else {
        // Number handling
        let num = '';
        while (
          i < expression.length &&
          !isOperator(expression[i]) &&
          expression[i] !== ' '
        ) {
          num += expression[i];
          i++;
        }
        i--;

        const parsedNum = parseFloat(num);
        if (isNaN(parsedNum)) {
          throw new Error('Invalid expression');
        }
        values.push(parsedNum);
      }

      i++;
    }

    while (operators.length > 0) {
      const right = values.pop()!;
      const left = values.pop()!;
      const op = operators.pop()!;
      values.push(applyOperation(left, right, op));
    }

    return values.pop()!;
  } catch (error) {
    console.log((error as any).message);
    return 'Error';
  }
}
