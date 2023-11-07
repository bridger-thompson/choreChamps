import { FC, useEffect, useState } from "react";
import { Rules, validate } from "./formValidation";

export interface NumberInputControl {
  value: number;
  setValue: (value: number) => void;
  error: string;
  hasRules?: boolean;
}

export const useNumberInput = (
  initialValue: number,
  rules?: Rules
): NumberInputControl => {
  const [value, setValue] = useState<number>(initialValue);
  const [error, setError] = useState<string>("");
  useEffect(() => {
    setError(validate(value.toString(), rules)); // Validate as a string
  }, [value, setError, rules]);
  const hasRules = !!rules;
  return { value, setValue, error, hasRules };
};

interface NumberInputProps {
  label: string;
  control: NumberInputControl;
  inputClassName?: string;
  displayLabel?: boolean;
  autoFocus?: boolean;
}

export const NumberInput: FC<NumberInputProps> = ({
  label,
  control,
  inputClassName,
  displayLabel = true,
  autoFocus = false,
}) => {
  const salt = Math.random();
  const [hasBeenTouched, setHasBeenTouched] = useState(false);

  const validationClasses =
    hasBeenTouched && control.error
      ? "is-invalid"
      : hasBeenTouched
        ? "is-valid"
        : "";

  const computedLabel = label.toLowerCase().replace(" ", "") + salt;
  const labelClasses = "my-auto";

  return (
    <div className="form-group">
      {displayLabel && (
        <div className={labelClasses}>
          <label htmlFor={computedLabel} className="form-label ps-1 mb-0">
            {label}
          </label>
        </div>
      )}
      <div className={inputClassName ? `my-auto ${inputClassName}` : "my-auto"}>
        <input
          type="number"
          name={computedLabel}
          id={computedLabel}
          value={control.value || ''}
          className={`form-control ${validationClasses}`}
          onChange={(e) => control.setValue(parseInt(e.target.value, 10))}
          onBlur={() => setHasBeenTouched(!!control.hasRules)}
          autoFocus={autoFocus}
        />
        {control.error && hasBeenTouched && (
          <div className="invalid-feedback" id={`${computedLabel}Feedback`}>
            {control.error}
          </div>
        )}
      </div>
    </div>
  );
};
