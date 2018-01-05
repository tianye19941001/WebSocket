var app = require('http').createServer();
var io  = require('socket.io')(app);

var PORT = 3000;

var player = { count: 0 };

app.listen(PORT);

io.on('connection', function (socket) {
  player.count++;
  socket.nickName = 'player' + player.count;

  io.emit('connects', socket.nickName + '加入聊天室～');

  socket.on('message', function (str) {
    io.emit('message', socket.nickName + ':' + str);
  });

  socket.on('disconnect', function(str) {
  	io.emit('disconnect', socket.nickName + '离开了聊天室');
  });

  socket.on('changeName', function(str) {
  	socket.nickName = str;
  	socket.emit('changeName', '名字已经换成：' + str );
  })
});

console.log("WebSocket 打开在端口" + PORT)