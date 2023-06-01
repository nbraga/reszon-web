import {
  useDisclosure,
  RadioGroup,
  Stack,
  Radio,
  Button,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  IconButton,
  HStack,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { AiOutlineMenu, AiOutlineShop } from "react-icons/ai";
import { BiMoney, BiCalendarStar } from "react-icons/bi";
import { FiPackage } from "react-icons/fi";
import { HiOutlineUsers } from "react-icons/hi";
import { MdPayments } from "react-icons/md";
import { SoloButton } from "./SoloButton";

interface Props {
  openDrawerSideBar: boolean;
  setOpenDrawerSideBar: React.Dispatch<React.SetStateAction<boolean>>;
}

export const DrawerSidebar = ({
  openDrawerSideBar,
  setOpenDrawerSideBar,
}: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Drawer placement={"left"} onClose={onClose} isOpen={openDrawerSideBar}>
      <DrawerOverlay />
      <DrawerContent bgColor={"black.100"}>
        <DrawerHeader>
          <IconButton
            onClick={() => setOpenDrawerSideBar(!openDrawerSideBar)}
            colorScheme="none"
            aria-label="Open Menu"
            icon={<AiOutlineMenu color="white" size={25} />}
          />
        </DrawerHeader>
        <DrawerBody>
          <Stack w={"full"} spacing={5}>
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
            {/*    <SoloButton direction="/nfts">
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
          </Stack>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};
