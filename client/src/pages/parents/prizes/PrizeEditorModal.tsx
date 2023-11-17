import { FC, useState } from "react";
import { Prize } from "../../../models/Prize";
import { CustomModal, ModalButton, useModal } from "../../../components/ui/CustomModal";
import { TextInput, useTextInput } from "../../../components/forms/TextInput";
import { NumberInput, useNumberInput } from "../../../components/forms/NumberInput";
import { useGetChildrenQuery } from "../../../hooks/childHooks";
import { useAddPrizeMutation, useUpdatePrizeMutation } from "./prizeHooks";

export const PrizeEditorModal: FC<{
  existingPrize?: Prize;
  childrenWithPrize?: number[];
}> = ({ existingPrize, childrenWithPrize }) => {
  const [selectedChildren, setSelectedChildren] = useState(childrenWithPrize ?? []);
  const allChildrenQuery = useGetChildrenQuery();
  const allChildren = allChildrenQuery.data ?? [];

  const updatePrizeMutation = useUpdatePrizeMutation(existingPrize?.id ?? -1);
  const addPrizeMutation = useAddPrizeMutation();

  const [active, setActive] = useState(existingPrize?.active ?? true)
  const modalControl = useModal("Prize Editor", "lg");
  const nameControl = useTextInput(existingPrize?.name ?? "");
  const descriptionControl = useTextInput(existingPrize?.description ?? "");
  const urlControl = useTextInput(existingPrize?.url ?? "");
  const costControl = useNumberInput(existingPrize?.cost ?? 0);

  const ModalButton: ModalButton = ({ showModal }) => (
    <div>
      {existingPrize ? (
        <button className="btn btn-outline-secondary" onClick={showModal}>
          <i className="bi-pencil" />
        </button>
      ) : (
        <button className="btn btn-primary" onClick={showModal}>
          Add Prize
        </button>
      )}
    </div>
  );

  const closeHandler = () => {
    if (!existingPrize) {
      nameControl.setValue("");
      descriptionControl.setValue("");
      costControl.setValue(0);
      urlControl.setValue("");
      setActive(true)
      setSelectedChildren([]);
    }
    modalControl.hide();
  };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newPrize: Prize = {
      id: existingPrize?.id ?? 0,
      name: nameControl.value,
      description: descriptionControl.value,
      cost: costControl.value,
      imageFilename: existingPrize?.imageFilename ?? "",
      url: urlControl.value,
      active,
      parentId: existingPrize?.parentId ?? 0
    };

    if (existingPrize) {
      updatePrizeMutation.mutateAsync({ updatedPrize: newPrize, assignedChildIds: selectedChildren }).then(() => {
        closeHandler();
      });
    } else {
      addPrizeMutation.mutateAsync({ prize: newPrize, assignedChildIds: selectedChildren }).then(() => {
        closeHandler();
      });
    }
  };

  const toggleChildSelection = (id: number) => {
    if (selectedChildren.includes(id)) {
      setSelectedChildren(selectedChildren.filter((c) => c !== id));
    } else {
      setSelectedChildren([...selectedChildren, id]);
    }
  };

  const canSubmit = nameControl.value !== "" && costControl.value >= 0;

  return (
    <CustomModal controls={modalControl} ModalButton={ModalButton}>
      <div className="modal-header">
        <div className="modal-title fs-4">
          {existingPrize ? "Edit" : "Add"} Prize
        </div>
        <button type="button" className="btn-close" onClick={closeHandler}></button>
      </div>
      <div className="modal-body">
        <form onSubmit={submitHandler}>
          <div className="row">
            <div className="col">
              <TextInput control={nameControl} label="Name" />
              <TextInput control={descriptionControl} label="Description" isTextArea={true} rows={2} />
              <TextInput control={urlControl} label="URL" />
            </div>
            <div className="col-auto">
              <NumberInput control={costControl} label="Cost (points)" />
              <div className="form-check my-2">
                <label className="form-check-label">
                  <input className="form-check-input"
                    type="checkbox"
                    checked={active}
                    onClick={() => setActive(a => !a)} />
                  Available
                </label>
              </div>
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
