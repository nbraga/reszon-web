import {
  Box,
  Container,
  Flex,
  Heading,
  IconButton,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  Switch,
} from "@chakra-ui/react";
import router from "next/router";
import { AiOutlineEdit } from "react-icons/ai";
import { BsTrash } from "react-icons/bs";
import { SlOptionsVertical } from "react-icons/sl";
import { ExtensionProps } from "../../interfaces/extensionProps";

const bucket = process.env.NEXT_PUBLIC_HOST_IMAGES;

interface Props {
  extension: ExtensionProps;
  onRemoveExtension: (id: string) => Promise<void>;
}

export const CardExtensions = ({ extension, onRemoveExtension }: Props) => {
  return (
    <Container
      key={extension.id}
      maxW="sm"
      border={"solid 1px"}
      borderRadius={10}
      borderColor={"gray.100"}
      p={2}
    >
      <Box>
        <Image
          w={"full"}
          h={"300px"}
          objectFit={"contain"}
          src={`${bucket}/${extension.url_imagem}`}
          alt="Imagem Evento"
          borderRadius="lg"
        />
        <Stack mt={5}>
          <Flex justifyContent={"space-between"} alignItems={"center"}>
            <Heading size="md">{extension.titulo}</Heading>
            <Stack direction={"row"}>
              <Switch defaultChecked={extension.status} colorScheme={"green"} />
              <Box>
                <Menu>
                  <MenuButton
                    as={IconButton}
                    aria-label="Options"
                    icon={<SlOptionsVertical />}
                    variant="link"
                    color={"blue.100"}
                  />
                  <MenuList>
                    <MenuItem
                      _focus={{ bg: "transparent" }}
                      _hover={{ bg: "gray.300" }}
                      color={"green.100"}
                      icon={<AiOutlineEdit />}
                      onClick={() =>
                        router.push({
                          pathname: "/events/edit",
                          query: {
                            idEvent: 1,
                          },
                        })
                      }
                    >
                      Editar
                    </MenuItem>
                    <MenuItem
                      _focus={{ bg: "transparent" }}
                      _hover={{ bg: "gray.300" }}
                      color={"red.100"}
                      icon={<BsTrash />}
                      onClick={() => onRemoveExtension(extension.id)}
                    >
                      Excluir
                    </MenuItem>
                  </MenuList>
                </Menu>
              </Box>
            </Stack>
          </Flex>
        </Stack>
      </Box>
    </Container>
  );
};
