export interface Feedback {
    id: number;
    cursoId: number;
    alunoId: number;
    nota: number; // de 1 a 5
    comentario?: string; // opcional
    dataFeedback: Date;
  }
  