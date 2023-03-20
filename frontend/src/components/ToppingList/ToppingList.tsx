type Props = {
  editId: string;
  handleSubmit: (e: React.SyntheticEvent) => void;
  setTopping: (topping: string) => void;
  topping: string;
};

function ToppingForm({ editId, handleSubmit, topping, setTopping }: Props) {
  return (
    <>
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
    </>
  );
}

export default ToppingForm;
