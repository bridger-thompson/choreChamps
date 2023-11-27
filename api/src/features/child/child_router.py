from fastapi import APIRouter, Depends, HTTPException
from src.features.child import people_repository
from src.models.child import Child
from src.models.user import User
from src.services.oauth_service import authenticate_user


router = APIRouter(
    prefix="/child", responses={404: {"description": "Chore Endpoint Not Found"}}
)


@router.get("/all")
def get_all_children_for_parent(user: User = Depends(authenticate_user)):
    return people_repository.get_all_children_for_parent(user.username)


@router.get("/{id}")
def get_child(id: int):
    return people_repository.get_child(id)


@router.post("")
def add_child(body: Child, user: User = Depends(authenticate_user)):
    parent_id = people_repository.get_parent_id(user.username)
    if parent_id is not None:
        return people_repository.add_child(body, parent_id)
    print("Error adding child. Unable to find parent for username: ", user.username)
    raise HTTPException(
        status_code=400, detail="Error adding child. Unable to find parent."
    )


@router.put("")
def update_child(body: Child):
    people_repository.update_child(body)


@router.delete("/{id}")
def delete_child(id: int):
    people_repository.delete_child(id)


@router.get("/points/{id}")
def get_childs_points(id: int):
    return people_repository.get_childs_points(id)
