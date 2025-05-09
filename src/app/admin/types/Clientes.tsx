export interface Cliente {
    id: number;
    nome: string;
    cnpj: string;
    contato: string;
    endereco?: string; // opcional
    criadoEm: Date;
    atualizadoEm: Date;
  }
  