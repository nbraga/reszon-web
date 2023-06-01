import { Box, Flex, Heading, Stack, useMediaQuery } from "@chakra-ui/react";
import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import { PrimaryButton } from "../../components/buttons/PrimaryButton";
import { InputSearch } from "../../components/inputs/InputSearch";
import { Loading } from "../../components/Loading";
import { LayoutAdmin } from "../../layout/admin";
import { withAuth } from "../../HOC/auth";

const Nfts: NextPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isMobile] = useMediaQuery("(max-width: 750px)");
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <LayoutAdmin>
          <Head>
            <title>RESZON - NFTs</title>
          </Head>

          <Box w={"full"} minHeight={"fit-content"} gap={20}>
            <Heading>NFTs</Heading>

            <Flex
              direction={isMobile ? "column" : "row"}
              justifyContent={"space-between"}
              my={5}
              gap={5}
            >
              <PrimaryButton
                w={"xs"}
                onClick={() => router.push("nfts/create")}
              >
                Adicionar
              </PrimaryButton>
              <Box w={isMobile ? "xs" : "md"}>
                <InputSearch label="Pesquisar" nameInput="search" />
              </Box>
            </Flex>

            <Stack bgColor={"white.100"} p={5} w={"full"}></Stack>
          </Box>
        </LayoutAdmin>
      )}
    </>
  );
};

export default Nfts;

export const getServerSideProps = withAuth(async (context: any) => {
  const token = context.req.cookies["@reszon.token"];

  return {
    props: {
      token,
    },
  };
});
