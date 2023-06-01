import Head from "next/head";
import { Box, Flex, Heading, Text, useMediaQuery } from "@chakra-ui/react";
import { InferGetServerSidePropsType, NextPage } from "next";
import { useRouter } from "next/router";
import { withAuth } from "../../../HOC/auth";
import { LayoutAdmin } from "../../../layout/admin";

const DashboardPromoter: NextPage = ({
  token,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter();
  const [isBreakPoint] = useMediaQuery("(max-width: 850px)");

  return (
    <LayoutAdmin>
      <Head>
        <title>RESZON - Dashboard Promotor</title>
      </Head>

      <Box w={"full"} minHeight={"fit-content"} gap={20}>
        <Heading>Dashboard Promotor</Heading>

        <Flex
          direction={isBreakPoint ? "column" : "row"}
          justifyContent={"space-between"}
          alignItems={"center"}
          my={5}
          gap={5}
        >
          <Text></Text>
        </Flex>
      </Box>
    </LayoutAdmin>
  );
};

export default DashboardPromoter;

export const getServerSideProps = withAuth(async (context: any) => {
  const token = context.req.cookies["@reszon.token"];

  return {
    props: {
      token,
    },
  };
});
