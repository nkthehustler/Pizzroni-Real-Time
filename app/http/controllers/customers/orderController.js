const Order = require("../../../models/orders");
const moment = require("moment");
function orderController() {
  return {
    store(req, res) {
      // Validate request
      const { phone, address } = req.body;
      if (!phone || !address) {
        return res.status(422).json({ message: "All fields are required" });
      }

      const order = new Order({
        customerId: req.user._id,
        items: req.session.cart.items,
        phone,
        address,
      });

      order.save().then((result) => {
          Order.populate(result, { path: 'customerId' }, (err, placedOrder) => {
            req.flash("success", "Order placed successfully!");
            delete req.session.cart;
            // Emit
            const eventEmitter = req.app.get('eventEmitter')
            eventEmitter.emit('orderPlaced', result)
            return res.redirect("/customer/orders");
          })
          
        })
        .catch((err) => {
          req.flash("error", "Oops! something went wrong!");
          return res.redirect("/cart");
        });
    },
    async index(req, res) {
      const orders = await Order.find({ customerId: req.user._id }, null, {
        sort: { createdAt: -1 },
      });
      res.header("Cache-Control", "no-store");
      res.render("customers/orders", { orders: orders, moment: moment });
    },
    async show(req, res) {
      const orders = await Order.findById(req.params.id)
      // Authorize user
      if(req.user._id.toString() === orders.customerId.toString()) {
          return res.render('customers/singleOrder', { orders })
      }
      return  res.redirect('/')
    }
  }
}

module.exports = orderController;
