import {
  FormControl,
  FormErrorMessage,
  Icon,
  Input as ChakraInput,
  InputGroup,
  InputLeftElement,
  InputProps as ChakraInputProps,
} from "@chakra-ui/react";
import { forwardRef, ForwardRefRenderFunction } from "react";
import { FieldError } from "react-hook-form";

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
        {icon && (
          <InputLeftElement zIndex={0} h={"full"} pointerEvents="none">
            <Icon as={icon} fontSize={20} />
          </InputLeftElement>
        )}
        <ChakraInput
          w={"full"}
          color={"gray.100"}
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
      </InputGroup>
      {!!error && <FormErrorMessage>{error.message}</FormErrorMessage>}
    </FormControl>
  );
};

export const InputDefault = forwardRef(InputBase);
