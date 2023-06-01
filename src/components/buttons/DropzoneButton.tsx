import { Box, Text } from "@chakra-ui/react";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { FiUpload } from "react-icons/fi";

interface Props {
  getFile: (file: File[]) => void;
}

export const DropzoneButton = ({ getFile }: Props) => {
  const onDrop = useCallback((acceptedFilesArr: File[]) => {
    getFile(acceptedFilesArr);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
  });

  return (
    <Box
      cursor={"pointer"}
      gap={20}
      display={"flex"}
      justifyContent={"space-between"}
      alignItems={"center"}
      bgColor={"white.100"}
      color={"gray.100"}
      py={2}
      px={4}
      borderRadius={10}
      {...getRootProps()}
    >
      <Box>
        <Text as={"b"} fontSize={"1rem"}>
          Substituir
        </Text>
        <Text whiteSpace={"nowrap"} fontSize={"0.7rem"}>
          Clique para carregar o arquivo
        </Text>
      </Box>
      <FiUpload />
      <input {...getInputProps()} />
    </Box>
  );
};
