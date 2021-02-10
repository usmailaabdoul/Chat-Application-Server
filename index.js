const createServer = require('./src/server');
const setUpMongoose = require('./config/mongoose');
const socketIo = require('./src/socketIo');

const server = createServer()

const mongoUrl = 'mongodb://localhost/chatApp'

const options = {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
}


const io = require('socket.io')(server, options);

const PORT = process.env.PORT || 5000;

async function init() {
  await setUpMongoose(mongoUrl);

  return server;
}

init().then(server => {
  server.listen(PORT, () => {
    console.log(`app is running on port ${PORT}`);
    socketIo(io)
  })
})