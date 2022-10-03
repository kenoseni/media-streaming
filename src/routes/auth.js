import express from "express";
import auth from "../controllers/auth";

const router = express.Router();

router.route("/signin").post(auth.signin);
router.route("/signout").get(auth.signout);

export default router;
