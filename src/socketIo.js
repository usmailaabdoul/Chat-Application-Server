const SocketIoService = require('./services/socketIo');
const InboxService = require('./services/inbox')

function socketIo(io) {
  SocketIoService.io = io
  io.on('connect', (socket) => {
    socket.on('join', async ({ room, user_id }, callback) => {
      console.log('socket rooms', socket.rooms);

      let inbox_id = room.split('_').pop();

      let inbox = await InboxService.getByInboxId(inbox_id);
      let joined = inbox.joined;

      if (inbox.senderId == user_id) {
        joined.senderSocketId = socket.id
      } else {
        joined.recieverSocketId = socket.id
      }

      console.log({joined})
      await InboxService.updateById(inbox_id, {joined});

      socket.join(room);
      callback();
    });

    socket.on('disconnect_from_channel', async ({room, user_id}) => {
      console.log('disconnecting', socket.id);

      let inbox_id = room.split('_').pop();

      let inbox = await InboxService.getByInboxId(inbox_id);
      let joined = inbox.joined;

      if (inbox.senderId == user_id) {
        joined.senderSocketId = null;
      } else {
        joined.recieverSocketId = null
      }

      console.log({joined})
      await InboxService.updateById(inbox_id, {joined});

      let i = await InboxService.getByInboxId(inbox_id);

      console.log('updated inbox', i);
    })

  });
}

module.exports = socketIo;
