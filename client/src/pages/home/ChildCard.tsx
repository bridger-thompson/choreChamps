import { FC, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { Child } from "../../models/Child";
import { ChildContext } from "../../context/childContext";

export const ChildCard: FC<{
  child: Child
}> = ({ child }) => {
  const navigate = useNavigate();
  const { selectChild } = useContext(ChildContext)

  const clickHandler = () => {
    selectChild(child)
    navigate("/chores")
  }
  return (
    <div className="col-3">
      <div className="card h-100"
        onClick={clickHandler}
        role="button">
        <div className={`card-img-top bg-${child.cardColor}`}
          style={{ height: "20ex" }}></div>
        <div className="card-body">
          <div className="fw-bold fs-4">{child.name}</div>
        </div>
      </div>
    </div>
  )
}
