const router = require("express").Router();
const toppingsController = require("../../controllers/toppingsController");

// Matches with "/api/toppings"
router
  .route("/")
  .get(toppingsController.findAll)
  .post(toppingsController.create);

// Matches with "/api/toppings/:id"
router
  .route("/:id")
  .get(toppingsController.findById)
  .put(toppingsController.update)
  .delete(toppingsController.remove);

module.exports = router;
