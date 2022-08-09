const homeController = require("../app/http/controllers/homeControllers");
const authController = require("../app/http/controllers/authConroller");
const cartController = require("../app/http/controllers/customers/cartControllers");
const guest = require("../app/http/middlewares/guest");

function initRoutes(app) {
  app.get("/", homeController().home);
  app.get("/login", guest, authController().login);
  app.post("/login", authController().PostLogin);
  app.get("/register", guest, authController().register);
  app.post("/register", authController().PostRegister);
  app.post("/logout", authController().logout);
  app.get("/cart", cartController().cart);
  app.post("/update-cart", cartController().update);
}

module.exports = initRoutes;
