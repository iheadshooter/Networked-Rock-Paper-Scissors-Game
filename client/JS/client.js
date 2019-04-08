var sock = io();

sock.on("msg", onMessage);


function onMessage(text) {
    var list = document.getElementById("chat");
    var el = document.createElement("li");
    el.innerHTML = text;
    list.appendChild(el);
}

var form = document.getElementById("chat-form");

form.addEventListener('submit', function(e) {
    var input = document.getElementById("chat-input");
    var value = input.value;
    input.value = ' ';
    sock.emit('msg', value);
    e.preventDefault();
});

// var x = document.getElementById("rock");
// x.addEventListener("click", () => {
//     console.log("clicked");
//     sock.emit("turn", "rock");
// });

function addButtonListeners() {
    ['rock', 'paper', 'scissors'].forEach((id, idx) => {
        const button = document.getElementById(id)
        button.addEventListener('click', () => {
            sock.emit("turn", idx);    
        });
    });
}

addButtonListeners();