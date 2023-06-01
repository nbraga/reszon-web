import {
  Checkbox,
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
import { useState, useEffect } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { BsTrash } from "react-icons/bs";
import { CompanyProps } from "../../interfaces/companyProps";

interface Props {
  dataTable: CompanyProps[] | [];
  qtdRows: number;
  currentPage: number;
  onModalDelete: (id: string) => void;
}

export const TableCompanies = ({
  dataTable,
  qtdRows,
  currentPage,
  onModalDelete,
}: Props) => {
  const router = useRouter();

  const [currentItems, setCurrentItems] = useState<CompanyProps[]>([]);

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
            <Th />
            <Th textTransform={"capitalize"}>Nome Fantasia</Th>
            <Th textTransform={"capitalize"}>Telefone</Th>
            <Th textTransform={"capitalize"}>E-mail</Th>
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
              <Td>
                <Checkbox colorScheme={"green"} />
              </Td>
              <Td>{item.nome_fantasia}</Td>
              <Td>{item.telefone}</Td>
              <Td>{item.email}</Td>
              <Td display={"flex"} gap={2}>
                <IconButton
                  variant={"link"}
                  aria-label="edit"
                  color={"blue.100"}
                  fontSize={20}
                  icon={<AiOutlineEdit />}
                  onClick={() =>
                    router.push({
                      pathname: "/companies/edit",
                      query: {
                        idCompany: item.id,
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
                  onClick={() => onModalDelete(item.id)}
                />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};
