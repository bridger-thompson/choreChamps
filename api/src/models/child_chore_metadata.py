from pydantic import BaseModel


class ChildChoreMetadata(BaseModel):
    avg_num_chores: float
    percent_complete_last_week: float
    percent_complete_last_month: float
