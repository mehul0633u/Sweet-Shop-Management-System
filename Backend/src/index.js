const express = require('express');

const dotenv = require('dotenv');

dotenv.config();

port = process.env.PORT ;

const app = express();

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});