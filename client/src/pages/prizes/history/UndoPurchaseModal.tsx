import { FC } from "react"
import { useUndoPurchaseMutation } from "../prizeHooks"
import { useModal, ModalButton, CustomModal } from "../../../components/ui/CustomModal"
import { useAuthorizeUserMutation } from "../../../hooks/peopleHooks"
import toast from "react-hot-toast"
import { PinInput } from "../../parents/PinInput"

export const UndoPurchaseModal: FC<{
  childId: number
  purchaseId: number
}> = ({ childId, purchaseId }) => {
  const undoPurchaseMutation = useUndoPurchaseMutation(childId)
  const authorizeUserMutation = useAuthorizeUserMutation()

  const authorizeUser = async (pin: string) => {
    authorizeUserMutation.mutateAsync(pin).then((authorized) => {
      if (authorized)
        undoPurchaseMutation.mutateAsync(purchaseId).then(() => {
          modalControl.hide()
        })
      else
        toast.error("Invalid PIN")
    })
  };
  const modalControl = useModal("Undo Purchase", "lg");
  const ModalButton: ModalButton = ({ showModal }) => (
    <button className="btn btn-outline-secondary" onClick={showModal}>
      <i className="bi-arrow-counterclockwise" />
    </button>
  );
  return (
    <CustomModal controls={modalControl} ModalButton={ModalButton}>
      <div className="modal-body">
        <PinInput onAuthorize={authorizeUser} />
      </div>
    </CustomModal>
  )
}
