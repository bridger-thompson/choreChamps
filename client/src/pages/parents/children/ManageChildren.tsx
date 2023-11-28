import toast from "react-hot-toast"
import { ConfirmationToast } from "../../../components/forms/ConfirmationToast"
import { Spinner } from "../../../components/ui/Spinner"
import { useDeleteChildMutation, useGetChildrenQuery } from "../../../hooks/peopleHooks"
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
      <div className="text-end mt-1">
        <ChildEditorModal />
      </div>
      <div className="row">
        {children.map((c) => (
          <div className="col-12 col-md-6 col-lg-4 col-xl-3" key={c.id}>
            <div className={`card frosted-glass border-${c.cardColor}`}>
              <div className="card-body">
                <div className="card-title fw-bold fs-4 text-center">{c.name}</div>
                <div className="fs-5">Points: {c.points}</div>
                <div>Avg # Chores Per Day:</div>
                <div>% Complete (last 7 days):</div>
                <div>% Complete (last month):</div>
                <div className="row mt-2">
                  <div className="col">
                    <ChildEditorModal existingChild={c} />
                  </div>
                  <div className="col">
                    <button className="btn btn-outline-danger w-100"
                      onClick={() => deleteHandler(c.id)}>
                      <i className="bi-trash" />
                    </button>
                  </div>
                </div>
                <div>Recent purchases:</div>
              </div>
            </div>
          </div>
        ))}
      </div >
    </>
  )
}
