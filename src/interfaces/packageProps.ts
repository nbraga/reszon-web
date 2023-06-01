export interface PackageProps {
  id?: string;
  created_at?: string;
  updated_at?: string;
  status?: boolean;
  url_contrato?: string;
  titulo: string;
  descricao: string;
  url_pagamento: string;
  valor_pacote: string;
  periodo: string;
  contrato: File;
  valor_panfleto: string;
  numero_panfleto: number;
  limite_panfleto: number;
  limite_cupons: number;
  limite_hotpromos: number;
}
