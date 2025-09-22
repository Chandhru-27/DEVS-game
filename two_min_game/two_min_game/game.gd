extends Node2D

@onready var camera: Camera2D = $Environment/Camera2D
@onready var rocket: CharacterBody2D = $Environment/Rocket
@onready var label: Label = $CanvasLayer/Control/Label
@onready var game_timer: Timer = $GameTimer
@onready var timer_label: Label = $CanvasLayer/Control/Label2
@onready var environment: Node2D = $Environment

func _ready() -> void:
	game_timer.start()

func _process(delta: float) -> void:
	camera.position.x = rocket.position.x 
	var time_left = int(game_timer.time_left)
	timer_label.text = "Time: %02d:%02d" % [time_left/60, time_left%60]

func end_game() -> void:
	environment.modulate = Color(1, 1, 1, 0.5)
	environment.get_tree().paused = true

func _on_GameTimer_timeout() -> void:
	end_game()
