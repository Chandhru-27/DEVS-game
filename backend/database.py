from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session
from models import Player
from schema import PlayerDB
from dotenv import load_dotenv
import os
load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

engine = create_engine(DATABASE_URL)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def get_db() -> Session:
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def create_tables():
    Base.metadata.create_all(bind=engine)

def add_player(player: Player):
    db = SessionLocal()
    try:
        db_player = PlayerDB(
            name=player.name
        )
        db.add(db_player)
        db.commit()
        db.refresh(db_player)
        return db_player
    finally:
        db.close()

def get_all_players():
    db = SessionLocal()
    try:
        return db.query(PlayerDB).all()
    finally:
        db.close()

def get_player_by_id(player_id: int):
    """Get a player by ID"""
    db = SessionLocal()
    try:
        return db.query(PlayerDB).filter(PlayerDB.player_id == player_id).first()
    finally:
        db.close()

def update_player_score(player_id: int, new_score: int):
    """Update a player's score"""
    db = SessionLocal()
    try:
        player = db.query(PlayerDB).filter(PlayerDB.player_id == player_id).first()
        if player:
            player.score = new_score
            db.commit()
            db.refresh(player)
        return player
    finally:
        db.close()
