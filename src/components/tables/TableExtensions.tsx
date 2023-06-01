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
import {
  AiOutlineCheck,
  AiOutlineCloseCircle,
  AiOutlineEdit,
} from "react-icons/ai";
import { BsTrash } from "react-icons/bs";
import { CompanyProps } from "../../interfaces/companyProps";

interface Props {
  // dataTable: CompanyProps[] | [];
  // qtdRows: number;
  // currentPage: number;
  isBreakPoint: boolean;
}

export const TableExtensions = ({
  // dataTable,
  // qtdRows,
  // currentPage,
  isBreakPoint,
}: Props) => {
  const router = useRouter();
  const active = true;

  /*   const [currentItems, setCurrentItems] = useState<CompanyProps[]>([]);

  useEffect(() => {
    const offset = (currentPage - 1) * qtdRows;

    const getList = (currentPage: number, qtdRows: number) => {
      setCurrentItems(dataTable.slice(offset, offset + qtdRows));
    };

    getList(currentPage, qtdRows);
  }, [currentPage, qtdRows, dataTable]) */ return (
    <TableContainer border={"1px solid"} borderColor={"gray.200"}>
      <Table variant="unstyled">
        <Thead borderBottom={"1px solid"} borderColor={"gray.200"}>
          <Tr>
            <Th />
            <Th textTransform={"capitalize"}>Empresas</Th>
            <Th textTransform={"capitalize"}>Contato</Th>
            <Th textTransform={"capitalize"}>Email</Th>
            <Th textTransform={"capitalize"}>Status selo</Th>
          </Tr>
        </Thead>

        <Tbody>
          <Tr borderBottom={"1px solid"} borderColor={"gray.200"}>
            <Td>
              <Checkbox colorScheme={"green"} />
            </Td>
            <Td>Suplementos LTDA</Td>
            <Td>92 90000-0000</Td>
            <Td>suplementos@gmail.com</Td>
            <Td fontSize={25} color={active ? "green.100" : "red.100"}>
              {active ? <AiOutlineCheck /> : <AiOutlineCloseCircle />}
            </Td>
          </Tr>
        </Tbody>
      </Table>
    </TableContainer>
  );
};
