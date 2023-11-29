from datetime import datetime
from typing import List
from src.features.chores import chore_repository
from src.models.child_chore import ChildChore
from src.models.child_chore_metadata import ChildChoreMetadata


def create_and_get_chores_for_date(date: datetime, child_id: int):
    day_of_week = (date.weekday() + 1) % 7
    scheduled_chores = chore_repository.get_chores_scheduled_for_day_of_week(
        day_of_week, child_id
    )
    chores: List[ChildChore] = []
    for chore in scheduled_chores:
        child_chore = chore_repository.get_chore_scheduled_for_day(
            date, child_id, chore.id
        )
        if child_chore:
            child_chore.chore = chore
            chores.append(child_chore)
        else:
            new_chore = chore_repository.create_child_chore(child_id, chore.id, date)
            new_chore.chore = chore
            chores.append(new_chore)
    return chores


def update_chore_status_and_points(id: int, status: str):
    chore_repository.update_chore_status(id, status)


def update_note(id: int, note: str):
    chore_repository.update_note(id, note)


def get_childs_chore_metadata(child_id: int):
    avg_num_chores = chore_repository.get_avg_num_chores_child_has(child_id)
    percent_complete_last_week = (
        chore_repository.get_percent_child_completed_for_num_days(child_id, 7)
    )
    percent_complete_last_month = (
        chore_repository.get_percent_child_completed_for_num_days(child_id, 30)
    )
    child_chore_metadata = ChildChoreMetadata(
        avg_num_chores=avg_num_chores,
        percent_complete_last_week=percent_complete_last_week,
        percent_complete_last_month=percent_complete_last_month,
    )
    return child_chore_metadata
