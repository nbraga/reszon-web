import {
  BoxProps,
  InputProps as ChakraInputProps,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import ptBR from "date-fns/locale/pt-BR";
import { ForwardRefRenderFunction, forwardRef } from "react";
import ReactDatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FieldError } from "react-hook-form";
import { MdCalendarToday } from "react-icons/md";
import InputMask from "react-input-mask";
registerLocale("ptBR", ptBR);

interface Props extends BoxProps {
  title: string;
  onChangeDate: (date: Date) => void;
  error?: FieldError;
}

interface DatePickerProps {
  title: string;
  isClearable?: boolean;
  onChange: (date: Date) => any;
  selectedDate: Date | undefined;
  showPopperArrow?: boolean;
}

interface InputProps extends ChakraInputProps {
  error?: FieldError;
}

const customDateInput: ForwardRefRenderFunction<
  HTMLInputElement,
  InputProps
> = ({ value, onClick, onChange, title }, ref) => (
  <InputGroup
    borderWidth={2}
    borderColor="gray.200"
    borderRadius={6}
    overflow="hidden"
    color="gray.100"
    display="flex"
    flexDir="row"
    alignItems="center"
    _focusWithin={{ color: "blue.100", borderColor: "blue.100" }}
    p={2}
  >
    <Input
      as={InputMask}
      mask="99/99/9999"
      autoComplete=""
      autoFocus={false}
      px={0}
      value={value}
      ref={ref}
      placeholder={title}
      onClick={onClick}
      onChange={onChange}
      cursor="pointer"
      variant="unstyled"
      _placeholder={{
        color: "gray.100",
      }}
    />
    <InputRightElement>
      <IconButton
        //@ts-ignore
        onClick={onClick}
        color={"black.100"}
        variant={"link"}
        aria-label="icon"
        icon={<MdCalendarToday size={20} />}
      />
    </InputRightElement>
  </InputGroup>
);

const CustomInput = forwardRef(customDateInput);

export const DatePicker = ({
  title,
  selectedDate,
  onChange,
  ...props
}: DatePickerProps) => {
  return (
    <ReactDatePicker
      selected={selectedDate}
      onChange={onChange}
      title={title}
      className="react-datapicker__input-text"
      customInput={<CustomInput />}
      dateFormat="dd/MM/yyyy"
      locale={ptBR}
      {...props}
    />
  );
};
