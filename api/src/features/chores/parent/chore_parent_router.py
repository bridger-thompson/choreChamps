from typing import List, Optional
from fastapi import APIRouter
from pydantic import BaseModel
from src.features.chores.parent import chore_parent_repository
from src.models.chore import Chore


class UpdateChoreRequest(BaseModel):
    id: int
    name: str
    description: Optional[str]
    points: int
    days_of_week: List[int]
    assigned_child_ids: List[int]


parent_id = 1  # replace with auth


router = APIRouter(
    prefix="/parent_chore",
    responses={404: {"description": "Parent Chore Endpoint Not Found"}},
)


@router.get("/all")
def get_all_chores():
    return chore_parent_repository.get_all_chores()


@router.post("")
def add_chore(body: UpdateChoreRequest):
    chore = Chore(
        id=body.id,
        name=body.name,
        description=body.description,
        points=body.points,
        days_of_week=body.days_of_week,
        parent_id=parent_id,
    )
    new_chore = chore_parent_repository.add_chore(chore)
    for child_id in body.assigned_child_ids:
        chore_parent_repository.assign_chore_to_child(new_chore.id, child_id)


@router.put("")
def update_chore(body: UpdateChoreRequest):
    chore = Chore(
        id=body.id,
        name=body.name,
        description=body.description,
        points=body.points,
        days_of_week=body.days_of_week,
        parent_id=None,
    )
    chore_parent_repository.update_chore(chore)
    chore_parent_repository.unassign_chore(chore.id)
    for child_id in body.assigned_child_ids:
        chore_parent_repository.assign_chore_to_child(chore.id, child_id)


@router.delete("/{id}")
def delete_chore(id: int):
    chore_parent_repository.delete_chore(id)


@router.get("/{id}/children")
def get_parents_children_with_chore(id: int):
    return chore_parent_repository.get_parents_children_with_chore(id, parent_id)
