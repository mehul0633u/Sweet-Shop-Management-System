const express = require('express');

const dotenv = require('dotenv');
const { add_sweet,delete_sweet, view_sweet,search_sweets,sort_sweets } = require('./sweetShop');
require('./db/config'); // Ensure the database connection is established

dotenv.config();

port = process.env.PORT ;

const app = express();

app.use(express.json());

app.post("/add-sweet",add_sweet);

app.delete("/sweet/:id", delete_sweet);

app.get("/sweets",view_sweet);

app.get("/sweets/search", search_sweets);

app.get("/sweets/sort", sort_sweets);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});