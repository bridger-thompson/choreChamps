from datetime import datetime
from typing import Optional
from pydantic import BaseModel
from src.models.chore import Chore


class ChildChore(BaseModel):
  id: int
  child_id: int
  chore_id: int
  chore: Optional[Chore] = None
  status: str
  date: datetime
  note: Optional[str]