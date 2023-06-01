export interface EventProps {
  titulo: string;
  descricao: string;
  link: string;
  data_inicio: Date;
  data_fim: Date;
  url_mobile: string;
  url_web: string;
  url_termos: string;
}

export interface GetEventProps {
  created_at: string;
  data_fim: string;
  data_inicio: string;
  descricao: string;
  id: string;
  link: string;
  status: boolean;
  titulo: string;
  updated_at: string;
  url_mobile: string;
  url_termos: string;
  url_web: string;
}

export interface CreateEventProps {
  titulo: string;
  descricao: string;
  link: string;
  data_inicio: string;
  data_fim: string;
  img_weg: File;
  img_mobile: File;
  termos: File;
}
