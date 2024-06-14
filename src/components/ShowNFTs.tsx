// src/components/ShowNFTs.tsx
import { Button } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Magic } from "magic-sdk";
import { MdImage } from "react-icons/md";

const ShowNFTs = () => {
  const [magic, setMagic] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const magicInstance = new Magic(process.env.NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY);
      setMagic(magicInstance);
    }
  }, []);

  const showNFTs = () => {
    if (magic) {
      magic.wallet.showNFTs();
    }
  };

  return (
    <Button w={16} h={16} colorScheme="blue" borderRadius="full" onClick={showNFTs}>
      <MdImage size={24} />
    </Button>
  );
};

export default ShowNFTs;
