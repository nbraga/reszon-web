import { Box, Flex, Heading, Stack, useMediaQuery } from "@chakra-ui/react";

import { InferGetServerSidePropsType, NextPage } from "next";
import Head from "next/head";

import { useEffect, useState } from "react";
import { InputSearch } from "../../components/inputs/InputSearch";
import { Loading } from "../../components/Loading";
import { Pagination } from "../../components/pagination";
import { TablePayments } from "../../components/tables/TablePayments";
import { TablePaymentsResponsive } from "../../components/tables/TablePaymentsResponsive";
import { withAuth } from "../../HOC/auth";
import { ResponsePaymentsProps } from "../../interfaces/paymentsProps";
import { LayoutAdmin } from "../../layout/admin";
import { api, configHeaders } from "../../services/api";

const Payments: NextPage = ({
  token,
  listPayments,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [payments, setPayments] =
    useState<ResponsePaymentsProps[]>(listPayments);

  const [loading, setLoading] = useState(false);
  const [isBreakPoint] = useMediaQuery("(max-width: 850px)");

  const [currentPage, setCurrentPage] = useState(1);
  const [qtdPages, setQtdPages] = useState(0);
  const [qtdRows, setQtdRows] = useState(10);

  useEffect(() => {
    const pagesTotal = Math.ceil(payments.length / qtdRows);

    setQtdPages(pagesTotal);
    setLoading(false);
  }, [currentPage]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <LayoutAdmin>
          <Head>
            <title>RESZON - Pagamentos</title>
          </Head>

          <Box
            flexDirection={"column"}
            w={"full"}
            minHeight={isBreakPoint ? "100vh" : "fit-content"}
            gap="20px"
          >
            <Heading my={5}>Pagamentos</Heading>

            <Flex
              w={isBreakPoint ? "xs" : "md"}
              justifyContent={"flex-end"}
              my={5}
            >
              <InputSearch label="Pesquisar" nameInput="search" />
            </Flex>

            <Stack
              bgColor={isBreakPoint ? "none" : "white.100"}
              p={isBreakPoint ? 0 : 5}
              w={"full"}
            >
              {isBreakPoint ? (
                <TablePaymentsResponsive
                  currentPage={currentPage}
                  qtdRows={qtdRows}
                  dataTable={payments}
                />
              ) : (
                <TablePayments
                  currentPage={currentPage}
                  qtdRows={qtdRows}
                  dataTable={payments}
                />
              )}
            </Stack>
            <Flex justifyContent={"center"}>
              <Pagination
                qtdPages={qtdPages}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
              />
            </Flex>
          </Box>
        </LayoutAdmin>
      )}
    </>
  );
};

export default Payments;

export const getServerSideProps = withAuth(async (context: any) => {
  const token = context.req.cookies["@reszon.token"];
  let listPayments = [];

  try {
    const response = await api.get("/payments", configHeaders(token));

    listPayments = response.data;
  } catch (error) {
    console.log(
      "🚀 ~ file: index.tsx:106 ~ getServerSideProps ~ error:",
      error
    );
  }

  return {
    props: {
      token,
      listPayments,
    },
  };
});
