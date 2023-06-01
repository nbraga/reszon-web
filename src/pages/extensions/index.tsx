import {
  Box,
  Flex,
  Grid,
  GridItem,
  Heading,
  Stack,
  useMediaQuery,
} from "@chakra-ui/react";
import { InferGetServerSidePropsType, NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import { withAuth } from "../../HOC/auth";
import { Loading } from "../../components/Loading";
import { PrimaryButton } from "../../components/buttons/PrimaryButton";
import { CardExtensions } from "../../components/card/CardExtensions";
import { LayoutAdmin } from "../../layout/admin";
import { api, configHeaders } from "../../services/api";
import { ExtensionProps } from "../../interfaces/extensionProps";
import { toast } from "react-toastify";

const Extensions: NextPage = ({
  token,
  dataExtensions,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter();
  const [isBreakPoint] = useMediaQuery("(max-width: 750px)");
  const [loading, setLoading] = useState(false);
  const [extensions, setExtensions] =
    useState<ExtensionProps[]>(dataExtensions);

  const onRemoveExtension = async (id: string) => {
    try {
      const response = await api.delete(
        `/extensions/${id}`,
        configHeaders(token)
      );

      setExtensions(response.data.result);

      toast.success(response.data.message);
    } catch (error) {
      toast.error("Erro interno no servidor, tente novamente mais tarde!");
    }
  };
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <LayoutAdmin>
          <Head>
            <title>RESZON - Extensões</title>
          </Head>

          <Box w={"full"} minHeight={"fit-content"} gap={20}>
            <Heading>Extensões</Heading>

            <Stack bg={"white"} p={5}>
              <Flex justifyContent={"flex-end"}>
                <PrimaryButton
                  w={"fit-content"}
                  onClick={() => router.push("/extensions/create")}
                >
                  Criar nova extensão
                </PrimaryButton>
              </Flex>

              <Grid templateColumns="repeat(3, 1fr)" gap={5}>
                {extensions.map((item) => (
                  <GridItem key={item.id}>
                    <CardExtensions
                      onRemoveExtension={onRemoveExtension}
                      extension={item}
                    />
                  </GridItem>
                ))}
              </Grid>
            </Stack>
          </Box>
        </LayoutAdmin>
      )}
    </>
  );
};

export default Extensions;

export const getServerSideProps = withAuth(async (context: any) => {
  const token = context.req.cookies["@reszon.token"];

  const response = await api.get("/extensions", configHeaders(token));

  return {
    props: {
      token,
      dataExtensions: response.data ?? [],
    },
  };
});
