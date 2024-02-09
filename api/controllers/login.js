const loginRouter = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");


const jswtSecret = process.env.JWT_SECRET;


loginRouter.post("/", async (req, res) => {
  // const { username, password } = req.body;
  // const userDoc = await User.findOne({ username });
  // if (userDoc) {
  //   const passwordSuccess = bcrypt.compareSync(password, userDoc.password);
  //   if (passwordSuccess) {
  //     jwt.sign(
  //       { username: userDoc.username, id: userDoc._id },
  //       jswtSecret,
  //       {},
  //       (err, token) => {
  //         if (err) throw err;
  //         res.cookie("token", token).json(userDoc);
  //       }
  //     );
  //   } else {
  //     res.status(422).json("Incorrect password");
  //   }
  // } else {
  //   res.json("User not found");
  // }
  const { username, password } = req.body

  const user = await User.findOne({ username })
  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(password, user.password)

  if (!(user && passwordCorrect)) {
    return res.status(401).json({
      error: 'invalid username or password'
    })
  }

  const userForToken = {
    username: user.username,
    id: user._id,
  }

  const token = jwt.sign(userForToken, jswtSecret)

  res
    .status(200)
    .send({ token, username: user.username, name: user.name, id:user._id })
});



module.exports = loginRouter;