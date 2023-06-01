import { Stack } from "@chakra-ui/react";
import { AiOutlineShop } from "react-icons/ai";
import { BiCalendarStar, BiMoney } from "react-icons/bi";
import { FiPackage } from "react-icons/fi";
import { HiOutlineUsers } from "react-icons/hi";
import { MdPayments } from "react-icons/md";
import { VscExtensions } from "react-icons/vsc";
import { SoloButton } from "./SoloButton";

export const ResponsiveSidebar = () => {
  return (
    <Stack spacing={0}>
      <SoloButton justifyContent={"center"} direction="/payments">
        <MdPayments />
      </SoloButton>
      <SoloButton justifyContent={"center"} direction="/companies">
        <AiOutlineShop />
      </SoloButton>
      <SoloButton justifyContent={"center"} direction="/users">
        <HiOutlineUsers />
      </SoloButton>
      <SoloButton justifyContent={"center"} direction="/packages">
        <FiPackage />
      </SoloButton>

      {/*   <SoloButton justifyContent={"center"} direction="/nfts">
        <BiMoney />
      </SoloButton> */}
      <SoloButton justifyContent={"center"} direction="/events">
        <BiCalendarStar />
      </SoloButton>
      <SoloButton justifyContent={"center"} direction="/extensions">
        <VscExtensions />
      </SoloButton>
    </Stack>
  );
};
