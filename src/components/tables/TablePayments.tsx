import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tooltip,
  Tr,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { ResponsePaymentsProps } from "../../interfaces/paymentsProps";
import { formattedDate } from "../../utils/utilsDate";
import { formattedPrice } from "../../utils/utilsPrice";

interface Props {
  dataTable: ResponsePaymentsProps[] | [];
  qtdRows: number;
  currentPage: number;
}

export const TablePayments = ({ dataTable, qtdRows, currentPage }: Props) => {
  const [currentItems, setCurrentItems] = useState<ResponsePaymentsProps[]>([]);

  useEffect(() => {
    const offset = (currentPage - 1) * qtdRows;

    const getList = (currentPage: number, qtdRows: number) => {
      setCurrentItems(dataTable.slice(offset, offset + qtdRows));
    };

    getList(currentPage, qtdRows);
  }, [currentPage, qtdRows, dataTable]);

  return (
    <TableContainer border={"1px solid"} borderColor={"gray.200"}>
      <Table size={"md"} variant="unstyled">
        <Thead borderBottom={"1px solid"} borderColor={"gray.200"}>
          <Tr>
            <Th textTransform={"capitalize"}>Empresa</Th>
            <Th textTransform={"capitalize"}>Pacote</Th>
            <Th textTransform={"capitalize"}>Data/Hora do Pagamento</Th>
            <Th textTransform={"capitalize"}>Meio de Pagamento</Th>
            <Th textTransform={"capitalize"}>Tipo de Pagamento</Th>
            <Th textTransform={"capitalize"}>Código do Promotor</Th>
            <Th textTransform={"capitalize"}>Valor</Th>
            <Th textTransform={"capitalize"}>Status</Th>
            {/*  <Th textTransform={"capitalize"}>Ações</Th> */}
          </Tr>
        </Thead>

        <Tbody fontSize={"0.8rem"}>
          {currentItems.map((item) => (
            <Tr
              key={item._id}
              borderBottom={"1px solid"}
              borderColor={"gray.200"}
            >
              <Tooltip
                hasArrow
                label={item.company ? item.company.profile.fantasyName : ""}
                bg="gray.300"
                color="black.100"
              >
                <Td textTransform={"capitalize"} maxW={150} overflow={"hidden"}>
                  {item.company
                    ? item.company.profile.fantasyName.toLowerCase()
                    : ""}
                </Td>
              </Tooltip>
              <Td color={item.package ? "black.100" : "red.100"}>
                {item.package ? item.package.title : "Não cadastrado"}
              </Td>
              <Td>{formattedDate(item.date)}</Td>
              <Td>{item.paymentMethod}</Td>
              <Td>{item.paymentType}</Td>
              <Td>{item.promoterCode}</Td>
              <Td>{formattedPrice(item.value)}</Td>
              <Td color={item.status === true ? "green.100" : "red.100"}>
                {item.status === true ? "Pago" : "Pendente"}
              </Td>
              {/*  <Td>
                <BiLinkExternal size={20} />
              </Td> */}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};
