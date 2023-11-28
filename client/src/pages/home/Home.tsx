import { Spinner } from "../../components/ui/Spinner"
import { useGetChildrenQuery } from "../../hooks/peopleHooks"
import { ChildCard } from "./ChildCard"

export const Home = () => {
  const childrenQuery = useGetChildrenQuery()
  const children = childrenQuery.data ?? []

  if (childrenQuery.isLoading) return <Spinner />
  if (childrenQuery.isError) return <h3 className="text-center">Error getting children</h3>
  return (
    <div className="container text-center">
      <div className="row mt-2">
        {children.map((c) => (
          <ChildCard child={c} key={c.id} />
        ))}
      </div>
    </div>
  )
}
