const router = require("express").Router();
const userController = require("../controller/userController");
const authController = require("../controller/authController");

router.use(authController.protect);
// jornal routes for users.
router
  .route("/enteries")
  .post(userController.create)
  .get(userController.getAllJournal);

router
  .route("/enteries/:id")
  .get(userController.getOneJournal)
  .put(userController.updateJournal)
  .delete(userController.deleteJournal);

router.get("/me", userController.me);

module.exports = router;
