import {
  IconButton,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
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
  typeUser: String;
}

export const TableUsers = ({
  dataTable,
  qtdRows,
  currentPage,
  onModalDelete,
  typeUser,
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
    <TableContainer border={"1px solid"} borderColor={"gray.200"}>
      <Table variant="unstyled">
        <Thead borderBottom={"1px solid"} borderColor={"gray.200"}>
          <Tr>
            <Th textTransform={"capitalize"}>Nome</Th>
            <Th textTransform={"capitalize"}>E-mail</Th>
            <Th textTransform={"capitalize"}>Celular</Th>
            <Th textTransform={"capitalize"}>Perfil</Th>
            <Th textTransform={"capitalize"}>Ações</Th>
          </Tr>
        </Thead>

        <Tbody>
          {currentItems.map((item) => (
            <Tr
              key={item.id}
              borderBottom={"1px solid"}
              borderColor={"gray.200"}
            >
              <Td>{item.nome}</Td>
              <Td>{item.email}</Td>
              <Td>{item.contato}</Td>
              <Td>{item.perfil}</Td>
              <Td
                display={"flex"}
                hidden={
                  typeUser === "admin" && item.email === "admin@reszon.com.br"
                }
                gap={2}
              >
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
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};
