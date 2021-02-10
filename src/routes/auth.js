const router = require('express').Router();
const HttpStatus = require('http-status-codes');
const UserService = require('../services/users');
const { body, validationResult } = require('express-validator');

router.post('/auth/register', [
  body('email').isEmail().withMessage('Invalid email address, input a valid email'),
  body('password').isLength({min: 6}).withMessage('Password length must be at least 6 characters'),
  // body('phoneNumber').isLength({min: 9, max: 9}).withMessage('Phone number should be 9 characters'),
  body('name').not().isEmpty().withMessage('Name can not be left empty'),
], async (req, res, next) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(HttpStatus.StatusCodes.BAD_REQUEST).json({ errors: errors.array() });
  }

  try {
    await UserService.createUser(req.body);
    let user = await UserService.logInUser(req.body);
    
    return res.status(HttpStatus.StatusCodes.OK).json(user);
  } catch (e) {
    console.log(e);
    return res.status(HttpStatus.StatusCodes.BAD_REQUEST).json(`${e}`)
  }
})

router.post('/auth/login', [
  body('email').isEmail().withMessage('Invalid email address, input a valid email'),
  body('password').not().isEmpty().withMessage('Password field is required')
    .isLength({min: 6}).withMessage('Password length must be at least 6 characters'),
], async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(HttpStatus.StatusCodes.BAD_REQUEST).json({ errors: errors.array() });
  }

  try {
    let user = await UserService.logInUser(req.body);
    return res.status(HttpStatus.StatusCodes.OK).json(user);
  } catch (e) {
    console.log(e);
    return res.status(HttpStatus.StatusCodes.UNAUTHORIZED).json('Unable to create user')
  }
})

module.exports = router;