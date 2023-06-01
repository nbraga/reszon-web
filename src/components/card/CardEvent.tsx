import {
  Box,
  Container,
  Divider,
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
  Text,
  Tooltip,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { AiOutlineEdit } from "react-icons/ai";
import { BsTrash } from "react-icons/bs";
import { SlOptionsVertical } from "react-icons/sl";

import { PrimaryButton } from "../buttons/PrimaryButton";
import { GetEventProps } from "../../interfaces/eventProps";

interface Props {
  item: GetEventProps;
  handleChangeDeleteEvent: (id: string) => Promise<void>;
  handleChangeStatus: (id: string, status: boolean) => Promise<void>;
}
export const CardEvent = ({
  item,
  handleChangeDeleteEvent,
  handleChangeStatus,
}: Props) => {
  const router = useRouter();
  return (
    <Container
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
          src={`${process.env.NEXT_PUBLIC_HOST_IMAGES}/${item.url_web}`}
          alt="Imagem Evento"
          borderRadius="lg"
        />
        <Stack mt={5}>
          <Flex justifyContent={"space-between"} alignItems={"center"}>
            <Switch
              pointerEvents={"none"}
              colorScheme={"green"}
              isChecked={item.status}
            />
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
                          idEvent: item.id,
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
                    onClick={() => handleChangeDeleteEvent(item.id)}
                  >
                    Excluir
                  </MenuItem>
                </MenuList>
              </Menu>
            </Box>
          </Flex>

          <Heading size="md">{item.titulo}</Heading>
          <Tooltip hasArrow label={item.descricao} bg="gray.300" color="black">
            <Text noOfLines={2}>{item.descricao}</Text>
          </Tooltip>
        </Stack>
      </Box>

      <Divider my={5} />
      <Box>
        <PrimaryButton
          onClick={() => {
            if (item.status) {
              handleChangeStatus(item.id, false);
            } else {
              handleChangeStatus(item.id, true);
            }
          }}
        >
          {item.status ? "Desativar" : "Ativar"}
        </PrimaryButton>
      </Box>
    </Container>
  );
};
