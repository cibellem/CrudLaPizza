const router = require("express").Router();
const pizzaController = require("../../controllers/pizzaController");

// Matches with "/api/pizzas"
router.route("/").get(pizzaController.findAll).post(pizzaController.create);

// Matches with "/api/pizzas/:id"
router
  .route("/:id")
  .get(pizzaController.findById)
  .put(pizzaController.update)
  .delete(pizzaController.remove);

module.exports = router;
