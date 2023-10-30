require('dotenv').config();
const express = require('express'),
      cors = require('cors'); 

const routes = require('./routes/ToDoRoute');

const app = express();
app.use(express.json());
app.use(cors());
app.use(routes);

const PORT = 5000

app.listen(5000, () => console.log(`Listening on: ${5000}`))