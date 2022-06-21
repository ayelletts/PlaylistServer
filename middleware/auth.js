const { validateToken } = require("../BL/jwt");
const { readOne } = require("../DAL/controllers/userController");

async function auth(req, res, next) {
  console.log(req);
  const token = req.headers.authorization;
  try {
    // verify token
    const decode = validateToken(token); // an error will be cought in catch statement
    // check it the user id exist
    const user = await readOne({ _id: decode.id });
    if (!user) {
      throw { code: 503, message: "User unauthorized" };
    }
    // next / res error
    next();
  } catch (error) {
    res.status(503).send(error.message);
  }
}

module.exports = auth;
