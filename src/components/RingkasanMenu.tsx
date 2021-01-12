import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { convertPriceToText, countQtyByType } from "../helper/helper";
import { MenuFormValueType, MenuItemType } from "./MenuContainer";

export type RingkasanMenuProps = {
  values: MenuFormValueType;
  onOpen: () => void;
};

export default function RingkasanMenu({ values, onOpen }: RingkasanMenuProps) {
  const totalFoodQty = countQtyByType(values.items, MenuItemType.food);
  const totalDrinkQty = countQtyByType(values.items, MenuItemType.drink);

  const totalOrderValue = values.items.reduce(
    (prev, curr) => prev + curr.qty * curr.price,
    0
  );

  return (
    <Flex borderTop="1px" mt="15px" alignItems="center">
      <Box>
        <Text fontWeight="bold" fontSize="lg">
          Ringkasan
        </Text>
        <Text>
          {totalFoodQty > 0 && `${totalFoodQty} makanan`}{" "}
          {totalFoodQty > 0 && totalDrinkQty > 0 && ` dan `}{" "}
          {totalDrinkQty > 0 && `${totalDrinkQty} minuman `}
        </Text>
        <Text>Total: {convertPriceToText(totalOrderValue)}</Text>
      </Box>
      <Box marginLeft="auto">
        <Button size="sm" color="white" bg="#219181" borderRadius="5px" onClick={onOpen}>
          Pesan Sekarang
        </Button>
      </Box>
    </Flex>
  );
}
