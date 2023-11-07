import { FC } from "react"
import { Chore } from "../../models/Chore"
import { CustomModal, ModalButton, useModal } from "../../components/ui/CustomModal"

export const ChoreEditorModal: FC<{
  existingChore?: Chore
}> = ({ existingChore }) => {
  const control = useModal("Chore Editor");

  const ModalButton: ModalButton = ({ showModal }) => (
    <div>
      {existingChore ? (
        <button className="btn btn-outline-secondary"
          onClick={showModal}>
          <i className="bi-pencil" />
        </button>
      ) : (

        <button className="btn btn-primary"
          onClick={showModal}>
          <i className="bi-plus-lg" />
        </button>
      )}
    </div>
  )

  const closeHandler = () => {
    control.hide()
  }
  return (
    <CustomModal controls={control} ModalButton={ModalButton}>
      <div className="modal-header">
        <div className="modal-title fs-4">
          {existingChore ? "Edit" : "Add"} Chore
        </div>
        <button type="button" className="btn-close"
          onClick={closeHandler}></button>
      </div>
      <div className="modal-body">
        <div>hi</div>
      </div>
    </CustomModal>
  )
}
