export interface UserProps {
  id?: string;
  id_responsavel?: string;
  primeiro_acesso?: boolean;
  senha?: string;
  email: string;
  contato: string;
  perfil: string;
  nome: string;
  sexo: string;
  cpf: string;
  rg: string;
  data_nascimento: Date;
  cep: string;
  estado: string;
  cidade: string;
  bairro: string;
  endereco: string;
  numero: string;
  complemento?: string;
  created_at?: string;
  updated_at?: string;
}

export interface SignInProps {
  email: string;
  senha: string;
  manter_conectado: boolean;
}

export interface RedefinePasswordProps {
  password: string;
  confirmPassword: string;
}
