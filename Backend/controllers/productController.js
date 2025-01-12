const Product = require('../models/product');
const cloudinary = require('cloudinary').v2;
const fs = require('fs');

const addProduct = async (req, res) => {
    try {
        const {
            productName,
            description,
            price,
            stock,
            discount,
            companyName,
            category,
        } = req.body;

        let imageUrls = [];


        if (req.files && req.files.length > 0) {
            try {
                for (let i = 0; i < req.files.length; i++) {
                    const file = req.files[i];


                    const result = await cloudinary.uploader.upload(file.path, {
                        folder: 'products',
                        resource_type: 'auto',
                    });


                    imageUrls.push(result.secure_url);


                    fs.unlink(file.path, (err) => {
                        if (err) {
                            console.error('Error removing temporary file:', err);
                        }
                    });
                }
            } catch (uploadError) {
                console.error('Cloudinary upload error:', uploadError);
                return res.status(500).json({ success: false, message: 'Failed to upload images' });
            }
        }


        const newProduct = new Product({
            productName,
            description,
            price,
            stock,
            discount,
            category,
            companyName,
            images: imageUrls,
        });


        await newProduct.save();

        return res.status(201).json({
            success: true,
            message: 'Product added successfully',
            product: newProduct,
        });
    } catch (error) {
        console.error('Error adding product:', error);
        return res.status(500).json({ success: false, message: 'Failed to add product' });
    }
};

const getProducts = async (req, res) => {
    try {
        const { search } = req.query;
        let query = {};
    
        if (search) {
            query = {
                $or: [
                    { productName: { $regex: search, $options: 'i' } },
                    { category: { $regex: search, $options: 'i' } }
                ]
            };
        }    
      const products = await Product.find(query);
    
        if (products.length === 0) {
            return res.status(200).json({ message: "No products found" });
        }
    
        res.status(200).json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred while fetching products" });
    }
    
};



const getProductdetail = async (req, res) => {
    try {
        const productId = req.params.id;
        const product = await Product.findById(productId);

        console.log("Product ID from URL:", productId);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.json(product);
    } catch (error) {
        console.error("Error fetching product details:", error.message);
        res.status(500).json({ error: error.message });
    }
};


module.exports = { addProduct, getProducts, getProductdetail };

