import { ActionType, calculatorConfig } from '@/shared/config';
import { classNames } from '@/shared/lib';
import { Button } from '@/shared/ui';
import { FC, memo, useCallback } from 'react';
import s from './Keypad.module.css';

interface KeypadProps {
  className?: string;
  onAddChar: (value: string) => void;
  onClear: () => void;
  onCalculate: () => void;
}

export const Keypad: FC<KeypadProps> = memo(
  ({ className, onAddChar, onCalculate, onClear }) => {
    const handleButtonClick = useCallback(
      (action: ActionType, value: string) => {
        if (action === 'CLEAR') {
          onClear();
        } else if (action === 'CALCULATE') {
          onCalculate();
        } else {
          onAddChar(value);
        }
      },
      [onClear, onCalculate, onAddChar]
    );

    return (
      <div className={classNames(s.Keypad, {}, [className])}>
        {calculatorConfig.map((el) => {
          return (
            <Button
              key={el.value}
              theme={el.action === 'CALCULATE' ? 'white' : 'transparent'}
              onClick={() => handleButtonClick(el.action, el.value)}
            >
              {el.title}
            </Button>
          );
        })}
      </div>
    );
  }
);

Keypad.displayName = 'Keypad';
