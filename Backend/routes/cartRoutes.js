const express = require("express");
const {
  addToCart,
  getCart,
  removeFromCart,
  clearCart,
} = require("../controllers/cartController");
const authenticateUser  = require('../middlewares/authMiddleware');

const router = express.Router();

router.post("/add", authenticateUser,addToCart);
router.get("/getcart", getCart);
router.delete("/remove", removeFromCart);
router.delete("/clear/:userId", clearCart);

module.exports = router;
