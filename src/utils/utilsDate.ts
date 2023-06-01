import { addDays, format } from "date-fns";

export const formattedDate = (date: string) => {
  const dateFormatted = format(new Date(date), "dd/MM/yyyy HH:mm");

  return dateFormatted;
};

export const formattedOnlyDate = (date: string) => {
  const dateFormatted = format(new Date(date), "dd/MM/yyyy");

  return dateFormatted;
};
