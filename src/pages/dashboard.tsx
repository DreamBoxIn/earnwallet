import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Magic } from "magic-sdk";
import { Flex, Spinner, Center, Box } from "@chakra-ui/react";
import Header from "../components/Header";
import Wallet from "../components/Wallet";
import InvestmentProjectsCarousel from "../components/InvestmentProjectsCarousel";

const Dashboard = () => {
  const [magic, setMagic] = useState<Magic | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const publishableKey = process.env.NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY;
      if (!publishableKey) {
        console.error("NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY no está definido");
        return;
      }
      const magicInstance = new Magic(publishableKey);
      setMagic(magicInstance);

      magicInstance.user.isLoggedIn().then((isLoggedIn) => {
        if (!isLoggedIn) {
          router.push("/");
        } else {
          setLoading(false);
        }
      });
    }
  }, [router]);

  if (loading) {
    return (
      <Center h="100vh">
        <Spinner size="xl" />
      </Center>
    );
  }

  return (
    <Flex direction="column" minH="100vh">
      <Header />
      <Flex flex="1" p={4} bg="gray.50" direction="column" justifyContent="center" alignItems="center" pt={4}>
        <Wallet />
        <InvestmentProjectsCarousel />
      </Flex>
    </Flex>
  );
};

export default Dashboard;
