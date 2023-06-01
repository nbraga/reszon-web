import {
  Center,
  Heading,
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
} from "@chakra-ui/react";
import { GhostButton } from "../buttons/GhostButton";
import { PrimaryButton } from "../buttons/PrimaryButton";

interface Props {
  title: string;
  description: string;
  nameGhostButton: string;
  namePrimaryButton: string;
  fnGhostButton: () => void;
  fnPrimaryButton: () => void;
  isOpen: boolean;
  onClose: () => void;
  isBreakPoint: boolean;
}

export const ModalDefault = ({
  title,
  description,
  nameGhostButton,
  namePrimaryButton,
  fnGhostButton,
  fnPrimaryButton,
  isOpen,
  onClose,
  isBreakPoint,
}: Props) => {
  return (
    <Modal
      closeOnOverlayClick={false}
      size={isBreakPoint ? "xs" : "md"}
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Heading
            textAlign={"center"}
            fontSize={isBreakPoint ? "1.2rem" : "1.5rem"}
            color="blue.300"
          >
            {title}
          </Heading>
        </ModalHeader>

        <ModalBody>
          <Center flexDirection={"column"}>
            <Image
              src="/images/img-delete.svg"
              objectFit={"contain"}
              boxSize={"200px"}
            />
            {description && (
              <Text textAlign={"center"} fontSize={"1rem"} color="blue.300">
                {description}
              </Text>
            )}
          </Center>
        </ModalBody>

        <ModalFooter>
          <Stack
            w={"full"}
            direction={isBreakPoint ? "column-reverse" : "row"}
            spacing={5}
          >
            <GhostButton w={"full"} onClick={fnGhostButton}>
              {nameGhostButton}
            </GhostButton>
            <PrimaryButton w={"full"} onClick={fnPrimaryButton}>
              {namePrimaryButton}
            </PrimaryButton>
          </Stack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
