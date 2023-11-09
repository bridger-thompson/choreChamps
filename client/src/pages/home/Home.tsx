import { Spinner } from "../../components/ui/Spinner"
import { useGetChildrenQuery } from "../../hooks/childHooks"
import { ChildCard } from "./ChildCard"

export const Home = () => {
  const childrenQuery = useGetChildrenQuery()
  const children = childrenQuery.data ?? []

  if (childrenQuery.isLoading) return <Spinner />
  if (childrenQuery.isError) return <h3 className="text-center">Error getting children</h3>
  return (
    <div className="container text-center">
      <h1>Select Your Person</h1>
      <div className="row">
        {children.map((c) => (
          <ChildCard child={c} key={c.id} />
        ))}
      </div>
    </div>
  )
}
