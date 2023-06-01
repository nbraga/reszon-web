import {
  Box,
  Divider,
  HStack,
  IconButton,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { BsTrash } from "react-icons/bs";
import { UserProps } from "../../interfaces/userProps";

interface Props {
  dataTable: UserProps[] | [];
  qtdRows: number;
  currentPage: number;
  onModalDelete: (id: string) => void;
}

export const TableUsersResponsive = ({
  dataTable,
  qtdRows,
  currentPage,
  onModalDelete,
}: Props) => {
  const router = useRouter();
  const [currentItems, setCurrentItems] = useState<UserProps[]>([]);

  useEffect(() => {
    const offset = (currentPage - 1) * qtdRows;

    const getList = (currentPage: number, qtdRows: number) => {
      setCurrentItems(dataTable.slice(offset, offset + qtdRows));
    };

    getList(currentPage, qtdRows);
  }, [currentPage, qtdRows, dataTable]);
  return (
    <Box>
      {currentItems.map((item) => (
        <Stack
          fontSize={"0.8rem"}
          my={5}
          key={item.id}
          p={5}
          bg={"white.100"}
          spacing={5}
        >
          <Box>
            <HStack justifyContent={"space-between"}>
              <Text as={"b"}>Nome</Text>
              <Text>{item.nome}</Text>
            </HStack>
          </Box>
          <Divider />
          <Box>
            <HStack justifyContent={"space-between"}>
              <Text as={"b"}>Email</Text>
              <Text>{item.email}</Text>
            </HStack>
          </Box>
          <Divider />
          <Box>
            <HStack justifyContent={"space-between"}>
              <Text as={"b"}>Celular</Text>
              <Text>{item.contato}</Text>
            </HStack>
          </Box>
          <Divider />
          <Box>
            <HStack justifyContent={"space-between"}>
              <Text as={"b"}>Perfil</Text>
              <Text>{item.perfil}</Text>
            </HStack>
          </Box>
          <Divider />
          <Box>
            <HStack justifyContent={"space-between"}>
              <Text as={"b"}>Ações</Text>

              <Box>
                <IconButton
                  variant={"link"}
                  aria-label="edit"
                  color={"blue.100"}
                  fontSize={20}
                  icon={<AiOutlineEdit />}
                  onClick={() =>
                    router.push({
                      pathname: "/users/edit",
                      query: {
                        idUser: item.id,
                      },
                    })
                  }
                />
                <IconButton
                  variant={"link"}
                  aria-label="trash"
                  color={"red.100"}
                  fontSize={20}
                  icon={<BsTrash />}
                  onClick={() => onModalDelete(item.id || "")}
                />
              </Box>
            </HStack>
          </Box>
          <Divider />
        </Stack>
      ))}
    </Box>
  );
};
