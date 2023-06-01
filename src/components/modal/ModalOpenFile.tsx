import {
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useMediaQuery,
} from "@chakra-ui/react";
import { DropzoneButton } from "../buttons/DropzoneButton";

interface Props {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  file: string;
  getFile: (file: File[]) => void;
}

export const ModalOpenFile = ({
  file,
  title,
  isOpen,
  onClose,
  getFile,
}: Props) => {
  const [isMobile] = useMediaQuery("(max-width: 750px)");
  return (
    <Modal
      size={isMobile ? "xs" : "5xl"}
      isOpen={isOpen}
      onClose={onClose}
      closeOnOverlayClick={true}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader
          bg={"gray.200"}
          color={"gray.100"}
          borderTopRadius={"lg"}
          display={"flex"}
          flexDir={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
          fontSize={"lg"}
          fontWeight={"normal"}
        >
          {title}
          <ModalCloseButton alignSelf={"center"} position={"unset"} />
        </ModalHeader>

        <ModalBody
          bg={"gray.300"}
          p={"5"}
          display={"flex"}
          flexDir={"row"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Image
            boxSize={isMobile ? "300px" : "500px"}
            src={file}
            objectFit={"contain"}
            alt="arquivo"
          />
        </ModalBody>

        <ModalFooter
          justifyContent={"flex-start"}
          bg={"gray.200"}
          borderBottomRadius={"lg"}
        >
          <DropzoneButton getFile={getFile} />

          {/*  <Stack direction={"row"} spacing={5}>
              <Button
                variant="link"
                leftIcon={<HiTrash />}
                color={"gray.100"}
                _hover={{ textDecoration: "none" }}
              >
                Excluir
              </Button>
  
              <Button
                leftIcon={<FiDownload />}
                color={"gray.100"}
                variant="link"
                _hover={{ textDecoration: "none" }}
              >
                Fazer Download
              </Button>
            </Stack> */}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
