const express = require("express");
const upload = require("../config/Multer"); // 
const { addBillboard, getBillboards, getBillboardDetail } = require("../controller/billboardController");

const router = express.Router();

router.post("/addBillboard", upload.array("images", 5), addBillboard); 
router.get("/billboard", getBillboards);
router.get("/billboards", getBillboards);
router.get("/billboard/:id", getBillboardDetail);

module.exports = router;
