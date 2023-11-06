import { FC } from "react"
import { useNavigate } from "react-router-dom"

export const PersonCard: FC<{
  name: string
}> = ({ name }) => {
  const navigate = useNavigate();
  return (
    <div className="col-4">
      <div className="card"
        onClick={() => navigate("/")}
        role="button">
        <div className="card-img-top bg-primary"
          style={{ height: "40ex" }}></div>
        <div className="card-body">
          <div className="fw-bold fs-4">{name}</div>
        </div>
      </div>
    </div>
  )
}
