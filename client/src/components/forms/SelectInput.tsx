import { useEffect, useState } from "react";

export interface SelectInputControl<T> {
  value?: T;
  setValue: (val?: string) => void;
  error: string;
  options: string[];
  displayValue: string;
}
export function useSelectInput<T>({
  initialValue = undefined,
  options,
  getKey,
  required,
  setValueCallback,
}: {
  initialValue?: T;
  options: T[];
  getKey: (i: T) => string;
  required?: boolean;
  setValueCallback?: (i?: T) => void;
}): SelectInputControl<T> {
  const [value, setValue] = useState<T | undefined>(initialValue);
  const [error, setError] = useState("");
  useEffect(() => {
    const errorMessage = required && value ? "required" : "";
    setError(errorMessage);
  }, [value, required]);

  const setValueByKey = (incomingKey?: string) => {
    if (incomingKey) {
      const selected = options.find((o) => getKey(o) === incomingKey);
      setValue(selected);
      if (setValueCallback) {
        setValueCallback(selected);
      }
    } else {
      setValue(undefined);
      if (setValueCallback) {
        setValueCallback(undefined);
      }
    }
  };

  const displayValue = value === undefined ? "" : getKey(value);
  const displayOptions = required
    ? options.map(getKey)
    : ["", ...options.map(getKey)];
  return {
    value,
    displayValue,
    setValue: setValueByKey,
    error,
    options: displayOptions,
  };
}

interface Props<T> {
  label: string;
  control: SelectInputControl<T>;
  inputClassName?: string;
  tabIndex?: number;
  labelClassName?: string
}
export function SelectInput<T>({
  label,
  control,
  inputClassName = "",
  tabIndex = -1,
  labelClassName = ""
}: Props<T>) {
  const [hasBeenTouched, _setHasBeenTouched] = useState(false);

  const validationClasses =
    hasBeenTouched && control.error
      ? "is-invalid"
      : hasBeenTouched
        ? "is-valid"
        : "";

  const computedLabel = label.toLowerCase().replace(" ", "");

  return (
    <div className="form-group">
      <div className="row">
        <div className={labelClassName + " my-auto pe-0"}>
          <label
            htmlFor={computedLabel}
            className={"form-label ps-1 mb-0"}>
            {label}
          </label>
        </div>
        <div className={`my-auto ${inputClassName}`}>
          <select
            name={computedLabel}
            id={computedLabel}
            className={"form-select" + validationClasses}
            value={control.displayValue}
            onChange={(e) => control.setValue(e.target.value)}
            tabIndex={tabIndex}
          >
            {control.options.map((o) => (
              <option value={o} key={o}>
                {o}
              </option>
            ))}
          </select>
          {control.error && hasBeenTouched && (
            <div className="invalid-feedback" id={`${computedLabel}Feedback`}>
              {control.error}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
