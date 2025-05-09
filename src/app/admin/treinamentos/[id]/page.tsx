'use client';

import { useEffect, useState } from 'react';
import { Card, Descriptions, Button, Table, Modal, Form, Input, notification, Select } from 'antd';
import { supabase } from '@/lib/supabaseClient';
import { FaUserPlus, FaArrowLeft } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import dayjs from 'dayjs';
import { Aluno } from '@/app/types/Aluno';
const { Option } = Select;

interface TreinamentoDetalhes {
  id: number;
  local: string;
  data_inicio: string;
  data_fim: string;
  status: string;
  cursos: { titulo: string };
}

interface Inscricao {
  id: number;
  aluno_nome: string;
  aluno_email: string;
  status: string;
  data_inscricao: string;
}

// Remove the local Aluno interface since we're now importing it

export default function TreinamentoDetalhes({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [treinamento, setTreinamento] = useState<TreinamentoDetalhes | null>(null);
  const [inscricoes, setInscricoes] = useState<Inscricao[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const fetchTreinamento = async () => {
    const { data, error } = await supabase
      .from('treinamentos')
      .select('*, cursos(titulo)')
      .eq('id', params.id)
      .single();

    if (error) {
      notification.error({
        message: 'Erro',
        description: 'Erro ao carregar dados do treinamento',
      });
      return;
    }

    setTreinamento(data);
  };

  const loadInscricoes = async () => {
    const { data, error } = await supabase
      .from('inscricoes')
      .select('*')
      .eq('treinamento_id', params.id);

    if (error) {
      notification.error({
        message: 'Erro',
        description: 'Erro ao carregar inscrições',
      });
      return;
    }

    setInscricoes(data || []);
  };

  useEffect(() => {
    fetchTreinamento();
    fetchInscricoes();
  }, [params.id]);

  const columns = [
    {
      title: 'Nome do Aluno',
      dataIndex: ['alunos', 'nome'],
      key: 'nome',
    },
    {
      title: 'Email',
      dataIndex: ['alunos', 'email'],
      key: 'email',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Data de Inscrição',
      dataIndex: 'data_inscricao',
      key: 'data_inscricao',
      render: (date: string) => dayjs(date).format('DD/MM/YYYY'),
    },
  ];

  const handleSubmitInscricao = async (values: any) => {
    const novaInscricao = {
      treinamento_id: Number(params.id),
      aluno_id: values.aluno_id,
      status: 'pendente',
      data_inscricao: new Date().toISOString(),
    };

    const { error } = await supabase
      .from('inscricoes')
      .insert([novaInscricao]);

    if (error) {
      notification.error({
        message: 'Erro',
        description: 'Erro ao criar inscrição',
      });
      return;
    }

    notification.success({
      message: 'Sucesso',
      description: 'Inscrição criada com sucesso',
    });

    setIsModalOpen(false);
    form.resetFields();
    fetchInscricoes();
  };

  // Add this new function
  const searchAlunos = async (nome: string) => {
    const { data, error } = await supabase
      .from('alunos')
      .select('*')
      .ilike('nome', `%${nome}%`)
      .limit(5);

    if (error) {
      notification.error({
        message: 'Erro',
        description: 'Erro ao buscar alunos',
      });
      return;
    }

    const [alunos, setAlunos] = useState<Aluno[]>([]);
    setAlunos(data || []);
  };

  // Update handleNovaInscricao
  const handleNovaInscricao = async (values: any) => {
    const novaInscricao = {
      treinamento_id: Number(params.id),
      aluno_id: values.aluno_id,
      status: 'pendente',
      data_inscricao: new Date().toISOString(),
    };

    const { error } = await supabase
      .from('inscricoes')
      .insert([novaInscricao]);

    if (error) {
      notification.error({
        message: 'Erro',
        description: 'Erro ao criar inscrição',
      });
      return;
    }

    notification.success({
      message: 'Sucesso',
      description: 'Inscrição criada com sucesso',
    });

    setIsModalOpen(false);
    form.resetFields();
    fetchInscricoes();
  };

  // Update fetchInscricoes
  const fetchInscricoes = async () => {
    const { data, error } = await supabase
      .from('inscricoes')
      .select(`
        *,
        alunos (
          id,
          nome,
          email
        )
      `)
      .eq('treinamento_id', params.id);

    if (error) {
      notification.error({
        message: 'Erro',
        description: 'Erro ao carregar inscrições',
      });
      return;
    }

    setInscricoes(data || []);
  };

  

  // Update the Form in the return statement
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <Button 
        icon={<FaArrowLeft />} 
        onClick={() => router.back()}
        className="mb-6"
      >
        Voltar
      </Button>

      <Card className="mb-6">
        <Descriptions title="Detalhes do Treinamento" bordered>
          <Descriptions.Item label="Local">{treinamento!.local}</Descriptions.Item>
          <Descriptions.Item label="Curso">{treinamento!.cursos.titulo}</Descriptions.Item>
          <Descriptions.Item label="Status">{treinamento!.status}</Descriptions.Item>
          <Descriptions.Item label="Data Início">
            {dayjs(treinamento!.data_inicio).format('DD/MM/YYYY')}
          </Descriptions.Item>
          <Descriptions.Item label="Data Fim">
            {dayjs(treinamento!.data_fim).format('DD/MM/YYYY')}
          </Descriptions.Item>
        </Descriptions>
      </Card>

      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Inscrições</h2>
        <Button
          type="primary"
          icon={<FaUserPlus />}
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-500"
        >
          Nova Inscrição
        </Button>
      </div>

      <Table
        dataSource={inscricoes}
        columns={columns}
        rowKey="id"
      />

      <Modal
        title="Nova Inscrição"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleNovaInscricao}
        >
          <Form.Item
            name="aluno_id"
            label="Aluno"
            rules={[{ required: true, message: 'Por favor, selecione o aluno' }]}
          >
            <Select
              showSearch
              placeholder="Buscar aluno"
              onSearch={(value) => {
              // Remove setSearchText since it's not defined and not needed
                searchAlunos(value);
              }}
              filterOption={false}
            >
              {alunos?.map((aluno: Aluno) => (
                <Option key={aluno.id} value={aluno.id}>
                  {aluno.nome} - {aluno.email}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="w-full bg-blue-500">
              Criar Inscrição
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}