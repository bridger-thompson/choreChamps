import { FC, useState } from "react";
import { Chore } from "../../../models/Chore";
import { CustomModal, ModalButton, useModal } from "../../../components/ui/CustomModal";
import { TextInput, useTextInput } from "../../../components/forms/TextInput";
import { NumberInput, useNumberInput } from "../../../components/forms/NumberInput";
import { useGetChildrenQuery } from "../../../hooks/peopleHooks";
import { useAddChoreMutation, useUpdateChoreMutation } from "./manageChoresHooks";

export const ChoreEditorModal: FC<{
  existingChore?: Chore;
  childrenWithChore?: number[]
}> = ({ existingChore, childrenWithChore }) => {
  const [selectedChildren, setSelectedChildren] = useState(childrenWithChore ?? [])
  const [selectedDays, setSelectedDays] = useState<number[]>(existingChore?.daysOfWeek ?? []);
  const allChildrenQuery = useGetChildrenQuery();
  const allChildren = allChildrenQuery.data ?? []

  const updateChoreMutation = useUpdateChoreMutation()
  const addChoreMutation = useAddChoreMutation()

  const modalControl = useModal("Chore Editor", "lg");
  const nameControl = useTextInput(existingChore?.name ?? "");
  const descriptionControl = useTextInput(existingChore?.description ?? "");
  const pointsControl = useNumberInput(existingChore?.points ?? 10);

  const ModalButton: ModalButton = ({ showModal }) => (
    <div>
      {existingChore ? (
        <button className="btn btn-outline-secondary" onClick={showModal}>
          <i className="bi-pencil" />
        </button>
      ) : (
        <button className="btn btn-primary" onClick={showModal}>
          Add Chore
        </button>
      )}
    </div>
  );

  const closeHandler = () => {
    if (!existingChore) {
      nameControl.setValue("")
      descriptionControl.setValue("")
      pointsControl.setValue(10)
      setSelectedDays([])
      setSelectedChildren([])
    }
    modalControl.hide();
  };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newChore: Chore = {
      id: existingChore ? existingChore.id : 0,
      name: nameControl.value,
      description: descriptionControl.value,
      points: pointsControl.value,
      daysOfWeek: selectedDays
    }
    if (existingChore) {
      updateChoreMutation.mutateAsync({ chore: newChore, assignedChildIds: selectedChildren }).then(() => {
        closeHandler()
      })
    } else {
      addChoreMutation.mutateAsync({ chore: newChore, assignedChildIds: selectedChildren }).then(() => {
        closeHandler()
      })
    }
  }

  const toggleDaySelection = (day: number) => {
    if (selectedDays.includes(day)) {
      setSelectedDays(selectedDays.filter((d) => d !== day));
    } else {
      setSelectedDays([...selectedDays, day]);
    }
  };

  const toggleChildSelection = (id: number) => {
    if (selectedChildren.includes(id)) {
      setSelectedChildren(selectedChildren.filter((c) => c !== id));
    } else {
      setSelectedChildren([...selectedChildren, id]);
    }
  };

  const daysOfWeek = [
    { label: "Sun", value: 0 },
    { label: "Mon", value: 1 },
    { label: "Tues", value: 2 },
    { label: "Wed", value: 3 },
    { label: "Thurs", value: 4 },
    { label: "Fri", value: 5 },
    { label: "Sat", value: 6 },
  ];

  const canSubmit = nameControl.value != "" &&
    pointsControl.value >= 0 &&
    selectedDays.length > 0

  return (
    <CustomModal controls={modalControl} ModalButton={ModalButton}>
      <div className="modal-header">
        <div className="modal-title fs-4">
          {existingChore ? "Edit" : "Add"} Chore
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
              <TextInput control={descriptionControl} label="Description" isTextArea={true} rows={2} />
              <div className="ms-1">Days chore occurs</div>
              <div className="btn-group">
                {daysOfWeek.map((day) => (
                  <button
                    key={day.label}
                    type="button"
                    className={`btn mb-1 ${selectedDays.includes(day.value) ? "btn-primary border-secondary" : "btn-outline-secondary"}`}
                    onClick={() => toggleDaySelection(day.value)}
                  >
                    {day.label}
                  </button>
                ))}
                <button className={`btn mb-1 ${selectedDays.length === 7 ? "btn-primary border-secondary" : "btn-outline-secondary"}`}
                  type="button"
                  onClick={() => setSelectedDays([0, 1, 2, 3, 4, 5, 6])}>
                  Daily
                </button>
              </div>
            </div>
            <div className="col-auto">
              <NumberInput control={pointsControl} label="Points" />
              <div>Assigned To</div>
              {allChildren.map((c) => (
                <div className="form-check" key={c.id}
                  onClick={() => toggleChildSelection(c.id)}>
                  <input className="form-check-input"
                    type="checkbox"
                    id={c.name}
                    checked={selectedChildren.includes(c.id)}
                  />
                  <label className="form-check-label" htmlFor={c.name}>
                    {c.name}
                  </label>
                </div>
              ))}
            </div>
          </div>
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
                disabled={!canSubmit}
                type="submit">
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </CustomModal>
  );
};
