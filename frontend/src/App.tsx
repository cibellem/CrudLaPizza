import { useEffect, useState } from "react";
import "./style.css";
import ToppingsAPI from "./API";

function App() {
  const [topping, setTopping] = useState<string>("");
  const [editId, setEditId] = useState<string>("");
  const [toppings, setToppings] = useState<{ id: string; value: string }[]>([]);

  useEffect(() => {
    //Call API to get all toppings and set to local state
    ToppingsAPI.getToppings().then((res) => {
      setToppings(res.data);
    });
  }, []);

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

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

  function removeTopping(id: string) {
    //Returns a new toppings array without the topping that matches the id
    const deleteTopping = toppings.filter((item) => item.id !== id);
    setToppings([...deleteTopping]);
    //API call
    ToppingsAPI.deleteTopping(id);
  }

  const editTopping = (top: any) => {
    setTopping(top.value);
    setEditId(top.id);
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
          {toppings &&
            toppings.map((top) => (
              <div key={top.id} className="toppingsList">
                <span>{top.value}</span>
                <div className="toppingsListActionBtns">
                  <button onClick={() => editTopping(top)}>Edit</button>
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
