import express from 'express';
import { getCate,createCate } from '../controller/categories.js';
const router = express.Router();

//create category

router.post("/",createCate)



//get category
router.get("/",getCate)

export default router