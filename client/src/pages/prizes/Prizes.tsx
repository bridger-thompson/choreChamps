import { ChildSelect } from "../../components/ChildSelect"

export const Prizes = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col offset-2">
          <h1 className="text-center">Prizes</h1>
        </div>
        <div className="col-2 my-auto">
          <ChildSelect />
        </div>
      </div>
    </div>
  )
}
