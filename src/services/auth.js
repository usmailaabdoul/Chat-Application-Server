const jwt = require("jsonwebtoken");
const UserService = require('./users');

class AuthService {

  async register (user) {
    return UserService.createUser(user);
  }

  verifyToken(token) {
    return jwt.verify(token, "longer-secret-is-better");
  }
}

const service = new AuthService();

module.exports = service;