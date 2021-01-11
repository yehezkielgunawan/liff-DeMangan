import { Box, Heading, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import ItemMenu from "./ItemMenu";
import { MenuFormValueType, MenuItemType } from "./MenuContainer";

export default function ListMenu(props: MenuFormValueType) {

  return (
    <Box textColor="white" mt="10px">
      <Box as="section" padding={2} bg="#0EAD95" borderRadius="5px" marginY={6}>
        <Heading as="h5" size="md" mb={2}>
          Makanan
        </Heading>
        {props.items
          .filter((item) => item.type === MenuItemType.food)
          .map((food, index) => (
            <ItemMenu item={food} key={index} index={index} />
          ))}
      </Box>
      <Box as="section" padding={2} bg="#0EAD95" borderRadius="5px">
        <Heading as="h5" size="md" mb={2}>
          Minuman
        </Heading>
        {props.items
          .filter((item) => item.type === MenuItemType.drink)
          .map((drink, index) => (
            <ItemMenu item={drink} key={index} index={index} />
          ))}
      </Box>
    </Box>
  );
}
