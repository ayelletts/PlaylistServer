const jwt = require("jsonwebtoken");
const secret = process.env.SECRET_JWT || "1234";

const createToken = (id) => {
  // console.log("id----------------------", id);
  const token = jwt.sign({ _id: id }, secret, { expiresIn: "3h" });
  return token;
};

//console.log(createToken("abcd"));

const validateToken = (token) => {
  return jwt.verify(token, secret); //verify()- returns payload and verifies everything experition and match secret, decode() only return payload
};

// console.log(
//   validateToken(
//     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFiY2QiLCJpYXQiOjE2NTU4MTUwNTIsImV4cCI6MTY1NTgxODY1Mn0.nMzao_CqeNQXWfmF_Nj01Ad7pbOAlqMdT6cyxnbvXLI"
//   )
// );

module.exports = { createToken, validateToken };
