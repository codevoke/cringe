socket = io.connect("https://potential-couscous-g9x9p46jg44399q5-5000.app.github.dev/")
console.log(socket)


socket.on("draw_player", (event) => {
  var json = event;
  other_players = null;
  other_players = json;
})

socket.on("message", (event) => {
  var json = event;
  console.log(event)
  createMessage(
    json['author'],
    json['message'],
    json['author_color']
  );
})

function emit_msg(data) {
  socket.emit("message", data);
}

function emit_player_data(data) {
  socket.emit("redraw", data);
}

window.addEventListener('beforeunload', () => {
  socket.emit('leave', {"username": player.username});
});

function emit_hello() {
  socket.emit("hello", {"username": player.username})
}