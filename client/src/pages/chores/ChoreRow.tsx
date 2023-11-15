import { FC, useState } from "react"
import ConfettiExplosion from "react-confetti-explosion";
import { ChildChore } from "../../models/ChildChore";
import { FormatYearMonthDay } from "../../utils/dateConverter";
import { useUpdateChoreStatusMutation } from "./choreHooks";
import { Child } from "../../models/Child";
import { ChoreNoteModal } from "./ChoreNoteModal";

export const ChoreRow: FC<{
  chore: ChildChore,
  date: Date,
  child: Child
}> = ({ chore, date, child }) => {
  const formattedDate = FormatYearMonthDay(date, '-')
  const updateChoreStatusMutation = useUpdateChoreStatusMutation(formattedDate, child.id)
  const [showConfetti, setShowConfetti] = useState(false)

  const clickHandler = () => {
    if (chore.status === 'Complete') {
      updateChoreStatusMutation.mutate({ childChoreId: chore.id, status: 'Incomplete' })
    } else {
      updateChoreStatusMutation.mutateAsync({ childChoreId: chore.id, status: 'Complete' }).then(() => {
        try {
          setShowConfetti(true);
          const timeoutId = setTimeout(() => {
            setShowConfetti(false);
          }, 2200);

          return () => clearTimeout(timeoutId);
        } catch (error) {
          console.error("Error updating chore status:", error);
        }
      });
    }
  };
  return (
    <div className="row my-1 fs-5">
      {showConfetti &&
        <div className="d-flex justify-content-center">
          <ConfettiExplosion />
        </div>
      }
      <div className="col-8 px-1">
        <div className={`border border-${child.cardColor} rounded-4 ps-2 py-2`}>
          <div className="row">
            <div className="col my-auto pe-0">
              {chore.chore?.name}
            </div>
            <div className="col-auto pe-3 col-md-2 col-lg-1 text-center my-auto ps-0">
              <ChoreNoteModal chore={chore} date={formattedDate} />
            </div>
          </div>
        </div>
      </div>
      <div className="col-2 text-center px-1">
        <div className={`border border-${child.cardColor} rounded-4 h-100 py-2`}>
          {chore.chore?.points}
        </div>
      </div>
      <div className="col-2 text-center px-1">
        <div className={`border border-${child.cardColor} rounded-4 h-100 py-2`}
          onClick={clickHandler}>
          <i className={`${chore.status === "Complete" ? "bi-star-fill" : ""}`} />
        </div>
      </div>
    </div>
  )
}
