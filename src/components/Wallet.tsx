import { useEffect, useState } from "react";
import { Magic } from "magic-sdk";
import { Box, Button, Text, Flex, IconButton, Tooltip, VStack, useToast } from "@chakra-ui/react";
import { MdAccountBalance, MdSend, MdHome, MdImage, MdShoppingCart, MdContentCopy } from "react-icons/md";

const Wallet = () => {
  const [magic, setMagic] = useState<Magic | null>(null);
  const [address, setAddress] = useState("");
  const toast = useToast();

  useEffect(() => {
    const magicPublishableKey = process.env.NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY;
    if (!magicPublishableKey) {
      console.error("Magic publishable key is not defined.");
      return;
    }

    if (typeof window !== "undefined") {
      const magicInstance = new Magic(magicPublishableKey);
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

  return (
    <Box
      p={4}
      bg="white"
      borderRadius="md"
      boxShadow="lg"
      maxW="md" // Cambiado de maxW="sm" a maxW="md" para hacer el contenedor más ancho
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
            w={14} // Reducido de w={16}
            h={14} // Reducido de h={16}
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
            w={14} // Reducido de w={16}
            h={14} // Reducido de h={16}
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
            w={14} // Reducido de w={16}
            h={14} // Reducido de h={16}
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
            w={14} // Reducido de w={16}
            h={14} // Reducido de h={16}
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
            w={14} // Reducido de w={16}
            h={14} // Reducido de h={16}
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
