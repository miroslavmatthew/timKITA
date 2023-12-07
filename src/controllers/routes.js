import express from "express";
import{
    home,
    login,
    register
} from "./controller.js"

const router = express.Router();

router.get('/', home);
router.get('/login', login);
router.get('/register', register);
export default router;