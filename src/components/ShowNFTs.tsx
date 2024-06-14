// src/components/ShowNFTs.tsx
import { Button, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Magic } from "magic-sdk";
import { MdImage } from "react-icons/md";

const ShowNFTs = () => {
  const [magic, setMagic] = useState<Magic | null>(null);
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
    }
  }, []);

  const showNFTs = () => {
    if (magic) {
      magic.wallet.showNFTs();
    } else {
      toast({
        title: "Error",
        description: "Magic SDK no está inicializado.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Button w={16} h={16} colorScheme="blue" borderRadius="full" onClick={showNFTs}>
      <MdImage size={24} />
    </Button>
  );
};

export default ShowNFTs;
