import React, { FC } from "react"
import { ChildChore } from "../../models/ChildChore"
import { useUpdateChoreNoteMutation } from "./choreHooks"
import { useModal, ModalButton, CustomModal } from "../../components/ui/CustomModal"
import { TextInput, useTextInput } from "../../components/forms/TextInput"

export const ChoreNoteModal: FC<{
  chore: ChildChore
  date: string
}> = ({ chore, date }) => {
  const updateChoreNoteMutation = useUpdateChoreNoteMutation(chore.id, date, chore.childId)
  const noteControl = useTextInput(chore.note ?? "");

  const modalControl = useModal("Note Editor", "lg");
  const ModalButton: ModalButton = ({ showModal }) => (
    <div role="button"
      onClick={showModal}>
      <i className={`${chore.note ? "bi-journal-text" : "bi-journal"} small opacity-50`} />
    </div>
  );

  const closeHandler = () => {
    modalControl.hide()
  }

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateChoreNoteMutation.mutateAsync(noteControl.value).then(() => {
      closeHandler()
    })
  }
  return (
    <CustomModal controls={modalControl} ModalButton={ModalButton}>
      <div className="modal-header">
        <div className="modal-title fs-4">
          {chore.note ? "Edit" : "Add"} Note
        </div>
        <button type="button"
          className="btn-close"
          onClick={closeHandler}></button>
      </div>
      <div className="modal-body">
        <form onSubmit={submitHandler}>
          <TextInput control={noteControl} label="Note" />
          <div className="row mt-2">
            <div className="col">
              <button className="btn btn-secondary w-100"
                type="button"
                onClick={closeHandler}>
                Cancel
              </button>
            </div>
            <div className="col">
              <button className="btn btn-primary w-100"
                type="submit">
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </CustomModal>
  )
}
