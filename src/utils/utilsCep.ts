import axios from "axios";

export const searchCEP = async (cep: string) => {
  cep = cep.replace(/[.\s-]+/g, "");
  const options = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };
  const res = await axios.get(`https://viacep.com.br/ws/${cep}/json`, options);

  return res;
};
