const router = require('express').Router();
const HttpStatus = require('http-status-codes');
const UserService = require('../services/users');
const authGuard = require('../middleware/auth-guard');

router.get('/users', async (req, res, next) => {
  try {
    let users = await UserService.findUser(req.query);
    return res.status(HttpStatus.StatusCodes.OK).json(users);
  } catch (e) {
    return next(e)
  }
})

router.get('/user/:id/profile', authGuard, async (req, res, next) => {
  try {
    let user = await UserService.getByUserId(req.params.id);
    delete user._doc.passwordHash;

    return res.status(HttpStatus.StatusCodes.OK).json(user)
  } catch (e) {
    console.log(e);
    return res.status(HttpStatus.StatusCodes.BAD_REQUEST).json('Unable to get user')
  }
})

router.delete('/user/:id', async (req, res, next) => {
  try {
    await UserService.deleteByUserId(req.params.id);
    return res.status(HttpStatus.StatusCodes.OK).json('Succesfully deleted user')
  } catch (e) {
    console.log(e);
    return res.status(HttpStatus.StatusCodes.BAD_REQUEST).json('Unable to delete user')
  }
})

router.put('/user/:id', async (req, res, next) => {
  try {
    let user = await UserService.updateById(req.params.id, req.body);
    return res.status(HttpStatus.StatusCodes.OK).json({message: 'Succesfully updated user', user})
  } catch (e) {
    console.log(e);
    return res.status(HttpStatus.StatusCodes.BAD_REQUEST).json('Unable to update user')
  }
})

module.exports = router;