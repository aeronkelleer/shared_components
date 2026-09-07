import { InputLegendKind } from '@/constants/enums';
import clsx from 'clsx';
import type { ChangeEvent, RefObject } from 'react';
import ErrorMessage from '../error-message/error-message';
import InputLegend from '../input-legend/input-legend';
import TextField from '../text-field/text-field';
import s from './form-element.module.scss';

// ^======================== Fieldset ========================^ //

type FormElementProps = {
  className: string;
  legendText?: string;
  legendType?: InputLegendKind;
  placeholder?: string;
  type: 'text' | 'password' | 'email' | 'textarea' | 'date';
  id?: string;
  name: string;
  value?: string | number;
  disabled?: boolean;
  hideable?: boolean;
  errorText?: string;
  hidden?: boolean;
  checked?: boolean;
  editable?: boolean;
  readOnly?: boolean;
  ref?: RefObject<HTMLDivElement | null>;
  onFormElementChange?: (formElementName: string, value: string | boolean) => void;
  onEditButtonClick?: () => void;
  onClick?: () => void;
};

function FormElement(FormElementProps: FormElementProps): React.JSX.Element {
  const {
    className,
    legendText,
    legendType = InputLegendKind.OUTER,
    placeholder,
    type,
    name,
    value,
    disabled,
    errorText,
    hidden,
    editable,
    hideable,
    readOnly,
    onClick,
    onFormElementChange,
  } = FormElementProps;

  const handleFormElementChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    onFormElementChange?.(name, e.target.value);
  };
  const handleFormElementClick = () => {
    onClick?.();
  };

  return (
    <div
      className={clsx(className, s['form-element'], {
        [s['_hidden']]: hidden,
        [s._invalid]: errorText,
      })}
    >
      {legendText && legendType === InputLegendKind.OUTER && (
        <InputLegend className={s.legend}>{legendText}</InputLegend>
      )}
      <div className={s.field}>
        <TextField
          type={type}
          name={name}
          className={s.input}
          placeholder={placeholder}
          disabled={disabled}
          value={value}
          onInputChange={handleFormElementChange}
          onClick={handleFormElementClick}
          readOnly={readOnly}
          editable={editable}
          invalid={Boolean(errorText)}
          innerLegendText={legendType === InputLegendKind.INNER ? legendText : ''}
          autoComplete='new-password'
          hideable={hideable}
          required
        />
        {/* <Button className={s.button}>button</Button> */}
      </div>
      {errorText && <ErrorMessage className={s.error} text={errorText} />}
    </div>
  );
}
export default FormElement;
