'use client';

import { useState, useEffect } from 'react';
import { Button, Drawer, List, notification, Modal, Pagination, Input, Form } from 'antd';
import { FaPen, FaTrash, FaPlus, FaInfo } from 'react-icons/fa';
import { supabase } from '../../lib/supabaseClient';
import Link from 'next/link';
import dayjs from 'dayjs';
import AlunoForm from './AlunoForm';

import { Aluno } from '../types/Aluno'; 

const AlunoManagement = () => {
  const [form] = Form.useForm();
  const [Alunos, setAlunos] = useState<Aluno[]>([]);
  
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [currentAluno, setCurrentAluno] = useState<Aluno | undefined>(undefined);
  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(0);
  const itemsPerPage = 10;

  const fetchAlunosData = async () => {
    const { data, error, count } = await supabase
      .from('alunos')
      .select('*', { count: 'exact' })
      .ilike('nome', `%${searchTerm}%`)
      .range((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage - 1);

    if (data) {
      setAlunos(data);
      setTotalItems(count || 0);
    } else if (error) {
      console.error('Erro ao buscar Alunos:', error.message);
    }
  };


  useEffect(() => {
    const fetchUserData = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (data && !error) {
        fetchAlunosData();
      }
    };

    fetchUserData();
  }, [searchTerm, currentPage]);

  const saveAluno = async (values: any) => {
    try {
      const Aluno = { ...values, id: currentAluno?.id };
      
      const { data, error } = await supabase
        .from('Alunos')
        .select('*')
        .eq('id', Aluno.id);

      if (data?.length !== 0) {
        // Realizar update
        const { error } = await supabase
          .from('Alunos')
          .update(Aluno)
          .eq('id', Aluno.id);

        if (error) throw error;

        notification.success({
          message: 'Aluno Atualizado',
          description: 'Aluno atualizado com sucesso.',
        });
      } else {
        // Inserir
        const { error } = await supabase
          .from('Alunos')
          .insert([Aluno]);

        if (error) throw error;

        notification.success({
          message: 'Aluno Adicionado',
          description: 'Aluno adicionado com sucesso.',
        });
      }

      closeDrawer();
      fetchAlunosData();
    } catch (error) {
      console.error('Erro ao salvar Aluno:', (error as Error).message);
      notification.error({
        message: 'Erro',
        description: 'Ocorreu um erro ao salvar o Aluno.',
      });
    }
  };

  const deleteAluno = (id: number) => {
    Modal.confirm({
      title: 'Confirmar Exclusão',
      content: 'Você tem certeza que deseja excluir este Aluno?',
      okText: 'Sim',
      okType: 'danger',
      cancelText: 'Não',
      onOk: async () => {
        try {
          const { error } = await supabase
            .from('Alunos')
            .delete()
            .eq('id', id);

          if (error) throw error;

          fetchAlunosData();

          notification.success({
            message: 'Aluno Excluído',
            description: 'Aluno excluído com sucesso.',
          });
        } catch (error) {
          console.error('Erro ao excluir Aluno:', (error as Error).message);
        }
      },
    });
  };

  const openDrawer = (Aluno?: Aluno) => {
    setCurrentAluno(Aluno || {
                        nome: '',
                        email: '',
                        dataCadastro: '',
                        ativo: '',
                        atualizadoEm: '',
    });
    setIsEditing(!!Aluno);
    form.setFieldsValue({
      ...Aluno,
    });
    setDrawerVisible(true);
  };

  const closeDrawer = () => {
    setDrawerVisible(false);
    form.resetFields();
  };

  return (
    <div className="mx-auto max-w-md">
      <h1 className="text-xl text-center mb-5">Gerenciamento de Alunos</h1>

      <Input
        placeholder="Pesquisar Aluno..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-5"
      />

      <Button
        type="primary"
        className="mb-5 p-5 bg-[#6495ED] text-white rounded flex items-center w-full"
        icon={<FaPlus />}
        onClick={() => openDrawer()}
      >
        Adicionar Aluno
      </Button>

      <List
        itemLayout="horizontal"
        dataSource={Alunos}
        renderItem={(Aluno) => (
          <List.Item
            actions={[
              <Button
                key={Aluno.id}
                type="primary"
                icon={<FaPen />}
                onClick={() => openDrawer(Aluno)}
              />,
              <Button
                key={Aluno.id}
                type="primary"
                danger
                icon={<FaTrash />}
                onClick={() => deleteAluno(Aluno.id!)}
              />,
              <Link key={Aluno.id} href={`/Alunos/${Aluno.id}`}>
                <Button type="link" icon={<FaInfo />} />
              </Link>
            ]}
          >
            <List.Item.Meta
              title={Aluno.nome}
              description={
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                
                <span>Tipo de caddasto: Cadastro via landingpage</span>
                <span>Cursos: JavaScript Básico, HTML Básico, Python</span>
                <span>Treinamentos: Nenhum</span>
                <span>Status: { Aluno.ativo == false ? <span className='bg-red-100 p-1 rounded-md text-red-600 '>Inativo</span> : <span className='bg-green-100 p-1 rounded-md text-green-600 '>Ativo</span>}</span>
              </div>  
              }
              
            />
          </List.Item>
        )}
      />

      <Pagination
        current={currentPage}
        pageSize={itemsPerPage}
        total={totalItems}
        onChange={(page) => setCurrentPage(page)}
        className="mt-4"
      />

      <Drawer
        title={isEditing ? 'Editar Aluno' : 'Adicionar Aluno'}
        width='80%'
        onClose={closeDrawer}
        visible={drawerVisible}
        bodyStyle={{ paddingBottom: 80 }}
        footer={
          <div style={{ textAlign: 'right' }}>
            <Button onClick={closeDrawer} style={{ marginRight: 8 }}>
              Cancelar
            </Button>
            <Button
              type="primary"
              onClick={() => {
                form
                  .validateFields()
                  .then(values => saveAluno(values))
                  .catch(info => {
                    notification.error({
                      message: 'Erro ao validar formulário',
                      description: 'Verifique se todos os dados estão corretos.',
                    });
                    console.log('Validate Failed:', info);
                  });
              }}
            >
              Salvar
            </Button>
          </div>
        }

        style={{
          maxWidth: '100%',
        }}
      >
        <AlunoForm onFinish={saveAluno} form={form} initialValues={currentAluno} />
      </Drawer>
    </div>
  );
};

export default AlunoManagement;
