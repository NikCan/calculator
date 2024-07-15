import { calculate } from './calculationModel';

describe('calculate function', () => {
  it('should calculate basic addition correctly', () => {
    expect(calculate('2+3')).toBe(5);
  });

  it('should calculate basic subtraction correctly', () => {
    expect(calculate('5-2')).toBe(3);
  });

  it('should calculate basic multiplication correctly', () => {
    expect(calculate('4*3')).toBe(12);
  });

  it('should calculate basic division correctly', () => {
    expect(calculate('10/2')).toBe(5);
  });

  it('should throw error on division by zero', () => {
    expect(calculate('10/0')).toBe('Error');
  });

  it('should calculate percentage correctly', () => {
    expect(calculate('2/50%')).toBe(4);
  });

  it('should calculate square root correctly', () => {
    expect(calculate('25^0.5')).toBe(5);
  });

  it('should throw error on square root of negative number', () => {
    expect(calculate('-25^0.5')).toBe('Error');
  });

  it('should handle invalid expressions gracefully', () => {
    expect(calculate('abc')).toBe('Error');
  });

  it('should handle multiple operations with different operators correctly', () => {
    expect(calculate('-2+3*4-6/2')).toBe(3);
  });
});
