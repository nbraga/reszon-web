import {
  Divider,
  Flex,
  HStack,
  IconButton,
  Image,
  Stack,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";

import { AiOutlineMenu, AiOutlineShop } from "react-icons/ai";
import { BiCalendarStar } from "react-icons/bi";
import { FiPackage } from "react-icons/fi";
import { HiOutlineUsers } from "react-icons/hi";
import { MdPayments } from "react-icons/md";
import { VscExtensions } from "react-icons/vsc";

import { ResponsiveSidebar } from "./ResponsiveSidebar";
import { SoloButton } from "./SoloButton";

interface Props {
  openDrawerSideBar: boolean;
  setOpenDrawerSideBar: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Sidebar = ({ openDrawerSideBar, setOpenDrawerSideBar }: Props) => {
  const [isBreakPoint] = useMediaQuery("(max-width: 850px)");

  return (
    <Stack
      minH="100vh"
      w={openDrawerSideBar ? "250px" : "75px"}
      bgColor={"black.100"}
      color="white"
      transition="width 0.5s"
    >
      <Flex
        pt={2}
        justifyContent={openDrawerSideBar ? "space-around" : "center"}
        alignItems={"center"}
      >
        {openDrawerSideBar ? (
          <>
            <Image
              w={isBreakPoint ? "90px" : "150px"}
              objectFit={"contain"}
              src="/images/logo/logo-main.svg"
              alt="logo"
            />
            <IconButton
              aria-label="Open"
              background="none"
              _hover={{ background: "none" }}
              icon={<AiOutlineMenu size={25} />}
              onClick={() => {
                if (openDrawerSideBar) setOpenDrawerSideBar(false);
                else setOpenDrawerSideBar(true);
              }}
            />
          </>
        ) : (
          <Image
            my={2}
            objectFit={"contain"}
            boxSize={5}
            src="/images/icon/favicon.png"
            onClick={() => setOpenDrawerSideBar(!openDrawerSideBar)}
          />
        )}
      </Flex>
      <Divider w={"full"} orientation="horizontal" />
      {openDrawerSideBar ? (
        <Stack spacing={0}>
          <SoloButton direction="/payments">
            <HStack align={"center"}>
              <MdPayments size={20} />
              <Text>Pagamentos</Text>
            </HStack>
          </SoloButton>
          <SoloButton direction="/companies">
            <HStack align={"center"}>
              <AiOutlineShop size={20} />
              <Text>Empresas</Text>
            </HStack>
          </SoloButton>
          <SoloButton direction="/users">
            <HStack align={"center"}>
              <HiOutlineUsers size={20} />
              <Text>Usuários</Text>
            </HStack>
          </SoloButton>
          <SoloButton direction="/packages">
            <HStack align={"center"}>
              <FiPackage size={20} />
              <Text>Pacotes</Text>
            </HStack>
          </SoloButton>
          {/*  <SoloButton direction="/nfts">
            <HStack align={"center"}>
              <BiMoney size={20} />
              <Text>NFTs</Text>
            </HStack>
          </SoloButton> */}
          <SoloButton direction="/events">
            <HStack align={"center"}>
              <BiCalendarStar size={20} />
              <Text>Eventos</Text>
            </HStack>
          </SoloButton>
          <SoloButton direction="/extensions">
            <HStack align={"center"}>
              <VscExtensions size={20} />
              <Text>Extensões</Text>
            </HStack>
          </SoloButton>
        </Stack>
      ) : (
        <ResponsiveSidebar />
      )}
    </Stack>
  );
};
