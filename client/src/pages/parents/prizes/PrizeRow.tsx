import { FC } from "react";
import { Prize } from "../../../models/Prize";
import { Spinner } from "../../../components/ui/Spinner";
import { ConfirmationToast } from "../../../components/forms/ConfirmationToast";
import toast from "react-hot-toast";
import { useDeletePrizeMutation, useGetChildrenWithPrizeQuery } from "./prizeHooks";
import { PrizeEditorModal } from "./PrizeEditorModal";

export const PrizeRow: FC<{
  prize: Prize;
}> = ({ prize }) => {
  const childrenWithPrizeQuery = useGetChildrenWithPrizeQuery(prize.id);
  const children = childrenWithPrizeQuery.data ?? [];
  const deleteMutation = useDeletePrizeMutation();

  if (childrenWithPrizeQuery.isLoading) return <Spinner />;

  const deleteHandler = () => {
    toast((t) => (
      <ConfirmationToast
        toastId={t.id}
        message={"Are you sure you want to delete this prize?"}
        confirmHandler={() => {
          deleteMutation.mutate(prize.id);
          toast.dismiss(t.id);
        }}
      />
    ), { duration: Infinity });
  };

  return (
    <div className="row mx-3">
      {prize.imageFilename &&
        <div className="col-auto">
          <img src={`/api/prize/image/${prize.imageFilename}`} alt="Prize" />
        </div>
      }
      <div className="col-md">
        <div className="fw-bold">{prize.name}</div>
        <div>{prize.description}</div>
        <div>{prize.url}</div>
      </div>
      <div className="col-md-3">
        <div>Cost: {prize.cost} points</div>
        <div>{prize.active ? "Available" : "Unavailable"}</div>
      </div>
      <div className="col-md-2">
        <div>Assigned To:</div>
        <div className="row">
          {children.map((c) => (
            <div className="col-auto pe-0" key={c.id}>
              <div className={`border rounded-circle text-center bg-${c.cardColor}`}
                style={{ width: "25px", height: "25px" }}>
                {c.name[0]}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="col-auto my-auto">
        <PrizeEditorModal existingPrize={prize} childrenWithPrize={children.map(c => c.id)} />
      </div>
      <div className="col-auto my-auto">
        <button className="btn btn-outline-danger"
          onClick={deleteHandler}>
          <i className="bi-trash" />
        </button>
      </div>
    </div>
  );
};
