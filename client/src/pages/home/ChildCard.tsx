import { FC, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { Child } from "../../models/Child";
import { ChildContext } from "../../context/childContext";
import { ColoredCard } from "../../components/ui/ColoredCard";

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
      <ColoredCard color={child.cardColor}
        clickHandler={clickHandler}>
        <div className="fw-bold fs-4">{child.name}</div>
      </ColoredCard>
    </div>
  )
}
