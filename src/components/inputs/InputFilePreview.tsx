import {
  Box,
  FormControl,
  FormErrorMessage,
  IconButton,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import {
  Dispatch,
  forwardRef,
  ForwardRefRenderFunction,
  InputHTMLAttributes,
  SetStateAction,
  useCallback,
  useEffect,
} from "react";
import { useDropzone } from "react-dropzone";
import {
  FieldError,
  UseFormResetField,
  UseFormSetError,
  UseFormSetValue,
} from "react-hook-form";

import { AiOutlineClose } from "react-icons/ai";
import { GhostButton } from "../buttons/GhostButton";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  setFilePerRef: UseFormSetValue<any>;
  previewFile: string;
  setPreviewFile: Dispatch<SetStateAction<string>>;
  nameInput: string;
  currentImage?: string;
  error?: FieldError;
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, Props> = (
  {
    setFilePerRef,
    setPreviewFile,
    previewFile,
    currentImage,
    nameInput,
    label,
    error,
    ...rest
  },
  ref
) => {
  const onDrop = useCallback((acceptedFilesArr: File[]) => {
    const file = acceptedFilesArr[0];
    const fileUrl = URL.createObjectURL(file);

    setPreviewFile(fileUrl);
    setFilePerRef(nameInput, file);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/png": [".png"],
      "image/jpg": [".jpg"],
      "image/jpeg": [".jpeg"],
      "image/svg+xml": [".svg"],
    },
    onDrop,
  });

  const removeFile = () => {
    setPreviewFile("");
    setFilePerRef(nameInput, null);
  };

  useEffect(() => {
    if (currentImage) setPreviewFile(currentImage);
  }, [currentImage]);

  return (
    <FormControl isInvalid={!!error}>
      {previewFile ? (
        <Box
          p={5}
          borderRadius={"10px"}
          border="1px solid"
          w={"full"}
          borderColor={!!error ? "red.100" : "gray.200"}
        >
          <Stack align={"center"}>
            <Text as="b" fontSize={"15"} color="black.100">
              {label}
            </Text>
            <Box position={"relative"}>
              <Image
                filter="auto"
                brightness="80%"
                height={"200px"}
                src={previewFile}
                alt="preview"
              />

              <IconButton
                size={"xs"}
                position={"absolute"}
                top={0}
                right={0}
                aria-label="close-image"
                bg={"gray.400"}
                icon={<AiOutlineClose />}
                onClick={removeFile}
                opacity={0.6}
              />
            </Box>

            <GhostButton borderRadius={"50px"} w={"full"} {...getRootProps()}>
              Alterar Imagem
              <input
                accept="image/*"
                ref={ref}
                name={nameInput}
                id={nameInput}
                {...rest}
                {...getInputProps()}
              />
            </GhostButton>
          </Stack>
        </Box>
      ) : (
        <Box
          p={5}
          borderRadius={"10px"}
          border="1px solid"
          borderColor={!!error ? "red.100" : "gray.200"}
          w={"full"}
          {...getRootProps()}
        >
          <Stack spacing={2} align={"center"}>
            <Text as="b" fontSize={"15"} color="black.100">
              {label}
            </Text>
            <Text fontSize={"12"} fontWeight={"bold"} color="gray.100">
              Clique para carregar o arquivo
            </Text>

            <GhostButton borderRadius={"50px"} w={"full"}>
              Selecionar Imagem
              <input
                accept="image/*"
                ref={ref}
                name={nameInput}
                id={nameInput}
                {...rest}
                {...getInputProps()}
              />
            </GhostButton>
          </Stack>
        </Box>
      )}

      {!!error && <FormErrorMessage>{error.message}</FormErrorMessage>}
    </FormControl>
  );
};

export const InputFilePreview = forwardRef(InputBase);
