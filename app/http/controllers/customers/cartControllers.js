const { data } = require("autoprefixer");

function cartController() {
  return {
    cart(req, res) {
      res.render("customers/cart");
    },
    update(req, res) {
      // for the frist time cart creation and adding basic objects structure
      if (!req.session.cart) {
        req.session.cart = {
          items: {},
          totalQty: 0,
          totalprice: 0,
        };
      }
      let cart = req.session.cart;


      // check if cart has any existing item(s)
       if(!cart.items[req.body._id]){
        cart.items[req.body._id] ={
            item: req.body,
            qty: 1,
        }
        cart.totalQty = cart.totalQty + 1
        cart.totalprice = cart.totalprice + req.body.price
       } else{
         cart.items[req.body._id].qty = cart.items[req.body._id].qty + 1
         cart.totalQty = cart.totalQty + 1
         cart.totalprice = cart.totalprice + req.body.price
       }

      return res.json({ totalQty: req.session.cart.totalQty });
    }
  }
}

module.exports = cartController;
