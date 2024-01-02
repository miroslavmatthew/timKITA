import express from "express";
import{
    home,
    barchart,
    scatter,
    addData,
    uploadData,
    summarize,
    groupBy,
    groupByRes,
    getScatter
} from "./controller.js"

const router = express.Router();

router.get('/', home);
router.get('/barchart', barchart);
router.get('/scatter', scatter);
router.get('/addData', addData);
router.post('/addData',uploadData)
router.get('/reqSummaryData', summarize);
router.get('/reqGroupBy', groupBy);
router.get('/reqGroupByRes', groupByRes)
router.get('/reqScatter', getScatter)
export default router;