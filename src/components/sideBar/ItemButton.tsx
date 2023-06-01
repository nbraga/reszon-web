import { Button, ButtonProps, textDecoration } from "@chakra-ui/react";
import { ReactNode } from "react";
import { useRouter } from "next/router";

interface Props extends ButtonProps {
  children: ReactNode;
  direction: string;
}

export const ItemButton = ({ children, direction, ...rest }: Props) => {
  const router = useRouter();

  return (
    <Button
      variant={"link"}
      p={3}
      w={"full"}
      fontWeight={"normal"}
      borderRadius={"none"}
      justifyContent={"start"}
      bg={router.asPath.match(direction) ? "blue.400" : "black.100"}
      color={router.asPath.match(direction) ? "black.100" : "white.100"}
      onClick={() => router.push(direction)}
      _hover={{
        textDecoration: "none",
      }}
      {...rest}
    >
      {children}
    </Button>
  );
};
