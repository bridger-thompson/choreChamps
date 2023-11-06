from fastapi import APIRouter
from src.features.chores import chore_repository

router = APIRouter(
  prefix="/chore",
  responses={404: {"description": "Chore Endpoint Not Found"}}
)

@router.get("/all")
def get_all_chores():
  return chore_repository.get_all_chores()