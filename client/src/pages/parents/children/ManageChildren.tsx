import toast from "react-hot-toast"
import { ConfirmationToast } from "../../../components/forms/ConfirmationToast"
import { Spinner } from "../../../components/ui/Spinner"
import { useDeleteChildMutation, useGetChildrenQuery } from "../../../hooks/childHooks"
import { ChildEditorModal } from "./ChildEditorModal"

export const ManageChildren = () => {
  const deleteChildMutation = useDeleteChildMutation();
  const childrenQuery = useGetChildrenQuery()
  const children = childrenQuery.data ?? []

  if (childrenQuery.isLoading) return <Spinner />
  if (childrenQuery.isError) return <h3 className="text-center">Error getting children</h3>

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
    <>
      <div className="row mt-1">
        <div className="col col-md-8 fw-bold fs-5 my-auto">Name</div>
        <div className="col col-md-2 text-center fw-bold fs-5 my-auto">Points</div>
        <div className="col col-md text-center">
          <ChildEditorModal />
        </div>
      </div>
      {children.map((c) => (
        <div key={c.id} className={`border border-2 border-${c.cardColor} frosted-glass rounded-4 row my-1 py-1`}>
          <div className="col col-md my-auto fs-5">{c.name}</div>
          <div className="col col-md-2 my-auto text-center fs-5">{c.points}</div>
          <div className="col-2 col-md-1 text-end">
            <ChildEditorModal existingChild={c} />
          </div>
          <div className="col-2 col-md-1">
            <button className="btn btn-outline-danger"
              onClick={() => deleteHandler(c.id)}>
              <i className="bi-trash" />
            </button>
          </div>
        </div>
      ))}
    </>
  )
}
