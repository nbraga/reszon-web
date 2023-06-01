import {
  Box,
  Flex,
  FormControl,
  FormErrorMessage,
  Grid,
  GridItem,
  Select,
  Stack,
  useMediaQuery,
} from "@chakra-ui/react";
import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import { AiOutlineLink, AiOutlineMail } from "react-icons/ai";
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
import { InputFilePreview } from "../../components/inputs/InputFilePreview";
import { NftsProps } from "../../interfaces/nftsProps";
import { MdTitle, MdOutlineDescription } from "react-icons/md";
import { withAuth } from "../../HOC/auth";

const nftsFormSchema = yup.object().shape({
  titulo: yup.string().required("Nome obrigatório"),
  descricao: yup.string().required("Descrição obrigatório"),
  link: yup.string().required("Link obrigatório"),
  colecao: yup.string().required("Coleção obrigatório"),
  imagem: yup.mixed().required("Imagem obrigatório"),
});

const NftsCreate: NextPage = () => {
  const router = useRouter();
  const [isMobile] = useMediaQuery("(max-width: 750px)");
  const [loading, setLoading] = useState(false);
  const [previewFile, setPreviewFile] = useState("");

  const { register, handleSubmit, formState, setValue } = useForm<NftsProps>({
    resolver: yupResolver(nftsFormSchema),
  });

  const onSubmit: SubmitHandler<NftsProps> = async (values) => {
    toast.success("Cliente cadastrado com sucesso!");
  };
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <LayoutAdmin>
          <Head>
            <title>RESZON - Criar NFTs</title>
          </Head>
          <Box w={"full"} gap={20}>
            <GoBackPage title="Criar NFTs" />

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
                templateColumns={isMobile ? "repeat(1, 1fr)" : "repeat(2, 1fr)"}
                gap={5}
              >
                <GridItem
                  as={Flex}
                  justifyContent={"center"}
                  alignItems={"center"}
                  colSpan={isMobile ? 1 : 2}
                >
                  <Box w={isMobile ? "full" : "md"}>
                    <InputFilePreview
                      label="Selecione uma imagem"
                      setFilePerRef={setValue}
                      previewFile={previewFile}
                      setPreviewFile={setPreviewFile}
                      nameInput="imagem"
                      {...register("imagem")}
                      error={formState.errors.imagem}
                    />
                  </Box>
                </GridItem>
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
                    label="Link"
                    icon={AiOutlineLink}
                    nameInput="link"
                    error={formState.errors.link}
                    {...register("link")}
                  />
                </GridItem>
                <GridItem>
                  <FormControl isInvalid={!!formState.errors.colecao}>
                    <Select
                      color={"gray.100"}
                      placeholder="Coleção"
                      {...register("colecao")}
                    >
                      <option value="option1">option1</option>
                      <option value="option2">option2</option>
                      <option value="option3">option3</option>
                    </Select>
                    {!!formState.errors.colecao && (
                      <FormErrorMessage>
                        {formState.errors.colecao.message}
                      </FormErrorMessage>
                    )}
                  </FormControl>
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
                <PrimaryButton type="submit" w={isMobile ? "full" : "xs"}>
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

export default NftsCreate;

export const getServerSideProps = withAuth(async (context: any) => {
  const token = context.req.cookies["@reszon.token"];

  return {
    props: {
      token,
    },
  };
});
