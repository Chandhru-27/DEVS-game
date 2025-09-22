from sqlalchemy import Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class PlayerDB(Base):
    __tablename__ = "players"
    
    player_id = Column(Integer, primary_key=True, index=True)
    name = Column(String(50), nullable=False)
    score = Column(Integer, default=0)
