// src/components/ShowOnRamp.tsx
import { Button, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Magic } from "magic-sdk";
import { MdHome } from "react-icons/md";

const ShowOnRamp = () => {
  const [magic, setMagic] = useState<Magic | null>(null);
  const toast = useToast();

  useEffect(() => {
    const magicPublishableKey = process.env.NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY;

    if (!magicPublishableKey) {
      console.error("Magic publishable key is not defined.");
      toast({
        title: "Error",
        description: "Magic publishable key is not defined.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    if (typeof window !== "undefined") {
      const magicInstance = new Magic(magicPublishableKey);
      setMagic(magicInstance);
    }
  }, [toast]);

  const showOnRamp = () => {
    if (magic) {
      magic.wallet.showOnRamp();
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
    <Button w={16} h={16} colorScheme="blue" borderRadius="full" onClick={showOnRamp}>
      <MdHome size={24} />
    </Button>
  );
};

export default ShowOnRamp;
