import { Button } from "@chakra-ui/react";

interface PaginationItem {
  number: number;
  isCurrent: boolean;
  onChangeNumber: (value: number) => void;
}

export function PaginationItem({
  isCurrent = false,
  number,
  onChangeNumber,
}: PaginationItem) {
  if (isCurrent) {
    return (
      <Button
        onClick={() => onChangeNumber(number)}
        bg="gray.200"
        size={"xs"}
        color="black.100"
        _hover={{
          bg: "blue.500",
          color: "black.100",
        }}
      >
        {number}
      </Button>
    );
  }

  return (
    <Button
      onClick={() => onChangeNumber(number)}
      bg="none"
      size={"xs"}
      color="black.100"
      _hover={{
        bg: "blue.500",
        color: "black.100",
      }}
      _active={{
        bg: "blue.500",
        color: "black.100",
      }}
    >
      {number}
    </Button>
  );
}
