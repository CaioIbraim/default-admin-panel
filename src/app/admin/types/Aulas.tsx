export interface Aula {
    id: number;
    treinamentoId: number;
    titulo: string;
    duracao: number; // em minutos
    videoUrl: string; // URL do vídeo
    criadoEm: Date;
    atualizadoEm: Date;
  }
  