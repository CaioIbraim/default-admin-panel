export interface Curso {
    id: number;
    titulo: string;
    descricao: string;
    cargaHoraria: number;
    categoria: string; // para classificação
    criadoEm: Date;
    atualizadoEm: Date;
  }
  