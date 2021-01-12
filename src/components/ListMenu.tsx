import { Box, Heading, Text } from "@chakra-ui/react";
import { FormikErrors } from "formik";
import { useEffect } from "react";
import ItemMenu from "./ItemMenu";
import { MenuFormValueType, MenuItemType } from "./MenuContainer";

export type OrderMenuListProps = {
  values: MenuFormValueType;
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean
  ) => Promise<void> | Promise<FormikErrors<MenuFormValueType>>;
  ready: boolean;
};

export default function ListMenu({
  values,
  setFieldValue,
  ready,
}: OrderMenuListProps) {
  return (
    <Box textColor="white" mt="10px">
      <Box as="section" padding={2} bg="#0EAD95" borderRadius="5px" marginY={6}>
        <Heading as="h5" size="md" mb={2}>
          Makanan
        </Heading>
        {values.items
          .filter((item) => item.type === MenuItemType.food)
          .map((food, index) => (
            <ItemMenu
              item={food}
              key={index}
              index={index}
              setFieldValue={setFieldValue}
              ready={ready}
            />
          ))}
      </Box>
      <Box as="section" padding={2} bg="#0EAD95" borderRadius="5px">
        <Heading as="h5" size="md" mb={2}>
          Minuman
        </Heading>
        {values.items
          .filter((item) => item.type === MenuItemType.drink)
          .map((drink, index) => (
            <ItemMenu
              item={drink}
              key={index}
              index={
                values.items.filter((item) => item.type === MenuItemType.food)
                  .length + index
              }
              setFieldValue={setFieldValue}
              ready={ready}
            />
          ))}
      </Box>
    </Box>
  );
}
