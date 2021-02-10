const HttpStatus = require('http-status-codes');
const AuthService = require('../services/auth');

async function authGuard(req, res, next) {
  const authorization = req.headers.authorization;

  if (!authorization) {
    return res.status(HttpStatus.StatusCodes.UNAUTHORIZED).json({
      error: 'Authorization header has not been set'
    });
  }

  try {
    let token = authorization.split(' ')[1]
    const user = await AuthService.verifyToken(token);
    
    if (!user) {
      return res.sendStatus(HttpStatus.StatusCodes.UNAUTHORIZED);
    }
    req.auth = user;
    return next();
  } catch (e) {
    console.error(e);
    return res.status(HttpStatus.StatusCodes.UNAUTHORIZED).json(e);
  }
}

module.exports = authGuard;
