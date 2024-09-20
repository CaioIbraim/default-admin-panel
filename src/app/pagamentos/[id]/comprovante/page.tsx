'use client';

import { useState, useEffect } from 'react';
import { Button, Card, notification } from 'antd';
import { useParams } from 'next/navigation';
import { supabase } from '../../../../lib/supabaseClient'; // Certifique-se de que este caminho está correto

interface Dependente {
  id?: number;
  associado_id: number;
  nome: string;
  vinculo: string;
}

interface Associado {
  id: string;
  nome: string;
  documento: string;
  endereco?: string;
  data_de_nascimento?: string;
  empresa_id?: string;
  data_admissao_empresa?: Date;
  data_ingresso_sindicato?: Date;
  data_saida_sindicato?: Date;
  pis?: string;
  ctps?: string;
  desconto_em_folha?: boolean;
  foto?: string;
}

interface Pagamento {
  id: string;
  associado_id: string;
  plano_id: string;
  valor_pago: number;
  data_pagamento: Date;
  forma_pagamento: string;
  status: string;
  referencia: Date;
  associados: Associado;
}

const PagamentoManagement = () => {
  const { id } = useParams();
  const [pagamento, setPagamento] = useState<Pagamento | null>(null);
  const [associado, setAssociado] = useState<Associado | null>(null);

  const fetchPagamentoData = async () => {
    const { data, error } = await supabase
      .from('pagamentos')
      .select('*, associados ( * )')
      .eq('id', id)
      .single();

    if (data) {
      setAssociado(data.associados);
      setPagamento(data);
    } else if (error) {
      console.error('Erro ao buscar pagamento:', error.message);
    }
  };

  useEffect(() => {
    fetchPagamentoData();
  }, [id]);

  const sendEmail = () => {
    // Implementar lógica para envio de email
    notification.info({
      message: 'E-mail enviado',
      description: 'O comprovante foi enviado para o e-mail associado.',
    });
  };

  const printComprovante = () => {
    const printWindow = window.open('', '', 'height=600,width=800');
    if (printWindow) {
      printWindow.document.write('<html><head><title>Comprovante de Pagamento</title></head><body>');
      printWindow.document.write('<h1>Comprovante de Pagamento</h1>');
      if (associado) {
        printWindow.document.write(`<h2>Associado: ${associado.nome}</h2>`);
        printWindow.document.write(`<p><strong>Documento:</strong> ${associado.documento}</p>`);
        printWindow.document.write(`<p><strong>Endereço:</strong> ${associado.endereco || 'Não informado'}</p>`);
        printWindow.document.write(`<p><strong>Data de Nascimento:</strong> ${associado.data_de_nascimento ? new Date(associado.data_de_nascimento).toLocaleDateString() : 'Não informado'}</p>`);
        // Adicionar outros dados relevantes aqui
      }
      if (pagamento) {
        printWindow.document.write(`<h3>ID do Pagamento: ${pagamento.id}</h3>`);
        printWindow.document.write(`<p><strong>Valor Pago:</strong> R$${pagamento.valor_pago.toFixed(2)}</p>`);
        printWindow.document.write(`<p><strong>Forma de Pagamento:</strong> ${pagamento.forma_pagamento}</p>`);
        printWindow.document.write(`<p><strong>Data do Pagamento:</strong> ${new Date(pagamento.data_pagamento).toLocaleDateString()}</p>`);
        printWindow.document.write(`<p><strong>Data de Referência:</strong> ${new Date(pagamento.referencia).toLocaleDateString()}</p>`);
      }
      printWindow.document.write('</body></html>');
      printWindow.document.close();
      printWindow.print();
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Detalhes do Pagamento</h1>

      {associado && (
        <Card title="Informações do Associado" bordered={false} style={{ marginBottom: '20px' }}>
          <p><strong>Nome:</strong> {associado.nome}</p>
          <p><strong>Documento:</strong> {associado.documento}</p>
          <p><strong>Endereço:</strong> {associado.endereco || 'Não informado'}</p>
          <p><strong>Data de Nascimento:</strong> {associado.data_de_nascimento ? new Date(associado.data_de_nascimento).toLocaleDateString() : 'Não informado'}</p>
          {associado.empresa_id && <p><strong>ID da Empresa:</strong> {associado.empresa_id}</p>}
          {associado.pis && <p><strong>PIS:</strong> {associado.pis}</p>}
          {associado.ctps && <p><strong>CTPS:</strong> {associado.ctps}</p>}
        </Card>
      )}

      {pagamento && (
        <Card title="Detalhes do Pagamento" bordered={false} style={{ marginBottom: '20px' }}>
          <p><strong>ID do Pagamento:</strong> {pagamento.id}</p>
          <p><strong>Status do Pagamento:</strong> {pagamento.status}</p>
          <p><strong>Valor Pago:</strong> R${pagamento.valor_pago.toFixed(2)}</p>
          <p><strong>Forma de Pagamento:</strong> {pagamento.forma_pagamento}</p>
          <p><strong>Data do Pagamento:</strong> {new Date(pagamento.data_pagamento).toLocaleDateString()}</p>
          <p><strong>Data de Referência:</strong> {new Date(pagamento.referencia).toLocaleDateString()}</p>
        </Card>
      )}

      <div className="flex space-x-4">
        <Button type="default" onClick={printComprovante}>Imprimir Comprovante</Button>
      </div>
    </div>
  );
};

export default PagamentoManagement;
