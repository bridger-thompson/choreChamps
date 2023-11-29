import { Spinner } from "../../../components/ui/Spinner"
import { useGetChildrenQuery } from "../../../hooks/peopleHooks"
import { ChildDetailsCard } from "./ChildDetailsCard"
import { ChildEditorModal } from "./ChildEditorModal"

export const ManageChildren = () => {
  const childrenQuery = useGetChildrenQuery()
  const children = childrenQuery.data ?? []

  if (childrenQuery.isLoading) return <Spinner />
  if (childrenQuery.isError) return <h3 className="text-center">Error getting children</h3>

  return (
    <>
      <div className="text-end mt-1">
        <ChildEditorModal />
      </div>
      <div className="row">
        {children.map((c) => (
          <ChildDetailsCard child={c} key={c.id} />
        ))}
      </div >
    </>
  )
}
