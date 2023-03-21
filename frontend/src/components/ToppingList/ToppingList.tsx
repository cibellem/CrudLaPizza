import { Button } from "semantic-ui-react";

//Type this file

type Props = {
  editTopping: any;
  toppings: any;
  removeTopping: any;
};

function ToppingList({ editTopping, toppings, removeTopping }: Props) {
  return (
    <article className="toppingsListBlock">
      <h3>Toppings List</h3>
      {toppings &&
        toppings.map((top: any) => (
          <div key={top._id} className="toppingsList">
            <span>{top.value}</span>
            <div className="toppingsListActionBtns">
              <Button
                color="yellow"
                size="mini"
                onClick={() => editTopping(top)}
              >
                Edit
              </Button>
              <Button
                color="red"
                size="mini"
                type="button"
                onClick={() => removeTopping(top._id)}
              >
                Remove
              </Button>
            </div>
          </div>
        ))}
    </article>
  );
}

export default ToppingList;
