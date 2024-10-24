'use client';

import { useState, useEffect } from 'react';
import { DatePicker, Button, Modal, Table, Input, notification, Typography, Tabs, Card, Select, Form } from 'antd';
import moment, { Moment } from 'moment';
import 'moment/locale/pt-br';
import { useParams } from 'next/navigation';
import { supabase } from '../../../lib/supabaseClient'
import { Profissional } from '../../types/Profissional'
import { Agendamento } from '../../types/Agendamento'
import { ProfissionaisServicos } from '@/app/types/ProfissionaisServicos';
import { Servicos } from '../../types/Servicos'
import { FaEraser, FaPen, FaTrash } from 'react-icons/fa';
const { Title } = Typography;
const { TabPane } = Tabs;
moment.locale('pt-BR');

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


const ProfissionalManagement = () => {
  const [form] = Form.useForm();

  const { id } = useParams<{ id: string }>();
  const [aluno, setProfissional] = useState<Profissional | null>(null);
  const [pagamentos, setPagamentos] = useState<Pagamento[]>([]);
  const [servicos, setServicos] = useState<Servicos[]>([]);
  const [agendamento, setAgendamento] = useState<Agendamento[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentPagamento, setCurrentPagamento] = useState<Pagamento | null>(null);
  const [currentAgendamento, setCurrentAgendamento] = useState<Agendamento | null>(null);
  const [dependenteModalVisible, setDependenteModalVisible] = useState(false);
  const [agendamentoModalVisible, setAgendamentoModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [profissionalServicos, setProfissionalServicos] = useState<ProfissionaisServicos[]>([]);
  const [profissionalServicoModalVisible,setProfissionalServicoModalVisible] = useState(false);

  const fetchProfissional = async () => {
    if (id) {
      const { data, error } = await supabase.from('profissionais').select('*, profissionais_servicos(*, servicos (*))').eq('id', id).single();
      if (data) {
        setProfissional(data);
        setProfissionalServicos(data.profissionais_servicos)
      } else if (error) {
        console.error('Erro ao buscar aluno:', error.message);
      }
    }
  };

  const fetchServicos = async () => {
    if (id) {
      const { data, error } = await supabase.from('servicos').select('*');
      if (data) {
        setServicos(data);
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

  const fetchAgendamento = async () => {
    if (id) {
      const { data, error } = await supabase.from('agendamentos').select('*, servicos ( * )' ).eq('profissional_id', id);
      if (data) {
        setAgendamento(data);
      } else if (error) {
        console.error('Erro ao buscar agendamentos:', error.message);
      }
    }
  };
  
  useEffect(() => {
    fetchProfissional();
    fetchPagamentos();
    fetchAgendamento();
    fetchServicos();
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

  const openAgendamentoModal = (Agendamento?: Agendamento) => {
    setCurrentAgendamento(Agendamento! || {
      id: 0, // or some default value if necessary
      profissional_id: Number(id), // Convert to number
      servico_id: 0, // ID do serviço
      cliente_nome: '', // Nome do cliente
      cliente_email: '', // Email do cliente
      cliente_celular: '', // Celular do cliente
      data_hora: new Date(), // Data e hora do agendamento
      data_criacao: new Date(), // Include creation date if required
      status: 'agendado', // Status do agendamento
    });
    setIsEditing(!!Agendamento);
    form.setFieldsValue({
      ...Agendamento,
    });
    setAgendamentoModalVisible(true);
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

  const saveAgendamento = async () => {
   
    if (currentAgendamento) {
      try {
        const { id, ...agendamentoData } = currentAgendamento;
   
        console.log(id)
        
        const { data, error: fetchError } = await supabase
          .from('agendamentos')
          .select('id')
          .eq('id', id);
          
        if (data?.length === 0 || id === 0) {
          await supabase
            .from('agendamentos')
            .insert([{ ...agendamentoData }]);
        } else {

          delete agendamentoData.servicos
          await supabase
            .from('agendamentos')
            .update(agendamentoData)
            .eq('id', id);
        }
        
        notification.success({
          message: 'Agendamento Salvo',
          description: 'Agendamento foi salvo com sucesso.',
        });
        closeAgendamentoModal();
        fetchAgendamento();
      } catch (error) {
        console.error('Erro ao salvar agemdamento:', (error as Error).message);
      }
    }
  };

  const saveServico = async () => {
   
    if (currentAgendamento) {
      try {
        const { id, ...agendamentoData } = currentAgendamento;
   
        console.log(id)
        
        const { data, error: fetchError } = await supabase
          .from('agendamentos')
          .select('id')
          .eq('id', id);
          
        if (data?.length === 0 || id === 0) {
          await supabase
            .from('agendamentos')
            .insert([{ ...agendamentoData }]);
        } else {

          delete agendamentoData.servicos
          await supabase
            .from('agendamentos')
            .update(agendamentoData)
            .eq('id', id);
        }
        
        notification.success({
          message: 'Agendamento Salvo',
          description: 'Agendamento foi salvo com sucesso.',
        });
        closeAgendamentoModal();
        fetchAgendamento();
      } catch (error) {
        console.error('Erro ao salvar agemdamento:', (error as Error).message);
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

  const deleteAgendamento = async (id: number) => {
    Modal.confirm({
      title: 'Confirmar Exclusão',
      content: 'Você tem certeza que deseja excluir este Agendamento?',
      okText: 'Sim',
      okType: 'danger',
      cancelText: 'Não',
      onOk: async () => {
        try {
          const { error } = await supabase
            .from('agendamentos')
            .delete()
            .eq('id', id);

          if (error) throw error;

          fetchAgendamento();

          notification.success({
            message: 'Agendamento Excluído',
            description: 'Agendamento excluído com sucesso.',
          });
        } catch (error) {
          console.error('Erro ao excluir Agendamento:', (error as Error).message);
        }
      },
    });
  };


  const closePagamentoModal = () => {
    setModalVisible(false);
  };

  const closeAgendamentoModal = () => {
    setAgendamentoModalVisible(false);
  };

  const closeprofissionalServicoModal = () => {
    setProfissionalServicoModalVisible(false);
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

  const columnsInscricao = [
    { title: 'Matricula', dataIndex: 'data_pagamento', key: 'data_pagamento', render: (text: number) => `Pagamento realizado `  },
    { title: 'Curso', dataIndex: 'data_pagamento', key: 'data_pagamento', render: (text: number) => `Pagamento realizado `  },
    { title: 'Data da incrição', dataIndex: 'data_pagamento', key: 'data_pagamento', render: (text: Date) => new Date(text).toLocaleDateString() },
    { title: 'Valor', dataIndex: 'valor_pago', key: 'valor_pago', render: (text: number) => `R$ ${text.toFixed(2)}` },
    { title: 'Status', dataIndex: 'historico_pagamentos.0.motivo', key: 'historico_pagamentos.0.motivo', render: (text: string) => text  },
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

  const columnsAgenda = [
    { title: 'Imagem', dataIndex: 'servicos', key: 'servicos' , render: (text: Servicos) => <img src={`${text.imagem_url}`} className="rounded-full w-12"/> },
    { title: 'Serviço', dataIndex: 'servicos', key: 'servicos' , render: (text: Servicos) => text.nome },
    { title: 'Valor', dataIndex: 'servicos', key: 'servicos' , render: (text: Servicos) => text.preco },
    { title: 'Cliente', dataIndex: 'cliente_nome', key: 'cliente_nome'},
    { title: 'Contato do cliente', dataIndex: 'cliente_celular', key: 'cliente_celular'},
    { title: 'Data e hora', dataIndex: 'data_hora', key: 'data_hora', render: (text: Date) => new Date(text).toLocaleDateString() },
    { title: 'Status', dataIndex: 'status', key: 'status', render: (text: string) => text  },
    {
      title: 'Ações',
      key: 'actions',
      render: (text: any, record: Agendamento) => (
        <>
          <Button
                key={record.id}
                type="primary"
                danger
                icon={<FaTrash />}
                onClick={() => deleteAgendamento(record.id!)}
              />
          <Button
                key={record.id}
                type="primary"
                icon={<FaPen />}
                onClick={() => openAgendamentoModal(record)}
              />
        </>
      ),
    },
  ];

  const columnsServicosPrestados = [
    { title: 'Imagem', dataIndex: 'servicos', key: 'servicos' , render: (text: Servicos) => <img src={`${text.imagem_url}`} className="rounded-full w-12"/> },
    { title: 'Serviço', dataIndex: 'servicos', key: 'servicos' , render: (text: Servicos) => text.nome },
    { title: 'Valor', dataIndex: 'servicos', key: 'servicos' , render: (text: Servicos) => text.preco },
    {
      title: 'Ações',
      key: 'actions',
      render: (text: any, record: any) => (
        <>
          <Button
                key={record.id}
                type="primary"
                danger
                icon={<FaTrash />}
                onClick={() => deleteAgendamento(record.id!)}
              />
          
        </>
      ),
    },
  ];


  return (
    <div className="mx-auto max-w-4xl p-4">
      <Title level={1} className="text-center mb-5">Informações do Profissional</Title>

      <Tabs defaultActiveKey="1">

        <TabPane tab="Dados do Profissional" key="1">
          {aluno ? (
            <>

              <Table
                dataSource={[aluno]}
                columns={[
                  { title: 'Foto', dataIndex: 'imagem_url', key: 'imagem_url', render: (text: Date) => text ? <img src={`${text}`} className="rounded-full w-32 h-32"/> : <img src={`${text}`} className="rounded-full w-32  h-32"/> },
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
            <p>Carregando profissional...</p>
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


        <TabPane tab="Agendamento" key="3">
          <Button type="primary" onClick={() => openAgendamentoModal()} className="mb-4">Agendar</Button>
          <Table
            dataSource={agendamento}
            columns={columnsAgenda}
            rowKey="id"
            pagination={false}
            scroll={{ x: 'max-content' }}
            className="mt-4"
          />
        </TabPane>

        <TabPane tab="Cursos" key="4">
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


        <TabPane tab="Inscrições" key="5">
          <Button type="primary" onClick={openPagamentoModal} className="mb-4">Realizar inscrição</Button>
          <Table
            dataSource={pagamentos}
            columns={columnsInscricao}
            rowKey="id"
            pagination={false}
            scroll={{ x: 'max-content' }}
            className="mt-4"
          />
        </TabPane>

        <TabPane tab="Serviços prestados" key="6">
          <Button type="primary" onClick={openPagamentoModal} className="mb-4">Lançar serviços</Button>
          <Table
            dataSource={profissionalServicos}
            columns={columnsServicosPrestados}
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

      <Modal
        title="Agendar Serviço"
        visible={agendamentoModalVisible}
        onOk={saveAgendamento}
        onCancel={closeAgendamentoModal}
        footer={[
          <Button key="cancel" onClick={closeAgendamentoModal}>Cancelar</Button>,
          <Button key="submit" type="primary" onClick={saveAgendamento}>Agendar</Button>,
        ]}
      >

      <div>




      
<div className="mb-4">
  <label className="block text-gray-700 text-sm font-bold mb-2">Data e Hora do Agendamento</label>
  <DatePicker
    showTime
    value={currentAgendamento?.data_hora ? moment(currentAgendamento.data_hora) : null}
    placeholder="Selecione a data e hora"
    format="DD/MM/YYYY HH:mm"
    className="w-full"
  />
</div>


      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Nome do cliente</label>
        <Input
          type="text"
          value={currentAgendamento?.cliente_nome}
          onChange={(e) => setCurrentAgendamento((prev) => ({ ...prev!, cliente_nome: e.target.value }))}
          placeholder="Digite o nome do cliente"
        />
      </div>


      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">E-mail do cliente</label>
        <Input
          type="email"
          value={currentAgendamento?.cliente_email}
          onChange={(e) => setCurrentAgendamento((prev) => ({ ...prev!, cliente_email: e.target.value }))}
          placeholder="Digite o e-mail do cliente"
        />
      </div>

      
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Celular do cliente</label>
        <Input
          type="email"
          value={currentAgendamento?.cliente_celular}
          onChange={(e) => setCurrentAgendamento((prev) => ({ ...prev!, cliente_celular: e.target.value }))}
          placeholder="Digite o celular do cliente"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Selecione o Serviço</label>
        <select
          value={currentAgendamento?.servico_id}
          onChange={(e) => setCurrentAgendamento((prev) => ({ ...prev!, servico_id: Number(e.target.value) }))}
          className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded shadow leading-tight focus:outline-none focus:ring focus:ring-blue-200"
        >
          <option value={0}>Selecione um serviço</option>
          {servicos.map((servico) => (
            <option key={servico.id} value={servico.id}>
              {servico.nome}
            </option>
          ))}
        </select>
      </div>

     
     
    </div>



      </Modal>


      <Modal
        title="Adicionar Serviço"
        visible={profissionalServicoModalVisible}
        onOk={saveServico}
        onCancel={closeprofissionalServicoModal}
        footer={[
          <Button key="cancel" onClick={closeprofissionalServicoModal}>Cancelar</Button>,
          <Button key="submit" type="primary" onClick={saveServico}>Salvar</Button>,
        ]}
      >

      <div>




      
<div className="mb-4">
  <label className="block text-gray-700 text-sm font-bold mb-2">Data e Hora do Agendamento</label>
  <DatePicker
    showTime
    value={currentAgendamento?.data_hora ? moment(currentAgendamento.data_hora) : null}
    placeholder="Selecione a data e hora"
    format="DD/MM/YYYY HH:mm"
    className="w-full"
  />
</div>


      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Nome do cliente</label>
        <Input
          type="text"
          value={currentAgendamento?.cliente_nome}
          onChange={(e) => setCurrentAgendamento((prev) => ({ ...prev!, cliente_nome: e.target.value }))}
          placeholder="Digite o nome do cliente"
        />
      </div>


      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">E-mail do cliente</label>
        <Input
          type="email"
          value={currentAgendamento?.cliente_email}
          onChange={(e) => setCurrentAgendamento((prev) => ({ ...prev!, cliente_email: e.target.value }))}
          placeholder="Digite o e-mail do cliente"
        />
      </div>

      
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Celular do cliente</label>
        <Input
          type="email"
          value={currentAgendamento?.cliente_celular}
          onChange={(e) => setCurrentAgendamento((prev) => ({ ...prev!, cliente_celular: e.target.value }))}
          placeholder="Digite o celular do cliente"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Selecione o Serviço</label>
        <select
          value={currentAgendamento?.servico_id}
          onChange={(e) => setCurrentAgendamento((prev) => ({ ...prev!, servico_id: Number(e.target.value) }))}
          className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded shadow leading-tight focus:outline-none focus:ring focus:ring-blue-200"
        >
          <option value={0}>Selecione um serviço</option>
          {servicos.map((servico) => (
            <option key={servico.id} value={servico.id}>
              {servico.nome}
            </option>
          ))}
        </select>
      </div>

     
     
    </div>



      </Modal>
     
    </div>
  );
};

export default ProfissionalManagement;
