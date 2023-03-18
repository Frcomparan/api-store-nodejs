const express = require('express');
const routerApi = require('./routes');
const {
  logErros,
  errorHandler,
  boomErrorHandler,
} = require('./middlewares/error.handle');

const app = express();
const port = 3000;

app.use(express.json());

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
