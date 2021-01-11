import { Avatar, Box, Flex, Text,} from "@chakra-ui/react";


export default function MenuHeader(props: any) {
  return (
    <Flex mt="20px" alignItems="center">
      <Box>
        <Avatar name="ProfilePic" src={props.profilePic}></Avatar>
      </Box>
      <Box ml="5px">
        <Text>Hai {props.name}, silahkan pesan menu di bawah ini!</Text>
      </Box>
    </Flex>
  );
}
