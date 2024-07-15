import { FC, memo } from 'react';
import s from './HrLine.module.css';
import { classNames } from '@/shared/lib';

interface HrLineProps {
  className?: string;
}
export const HrLine: FC<HrLineProps> = memo(({ className }) => {
  return <hr className={classNames(s.HrLine, {}, [className])}></hr>;
});

HrLine.displayName = 'HrLine';
