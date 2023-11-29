import { FC } from "react"
import { Child } from "../../../models/Child"
import { useDeleteChildMutation, useGetChildsChoreMetadataQuery } from "../../../hooks/peopleHooks"
import { Spinner } from "../../../components/ui/Spinner"
import { ChildEditorModal } from "./ChildEditorModal"
import toast from "react-hot-toast"
import { ConfirmationToast } from "../../../components/forms/ConfirmationToast"

export const ChildDetailsCard: FC<{
  child: Child
}> = ({ child }) => {
  const childChoreMetadataQuery = useGetChildsChoreMetadataQuery(child.id)
  const metadata = childChoreMetadataQuery.data
  const deleteChildMutation = useDeleteChildMutation();

  if (childChoreMetadataQuery.isLoading) return <Spinner />
  if (childChoreMetadataQuery.isError) return <div>Error getting chore metadata</div>
  if (!metadata) return <div>Unable to get chore metadata</div>

  const deleteHandler = (id: number) => {
    toast((t) => (
      <ConfirmationToast
        toastId={t.id}
        message={"Are you sure you want to delete this child?"}
        confirmHandler={() => {
          deleteChildMutation.mutate(id);
          toast.dismiss(t.id);
        }} />
    ), { duration: Infinity })
  }

  return (
    <div className="col-12 col-md-6 col-lg-4 col-xl-3" >
      <div className={`card frosted-glass border-${child.cardColor}`}>
        <div className="card-body">
          <div className="card-title fw-bold fs-4 text-center">{child.name}</div>
          <div className="fs-5">Points: {child.points}</div>
          <div>Avg # Chores Per Day: {metadata.avgNumChores}</div>
          <div>Completed last week: {metadata.percentCompleteLastWeek}%</div>
          <div>Completed last month: {metadata.percentCompleteLastMonth}%</div>
          <div className="row mt-2">
            <div className="col">
              <ChildEditorModal existingChild={child} />
            </div>
            <div className="col">
              <button className="btn btn-outline-danger w-100"
                onClick={() => deleteHandler(child.id)}>
                <i className="bi-trash" />
              </button>
            </div>
          </div>
          <div>Recent purchases:</div>
        </div>
      </div>
    </div>
  )
}
