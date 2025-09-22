from dataclasses import field
from pydantic import BaseModel , Field

class Player(BaseModel):
    name: str = Field(min_length=3, max_length=50)
    score: int

class UpdateScore(BaseModel):
    player_id: int
    score: int
