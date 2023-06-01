import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  Icon,
  Text,
  VStack,
} from "@chakra-ui/react";
import {
  forwardRef,
  ForwardRefRenderFunction,
  InputHTMLAttributes,
  useCallback,
  useEffect,
  useState,
} from "react";
import { useDropzone } from "react-dropzone";
import { UseFormSetValue } from "react-hook-form";

import { RiUpload2Line } from "react-icons/ri";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  nameInput: string;
  setFilePerRef: UseFormSetValue<any>;
  error?: any;
  currentFile?: string;
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, Props> = (
  { setFilePerRef, label, error, nameInput, currentFile, ...rest },
  ref
) => {
  const [selectedFileUrlPoster, setSelectedFileUrlPoster] = useState("");
  const [filePath, setFilePath] = useState("");

  const onDrop = useCallback((acceptedFilesArr: File[]) => {
    const file = acceptedFilesArr[0];
    const fileUrl = URL.createObjectURL(file);

    setFilePath(file.name);
    setSelectedFileUrlPoster(fileUrl);
    setFilePerRef(nameInput, file);
  }, []);

  const { getRootProps, getInputProps, open } = useDropzone({
    onDrop,
    noClick: true,
  });

  const handleFileSelect = () => {
    window.open(selectedFileUrlPoster);
  };

  const removeFile = () => {
    setFilePerRef(nameInput, null);
    setSelectedFileUrlPoster("");
    setFilePath("");
    open();
  };

  useEffect(() => {
    if (currentFile)
      setSelectedFileUrlPoster(
        `${process.env.NEXT_PUBLIC_HOST_IMAGES}/${currentFile}`
      );
  }, [currentFile]);

  return (
    <>
      <FormControl isInvalid={!!error}>
        <Box
          {...getRootProps()}
          border="2px"
          borderColor={!!error ? "error.100" : "gray.200"}
          borderRadius={"0.375rem"}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"space-between"}
          flexDir={"row"}
          px={"3"}
          h={"45px"}
        >
          <VStack w={"full"} spacing={"0"} align={"start"}>
            {selectedFileUrlPoster ? (
              <Box
                maxW={{ sm: 200, md: "full" }}
                overflow={"hidden"}
                whiteSpace={"nowrap"}
                textOverflow={"ellipsis"}
                onClick={handleFileSelect}
                _hover={{
                  cursor: "pointer",
                }}
              >
                <Text fontWeight={"bold"} fontSize={"1rem"} color="blue.100">
                  {filePath}
                </Text>
                <Text as="p" fontSize={"0.7rem"} color="gray.100">
                  Clique para visualizar
                </Text>
              </Box>
            ) : (
              <Box
                _hover={{
                  cursor: "pointer",
                }}
                w={"full"}
                onClick={open}
              >
                <Text as="b" fontSize={"0.8rem"} color="gray.100">
                  {label}
                </Text>
                <Text as="p" fontSize={"0.7rem"} color="gray.100">
                  Clique para carregar o arquivo
                </Text>
              </Box>
            )}
          </VStack>
          {selectedFileUrlPoster ? (
            <Button
              color={"gray.100"}
              variant={"link"}
              bg={"none"}
              fontWeight={"normal"}
              fontSize={"sm"}
              onClick={removeFile}
              _hover={{
                textDecoration: "none",
              }}
            >
              Substituir
            </Button>
          ) : (
            <Icon
              onClick={open}
              _hover={{
                cursor: "pointer",
              }}
              as={RiUpload2Line}
              fontSize={"lg"}
              color="gray.100"
            />
          )}
          <input
            accept="image/*"
            ref={ref}
            name={nameInput}
            id={nameInput}
            {...rest}
            {...getInputProps()}
          />
        </Box>

        {!!error && <FormErrorMessage>{error.message}</FormErrorMessage>}
      </FormControl>
    </>
  );
};

export const InputFile = forwardRef(InputBase);
