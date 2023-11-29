from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from src.features.prizes import prize_repository
from src.features.people import people_repository
from src.models.prize import Prize
from src.models.user import User
from src.services.oauth_service import authenticate_user


router = APIRouter(
    prefix="/prize", responses={404: {"description": "Prize Endpoint Not Found"}}
)


class PrizeRequest(BaseModel):
    id: int
    name: str
    description: Optional[str]
    cost: int
    image_filename: Optional[str]
    url: Optional[str]
    active: bool
    assigned_child_ids: List[int]


@router.get("/parent/all")
def get_parents_prizes(user: User = Depends(authenticate_user)):
    return prize_repository.get_parents_prizes(user.username)


@router.get("/children/{id}")
def get_parents_children_with_prize(id: int, user: User = Depends(authenticate_user)):
    return prize_repository.get_parents_children_with_prize(id, user.username)


@router.post("")
def add_prize(body: PrizeRequest, user: User = Depends(authenticate_user)):
    parent_id = people_repository.get_parent_id(user.username)
    prize = Prize(
        id=0,
        name=body.name,
        description=body.description,
        cost=body.cost,
        image_filename=body.image_filename,
        active=body.active,
        url=body.url,
        parent_id=parent_id,
    )
    new_prize = prize_repository.add_prize(prize, parent_id)
    for child_id in body.assigned_child_ids:
        prize_repository.assign_prize_to_child(new_prize.id, child_id)


@router.put("")
def update_prize(body: PrizeRequest):
    prize = Prize(
        id=body.id,
        name=body.name,
        description=body.description,
        cost=body.cost,
        image_filename=body.image_filename,
        active=body.active,
        url=body.url,
        parent_id=-1,
    )
    prize_repository.update_prize(prize)
    prize_repository.unassign_prize(prize.id)
    for child_id in body.assigned_child_ids:
        prize_repository.assign_prize_to_child(prize.id, child_id)


@router.delete("/{id}")
def delete_prize(id: int):
    prize_repository.delete_prize(id)


@router.get("/child/{child_id}")
def get_childs_prize(child_id: int):
    return prize_repository.get_childs_prizes(child_id)


@router.post("/{prize_id}/purchase/{child_id}")
def purchase_prize(prize_id: int, child_id: int):
    child = people_repository.get_child(child_id)
    prize = prize_repository.get_prize(prize_id)
    child_prize_id = prize_repository.get_child_prize_id(child.id, prize.id)
    if child.points >= prize.cost:
        prize_repository.purchase_prize(child_prize_id)
        child.points -= prize.cost
        people_repository.update_child(child)
    else:
        raise HTTPException(
            status_code=400, detail="Unable to purchase prize. Too expensive."
        )


@router.get("/purchases/{child_id}")
def get_purchases_for_child(child_id: int):
    return prize_repository.get_purchases_for_child(child_id)


@router.post("/{purchase_id}/undo/{child_id}")
def undo_purchase(purchase_id: int, child_id: int):
    child = people_repository.get_child(child_id)
    cost = prize_repository.get_cost_for_purchase(purchase_id)
    prize_repository.delete_purchase(purchase_id)
    child.points += cost
    people_repository.update_child(child)
