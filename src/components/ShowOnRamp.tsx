// src/components/ShowOnRamp.tsx
import { Button } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Magic } from "magic-sdk";
import { MdShoppingCart } from "react-icons/md";

const ShowOnRamp = () => {
  const [magic, setMagic] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const magicInstance = new Magic(process.env.NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY);
      setMagic(magicInstance);
    }
  }, []);

  const showOnRamp = () => {
    if (magic) {
      magic.wallet.showOnRamp();
    }
  };

  return (
    <Button w={16} h={16} colorScheme="blue" borderRadius="full" onClick={showOnRamp}>
      <MdShoppingCart size={24} />
    </Button>
  );
};

export default ShowOnRamp;
