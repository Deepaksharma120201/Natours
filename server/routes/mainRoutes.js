const express = require("express");
const mainController = require("../controllers/mainController");
const authController = require("../controllers/authController");

const router = express.Router();

router.get("/", mainController.getOverview);
router.get("/tour/:slug", mainController.getTour);
router.get("/me", mainController.getMe);
router.get(
  "/currentUser",
  authController.protect,
  mainController.getCurrentUser
);
router.get("/logout", mainController.logout);

// router.post(
//   '/submit-user-data',
//   authController.protect,
//   mainController.updateUserData
// );

module.exports = router;
