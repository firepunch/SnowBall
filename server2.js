
var
    express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server),
    Vector = require('./lib/vector.js'),
    Player = require('./lib/player.js'),
    Ball = require('./lib/ball.js'),
    Object = require('./lib/object.js');
    var  PORT = 3002;
    var canvasWidth = 1340;
    var getNicname = false;

var startBool = false;
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.use('/public', express.static(__dirname + '/public'));

server.listen(port = Number(process.env.PORT || PORT), function () {
    console.log("Server " + PORT + " listening");
});

var SOCKET_LIST = {};
var PLAYER_LIST = {};
var ballArr = new Array();

start();

io.sockets.on('connection', function (socket) {
    SOCKET_LIST[socket.id] = socket;
    if(getNicname){
      var player = new Player(new Vector(Math.random()*canvasWidth+1, 50), 32); // 플레이어 객체 생성
      player.id = socket;
      player.socketId = socket.id;
      PLAYER_LIST[socket.id] = player;
    }

    socket.on('disconnect', function () {
        delete SOCKET_LIST[socket.id];
        delete PLAYER_LIST[socket.id];
    });

    socket.on('nickname', function (nickname) {
        player.nickname = nickname;
        getNicname = true;
    });

    if (!startBool) {
        start();
    }
    socket.on('sendMsgToServer', function (data) {
        this.emit('sendToChat', data + '<br />' + player.nickname);
        this.broadcast.emit('receiveToChat', data + '<br />' + player.nickname); //나를제외하고 파란색으로 보냄
    });

    socket.on('evalServer', function (data) {
        if (!DEBUG)
            return;
        var res = eval(data);
        socket.emit('evalAnswer', res);
    });

    socket.on('keyPress', function (data) {
        if (data.inputId === 'left')
            player.press[65] = data.state;
        else if (data.inputId === 'right')
            player.press[68] = data.state;
        else if (data.inputId === 'up')
            player.press[87] = data.state;
    });

    socket.on('throwBall', function (data) {
      console.log("mouseY = "+data.mouseY);
        var newBall = player.throwBall(data.mouseX, data.mouseY);

        // if(data.mouseX>player.location.x){
        //   player.applyForth(new Vector(-100,0));
        // } else {
        //   player.applyForth(new Vector(100,0));
        // }
        console.log("ball dir = "+newBall.dir.x+", "+newBall.dir.y);
        console.log("power = "+newBall.power+","+player.throwPower);
        var reaction = Vector.multStatic(Vector.subStatic(new Vector(data.mouseX, data.mouseY), player.location), (newBall.power*0.00000001*-1));
        console.log("reaction = "+reaction.x+", "+reaction.y);
        player.applyForth(reaction);
        ballArr.push(newBall);
    });
});

function start() {
    startBool = true;
    setInterval(function () {
        var pack = [];
        var ball = [];
        for (var i in PLAYER_LIST) {
            var player = PLAYER_LIST[i];
            if (player.hp <= 0) {
                console.log("die");
                SOCKET_LIST[player.socketId].emit('dead');
                delete PLAYER_LIST[player.socketId];
                delete SOCKET_LIST[player.socketId];
            }
            player.run(ballArr);
            pack.push({
                locationX: player.location.x,
                locationY: player.location.y,
                vLocationX: player.vLocation.x,
                vLocationY: player.vLocation.y,
                ImageIndex: player.nowImageIndex,
                hp: player.hp, // 해골 방향 index
                score: player.score,
                name : player.nickname
            });
        }
        main : for (var loop = 0; loop < ballArr.length; loop++) {
            for (var i in PLAYER_LIST) {
                var player = PLAYER_LIST[i];
                if ((ballArr[loop].ownerId != player.id) && Vector.subStatic(player.location, ballArr[loop].location).mag() < player.mass + ballArr[loop].mass) {
                    var radius = player.mass + ballArr[loop].mass;
                    console.log("boom");
                    player.hp -= 10;

                    try{
                      PLAYER_LIST[ballArr[loop].ownerSocketId].score += 10;
                    } catch(e){

                    }

                    if (ballArr[loop].location.x > player.location.x) {
                        player.applyForth(new Vector(-1, 0));
                    } else {
                        player.applyForth(new Vector(1, 0));
                    }

                    ballArr.splice(loop, 1);
                    continue main;
                }
            }

            ballArr[loop].run();
            if (!(ballArr[loop].live)) {
                console.log("dead");
                ballArr.splice(loop, 1);
                continue;
            }
            ball.push({
                locationX: ballArr[loop].location.x,
                locationY: ballArr[loop].location.y
            })
        }

        for (var i in SOCKET_LIST) {
            var socket = SOCKET_LIST[i];
            var me={};
            me = {
                locationX: PLAYER_LIST[socket.id].location.x,
                locationY: PLAYER_LIST[socket.id].location.y,
                vLocationX: PLAYER_LIST[socket.id].vLocation.x,
                vLocationY: PLAYER_LIST[socket.id].vLocation.y,
                ImageIndex: PLAYER_LIST[socket.id].nowImageIndex,
                hp: PLAYER_LIST[socket.id].hp, // 해골 방향 index
                score: PLAYER_LIST[socket.id].score,
                name : PLAYER_LIST[socket.id].nickname
            };
            socket.emit('newPosition', pack, ball, me);
        }
    }, 1000 / 80);
}