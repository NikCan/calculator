import { classNames } from '@/shared/lib';
import { FC, memo } from 'react';
import s from './Display.module.css';

interface DisplayProps {
  className?: string;
  input: string;
  history?: string;
}

export const Display: FC<DisplayProps> = memo(
  ({ className, input, history = '' }) => {
    return (
      <div className={classNames(s.Display, {}, [className])}>
        <div className={s.history}>{history}</div>
        <div className={s.input}>{input}</div>
      </div>
    );
  }
);

Display.displayName = 'Display';
