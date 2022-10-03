import express from "express";
import user from "../controllers/user";
import auth from "../controllers/auth";

const router = express.Router();

router.route("").get(user.list).post(user.create);

router.route("/photo/:userId").get(user.photo, user.defaultPhoto);
router.route("/defaultphoto").get(user.defaultPhoto);

router
  .route("/:userId")
  .get(auth.requireAuth, user.read)
  .put(auth.requireAuth, auth.hasAuthorization, user.update)
  .delete(auth.requireAuth, auth.hasAuthorization, user.remove);

router.param("userId", user.userById);

export default router;
