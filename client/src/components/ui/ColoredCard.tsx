import { FC } from "react"
import classes from "../../components/ui/ShadowHover.module.scss"


export const ColoredCard: FC<{
  children: JSX.Element,
  color: string,
  cardClasses?: string,
  clickHandler?: () => void
}> = ({ children, color, cardClasses, clickHandler }) => {
  return (
    <div className={`card h-100 ${classes.shadow} ${cardClasses}`}
      onClick={clickHandler}
      role="button">
      <div className={`card-img-top bg-${color}`}
        style={{
          height: "20ex"
        }}>
      </div>
      <div className="card-body">
        {children}
      </div>
    </div>
  )
}
