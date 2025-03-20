const router = require("express").Router();
const userController = require("../controller/userController");
const authController = require("../controller/authController");

router.use(authController.protect);
// jornal routes for users.
router
  .route("/entries")
  .post(userController.create)
  .get(userController.getAllJournal);

router.get("/me", userController.me);

router
  .route("/entry/:id")
  .get(userController.getOneJournal)
  .put(userController.updateJournal)
  .delete(userController.deleteJournal);

module.exports = router;
