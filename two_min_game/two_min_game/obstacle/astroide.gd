extends Area2D

@export var speed := 400.0

func _physics_process(delta: float) -> void:
	position.x -= speed * delta
	# If it goes off screen to the left, remove it
	if position.x < -200:
		queue_free()

func _on_body_entered(body: Node) -> void:
	if body.name == "Rocket":
		get_tree().call_group("game", "end_game")
