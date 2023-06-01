import {
  Box,
  Divider,
  Grid,
  GridItem,
  HStack,
  IconButton,
  Stack,
  Switch,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
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

export const TablePackagesResponsive = ({
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
              <Text as={"b"}>Título</Text>
              <Text>{item.titulo}</Text>
            </HStack>
          </Box>
          <Divider />
          <Box>
            <HStack justifyContent={"space-between"}>
              <Text as={"b"}>Descrição</Text>
              <Text>{item.descricao}</Text>
            </HStack>
          </Box>
          <Divider />
          <Box>
            <HStack justifyContent={"space-between"}>
              <Text as={"b"}>Valor</Text>
              <Text>{item.valor_pacote}</Text>
            </HStack>
          </Box>
          <Divider />
          <Box>
            <HStack justifyContent={"space-between"}>
              <Text as={"b"}>Status</Text>
              <Switch
                isChecked={item.status}
                colorScheme={"green"}
                id={item.id}
                onChange={(e) =>
                  updateStatusPackage(e.target.id, e.target.checked)
                }
              />
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
              </Box>
            </HStack>
          </Box>
          <Divider />
        </Stack>
      ))}
    </Box>
  );
};
