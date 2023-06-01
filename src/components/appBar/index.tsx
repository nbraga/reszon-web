import {
  Box,
  Button,
  Flex,
  IconButton,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useContext } from "react";

import { AiOutlineMenu } from "react-icons/ai";
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";
import { AuthContext } from "../../contexts/AuthContext";

interface Props {
  openDrawerAppBar: boolean;
  setOpenDrawerAppBar: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AppBar = ({ openDrawerAppBar, setOpenDrawerAppBar }: Props) => {
  const router = useRouter();
  const { signOut, user } = useContext(AuthContext);

  return (
    <Flex
      w={"full"}
      justifyContent={"space-between"}
      alignItems={"center"}
      borderBottom="solid 1px"
      borderColor={"gray.300"}
      h={14}
    >
      <Box>
        {!openDrawerAppBar && (
          <IconButton
            onClick={() => setOpenDrawerAppBar(!openDrawerAppBar)}
            colorScheme="none"
            aria-label="Open Menu"
            icon={<AiOutlineMenu color="black" size={25} />}
          />
        )}
      </Box>

      <Stack mx={"30px"} alignItems={"center"} direction={"row"}>
        <Text fontWeight={"bold"}>{user.nome}</Text>
        <Box>
          <Menu>
            {({ isOpen }) => (
              <>
                <MenuButton
                  isActive={isOpen}
                  bg={"none"}
                  _hover={{
                    bg: "none",
                  }}
                  _active={{
                    bg: "none",
                  }}
                  as={Button}
                  rightIcon={
                    isOpen ? <TiArrowSortedUp /> : <TiArrowSortedDown />
                  }
                >
                  <Image
                    src="/images/icon/icon-profile.svg"
                    alt="icon-profile"
                  />
                </MenuButton>
                <MenuList>
                  <MenuItem
                    _hover={{ bg: "none" }}
                    _focus={{
                      bg: "none",
                    }}
                    onClick={() => router.push("/redefine-password")}
                  >
                    Alterar minha senha
                  </MenuItem>
                  <MenuItem
                    _hover={{ bg: "none" }}
                    _focus={{
                      bg: "none",
                    }}
                    onClick={signOut}
                  >
                    Sair
                  </MenuItem>
                </MenuList>
              </>
            )}
          </Menu>
        </Box>
      </Stack>
    </Flex>
  );
};
