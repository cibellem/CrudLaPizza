const router = require("express").Router();
const pizzatRoutes = require("./pizza");
const toppingRoutes = require("./toppings");

// Routes
router.use("/pizzas", pizzatRoutes);
router.use("/toppings", toppingRoutes);

module.exports = router;
