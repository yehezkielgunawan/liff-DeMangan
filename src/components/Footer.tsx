import { Flex, Link, Text } from "@chakra-ui/react";
import "../helper/helper";
import { getCurrentYear } from "../helper/helper";

export const Footer = () => (
  <Flex as="footer" justifyContent="center" py="4rem" flexDirection="column" textAlign="center">
    <Text>
      {getCurrentYear()} | <b>Yehezkiel Gunawan</b>
    </Text>
    <Link href="https://www.freepik.com/vectors/food">Food vector created by catalyststuff - www.freepik.com</Link>
    <Link href="https://sznm.dev/">Design Inspiration from Agustinus Nathaniel - sznm.dev</Link>
  </Flex>
);
