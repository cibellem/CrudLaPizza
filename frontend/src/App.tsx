import Toppings from "./Toppings";
import Pizzas from "./Pizzas";
import { Tab } from "semantic-ui-react";

function App() {
  const panes = [
    {
      menuItem: "Toppings",
      render: () => (
        <Tab.Pane>
          <Toppings />
        </Tab.Pane>
      ),
    },
    {
      menuItem: "Pizzas",
      render: () => (
        <Tab.Pane>
          <Pizzas />
        </Tab.Pane>
      ),
    },
  ];

  return <Tab panes={panes} />;
}

export default App;
