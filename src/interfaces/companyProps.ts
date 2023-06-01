export interface CompanyProps {
  id: string;
  nome_fantasia: string;
  cnpj: string;
  site: string;
  localizacao: string;
  telefone: string;
  email: string;
  cnaes: string;
  pacote: string;
  natureza_legal: string;
  forma_pagamento: string;
  cep: string;
  numero: string;
  endereco: string;
  bairro: string;
  cidade: string;
  estado: string;
  complemento?: string;
  created_at: string;
  updated_at: string;
}

export interface CreateCompanyProps {
  nome_fantasia: string;
  cnpj: string;
  site: string;
  localizacao: string;
  telefone: string;
  email: string;
  cnaes: string;
  pacote: string;
  natureza_legal: string;
  forma_pagamento: string;
  cep: string;
  numero: string;
  endereco: string;
  bairro: string;
  cidade: string;
  estado: string;
  complemento?: string;
}
