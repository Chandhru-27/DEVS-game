extends Area2D

var operator : String
var value    : int

signal hit(operator: String, value: int)

func _ready():
	# Pick a random operator and number
	var ops = ["+", "-", "*", "/"]
	operator = ops[randi() % ops.size()]
	value    = randi_range(1, 9)

	# show text like "+4" or "*3"
	$Label.text = operator + str(value)

	# connect to player's body_entered detection
	connect("body_entered", Callable(self, "_on_body_entered"))

func _on_body_entered(body):
	if body.name == "Rocket":   # player name
		emit_signal("hit", operator, value)
		queue_free()
