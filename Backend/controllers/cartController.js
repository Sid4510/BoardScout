const Cart=require("../models/Cart")
const Product =require("../models/Product");

const addToCart = async (req, res) => {
    try {
      const { userId, productId, quantity } = req.body;

      if (!productId || !quantity) {
        return res.status(400).json({ message: "Product ID and quantity are required" });
      }
  
      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
  
      let cart = await Cart.findOne({ userId });
  
      if (!cart) {
        cart = new Cart({ userId, items: [] });
      }
  
      if (!Array.isArray(cart.items)) {
        cart.items = [];
      }
  
      const existingItemIndex = cart.items.findIndex(
        (item) => item.productId.toString() === productId
      );
  
      if (existingItemIndex >= 0) {
        cart.items[existingItemIndex].quantity += quantity;
      } else {
        
        cart.items.push({
          productId,
          quantity,
          price: product.price,
        });
      }
  
      await cart.save();
      res.status(200).json({ message: "Product added to cart", cart });
    } catch (error) {
      console.error("Error adding product to cart:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
  
  


  const getCart = async (req, res) => {
    try {
        console.log(req.query); 

      const { userId } = req.query; 
  
      if (!userId) {
        return res.status(400).json({ message: "User ID is required" });
      }
  
      const cart = await Cart.findOne({ userId }).populate("items.productId");
  
      if (!cart) {
        return res.status(200).json({ items: [] });
      }
  
      res.status(200).json({ cart: cart.items });
    } catch (error) {
      console.error("Error fetching cart:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
  


const removeFromCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId } = req.body;

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    cart.items = cart.items.filter(
      (item) => item.productId.toString() !== productId
    );

    await cart.save();
    res.status(200).json({ message: "Product removed from cart", cart });
  } catch (error) {
    console.error("Error removing product from cart:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


const clearCart = async (req, res) => {
  try {
    const { userId } = req.params;

    const cart = await Cart.findOneAndDelete({ userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    res.status(200).json({ message: "Cart cleared successfully" });
  } catch (error) {
    console.error("Error clearing cart:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  addToCart,
  getCart,
  removeFromCart,
  clearCart,
};
