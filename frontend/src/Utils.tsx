export type Topping = {
  _id: string;
  value: string;
};

export type Pizza = {
  _id?: string;
  name: string;
  toppings: Topping[];
};
