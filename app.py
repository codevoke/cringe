from flask import Flask, render_template
from flask_socketio import SocketIO, join_room, leave_room, emit

player_data = {}

app = Flask(__name__)
app.config['ENGINEIO_MAX_HTTP_BUFFER_SIZE'] = 10 * 1024 * 1024
app.config['SECRET_KEY'] = "hqujdiuqhdqd"
socket = SocketIO(app)


@app.route("/")
def main():
  return render_template("index.html")


@socket.on("connect")
def connect():
  join_room("main_room")


@socket.on("hello")
def conn(data):
  emit("message", {
    "author": "SERVER",
    "message": f"Player {data['username']} connected",
    "author_color": "#ff0000"
  }, broadcast=True, to="main_room")


@socket.on("redraw")
def redraw(data):
  global player_data

  player_data[data['username']] = data
  emit("draw_player", player_data, broadcast=True, to="main_room")


@socket.on("message")
def msg(data):
  emit("message", data, to="main_room", broadcast=True)


@socket.on("leave")
def leave(data):
  global player_data
  player_data = {}

  emit("message", {
    "author": "SERVER",
    "message": f"Player {data['username']} disconnected",
    "author_color": "#ff0000"
  }, to="main_room", broadcast=True)

  leave_room("main_room")


if __name__ == "__main__":
  app.run(host="0.0.0.0")
