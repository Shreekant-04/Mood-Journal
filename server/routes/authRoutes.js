const router = require("express").Router();

const authController = require("../controller/authController");

router.post("/register", authController.signup);
router.post("/login", authController.login);
router.get("/check-token", authController.checkToken);

module.exports = router;
