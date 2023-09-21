message_inp.addEventListener("focus", () => move.move_access = false)
message_inp.addEventListener("blur", () => move.move_access = true)
message_send.addEventListener("click", sendMessage)
// const cnv = $("#game")
// context = cnv.getContext("2d")

player = {
    "username": prompt("Your name?"),
    "color": getRandomColor(),
    "width": defaultPlayerWidth,
    "height": defaultPlayerHeight,
    "x": defaultPlayerStartXPos,
    "y": defaultPlayerStartYPos
}
emit_hello();

other_players = {};
move = {
    "up": false,
    "down": false,
    "left": false,
    "right": false,
    "move_access": true
}

function drawPlayer() {
    drawRect(
        player.x,
        player.y,
        player.width,
        player.height,
        player.color,
        player.username
    )
}

let fps = 0;

function movePlayer() {
    if (player.x+player.width+defRightSpeed*(move.right+0) <= window.screen.width)
        player.x += defRightSpeed*(move.right+0);

    if (player.x+defLeftSpeed*(move.left+0) * -1 >= 0)
        player.x += defLeftSpeed*(move.left+0) * -1;

    if (player.y+player.height+defDownSpeed*(move.down+0) <= window.screen.height)
        player.y += defDownSpeed * (move.down + 0)

    if (player.y+defUpSpeed*(move.up+0) * -1 >= 0)
        player.y += defUpSpeed*(move.up+0) * -1
}

function loop() {
    fps += 1;
    _clearDom();
    drawPlayer();
    drawOtherPlayers(other_players);
    emit_player_data(player);
  
    if (move.move_access)
        movePlayer();
    setTimeout(loop, 5)
}

function _fps() {
    fps_elem.innerText = `${fps} FPS`
    fps = 0;

    setTimeout(_fps, 1000)
}

_fps();
loop();


document.addEventListener("keydown",
    (event) => {
        if (event.code === "KeyW")
            move.up = true
        if (event.code === "KeyA")
            move.left = true
        if (event.code === "KeyS")
            move.down = true
        if (event.code === "KeyD")
            move.right = true
    }
)
document.addEventListener("keyup",
    (event) => {
        if (event.code === "KeyW")
            move.up = false
        if (event.code === "KeyA")
            move.left = false
        if (event.code === "KeyS")
            move.down = false
        if (event.code === "KeyD")
            move.right = false
    }
)