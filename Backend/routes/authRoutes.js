const express =require("express");
const router=express.Router();
const { registerUser,loginUser,logout,status } =require('../controllers/authController');
const authenticateUser = require("../middlewares/authMiddleware");
const {addAddress,removeAddress,getAddresses,setDefaultAddress,getUserById} =require('../controllers/userController');

router.post('/register',registerUser);
router.post('/login',loginUser);
router.post('/logout',logout);
router.get('/status',authenticateUser ,status);


router.post("/:userId/addresses", addAddress);
router.delete("/:userId/addresses/:addressId", removeAddress);
router.get("/:userId/addresses", getAddresses);
router.put("/:userId/addresses/:addressId",setDefaultAddress);
router.get('/:userId', getUserById);

module.exports=router;