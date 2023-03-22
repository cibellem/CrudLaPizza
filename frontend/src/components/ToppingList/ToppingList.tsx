import { Button } from "semantic-ui-react";
import { Topping } from "../../Utils";

type Props = {
  editTopping: (topping: string) => void;
  toppings: Topping[];
  removeTopping: (topping: string) => void;
};

function ToppingList({ editTopping, toppings, removeTopping }: Props) {
  return (
    <>
      <article className="toppingsListBlock">
        <h2>Toppings List</h2>
        {toppings.length > 0 ? (
          toppings.map((top: any) => (
            <div key={top._id} className="toppingsList">
              <span>{top.value}</span>
              <div className="toppingsListActionBtns">
                <Button
                  color="yellow"
                  size="small"
                  onClick={() => editTopping(top)}
                >
                  Edit
                </Button>
                <Button
                  color="red"
                  size="small"
                  type="button"
                  onClick={() => removeTopping(top._id)}
                >
                  Remove
                </Button>
              </div>
            </div>
          ))
        ) : (
          <h4>No toppings</h4>
        )}
      </article>
    </>
  );
}

export default ToppingList;
