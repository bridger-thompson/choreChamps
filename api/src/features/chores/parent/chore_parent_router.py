from fastapi import APIRouter
from src.features.chores.parent import chore_parent_repository
from src.models.chore import Chore


router = APIRouter(
  prefix="/parent_chore",
  responses={404: {"description": "Parent Chore Endpoint Not Found"}}
)

@router.get("/all")
def get_all_chores():
  return chore_parent_repository.get_all_chores()


@router.post("")
def add_chore(body: Chore):
  chore_parent_repository.add_chore(body)


@router.put("")
def update_chore(body: Chore):
  chore_parent_repository.update_chore(body)


@router.delete("/{id}")
def delete_chore(id: int):
  chore_parent_repository.delete_chore(id)


@router.get("/{id}/children")
def get_parents_children_with_chore(
  id: int
):
  parent_id = 1 # replace with auth
  return chore_parent_repository.get_parents_children_with_chore(id, parent_id)


@router.post("/{id}/child/{child_id}")
def assign_chore_to_child(
  id: int,
  child_id: int
):
  chore_parent_repository.assign_chore_to_child(id, child_id)


@router.delete("/{id}/child/{child_id}")
def unassign_chore_to_child(
  id: int,
  child_id: int
):
  chore_parent_repository.unassign_chore_to_child(id, child_id)