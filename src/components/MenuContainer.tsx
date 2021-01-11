import { Menu } from "../constants/menuType";
import { foods } from "../constants/food";
import { drinks } from "../constants/drink";
import { useEffect, useState } from "react";
import { userDataType } from "./AppContent";
import MenuHeader from "./MenuHeader";
import ListMenu from "./ListMenu";
import RingkasanMenu from "./RingkasanMenu";

export enum MenuItemType {
  food = "food",
  drink = "drink",
}

export type OrderedItemType = Menu & {
  qty: number;
  type: MenuItemType;
};

export type MenuFormValueType = {
  items: Array<OrderedItemType>;
};

export let initial_menus: MenuFormValueType = {
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

export default function MenuContainer({
  name,
  profilePic,
  isInClient,
}: userDataType) {
  const [orderedItems, setOrderedItems] = useState<OrderedItemType[]>([]);
  const [totalFoodQty, setTotalFoodQty] = useState<number>(0);
  const [totalDrinkQty, setTotalDrinkQty] = useState<number>(0);
  const [totalOrderPrice, setTotalOrderPrice] = useState<number>(0);


  return (
    <>
      <MenuHeader name={name} profilePic={profilePic}></MenuHeader>
      <p>{isInClient}</p>
      <ListMenu {...initial_menus} />
      <RingkasanMenu />
    </>
  );
}
