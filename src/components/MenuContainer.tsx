import { Menu } from "../constants/menuType";
import { foods } from "../constants/food";
import { drinks } from "../constants/drink";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { userDataType } from "./AppContent";
import MenuHeader from "./MenuHeader";
import ListMenu from "./ListMenu";
import RingkasanMenu from "./RingkasanMenu";
import { convertPriceToText, countQtyByType } from "../helper/helper";
import { useToast } from "@chakra-ui/react";

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
  liff,
  ready
}: userDataType) {
  const [orderedItems, setOrderedItems] = useState<OrderedItemType[]>([]);
  const [totalFoodQty, setTotalFoodQty] = useState<number>(0);
  const [totalDrinkQty, setTotalDrinkQty] = useState<number>(0);
  const [totalOrderPrice, setTotalOrderPrice] = useState<number>(0);

  const { values, handleSubmit, setFieldValue } = useFormik<MenuFormValueType>({
    initialValues: initial_menus,
    onSubmit: () => {
      const template_message = `Hai ${name},\nTerima kasih telah memesan via DeMangan! Berikut adalah ringkasan pesanan anda:\n${
        totalFoodQty > 0 ? `\n ${totalFoodQty} Makanan: ` : ""
      }${
        totalFoodQty > 0
          ? orderedItems
              .filter((item) => item.type === MenuItemType.food)
              .map(
                (food) =>
                  `\n${food.name} (${convertPriceToText(food.price)}) * ${
                    food.qty
                  }\n`
              )
          : null
      }${totalDrinkQty > 0 ? `\n ${totalDrinkQty} Minuman` : ""}${
        totalDrinkQty > 0
          ? orderedItems
              .filter((item) => item.type === MenuItemType.drink)
              .map(
                (drink) =>
                  `\n${drink.name} (${convertPriceToText(drink.price)}) * ${
                    drink.qty
                  }\n`
              )
          : null
      }\n\nTotal : ${convertPriceToText(
        totalOrderPrice
      )}\n\nPesanan Anda akan segera diproses lebih lanjut!`;

      if (liff.isInClient()) {
        liff.sendMessages([
          {
            type: "text",
            text: template_message,
          },
        ]);
      } else {
        const toast = useToast();
        toast({
          title: "Mohon maaf",
          description:
            "Pemesanan saat ini hanya dapat melalui LINE browser, saat ini anda membuka halaman ini di browser eksternal.",
          status: "warning",
          duration: 10000,
          isClosable: true,
          position: "bottom",
        });
      }
    },
  });

  useEffect(() => {
    const orderedItems = values.items.filter((item) => item.qty > 0);
    setOrderedItems(orderedItems);
    setTotalFoodQty(countQtyByType(orderedItems, MenuItemType.food));
    setTotalDrinkQty(countQtyByType(orderedItems, MenuItemType.drink));
    const totalOrderValue = orderedItems.reduce(
      (prev, curr) => prev + curr.price * curr.qty,
      0
    );
    setTotalOrderPrice(totalOrderValue);
  }, [values]);



  if (liff.isLoggedIn()) {
    return (
      <>
        <MenuHeader name={name} profilePic={profilePic}></MenuHeader>
        <p>Logged in</p>
        <ListMenu {...initial_menus} />
        <RingkasanMenu />
      </>
    );
  }
  return (
    <>
      <MenuHeader name={name} profilePic={profilePic}></MenuHeader>
      <p>Gak</p>
      <ListMenu {...initial_menus} />
      <RingkasanMenu />
    </>
  );
}
