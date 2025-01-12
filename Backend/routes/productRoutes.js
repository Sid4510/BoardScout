const express = require('express');
const router = express.Router();
const { addProduct, getProducts, getProductdetail } = require('../controllers/productController');
const upload = require('../config/Multer'); 


router.post('/addProduct', upload.array('images', 10), addProduct); 
router.get('/getproducts',getProducts);
router.get('/:id',getProductdetail);

module.exports = router;
