import React, { useState } from "react";
import { Box, Button, Container, FormControl, FormLabel, Input, useToast, VStack, Heading } from "@chakra-ui/react";

const Index = () => {
  const toast = useToast();
  const [isLoggingIn, setIsLoggingIn] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const baseURL = "https://backengine-4d7k.fly.dev";

  const handleAuth = async (isLogin) => {
    const endpoint = isLogin ? "/login" : "/signup";
    const response = await fetch(`${baseURL}${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      if (isLogin) {
        toast({
          title: "Login Successful",
          description: `Access Token: ${data.accessToken}`,
          status: "success",
          duration: 9000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Signup Successful",
          description: "You can now log in with your credentials.",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
      }
    } else {
      toast({
        title: "Error",
        description: data.error,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  return (
    <Container py={8}>
      <VStack spacing={4} align="stretch">
        <Heading>{isLoggingIn ? "Login" : "Sign Up"}</Heading>
        <FormControl id="email">
          <FormLabel>Email address</FormLabel>
          <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </FormControl>
        <FormControl id="password">
          <FormLabel>Password</FormLabel>
          <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </FormControl>
        <Button colorScheme="blue" onClick={() => handleAuth(isLoggingIn)}>
          {isLoggingIn ? "Login" : "Sign Up"}
        </Button>
        <Box textAlign="center">
          <Button variant="link" onClick={() => setIsLoggingIn(!isLoggingIn)}>
            {isLoggingIn ? "Need an account? Sign up" : "Already have an account? Login"}
          </Button>
        </Box>
      </VStack>
    </Container>
  );
};

export default Index;
