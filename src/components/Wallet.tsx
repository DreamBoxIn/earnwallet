import { Box, Button, Text, Flex, IconButton, Tooltip, VStack, useToast, useColorModeValue } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Magic } from "magic-sdk";
import { MdAccountBalance, MdSend, MdHome, MdImage, MdShoppingCart, MdContentCopy } from "react-icons/md";

const Wallet = () => {
  const [magic, setMagic] = useState(null);
  const [address, setAddress] = useState("");
  const toast = useToast();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const magicInstance = new Magic(process.env.NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY);
      setMagic(magicInstance);

      magicInstance.user.getMetadata().then(({ publicAddress }) => {
        setAddress(publicAddress);
      });
    }
  }, []);

  const showBalance = () => {
    magic?.wallet.showBalances();
  };

  const showSendTokens = () => {
    magic?.wallet.showSendTokensUI();
  };

  const copyAddress = () => {
    navigator.clipboard.writeText(address);
    toast({
      title: "Dirección copiada",
      description: "La dirección ha sido copiada al portapapeles.",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  const bg = useColorModeValue("white", "gray.700");
  const color = useColorModeValue("black", "white");

  return (
    <Box
      p={4}
      bg={bg}
      color={color}
      borderRadius="md"
      boxShadow="lg"
      maxW="md"
      w="full"
      textAlign="center"
      overflowX="auto"
    >
      <Flex justifyContent="center" alignItems="center" mb={4}>
        <Text fontSize="lg" fontWeight="bold" isTruncated maxW="200px">
          {address}
        </Text>
        <Tooltip label="Copiar dirección">
          <IconButton
            ml={2}
            icon={<MdContentCopy />}
            onClick={copyAddress}
            aria-label="Copiar dirección"
          />
        </Tooltip>
      </Flex>
      <Flex justifyContent="center" alignItems="center" gap={4} wrap="nowrap" px={2}>
        <VStack>
          <Button
            w={14}
            h={14}
            colorScheme="blue"
            borderRadius="full"
            onClick={showBalance}
          >
            <MdAccountBalance size={24} />
          </Button>
          <Text fontSize="sm">Billetera</Text>
        </VStack>
        <VStack>
          <Button
            w={14}
            h={14}
            colorScheme="blue"
            borderRadius="full"
            onClick={showSendTokens}
          >
            <MdSend size={24} />
          </Button>
          <Text fontSize="sm">Enviar</Text>
        </VStack>
        <VStack>
          <Button
            w={14}
            h={14}
            colorScheme="blue"
            borderRadius="full"
            onClick={showBalance}
          >
            <MdHome size={24} />
          </Button>
          <Text fontSize="sm">Recibir</Text>
        </VStack>
        <VStack>
          <Button
            w={14}
            h={14}
            colorScheme="blue"
            borderRadius="full"
            onClick={showBalance}
          >
            <MdImage size={24} />
          </Button>
          <Text fontSize="sm">NFT</Text>
        </VStack>
        <VStack>
          <Button
            w={14}
            h={14}
            colorScheme="blue"
            borderRadius="full"
            onClick={showBalance}
          >
            <MdShoppingCart size={24} />
          </Button>
          <Text fontSize="sm">Comprar</Text>
        </VStack>
      </Flex>
    </Box>
  );
};

export default Wallet;
