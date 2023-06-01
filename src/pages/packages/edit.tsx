import {
  Box,
  Divider,
  Flex,
  FormControl,
  FormErrorMessage,
  Grid,
  GridItem,
  Select,
  Stack,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";
import { InferGetServerSidePropsType, NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import { AiOutlineLink, AiOutlineMail, AiOutlineNumber } from "react-icons/ai";
import { LinkButton } from "../../components/buttons/LinkButton";
import { PrimaryButton } from "../../components/buttons/PrimaryButton";
import { InputDefault } from "../../components/inputs/InputDefault";
import { Loading } from "../../components/Loading";
import { LayoutAdmin } from "../../layout/admin";

import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as yup from "yup";
import { GoBackPage } from "../../components/GoBackPage";
import { InputPrice } from "../../components/inputs/InputPrice";

import {
  MdTitle,
  MdOutlineDescription,
  MdOutlinePriceChange,
} from "react-icons/md";
import { InputFile } from "../../components/inputs/InputFIle";
import { InferType } from "yup";
import { withAuth } from "../../HOC/auth";
import { api, configHeaders } from "../../services/api";
import { PackageProps } from "../../interfaces/packageProps";

const packageFormSchema = yup.object({
  titulo: yup.string().required("Título obrigatório"),
  descricao: yup.string().required("Descrição obrigatório"),
  url_pagamento: yup.string().required("URL de pagamento obrigatório"),
  valor_pacote: yup.number().required("Valor do pacote obrigatório"),
  periodo: yup.string().required("Período obrigatório"),
  contrato: yup.mixed(),
  valor_panfleto: yup.number().required("Valor de panfleto obrigatório"),
  numero_panfleto: yup.number().required("Número de panfleto obrigatório"),
  limite_panfleto: yup.number().required("Limite de panfletos obrigatório"),
  limite_cupons: yup.number().required("Limite de cupons obrigatório"),
  limite_hotpromos: yup.number().required("Limite de hot promos obrigatório"),
});

type PackageSchema = InferType<typeof packageFormSchema>;

const PackagesEdit: NextPage = ({
  token,
  objectPackage,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter();
  const { idPackage } = router.query;
  const [isMobile] = useMediaQuery("(max-width: 750px)");
  const [loading, setLoading] = useState(false);
  const [dataPackage, setDataPackage] = useState<PackageProps>(objectPackage);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm<PackageSchema>({
    defaultValues: {
      titulo: dataPackage.titulo,
      descricao: dataPackage.descricao,
      url_pagamento: dataPackage.url_pagamento,
      valor_pacote: dataPackage.valor_pacote,
      periodo: dataPackage.periodo,
      contrato: dataPackage.contrato,
      valor_panfleto: dataPackage.valor_panfleto,
      numero_panfleto: dataPackage.numero_panfleto,
      limite_panfleto: dataPackage.limite_panfleto,
      limite_cupons: dataPackage.limite_cupons,
      limite_hotpromos: dataPackage.limite_hotpromos,
    },
    resolver: yupResolver(packageFormSchema),
  });

  const onSubmit: SubmitHandler<PackageSchema> = async (values) => {
    const newValues = {
      titulo: values.titulo,
      descricao: values.descricao,
      url_pagamento: values.url_pagamento,
      valor_pacote: values.valor_pacote,
      periodo: values.periodo,
      contrato: values.contrato,
      valor_panfleto: values.valor_panfleto,
      numero_panfleto: values.numero_panfleto,
      limite_panfleto: values.limite_panfleto,
      limite_cupons: values.limite_cupons,
      limite_hotpromos: values.limite_hotpromos,
      url_contrato: dataPackage.url_contrato,
    };

    const formData = new FormData();

    formData.append("file", values.contrato);
    formData.append("package", JSON.stringify(newValues));

    try {
      await api.put(
        `/packages/${idPackage}`,
        formData,
        configHeaders(token, "multipart/form-data")
      );

      toast.success("Atualização realizada com sucesso!");
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
            <title>RESZON - Editar pacote</title>
          </Head>
          <Box w={"full"} gap={20}>
            <GoBackPage title="Editar pacote" />

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
              <Text as={"b"} color={"black.100"}>
                Dados necessários:
              </Text>
              <Grid
                templateColumns={isMobile ? "repeat(1, 1fr)" : "repeat(3, 1fr)"}
                gap={5}
              >
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
                    label="URL de pagamento"
                    icon={AiOutlineLink}
                    nameInput="url_pagamento"
                    error={errors.url_pagamento}
                    {...register("url_pagamento")}
                  />
                </GridItem>
                <GridItem>
                  <InputPrice
                    label="Valor"
                    icon={MdOutlinePriceChange}
                    nameInput="valor_pacote"
                    error={errors.valor_pacote}
                    {...register("valor_pacote")}
                  />
                </GridItem>

                <GridItem>
                  <FormControl isInvalid={!!errors.periodo}>
                    <Select
                      color={"gray.100"}
                      placeholder="Período"
                      {...register("periodo")}
                    >
                      <option value="Mensal">Mensal</option>
                      <option value="Bimestral">Bimestral</option>
                      <option value="Trimestral">Trimestral</option>
                      <option value="Semetral">Semetral</option>
                      <option value="Anual">Anual</option>
                    </Select>
                    {!!errors.periodo && (
                      <FormErrorMessage>
                        {errors.periodo.message}
                      </FormErrorMessage>
                    )}
                  </FormControl>
                </GridItem>
                <GridItem>
                  <InputFile
                    label="Selecione o contrato"
                    setFilePerRef={setValue}
                    nameInput="contrato"
                    currentFile={dataPackage.url_contrato}
                    error={errors.contrato}
                    {...register("contrato")}
                  />
                </GridItem>
              </Grid>
              <Divider />
              <Text as={"b"} color={"black.100"}>
                Informações adicionais:
              </Text>
              <Grid
                templateColumns={isMobile ? "repeat(1, 1fr)" : "repeat(3, 1fr)"}
                gap={5}
              >
                <GridItem>
                  <InputPrice
                    label="Valor do panfleto"
                    icon={MdOutlinePriceChange}
                    nameInput="valor_panfleto"
                    error={errors.valor_panfleto}
                    {...register("valor_panfleto")}
                  />
                </GridItem>
                <GridItem>
                  <InputDefault
                    type={"number"}
                    label="Número de panfletos"
                    icon={AiOutlineNumber}
                    nameInput="numero_panfleto"
                    error={errors.numero_panfleto}
                    {...register("numero_panfleto")}
                  />
                </GridItem>
                <GridItem>
                  <InputDefault
                    type={"number"}
                    label="Limite de panfletos"
                    icon={AiOutlineNumber}
                    nameInput="limite_panfleto"
                    error={errors.limite_panfleto}
                    {...register("limite_panfleto")}
                  />
                </GridItem>

                <GridItem>
                  <InputDefault
                    type={"number"}
                    label="Limite de cupons"
                    icon={AiOutlineNumber}
                    nameInput="limite_cupons"
                    error={errors.limite_cupons}
                    {...register("limite_cupons")}
                  />
                </GridItem>
                <GridItem>
                  <InputDefault
                    type={"number"}
                    label="Limite de HotPromos"
                    icon={AiOutlineNumber}
                    nameInput="limite_hotpromos"
                    error={errors.limite_hotpromos}
                    {...register("limite_hotpromos")}
                  />
                </GridItem>
              </Grid>

              <Flex
                flexDirection={isMobile ? "column-reverse" : "row"}
                justifyContent={"flex-end"}
                gap={5}
                my={5}
              >
                <LinkButton
                  color={"red.100"}
                  w={isMobile ? "full" : "xs"}
                  onClick={() => router.back()}
                >
                  Cancelar
                </LinkButton>
                <PrimaryButton
                  isLoading={isSubmitting}
                  type="submit"
                  w={isMobile ? "full" : "xs"}
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

export default PackagesEdit;

export const getServerSideProps = withAuth(async (context: any) => {
  const token = context.req.cookies["@reszon.token"];
  const { idPackage } = context.query;
  let objectPackage;

  try {
    const response = await api.get("/packages", {
      params: { id: idPackage },
      ...configHeaders(token),
    });
    objectPackage = response.data;
  } catch (error) {
    console.error(
      "🚀 ~ file: index.tsx:156 ~ getServerSideProps ~ error:",
      error
    );
  }

  return {
    props: {
      token,
      objectPackage,
    },
  };
});
