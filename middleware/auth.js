const jwt = require("jsonwebtoken");
// const { validateToken } = require("./jwt");

const auth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log("auth");
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, "1234", (err, verifyToken) => {
      console.log("err", err);
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
