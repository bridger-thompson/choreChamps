import { FC } from "react";


export const FilterTextRow: FC<{
  changeHandler: (e: any) => void;
  value: string;
  labelText?: string
  labelCol?: string;
  inputCol?: string;
  placeholder?: string;
}> = ({
  value,
  changeHandler,
  labelText = "Filter:",
  labelCol = "",
  inputCol = "",
  placeholder = ""
}) => {

    return (
      <div className="row form-group">
        <div className={"text-end my-auto " + labelCol}>
          {labelText ? (
            <label htmlFor="teacherFilter" className="col-form-label">
              {labelText}
            </label>
          ) : (
            <div></div>
          )}
        </div>
        <div className={"my-auto " + inputCol}>
          <input
            type="text"
            className="form-control"
            value={value}
            placeholder={placeholder}
            onChange={(e) => changeHandler(e.target.value)}
          />
        </div>
      </div>
    )
  }