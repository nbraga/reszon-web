import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Icon,
  Input as ChakraInput,
  InputGroup,
  InputLeftElement,
  InputProps as ChakraInputProps,
} from "@chakra-ui/react";
import { forwardRef, ForwardRefRenderFunction } from "react";
import { FieldError } from "react-hook-form";

import InputMask from "react-input-mask";

interface InputProps extends ChakraInputProps {
  nameInput: string;
  label: string;
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
          as={InputMask}
          mask="(99) 99999-9999"
          maskChar={null}
          size={"md"}
          w={"full"}
          focusBorderColor="gray.100"
          variant="outline"
          placeholder={label}
          _placeholder={{
            color: "gray.100",
          }}
          name={nameInput}
          id={nameInput}
          ref={ref}
          {...rest}
        />
      </InputGroup>
      {!!error && <FormErrorMessage>{error.message}</FormErrorMessage>}
    </FormControl>
  );
};

export const InputPhone = forwardRef(InputBase);
