const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const market = require('./market');

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/api/market', (req, res) => {
  res.send(market.marketPositions);
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

setInterval(() => {
  market.updateMarket();
  io.sockets.emit("market", market.marketPositions[0]);
}, 5000);

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('chat message', (msg) => {
    console.log('user disconnected');
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

http.listen(3000, () => {
  console.log('Listening on 3000');
});
