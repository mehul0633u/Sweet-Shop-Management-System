const User = require('./db/User');

const register = async (req, res) => {
    try {
        let user = new User(req.body);
        let result = await user.save();
        result = result.toObject();
        delete result.password;
        res.send({ result });
    } catch (err) {
        res.status(500).send({ error: "Registration failed", details: err.message });
    }
}

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send({ error: "Email and password are required" });
    }

    const user = await User.findOne({ email, password }).select("-password");

    if (user) {
      res.send({ result: user });
    } else {
      res.status(404).send({ error: "No User Found" });
    }
  } catch (err) {
    res.status(500).send({ error: "Login failed", details: err.message });
  }
}


module.exports = {
    register,login
};