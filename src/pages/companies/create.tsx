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
import { useContext, useEffect, useState } from "react";
import {
  AiOutlineFieldNumber,
  AiOutlineLink,
  AiOutlineMail,
  AiOutlineUser,
} from "react-icons/ai";
import { BsPinMap } from "react-icons/bs";
import { FaCity } from "react-icons/fa";
import {
  MdLocationCity,
  MdOutlineFormatListNumbered,
  MdOutlineLocationOn,
} from "react-icons/md";
import { RiRoadMapLine } from "react-icons/ri";
import { SlSocialLinkedin } from "react-icons/sl";
import { TbPhone } from "react-icons/tb";
import { LinkButton } from "../../components/buttons/LinkButton";
import { PrimaryButton } from "../../components/buttons/PrimaryButton";
import { InputDefault } from "../../components/inputs/InputDefault";
import { InputCep } from "../../components/inputs/mask/InputCep";
import { InputPhone } from "../../components/inputs/mask/InputPhone";
import { LayoutAdmin } from "../../layout/admin";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, useWatch } from "react-hook-form";
import { BiUserCheck } from "react-icons/bi";
import * as yup from "yup";
import { InferType } from "yup";
import { withAuth } from "../../HOC/auth";
import { GoBackPage } from "../../components/GoBackPage";
import { InputCnpj } from "../../components/inputs/mask/InputCnpj";
import { AuthContext } from "../../contexts/AuthContext";
import { CnaesProps } from "../../interfaces/cnaesProps";

import { toast } from "react-toastify";
import { MESSAGE } from "../../utils/utilsMessages";
import { searchCEP } from "../../utils/utilsCep";
import { PackageProps } from "../../interfaces/packageProps";
import { api, configHeaders } from "../../services/api";

const companyFormSchema = yup.object({
  nome_fantasia: yup.string().required("Nome da empresa obrigatório"),
  cnpj: yup.string().required("CNPJ obrigatório"),
  email: yup
    .string()
    .required("E-mail obrigatório")
    .email("Email inválido, verifique e tente novamente."),
  telefone: yup.string().required("Contato obrigatório"),
  site: yup.string().required("Site obrigatório"),
  localizacao: yup.string().required("Localização obrigatório"),
  pacote: yup.string().required("Pacote obrigatório"),
  cnaes: yup.string().required("Cnaes obrigatório"),
  natureza_legal: yup.string().required("Natureza legal obrigatório"),
  forma_pagamento: yup.string().required("Forma de pagamento obrigatório"),
  cep: yup.string().required("Cep obrigatório"),
  numero: yup.string().required("Número obrigatório"),
  endereco: yup.string().required("Endereço obrigatório"),
  complemento: yup.string(),
  bairro: yup.string().required("Bairro obrigatório"),
  cidade: yup.string().required("Cidade obrigatório"),
  estado: yup.string().required("Estado obrigatório"),
});

type CreateCompanyProps = InferType<typeof companyFormSchema>;

