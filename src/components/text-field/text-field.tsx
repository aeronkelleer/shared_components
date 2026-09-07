'use client';

import { ICONS } from '@/constants/images.generated';
import clsx from 'clsx';
import { ChangeEvent, useState } from 'react';
import s from './text-field.module.scss';

// ^======================== TextField ========================^ //

type TextInputProps = {
  type: 'text' | 'password' | 'email' | 'textarea' | 'date';
  name: string;
  className: string;
  value: string | number | undefined;
  readOnly?: boolean;
  required?: boolean;
  autoComplete?: string;
  placeholder?: string;
  disabled?: boolean;
  innerLegendText?: string;
  editable?: boolean;
  invalid?: boolean;
  hideable?: boolean;
  onEditButtonClick?: () => void;
  onInputChange?: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onClick?: () => void;
};

export default function TextField(props: TextInputProps) {
  const {
    type,
    name,
    className,
    value,
    readOnly,
    required,
    autoComplete,
    placeholder,
    disabled,
    innerLegendText,
    editable,
    invalid,
    hideable,
    onInputChange,
    onClick,
  } = props;

  const [isDisabled, setIsDisabled] = useState(disabled);
  const [isVisible, setIsVisible] = useState(hideable ? false : true);

  const passwordIcon = isVisible ? ICONS.eyeVisible : ICONS.eyeInvisible;

  const handleEditButtonClick = () => {
    setIsDisabled(!isDisabled);
  };

  const handleVisibilityClick = () => {
    setIsVisible(!isVisible);
  };

  const commonClassName = clsx(className, s['text-field'], { [s._invalid]: invalid });

  if (type === 'textarea') {
    return (
      <div className={commonClassName}>
        <textarea
          className={s.textarea}
          value={value}
          name={name}
          placeholder={placeholder}
          disabled={isDisabled}
          required={required}
          onChange={onInputChange}
        />
      </div>
    );
  } else if (type === 'text' || type === 'email' || type === 'password' || type === 'date') {
    return (
      <div className={commonClassName}>
        {innerLegendText && value && <legend className={s.legend}>{innerLegendText}</legend>}
        {type === 'date' && <img src={ICONS.calendar} alt='' className={s['calendar-icon']} />}
        <input
          className={s.input}
          value={value}
          type={hideable ? (isVisible ? 'text' : 'password') : type === 'date' ? 'text' : type}
          name={name}
          placeholder={innerLegendText && !value ? innerLegendText : placeholder}
          disabled={isDisabled}
          autoComplete={autoComplete}
          readOnly={readOnly}
          onChange={onInputChange}
          onClick={onClick}
        />
        {editable && (
          <button type='button' className={s['edit-button']} onClick={handleEditButtonClick}>
            <img src={ICONS.edit} alt='' />
          </button>
        )}
        {hideable && (
          <button type='button' onClick={handleVisibilityClick}>
            <img src={passwordIcon} alt='' className='' />
          </button>
        )}
      </div>
    );
  }
}
