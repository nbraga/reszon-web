import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Icon,
  Input as ChakraInput,
  InputGroup,
  InputLeftElement,
  InputProps as ChakraInputProps,
  InputRightElement,
} from "@chakra-ui/react";
import { forwardRef, ForwardRefRenderFunction, useState } from "react";
import { FieldError } from "react-hook-form";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";

interface InputProps extends ChakraInputProps {
  label: string;
  nameInput: string;
  error?: FieldError;
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  { label, error, nameInput, ...rest },
  ref
) => {
  const [show, setShow] = useState(false);

  return (
    <FormControl isInvalid={!!error}>
      <InputGroup
        size="md"
        color="gray.100"
        _focusWithin={{ color: "gray.100" }}
      >
        <InputLeftElement h={"full"} pointerEvents="none">
          <Icon as={RiLockPasswordLine} fontSize={20} />
        </InputLeftElement>
        <ChakraInput
          name={nameInput}
          id={nameInput}
          color={"gray.100"}
          focusBorderColor="gray.100"
          borderColor="gray.200"
          bgColor="transparent"
          variant="outline"
          type={show ? "text" : "password"}
          placeholder={label}
          _placeholder={{
            color: "gray.100",
          }}
          ref={ref}
          {...rest}
        />

        <InputRightElement zIndex={0}>
          <Icon
            onClick={() => setShow(!show)}
            as={!show ? AiOutlineEyeInvisible : AiOutlineEye}
            fontSize={20}
          />
        </InputRightElement>
      </InputGroup>

      {!!error && <FormErrorMessage>{error.message}</FormErrorMessage>}
    </FormControl>
  );
};

export const InputPassword = forwardRef(InputBase);
