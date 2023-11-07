from pydantic import BaseModel


class Child(BaseModel):
  id: int
  name: str
  card_color: str
  points: int