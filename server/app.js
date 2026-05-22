const express = require('express');
const cors = require('cors');
const app = express();
const db = require('./connect');

app.use(cors());
app.use(express.json());
