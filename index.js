const express = require('express');
const app = express();
const routerApi = require('./routes');
const port = 3000;

app.use(express.json());

app.get('/api', (req, res) => {
  res.send('Hola mi server en express');
});

routerApi(app);

app.listen(port, () => {
  console.log('Mi port: ' + port);
});
