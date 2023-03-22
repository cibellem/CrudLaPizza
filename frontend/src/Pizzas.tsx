import { useEffect, useState } from "react";
import PizzaAPI from "./PizzaAPI";
import ToppingsAPI from "./ToppingsAPI";
import { Button, List, Modal, Item, Container } from "semantic-ui-react";
import PizzaForm from "./components/PizzaForm/PizzaForm";
import { Pizza, Topping } from "./Utils";

function Pizzas() {
  const [checkedCheckboxes, setCheckedCheckboxes] = useState([]);
  const [pizzaName, setPizzaName] = useState<string>("");
  const [pizzas, setPizzas] = useState<Pizza[]>([]);
  const [toppings, setToppings] = useState<Topping[]>([]);
  const [pizza, setPizza] = useState<Pizza>();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    //Call API to get all toppings and set to local state
    PizzaAPI.getPizzas().then((res) => {
      setPizzas(res.data);
    });

    ToppingsAPI.getToppings().then((res) => {
      setToppings(res.data);
    });
  }, []);

  useEffect(() => {}, [pizza]);

  //Pizza logic
  const handlePizzaSubmit = (e: any) => {
    e.preventDefault();
    //TODO - Check if it's duplicated
    PizzaAPI.createPizza({ name: pizzaName, toppings: checkedCheckboxes }).then(
      (res) => {
        setPizzas([
          { name: res.data.name, toppings: res.data.toppings },
          ...pizzas,
        ]);
      }
    );
    setPizzaName("");
  };

  const handlePizzaUpdate = () => {
    setCheckedCheckboxes([]);
    PizzaAPI.updatePizza(
      { name: pizza?.name, toppings: checkedCheckboxes },
      pizza?._id as string
    );
    PizzaAPI.getPizzas().then((res) => {
      setPizzas(res.data);
    });
    setOpen(false);
  };

  const deletePizza = (id: string) => {
    //Returns a new pizza array without the pizza that matches the id
    const deletePizza = pizzas.filter((item) => item._id !== id);
    setPizzas([...deletePizza]);
    PizzaAPI.deletePizza(id);
  };

  const handleCheckboxChange = (data: any) => {
    const isChecked = checkedCheckboxes.some(
      //@ts-ignore
      (checkedCheckbox) => checkedCheckbox.value === data.value
    );
    if (isChecked) {
      setCheckedCheckboxes(
        checkedCheckboxes.filter(
          //@ts-ignore
          (checkedCheckbox) => checkedCheckbox.value !== data.value
        )
      );
    } else {
      setCheckedCheckboxes(checkedCheckboxes.concat(data));
    }
  };

  const editToppingFlow = (data: any) => {
    setCheckedCheckboxes([]);
    setPizza(data);
    setOpen(true);
  };

  return (
    <Container>
      <h1>Pizzas</h1>
      <PizzaForm
        handleCheckboxChange={handleCheckboxChange}
        checkedCheckboxes={checkedCheckboxes}
        handlePizzaSubmit={handlePizzaSubmit}
        pizzaName={pizzaName}
        setPizzaName={setPizzaName}
        toppings={toppings}
      />

      <Modal open={open}>
        <Modal.Header>Edit Your Pizza</Modal.Header>
        <p>Pizza Name: {pizza ? pizza.name : ""}</p>
        <Modal.Content>
          <div className="formWrapper">
            <form>
              <>
                <h4>Update your toppings</h4>
                {toppings &&
                  toppings.map((top: Topping) => (
                    <label key={top._id}>
                      <input
                        type="checkbox"
                        value={top.value}
                        name="toppings"
                        checked={checkedCheckboxes.some(
                          (checkedBox: any) => checkedBox.value === top.value
                        )}
                        onChange={() => handleCheckboxChange(top)}
                      />
                      {top.value}
                    </label>
                  ))}
              </>
            </form>
          </div>
        </Modal.Content>
        <Modal.Actions>
          <Button negative onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button positive onClick={handlePizzaUpdate}>
            Update
          </Button>
        </Modal.Actions>
      </Modal>

      {pizzas &&
        pizzas.map((pizza: Pizza) => (
          <div className="pizzaCard">
            <Item.Group>
              <Item key={pizza._id}>
                <Item.Content>
                  <Item.Header as="a">Name: {pizza.name}</Item.Header>
                  <Item.Meta>Toppings Added:</Item.Meta>
                  {pizza.toppings.map((topping: any) => (
                    <List key={topping._id}>
                      <List.Item>{topping.value}</List.Item>
                    </List>
                  ))}
                  <Button
                    size="mini"
                    color="red"
                    onClick={() => deletePizza(pizza._id as string)}
                  >
                    Remove Pizza
                  </Button>
                  <Button
                    size="mini"
                    color="yellow"
                    onClick={() => editToppingFlow(pizza)}
                  >
                    Edit toppings
                  </Button>
                </Item.Content>
              </Item>
            </Item.Group>
          </div>
        ))}
    </Container>
  );
}

export default Pizzas;
