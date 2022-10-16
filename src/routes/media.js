import express from "express";
import auth from "../controllers/auth";
import user from "../controllers/user";
import media from "../controllers/media";

const router = express.Router();

router.route("/new/:userId").post(auth.requireAuth, media.create);
router.route("/popular").get(media.getPopularVideos);

router
  .route("/:mediaId")
  .get(media.incrementViews, media.read)
  .put(auth.requireAuth, media.isPoster, media.update)
  .delete(auth.requireAuth, media.isPoster, media.remove);
router.route("/video/:mediaId").get(media.video);
router.route("/by/:userId").get(media.getVideosByUser);

router.param("userId", user.userById);
router.param("mediaId", media.mediaById);

export default router;
