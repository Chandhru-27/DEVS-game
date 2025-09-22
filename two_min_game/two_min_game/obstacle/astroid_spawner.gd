extends Node2D

@export var asteroid_scene: PackedScene
@export var spawn_interval := 1.5   # seconds

func _ready() -> void:
	# spawn repeatedly
	var t := Timer.new()
	t.wait_time = spawn_interval
	t.autostart = true
	t.one_shot = false
	add_child(t)
	t.timeout.connect(_spawn_asteroid)

func _spawn_asteroid() -> void:
	var asteroid = asteroid_scene.instantiate()
	# spawn roughly 1500px in front of Rocket in x
	var rocket = get_parent().get_node("Rocket")
	asteroid.position.x = rocket.position.x + 1500
	# random Y position within viewport height
	var viewport_h = get_viewport_rect().size.y
	asteroid.position.y = randf() * viewport_h
	add_child(asteroid)
