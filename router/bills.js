import express from "express";
import { createBill, getBillByUser, getBills } from "../controllers/bills.js";

const router = express.Router();

router.get("/", getBills);
//create Bill
router.post("/getBillUser/", getBillByUser);
// các giá trị khác ngoại trừ mã hóa đơn
router.post("/", createBill);
export default router;
