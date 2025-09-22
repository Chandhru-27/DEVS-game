from fastapi import FastAPI
from models import Player, UpdateScore
from database import add_player, get_all_players, get_player_by_id, update_player_score
app = FastAPI()

@app.get("/players")
def get_players() ->dict[str, list[Player]]:
    players = get_all_players()
    return {
        "players": players
    }
    
@app.post("/players/create")
def create_player(player: Player):
    status = add_player(player) 
    return {"success": status}

@app.post("/players/update")
def update_scores(score: UpdateScore):
    update_player_score(score.player_id, score.score)
    return {"sucess":True}

@app.get("/players/{player_id}")
def get_player(player_id: int) -> Player:
    player = get_player_by_id(player_id)
    return player
    