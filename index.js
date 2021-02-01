const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const server = require('http').createServer(app);

const options = {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
}

const io = require('socket.io')(server, options);

const userHelper = require('./users')

const PORT = process.env.PORT || 5000;

const router = require('./router');


io.on('connection', (socket) => {

  socket.on('join', ({ name, room }, callback) => {

    const { error, user } = userHelper.addUser({ id: socket.id, name, room })

    if (error) return callback(error);

    socket.emit('message', { user: 'admin', text: `${user.name}, welcome to the room ${user.room}` })
    socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name}, has joined!` });

    socket.join(user.room);

    io.to(user.room).emit('roomData', { room: user.room, users: userHelper.getUserInRoom(user.room) });

    callback()
  })

  socket.on('sendMessage', (message, callback) => {
    const user = userHelper.getUser(socket.id);

    io.to(user.room).emit('message', { user: user.name, text: message });
    io.to(user.room).emit('roomData', { room: user.room, users: userHelper.getUserInRoom(user.room) });

    callback();
  })

  socket.on('disconnect', () => {
    const user = userHelper.removeUser(socket.id);

    if (user) {
      io.to(user.room).emit('message', { user: 'admin', text: `${user.name}, has left` })
    }
  })
});

app.use(router);

server.listen(PORT, () => {
  console.log(`app is running on PORT ${PORT}`)
})