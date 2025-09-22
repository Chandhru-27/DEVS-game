extends Node2D

@export var obstacle_scene: PackedScene         # drag your obstacle scene here
@export var spawn_area_width: float = 800.0     # total horizontal spread
@export var spawn_height: float = -50.0         # y-position to spawn
@export var spawn_interval: float = 0.6         # ↓ lower this to increase density
@export var max_obstacles: int = 20             # total obstacles alive at once

@onready var spawn_timer: Timer = Timer.new()

var active_obstacles := []

func _ready() -> void:
	spawn_timer.wait_time = spawn_interval
	spawn_timer.start()

func _on_SpawnTimer_timeout() -> void:
	# --- Keep many obstacles on screen ---
	if active_obstacles.size() >= max_obstacles:
		return

	var obs := obstacle_scene.instantiate()
	add_child(obs)

	# Random horizontal position
	obs.position.x = randf_range(-spawn_area_width/2, spawn_area_width/2)
	obs.position.y = spawn_height

	# --- Random X scale with negative possibility (flip) ---
	# x for mul = just multiply by random sign
	var random_scale_x = randf_range(0.8, 1.5) * (1 if randf() < 0.5 else -1)
	obs.scale.x = random_scale_x
	obs.scale.y = randf_range(0.8, 1.5)

	active_obstacles.append(obs)

	# Clean up when the obstacle is freed
	obs.connect("tree_exited", Callable(self, "_on_obstacle_freed").bind(obs))

func _on_obstacle_freed(obs: Node) -> void:
	active_obstacles.erase(obs)
