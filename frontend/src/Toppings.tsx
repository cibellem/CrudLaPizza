import { useEffect, useState } from "react";
import ToppingsAPI from "./ToppingsAPI";
import ToppingForm from "./components/ToppingForm/ToppingForm";
import ToppingList from "./components/ToppingList/ToppingList";
import { Container } from "semantic-ui-react";
import { Topping } from "./Utils";

function Toppings() {
  const [topping, setTopping] = useState<string>("");
  const [editId, setEditId] = useState<string>("");
  const [toppings, setToppings] = useState<Topping[]>([]);
  const [error, setError] = useState<string>();

  useEffect(() => {
    //Call API to get all toppings and set to local state
    ToppingsAPI.getToppings().then((res) => {
      setToppings(res.data);
    });
  }, []);

  //Handle Topic Submit
  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (editId) {
      // Find the entry that needs to be updated
      setToppings(
        toppings.map((t) => {
          if (t._id === editId) {
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
        setToppings([
          { _id: res.data._id, value: res.data.value },
          ...toppings,
        ]);
      });
      setTopping("");
    } else {
      setError("Topping already in the list");
    }
  };

  const removeTopping = (id: string) => {
    //Returns a new toppings array without the topping that matches the id
    const deleteTopping = toppings.filter((item) => item._id !== id);
    setToppings([...deleteTopping]);
    //API call
    ToppingsAPI.deleteTopping(id);
  };

  const editTopping = (top: any) => {
    setTopping(top.value);
    setEditId(top._id);
  };

  return (
    <Container>
      <h1 style={{ marginTop: "20px" }}>Toppings</h1>
      <ToppingForm
        editId={editId}
        handleSubmit={handleSubmit}
        setTopping={setTopping}
        topping={topping}
      />
      <span>{error ? error : null}</span>

      <ToppingList
        editTopping={editTopping}
        toppings={toppings}
        removeTopping={removeTopping}
      />
    </Container>
  );
}

export default Toppings;
