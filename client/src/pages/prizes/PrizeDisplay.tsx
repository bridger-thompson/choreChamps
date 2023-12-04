import { FC } from "react"
import { useGetPrizesForChildQuery } from "./prizeHooks"
import { Spinner } from "../../components/ui/Spinner"
import { Child } from "../../models/Child"
import { useNavigate } from "react-router-dom"
import { PrizeRow } from "./PrizeRow"

export const PrizeDisplay: FC<{
  child: Child
}> = ({ child }) => {
  const prizesQuery = useGetPrizesForChildQuery(child.id)
  const prizes = prizesQuery.data ?? []
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

  return (
    <div>
      {prizes.map(p => (
        <PrizeRow key={p.id}
          prize={p}
          child={child} />
      ))}
    </div>
  )
}
