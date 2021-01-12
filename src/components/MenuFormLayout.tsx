import {
  Box,
  Button,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Skeleton,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { OpenWindowParams } from "@line/liff/dist/lib/client/openWindow";
import { FormikErrors } from "formik";
import { convertPriceToText } from "../helper/helper";
import ItemMenu from "./ItemMenu";
import ListMenu, { OrderMenuListProps } from "./ListMenu";
import {
  MenuFormValueType,
  MenuItemType,
  OrderedItemType,
} from "./MenuContainer";
import MenuHeader from "./MenuHeader";
import RingkasanMenu, { RingkasanMenuProps } from "./RingkasanMenu";

export type MenuFormLayoutProps = {
  ready: boolean;
  displayName: string;
  profilePic: string;
  isInClient: boolean;
  isLoggedIn: boolean;

  orderedItems: Array<OrderedItemType>;
  totalFoodQty: number;
  totalDrinkQty: number;
  totalOrderValue: number;

  values: MenuFormValueType;
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean
  ) => Promise<void> | Promise<FormikErrors<MenuFormValueType>>;
  handleSubmit: () => void;

  logout: () => void;
  openWindow: (params: OpenWindowParams) => void;
};

export default function MenuFormLayout({
  ready,
  displayName,
  profilePic,
  isInClient,
  isLoggedIn,
  orderedItems,
  totalFoodQty,
  totalDrinkQty,
  totalOrderValue,
  values,
  setFieldValue,
  handleSubmit,
  logout,
  openWindow,
}: MenuFormLayoutProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const orderMenuListProps: OrderMenuListProps = {
    ready,
    values,
    setFieldValue,
  };

  const orderSummaryProps: RingkasanMenuProps = {
    values,
    onOpen,
  };

  return (
    <Box>
      <Skeleton
        isLoaded={
          ready &&
          profilePic &&
          profilePic.length >= 0 &&
          displayName &&
          displayName.length >= 0
        }
        fadeDuration={1}
        height={12}
      >
        <MenuHeader name={displayName} profilePic={profilePic} />
      </Skeleton>
      <ListMenu {...orderMenuListProps} />

      <RingkasanMenu {...orderSummaryProps} />
      <Box mt={4}>
        {isLoggedIn && (
          <Button
            borderRadius={5}
            isFullWidth
            onClick={() => logout()}
            bg="#0EAD95"
            color="white"
          >
            Logout
          </Button>
        )}
        {isInClient && (
          <Button
            mt={3}
            isFullWidth
            bg="orange"
            color="black"
            onClick={() =>
              openWindow({ url: "https://yehezkielgunawan123.vercel.app" })
            }
          >
            Buka di External Browser
          </Button>
        )}
      </Box>
      <Modal isOpen={isOpen} onClose={onClose} isCentered motionPreset="scale">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Yakin dengan pesanan anda?</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {totalFoodQty > 0 && (
              <Box marginBottom={4}>
                <Text fontSize="lg">{totalFoodQty} makanan: </Text>
                {orderedItems
                  .filter((item) => item.type === MenuItemType.food)
                  .map((food, index) => (
                    <ItemMenu item={food} key={index} ready={ready} />
                  ))}
              </Box>
            )}
            {totalDrinkQty > 0 && (
              <Box marginBottom={4}>
                <Text fontSize="lg">{totalDrinkQty} minuman: </Text>
                {orderedItems
                  .filter((item) => item.type === MenuItemType.drink)
                  .map((drink, index) => (
                    <ItemMenu item={drink} key={index} ready={ready} />
                  ))}
              </Box>
            )}
            <Heading fontSize="xl" textAlign="right">
              Total: {convertPriceToText(totalOrderValue)}
            </Heading>
          </ModalBody>
          <ModalFooter>
            <Text fontWeight="bold" onClick={onClose} mr={4}>
              Kembali
            </Text>
            <Button bg="#02C7A9" color="white" onClick={() => handleSubmit()}>
              Pesan
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
