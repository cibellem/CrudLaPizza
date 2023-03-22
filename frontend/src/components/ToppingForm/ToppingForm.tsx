import { Button, Input } from "semantic-ui-react";

type Props = {
  editId: string;
  handleSubmit: (e: React.SyntheticEvent) => void;
  setTopping: (topping: string) => void;
  topping: string;
};

function ToppingForm({ editId, handleSubmit, topping, setTopping }: Props) {
  return (
    <article className="toppingsInventory">
      <form onSubmit={handleSubmit}>
        <label>
          <Input
            placeholder="Add new topping..."
            size="small"
            type="text"
            value={topping}
            onChange={(e) => setTopping(e.target.value)}
          />
        </label>
        <Button color="green" size="small" type="submit">
          {editId ? "Done" : "Add"}
        </Button>
      </form>
    </article>
  );
}

export default ToppingForm;
