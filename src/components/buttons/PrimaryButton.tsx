import { Button, ButtonProps as ChakraButtonProps } from "@chakra-ui/react";

interface Props extends ChakraButtonProps {
  children: React.ReactNode;
}

export const PrimaryButton = ({ children, ...rest }: Props) => {
  return (
    <Button
      bg="blue.200"
      size="md"
      color="white.100"
      borderRadius={15}
      w={"full"}
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
