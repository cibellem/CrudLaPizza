import { useEffect, useState } from "react";
import PizzaAPI from "./PizzaAPI";
import ToppingsAPI from "./ToppingsAPI";
import { Button, Input, List, Item, Container } from "semantic-ui-react";

function Pizzas() {
  const [pizzaName, setPizzaName] = useState<string>("");
  const [pizzas, setPizzas] = useState<{ name: string; toppings: [{}] }[]>([]);
  const [toppings, setToppings] = useState<{ id: string; value: string }[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [checkedCheckboxes, setCheckedCheckboxes] = useState([]);

  //Excessive calls
  useEffect(() => {
    //Call API to get all toppings and set to local state
    PizzaAPI.getPizzas().then((res) => {
      setPizzas(res.data);
    });

    ToppingsAPI.getToppings().then((res) => {
      setToppings(res.data);
    });
  }, []);

  //Pizza logic
  const handlePizzaSubmit = (e: any) => {
    e.preventDefault();
    //Think this better no need to do this extra op
    let toppingsList = checkedCheckboxes.map(({ value }) => value);
    //Check if it's duplicated
    PizzaAPI.createPizza({ name: pizzaName, toppings: toppingsList }).then(
      (res) => {
        setPizzas([
          { name: res.data.name, toppings: res.data.toppings },
          ...pizzas,
        ]);
      }
    );

    setPizzaName("");
  };

  const deletePizza = (id: string) => {
    //Returns a new pizza array without the pizza that matches the id
    //@ts-ignore
    const deletePizza = pizzas.filter((item) => item.id !== id);
    setPizzas([...deletePizza]);
    //API call
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

  const handlePizzaCreation = () => {
    setIsCreating(!isCreating);
  };

  return (
    <Container>
      <h1>Pizzas</h1>
      <button onClick={handlePizzaCreation}>New Pizza</button>
      {isCreating && (
        <div className="formWrapper">
          <form onSubmit={handlePizzaSubmit}>
            <label>
              Pizza Name:
              <Input
                size="mini"
                type="text"
                value={pizzaName}
                name="pizzaname"
                onChange={(e) => setPizzaName(e.target.value)}
              />
            </label>
            <>
              <h4>Pick the toppings</h4>
              {toppings &&
                toppings.map((top, index) => (
                  <label key={top.id} className="form-control">
                    <input
                      type="checkbox"
                      value={top.value}
                      name="toppings"
                      checked={checkedCheckboxes.some(
                        //@ts-ignore
                        (checkedCheckbox) =>
                          //@ts-ignore
                          checkedCheckbox.value === top.value
                      )}
                      //@ts-ignore
                      onChange={() => handleCheckboxChange(top)}
                    />
                    {top.value}
                  </label>
                ))}
            </>
            <button type="submit">Create</button>
          </form>
        </div>
      )}

      {pizzas &&
        //@ts-ignore
        pizzas.map((pizza: any) => (
          <div className="pizzaCard">
            <Item.Group>
              <Item>
                <Item.Content>
                  <Item.Header as="a">Name: {pizza.name}</Item.Header>
                  <Item.Meta>Toppings Added:</Item.Meta>

                  {pizza.toppings.map((topping: any) => (
                    <List>
                      <List.Item>{topping.value}</List.Item>
                    </List>
                  ))}

                  <Button
                    size="mini"
                    color="red"
                    onClick={() => deletePizza(pizza.id)}
                  >
                    Remove Pizza
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
