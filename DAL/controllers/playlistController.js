const userController = require("../DL/controllers/userController");
const orderController = require("../DL/controllers/orderController");
const itemController = require("../DL/controllers/itemController");

async function createPlaylist(playlist) {
  let res = {};

  // לבדוק האם היוזר קיים
  // const user = await userController.read({email:order.user})[0]
  const user = await userController.readOne({ email: playlist.user });
  if (!user) {
    console.log("Error- user not found");
    return false;
  }

  console.log(res);
  return res;
}

async function getOrdersByUser() {}
async function getOrderById() {}

const orderFromClient = {
  user: "avicohen1212@hotmail.com",
  cart: [
    {
      item: "9KJ7F5",
      qty: 6,
    },
  ],
};

createOrder(orderFromClient);
