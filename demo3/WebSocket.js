var ws   = require("nodejs-websocket")
var port = 2333
var player = 0
// Scream server example: "hi" -> "HI!!!"
var server = ws.createServer(function (conn) {
	
	player++
	
	console.log("palyer"+ player +"连接加入～～")

	broadcast("palyer"+ player +"加入聊天室")

	conn.on("text", function (str) {
		console.log("Received "+str)
		broadcast(str.toUpperCase()+"!!!")
	})
	conn.on("close", function (code, reason) {
		console.log("Connection closed")
		broadcast("palyer"+ player +"离开聊天室")
	})
	conn.on("error", function (err) {
		console.log(err)
	})
}).listen(port)

function broadcast(msg) {
	server.connections.forEach(function (conn) {
		conn.sendText(msg)
	})
}

console.log("WebSocket 打开在端口" + port)