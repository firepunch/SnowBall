var Img = {};
Img.player = new Image();
Img.player.src = '/public/image/skeleton.png';
var skeletonSheet = new spriteSheet(Img.player, 9, 2, 64, 64);

Img.map = new Image();
Img.map.src = '/public/image/map.png';

var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');
canvas.width = 1340;
canvas.height = 640;

var socket = io();

var modal = document.getElementById('myModal');
var nickBox = document.getElementById('nickBox');
var guest = document.getElementById('guest');
modal.style.display = 'block';

// When the user press enter key, play as guest
nickBox.addEventListener("keydown", function(event) {
    event.preventDefault();
    if (event.which == 13 || event.keyCode == 13) {
        // trigger / dispatch 로 바꾸기
        // 글씨만 써지면 trigger 성공
        modalHello();
    }
});

guest.addEventListener('mousedown', modalHello);

function modalHello() {
    var nickname = nickBox.value;
    socket.emit('nickname',  nickname);
    modal.style.display = 'none';
}

socket.on('newPosition', function (data) {
    ctx.clearRect(0, 0, 500, 500); // 캔버스를 깨끗이
    ctx.drawImage(Img.map, 0, 0, 1340, 640, 0, 0, canvas.width, canvas.height);
    for(var i = 0 ; i < data.player.length; i++) // 플레이어마다 해골 그림
        ctx.drawImage(skeletonSheet.getSheet(data.player[i].ImageIndex), data.player[i].locationX - 32, data.player[i].locationY - 32);

    for(var i = 0 ; i < data.ball.length; i++) { // 공 그림
        ctx.fillRect(data.ball[i].locationX - 32, data.ball[i].locationY - 32 - 5, 10, 10);
    }
});

document.onkeydown = function (event) {
    if (event.keyCode === 68) //d
        socket.emit('keyPress', {inputId: 'right', state: true});
    else if (event.keyCode === 65) //a
        socket.emit('keyPress', {inputId: 'left', state: true});
    else if (event.keyCode === 87) // w
        socket.emit('keyPress', {inputId: 'up', state: true});
}

document.onkeyup = function (event) {
    if (event.keyCode === 68)	//d
        socket.emit('keyPress', {inputId: 'right', state: false});
    else if (event.keyCode === 65) //a
        socket.emit('keyPress', {inputId: 'left', state: false});
    else if (event.keyCode === 87) // w
        socket.emit('keyPress', {inputId: 'up', state: false});
}