import { FC, useState } from "react"
import { Child } from "../../../models/Child"
import { TextInput, useTextInput } from "../../../components/forms/TextInput"
import { NumberInput, useNumberInput } from "../../../components/forms/NumberInput"
import { useModal, ModalButton, CustomModal } from "../../../components/ui/CustomModal"
import { useAddChildMutation, useUpdateChildMutation } from "../../../hooks/childHooks"

export const ChildEditorModal: FC<{
  existingChild?: Child
}> = ({ existingChild }) => {
  const addChildMutation = useAddChildMutation()
  const updateChildMutation = useUpdateChildMutation()
  const nameControl = useTextInput(existingChild?.name ?? "")
  const pointsControl = useNumberInput(existingChild?.points ?? 0)
  const colors = [
    "primary",
    "secondary",
    "info",
    "danger",
    "success",
    "warning"
  ]
  const [selectedColor, setSelectedColor] = useState(existingChild?.cardColor ?? colors[0])
  const modalControl = useModal("Child Editor", "lg");
  const ModalButton: ModalButton = ({ showModal }) => (
    <div>
      {existingChild ? (
        <button className="btn btn-outline-secondary" onClick={showModal}>
          <i className="bi-pencil" />
        </button>
      ) : (
        <button className="btn btn-primary" onClick={showModal}>
          Add Child
        </button>
      )}
    </div>
  );

  const closeHandler = () => {
    if (!existingChild) {
      nameControl.setValue("")
      pointsControl.setValue(0)
    }
    modalControl.hide();
  };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const child: Child = {
      id: existingChild?.id ?? 0,
      name: nameControl.value,
      points: pointsControl.value,
      cardColor: selectedColor
    }
    if (existingChild) {
      updateChildMutation.mutateAsync(child).then(() => {
        closeHandler()
      })
    } else {
      addChildMutation.mutateAsync(child).then(() => {
        closeHandler()
      })
    }
  }

  const canSubmit = nameControl.value !== ""
  return (
    <CustomModal controls={modalControl} ModalButton={ModalButton}>
      <div className="modal-header">
        <div className="modal-title fs-4">
          {existingChild ? "Edit" : "Add"} Child
        </div>
        <button type="button"
          className="btn-close"
          onClick={closeHandler}></button>
      </div>
      <div className="modal-body">
        <form onSubmit={submitHandler}>
          <div className="row">
            <div className="col">
              <TextInput control={nameControl} label="Name" />
            </div>
            <div className="col-auto">
              <NumberInput control={pointsControl} label="Points" />
            </div>
          </div>
          <div className="row my-2">
            <div>Color</div>
            {colors.map((c) => (
              <div key={c}
                className="col pe-0 ">
                <button className={`btn rounded w-100 btn-${c} ${c === selectedColor && "active"}`}
                  type="button"
                  onClick={() => setSelectedColor(c)}
                  style={{ height: "5ex" }}></button>
              </div>
            ))}
          </div>
          <div className="row">
            <div className="col">
              <button className="btn btn-secondary w-100"
                type="button"
                onClick={closeHandler}>
                Cancel
              </button>
            </div>
            <div className="col">
              <button className={`btn btn-${selectedColor} w-100`}
                disabled={!canSubmit}
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
