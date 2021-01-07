import { Flex, Text } from '@chakra-ui/react'
import '../helper/helper';
import { getCurrentYear } from '../helper/helper';

export const Footer = () => (
  <Flex as="footer" justifyContent="center" py="8rem" >
    <Text>{getCurrentYear()} | <b>Yehezkiel Gunawan</b></Text>
  </Flex>
)
