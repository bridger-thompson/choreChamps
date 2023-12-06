import { FC, useState } from "react"
import { Prize } from "../../models/Prize"
import { usePurchasePrizeMutation } from "./prizeHooks"
import { Child } from "../../models/Child"
import ConfettiExplosion from "react-confetti-explosion"

export const PrizeRow: FC<{
  prize: Prize,
  child: Child
}> = ({ prize, child }) => {
  const purchasePrizeMutation = usePurchasePrizeMutation(child.id)
  const [showConfetti, setShowConfetti] = useState(false)

  const purchaseHandler = (prizeId: number) => {
    purchasePrizeMutation.mutateAsync(prizeId).then(() => {
      setShowConfetti(true)
    })
  }
  return (
    <div className="row border rounded-3 py-2 frosted-glass my-1">
      {showConfetti &&
        <div className="d-flex justify-content-center">
          <ConfettiExplosion />
        </div>
      }
      {prize.imageFilename && (
        <div className="col-auto">
          <img src={`/api/prize/image/${prize.imageFilename}`} alt="Prize" />
        </div>
      )}
      <div className="col my-auto">
        <div className="fw-bold fs-5">{prize.name}</div>
        <div>{prize.description}</div>
      </div>
      <div className="col my-auto">
        <div className="fw-bold fs-5">{prize.cost} Points</div>
        {prize.url && (
          <div>
            <a href={prize.url}
              target="_blank"
              className="text-truncate"
              rel="noreferrer">
              {prize.url}<i className="bi-box-arrow-up-right ms-1" />
            </a>
          </div>
        )}
      </div>
      <div className="col-auto my-auto">
        {prize.cost > child.points ? (
          <button className="btn btn-secondary"
            disabled>
            <i className="bi-currency-dollar fs-5" />
          </button>
        ) : (
          <button className="btn btn-success"
            onClick={() => purchaseHandler(prize.id)}>
            <i className="bi-currency-dollar fs-5" />
          </button>
        )}
      </div>
    </div>
  )
}
