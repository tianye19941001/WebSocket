var ws   = require("nodejs-websocket")
var port = 2333
// Scream server example: "hi" -> "HI!!!"
var server = ws.createServer(function (conn) {
	console.log("新连接加入～～")
	conn.sendText("本地WebSocket欢迎你的加入");
	conn.on("text", function (str) {
		console.log("Received "+str)
		conn.sendText(str.toUpperCase()+"!!!")
	})
	conn.on("close", function (code, reason) {
		console.log("Connection closed")
	})
	conn.on("error", function (err) {
		console.log(err)
	})
}).listen(port)

console.log("WebSocket 打开在端口" + port)