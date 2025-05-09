export interface Pagamento {
  id: number;
  alunoId: number;
  cursoId: number;
  valor: number;
  dataPagamento: Date;
  status: 'pendente' | 'concluído'; // enum para status
}


