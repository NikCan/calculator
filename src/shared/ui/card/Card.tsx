import { classNames } from '@/shared/lib';
import { FC, ReactNode } from 'react';
import s from './Card.module.css';

interface CardProps {
  className?: string;
  children: ReactNode;
}
export const Card: FC<CardProps> = ({ className, children }) => {
  return <div className={classNames(s.Card, {}, [className])}>{children}</div>;
};
