import { Box, Button, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useLiff } from "react-liff";
import MenuContainer from "./MenuContainer";

export type userDataType =  {
    name: string;
    profilePic: string;
}

export default function AppContent() {
  const [displayName, setDisplayName] = useState<string>(undefined);
  const [profilePic, setProfilePic] = useState<string>(undefined);
  const { error, liff, isLoggedIn, ready } = useLiff();

  useEffect(() => {
    if (!isLoggedIn) return;

    (async () => {
      const profile = await liff.getProfile();
      setDisplayName(profile.displayName);
      if (profile.pictureUrl) {
        setProfilePic(profile.pictureUrl);
      } else {
        setProfilePic("");
      }
    })();
  }, [liff, isLoggedIn]);

  const userDataProps: userDataType ={
      name: displayName,
      profilePic: profilePic
  }

  const Contents = () => {
    if (error) return <p>Something error</p>;
    if (!ready) return <p>Loading...</p>;

    if (!isLoggedIn) {
      return (
        <Box mt="10px">
          <Text fontSize="md">
            You’re not logged in yet. Please login with your LINE account to use
            this app.
          </Text>
          <Button colorScheme="teal" mt="5px" onClick={() => liff.login()}>
            LOGIN
          </Button>
        </Box>
      );
    }

    return <MenuContainer {...userDataProps}/>;
  };
  return <Contents />;
}
