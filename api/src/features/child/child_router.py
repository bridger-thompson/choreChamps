from fastapi import APIRouter, Depends
from src.features.child import child_repository
from src.models.child import Child
from src.models.user import User
from src.services.oauth_service import authenticate_user

parent_id = 1

router = APIRouter(
    prefix="/child", responses={404: {"description": "Chore Endpoint Not Found"}}
)


@router.get("/all")
def get_all_children_for_parent():
    return child_repository.get_all_children_for_parent(parent_id)


@router.get("/{id}")
def get_child(id: int):
    return child_repository.get_child(id)


@router.post("")
def add_child(body: Child):
    child_repository.add_child(body, parent_id)


@router.put("")
def update_child(body: Child):
    child_repository.update_child(body)


@router.delete("/{id}")
def delete_child(id: int):
    child_repository.delete_child(id)


@router.get("/points/{id}")
def get_childs_points(id: int):
    return child_repository.get_childs_points(id)
