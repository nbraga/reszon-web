import {
  Box,
  Center,
  Container,
  Img,
  Stack,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";
import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useContext } from "react";

import { PrimaryButton } from "../components/buttons/PrimaryButton";
import { InputDefault } from "../components/inputs/InputDefault";
import { InputPassword } from "../components/inputs/InputPassword";

import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";

import { SignInProps } from "../interfaces/userProps";

import { AiOutlineUser } from "react-icons/ai";
import { noAuth } from "../HOC/auth";
import { AuthContext } from "../contexts/AuthContext";

const signInFormSchema = yup.object().shape({
  email: yup
    .string()
    .required("E-mail obrigatório")
    .email("Email inválido, verifique e tente novamente."),
  senha: yup.string().required("Senha obrigatória"),
  manter_conectado: yup.string(),
});

const SignIn: NextPage = () => {
  const router = useRouter();
  const { signIn } = useContext(AuthContext);

  const [isBreakPoint] = useMediaQuery("(max-width: 850px)");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<SignInProps>({
    resolver: yupResolver(signInFormSchema),
  });

  const onSubmit: SubmitHandler<SignInProps> = async (values) => {
    try {
      await signIn(values);
    } catch (error) {
      setError("senha", {
        type: "custom",
        //@ts-ignore
        message: error.response?.data.message,
      });
    }
  };

  return (
    <>
      <Head>
        <title>RESZON - Login</title>
      </Head>

      <Box display={"flex"} h={"100vh"}>
        <Center w={isBreakPoint ? "100%" : "50%"}>
          <Container maxW={"md"}>
            <Stack spacing={10}>
              <Center>
                <Img src="/images/logo/logo-main.svg" alt="logo-principal" />
              </Center>
              <Box>
                <Text fontSize={"lg"} fontWeight={"bold"}>
                  Login
                </Text>
                <Text fontSize={"sm"} fontWeight={"normal"}>
                  Faça o login para ter acesso ao gerenciamento da Reszon!
                </Text>
              </Box>
              <Stack
                onSubmit={handleSubmit(onSubmit)}
                as={"form"}
                align={"start"}
                spacing={5}
                mt={10}
              >
                <InputDefault
                  label="Email"
                  nameInput="email"
                  icon={AiOutlineUser}
                  error={errors.email}
                  {...register("email")}
                />
                <InputPassword
                  label="Senha"
                  nameInput="senha"
                  error={errors.senha}
                  {...register("senha")}
                />
                {/* <Checkbox colorScheme="green" {...register("manter_conectado")}>
                  Manter conectado
                </Checkbox> */}

                <PrimaryButton
                  isLoading={isSubmitting}
                  type="submit"
                  w={"full"}
                >
                  Entrar
                </PrimaryButton>

                {/* <LinkButton
                  fontSize={"md"}
                  justifyContent={"center"}
                  onClick={() => router.push("forgot-password")}
                >
                  Esqueceu sua senha?
                </LinkButton> */}
              </Stack>
            </Stack>
          </Container>
        </Center>

        <Box
          hidden={isBreakPoint}
          bgImage="/images/background/bg-login.svg"
          bgPosition="center"
          bgRepeat="no-repeat"
          bgSize="cover"
          w={"50%"}
          bgColor="white.200"
        />
      </Box>
    </>
  );
};

export default SignIn;

export const getServerSideProps = noAuth((context: any) => {
  return {
    props: {},
  };
});
