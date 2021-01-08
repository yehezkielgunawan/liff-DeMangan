import { Menu } from "../constants/menuType";
import { foods } from "../constants/food";
import { drinks } from "../constants/drink";
import { useState } from "react";
import { userDataType } from "./AppContent";

export enum MenuItemType {
    food = "food",
    drink = "drink",
  }
  
  export type OrderedItemType = Menu & {
    qty: number;
    type: MenuItemType;
  };
  
  export type MenuFormValueType = {
    customer_name: string;
    items: Array<OrderedItemType>;
  };
  
  const INITIAL_VALUES: MenuFormValueType = {
    customer_name: "",
    items: [
      ...foods.map((food) => ({
        ...food,
        qty: 0,
        type: MenuItemType.food,
      })),
      ...drinks.map((drink) => ({
        ...drink,
        qty: 0,
        type: MenuItemType.drink,
      })),
    ],
  };

export default function MenuContainer({name, profilePic}: userDataType){
    const [orderedItems, setOrderedItems] = useState<OrderedItemType[]>([]);
    const [totalFoodQty, setTotalFoodQty] = useState<number>(0);
    const [totalDrinkQty, setTotalDrinkQty] = useState<number>(0);
    const [totalOrderPrice, setTotalOrderPrice] = useState<number>(0);

    return (
        <>
        <p>Welcome {name}</p>
        </>
    )
}