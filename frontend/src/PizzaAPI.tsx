import axios from "axios";

const PIZZA_API_BASE_URL = `${process.env.REACT_BE_URL}/api/pizzas/`;

class PizzaAPI {
  getPizzas() {
    return axios.get(PIZZA_API_BASE_URL);
  }

  createPizza(pizza: { name: string; toppings: object }) {
    return axios.post(PIZZA_API_BASE_URL, pizza);
  }

  updatePizza(pizza: any, pizzaID: string) {
    return axios.put(PIZZA_API_BASE_URL + pizzaID + "/", pizza);
  }

  deletePizza(pizzaID: string) {
    return axios.delete(PIZZA_API_BASE_URL + "/" + pizzaID);
  }
}

export default new PizzaAPI();
