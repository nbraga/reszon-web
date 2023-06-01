import { Box, Divider, HStack, Stack, Text, Tooltip } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { ResponsePaymentsProps } from "../../interfaces/paymentsProps";
import { formattedDate } from "../../utils/utilsDate";

interface Props {
  dataTable: ResponsePaymentsProps[] | [];
  qtdRows: number;
  currentPage: number;
}

export const TablePaymentsResponsive = ({
  dataTable,
  qtdRows,
  currentPage,
}: Props) => {
  const [currentItems, setCurrentItems] = useState<ResponsePaymentsProps[]>([]);

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
          key={item._id}
          p={5}
          bg={"white.100"}
          spacing={5}
        >
          <Box>
            <HStack justifyContent={"space-between"}>
              <Text as={"b"}>Empresa</Text>
              <Tooltip
                hasArrow
                label={item.company ? item.company.profile.fantasyName : ""}
                bg="gray.300"
                color="black.100"
              >
                <Text textTransform={"capitalize"}>
                  {item.company
                    ? item.company.profile.fantasyName.toLowerCase()
                    : ""}
                </Text>
              </Tooltip>
            </HStack>
          </Box>
          <Divider />
          <Box>
            <HStack justifyContent={"space-between"}>
              <Text as={"b"} color={item.package ? "black.100" : "red.100"}>
                Pacote
              </Text>
              <Text>
                {item.package ? item.package.title : "Não cadastrado"}
              </Text>
            </HStack>
          </Box>
          <Divider />
          <Box>
            <HStack justifyContent={"space-between"}>
              <Text as={"b"}>Data/Hora do Pagamento</Text>
              <Text>{formattedDate(item.date)}</Text>
            </HStack>
          </Box>
          <Divider />
          <Box>
            <HStack justifyContent={"space-between"}>
              <Text as={"b"}>Meio de Pagamento</Text>
              <Text>{item.paymentMethod}</Text>
            </HStack>
          </Box>
          <Divider />
          <Box>
            <HStack justifyContent={"space-between"}>
              <Text as={"b"}>Tipo de Pagamento</Text>
              <Text>{item.paymentType}</Text>
            </HStack>
          </Box>
          <Divider />
          <Box>
            <HStack justifyContent={"space-between"}>
              <Text as={"b"}>Código do Promotor</Text>
              <Text>{item.promoterCode}</Text>
            </HStack>
          </Box>
          <Divider />
          <Box>
            <HStack justifyContent={"space-between"}>
              <Text as={"b"}>Valor</Text>
              <Text>R$ 0,00</Text>
            </HStack>
          </Box>
          <Divider />
          <Box>
            <HStack justifyContent={"space-between"}>
              <Text as={"b"}>Status</Text>
              <Text color={item.status === true ? "green.100" : "red.100"}>
                {item.status === true ? "Pago" : "Pendente"}
              </Text>
            </HStack>
          </Box>
        </Stack>
      ))}
    </Box>
  );
};

{
  /*   <GridItem>
   <HStack justifyContent={"space-between"}>
     <Text as={"b"}>Ações</Text>
     <BiLinkExternal size={20} />
   </HStack>
 </GridItem>
 <Divider /> */
}
