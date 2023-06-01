import { Box, Image, Text } from "@chakra-ui/react";

interface Props {
  description: string;
}

export const EmptyTableMessage = ({ description }: Props) => {
  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      w={"full"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Image src="/images/empty_table.svg" alt="empty_table" />
      <Text align={"center"}>{description}</Text>
    </Box>
  );
};
