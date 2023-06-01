import {
  Box,
  Flex,
  Stack,
  Image,
  Heading,
  Center,
  Container,
} from "@chakra-ui/react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import Head from "next/head";
import { PrimaryButton } from "../components/buttons/PrimaryButton";

const NotFound: NextPage = () => {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>RESZON - 404</title>
      </Head>

      <Box
        display={"flex"}
        flexDirection={"column"}
        w={"full"}
        h={"100vh"}
        bgImage={"/images/wave/waves-not-found.svg"}
        bgPosition={"right bottom"}
        bgRepeat={"no-repeat"}
        bgColor={"white.200"}
      >
        <Flex
          justifyContent={"center"}
          alignItems="center"
          w={"full"}
          bgColor={"black.100"}
          h={100}
        >
          <Image boxSize="150px" src="/images/logo/logo-main.svg" alt="logo" />
        </Flex>

        <Container
          mt={5}
          maxW={"container.md"}
          bgColor={"white"}
          borderRadius={"2xl"}
          p={10}
        >
          <Center as={Stack}>
            <Heading fontSize={"2rem"}>
              Oops, a página não foi encontrada!
            </Heading>
            <Image
              objectFit="contain"
              src="/images/img-not-found.svg"
              alt="not-found"
            />
            <PrimaryButton w={"xs"} onClick={() => router.back()}>
              Retornar
            </PrimaryButton>
          </Center>
        </Container>
      </Box>
    </>
  );
};

export default NotFound;
