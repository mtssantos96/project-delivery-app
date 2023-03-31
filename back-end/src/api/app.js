const express = require('express');
const cors = require('cors');
const routers = require('../routes/router');

const app = express();
app.use(cors());

app.use(express.json());

app.use(routers);

app.use(express.static('public', {
  immutable: true,
}));

module.exports = app;
