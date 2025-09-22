extends CharacterBody2D

# ---------------- Constants ----------------
const MAX_VERTICAL_SPEED := 200.0
const MAX_X_SPEED       := 150.0
const DASH_X_SPEED      := 500.0
const DASH_TIME         := 0.3
const VERTICAL_ACCEL    := 1200.0
const VERTICAL_DECEL    := 800.0
const HORIZONTAL_DECEL  := 10000000.0   # big so it snaps back quickly

# --------------- Nodes ---------------------
@onready var dash_timer: Timer = $DashTimer   # One Shot = true, Autostart = false

# --------------- State ---------------------
var target_vspeed := 0.0
var dash_active := false

func _physics_process(delta: float) -> void:
	# ---------------- Vertical Control ----------------
	if Input.is_action_pressed("ui_up"):
		target_vspeed = -MAX_VERTICAL_SPEED
	elif Input.is_action_pressed("ui_down"):
		target_vspeed =  MAX_VERTICAL_SPEED
	else:
		target_vspeed = 0.0

	if abs(target_vspeed - velocity.y) < 1.0:
		velocity.y = target_vspeed
	elif target_vspeed == 0.0:
		velocity.y = move_toward(velocity.y, 0.0, VERTICAL_DECEL * delta)
	else:
		velocity.y = move_toward(velocity.y, target_vspeed, VERTICAL_ACCEL * delta)

	# ---------------- Dash Control ----------------
	# Start dash when key pressed
	if Input.is_action_just_pressed("ui_accept") and !dash_active:
		start_dash()

	# ✅ Stop dash immediately when key released
	if Input.is_action_just_released("ui_accept") and dash_active:
		stop_dash()

	# Horizontal speed
	if dash_active:
		velocity.x = DASH_X_SPEED
	else:
		velocity.x = move_toward(velocity.x, MAX_X_SPEED, HORIZONTAL_DECEL * delta)

	move_and_slide()

func start_dash() -> void:
	dash_active = true
	dash_timer.start(DASH_TIME)

func stop_dash() -> void:
	dash_active = false
	if !dash_timer.is_stopped():
		dash_timer.stop()

func _on_DashTimer_timeout() -> void:
	# timer fallback if player keeps holding the key
	stop_dash()
