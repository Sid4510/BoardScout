const User = require("../models/User");

exports.addAddress = async (req, res) => {
  const { userId } = req.params;
  const { area,landmark, city, state, postalCode, country, isDefault } = req.body;

  if (!area || !city || !state || !postalCode || !country) {
    return res.status(400).json({ error: "All address fields are required" });
  }

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const newAddress = { area,landmark, city, state, postalCode, country, isDefault };

    
    if (isDefault) {
      user.addresses.forEach((address) => (address.isDefault = false));
    }

    user.addresses.push(newAddress);

    await user.save();

    res.status(201).json({ message: "Address added successfully", user });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong", details: error.message });
  }
};

exports.removeAddress = async (req, res) => {
  const { userId, addressId } = req.params;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const addressIndex = user.addresses.findIndex(
      (address) => address._id.toString() === addressId
    );

    if (addressIndex === -1) {
      return res.status(404).json({ error: "Address not found" });
    }

    user.addresses.splice(addressIndex, 1);

    await user.save();

    res.status(200).json({ message: "Address removed successfully", user });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong", details: error.message });
  }
};

exports.getAddresses = async (req, res) => {
    const { userId } = req.params;
  
    try {
      const user = await User.findById(userId);
  
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
  
      res.status(200).json({ addresses: user.addresses });
    } catch (error) {
      res.status(500).json({ error: "Something went wrong", details: error.message });
    }
  };

  exports.setDefaultAddress = async (req, res) => {
    const userId = req.params.userId;
    const addressId = req.params.addressId;
  
    try {
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found." });
      }
  
      const address = user.addresses.id(addressId);
      if (!address) {
        return res.status(404).json({ message: "Address not found." });
      }
  
      user.addresses.forEach((addr) => {
        if (addr._id.toString() === addressId) {
          addr.isDefault = true;
        } else {
          addr.isDefault = false;
        }
      });
  
      await user.save();
  
      res.status(200).json({ message: "Default address updated successfully." });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error." });
    }
  };
  
exports.getUserById = async (req, res) => {
    try {
      const { userId } = req.params; 
  
      const user = await User.findById(userId).select('name email addresses');
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
     
      const defaultAddress = user.addresses.find(address => address.isDefault);
  
      return res.status(200).json({
        name: user.name,
        email: user.email,
        defaultAddress: defaultAddress || null,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Server Error' });
    }
  };