import {
  Box,
  Divider,
  Flex,
  FormControl,
  FormErrorMessage,
  Grid,
  GridItem,
  Input,
  Select,
  Stack,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";
import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { AiOutlineLink, AiOutlineNumber } from "react-icons/ai";
import { Loading } from "../../components/Loading";
import { LinkButton } from "../../components/buttons/LinkButton";
import { PrimaryButton } from "../../components/buttons/PrimaryButton";
import { InputDefault } from "../../components/inputs/InputDefault";
import { LayoutAdmin } from "../../layout/admin";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { GoBackPage } from "../../components/GoBackPage";
import { InputPrice } from "../../components/inputs/InputPrice";

import {
  MdOutlineDescription,
  MdOutlinePriceChange,
  MdTitle,
} from "react-icons/md";
import { InferType } from "yup";
import { InputFile } from "../../components/inputs/InputFIle";
import { AuthContext } from "../../contexts/AuthContext";
import { toast } from "react-toastify";
import { MESSAGE } from "../../utils/utilsMessages";
import { withAuth } from "../../HOC/auth";
import { InputMoney } from "../../components/inputs/InputMoney";

const packageFormSchema = yup.object({
  titulo: yup.string().required("Título obrigatório"),
  descricao: yup.string().required("Descrição obrigatório"),
  url_pagamento: yup.string().required("URL de pagamento obrigatório"),
  valor_pacote: yup.string().required("Valor do pacote obrigatório"),
  periodo: yup.string().required("Período obrigatório"),
  contrato: yup.mixed().required("Contrato obrigatório"),
  valor_panfleto: yup.string().required("Valor de panfleto obrigatório"),
  numero_panfleto: yup.number().required("Número de panfleto obrigatório"),
  limite_panfleto: yup.number().required("Limite de panfletos obrigatório"),
  limite_cupons: yup.number().required("Limite de cupons obrigatório"),
  limite_hotpromos: yup.number().required("Limite de hot promos obrigatório"),
});

type PackageProps = InferType<typeof packageFormSchema>;

const PackagesCreate: NextPage = () => {
  const router = useRouter();
  const { createPackage } = useContext(AuthContext);
  const [isMobile] = useMediaQuery("(max-width: 750px)");
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, formState, setValue, getValues, control } =
    useForm<PackageProps>({
      resolver: yupResolver(packageFormSchema),
    });

  const teste = getValues();
  console.log("🚀 ~ file: create.tsx:72 ~ teste:", teste);

  const onSubmit = async (values: PackageProps) => {
    await createPackage(values)
      .then((res) => {
        toast.success(res?.data.message);
        router.back();
      })
      .catch((err) => {
        toast.error(MESSAGE.SERVER_ERROR);
      });
  };

  const values = getValues();
  const valuePlanfeto = values.valor_panfleto;
  console.log(valuePlanfeto);
  return (
    <>
      <LayoutAdmin>
        <Head>
          <title>RESZON - Novo pacote</title>
        </Head>
        <Box w={"full"} gap={20}>
          <GoBackPage title="Novo pacote" />

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
                  error={formState.errors.titulo}
                  {...register("titulo")}
                />
              </GridItem>
              <GridItem>
                <InputDefault
                  label="Descrição"
                  icon={MdOutlineDescription}
                  nameInput="descricao"
                  error={formState.errors.descricao}
                  {...register("descricao")}
                />
              </GridItem>
              <GridItem>
                <InputDefault
                  label="URL de pagamento"
                  icon={AiOutlineLink}
                  nameInput="url_pagamento"
                  error={formState.errors.url_pagamento}
                  {...register("url_pagamento")}
                />
              </GridItem>
              <GridItem>
                <InputMoney
                  label="Valor do pacote"
                  icon={MdOutlinePriceChange}
                  nameInput="valor_pacote"
                  error={formState.errors.valor_pacote}
                  {...register("valor_pacote")}
                />
              </GridItem>

              <GridItem>
                <FormControl isInvalid={!!formState.errors.periodo}>
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
                  {!!formState.errors.periodo && (
                    <FormErrorMessage>
                      {formState.errors.periodo.message}
                    </FormErrorMessage>
                  )}
                </FormControl>
              </GridItem>
              <GridItem>
                <InputFile
                  label="Selecione o contrato"
                  setFilePerRef={setValue}
                  nameInput="contrato"
                  error={formState.errors.contrato}
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
                <InputMoney
                  label="Valor do panfleto"
                  icon={MdOutlinePriceChange}
                  nameInput="valor_panfleto"
                  error={formState.errors.valor_panfleto}
                  {...register("valor_panfleto")}
                />
              </GridItem>
              <GridItem>
                <InputDefault
                  type={"number"}
                  label="Número de panfletos"
                  icon={AiOutlineNumber}
                  nameInput="numero_panfleto"
                  error={formState.errors.numero_panfleto}
                  {...register("numero_panfleto")}
                />
              </GridItem>
              <GridItem>
                <InputDefault
                  type={"number"}
                  label="Limite de panfletos"
                  icon={AiOutlineNumber}
                  nameInput="limite_panfleto"
                  error={formState.errors.limite_panfleto}
                  {...register("limite_panfleto")}
                />
              </GridItem>

              <GridItem>
                <InputDefault
                  type={"number"}
                  label="Limite de cupons"
                  icon={AiOutlineNumber}
                  nameInput="limite_cupons"
                  error={formState.errors.limite_cupons}
                  {...register("limite_cupons")}
                />
              </GridItem>
              <GridItem>
                <InputDefault
                  type={"number"}
                  label="Limite de HotPromos"
                  icon={AiOutlineNumber}
                  nameInput="limite_hotpromos"
                  error={formState.errors.limite_hotpromos}
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
                isLoading={formState.isSubmitting}
                type="submit"
                w={isMobile ? "full" : "xs"}
              >
                Salvar
              </PrimaryButton>
            </Flex>
          </Stack>
        </Box>
      </LayoutAdmin>
    </>
  );
};

export default PackagesCreate;

export const getServerSideProps = withAuth(async (context: any) => {
  const token = context.req.cookies["@reszon.token"];

  return {
    props: {
      token,
    },
  };
});
