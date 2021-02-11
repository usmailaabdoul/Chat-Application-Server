const router = require('express').Router();
const HttpStatus = require('http-status-codes');
const InboxService = require('../services/inbox')

router.get('/inboxes/:id', async (req, res, next) => {
  try {
    let inboxes = await InboxService.getUserInboxes(req.params.id);
    return res.status(HttpStatus.StatusCodes.OK).json(inboxes)
  } catch (e) {
    console.log(e);
    return res.status(HttpStatus.StatusCodes.BAD_REQUEST).json('Unable to get inboxes')
  }
})

module.exports = router;
