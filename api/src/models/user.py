from pydantic import BaseModel
from typing import List

class User(BaseModel):
    preferred_username: str
    sub: str
    groups: List[str]
    badgerid: str
    azp: str
    token: str
    email: str
    
