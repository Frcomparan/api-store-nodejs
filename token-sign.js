const jwt = require('jsonwebtoken');

const jwtConfig = {
  expiresIn: '7d',
};

const secret = 'my-secret$Values$f0rth3b4ck3nd';

const payload = {
  sub: 1,
  role: 'customer',
};

function signToken(payload, secret) {
  return jwt.sign(payload, secret);
}

const token = signToken(payload, secret, jwtConfig);
console.log(token);
