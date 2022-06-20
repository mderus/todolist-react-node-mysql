const express = require('express');
const cors = require('cors');
const {TodoRouter} = require('./routers/todos');
require('./utils/db');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/', TodoRouter);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
