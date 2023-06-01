import { Heading, HStack, IconButton } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { MdArrowBackIosNew } from "react-icons/md";

interface Props {
  title: string;
}

export const GoBackPage = ({ title }: Props) => {
  const router = useRouter();
  return (
    <HStack spacing={5} my={5}>
      <IconButton
        fontSize={30}
        color={"black.100"}
        variant={"link"}
        aria-label="go-back"
        icon={<MdArrowBackIosNew />}
        onClick={() => router.back()}
      />
      <Heading fontSize={"2rem"}>{title}</Heading>
    </HStack>
  );
};
