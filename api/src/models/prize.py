from typing import Optional
from pydantic import BaseModel


class Prize(BaseModel):
    id: int
    name: str
    description: Optional[str]
    cost: int
    image_filename: Optional[str]
    url: Optional[str]
    active: bool
    parent_id: int
