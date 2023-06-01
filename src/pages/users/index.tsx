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
import { useCallback, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { withAuth } from "../../HOC/auth";
import { Loading } from "../../components/Loading";
import { PrimaryButton } from "../../components/buttons/PrimaryButton";
import { InputSearch } from "../../components/inputs/InputSearch";
import { Pagination } from "../../components/pagination";
import { TableUsers } from "../../components/tables/TableUsers";
import { TableUsersResponsive } from "../../components/tables/TableUsersResponsive";
import { ModalDelete } from "../../components/modal/ModalDelete";
import { UserProps } from "../../interfaces/userProps";
import { LayoutAdmin } from "../../layout/admin";
import { api, configHeaders } from "../../services/api";
import { MESSAGE } from "../../utils/utilsMessages";
import { AuthContext } from "../../contexts/AuthContext";

const Users: NextPage = ({
  token,
  listUsers,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const {
    isOpen: isOpenModalDelete,
    onOpen: onOpenModalDelete,
    onClose: onCloseModalDelete,
  } = useDisclosure();
  const { user } = useContext(AuthContext);
  const router = useRouter();
  const [isBreakPoint] = useMediaQuery("(max-width: 850px)");

  const [users, setUsers] = useState<UserProps[]>(listUsers);
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
      await api.delete(`/users/${idDelete}`, configHeaders(token));

      toast.success(MESSAGE.DELETE_ITEM);
      onCloseModalDelete();
      getData();
    } catch (error) {
      console.log(error);
    }
  };

  const getData = useCallback(async () => {
    try {
      const response = await api.get("/users", {
        params: { id: "" },
        ...configHeaders(token),
      });

      setUsers(response.data);
    } catch (error) {
      toast.error("Ocorreu um erro ao listar!");
    } finally {
      setLoading(false);
    }
  }, [currentPage]);

  useEffect(() => {
    getData();
  }, [currentPage]);

  useEffect(() => {
    const pagesTotal = Math.ceil(users.length / qtdRows);
    setQtdPages(pagesTotal);
  }, [currentPage, users]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <LayoutAdmin>
          <Head>
            <title>RESZON - Usuários</title>
          </Head>

          <Box w={"full"} minHeight={"fit-content"} gap={20}>
            <Heading>Usuários</Heading>

            <Flex
              direction={isBreakPoint ? "column" : "row"}
              justifyContent={"space-between"}
              my={5}
              gap={5}
            >
              <PrimaryButton
                w={"xs"}
                onClick={() => router.push("users/create")}
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
                <TableUsersResponsive
                  currentPage={currentPage}
                  dataTable={users}
                  qtdRows={qtdRows}
                  onModalDelete={onModalDelete}
                />
              ) : (
                <TableUsers
                  currentPage={currentPage}
                  dataTable={users}
                  qtdRows={qtdRows}
                  onModalDelete={onModalDelete}
                  typeUser={user.perfil}
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

export default Users;

export const getServerSideProps = withAuth(async (context: any) => {
  const token = context.req.cookies["@reszon.token"];
  let users;

  try {
    const response = await api.get("/users", {
      params: { id: "" },
      ...configHeaders(token),
    });
    users = response.data;
  } catch (error) {
    console.log(
      "🚀 ~ file: index.tsx:171 ~ getServerSideProps ~ error:",
      error
    );
  }

  return {
    props: {
      token,
      listUsers: users,
    },
  };
});
