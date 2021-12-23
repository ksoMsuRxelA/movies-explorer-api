const express = require('express');
const mongoose = require('mongoose');

const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://localhost:27017/diplomadb', {
  useNewUrlParser: true,
});

const app = express();

app.listen(PORT, () => {
  console.log(`App has been started on port: ${PORT}`);
});
