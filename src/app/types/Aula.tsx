export interface Aula {
    id: number;
    treinamento_id: number;
    curso_id: number;
    titulo: string;
    duracao: number; // em minutos
    video_url: string; // URL do vídeo
    criado_em: Date;
    atualizado_em: Date;
    texto: string;
    thumbnail: string;
  }
  