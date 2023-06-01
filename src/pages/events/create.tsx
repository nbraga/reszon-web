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
import { LinkButton } from "../../components/buttons/LinkButton";
import { PrimaryButton } from "../../components/buttons/PrimaryButton";
import { InputDefault } from "../../components/inputs/InputDefault";
import { Loading } from "../../components/Loading";
import { LayoutAdmin } from "../../layout/admin";

import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { MdOutlineDescription, MdTitle } from "react-icons/md";
import { toast } from "react-toastify";
import * as yup from "yup";
import { GoBackPage } from "../../components/GoBackPage";
import { InputFile } from "../../components/inputs/InputFIle";
import { InputFilePreview } from "../../components/inputs/InputFilePreview";
import { withAuth } from "../../HOC/auth";
import { CreateEventProps } from "../../interfaces/eventProps";
import { api, configHeaders } from "../../services/api";
import { InferType } from "yup";
import { DatePicker } from "../../components/inputs/InputDatePicker";

const eventFormSchema = yup.object({
  titulo: yup.string().required("Título obrigatório"),
  descricao: yup.string().required("Descrição obrigatório"),
  link: yup.string().required("Link obrigatório"),
  data_inicio: yup.date().required("Data início obrigatório"),
  data_fim: yup.date().required("Data fim obrigatório"),
  img_mobile: yup.mixed().required("Imagem Mobile obrigatório"),
  img_web: yup.mixed().required("Imagem WEB obrigatório"),
  termos: yup.mixed().required("Termos obrigatório"),
});

type EventSchemaProps = InferType<typeof eventFormSchema>;

const EventsCreate: NextPage = ({
  token,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter();
  const [isBreakPoint] = useMediaQuery("(max-width: 750px)");
  const [loading, setLoading] = useState(false);

  const [previewWeb, setPreviewWeb] = useState("");
  const [previewMobile, setPreviewMobile] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    control,
  } = useForm<EventSchemaProps>({
    resolver: yupResolver(eventFormSchema),
  });

  const onSubmit = async (values: EventSchemaProps) => {
    const formData = new FormData();
    formData.append("img_web", values.img_web);
    formData.append("img_mobile", values.img_mobile);
    formData.append("termos", values.termos);
    formData.append("event", JSON.stringify(values));

    try {
      await api.post(
        "/events",
        formData,
        configHeaders(token, "multipart/form-data")
      );

      toast.success("Cadastro realizado com sucesso!");
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
            <title>RESZON - Criar Evento</title>
          </Head>
          <Box w={"full"} gap={20}>
            <GoBackPage title="Criar Evento" />

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
                      currentImage="http://via.placeholder.com/1200x628"
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
                      currentImage="https://via.placeholder.com/600x750"
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
                  Salvar
                </PrimaryButton>
              </Flex>
            </Stack>
          </Box>
        </LayoutAdmin>
      )}
    </>
  );
};

export default EventsCreate;

export const getServerSideProps = withAuth(async (context: any) => {
  const token = context.req.cookies["@reszon.token"];

  return {
    props: {
      token,
    },
  };
});
