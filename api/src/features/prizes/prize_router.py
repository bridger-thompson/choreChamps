from typing import List, Optional
from fastapi import APIRouter
from pydantic import BaseModel
from src.features.prizes import prize_repository
from src.models.prize import Prize


router = APIRouter(
    prefix="/prize", responses={404: {"description": "Prize Endpoint Not Found"}}
)

parent_id = 1


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
def get_parents_prizes():
    return prize_repository.get_parents_prizes(parent_id)


@router.get("/children/{id}")
def get_parents_children_with_prize(id: int):
    return prize_repository.get_parents_children_with_prize(id, parent_id)


@router.post("")
def add_prize(body: PrizeRequest):
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
        parent_id=parent_id,
    )
    prize_repository.update_prize(prize)
    prize_repository.unassign_prize(prize.id)
    for child_id in body.assigned_child_ids:
        prize_repository.assign_prize_to_child(prize.id, child_id)


@router.delete("/{id}")
def delete_prize(id: int):
    prize_repository.delete_prize(id)
