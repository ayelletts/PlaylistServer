const jwt = require("jsonwebtoken");
const secret = process.env.SECRET_JWT || "1234";

// const { validateToken } = require("./jwt");

const auth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  // console.log("req.headers", req.headers);
  // console.log("req.body", req.body);
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    // console.log("token", token);
    jwt.verify(token, secret, (err, verifyToken) => {
      if (err) {
        console.log("err", err.message);
        return res.status(403).send(err.message);
      }
      req._id = verifyToken._id;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};
module.exports = auth;
