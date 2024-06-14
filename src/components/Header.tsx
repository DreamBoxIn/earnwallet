// src/components/Header.tsx
import { Flex, Button, IconButton, Menu, MenuButton, MenuList, MenuItem, useColorMode, useColorModeValue } from "@chakra-ui/react";
import { MoonIcon, SunIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";
import { Magic } from "magic-sdk";
import { useEffect, useState } from "react";

const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const router = useRouter();
  const [magic, setMagic] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const magicInstance = new Magic("pk_live_E160F3CBC98C4146");
      setMagic(magicInstance);
    }
  }, []);

  const handleLogout = async () => {
    if (magic) {
      await magic.user.logout();
      router.push("/");
    }
  };

  const bg = useColorModeValue("teal.500", "teal.900");
  const color = useColorModeValue("white", "gray.200");

  return (
    <Flex justify="space-between" p={4} bg={bg} color={color}>
      <Button variant="link" color={color}>Logo</Button>
      <Flex align="center">
        <IconButton
          aria-label="Toggle Theme"
          icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
          onClick={toggleColorMode}
          mr={4}
        />
        <Menu>
          <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
            Perfil
          </MenuButton>
          <MenuList>
            <MenuItem onClick={handleLogout}>Cerrar Sesión</MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </Flex>
  );
};

export default Header;
