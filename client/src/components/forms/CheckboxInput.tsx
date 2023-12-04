import { FC } from "react"

export const CheckboxInput: FC<{
  clickHandler: (id: number) => void
  id: number,
  value: string,
  checked: boolean
}> = ({ clickHandler, id, value, checked }) => {
  return (
    <div className="form-check"
      onClick={() => clickHandler(id)}>
      <input className="form-check-input"
        type="checkbox"
        id={id.toString()}
        checked={checked}
      />
      <label className="form-check-label" htmlFor={id.toString()}>
        {value}
      </label>
    </div>
  )
}
