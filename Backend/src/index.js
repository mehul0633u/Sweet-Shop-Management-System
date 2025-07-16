const express = require('express');

const dotenv = require('dotenv');
const { add_sweet } = require('./sweetShop');
require('./db/config'); // Ensure the database connection is established

dotenv.config();

port = process.env.PORT ;

const app = express();

app.use(express.json());



// app.post("/register", async (req, res) => {
//   let user = new User(req.body);
//   let result = await user.save();
//   result = result.toObject();
//   delete result.password;
//   Jwt.sign({ result }, jwtKey, { expiresIn: "2h" }, (err, token) => {
//     if (err) {
//       res.send({ result: "Something went wrong" });
//     }
//     res.send({ result, auth: token });
//   });
// })

app.post("/add-sweet",add_sweet);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});