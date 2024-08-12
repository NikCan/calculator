import { calculate } from '@/entities/calculation';
import { OperationType, operations } from '@/shared/config';
import { InputValidator, classNames } from '@/shared/lib';
import { Card, HrLine } from '@/shared/ui';
import { Display, Keypad } from '@/widgets';
import { FC, useCallback, useEffect, useState } from 'react';
import s from './CalculatorPage.module.css';

interface CalculatorProps {
  className?: string;
}

const validator = new InputValidator();

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
      const penultimateChar = input.charAt(input.length - 2);

      if (!validator.isValidInput({ char, lastChar })) return;

      if (
        operations.includes(penultimateChar as OperationType) &&
        lastChar === '0' &&
        /\d/.test(char)
      ) {
        setInput((prev) => prev.slice(0, -1) + char);
        return;
      }

      if (lastChar === ')' && /[\d(]/.test(char)) {
        setInput((prev) => prev + '*' + char);
        return;
      }

      setInput((prev) => (prev === '0' && char !== '.' ? '' : prev) + char);
    },
    [input]
  );
  const onClear = useCallback(() => {
    if (input === '0') {
      history !== '' && setHistory('');
    } else {
      setInput('0');
      validator.reset();
    }
  }, [history, input]);
  const onCalculate = useCallback(() => {
    const lastChar = input.charAt(input.length - 1);
    if (
      operations.includes(lastChar as OperationType) &&
      !['%', ')'].includes(lastChar)
    ) {
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
        validator.pop(input.charAt(input.length - 1));
        setInput((prev) => (prev.length === 1 ? '0' : prev.slice(0, -1)));
      } else if (event.key === ',' || event.key === '.') {
        onAddChar('.');
      } else if (/[\d*\\/+\-^%()]/.test(event.key)) {
        onAddChar(event.key);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onAddChar, onCalculate, onClear, input]);

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
