const express = require("express");
const upload = require("../config/Multer"); // 
const { addBillboard, getBillboards, getBillboardDetail } = require("../controller/billboardController");

const router = express.Router();

router.post("/addBillboard", upload.array("images", 5), addBillboard); 
router.get("/billboard", getBillboards);
router.get("/billboards", getBillboards);
router.get("/billboard/:id", getBillboardDetail);
router.get("/billboards/:id", getBillboardDetail);
// Add a catch-all route for any billboard reference
router.get("/:id", getBillboardDetail);

module.exports = router;
