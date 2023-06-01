import {
  Box,
  Flex,
  Grid,
  GridItem,
  Heading,
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
import { EventProps, GetEventProps } from "../../interfaces/eventProps";
import { LayoutAdmin } from "../../layout/admin";
import { api, configHeaders } from "../../services/api";
import { CardEvent } from "../../components/card/CardEvent";

const Events: NextPage = ({
  token,
  listEvents,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter();

  const [isBreakPoint] = useMediaQuery("(max-width: 850px)");
  const [loading, setLoading] = useState(true);

  const [events, setEvents] = useState<GetEventProps[]>(listEvents);

  const handleChangeDeleteEvent = async (id: string) => {
    try {
      const response = await api.delete(`/events/${id}`, configHeaders(token));
      toast.success("Evento excluído com sucesso!");
      getData();
    } catch (error) {
      toast.error("Ocorreu um erro no servidor!");
    }
  };

  const handleChangeStatus = async (id: string, status: boolean) => {
    try {
      if (status) {
        await api.put(`/events/active-status/${id}`, {}, configHeaders(token));
      } else {
        await api.put(`/events/disable-status/${id}`, {}, configHeaders(token));
      }
      toast.success("Status atualizado com sucesso!");
      getData();
    } catch (error) {
      toast.error("Erro ao atualizar status!");
      console.error(error);
    }
  };

  const getData = useCallback(async () => {
    try {
      const response = await api.get("/events", {
        params: {
          id: "",
        },
        ...configHeaders(token),
      });

      setEvents(response.data);
    } catch (error) {
      toast.error("Ocorreu um erro ao buscar os usúarios!");
    } finally {
      setLoading(false);
    }
  }, [events]);

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <LayoutAdmin>
          <Head>
            <title>RESZON - Eventos</title>
          </Head>

          <Box w={"full"} minHeight={"fit-content"} gap={20}>
            <Heading>Eventos</Heading>

            <Flex
              direction={isBreakPoint ? "column" : "row"}
              justifyContent={"space-between"}
              my={5}
              gap={5}
            >
              <PrimaryButton
                w={"xs"}
                onClick={() => router.push("events/create")}
              >
                Adicionar
              </PrimaryButton>
              <Box w={isBreakPoint ? "xs" : "md"}>
                <InputSearch label="Pesquisar" nameInput="search" />
              </Box>
            </Flex>

            <Grid
              templateColumns={
                isBreakPoint ? "repeat(1, 1fr)" : "repeat(3, 1fr)"
              }
              gap={5}
              bgColor={"white.100"}
              p={5}
            >
              {events.map((item) => (
                <GridItem key={item.id}>
                  <CardEvent
                    item={item}
                    handleChangeDeleteEvent={handleChangeDeleteEvent}
                    handleChangeStatus={handleChangeStatus}
                  />
                </GridItem>
              ))}
            </Grid>
          </Box>
        </LayoutAdmin>
      )}
    </>
  );
};

export default Events;

export const getServerSideProps = withAuth(async (context: any) => {
  const token = context.req.cookies["@reszon.token"];

  const response = await api.get("/events", {
    params: {
      id: "",
    },
    ...configHeaders(token),
  });

  return {
    props: {
      token,
      listEvents: response.data,
    },
  };
});
