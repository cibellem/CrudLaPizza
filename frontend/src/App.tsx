import { useEffect, useState } from "react";
import "./style.css";
import ToppingsAPI from "./ToppingsAPI";
import ToppingForm from "./components/ToppingForm/ToppingForm";
import PizzaAPI from "./PizzaAPI";

function App() {
  const [topping, setTopping] = useState<string>("");
  const [pizzaName, setPizzaName] = useState<string>("");
  const [editId, setEditId] = useState<string>("");
  const [toppings, setToppings] = useState<{ id: string; value: string }[]>([]);
  const [isCreating, setIsCreating] = useState(false);

  const [checkedCheckboxes, setCheckedCheckboxes] = useState([]);

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

  const handlePizzaSubmit = (e: any) => {
    e.preventDefault();
    const obj = {
      name: pizzaName,
      toppings: checkedCheckboxes,
    };

    PizzaAPI.createPizza(obj).then((res) => {
      console.log(obj, "OBG");
    });
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

  //Pizza logic
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
    <section className="main">
      <ToppingForm
        editId={editId}
        handleSubmit={handleSubmit}
        setTopping={setTopping}
        topping={topping}
      />

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

      <article>
        <button onClick={handlePizzaCreation}>Create New Pizza</button>
        {isCreating && (
          <form onSubmit={handlePizzaSubmit}>
            <label>
              Pizza Name
              <input
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
                  <label key={top.id}>
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
        )}
      </article>
    </section>
  );
}

export default App;
