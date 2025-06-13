const express = require("express");
const mainController = require("../controllers/mainController");
const authController = require("../controllers/authController");

const router = express.Router();

router.get("/", mainController.getOverview);
router.get("/tour/:slug", mainController.getTour);
// router.get('/login', mainController.getLoginForm);
router.get('/me', mainController.getAccount);

// router.post(
//   '/submit-user-data',
//   authController.protect,
//   mainController.updateUserData
// );

module.exports = router;
