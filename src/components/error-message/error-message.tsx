import clsx from 'clsx';
import s from './error-message.module.scss';

// ^======================== ErrorMessage ========================^ //

interface ErrorMessageProps {
  text: string;
  className?: string;
}

export default function ErrorMessage(props: ErrorMessageProps) {
  const { text, className } = props;
  return (
    <div className={clsx(className, s['error-message'])}>
      <p className={s.text}>{text}</p>
    </div>
  );
}
