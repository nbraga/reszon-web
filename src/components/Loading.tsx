import { Box, Image, Text } from "@chakra-ui/react";

export const Loading = () => {
  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      w={"full"}
      h={"100vh"}
      alignItems={"center"}
      justifyContent={"center"}
      bgImage="url(/images/wave/waves-unauthorized.svg), url(/images/wave/waves-loading-top.svg)"
      bgPosition={"right bottom, left top"}
      bgRepeat={"no-repeat"}
      bgSize="auto, auto"
      bgColor={"white.200"}
    >
      <Image
        objectFit={"contain"}
        boxSize={400}
        src="/images/loading.gif"
        alt="loading"
      />
      <Text>Carregando...</Text>
    </Box>
  );
};
