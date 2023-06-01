import { Button, ButtonProps } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { ReactNode } from "react";

interface Props extends ButtonProps {
  children: ReactNode;
  direction: string;
}

export const SoloButton = ({ children, direction, ...rest }: Props) => {
  const router = useRouter();

  return (
    <>
      <Button
        variant={"link"}
        p={3}
        justifyContent={"start"}
        borderRadius={0}
        fontWeight={"normal"}
        borderLeft={router.asPath.match(direction) ? "5px solid" : ""}
        borderColor={
          router.asPath.match(direction) ? "purple.300" : "black.100"
        }
        bg={router.asPath.match(direction) ? "black.100" : "black.100"}
        color={router.asPath.match(direction) ? "purple.300" : "white.100"}
        _hover={{
          textDecoration: "none",
        }}
        {...rest}
        onClick={() => router.push(direction)}
      >
        {children}
      </Button>
    </>
  );
};
