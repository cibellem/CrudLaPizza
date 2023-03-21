import axios from "axios";

const PIZZA_API_BASE_URL = "api/pizzas/";

class PizzaAPI {
  getPizzas() {
    return axios.get(PIZZA_API_BASE_URL);
  }

  createPizza(pizza: any) {
    return axios.post(PIZZA_API_BASE_URL, pizza);
  }

  updatePizza(topping: { value: string }, toppingID: string) {
    return axios.put(PIZZA_API_BASE_URL + toppingID + "/", topping);
  }

  deletePizza(toppingID: string) {
    return axios.delete(PIZZA_API_BASE_URL + "/" + toppingID);
  }
}

export default new PizzaAPI();
