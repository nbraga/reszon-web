import { Button, ButtonProps } from "@chakra-ui/react";

interface Props extends ButtonProps {
  children: React.ReactNode;
}

export const LinkButton = ({ children, ...rest }: Props) => {
  return (
    <Button
      variant={"link"}
      color="black.100"
      size="md"
      w={"full"}
      _hover={{
        textDecoration: "none",
      }}
      {...rest}
    >
      {children}
    </Button>
  );
};
