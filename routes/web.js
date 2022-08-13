const homeController = require("../app/http/controllers/homeControllers");
const authController = require("../app/http/controllers/authConroller");
const cartController = require("../app/http/controllers/customers/cartControllers");
const orderController = require("../app/http/controllers/customers/orderController");
const AdminOrderController = require("../app/http/controllers/admin/orderController");

// Middlewares
const auth = require("../app/http/middlewares/auth");
const guest = require("../app/http/middlewares/guest");
const admin = require("../app/http/middlewares/admin");


function initRoutes(app) {
  app.get("/", homeController().home);
  app.get("/login", guest, authController().login);
  app.post("/login", authController().PostLogin);
  app.get("/register", guest, authController().register);
  app.post("/register", authController().PostRegister);
  app.post("/logout", authController().logout);
  app.get("/cart", cartController().cart);
  app.post("/update-cart", cartController().update);

// Customer routes
  app.post("/orders", orderController().store);
  app.get("/customer/orders", auth, orderController().index);

// Admin routes
app.get("/admin/orders", admin, AdminOrderController().index);

}



module.exports = initRoutes;
