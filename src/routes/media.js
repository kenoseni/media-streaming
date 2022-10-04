import express from "express";
import auth from "../controllers/auth";
import user from "../controllers/user";
import media from "../controllers/media";

const router = express.Router();

router.route("/new/:userId").post(auth.requireAuth, media.create);
router.param("userId", user.userById);

export default router;
