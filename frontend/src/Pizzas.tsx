import { useEffect, useState } from "react";
import PizzaAPI from "./PizzaAPI";
import ToppingsAPI from "./ToppingsAPI";
import { Button, List, Modal, Item, Container } from "semantic-ui-react";
import PizzaForm from "./components/PizzaForm/PizzaForm";
import { Pizza, Topping } from "./Utils";

function Pizzas() {
  const [checkedCheckboxes, setCheckedCheckboxes] = useState([]);
  const [checkedCheckboxesEdit, setCheckedCheckboxesEdit] = useState([]);
  const [pizzaName, setPizzaName] = useState<string>("");
  const [pizzas, setPizzas] = useState<Pizza[]>([]);
  const [toppings, setToppings] = useState<Topping[]>([]);
  const [pizza, setPizza] = useState<Pizza>();
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string>();

  useEffect(() => {
    //Call API to get all toppings and set to local state
    PizzaAPI.getPizzas().then((res) => {
      setPizzas(res.data);
    });

    ToppingsAPI.getToppings().then((res) => {
      setToppings(res.data);
    });
  }, []);

  useEffect(() => {}, [pizzas]);

  //Pizza logic
  const handlePizzaSubmit = (e: any) => {
    e.preventDefault();
    if (pizzaName.length <= 0) {
      setError("Pizza name can't be empty");
    } else {
      PizzaAPI.createPizza({
        name: pizzaName,
        toppings: checkedCheckboxes,
      }).then((res) => {
        setPizzas([
          { name: res.data.name, toppings: res.data.toppings },
          ...pizzas,
        ]);
      });
      setPizzaName("");
    }
  };

  const handlePizzaUpdate = (id: string) => {
    setPizzas(
      pizzas.map((t) => {
        if (t._id === id) {
          t.toppings = checkedCheckboxesEdit;
        }
        return t;
      })
    );

    PizzaAPI.updatePizza(
      { name: pizza?.name, toppings: checkedCheckboxesEdit },
      pizza?._id as string
    );
    // window.location.reload();
    setOpen(false);
  };

  const deletePizza = (id: string) => {
    //Returns a new pizza array without the pizza that matches the id
    const deletePizza = pizzas.filter((item) => item._id !== id);
    setPizzas([...deletePizza]);
    PizzaAPI.deletePizza(id);
  };

  //TODO refactor this
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

  //TODO refactor this
  const handleCheckboxChangeEdit = (data: any) => {
    const isChecked = checkedCheckboxesEdit.some(
      //@ts-ignore
      (checkedCheckbox) => checkedCheckbox.value === data.value
    );
    if (isChecked) {
      setCheckedCheckboxesEdit(
        checkedCheckboxesEdit.filter(
          //@ts-ignore
          (checkedCheckbox) => checkedCheckbox.value !== data.value
        )
      );
    } else {
      setCheckedCheckboxesEdit(checkedCheckboxesEdit.concat(data));
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
      <span>{error ? error : null}</span>

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
                        checked={checkedCheckboxesEdit.some(
                          (checkedBox: any) => checkedBox.value === top.value
                        )}
                        onChange={() => handleCheckboxChangeEdit(top)}
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
          <Button
            positive
            onClick={() => handlePizzaUpdate(pizza?._id as string)}
          >
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
