import {
  FormControl,
  FormErrorMessage,
  Icon,
  Input as ChakraInput,
  InputGroup,
  InputLeftElement,
  InputProps as ChakraInputProps,
  InputRightElement,
} from "@chakra-ui/react";
import { forwardRef, ForwardRefRenderFunction } from "react";
import { FieldError } from "react-hook-form";
import { AiOutlineSearch } from "react-icons/ai";

interface InputProps extends ChakraInputProps {
  label: string;
  nameInput: string;
  error?: FieldError;
  icon?: React.ComponentType;
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  { label, error, icon, nameInput, ...rest },
  ref
) => {
  return (
    <FormControl isInvalid={!!error}>
      <InputGroup
        size="md"
        color="gray.100"
        _focusWithin={{ color: "gray.100" }}
      >
        <ChakraInput
          w={"full"}
          color={"black.100"}
          focusBorderColor="blue.100"
          variant="outline"
          name={nameInput}
          id={nameInput}
          placeholder={label}
          _placeholder={{
            color: "gray.100",
          }}
          ref={ref}
          {...rest}
        />
        <InputRightElement zIndex={0} cursor={"pointer"} h={"full"}>
          <Icon as={AiOutlineSearch} fontSize={20} />
        </InputRightElement>
      </InputGroup>
    </FormControl>
  );
};

export const InputSearch = forwardRef(InputBase);
