import { Box, useMediaQuery } from "@chakra-ui/react";
import React, { useState } from "react";

import { AppBar } from "../../components/appBar";
import { Sidebar } from "../../components/sideBar";
import { DrawerSidebar } from "../../components/sideBar/DrawerSidebar";

interface Props {
  children: React.ReactNode;
}

export const LayoutAdmin = ({ children }: Props) => {
  const [isBreakPoint] = useMediaQuery("(max-width: 850px)");
  const [openDrawer, setOpenDrawer] = useState(false);

  return (
    <Box display={"flex"}>
      {isBreakPoint ? (
        <DrawerSidebar
          openDrawerSideBar={openDrawer}
          setOpenDrawerSideBar={setOpenDrawer}
        />
      ) : (
        <Sidebar
          openDrawerSideBar={openDrawer}
          setOpenDrawerSideBar={setOpenDrawer}
        />
      )}

      <Box w={"full"}>
        <AppBar
          openDrawerAppBar={openDrawer}
          setOpenDrawerAppBar={setOpenDrawer}
        />
        <Box bgColor={"gray.500"} minH={"100vh"} p={5}>
          {children}
        </Box>
      </Box>
    </Box>
  );
};
