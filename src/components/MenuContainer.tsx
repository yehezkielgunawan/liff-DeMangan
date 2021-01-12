import { Menu } from "../constants/menuType";
import { foods } from "../constants/food";
import { drinks } from "../constants/drink";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { userDataType } from "./AppContent";
import { convertPriceToText, countQtyByType } from "../helper/helper";
import { Skeleton, useToast } from "@chakra-ui/react";
import MenuFormLayout, { MenuFormLayoutProps } from "./MenuFormLayout";

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

let initial_menus: MenuFormValueType = {
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
  ready,
}: userDataType) {
  const [orderedItems, setOrderedItems] = useState<OrderedItemType[]>([]);
  const [totalFoodQty, setTotalFoodQty] = useState<number>(0);
  const [totalDrinkQty, setTotalDrinkQty] = useState<number>(0);
  const [totalOrderPrice, setTotalOrderPrice] = useState<number>(0);
  const toast = useToast();

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
                  }`
              ) + "\n"
          : null
      }${totalDrinkQty > 0 ? `\n ${totalDrinkQty} Minuman` : ""}${
        totalDrinkQty > 0
          ? orderedItems
              .filter((item) => item.type === MenuItemType.drink)
              .map(
                (drink) =>
                  `\n${drink.name} (${convertPriceToText(drink.price)}) * ${
                    drink.qty
                  }`
              ) + "\n"
          : null
      }\n\nTotal : ${convertPriceToText(
        totalOrderPrice
      )}\n\nPesanan Anda akan segera diproses lebih lanjut!`;

      if (liff.isInClient()) {
        liff.sendMessages([
          {
            type: "text",
            text: template_message
          },
        ]);
        toast({
          title: "Selamat!",
          description: "Pesan telah terkirim ke LINE anda!",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      } else {
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

  const menuFormLayoutPros: MenuFormLayoutProps = {
    ready,
    displayName: name,
    profilePic,
    isInClient: liff.isInClient(),
    isLoggedIn: liff.isLoggedIn(),
    orderedItems,
    totalFoodQty,
    totalDrinkQty,
    totalOrderValue: totalOrderPrice,
    values,
    setFieldValue,
    handleSubmit,
    logout: liff.logout,
    openWindow: liff.openWindow,
  };

  return (
    <Skeleton isLoaded={ready} fadeDuration={0.5}>
      <MenuFormLayout {...menuFormLayoutPros} />
    </Skeleton>
  );
}
