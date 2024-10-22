export interface Barbeiro {
    id: number;
    nome: string;
    email: string;
    senha: string; // considerar usar um sistema de hash para senhas
    dataCadastro: Date;
    ativo: boolean; // para controle de status
    atualizadoEm: Date;
    image_url: string;  
  }
  