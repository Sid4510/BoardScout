const Order = require('../models/Order');

const createOrder = async (req, res) => {
    try {
        const { user, items, totalAmount, paymentMethod, deliveryAddress } = req.body;

        if (!user || !items || !totalAmount || !paymentMethod || !deliveryAddress) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        const { area, landmark, city, state, postalCode, country, isDefault } = deliveryAddress;
        if (!area || !landmark || !city || !state || !postalCode || !country || isDefault === undefined) {
            return res.status(400).json({ error: "Missing required delivery address fields" });
        }

        const order = new Order({
            userId: user,
            items: items,
            totalAmount: totalAmount,
            paymentMethod,
            deliveryAddress: deliveryAddress,
            status: "Pending",
            orderDate: new Date()
        });

        await order.save();
        res.status(201).json(order);
    } catch (error) {
        console.error("Error creating order:", error);
        res.status(500).json({ error: "Error creating order" });
    }
};

const getOrders = async(req,res) => {
    try {
        const { userId } = req.params;
        const orders = await Order.find({ userId: userId });  
        res.json(orders);  
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching orders" });
      }
}

module.exports = { createOrder,getOrders  };
