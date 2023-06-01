import {
  IconButton,
  Switch,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { BsTrash } from "react-icons/bs";
import { PackageProps } from "../../interfaces/packageProps";
import { formattedPrice } from "../../utils/utilsPrice";

interface Props {
  dataTable: PackageProps[] | [];
  qtdRows: number;
  currentPage: number;
  updateStatusPackage: (id: string, status: boolean) => Promise<void>;
  onModalDelete: (id: string) => void;
}

export const TablePackages = ({
  dataTable,
  qtdRows,
  currentPage,
  updateStatusPackage,
  onModalDelete,
}: Props) => {
  const router = useRouter();

  const [currentItems, setCurrentItems] = useState<PackageProps[]>([]);

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
            <Th textTransform={"capitalize"}>Título</Th>
            <Th textTransform={"capitalize"}>Descrição</Th>
            <Th textTransform={"capitalize"}>Valor</Th>
            <Th textTransform={"capitalize"}>Status</Th>
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
              <Td>{item.titulo}</Td>
              <Td>
                <Text whiteSpace={"pre-wrap"}>{item.descricao}</Text>
              </Td>
              <Td>{item.valor_pacote}</Td>
              <Td>
                <Switch
                  isChecked={item.status}
                  colorScheme={"green"}
                  id={item.id}
                  onChange={(e) =>
                    updateStatusPackage(e.target.id, e.target.checked)
                  }
                />
              </Td>
              <Td display={"flex"} gap={2}>
                <IconButton
                  variant={"link"}
                  aria-label="edit"
                  color={"blue.100"}
                  fontSize={20}
                  icon={<AiOutlineEdit />}
                  onClick={() =>
                    router.push({
                      pathname: "/packages/edit",
                      query: {
                        idPackage: item.id,
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
