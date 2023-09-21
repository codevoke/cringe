function $(selector) {
    return document.querySelector(selector)
}
function $$(selector) {
    return document.querySelectorAll(selector)
}
function rndInt(from, to) {
    return Math.floor(Math.random() * (to - from + 1)) + from;
}
function getRandomColor() {
    let [r, g, b] = [...Array(3)].map(i => rndInt(20, 240).toString(16))
    return `#${r}${g}${b}`
}
function drawRect(x, y, width, height, color, username) {
    let rect = document.createElement('div')
    rect.setAttribute("data-name", username)
    rect.setAttribute("style", `position:absolute;background:${color};width:${width}px;height:${height}px;top:${y}px;left:${x}px;`);
    rect.classList.add("redraw", "player")
    document.body.append(rect);
}

function drawOtherPlayers(dict) {
  delete dict[player.username];
  for (let username of Object.keys(dict)) {
    drawRect(
      dict[username]["x"],
      dict[username]["y"],
      dict[username]["width"],
      dict[username]["height"],
      dict[username]["color"],
      dict[username]["username"],
    )
  }
}

function _clearDom() {
    for (let elem of document.querySelectorAll(".redraw")) {
        elem.remove();
    }
}

function createMessage(author, message, author_color="#f00") {
    let msg = document.createElement('div')
    msg.innerHTML = `<span style="color:${author_color}">[${author}]</span> : ${message}`;
    if (message_box.children.length === 20)
        message_box.children[0].remove();
    message_box.append(msg);
}

function sendMessage() {
    let message = message_inp.value;
    emit_msg({
      "author": player.username,
      "message": message,
      "author_color": player.color
    })
    message_inp.value = "";
}

/*
 *
 *      DEFAULT PLAYER CONSTANTS
 *
 */

const defaultPlayerWidth = 100;
const defaultPlayerHeight = 100;
const defaultPlayerStartXPos = 100;
const defaultPlayerStartYPos = 100;

const fps_elem = $("#fps")

const defRightSpeed = 2;
const defLeftSpeed = 2;
const defUpSpeed = 2;
const defDownSpeed = 2;

const message_inp = document.querySelector("#msg-input")
const message_send = document.querySelector("#send-btn")
const message_box = document.querySelector("#msg-box")