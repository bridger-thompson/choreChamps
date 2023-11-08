import { ChildSelect } from "../../components/ChildSelect"

export const Prizes = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md offset-md-4 offset-lg-3">
          <h1 className="text-center">Prizes</h1>
        </div>
        <div className="col-md-4 col-lg-3 my-auto">
          <ChildSelect />
        </div>
      </div>
    </div>
  )
}
