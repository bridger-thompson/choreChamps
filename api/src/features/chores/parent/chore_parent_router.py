from typing import List, Optional
from fastapi import APIRouter, Depends
from pydantic import BaseModel
from src.features.chores.parent import chore_parent_repository
from src.models.chore import Chore
from src.features.people import people_repository
from src.models.user import User
from src.services.oauth_service import authenticate_user


class UpdateChoreRequest(BaseModel):
    id: int
    name: str
    description: Optional[str]
    points: int
    days_of_week: List[int]
    assigned_child_ids: List[int]


router = APIRouter(
    prefix="/parent_chore",
    responses={404: {"description": "Parent Chore Endpoint Not Found"}},
)


@router.get("/all")
def get_all_chores(user: User = Depends(authenticate_user)):
    parent_id = people_repository.get_parent_id(user.username)
    return chore_parent_repository.get_all_chores_for_parent(parent_id)


@router.post("")
def add_chore(body: UpdateChoreRequest, user: User = Depends(authenticate_user)):
    parent_id = people_repository.get_parent_id(user.username)
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
def get_parents_children_with_chore(id: int, user: User = Depends(authenticate_user)):
    return chore_parent_repository.get_parents_children_with_chore(id, user.username)
