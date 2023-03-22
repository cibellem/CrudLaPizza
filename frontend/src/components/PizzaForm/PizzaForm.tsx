import { useState } from "react";
import { Button, Input, Transition } from "semantic-ui-react";
import { Topping } from "../../Utils";

type Props = {
  pizzaName: string;

  handleCheckboxChange: (e: React.SyntheticEvent) => void;
  handlePizzaSubmit: (e: React.SyntheticEvent) => void;
  setPizzaName: (pizzaname: string) => void;
  toppings: Topping[];
  checkedCheckboxes: any;
};

const PizzaForm = ({
  checkedCheckboxes,
  handleCheckboxChange,
  handlePizzaSubmit,
  pizzaName,
  setPizzaName,
  toppings,
}: Props) => {
  const [visible, setVisible] = useState(false);
  return (
    <>
      <section>
        <Button
          color="green"
          onClick={() => {
            setVisible(!visible);
          }}
        >
          {visible ? "Close" : "New Pizza"}
        </Button>
      </section>

      <Transition visible={visible} animation="scale" duration={500}>
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
                toppings.map((top: any) => (
                  <label key={top.id} className="form-control">
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
            <button type="submit">Create</button>
          </form>
        </div>
      </Transition>
    </>
  );
};

export default PizzaForm;
