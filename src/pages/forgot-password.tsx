import { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";

import {
  Box,
  Center,
  Container,
  Img,
  Stack,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";
import { useRouter } from "next/router";

import { LinkButton } from "../components/buttons/LinkButton";
import { PrimaryButton } from "../components/buttons/PrimaryButton";

import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";

import { InputDefault } from "../components/inputs/InputDefault";

interface Props {
  email: string;
}

const sendEmailFormSchema = yup.object().shape({
  email: yup
    .string()
    .required("E-mail obrigatório")
    .email("Email inválido, verifique e tente novamente."),
});

const ForgotPassword: NextPage = () => {
  const router = useRouter();
  const [isMobile] = useMediaQuery("(max-width: 750px)");

  const [loadingButton, setLoadingButton] = useState(false);

  const { register, handleSubmit, formState, control, setError } =
    useForm<Props>({
      resolver: yupResolver(sendEmailFormSchema),
    });

  const handleSendEmail: SubmitHandler<Props> = async (values) => {};

  return (
    <>
      <Head>
        <title>CMS - Esqueci Senha</title>
      </Head>

      <Box display={"flex"} h={"100vh"}>
        <Center w={isMobile ? "100%" : "50%"}>
          <Container maxW={"md"}>
            <Stack spacing={10}>
              <Center>
                <Img src="/images/logo/logo-main.svg" alt="logo" />
              </Center>

              <Box>
                <Text fontSize={"lg"} fontWeight={"bold"}>
                  Esqueceu sua senha?
                </Text>
                <Text fontSize={"sm"} fontWeight={"normal"}>
                  Informe o seu email para receber instruções de como redefinir
                  sua senha.
                </Text>
              </Box>

              <Stack
                onSubmit={handleSubmit(handleSendEmail)}
                as="form"
                align={"center"}
                spacing={"10"}
                mt={20}
              >
                <InputDefault
                  label="Email"
                  nameInput="email"
                  error={formState.errors.email}
                  {...register("email")}
                />

                <PrimaryButton
                  isLoading={loadingButton}
                  type="submit"
                  w={"full"}
                >
                  Enviar
                </PrimaryButton>
                <LinkButton
                  color={"red.100"}
                  justifyContent={"center"}
                  onClick={() => router.back()}
                >
                  Retornar ao Login
                </LinkButton>
              </Stack>
            </Stack>
          </Container>
        </Center>

        <Box
          hidden={isMobile}
          bgImage="url('/images/background/bg-login.svg')"
          bgPosition="center"
          bgRepeat="no-repeat"
          bgSize="cover"
          bgColor="white.200"
          w={"50%"}
        />
      </Box>
    </>
  );
};

export default ForgotPassword;

/* export const getServerSideProps = noAuth((context: any) => {
  return {
    props: {},
  };
});
 */
