'use client';

import { useState, useEffect } from 'react';
import { Button, Modal, Table, Input, notification, Typography, Tabs, Card, Select } from 'antd';
import { useParams } from 'next/navigation';
import { supabase } from '../../../lib/supabaseClient';
import { Aluno } from '../../types/Aluno'
const { Title } = Typography;
const { TabPane } = Tabs;



interface Pagamento {
  id?: string;
  aluno_id: string;
  plano_id: string;
  valor_pago: number;
  forma_pagamento: string;
  status: string;
  referencia: Date;
  data_pagamento: Date;
}



const AlunoManagement = () => {
  const { id } = useParams<{ id: string }>();
  const [aluno, setAluno] = useState<Aluno | null>(null);
  const [pagamentos, setPagamentos] = useState<Pagamento[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentPagamento, setCurrentPagamento] = useState<Pagamento | null>(null);
  const [dependenteModalVisible, setDependenteModalVisible] = useState(false);
  

  const fetchAluno = async () => {
    if (id) {
      const { data, error } = await supabase.from('alunos').select('*').eq('id', id).single();
      if (data) {
        setAluno(data);
      } else if (error) {
        console.error('Erro ao buscar aluno:', error.message);
      }
    }
  };

  const fetchPagamentos = async () => {
    if (id) {
      const { data, error } = await supabase.from('pagamentos').select('*, historico_pagamentos ( * )' ).eq('aluno_id', id);
      if (data) {
        setPagamentos(data);
      } else if (error) {
        console.error('Erro ao buscar pagamentos:', error.message);
      }
    }
  };

  
  useEffect(() => {
    fetchAluno();
    fetchPagamentos();
    
  }, [id]);

  const openPagamentoModal = () => {
    setCurrentPagamento({
      id: crypto.randomUUID(),
      aluno_id: id!,
      plano_id: "d8c447ea-c11a-45e6-9339-6f9f7cb6925b",
      valor_pago: 0,
      forma_pagamento: "cartão",
      status: "pendente",
      referencia: new Date(),
      data_pagamento: new Date(),
    });
    setModalVisible(true);
  };

  const closePagamentoModal = () => {
    setModalVisible(false);
  };

  const savePagamento = async () => {
    if (currentPagamento) {
      try {
        const { id, ...pagamentoData } = currentPagamento;

        if (id) {
          const { data, error: fetchError } = await supabase
            .from('pagamentos')
            .select('id')
            .eq('id', id);

          if (data?.length === 0) {
            await supabase
              .from('pagamentos')
              .insert([{ ...pagamentoData, id }]);
          } else {
            await supabase
              .from('pagamentos')
              .update(pagamentoData)
              .eq('id', id);
          }
        }

        notification.success({
          message: 'Pagamento Salvo',
          description: 'Pagamento foi salvo com sucesso.',
        });
        closePagamentoModal();
        fetchPagamentos();
      } catch (error) {
        console.error('Erro ao salvar pagamento:', (error as Error).message);
      }
    }
  };

  const deletePagamento = async (id: string) => {
    try {
      const { error } = await supabase.from('pagamentos').delete().eq('id', id);
      if (error) throw error;

      notification.success({
        message: 'Pagamento Excluído',
        description: 'Pagamento excluído com sucesso.',
      });
      fetchPagamentos();
    } catch (error) {
      console.error('Erro ao excluir pagamento:', (error as Error).message);
    }
  };

  
  const closeDependenteModal = () => {
    setDependenteModalVisible(false);
  };


  const columns = [
    { title: 'Valor', dataIndex: 'valor_pago', key: 'valor_pago', render: (text: number) => `R$ ${text.toFixed(2)}` },
    { title: 'Data do Pagamento', dataIndex: 'data_pagamento', key: 'data_pagamento', render: (text: Date) => new Date(text).toLocaleDateString() },
    { title: 'Observações', dataIndex: 'data_pagamento', key: 'data_pagamento', render: (text: number) => `Pagamento realizado `  },
    { title: 'Motivo', dataIndex: 'historico_pagamentos.0.motivo', key: 'historico_pagamentos.0.motivo', render: (text: string) => text  },
    {
      title: 'Ações',
      key: 'actions',
      render: (text: any, record: Pagamento) => (
        <>
          <Button type="link" danger onClick={() => deletePagamento(record.id!)}>Excluir Pagamento</Button>
        </>
      ),
    },
  ];


  return (
    <div className="mx-auto max-w-4xl p-4">
      <Title level={1} className="text-center mb-5">Infromações do Aluno</Title>

      <Tabs defaultActiveKey="1">
        <TabPane tab="Dados do Aluno" key="1">
          {aluno ? (
            <>

              <Table
                dataSource={[aluno]}
                columns={[
                  { title: 'Foto', dataIndex: 'image_url', key: 'image_url', render: (text: Date) => text ? <img src={`${text}`} className="rounded-full w-1/2"/> : <img src={`${text}`} className="rounded-full w-1/2"/> },
                ]}
                rowKey="id"
                pagination={false}
                className="mt-4 w-1/4"
              />

              <Table
                dataSource={[aluno]}
                columns={[
                  { title: 'Nome', dataIndex: 'nome', key: 'nome' },
                  { title: 'E-mail', dataIndex: 'email', key: 'email' },
                  { title: 'Documento', dataIndex: 'documento', key: 'documento' },
                  { title: 'Endereço', dataIndex: 'endereco', key: 'endereco' },
                ]}
                rowKey="id"
                pagination={false}
                className="mt-4"
              />

            
              <Table
                dataSource={[aluno]}
                columns={[
                  { title: 'Matricula', dataIndex: 'matricula', key: 'matricula', render: (text: Date) => text ? new Date(text).toLocaleDateString() : 'Não informado' },
                  { title: 'Código', dataIndex: 'id', key: 'id' },
                ]}
                rowKey="id"
                pagination={false}
                className="mt-4"
              />

              

              <Table
                dataSource={[aluno]}
                columns={[
                  { title: 'Naturalidade', dataIndex: 'naturalidade', key: 'naturalidade',  render: (text: string) => text ? text : 'Não informado' },
                  { title: 'Estado civil', dataIndex: 'estado_civil', key: 'estado_civil',  render: (text: string) => text ? text : 'Não informado' },

                ]}
                rowKey="id"
                pagination={false}
                className="mt-4"
              />

                  <Table
                    dataSource={[aluno]}
                    columns={[
                      { title: 'Data de Nascimento', dataIndex: 'data_de_nascimento', key: 'data_de_nascimento', render: (text: Date) => text ? new Date(text).toLocaleDateString() : 'Não informado' },
                      
                    ]}
                    rowKey="id"
                    pagination={false}
                    className="mt-4"
                  />


              <Table
                dataSource={[aluno]}
                columns={[
                  { title: 'Nome do pai', dataIndex: 'nome_pai', key: 'nome_pai', render : (text : string) => text ? text : 'Não informado' },
                  { title: 'Nome da mãe', dataIndex: 'nome_mae', key: 'nome_mae', render: (text: string) => text ? text : 'Não informado' },
                ]}
                rowKey="id"
                pagination={false}
                className="mt-4"
              />

              <Table
                dataSource={[aluno]}
                columns={[
                  { title: 'Observação', dataIndex: 'observacao', key: 'observacao', render : (text : string) => text ? text : 'Nenhuma informação lançada' },
                  
                ]}
                rowKey="id"
                pagination={false}
                className="mt-4"
              />



              
            </>
          ) : (
            <p>Carregando aluno...</p>
          )}
        </TabPane>

          

        <TabPane tab="Controle de Pagamentos" key="2">
          <Button type="primary" onClick={openPagamentoModal} className="mb-4">Adicionar Pagamento</Button>
          <Table
            dataSource={pagamentos}
            columns={columns}
            rowKey="id"
            pagination={false}
            scroll={{ x: 'max-content' }}
            className="mt-4"
          />
        </TabPane>

            
      </Tabs>

      <Modal
        title="Lançamento de Pagamentos"
        visible={modalVisible}
        onOk={savePagamento}
        onCancel={closePagamentoModal}
        footer={[
          <Button key="cancel" onClick={closePagamentoModal}>Cancelar</Button>,
          <Button key="submit" type="primary" onClick={savePagamento}>Salvar</Button>,
        ]}
      >
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Valor</label>
          <Input
            type="number"
            value={currentPagamento?.valor_pago ?? 0}
            onChange={(e) => setCurrentPagamento((prev) => ({ ...prev!, valor_pago: parseFloat(e.target.value) }))}
            placeholder="Digite o valor do pagamento"
          />
        </div>


        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Data do Pagamento</label>
          <Input
            value={currentPagamento?.data_pagamento ? new Date(currentPagamento.data_pagamento).toISOString().substring(0, 10) : ''}
            onChange={(e) => setCurrentPagamento((prev) => ({ ...prev!, data_pagamento: new Date(e.target.value) }))}
            type="date"
            placeholder="Digite a data do pagamento"
          />
        </div>


      </Modal>

     
    </div>
  );
};

export default AlunoManagement;
