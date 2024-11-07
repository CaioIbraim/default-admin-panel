export interface Curso {
    id: number;
    titulo: string;
    descricao: string;
    carga_horaria: number;
    categoria: string; // para classificação
    criado_em: Date;
    atualizado_em: Date;
    banner_url : string;
  }
  