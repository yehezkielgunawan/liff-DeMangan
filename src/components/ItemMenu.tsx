import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import { Box, Button, Flex, Skeleton, Text } from "@chakra-ui/react";
import { convertPriceToText } from "../helper/helper";
import { OrderMenuListProps } from "./ListMenu";
import { OrderedItemType } from "./MenuContainer";

type ItemMenuProps = {
  item: OrderedItemType;
  index?: number;
  setFieldValue?: OrderMenuListProps["setFieldValue"];
  ready: boolean;
};

export default function ItemMenu({
  item,
  index,
  setFieldValue,
  ready,
}: ItemMenuProps) {
  return (
    <Skeleton isLoaded={ready} fadeDuration={1}>
      <Flex mt="5px">
        <Box>
          <Text fontWeight="semibold" fontSize="md">
            {" "}
            {item.name}
          </Text>
          <Text>{convertPriceToText(item.price)}</Text>
        </Box>
        <Flex marginLeft="auto" alignItems="center">
          {setFieldValue && (
            <Button
              size="sm"
              bg="#FCCD5D"
              color="black"
              hidden={item.qty === 0}
              onClick={() => setFieldValue(`items[${index}.qty]`, item.qty - 1)}
            >
              <MinusIcon />
            </Button>
          )}
          <Text
            marginX={2}
            fontWeight={setFieldValue && "semibold"}
            fontSize="md"
            hidden={item.qty === 0}
          >
            {!setFieldValue && `*`}
            {item.qty}
            {!setFieldValue && `=`}
          </Text>
          {!setFieldValue && (
            <Text marginLeft={2}>
              {convertPriceToText(item.price * item.qty)}
            </Text>
          )}
          {setFieldValue && (
            <Button
              color="black"
              size="sm"
              bg="#FFF3A6"
              onClick={() => setFieldValue(`items[${index}].qty`, item.qty + 1)}
            >
              <AddIcon />
            </Button>
          )}
        </Flex>
      </Flex>
    </Skeleton>
  );
}
