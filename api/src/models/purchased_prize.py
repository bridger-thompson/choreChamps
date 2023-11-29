from datetime import datetime
from pydantic import BaseModel


class PurchasedPrize(BaseModel):
    purchase_id: int
    purchased_at: datetime
    prize_id: int
    prize_name: str
    cost: int
