  export interface Aluno {
    id: number;
    nome: string;
    email: string;
    senha: string; // considerar usar um sistema de hash para senhas
    dataCadastro: Date;
    ativo: boolean; // para controle de status
    atualizadoEm: Date;
  }
  