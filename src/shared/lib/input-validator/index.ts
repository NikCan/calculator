import {
  OperationType,
  operations,
  operationsWithoutBrackets
} from '@/shared/config';

export class InputValidator {
  private stack: string[] = [];

  isValidInput({
    char,
    lastChar
  }: {
    char: string;
    lastChar?: string;
  }): boolean {
    if (this.isConsecutiveOperation(char, lastChar)) return false;
    if (this.isOperationAfterOpenBracket(char, lastChar)) return false;

    if (this.isOpenBracket(char)) {
      this.stack.push(char);
      return true;
    }

    if (this.isCloseBracket(char)) {
      return this.handleCloseBracket();
    }

    return true;
  }

  private isConsecutiveOperation(char: string, lastChar?: string): boolean {
    return (
      operationsWithoutBrackets.includes(lastChar as OperationType) &&
      operationsWithoutBrackets.includes(char as OperationType)
    );
  }

  private isOperationAfterOpenBracket(
    char: string,
    lastChar?: string
  ): boolean {
    return (
      (operationsWithoutBrackets.includes(char as OperationType) ||
        char === ')') &&
      lastChar === '('
    );
  }

  private isOpenBracket(char: string): boolean {
    return char === '(';
  }

  private isCloseBracket(char: string): boolean {
    return char === ')';
  }

  private handleCloseBracket(): boolean {
    if (this.stack.length > 0) {
      this.stack.pop();
      return true;
    }
    return false;
  }

  reset() {
    this.stack = [];
  }

  pop(char: string) {
    console.log(char);
    if (char === '(') this.stack.pop();
    if (char === ')') this.stack.push('(');
  }
}
