import {Associado} from './Associado'
export interface Pagamento {
  id: string;
  associado_id: string;
  plano_id: string;
  valor_pago: number;
  data_pagamento: Date;
  forma_pagamento: string;
  status: string;
  referencia: Date;
  associados?: Associado;
}