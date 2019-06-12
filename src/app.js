'use strict';

require('dotenv').config();

const express = require('express');
const cors = require('cors');
const app = express();
const { getSisbenInfo } = require('./controllers/sisben');
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.get('/sisben', getSisbenInfo);

app.listen(port, () => {
  console.log(`Server running in the port ${port}`);
});

module.exports = app;
