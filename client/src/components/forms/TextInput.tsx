import { FC, useEffect, useState } from "react";
import { Rules, validate } from "./formValidation";

export interface TextInputControl {
  value: string;
  setValue: (i: string) => void;
  error: string;
  hasRules?: boolean;
}
export const useTextInput = (
  initialValue: string,
  rules?: Rules
): TextInputControl => {
  const [value, setValue] = useState<string>(initialValue);
  const [error, setError] = useState<string>("");
  useEffect(() => {
    setError(validate(value, rules));
  }, [value, setError, rules]);
  const hasRules = !!rules;
  return { value, setValue, error, hasRules };
};

interface Props {
  label: string;
  control: TextInputControl;
  inputClassName?: string;
  displayLabel?: boolean;
  isTextArea?: boolean;
  rows?: number;
  autoFocus?: boolean;
}
export const TextInput: FC<Props> = ({
  label,
  control,
  inputClassName,
  displayLabel = true,
  isTextArea = false,
  rows = 4,
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
  const labelClasses = `my-auto`;

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
        {isTextArea ? (
          <textarea
            name={computedLabel}
            id={computedLabel}
            value={control.value}
            className={"form-control " + validationClasses}
            onChange={(e) => control.setValue(e.target.value)}
            onBlur={() => setHasBeenTouched(!!control.hasRules)}
            rows={rows}
          />
        ) : (
          <input
            type="text"
            name={computedLabel}
            id={computedLabel}
            value={control.value}
            className={"form-control " + validationClasses}
            onChange={(e) => control.setValue(e.target.value)}
            onBlur={() => setHasBeenTouched(!!control.hasRules)}
            autoFocus={autoFocus}
          />
        )}
        {control.error && hasBeenTouched && (
          <div
            v-if=""
            className="invalid-feedback"
            id={`${computedLabel}Feedback`}
          >
            {control.error}
          </div>
        )}
      </div>
    </div>
  );
};
