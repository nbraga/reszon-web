import {
  Box,
  Button,
  Flex,
  Heading,
  Stack,
  useMediaQuery,
} from "@chakra-ui/react";
import { InferGetServerSidePropsType, NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import { PrimaryButton } from "../../../components/buttons/PrimaryButton";
import { InputSearch } from "../../../components/inputs/InputSearch";
import { Loading } from "../../../components/Loading";
import { LayoutAdmin } from "../../../layout/admin";
import { withAuth } from "../../../HOC/auth";
import { AiOutlineCheck, AiOutlineCloseCircle } from "react-icons/ai";
import { TableExtensions } from "../../../components/tables/TableExtensions";

const Stamps: NextPage = ({
  token,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isBreakPoint] = useMediaQuery("(max-width: 750px)");
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
              <Stack direction={"row"} justifyContent={"space-between"}>
                <Stack direction={"row"}>
                  <Button
                    rightIcon={<AiOutlineCheck />}
                    colorScheme="green"
                    variant="outline"
                  >
                    Validar selo
                  </Button>
                  <Button
                    rightIcon={<AiOutlineCloseCircle />}
                    colorScheme="red"
                    variant="outline"
                  >
                    Cancelar selo
                  </Button>
                </Stack>

                <PrimaryButton w={"fit-content"}>Criar novo selo</PrimaryButton>
              </Stack>

              <Box>
                <TableExtensions isBreakPoint={isBreakPoint} />
              </Box>
            </Stack>
          </Box>
        </LayoutAdmin>
      )}
    </>
  );
};

export default Stamps;

export const getServerSideProps = withAuth(async (context: any) => {
  const token = context.req.cookies["@reszon.token"];

  return {
    props: {
      token,
    },
  };
});
