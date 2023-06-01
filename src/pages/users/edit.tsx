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
  AiOutlineMail,
  AiOutlineUser,
} from "react-icons/ai";
import { BiUserCheck } from "react-icons/bi";
import { BsPinMap } from "react-icons/bs";
import { FaCity } from "react-icons/fa";
import {
  MdLocationCity,
  MdOutlineFormatListNumbered,
  MdOutlineLocationOn,
} from "react-icons/md";
import { RiRoadMapLine } from "react-icons/ri";
import { TbPhone } from "react-icons/tb";
import { Loading } from "../../components/Loading";
import { LinkButton } from "../../components/buttons/LinkButton";
import { PrimaryButton } from "../../components/buttons/PrimaryButton";

import { InputDefault } from "../../components/inputs/InputDefault";
import { InputCep } from "../../components/inputs/mask/InputCep";
import { InputCpf } from "../../components/inputs/mask/InputCpf";
import { InputPhone } from "../../components/inputs/mask/InputPhone";
import { InputRg } from "../../components/inputs/mask/InputRg";
import { LayoutAdmin } from "../../layout/admin";

import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm, useWatch } from "react-hook-form";
import { toast } from "react-toastify";
import * as yup from "yup";
import { InferType } from "yup";
import { withAuth } from "../../HOC/auth";
import { GoBackPage } from "../../components/GoBackPage";
import { AuthContext } from "../../contexts/AuthContext";
import { UserProps } from "../../interfaces/userProps";
import { api, configHeaders } from "../../services/api";
import { searchCEP } from "../../utils/utilsCep";
import { DatePicker } from "../../components/inputs/InputDatePicker";

const userFormSchema = yup.object({
  email: yup
    .string()
    .required("E-mail obrigatório")
    .email("Email inválido, verifique e tente novamente."),
  contato: yup.string().required("Contato obrigatório"),
  perfil: yup.string().required("Perfil obrigatório"),
  nome: yup.string().required("Nome completo obrigatório"),
  sexo: yup.string().required("Campo obrigatório"),
  cpf: yup.string().required("CPF obrigatório"),
  rg: yup.string().required("RG obrigatório"),
  data_nascimento: yup.date().required("Data de nascimento obrigatório"),
  cep: yup.string().required("Cep obrigatório"),
  estado: yup.string().required("Estado obrigatório"),
  cidade: yup.string().required("Cidade obrigatório"),
  bairro: yup.string().required("Bairro obrigatório"),
  endereco: yup.string().required("Endereço obrigatório"),
  numero: yup.string().required("Número obrigatório"),
  complemento: yup.string(),
});

type CreateUserProps = InferType<typeof userFormSchema>;

const UsersEdit: NextPage = ({
  objectUser,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter();
  const [isBreakPoint] = useMediaQuery("(max-width: 850px)");
  const { editUser } = useContext(AuthContext);

  const [loading, setLoading] = useState(true);

  const [user, setUser] = useState<UserProps>(objectUser);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    control,
    clearErrors,
  } = useForm<CreateUserProps>({
    defaultValues: {
      email: user.email,
      contato: user.contato,
      perfil: user.perfil,
      nome: user.nome,
      sexo: user.sexo,
      cpf: user.cpf,
      rg: user.rg,
      data_nascimento: user.data_nascimento,
      cep: user.cep,
      numero: user.numero,
      complemento: user.complemento,
    },
    resolver: yupResolver(userFormSchema),
  });

  const onSubmit = async (values: CreateUserProps) => {
    const response = await editUser(values, user.id || "");

    if (response?.status === 200) {
      toast.success("Cliente atualizado com sucesso!");
      router.back();
    } else {
      toast.error("Erro ao atualizar o cliente!");
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
    setLoading(false);
  }, [cep]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <LayoutAdmin>
          <Head>
            <title>RESZON - Editar Usuário</title>
          </Head>
          <Box w={"full"} gap={20}>
            <GoBackPage title="Editar Usuário" />

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
                Dados para acesso:
              </Text>
              <Grid
                templateColumns={
                  isBreakPoint ? "repeat(1, 1fr)" : "repeat(3, 1fr)"
                }
                gap={5}
              >
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
                    nameInput="contato"
                    error={errors.contato}
                    {...register("contato")}
                  />
                </GridItem>
                <GridItem>
                  <FormControl isInvalid={!!errors.perfil}>
                    <Select
                      color={"gray.100"}
                      placeholder="Perfil"
                      {...register("perfil")}
                    >
                      <option value="Administrador">Administrador</option>
                      <option value="Empresa">Empresa</option>
                      <option value="Promotor">Promotor</option>
                    </Select>
                    {!!errors.perfil && (
                      <FormErrorMessage>
                        {errors.perfil.message}
                      </FormErrorMessage>
                    )}
                  </FormControl>
                </GridItem>
              </Grid>
              <Divider />
              <Text as={"b"} color={"black.100"}>
                Dados pessoais:
              </Text>
              <Grid
                templateColumns={
                  isBreakPoint ? "repeat(1, 1fr)" : "repeat(3, 1fr)"
                }
                gap={5}
              >
                <GridItem colSpan={isBreakPoint ? 1 : 2}>
                  <InputDefault
                    label="Nome completo"
                    icon={AiOutlineUser}
                    nameInput="nome"
                    error={errors.nome}
                    {...register("nome")}
                  />
                </GridItem>
                <GridItem>
                  <FormControl isInvalid={!!errors.sexo}>
                    <Select
                      color={"gray.100"}
                      placeholder="Sexo"
                      {...register("sexo")}
                    >
                      <option value="Masculino">Masculino</option>
                      <option value="Feminina">Feminina</option>
                    </Select>
                    {!!errors.sexo && (
                      <FormErrorMessage>{errors.sexo.message}</FormErrorMessage>
                    )}
                  </FormControl>
                </GridItem>
                <GridItem>
                  <InputCpf
                    label="CPF"
                    icon={BiUserCheck}
                    nameInput="cpf"
                    error={errors.cpf}
                    {...register("cpf")}
                  />
                </GridItem>
                <GridItem>
                  <InputRg
                    label="RG"
                    icon={BiUserCheck}
                    nameInput="rg"
                    error={errors.rg}
                    {...register("rg")}
                  />
                </GridItem>
                <GridItem>
                  <Controller
                    name="data_nascimento"
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
                    icon={RiRoadMapLine}
                    nameInput="cep"
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

export default UsersEdit;

export const getServerSideProps = withAuth(async (context: any) => {
  const token = context.req.cookies["@reszon.token"];
  const { idUser } = context.query;
  let user;

  try {
    const response = await api.get(`/users`, {
      params: { id: idUser },
      ...configHeaders(token),
    });
    user = response.data;
  } catch (error) {
    console.log(error);
  }

  return {
    props: {
      token,
      objectUser: user,
    },
  };
});
