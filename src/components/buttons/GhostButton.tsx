import { Button, ButtonProps } from "@chakra-ui/react";

interface Props extends ButtonProps {
  children: React.ReactNode;
}

export const GhostButton = ({ children, ...rest }: Props) => {
  return (
    <Button
      variant="ghost"
      size="md"
      color="blue.200"
      border="solid 1px"
      borderColor="blue.100"
      _hover={{
        bg: "blue.300",
        color: "white.100",
      }}
      {...rest}
    >
      {children}
    </Button>
  );
};
