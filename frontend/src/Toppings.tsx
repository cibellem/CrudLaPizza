import { useEffect, useState } from "react";
import ToppingsAPI from "./ToppingsAPI";
import ToppingForm from "./components/ToppingForm/ToppingForm";
import ToppingList from "./components/ToppingList/ToppingList";
import { Container } from "semantic-ui-react";

function Toppings() {
  const [topping, setTopping] = useState<string>("");
  const [editId, setEditId] = useState<string>("");
  const [toppings, setToppings] = useState<{ id: string; value: string }[]>([]);

  useEffect(() => {
    //Call API to get all toppings and set to local state
    ToppingsAPI.getToppings().then((res) => {
      setToppings(res.data);
    });
  }, []);

  //Handle Topic Submit
  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    console.log(editId, "EDITID");
    console.log(topping);
    if (editId) {
      // Find the entry that needs to be updated
      setToppings(
        toppings.map((t) => {
          if (t.id === editId) {
            t.value = topping;
          }
          return t;
        })
      );

      ToppingsAPI.updateTopping({ value: topping }, editId);
      setEditId("");
      setTopping("");
      return;
    }

    // Check if input is not empty and if value is not duplicated in toppings array
    if (toppings.filter((e) => e.value === topping).length <= 0) {
      ToppingsAPI.addTopping({ value: topping }).then((res) => {
        setToppings([{ id: res.data.id, value: res.data.value }, ...toppings]);
      });
      setTopping("");
    }
  };

  const removeTopping = (id: string) => {
    //Returns a new toppings array without the topping that matches the id
    const deleteTopping = toppings.filter((item) => item.id !== id);
    setToppings([...deleteTopping]);
    //API call
    ToppingsAPI.deleteTopping(id);
  };

  const editTopping = (top: any) => {
    console.log(top, "TOPING");
    setTopping(top.value);
    setEditId(top.value);
  };

  return (
    <Container>
      <h1>Toppings</h1>
      <ToppingForm
        editId={editId}
        handleSubmit={handleSubmit}
        setTopping={setTopping}
        topping={topping}
      />

      <ToppingList
        editTopping={editTopping}
        toppings={toppings}
        removeTopping={removeTopping}
      />
    </Container>
  );
}

export default Toppings;
