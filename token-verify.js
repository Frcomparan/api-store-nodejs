const jwt = require('jsonwebtoken');

const secret = 'my-secret$Values$f0rth3b4ck3nd';
const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInJvbGUiOiJjdXN0b21lciIsImlhdCI6MTY3OTMyOTE3Nn0.LUYCSyZUZ6wkDPmhTw8Ew1i73x8HX2anY70tnG0LXTA';

function signToken(token, secret) {
  return jwt.verify(token, secret);
}

const payload = signToken(token, secret);
console.log(payload);
