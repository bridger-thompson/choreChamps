from fastapi import APIRouter
from src.features.child import child_repository


router = APIRouter(
  prefix="/child",
  responses={404: {"description": "Chore Endpoint Not Found"}}
)

@router.get("/all")
def get_all_children_for_parent():
  parent_id = 1
  return child_repository.get_all_children_for_parent(parent_id)