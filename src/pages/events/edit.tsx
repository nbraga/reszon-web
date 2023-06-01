import {
  Box,
  Flex,
  Grid,
  GridItem,
  Stack,
  useMediaQuery,
} from "@chakra-ui/react";
import { InferGetServerSidePropsType, NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import { AiOutlineLink } from "react-icons/ai";
import { Loading } from "../../components/Loading";
import { LinkButton } from "../../components/buttons/LinkButton";
import { PrimaryButton } from "../../components/buttons/PrimaryButton";
import { InputDefault } from "../../components/inputs/InputDefault";
import { LayoutAdmin } from "../../layout/admin";

import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { MdOutlineDescription, MdTitle } from "react-icons/md";
import { toast } from "react-toastify";
import * as yup from "yup";
import { InferType } from "yup";
import { withAuth } from "../../HOC/auth";
import { GoBackPage } from "../../components/GoBackPage";

import { InputFile } from "../../components/inputs/InputFIle";
import { InputFilePreview } from "../../components/inputs/InputFilePreview";
import { EventProps } from "../../interfaces/eventProps";
import { api, configHeaders } from "../../services/api";
import { DatePicker } from "../../components/inputs/InputDatePicker";

const eventFormSchema = yup.object({
  titulo: yup.string().required("Título obrigatório"),
  descricao: yup.string().required("Descrição obrigatório"),
  link: yup.string().required("Link obrigatório"),
  data_inicio: yup.date().required("Data início obrigatório"),
  data_fim: yup.date().required("Data fim obrigatório"),
  img_mobile: yup.mixed(),
  img_web: yup.mixed(),
  termos: yup.mixed(),
});

type EventSchemaProps = InferType<typeof eventFormSchema>;

const EventsEdit: NextPage = ({
  token,
  dataEvent,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter();
  const { idEvent } = router.query;
  const [isBreakPoint] = useMediaQuery("(max-width: 850px)");
  const [loading, setLoading] = useState(false);
  const [previewFile, setPreviewFile] = useState("");
  const [loadingButton, setLoadingButton] = useState(false);

  const [previewWeb, setPreviewWeb] = useState("");
  const [previewMobile, setPreviewMobile] = useState("");

  const [event, setEvent] = useState<EventProps>(dataEvent);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    control,
  } = useForm<EventSchemaProps>({
    defaultValues: {
      titulo: event.titulo,
      descricao: event.descricao,
      link: event.link,
      data_inicio: event.data_inicio,
      data_fim: event.data_fim,
    },
    resolver: yupResolver(eventFormSchema),
  });

  const onSubmit = async (values: EventSchemaProps) => {
    const newValues = {
      titulo: values.titulo,
      descricao: values.descricao,
      link: values.link,
      data_inicio: values.data_inicio,
      data_fim: values.data_fim,
      url_web: event.url_web,
      url_mobile: event.url_mobile,
      url_termos: event.url_termos,
    };
    const formData = new FormData();

    formData.append("img_web", values.img_web);
    formData.append("img_mobile", values.img_mobile);
    formData.append("termos", values.termos);
    formData.append("event", JSON.stringify(newValues));

    try {
      await api.put(
        `/events/${idEvent}`,
        formData,
        configHeaders(token, "multipart/form-data")
      );

      toast.success("Atualização realizado com sucesso!");
      router.back();
    } catch (error) {
      toast.error("Ocorreu um erro no servidor!");
    }
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <LayoutAdmin>
          <Head>
            <title>RESZON - Editar Evento</title>
          </Head>
          <Box w={"full"} gap={20}>
            <GoBackPage title="Editar Evento" />

            <Stack
              onSubmit={handleSubmit(onSubmit)}
              as={"form"}
              border={"solid 1px"}
              borderColor={"gray.200"}
              borderRadius={10}
              bgColor={"white.100"}
              p={5}
              w={"full"}
              spacing={5}
            >
              <Grid
                templateColumns={
                  isBreakPoint ? "repeat(1, 1fr)" : "repeat(3, 1fr)"
                }
                gap={5}
              >
                <GridItem
                  as={Flex}
                  justifyContent={"center"}
                  alignItems={"center"}
                  colSpan={isBreakPoint ? 1 : 3}
                >
                  <Stack direction={"row"} w={isBreakPoint ? "full" : "full"}>
                    <InputFilePreview
                      label="Selecione uma imagem para WEB"
                      setFilePerRef={setValue}
                      previewFile={previewWeb}
                      setPreviewFile={setPreviewWeb}
                      currentImage={`${process.env.NEXT_PUBLIC_HOST_IMAGES}/${event.url_web}`}
                      nameInput="img_web"
                      {...register("img_web")}
                      //@ts-ignore
                      error={errors.img_web}
                    />
                    <InputFilePreview
                      label="Selecione uma imagem para MOBILE"
                      setFilePerRef={setValue}
                      previewFile={previewMobile}
                      setPreviewFile={setPreviewMobile}
                      nameInput="img_mobile"
                      currentImage={`${process.env.NEXT_PUBLIC_HOST_IMAGES}/${event.url_mobile}`}
                      {...register("img_mobile")}
                      //@ts-ignore
                      error={errors.img_mobile}
                    />
                  </Stack>
                </GridItem>
                <GridItem>
                  <InputDefault
                    label="Título"
                    icon={MdTitle}
                    nameInput="titulo"
                    error={errors.titulo}
                    {...register("titulo")}
                  />
                </GridItem>
                <GridItem>
                  <InputDefault
                    label="Descrição"
                    icon={MdOutlineDescription}
                    nameInput="descricao"
                    error={errors.descricao}
                    {...register("descricao")}
                  />
                </GridItem>
                <GridItem>
                  <InputDefault
                    label="Link"
                    icon={AiOutlineLink}
                    nameInput="link"
                    error={errors.link}
                    {...register("link")}
                  />
                </GridItem>
                <GridItem>
                  <Controller
                    name="data_inicio"
                    control={control}
                    render={({ field }) => {
                      return (
                        <DatePicker
                          title="Data fim"
                          selectedDate={field.value}
                          onChange={(date) => field.onChange(date)}
                        />
                      );
                    }}
                  />
                </GridItem>
                <GridItem>
                  <Controller
                    name="data_fim"
                    control={control}
                    render={({ field }) => {
                      return (
                        <DatePicker
                          title="Data fim"
                          selectedDate={field.value}
                          onChange={(date) => field.onChange(date)}
                        />
                      );
                    }}
                  />
                </GridItem>
                <GridItem>
                  <InputFile
                    label="Selecione o arquivo com os termos e serviços"
                    currentFile={`${process.env.NEXT_PUBLIC_HOST_IMAGES}/${event.url_termos}`}
                    setFilePerRef={setValue}
                    nameInput="termos"
                    error={errors.termos}
                    {...register("termos")}
                  />
                </GridItem>
              </Grid>

              <Flex
                flexDirection={isBreakPoint ? "column-reverse" : "row"}
                justifyContent={"flex-end"}
                gap={5}
                my={5}
              >
                <LinkButton
                  color={"red.100"}
                  w={isBreakPoint ? "full" : "xs"}
                  onClick={() => router.back()}
                >
                  Cancelar
                </LinkButton>
                <PrimaryButton
                  isLoading={isSubmitting}
                  type="submit"
                  w={isBreakPoint ? "full" : "xs"}
                >
                  Atualizar
                </PrimaryButton>
              </Flex>
            </Stack>
          </Box>
        </LayoutAdmin>
      )}
    </>
  );
};

export default EventsEdit;

export const getServerSideProps = withAuth(async (context: any) => {
  const token = context.req.cookies["@reszon.token"];
  const { idEvent } = context.query;

  const response = await api.get("/events", {
    params: {
      id: idEvent,
    },
    ...configHeaders(token),
  });

  return {
    props: {
      token,
      dataEvent: response.data,
    },
  };
});
