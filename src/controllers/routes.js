import express from "express";
import{
    home,
    barchart,
    scatter,
    addData,
    uploadData
} from "./controller.js"

const router = express.Router();

router.get('/', home);
router.get('/barchart', barchart);
router.get('/scatter', scatter);
router.get('/addData', addData);
router.post('/addData',uploadData)
export default router;