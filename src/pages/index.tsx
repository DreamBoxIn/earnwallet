import { useEffect, useState } from "react";
import { Magic } from "magic-sdk";
import { useRouter } from "next/router";
import { Box, Button, Input, Center, Text, useToast, useColorModeValue } from "@chakra-ui/react";
import Head from "next/head";

export default function Home() {
  const [email, setEmail] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();
  const toast = useToast();
  const [magic, setMagic] = useState(null);

  const bg = useColorModeValue("gray.50", "gray.900");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const magicInstance = new Magic(process.env.NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY);
      setMagic(magicInstance);

      magicInstance.user.isLoggedIn().then((loggedIn) => {
        console.log("User logged in status:", loggedIn);
        if (loggedIn) {
          router.push("/dashboard");
        }
      });
    }
  }, [router]);

  const handleLogin = async () => {
    console.log("handleLogin called");
    if (!magic) {
      console.error("Magic instance is not initialized");
      return;
    }

    try {
      console.log("Attempting to log in with email:", email);
      await magic.auth.loginWithMagicLink({ email });
      setIsLoggedIn(true);
      console.log("Login successful, redirecting to /dashboard");
      router.push("/dashboard");
    } catch (error) {
      console.error("Login failed:", error);
      toast({
        title: "Error de inicio de sesión",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <Head>
        <title>Login with Magic Link</title>
        <meta name="description" content="Login page for Magic Link" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Center h="100vh" bg={bg}>
        <Box p={8} maxW="md" borderWidth={1} borderRadius={8} boxShadow="lg">
          <Text mb={4} fontSize="xl" fontWeight="bold">Iniciar Sesión</Text>
          {!isLoggedIn ? (
            <>
              <Input
                placeholder="Ingresa tu correo"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                mb={4}
              />
              <Button onClick={handleLogin}>Iniciar sesión</Button>
            </>
          ) : (
            <Text>Sesión iniciada. Redirigiendo...</Text>
          )}
        </Box>
      </Center>
    </>
  );
}
