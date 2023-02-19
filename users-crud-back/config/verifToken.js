const jwt = require("jsonwebtoken");

require("dotenv").config();

const secretKey = process.env.MY_ACCESS_TOKEN_SECRET;

const verifyToken = (req, res, next) => {
  try {
    const token = req.headers["authorization"];
    if (!token)
      return res.status(403).send("A token is required for authentication");
    const decoded = jwt.verify(token, secretKey);
    if (!decoded)
      return res.status(403).send("A token is required for authentication");
    return next();
  } catch (err) {
    console.log(err);
    return res.status(401).send("Invalid Token");
  }
};

module.exports = verifyToken;
