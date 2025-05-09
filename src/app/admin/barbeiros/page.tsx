'use client';

import { useState, useEffect } from 'react';
import { Button, Drawer, List, notification, Modal, Pagination, Input, Form } from 'antd';
import { FaPen, FaTrash, FaPlus, FaInfo } from 'react-icons/fa';
import { supabase } from '../../lib/supabaseClient';
import Link from 'next/link';
import dayjs from 'dayjs';
import Formulario from './Form';

import { Barbeiro } from '../types/Barbeiro'; 

const BarbeiroManagement = () => {
  const [form] = Form.useForm();
  const [Barbeiros, setBarbeiros] = useState<Barbeiro[]>([]);
  
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [currentBarbeiro, setCurrentBarbeiro] = useState<Barbeiro | undefined>(undefined);
  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(0);
  const itemsPerPage = 10;

  const fetchBarbeirosData = async () => {
    const { data, error, count } = await supabase
      .from('alunos')
      .select('*', { count: 'exact' })
      .ilike('nome', `%${searchTerm}%`)
      .range((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage - 1);

    if (data) {
      setBarbeiros(data);
      setTotalItems(count || 0);
    } else if (error) {
      console.error('Erro ao buscar Barbeiros:', error.message);
    }
  };


  useEffect(() => {
    const fetchUserData = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (data && !error) {
        fetchBarbeirosData();
      }
    };

    fetchUserData();
  }, [searchTerm, currentPage]);

  const saveBarbeiro = async (values: any) => {
    try {
      const Barbeiro = { ...values, id: currentBarbeiro?.id };
      
      const { data, error } = await supabase
        .from('alunos')
        .select('*')
        .eq('id', Barbeiro.id);

      

      if (data?.length !== 0 && data?.length !== undefined)  {
        // Realizar update
        const { error } = await supabase
          .from('alunos')
          .update(Barbeiro)
          .eq('id', Barbeiro.id);

        if (error) throw error;

        notification.success({
          message: 'Barbeiro Atualizado',
          description: 'Barbeiro atualizado com sucesso.',
        });
      } else {
        // Inserir
        delete Barbeiro.id;
        console.log([Barbeiro])

        const { error } = await supabase
          .from('alunos')
          .insert([Barbeiro]);

        if (error) throw error;

        notification.success({
          message: 'Barbeiro Adicionado',
          description: 'Barbeiro adicionado com sucesso.',
        });
      }

      closeDrawer();
      fetchBarbeirosData();
    } catch (error) {
      console.error('Erro ao salvar Barbeiro:', (error as Error).message);
      notification.error({
        message: 'Erro',
        description: 'Ocorreu um erro ao salvar o Barbeiro.',
      });
    }
  };

  const deleteBarbeiro = (id: number) => {
    Modal.confirm({
      title: 'Confirmar Exclusão',
      content: 'Você tem certeza que deseja excluir este Barbeiro?',
      okText: 'Sim',
      okType: 'danger',
      cancelText: 'Não',
      onOk: async () => {
        try {
          const { error } = await supabase
            .from('alunos')
            .delete()
            .eq('id', id);

          if (error) throw error;

          fetchBarbeirosData();

          notification.success({
            message: 'Barbeiro Excluído',
            description: 'Barbeiro excluído com sucesso.',
          });
        } catch (error) {
          console.error('Erro ao excluir Barbeiro:', (error as Error).message);
        }
      },
    });
  };

  const openDrawer = (Barbeiro?: Barbeiro) => {
    setCurrentBarbeiro(Barbeiro! || {
                        id : 0,
                        nome: '',
                        email: '',
                        dataCadastro: '',
                        ativo: '',
                        atualizadoEm: '',
                        image_url: '',
    });
    setIsEditing(!!Barbeiro);
    form.setFieldsValue({
      ...Barbeiro,
    });
    setDrawerVisible(true);
  };

  const closeDrawer = () => {
    setDrawerVisible(false);
    form.resetFields();
  };

  return (
    <div className="mx-auto max-w-md">
      <h1 className="text-xl text-center mb-5">Gerenciamento de Barbeiros</h1>

      <Input
        placeholder="Pesquisar Barbeiro..."
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
        Adicionar Barbeiro
      </Button>

      <List
        itemLayout="horizontal"
        dataSource={Barbeiros}
        renderItem={(Barbeiro) => (
          <List.Item
            actions={[
              <Button
                key={Barbeiro.id}
                type="primary"
                icon={<FaPen />}
                onClick={() => openDrawer(Barbeiro)}
              />,
              <Button
                key={Barbeiro.id}
                type="primary"
                danger
                icon={<FaTrash />}
                onClick={() => deleteBarbeiro(Barbeiro.id!)}
              />,
              <Link key={Barbeiro.id} href={`/alunos/${Barbeiro.id}`}>
                <Button type="link" icon={<FaInfo />} />
              </Link>
            ]}
          >
            <List.Item.Meta
              title={
                <div className='flex flex-row items-center space-x-2'>
                  <img src={Barbeiro.image_url} alt="" className='rounded-full w-10 h-10' />
                  <span>
                    {Barbeiro.nome}
                  </span> 
                </div>
              }
        
              description={
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span>E-mail: {Barbeiro.email}</span>
                  {/* <span>Tipo de caddasto: Cadastro via landingpage</span>
                  <span>Cursos: JavaScript Básico, HTML Básico, Python</span>
                  <span>Treinamentos: Nenhum</span> */}
                  <span>Status: { Barbeiro.ativo == false ? <span className='bg-red-100 p-1 rounded-md text-red-600 '>Inativo</span> : <span className='bg-green-100 p-1 rounded-md text-green-600 '>Ativo</span>}</span>
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
        title={isEditing ? 'Editar Barbeiro' : 'Adicionar Barbeiro'}
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
                  .then(values => saveBarbeiro(values))
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
        <Formulario onFinish={saveBarbeiro} form={form} initialValues={currentBarbeiro} />
      </Drawer>
    </div>
  );
};

export default BarbeiroManagement;
