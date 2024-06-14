import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Magic } from "magic-sdk";
import { Flex, Spinner, Center, Box, useColorModeValue } from "@chakra-ui/react";
import Header from "../components/Header";
import Wallet from "../components/Wallet";
import InvestmentProjectsCarousel from "../components/InvestmentProjectsCarousel";

const Dashboard = () => {
  const [magic, setMagic] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  
  const bg = useColorModeValue("gray.50", "gray.900");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const magicInstance = new Magic(process.env.NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY);
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
      <Center h="100vh" bg={bg}>
        <Spinner size="xl" />
      </Center>
    );
  }

  return (
    <Flex direction="column" minH="100vh" bg={bg}>
      <Header />
      <Flex flex="1" p={4} direction="column" justifyContent="center" alignItems="center" pt={4}>
        <Wallet />
        <InvestmentProjectsCarousel />
      </Flex>
    </Flex>
  );
};

export default Dashboard;
