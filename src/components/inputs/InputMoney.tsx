import {
  Input as ChakraInput,
  InputProps as ChakraInputProps,
  FormControl,
  FormErrorMessage,
  Icon,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { ForwardRefRenderFunction, forwardRef } from "react";
import { FieldError } from "react-hook-form";
import { NumericFormat } from "react-number-format";

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
          as={NumericFormat}
          thousandSeparator="."
          decimalSeparator=","
          prefix="R$ "
          decimalScale={2}
          allowNegative={false}
          allowLeadingZeros={false}
          w={"full"}
          pl={10}
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

export const InputMoney = forwardRef(InputBase);
