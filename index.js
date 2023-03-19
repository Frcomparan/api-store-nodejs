const express = require('express');
const cors = require('cors');
const routerApi = require('./routes');
const {
  logErros,
  errorHandler,
  boomErrorHandler,
} = require('./middlewares/error.handle');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const whitelist = ['http://localhost:8080', 'https://myapp.co'];
const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true);
      return;
    }
    callback(new Error('No permited'));
  },
};
app.use(cors(options));

app.get('/api', (req, res) => {
  res.send('Hola mi server en express');
});

routerApi(app);

app.use(logErros);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log('Mi port: ' + port);
});
