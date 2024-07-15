import { ButtonHTMLAttributes, FC, memo } from 'react';
import s from './Button.module.css';
import { classNames } from '@/shared/lib';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  theme?: 'transparent' | 'white';
}
export const Button: FC<ButtonProps> = memo(
  ({ className, children, theme = 'transparent', ...restProps }) => {
    return (
      <button
        className={classNames(s.Button, {}, [className, s[theme]])}
        onTouchEnd={(e) => {
          if ('vibrate' in navigator) {
            navigator.vibrate(80);
          }
          restProps?.onTouchEnd?.(e);
        }}
        {...restProps}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
