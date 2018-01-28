let app = require('express')();
let http = require('http').Server(app);
let io = require('socket.io')(http);
let market = require('./market');

const port = 3000;

app.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
})

app.get('/api/market', function (req, res) {
	res.send(market.marketPositions);
});

app.get('/', function (req, res) {
	res.sendFile(__dirname + '/index.html');
});

setInterval(function () {
	market.updateMarket();
	io.sockets.emit("market", market.marketPositions[0]);
}, 5000);

io.on('connection', function (socket) {
	console.log('a user connected');

	socket.on('chat message', function (msg) {
		console.log('user disconnected');
	});

	socket.on('disconnect', function () {
		console.log('user disconnected');
	});
});

http.listen(port, function () {
	console.log(`Listening on *:${port}`);
});
