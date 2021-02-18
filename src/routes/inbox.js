const router = require('express').Router();
const HttpStatus = require('http-status-codes');
const InboxService = require('../services/inbox')

router.get('/inbox/:id', async (req, res, next) => {
  try {
    let inboxes = await InboxService.getByInboxId(req.params.id);
    return res.status(HttpStatus.StatusCodes.OK).json(inboxes)
  } catch (e) {
    console.log(e);
    return res.status(HttpStatus.StatusCodes.BAD_REQUEST).json('Unable to get inboxes')
  }
})

router.post('/inbox/:inbox_id/:sender_id', async (req, res, next) => {
  try {
    let message = req.query.message;
    let inbox_id = req.params.inbox_id;
    let sender_id = req.params.sender_id;

    let inbox = await InboxService.sendMessage(inbox_id, sender_id, message);
    return res.status(HttpStatus.StatusCodes.OK).json(inbox)
  } catch (e) {
    console.log(e);
    return res.status(HttpStatus.StatusCodes.BAD_REQUEST).json('Unable to send message')
  }
})

router.post('/inbox', async (req, res, next) => {
  try {
    let {sender, reciever} = req.body

    let inbox = await InboxService.createInbox(sender, reciever);
    return res.status(HttpStatus.StatusCodes.OK).json(inbox)
  } catch (e) {
    console.log(e);
    return res.status(HttpStatus.StatusCodes.BAD_REQUEST).json('Unable to create inbox')
  }
})

module.exports = router;
