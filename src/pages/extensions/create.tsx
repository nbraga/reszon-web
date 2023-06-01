import {
  Box,
  Divider,
  Flex,
  Grid,
  GridItem,
  Heading,
  Stack,
  useMediaQuery,
  Text,
  FormControl,
  FormErrorMessage,
} from "@chakra-ui/react";
import { InferGetServerSidePropsType, NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { withAuth } from "../../HOC/auth";
import { Loading } from "../../components/Loading";
import { LayoutAdmin } from "../../layout/admin";

import * as yup from "yup";
import { InferType } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm, useWatch } from "react-hook-form";
import {
  AiOutlineFieldNumber,
  AiOutlineLink,
  AiOutlineMail,
} from "react-icons/ai";
import {
  MdTitle,
  MdOutlineDescription,
  MdLocationCity,
  MdOutlineFormatListNumbered,
  MdOutlineLocationOn,
} from "react-icons/md";
import { LinkButton } from "../../components/buttons/LinkButton";
import { PrimaryButton } from "../../components/buttons/PrimaryButton";
import { InputDefault } from "../../components/inputs/InputDefault";
import { InputFile } from "../../components/inputs/InputFIle";
import { InputFilePreview } from "../../components/inputs/InputFilePreview";
import { searchCEP } from "../../utils/utilsCep";
import { BsPinMap } from "react-icons/bs";
import { FaCity } from "react-icons/fa";
import { RiRoadMapLine } from "react-icons/ri";
import { InputCep } from "../../components/inputs/mask/InputCep";
import { InputPhone } from "../../components/inputs/mask/InputPhone";
import { TbPhone } from "react-icons/tb";
import { DatePicker } from "../../components/inputs/InputDatePicker";
import { toast } from "react-toastify";
import { api, configHeaders } from "../../services/api";

const extensionFormSchema = yup.object({
  titulo: yup.string().required("Título obrigatório"),
  email: yup.string().required("Email obrigatório"),
  contato: yup.string().required("Contato obrigatório"),
  site: yup.string().required("Site obrigatório"),
  data_inicio: yup.date().required("Data início obrigatório"),
  data_fim: yup.date().required("Data fim obrigatório"),
  img_selo: yup.mixed().required("Selo obrigatório"),
  img_principal: yup.mixed().required("Imagem principal obrigatório"),
  termos: yup.mixed().required("Termos obrigatório"),
  cep: yup.string().required("Cep obrigatório"),
  numero: yup.string().required("Número obrigatório"),
  endereco: yup.string().required("Endereço obrigatório"),
  bairro: yup.string().required("Bairro obrigatório"),
  cidade: yup.string().required("Cidade obrigatório"),
  estado: yup.string().required("Estado obrigatório"),
  complemento: yup.string(),
});

type ExtensionSchemaProps = InferType<typeof extensionFormSchema>;

