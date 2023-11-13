from datetime import datetime
from fastapi import APIRouter
from src.features.chores import chore_service

router = APIRouter(
    prefix="/chore", responses={404: {"description": "Chore Endpoint Not Found"}}
)


@router.get("/{date_string}/child/{child_id}")
def get_chores_for_day(date_string: str, child_id: int):
    date: datetime = datetime.strptime(date_string, "%Y-%m-%d")
    return chore_service.create_and_get_chores_for_date(date, child_id)


@router.put("/{id}/{status}")
def update_chore_status(id: int, status: str):
    chore_service.update_chore_status_and_points(id, status)