const CompaniesCreate: NextPage = ({
  token,
  listPackages,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter();
  const [isBreakPoint] = useMediaQuery("(max-width: 750px)");
  const { createCompany } = useContext(AuthContext);

  const [cnaes, setCnaes] = useState<CnaesProps[]>([]);
  const [packages, setPackages] = useState<PackageProps[]>(listPackages);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
    setValue,
    clearErrors,
  } = useForm<CreateCompanyProps>({
    resolver: yupResolver(companyFormSchema),
  });

  const onSubmit = async (values: CreateCompanyProps) => {
    await createCompany(values)
      .then((res) => {
        toast.success(res?.data.message);
        router.back();
      })
      .catch((err) => {
        toast.error(MESSAGE.SERVER_ERROR);
      });
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
        <title>RESZON - Nova Empresa</title>
      </Head>
      <Box w={"full"} gap={20}>
        <GoBackPage title="Nova Empresa" />

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
            Dados empresariais:
          </Text>
          <Grid
            templateColumns={isBreakPoint ? "repeat(1, 1fr)" : "repeat(3, 1fr)"}
            gap={5}
          >
            <GridItem>
              <InputDefault
                label="Nome fantasia"
                icon={AiOutlineUser}
                nameInput="nome_fantasia"
                error={errors.nome_fantasia}
                {...register("nome_fantasia")}
              />
            </GridItem>
            <GridItem>
              <InputCnpj
                label="CNPJ"
                icon={BiUserCheck}
                nameInput="cnpj"
                error={errors.cnpj}
                {...register("cnpj")}
              />
            </GridItem>
            <GridItem>
              <InputDefault
                label="Email"
                icon={AiOutlineMail}
                nameInput="email"
                error={errors.email}
                {...register("email")}
              />
            </GridItem>
            <GridItem>
              <InputPhone
                label="Contato"
                icon={TbPhone}
                nameInput="telefone"
                error={errors.telefone}
                {...register("telefone")}
              />
            </GridItem>
            <GridItem>
              <InputDefault
                label="Site"
                icon={AiOutlineLink}
                nameInput="site"
                error={errors.site}
                {...register("site")}
              />
            </GridItem>
            <GridItem>
              <InputDefault
                label="Localização"
                icon={SlSocialLinkedin}
                nameInput="localizacao"
                error={errors.localizacao}
                {...register("localizacao")}
              />
            </GridItem>
          </Grid>
          <Divider />
          <Text as={"b"} color={"black.100"}>
            Informações Adicionais:
          </Text>
          <Grid
            templateColumns={isBreakPoint ? "repeat(1, 1fr)" : "repeat(3, 1fr)"}
            gap={5}
          >
            <GridItem>
              <FormControl isInvalid={!!errors.pacote}>
                <Select
                  color={"gray.100"}
                  placeholder="Pacote"
                  {...register("pacote")}
                >
                  {packages.map((item) => (
                    <option value={item.id}>{item.descricao}</option>
                  ))}
                </Select>
                {!!errors.pacote && (
                  <FormErrorMessage>{errors.pacote.message}</FormErrorMessage>
                )}
              </FormControl>
            </GridItem>
            <GridItem>
              <FormControl isInvalid={!!errors.cnaes}>
                <Select
                  color={"gray.100"}
                  placeholder="CNAES"
                  {...register("cnaes")}
                >
                  <option value="option1">option 1</option>
                  <option value="option2">option 2</option>
                  {/*  {cnaes.map((cnae) => (
                    <option value={JSON.stringify(cnae)}>
                      {cnae.atividadeEconmica}
                    </option>
                  ))} */}
                </Select>
                {!!errors.cnaes && (
                  <FormErrorMessage>{errors.cnaes.message}</FormErrorMessage>
                )}
              </FormControl>
            </GridItem>
            <GridItem>
              <FormControl isInvalid={!!errors.natureza_legal}>
                <Select
                  color={"gray.100"}
                  placeholder="Natureza Legal"
                  {...register("natureza_legal")}
                >
                  <option value="option1">option 1</option>
                  <option value="option2">option 2</option>
                </Select>
                {!!errors.natureza_legal && (
                  <FormErrorMessage>
                    {errors.natureza_legal.message}
                  </FormErrorMessage>
                )}
              </FormControl>
            </GridItem>
            <GridItem>
              <FormControl isInvalid={!!errors.forma_pagamento}>
                <Select
                  color={"gray.100"}
                  placeholder="Forma de pagamento"
                  {...register("forma_pagamento")}
                >
                  <option value="Dinheiro">Dinheiro</option>
                  <option value="Cartão de débito/crédito">
                    Cartão de débito/crédito
                  </option>
                  <option value="pix">Pix</option>
                </Select>
                {!!errors.forma_pagamento && (
                  <FormErrorMessage>
                    {errors.forma_pagamento.message}
                  </FormErrorMessage>
                )}
              </FormControl>
            </GridItem>
          </Grid>
          <Divider />
          <Text as={"b"} color={"black.100"}>
            Endereço:
          </Text>
          <Grid
            templateColumns={isBreakPoint ? "repeat(1, 1fr)" : "repeat(4, 1fr)"}
            gap={5}
          >
            <GridItem>
              <InputCep
                label="CEP"
                nameInput="cep"
                icon={RiRoadMapLine}
                error={errors.cep}
                {...register("cep")}
              />
            </GridItem>

            <GridItem>
              <InputDefault
                label="Estado"
                icon={MdLocationCity}
                nameInput="estado"
                error={errors.estado}
                {...register("estado")}
              />
            </GridItem>
            <GridItem>
              <InputDefault
                label="Cidade"
                icon={FaCity}
                nameInput="cidade"
                error={errors.cidade}
                {...register("cidade")}
              />
            </GridItem>
            <GridItem>
              <InputDefault
                label="Bairro"
                icon={BsPinMap}
                nameInput="bairro"
                error={errors.bairro}
                {...register("bairro")}
              />
            </GridItem>
            <GridItem colSpan={isBreakPoint ? 1 : 2}>
              <InputDefault
                label="Endereço"
                icon={MdOutlineLocationOn}
                nameInput="endereco"
                error={errors.endereco}
                {...register("endereco")}
              />
            </GridItem>
            <GridItem>
              <InputDefault
                label="Número"
                icon={AiOutlineFieldNumber}
                nameInput="numero"
                error={errors.numero}
                {...register("numero")}
              />
            </GridItem>
            <GridItem>
              <InputDefault
                label="Complemento"
                icon={MdOutlineFormatListNumbered}
                nameInput="complemento"
                error={errors.complemento}
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
  );
};

export default CompaniesCreate;

export const getServerSideProps = withAuth(async (context: any) => {
  const token = context.req.cookies["@reszon.token"];
  let listPackages = [];

  try {
    const response = await api.get("/packages", {
      params: { id: "" },
      ...configHeaders(token),
    });

    listPackages = response.data;
  } catch (error) {
    console.error(
      "🚀 ~ file: index.tsx:156 ~ getServerSideProps ~ error:",
      error
    );
  }

  return {
    props: {
      token,
      listPackages,
    },
  };
});
