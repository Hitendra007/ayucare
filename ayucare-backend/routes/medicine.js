import express from "express";
import { getMedicines,getPharmacologicalProperties } from "../controllers/medicine";
const router = express.Router()
router.get("/properties",getPharmacologicalProperties)
router.get('/',getMedicines)
export default router;
