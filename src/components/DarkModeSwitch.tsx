import { useColorMode, Switch } from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

export const DarkModeSwitch = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const isDark = colorMode === "dark";
  if (isDark) {
    return (
      <>
        <MoonIcon></MoonIcon>
        <Switch
          position="relative"
          color="green"
          mr="10px"
          isChecked={isDark}
          onChange={toggleColorMode}
        />
      </>
    );
  }
  return (
    <>
      <SunIcon></SunIcon>
      <Switch
        position="relative"
        color="green"
        mr="10px"
        isChecked={isDark}
        onChange={toggleColorMode}
      />
    </>
  );
};
