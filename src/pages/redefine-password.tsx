import { NextPage } from "next";
import Head from "next/head";

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

import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { LinkButton } from "../components/buttons/LinkButton";
import { PrimaryButton } from "../components/buttons/PrimaryButton";
import { InputPassword } from "../components/inputs/InputPassword";

import { RedefinePasswordProps } from "../interfaces/userProps";

const redefinePasswordFormSchema = yup.object().shape({
  password: yup
    .string()
    .required("Senha obrigatória")
    .min(6, "A senha deve ter no minímo 6 caracteres"),
  confirmPassword: yup
    .string()
    .required("Confirmar senha obrigatória")
    .oneOf([yup.ref("password"), null], "As senhas não são iguais")
    .min(6, "A senha deve ter no minímo 6 caracteres"),
});

const RedefinePassword: NextPage = () => {
  const router = useRouter();
  const [isMobile] = useMediaQuery("(max-width: 750px)");

  const { register, handleSubmit, formState } = useForm<RedefinePasswordProps>({
    resolver: yupResolver(redefinePasswordFormSchema),
  });

  const handleRedefinePassword: SubmitHandler<RedefinePasswordProps> = async (
    values
  ) => {};

  return (
    <>
      <Head>
        <title>RESZON - Redefinir Senha</title>
      </Head>

      <Box display={"flex"} h={"100vh"}>
        <Center w={isMobile ? "100%" : "50%"}>
          <Container maxW={"md"}>
            <Stack spacing={10}>
              <Center>
                <Img src="/images/logo/logo-main.svg" alt="Logo" />
              </Center>
              <Box>
                <Text fontSize={"lg"} fontWeight={"bold"}>
                  Redefinir Senha
                </Text>
                <Text fontSize={"sm"} fontWeight={"normal"}>
                  Digite sua nova senha e verifique se os campos estão iguais
                </Text>
              </Box>

              <Stack
                onSubmit={handleSubmit(handleRedefinePassword)}
                as={"form"}
                align={"center"}
                spacing={"10"}
                mt={20}
              >
                <InputPassword
                  label="Nova Senha"
                  nameInput="password"
                  error={formState.errors.password}
                  {...register("password")}
                />
                <InputPassword
                  label="Confirmar Senha"
                  nameInput="confirmPassword"
                  error={formState.errors.confirmPassword}
                  {...register("confirmPassword")}
                />

                <PrimaryButton type="submit" w={"full"}>
                  Redefinir Senha
                </PrimaryButton>
                <LinkButton color="red.100" onClick={() => router.push("/")}>
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
          w={"50%"}
          bgColor={"white.200"}
        />
      </Box>
    </>
  );
};

export default RedefinePassword;

/* export const getServerSideProps = noAuth((context: any) => {
  return {
    props: {},
  };
});
 */
