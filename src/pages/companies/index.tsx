import {
  Box,
  Center,
  Flex,
  Heading,
  Stack,
  useDisclosure,
  useMediaQuery,
} from "@chakra-ui/react";
import { InferGetServerSidePropsType, NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { AiFillPrinter } from "react-icons/ai";
import { MdOutlineAddCircle } from "react-icons/md";
import { toast } from "react-toastify";
import { withAuth } from "../../HOC/auth";

import { Loading } from "../../components/Loading";
import { GhostButton } from "../../components/buttons/GhostButton";
import { PrimaryButton } from "../../components/buttons/PrimaryButton";
import { InputSearch } from "../../components/inputs/InputSearch";
import { Pagination } from "../../components/pagination";
import { TableCompanies } from "../../components/tables/TableCompanies";
import { TableCompaniesResponsive } from "../../components/tables/TableCompaniesResponsive";
import { ModalDelete } from "../../components/modal/ModalDelete";

import { CompanyProps } from "../../interfaces/companyProps";
import { LayoutAdmin } from "../../layout/admin";
import { api, configHeaders } from "../../services/api";
import { MESSAGE } from "../../utils/utilsMessages";

const Companies: NextPage = ({
  token,
  listCompanies,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const {
    isOpen: isOpenModalDelete,
    onOpen: onOpenModalDelete,
    onClose: onCloseModalDelete,
  } = useDisclosure();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [isBreakPoint] = useMediaQuery("(max-width: 850px)");

  const [dataCompanies, setDataCompanies] =
    useState<CompanyProps[]>(listCompanies);

  const [currentPage, setCurrentPage] = useState(1);
  const [qtdPages, setQtdPages] = useState(0);
  const [qtdRows, setQtdRows] = useState(10);

  const [idDelete, setIdDelete] = useState("");

  const onModalDelete = (id: string) => {
    onOpenModalDelete();
    setIdDelete(id);
  };

  const onDeleteCompany = async () => {
    try {
      await api.delete(`/companies/${idDelete}`, configHeaders(token));

      toast.success(MESSAGE.DELETE_ITEM);
      onCloseModalDelete();
      getData();
    } catch (error) {
      console.log(error);
    }
  };

  const getData = useCallback(async () => {
    try {
      const response = await api.get("/companies", {
        params: { idCompany: "" },
        ...configHeaders(token),
      });

      setDataCompanies(response.data);
    } catch (error) {
      toast.error("Erro ao listar!");
    } finally {
      setLoading(false);
    }
  }, [currentPage]);

  useEffect(() => {
    getData();
  }, [currentPage]);

  useEffect(() => {
    const pagesTotal = Math.ceil(dataCompanies.length / qtdRows);
    setQtdPages(pagesTotal);
    setLoading(false);
  }, [currentPage, dataCompanies]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <LayoutAdmin>
          <Head>
            <title>RESZON - Empresas</title>
          </Head>

          <Box w={"full"} minHeight={"fit-content"} gap={20}>
            <Heading>Empresas</Heading>

            <Flex
              direction={isBreakPoint ? "column" : "row"}
              justifyContent={"space-between"}
              alignItems={"center"}
              my={5}
              gap={5}
            >
              <Box w={isBreakPoint ? "xs" : "md"}>
                <InputSearch label="Pesquisar" nameInput="search" />
              </Box>
              <Stack>
                {/*    <GhostButton leftIcon={<AiFillPrinter />} w={"xs"}>
                  Imprimir QRCODE
                </GhostButton> */}
                <PrimaryButton
                  leftIcon={<MdOutlineAddCircle />}
                  w={"xs"}
                  onClick={() => router.push("companies/create")}
                >
                  Nova Empresa
                </PrimaryButton>
              </Stack>
            </Flex>

            <Stack
              bgColor={isBreakPoint ? "none" : "white.100"}
              p={5}
              w={"full"}
            >
              {isBreakPoint ? (
                <TableCompaniesResponsive
                  currentPage={currentPage}
                  dataTable={dataCompanies}
                  qtdRows={qtdRows}
                  onModalDelete={onModalDelete}
                />
              ) : (
                <TableCompanies
                  currentPage={currentPage}
                  dataTable={dataCompanies}
                  qtdRows={qtdRows}
                  onModalDelete={onModalDelete}
                />
              )}
            </Stack>
            <Center>
              <Pagination
                qtdPages={qtdPages}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
              />
            </Center>
          </Box>
          <ModalDelete
            description="Se você excluir não será possível recuperar os dados!"
            onPrimaryButton={onDeleteCompany}
            isBreakPoint={isBreakPoint}
            isOpen={isOpenModalDelete}
            onClose={onCloseModalDelete}
          />
        </LayoutAdmin>
      )}
    </>
  );
};

export default Companies;

export const getServerSideProps = withAuth(async (context: any) => {
  const token = context.req.cookies["@reszon.token"];
  let listCompanies = [];

  try {
    const response = await api.get("/companies", {
      params: { idCompany: "" },
      ...configHeaders(token),
    });

    listCompanies = response.data;
  } catch (error) {
    console.log(
      "🚀 ~ file: index.tsx:191 ~ getServerSideProps ~ error:",
      error
    );
  }

  return {
    props: {
      token,
      listCompanies,
    },
  };
});
