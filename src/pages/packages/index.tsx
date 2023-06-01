import {
  Box,
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
import { toast } from "react-toastify";
import { withAuth } from "../../HOC/auth";
import { Loading } from "../../components/Loading";
import { PrimaryButton } from "../../components/buttons/PrimaryButton";
import { InputSearch } from "../../components/inputs/InputSearch";
import { TablePackages } from "../../components/tables/TablePackages";
import { TablePackagesResponsive } from "../../components/tables/TablePackagesResponsive";

import { PackageProps } from "../../interfaces/packageProps";
import { LayoutAdmin } from "../../layout/admin";
import { api, configHeaders } from "../../services/api";
import { ModalDelete } from "../../components/modal/ModalDelete";
import { MESSAGE } from "../../utils/utilsMessages";

const Packages: NextPage = ({
  token,
  listPackages,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const {
    isOpen: isOpenModalDelete,
    onOpen: onOpenModalDelete,
    onClose: onCloseModalDelete,
  } = useDisclosure();

  const router = useRouter();

  const [isBreakPoint] = useMediaQuery("(max-width: 850px)");
  const [packages, setPackages] = useState<PackageProps[]>(listPackages);

  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [qtdPages, setQtdPages] = useState(0);
  const [qtdRows, setQtdRows] = useState(10);

  const [idDelete, setIdDelete] = useState("");

  const onModalDelete = (id: string) => {
    onOpenModalDelete();
    setIdDelete(id);
  };

  const onDeleteItemApi = async () => {
    try {
      await api.delete(`/packages/${idDelete}`, configHeaders(token));

      toast.success(MESSAGE.DELETE_ITEM);
      onCloseModalDelete();
      getData();
    } catch (error) {
      console.log(error);
    }
  };

  const updateStatusPackage = async (id: string, status: boolean) => {
    try {
      if (status) {
        await api.put(
          `/packages/active-status/${id}`,
          {},
          configHeaders(token)
        );
      } else {
        await api.put(
          `/packages/disable-status/${id}`,
          {},
          configHeaders(token)
        );
      }

      getData();
      toast.success("Atualização realizada com sucesso");
    } catch (error) {
      toast.error("Erro ao atualizar!");
      console.log(error);
    }
  };

  const getData = useCallback(async () => {
    try {
      const response = await api.get("/packages", {
        params: { id: "" },
        ...configHeaders(token),
      });

      setPackages(response.data);
    } catch (error) {
      toast.error("Ocorreu um erro ao buscar os usúarios!");
    } finally {
      setLoading(false);
    }
  }, [currentPage, packages]);

  useEffect(() => {
    getData();
  }, [currentPage]);

  useEffect(() => {
    const pagesTotal = Math.ceil(packages.length / qtdRows);
    setQtdPages(pagesTotal);
  }, [currentPage, packages]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <LayoutAdmin>
          <Head>
            <title>RESZON - Pacotes</title>
          </Head>

          <Box w={"full"} minHeight={"fit-content"} gap={20}>
            <Heading>Pacotes</Heading>

            <Flex
              direction={isBreakPoint ? "column" : "row"}
              justifyContent={"space-between"}
              my={5}
              gap={5}
            >
              <PrimaryButton
                w={"xs"}
                onClick={() => router.push("packages/create")}
              >
                Adicionar
              </PrimaryButton>
              <Box w={isBreakPoint ? "xs" : "md"}>
                <InputSearch label="Pesquisar" nameInput="search" />
              </Box>
            </Flex>

            <Stack
              bgColor={isBreakPoint ? "none" : "white.100"}
              p={5}
              w={"full"}
            >
              {isBreakPoint ? (
                <TablePackagesResponsive
                  currentPage={currentPage}
                  dataTable={packages}
                  qtdRows={qtdRows}
                  updateStatusPackage={updateStatusPackage}
                  onModalDelete={onModalDelete}
                />
              ) : (
                <TablePackages
                  currentPage={currentPage}
                  dataTable={packages}
                  qtdRows={qtdRows}
                  updateStatusPackage={updateStatusPackage}
                  onModalDelete={onModalDelete}
                />
              )}
            </Stack>
          </Box>
          <ModalDelete
            description="Se você excluir não será possível recuperar os dados!"
            onPrimaryButton={onDeleteItemApi}
            isBreakPoint={isBreakPoint}
            isOpen={isOpenModalDelete}
            onClose={onCloseModalDelete}
          />
        </LayoutAdmin>
      )}
    </>
  );
};

export default Packages;

export const getServerSideProps = withAuth(async (context: any) => {
  const token = context.req.cookies["@reszon.token"];
  let responsePackages;

  try {
    const response = await api.get("/packages", {
      params: { id: "" },
      ...configHeaders(token),
    });
    responsePackages = response.data;
  } catch (error) {
    console.error(
      "🚀 ~ file: index.tsx:156 ~ getServerSideProps ~ error:",
      error
    );
  }

  return {
    props: {
      token,
      listPackages: responsePackages,
    },
  };
});
