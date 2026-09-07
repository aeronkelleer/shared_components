import clsx from 'clsx';
import type { ReactNode } from 'react';
import s from './input-legend.module.scss';

// ^======================== InputLegend ========================^ //

interface InputLegendProps {
  className?: string;
  children: ReactNode;
}

export default function InputLegend(props: InputLegendProps) {
  const { children, className } = props;
  return <legend className={clsx(className, s['input-legend'])}>{children}</legend>;
}
