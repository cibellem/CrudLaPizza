import { useEffect, useState } from "react";
import "./style.css";

function App() {
  const [topping, setTopping] = useState<string>("");
  const [editId, setEditId] = useState<string>("");
  const [toppings, setToppings] = useState([
    { id: "1", topping: "Cheese" },
    { id: "2", topping: "Pepperoni" },
    { id: "3", topping: "Mushrooms" },
  ]);

  useEffect(() => {
    //Call API to get all toppings and create a local state list to display to the user
  }, []);

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (editId) {
      const editTopping = toppings.find((i) => i.id === editId);
      const updateTopping = toppings.map((t) =>
        editTopping && t.id === editTopping.id
          ? (t = { id: t.id, topping })
          : { id: t.id, topping: t.topping }
      );
      setToppings(updateTopping);
      //API call
      setEditId("");
      setTopping("");
      return;
    }
    //Check is already in the list if not add to the local list to update the UI and make an api call to add to the database
    if (topping !== "") {
      setToppings([{ id: `${topping}-${Date.now()}`, topping }, ...toppings]);
      //API call
      setTopping("");
    }
  };

  function removeTopping(id: string) {
    const deleteTopping = toppings.filter((item) => item.id !== id);
    setToppings([...deleteTopping]);
    //API Call
  }

  const editTopping = (id: string) => {
    const editTopping = toppings.find((i) => i.id === id);
    if (editTopping) {
      setTopping(editTopping?.topping);
      setEditId(id);
    }
  };

  return (
    <>
      <section className="main">
        <h1>Manage your toppings</h1>
        <article className="toppingsInventory">
          <form onSubmit={handleSubmit}>
            <label>
              <input
                type="text"
                value={topping}
                onChange={(e) => setTopping(e.target.value)}
              />
            </label>
            <button type="submit">{editId ? "Done" : "Add"}</button>
          </form>
        </article>

        <article className="toppingsListBlock">
          <h3>Toppings List</h3>
          {toppings.map((top) => (
            <div key={top.id} className="toppingsList">
              <span>{top.topping}</span>
              <div className="toppingsListActionBtns">
                <button onClick={() => editTopping(top.id)}>Edit</button>
                <button type="button" onClick={() => removeTopping(top.id)}>
                  Remove
                </button>
              </div>
            </div>
          ))}
        </article>
      </section>
    </>
  );
}

export default App;
