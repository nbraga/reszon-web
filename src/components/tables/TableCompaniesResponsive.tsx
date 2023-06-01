import {
  Box,
  Checkbox,
  Divider,
  Grid,
  GridItem,
  HStack,
  IconButton,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { BsTrash } from "react-icons/bs";
import { CompanyProps } from "../../interfaces/companyProps";

interface Props {
  dataTable: CompanyProps[] | [];
  qtdRows: number;
  currentPage: number;
  onModalDelete: (id: string) => void;
}

export const TableCompaniesResponsive = ({
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
              <Checkbox />
            </HStack>
          </Box>
          <Divider />
          <Box>
            <HStack justifyContent={"space-between"}>
              <Text as={"b"}>Nome Fantasia</Text>
              <Text>{item.nome_fantasia}</Text>
            </HStack>
          </Box>
          <Divider />
          <Box>
            <HStack justifyContent={"space-between"}>
              <Text as={"b"}>Celular</Text>
              <Text>{item.telefone}</Text>
            </HStack>
          </Box>
          <Divider />
          <Box>
            <HStack justifyContent={"space-between"}>
              <Text as={"b"}>E-mail</Text>
              <Text>{item.email}</Text>
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
              </Box>
            </HStack>
          </Box>
          <Divider />
        </Stack>
      ))}
    </Box>
  );
};