const ExtensionsCreate: NextPage = ({
  token,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter();
  const [isBreakPoint] = useMediaQuery("(max-width: 750px)");
  const [previewWeb, setPreviewWeb] = useState("");
  const [previewMobile, setPreviewMobile] = useState("");

  const { register, handleSubmit, formState, setValue, control, clearErrors } =
    useForm<ExtensionSchemaProps>({
      resolver: yupResolver(extensionFormSchema),
    });

  const onSubmit = async (values: ExtensionSchemaProps) => {
    try {
      const formData = new FormData();
      formData.append("url_imagem", values.img_principal);
      formData.append("url_selo", values.img_selo);
      formData.append("url_termos", values.termos);
      formData.append("extension", JSON.stringify(values));

      const response = await api.post(
        "/extensions",
        formData,
        configHeaders(token, "multipart/form-data")
      );

      toast.success(response.data.message);
      router.back();
    } catch (error) {
      toast.error("Erro interno no servidor, tente novamente mais tarde!");
    }
  };

  const cep = useWatch({
    control,
    name: "cep",
  });

  async function getCep() {
    const location = await searchCEP(cep);
    if (location.data) {
      setValue("estado", location.data.uf);
      setValue("cidade", location.data.localidade);
      setValue("bairro", location.data.bairro);
      setValue("endereco", location.data.logradouro);
      clearErrors(["bairro", "estado", "cidade", "endereco"]);
    }
  }

  useEffect(() => {
    if (cep && cep.length === 9) {
      getCep();
    }
  }, [cep]);

  return (
    <LayoutAdmin>
      <Head>
        <title>RESZON - Criar extensão</title>
      </Head>

      <Box w={"full"} minHeight={"fit-content"} gap={20}>
        <Heading>Criar extensão</Heading>

        <Stack bg={"white"} p={5}>
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
                    label="Adicionar imagem principal"
                    setFilePerRef={setValue}
                    previewFile={previewWeb}
                    setPreviewFile={setPreviewWeb}
                    currentImage="http://via.placeholder.com/1200x628"
                    nameInput="img_principal"
                    {...register("img_principal")}
                    //@ts-ignore
                    error={formState.errors.img_principal}
                  />
                  <InputFilePreview
                    label="Adicionar selo"
                    setFilePerRef={setValue}
                    previewFile={previewMobile}
                    setPreviewFile={setPreviewMobile}
                    currentImage="https://via.placeholder.com/600x750"
                    nameInput="img_selo"
                    {...register("img_selo")}
                    //@ts-ignore
                    error={formState.errors.img_selo}
                  />
                </Stack>
              </GridItem>
              <GridItem>
                <InputDefault
                  label="Título do perfil"
                  icon={MdTitle}
                  nameInput="titulo"
                  error={formState.errors.titulo}
                  {...register("titulo")}
                />
              </GridItem>
              <GridItem>
                <InputDefault
                  label="Email"
                  icon={AiOutlineMail}
                  nameInput="email"
                  error={formState.errors.email}
                  {...register("email")}
                />
              </GridItem>
              <GridItem>
                <InputPhone
                  label="Contato"
                  icon={TbPhone}
                  nameInput="contato"
                  error={formState.errors.contato}
                  {...register("contato")}
                />
              </GridItem>
              <GridItem>
                <InputDefault
                  label="Site"
                  icon={AiOutlineLink}
                  nameInput="site"
                  error={formState.errors.site}
                  {...register("site")}
                />
              </GridItem>
              <GridItem>
                <Controller
                  name="data_inicio"
                  control={control}
                  render={({ field }) => {
                    return (
                      <DatePicker
                        title="Data início"
                        selectedDate={field.value}
                        onChange={(date) => field.onChange(date)}
                      />
                    );
                  }}
                />
              </GridItem>
              <GridItem>
                <FormControl>
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
                  <FormErrorMessage></FormErrorMessage>
                </FormControl>
              </GridItem>
              <GridItem>
                <InputFile
                  label="Selecione o arquivo com os termos e serviços"
                  setFilePerRef={setValue}
                  nameInput="termos"
                  error={formState.errors.termos}
                  {...register("termos")}
                />
              </GridItem>
            </Grid>

            <Divider />
            <Text as={"b"} color={"black.100"}>
              Endereço:
            </Text>
            <Grid
              templateColumns={
                isBreakPoint ? "repeat(1, 1fr)" : "repeat(4, 1fr)"
              }
              gap={5}
            >
              <GridItem>
                <InputCep
                  label="CEP"
                  nameInput="cep"
                  icon={RiRoadMapLine}
                  error={formState.errors.cep}
                  {...register("cep")}
                />
              </GridItem>

              <GridItem>
                <InputDefault
                  label="Estado"
                  icon={MdLocationCity}
                  nameInput="estado"
                  error={formState.errors.estado}
                  {...register("estado")}
                />
              </GridItem>
              <GridItem>
                <InputDefault
                  label="Cidade"
                  icon={FaCity}
                  nameInput="cidade"
                  error={formState.errors.cidade}
                  {...register("cidade")}
                />
              </GridItem>
              <GridItem>
                <InputDefault
                  label="Bairro"
                  icon={BsPinMap}
                  nameInput="bairro"
                  error={formState.errors.bairro}
                  {...register("bairro")}
                />
              </GridItem>
              <GridItem colSpan={isBreakPoint ? 1 : 2}>
                <InputDefault
                  label="Endereço"
                  icon={MdOutlineLocationOn}
                  nameInput="endereco"
                  error={formState.errors.endereco}
                  {...register("endereco")}
                />
              </GridItem>
              <GridItem>
                <InputDefault
                  label="Número"
                  icon={AiOutlineFieldNumber}
                  nameInput="numero"
                  error={formState.errors.numero}
                  {...register("numero")}
                />
              </GridItem>
              <GridItem>
                <InputDefault
                  label="Complemento"
                  icon={MdOutlineFormatListNumbered}
                  nameInput="complemento"
                  error={formState.errors.complemento}
                  {...register("complemento")}
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
                isLoading={formState.isSubmitting}
                type="submit"
                w={isBreakPoint ? "full" : "xs"}
              >
                Salvar
              </PrimaryButton>
            </Flex>
          </Stack>
        </Stack>
      </Box>
    </LayoutAdmin>
  );
};

export default ExtensionsCreate;

export const getServerSideProps = withAuth(async (context: any) => {
  const token = context.req.cookies["@reszon.token"];

  return {
    props: {
      token,
    },
  };
});
