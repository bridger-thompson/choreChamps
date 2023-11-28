import { FC } from "react"
import { useGetPrizesForChildQuery, usePurchasePrizeMutation } from "./prizeHooks"
import { Spinner } from "../../components/ui/Spinner"
import { Child } from "../../models/Child"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"

export const PrizeDisplay: FC<{
  child: Child
}> = ({ child }) => {
  const prizesQuery = useGetPrizesForChildQuery(child.id)
  const prizes = prizesQuery.data ?? []
  const purchasePrizeMutation = usePurchasePrizeMutation(child.id)
  const navigate = useNavigate();

  if (prizesQuery.isLoading) return <Spinner />
  if (prizesQuery.isError) return <h3 className="text-center">Error getting prizes</h3>
  if (prizes.length === 0) return (
    <div className="text-center">
      <h3>No prizes available</h3>
      <div>Click <span
        role="button"
        onClick={() => navigate("/parent?tab=prizes")}
        className="text-primary">HERE</span> to add prizes</div>
    </div>
  )

  const purchaseHandler = (prizeId: number) => {
    purchasePrizeMutation.mutateAsync(prizeId).then(() => {
      toast.success("Purchased Prize!")
    })

  }
  return (
    <div>
      {prizes.map(p => (
        <div key={p.id}
          className="row border rounded-3 py-2 frosted-glass my-1">
          {p.imageFilename && (
            <div className="col-auto">
              <img src={`/api/prize/image/${p.imageFilename}`} alt="Prize" />
            </div>
          )}
          <div className="col my-auto">
            <div>{p.name}</div>
            <div>{p.description}</div>
          </div>
          <div className="col my-auto">
            <div>{p.cost} Points</div>
            <div>
              <a href={p.url}
                target="_blank"
                rel="noreferrer">
                {p.url}<i className="bi-box-arrow-up-right ms-1" />
              </a>
            </div>
          </div>
          <div className="col-auto my-auto">
            <button className="btn btn-primary"
              onClick={() => purchaseHandler(p.id)}
              disabled={p.cost > child.points || purchasePrizeMutation.isPending}>Buy</button>
          </div>
        </div>
      ))}
    </div>
  )
}
