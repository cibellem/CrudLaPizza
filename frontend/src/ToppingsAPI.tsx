import axios from "axios";

const TOPPINGS_API_BASE_URL = `${process.env.REACT_BE_URL}/api/toppings`;

class ToppingsAPI {
  getToppings() {
    return axios.get(TOPPINGS_API_BASE_URL);
  }

  addTopping(topping: { value: string }) {
    return axios.post(TOPPINGS_API_BASE_URL, topping);
  }

  updateTopping(topping: { value: string }, toppingID: string) {
    return axios.put(TOPPINGS_API_BASE_URL + toppingID + "/", topping);
  }

  deleteTopping(toppingID: string) {
    return axios.delete(TOPPINGS_API_BASE_URL + "/" + toppingID);
  }
}

export default new ToppingsAPI();
