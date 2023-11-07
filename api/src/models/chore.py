from typing import List, Optional
from pydantic import BaseModel


class Chore(BaseModel):
  id: int
  name: str
  description: Optional[str]
  points: int
  days_of_week: List[int]
  parent_id: Optional[int]