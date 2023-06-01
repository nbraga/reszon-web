export const formattedPrice = (value: number) => {
  const priceFormatted = value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  return priceFormatted;
};
