import {
  FormControl,
  FormErrorMessage,
  InputGroup,
  Input as ChakraInput,
  InputProps as ChakraInputProps,
  InputRightElement,
} from "@chakra-ui/react";
import { forwardRef, ForwardRefRenderFunction } from "react";
import { FieldError } from "react-hook-form";
import { AiOutlineCalendar } from "react-icons/ai";

interface InputProps extends ChakraInputProps {
  nameInput: string;
  label: string;
  error?: FieldError;
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  { label, nameInput, error, ...rest },
  ref
) => {
  return (
    <FormControl isInvalid={!!error}>
      <InputGroup color="gray.100" _focusWithin={{ color: "black.100" }}>
        <InputRightElement ml={5} pointerEvents={"none"}>
          <AiOutlineCalendar />
        </InputRightElement>
        <ChakraInput
          variant="outline"
          type="text"
          name={nameInput}
          id={nameInput}
          placeholder={label}
          focusBorderColor="black.100"
          borderColor="gray.200"
          sx={{
            "&::-webkit-calendar-picker-indicator": {
              opacity: 0,
              right: 2,
              position: "absolute",
            },
          }}
          _placeholder={{
            color: "gray.100",
          }}
          onFocus={(e) => {
            e.target.type = "date";
          }}
          onBlur={(e) => {
            e.target.type = "text";
          }}
          _hover={{
            borderColor: "gray.100",
          }}
          ref={ref}
          {...rest}
        />
      </InputGroup>
      {!!error && <FormErrorMessage>{error.message}</FormErrorMessage>}
    </FormControl>
  );
};

export const InputDate = forwardRef(InputBase);
