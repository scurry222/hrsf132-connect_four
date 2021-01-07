const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const PORT = 3000;
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));


app.listen(PORT, () => {
  console.log(`Server listening at localhost:${PORT}!`);
});
