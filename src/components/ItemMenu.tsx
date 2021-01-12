import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { convertPriceToText } from "../helper/helper";
import { OrderedItemType } from "./MenuContainer";

type ItemMenuProps = {
  item: OrderedItemType;
  index?: number;
};

export default function ItemMenu({ item, index }: ItemMenuProps) {

   const [tempQty, setQty] = useState(0);

   useEffect(() => {
       item.qty = tempQty;
   })

  return (
    <Flex mt="5px">
      <Box>
        <Text fontWeight="semibold" fontSize="md">
          {" "}
          {item.name}
        </Text>
        <Text>{convertPriceToText(item.price)}</Text>
      </Box>
      <Flex marginLeft="auto" alignItems="center">
        <Button
          size="sm"
          bg="#FCCD5D"
          color="black"
          hidden={tempQty === 0}
          onClick={() => setQty(tempQty-1)}
        >
          <MinusIcon />
        </Button>
        <Text
          marginX={2}
          fontWeight="semibold"
          fontSize="md"
          hidden={tempQty === 0}
        >
          {tempQty}
        </Text>
        <Button color="black" size="sm" bg="#FFF3A6" onClick={() => setQty(tempQty+1)}>
          <AddIcon />
        </Button>
      </Flex>
    </Flex>
  );
}