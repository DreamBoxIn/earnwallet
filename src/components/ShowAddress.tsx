// src/components/ShowAddress.tsx
import { Button } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Magic } from "magic-sdk";
import { MdHome } from "react-icons/md";

const ShowAddress = () => {
  const [magic, setMagic] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const magicInstance = new Magic(process.env.NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY);
      setMagic(magicInstance);
    }
  }, []);

  const showAddress = () => {
    if (magic) {
      magic.wallet.showAddress();
    }
  };

  return (
    <Button w={16} h={16} colorScheme="blue" borderRadius="full" onClick={showAddress}>
      <MdHome size={24} />
    </Button>
  );
};

export default ShowAddress;
