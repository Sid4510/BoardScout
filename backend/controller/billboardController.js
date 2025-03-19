const Billboard = require("../models/Billboard");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");

const addBillboard = async (req, res) => {
  try {
    const {
      location,
      latitude,
      longitude,
      price,
      height,
      width,
      available,
      description,
    } = req.body;

    let imageUrls = [];

    if (req.files && req.files.length > 0) {
      try {
        for (let i = 0; i < req.files.length; i++) {
          const file = req.files[i];

          const result = await cloudinary.uploader.upload(file.path, {
            folder: "billboards",
            resource_type: "auto",
          });

          imageUrls.push(result.secure_url);

          fs.unlink(file.path, (err) => {
            if (err) {
              console.error("Error removing temporary file:", err);
            }
          });
        }
      } catch (uploadError) {
        console.error("Cloudinary upload error:", uploadError);
        return res.status(500).json({
          success: false,
          message: "Failed to upload images",
        });
      }
    }

    const newBillboard = new Billboard({
      location,
      latitude,
      longitude,
      price,
      size: { height, width }, 
      available,
      description,
      images: imageUrls,
    });

    await newBillboard.save();

    return res.status(201).json({
      success: true,
      message: "Billboard added successfully",
      billboard: newBillboard,
    });
  } catch (error) {
    console.error("Error adding billboard:", error);
    return res
      .status(500)
      .json({ success: false, message: "Failed to add billboard" });
  }
};

module.exports = { addBillboard };

const getBillboards = async (req, res) => {
  try {
    const { search } = req.query;
    let query = {};

    if (search) {
      query = {
        $or: [
          { location: { $regex: search, $options: "i" } },
          { description: { $regex: search, $options: "i" } },
        ],
      };
    }

    const billboards = await Billboard.find(query);

    if (billboards.length === 0) {
      return res.status(200).json({ message: "No billboards found" });
    }

    res.status(200).json(billboards);
  } catch (error) {
    console.error("Error fetching billboards:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching billboards" });
  }
};

const getBillboardDetail = async (req, res) => {
  try {
    const billboardId = req.params.id;
    const billboard = await Billboard.findById(billboardId);

    console.log("Billboard ID from URL:", billboardId);

    if (!billboard) {
      return res.status(404).json({ message: "Billboard not found" });
    }

    res.json(billboard);
  } catch (error) {
    console.error("Error fetching billboard details:", error.message);
    res.status(500).json({ error: error.message });
  }
};

module.exports = { addBillboard, getBillboards, getBillboardDetail };
