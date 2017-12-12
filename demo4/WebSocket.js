var app = require('http').createServer();
var io  = require('socket.io')(app);

var PORT = 3000;

var player = { count: 0 };

app.listen(PORT);

io.on('connection', function (socket) {
  player.count++;
  player.name = 'player' + player.count;

  io.emit('connects', player.name + '加入聊天室～');

  socket.on('message', function (str) {
    io.emit('message', player.name + ':' + str);
  });

  socket.on('disconnect', function(str) {
  	io.emit('disconnect', player.name + '离开了聊天室');
  });

  socket.on('changeName', function(str) {
  	player.name = str;
  	socket.emit('changeName', '名字已经换成：' + str );
  })
});

console.log("WebSocket 打开在端口" + PORT)