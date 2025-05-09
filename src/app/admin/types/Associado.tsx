
export interface Associado {
    id?: string;
    nome: string;
    documento: string;
    endereco?: string;
    data_de_nascimento?: Date;
    empresa_id?: string;
    data_admissao_empresa?: Date;
    data_ingresso_sindicato?: Date;
    data_saida_sindicato?: Date;
    pis?: string;
    ctps?: string;
    desconto_em_folha?: boolean;
    foto?: string;
    matricula?: string;
    naturalidade?: string;
    estado_civil?: string;
    cargo_empresa?: string;
    filhos?: boolean;
    quantos_filhos?: number;
    nome_pai?: string;
    nome_mae?: string;
    titulo_eleitor?: string;
    observacao?: string;
    status?:boolean;
  }
  