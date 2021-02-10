const SocketIoService = require('./services/socketIo');

function socketIo(io) {
  console.log(`hello`)
  io.on('connection', (socket) => {

    console.log('connected')
    SocketIoService.socket = socket;

    SocketIoService.userJoin();
    SocketIoService.createInbox();
    SocketIoService.sendMessage(io);
    SocketIoService.createGroup();
    // socket.on('join', ({ name, room }, callback) => {

      // console.log({name, room})
    //   // const { error, user } = userHelper.addUser({ id: socket.id, name, room })

    //   // if (error) return callback(error);

    //   // socket.emit('message', { user: 'admin', text: `${user.name}, welcome to the room ${user.room}` })
    //   // socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name}, has joined!` });

    //   // socket.join(user.room);

    //   // io.to(user.room).emit('roomData', { room: user.room, users: userHelper.getUserInRoom(user.room) });

    //   callback()
    // })

    // socket.on('sendMessage', (message, callback) => {
    //   const user = userHelper.getUser(socket.id);

    //   io.to(user.room).emit('message', { user: user.name, text: message });
    //   io.to(user.room).emit('roomData', { room: user.room, users: userHelper.getUserInRoom(user.room) });

    //   callback();
    // })

    // socket.on('disconnect', () => {
    //   const user = userHelper.removeUser(socket.id);

    //   if (user) {
    //     io.to(user.room).emit('message', { user: 'admin', text: `${user.name}, has left` })
    //   }
    // })
  });
}

module.exports = socketIo;
