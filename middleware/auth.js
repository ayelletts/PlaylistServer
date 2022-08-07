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
      // console.log("err", err);
      if (err) {
        return res.sendStatus(403);
      }
      req._id = verifyToken._id;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};
module.exports = auth;
