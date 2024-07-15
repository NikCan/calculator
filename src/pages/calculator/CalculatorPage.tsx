import { FC, useCallback, useEffect, useState } from 'react';
import s from './CalculatorPage.module.css';
import { classNames } from '@/shared/lib';
import { Card, HrLine } from '@/shared/ui';
import { Display, Keypad } from '@/widgets';
import { calculate } from '@/entities/calculation';
import { OperationType, operations } from '@/shared/config';

interface CalculatorProps {
  className?: string;
}
export const CalculatorPage: FC<CalculatorProps> = ({ className }) => {
  const [input, setInput] = useState('0');
  const [history, setHistory] = useState('');

  const onAddChar = useCallback(
    (char: string) => {
      if (input === 'Error') {
        setHistory(input);
        setInput('0');
      }

      const lastChar = input.charAt(input.length - 1);

      if (
        operations.includes(lastChar as OperationType) &&
        operations.includes(char as OperationType)
      ) {
        setInput((prev) => prev.slice(0, -1) + char);
        return;
      }

      setInput((prev) => (prev === '0' && char !== '.' ? '' : prev) + char);
    },
    [input]
  );
  const onClear = useCallback(() => setInput('0'), []);
  const onCalculate = useCallback(() => {
    const lastChar = input.charAt(input.length - 1);
    if (operations.includes(lastChar as OperationType) && lastChar !== '%') {
      return;
    }
    setHistory(input);
    setInput(calculate(input).toString());
  }, [input]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        onCalculate();
      } else if (event.key === 'Escape') {
        event.preventDefault();
        onClear();
      } else if (event.key === 'Backspace') {
        event.preventDefault();
        setInput((prev) => (prev.length === 1 ? '0' : prev.slice(0, -1)));
      } else if (event.key === ',' || event.key === '.') {
        onAddChar('.');
      } else if (/[\d*\\/+\-^%]/.test(event.key)) {
        onAddChar(event.key);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onAddChar, onCalculate, onClear]);

  return (
    <div className={classNames(s.CalculatorPage, {}, [className])}>
      <Card className={s.card}>
        <div className={s.calculator}>
          <Display history={history} input={input} />
          <HrLine />
          <Keypad
            onAddChar={onAddChar}
            onCalculate={onCalculate}
            onClear={onClear}
          />
        </div>
      </Card>
    </div>
  );
};
