import { Box, Flex, Heading, Image, Spacer } from "@chakra-ui/react";
import { DarkModeSwitch } from "./DarkModeSwitch";

export const Hero = ({ title }: { title: string }) => (
  <Flex
    alignItems="center"
    mt="30px"
    textAlign="left"
    bg="#5D9E94"
    borderRadius="10px"
    color="white"
  >
    <Box>
      <Image src="/images/logo.png" borderRadius="full"></Image>
    </Box>
    <Box>
      <Heading fontSize="xl">{title}</Heading>
    </Box>
    <Spacer></Spacer>
    <Box>
      <DarkModeSwitch />
    </Box>
  </Flex>
);

Hero.defaultProps = {
  title: "DeMangan",
};
