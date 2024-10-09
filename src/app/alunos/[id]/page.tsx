'use client';

import { useState, useEffect } from 'react';
import { Button, Modal, Table, Input, notification, Typography, Tabs, Card, Select } from 'antd';
import { useParams } from 'next/navigation';
import { supabase } from '../../../lib/supabaseClient';

const { Title } = Typography;
const { TabPane } = Tabs;

interface Empresa {
  id: string;
  nome: string;
  cnpj: string;
  endereco: string;
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
  id?: string;
  associado_id: string;
  plano_id: string;
  valor_pago: number;
  forma_pagamento: string;
  status: string;
  referencia: Date;
  data_pagamento: Date;
}

interface Dependente {
  id?: string;
  associado_id: string;
  nome: string;
  vinculo: string;
  documento: string;
  data_de_nascimento?: Date; // Adicione esta linha
}

const AssociadoManagement = () => {
  const { id } = useParams<{ id: string }>();
  const [associado, setAssociado] = useState<Associado | null>(null);
  const [empresa, setEmpresa] = useState<Empresa | null>(null); // Novo estado para empresa
  const [pagamentos, setPagamentos] = useState<Pagamento[]>([]);
  const [dependentes, setDependentes] = useState<Dependente[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentPagamento, setCurrentPagamento] = useState<Pagamento | null>(null);
  const [dependenteModalVisible, setDependenteModalVisible] = useState(false);
  const [currentDependente, setCurrentDependente] = useState<Dependente | null>(null);

  const fetchAssociado = async () => {
    if (id) {
      const { data, error } = await supabase.from('associados').select('*').eq('id', id).single();
      if (data) {
        setAssociado(data);
        // Fetch empresa data if empresa_id is available
        if (data.empresa_id) {
          const { data: empresaData, error: empresaError } = await supabase.from('empresas').select('*').eq('id', data.empresa_id).single();
          if (empresaData) {
            setEmpresa(empresaData);
          } else if (empresaError) {
            console.error('Erro ao buscar empresa:', empresaError.message);
          }
        }
      } else if (error) {
        console.error('Erro ao buscar associado:', error.message);
      }
    }
  };

  const fetchPagamentos = async () => {
    if (id) {
      const { data, error } = await supabase.from('pagamentos').select('*, historico_pagamentos ( * )' ).eq('associado_id', id);
      if (data) {
        setPagamentos(data);
      } else if (error) {
        console.error('Erro ao buscar pagamentos:', error.message);
      }
    }
  };

  const fetchDependentes = async () => {
    if (id) {
      const { data, error } = await supabase.from('dependentes').select('*').eq('associado_id', id);
      
      if (data) {
        setDependentes(data);
      } else if (error) {
        console.error('Erro ao buscar dependentes:', error.message);
      }
    }
  };

  useEffect(() => {
    fetchAssociado();
    fetchPagamentos();
    fetchDependentes();
    
  }, [id]);

  const openPagamentoModal = () => {
    setCurrentPagamento({
      id: crypto.randomUUID(),
      associado_id: id!,
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

  const openDependenteModal = (dependente?: Dependente) => {
    setCurrentDependente(dependente || {
      associado_id: id!,
      nome: '',
      vinculo: '',
      documento: '',
      data_de_nascimento :  new Date(),
    });
    setDependenteModalVisible(true);
  };

  const closeDependenteModal = () => {
    setDependenteModalVisible(false);
  };

  const insertDependente = async () => {

    
    if (currentDependente) {

     
      try {
        const { id, ...dependenteData } = currentDependente;
        await supabase
          .from('dependentes')
          .insert([{ ...dependenteData, id: crypto.randomUUID() }]);

        notification.success({
          message: 'Dependente Adicionado',
          description: 'Dependente foi adicionado com sucesso.',
        });
        closeDependenteModal();
        fetchDependentes();
      } catch (error) {
        console.error('Erro ao adicionar dependente:', (error as Error).message);
      }
    }
  };

  const updateDependente = async () => {
    if (currentDependente?.id) {
      try {
        await supabase
          .from('dependentes')
          .update(currentDependente)
          .eq('id', currentDependente.id);

        notification.success({
          message: 'Dependente Atualizado',
          description: 'Dependente foi atualizado com sucesso.',
        });
        closeDependenteModal();
        fetchDependentes();
      } catch (error) {
        console.error('Erro ao atualizar dependente:', (error as Error).message);
      }
    }
  };

  const saveDependente = async () => {
    if (currentDependente) {
      try {
        const { id, ...dependenteData } = currentDependente;
  
        if (id) {
          const { data, error: fetchError } = await supabase
            .from('dependentes')
            .select('id')
            .eq('id', id);
  
          if (fetchError) {
            throw fetchError;
          }
  
          if (data?.length === 0) {
            await supabase
              .from('dependentes')
              .insert([{ ...dependenteData, id }]);
          } else {
            await supabase
              .from('dependentes')
              .update(dependenteData)
              .eq('id', id);
          }
        } else {
          await supabase
            .from('dependentes')
            .insert([dependenteData]);
        }
  
        notification.success({
          message: id ? 'Dependente Atualizado' : 'Dependente Adicionado',
          description: id ? 'Dependente atualizado com sucesso.' : 'Dependente adicionado com sucesso.',
        });
        closeDependenteModal();
        fetchDependentes();
      } catch (error) {
        console.error('Erro ao salvar dependente:', (error as Error).message);
        notification.error({
          message: 'Erro',
          description: 'Ocorreu um erro ao salvar o dependente.',
        });
      }
    } else {
      notification.error({
        message: 'Erro',
        description: 'Por favor, preencha todos os campos.',
      });
    }
  };
  

  const deleteDependente = async (id: string) => {
    try {
      const { error } = await supabase.from('dependentes').delete().eq('id', id);
      if (error) throw error;

        notification.success({
          message: 'Dependente Excluído',
          description: 'Dependente excluído com sucesso.',
        });
        fetchDependentes();
      } catch (error) {
        console.error('Erro ao excluir dependente:', (error as Error).message);
      }
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

  const dependentesColumns = [
    { title: 'Nome', dataIndex: 'nome', key: 'nome' },
    { title: 'Vínculo', dataIndex: 'vinculo', key: 'vinculo' },
    { title: 'Documento', dataIndex: 'documento', key: 'documento' },
    {
      title: 'Ações',
      key: 'actions',
      render: (text: any, record: Dependente) => (
        <>
          <Button type="link" onClick={() => openDependenteModal(record)}>Editar</Button>
          <Button type="link" danger onClick={() => deleteDependente(record.id!)}>Excluir</Button>
        </>
      ),
    },
  ];

  return (
    <div className="mx-auto max-w-4xl p-4">
      <Title level={1} className="text-center mb-5">Infromações do Associado</Title>

      <Tabs defaultActiveKey="1">
        <TabPane tab="Dados do Associado" key="1">
          {associado ? (
            <>

              <Table
                dataSource={[associado]}
                columns={[
                  { title: 'Foto', dataIndex: 'foto', key: 'foto', render: (text: Date) => text ? <img src="/img/user1.jpg" className="rounded-full w-1/2"/> : <img src="/img/user1.jpg" className="rounded-full w-1/2"/> },
                ]}
                rowKey="id"
                pagination={false}
                className="mt-4 w-1/4"
              />

              <Table
                dataSource={[associado]}
                columns={[
                  { title: 'Nome', dataIndex: 'nome', key: 'nome' },
                  { title: 'Documento', dataIndex: 'documento', key: 'documento' },
                  { title: 'Endereço', dataIndex: 'endereco', key: 'endereco' },
                ]}
                rowKey="id"
                pagination={false}
                className="mt-4"
              />

            
              <Table
                dataSource={[associado]}
                columns={[
                  { title: 'Matricula', dataIndex: 'matricula', key: 'matricula', render: (text: Date) => text ? new Date(text).toLocaleDateString() : 'Não informado' },
                  { title: 'Código', dataIndex: 'id', key: 'id' },
                ]}
                rowKey="id"
                pagination={false}
                className="mt-4"
              />

              

              <Table
                dataSource={[associado]}
                columns={[
                  { title: 'Naturalidade', dataIndex: 'naturalidade', key: 'naturalidade',  render: (text: string) => text ? text : 'Não informado' },
                  { title: 'Estado civil', dataIndex: 'estado_civil', key: 'estado_civil',  render: (text: string) => text ? text : 'Não informado' },
                  { title: 'Cargo na Empresa', dataIndex: 'cargo_empresa', key: 'cargo_empresa',  render: (text: string) => text ? text : 'Não informado' },
                ]}
                rowKey="id"
                pagination={false}
                className="mt-4"
              />

                  <Table
                    dataSource={[associado]}
                    columns={[
                      { title: 'Data de Nascimento', dataIndex: 'data_de_nascimento', key: 'data_de_nascimento', render: (text: Date) => text ? new Date(text).toLocaleDateString() : 'Não informado' },
                      { title: 'Data de Admissão', dataIndex: 'data_admissao_empresa', key: 'data_admissao_empresa', render: (text: Date) => text ? new Date(text).toLocaleDateString() : 'Não informado' },
                      { title: 'Data de Ingresso no Sindicato', dataIndex: 'data_ingresso_sindicato', key: 'data_ingresso_sindicato', render: (text: Date) => text ? new Date(text).toLocaleDateString() : 'Não informado' },
                      { title: 'Data de Saída do Sindicato', dataIndex: 'data_saida_sindicato', key: 'data_saida_sindicato', render: (text: Date) => text ? new Date(text).toLocaleDateString() : 'Não informado' },
                    ]}
                    rowKey="id"
                    pagination={false}
                    className="mt-4"
                  />

              <Table
                dataSource={[associado]}
                columns={[
                  { title: 'Pis', dataIndex: 'pis', key: 'pis', render : (text: string) => text ? text : 'Não informado' },
                  { title: 'CTPS', dataIndex: 'ctps', key: 'ctps', render : (text: string) => text ? text : 'Não informado' },
                  { title: 'TItulo de eleitor', dataIndex: 'titulo_eleitor', key: 'titulo_eleitor', render : (text: string) => text ? text : 'Não informado' },
                  { title: 'Desconto em Folha', dataIndex: 'desconto_em_folha', key: 'desconto_em_folha', render: (text: boolean) => text ? 'Sim' : 'Não' },
                ]}
                rowKey="id"
                pagination={false}
                className="mt-4"
              />

              <Table
                dataSource={[associado]}
                columns={[
                  { title: 'Filhos', dataIndex: 'filhos', key: 'filhos', render : (text : boolean) => text ? 'Sim' : 'Não' },
                  { title: 'Quantidade de filhos', dataIndex: 'quantos_filhos', key: 'quantos_filhos', render: (text: number) => text ? text : 'Não informado' },
                ]}
                rowKey="id"
                pagination={false}
                className="mt-4"
              />

              <Table
                dataSource={[associado]}
                columns={[
                  { title: 'Nome do pai', dataIndex: 'nome_pai', key: 'nome_pai', render : (text : string) => text ? text : 'Não informado' },
                  { title: 'Nome da mãe', dataIndex: 'nome_mae', key: 'nome_mae', render: (text: string) => text ? text : 'Não informado' },
                ]}
                rowKey="id"
                pagination={false}
                className="mt-4"
              />

              <Table
                dataSource={[associado]}
                columns={[
                  { title: 'Observação', dataIndex: 'observacao', key: 'observacao', render : (text : string) => text ? text : 'Nenhuma informação lançada' },
                  
                ]}
                rowKey="id"
                pagination={false}
                className="mt-4"
              />



              
            </>
          ) : (
            <p>Carregando associado...</p>
          )}
        </TabPane>

            <TabPane tab="Dados da Empresa" key="4">
              {empresa ? (
                <Card title="Informações da Empresa">
                  <p><strong>Nome:</strong> {empresa.nome}</p>
                  <p><strong>CNPJ:</strong> {empresa.cnpj}</p>
                  <p><strong>Endereço:</strong> {empresa.endereco}</p>
                </Card>
              ) : (
                <p>Carregando dados da empresa...</p>
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

            <TabPane tab="Dependentes" key="3">
              <Button type="primary" onClick={() => openDependenteModal()} className="mb-4">Adicionar Dependente</Button>
              <Table
                dataSource={dependentes}
                columns={dependentesColumns}
                rowKey="id"
                pagination={false}
                scroll={{ x: 'max-content' }}
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

      <Modal
        title={currentDependente?.id ? "Editar Dependente" : "Adicionar Dependente"}
        visible={dependenteModalVisible}
        onOk={saveDependente}
        onCancel={closeDependenteModal}
        footer={[
          <Button key="cancel" onClick={closeDependenteModal}>Cancelar</Button>,
          <Button key="submit" type="primary" onClick={saveDependente}>Salvar</Button>,
        ]}
      >
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Nome</label>
          <Input
            value={currentDependente?.nome ?? ''}
            onChange={(e) => setCurrentDependente((prev) => ({ ...prev!, nome: e.target.value }))}
            placeholder="Digite o nome do dependente"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Documento</label>
          <Input
            value={currentDependente?.documento ?? ''}
            onChange={(e) => setCurrentDependente((prev) => ({ ...prev!, documento: e.target.value }))}
            placeholder="Digite o documento"
          />
        </div>

        <div className="mb-4">
  <label className="block text-gray-700 text-sm font-bold mb-2">Data de Nascimento</label>
  <Input
    type="date"
    value={
      currentDependente?.data_de_nascimento 
        ? new Date(currentDependente.data_de_nascimento).toISOString().substring(0, 10) 
        : ''
    }
    onChange={(e) =>
      setCurrentDependente((prev) => ({
        ...prev!,
        data_de_nascimento: new Date(e.target.value), // Atualiza o estado com a data selecionada
      }))
    }
    placeholder="Digite a data de nascimento"
  />
</div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Vínculo</label>
          <Select
            value={currentDependente?.vinculo}
            onChange={(value) => setCurrentDependente(prev => prev ? { ...prev, vinculo: value } : prev)}
            placeholder="Selecione o vínculo"
            style={{ width: '100%' }}
          >
            <Select.Option value="Pai">Pai</Select.Option>
            <Select.Option value="Mãe">Mãe</Select.Option>
            <Select.Option value="Filho">Filho</Select.Option>
            <Select.Option value="Conjuge">Conjuge</Select.Option>
          </Select>
        </div>


      </Modal>
    </div>
  );
};

export default AssociadoManagement;
