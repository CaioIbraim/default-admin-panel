'use client';

import { useState, useEffect } from 'react';
import { Button, Drawer, List, notification, Modal, Pagination, Input, Form } from 'antd';
import { FaPen, FaTrash, FaPlus, FaInfo } from 'react-icons/fa';
import { supabase } from '@/lib/supabaseClient';
import Link from 'next/link';
import dayjs from 'dayjs';
import Formulario from './Form';

import { Profissional } from '../types/Profissional'; 

const ProfissionalManagement = () => {
  const [form] = Form.useForm();
  const [Profissionals, setProfissionals] = useState<Profissional[]>([]);
  
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [currentProfissional, setCurrentProfissional] = useState<Profissional | undefined>(undefined);
  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(0);
  const itemsPerPage = 10;

  const fetchProfissionalsData = async () => {
    const { data, error, count } = await supabase
      .from('profissionais')
      .select('*', { count: 'exact' })
      .ilike('nome', `%${searchTerm}%`)
      .range((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage - 1);

    if (data) {
      setProfissionals(data);
      setTotalItems(count || 0);
    } else if (error) {
      console.error('Erro ao buscar Profissionais:', error.message);
    }
  };


  useEffect(() => {
    const fetchUserData = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (data && !error) {
        fetchProfissionalsData();
      }
    };

    fetchUserData();
  }, [searchTerm, currentPage]);

  const saveProfissional = async (values: any) => {
    try {
      const Profissional = { ...values, id: currentProfissional?.id };
      
      const { data, error } = await supabase
        .from('profissionais')
        .select('*')
        .eq('id', Profissional.id);

      

      if (data?.length !== 0 && data?.length !== undefined)  {
        // Realizar update
        const { error } = await supabase
          .from('profissionais')
          .update(Profissional)
          .eq('id', Profissional.id);

        if (error) throw error;

        notification.success({
          message: 'Profissional Atualizado',
          description: 'Profissional atualizado com sucesso.',
        });
      } else {
        // Inserir
        delete Profissional.id;
        console.log([Profissional])

        const { error } = await supabase
          .from('profissionais')
          .insert([Profissional]);

        if (error) throw error;

        notification.success({
          message: 'Profissional Adicionado',
          description: 'Profissional adicionado com sucesso.',
        });
      }

      closeDrawer();
      fetchProfissionalsData();
    } catch (error) {
      console.error('Erro ao salvar Profissional:', (error as Error).message);
      notification.error({
        message: 'Erro',
        description: 'Ocorreu um erro ao salvar o Profissional.',
      });
    }
  };

  const deleteProfissional = (id: number) => {
    Modal.confirm({
      title: 'Confirmar Exclusão',
      content: 'Você tem certeza que deseja excluir este Profissional?',
      okText: 'Sim',
      okType: 'danger',
      cancelText: 'Não',
      onOk: async () => {
        try {
          const { error } = await supabase
            .from('profissionais')
            .delete()
            .eq('id', id);

          if (error) throw error;

          fetchProfissionalsData();

          notification.success({
            message: 'Profissional Excluído',
            description: 'Profissional excluído com sucesso.',
          });
        } catch (error) {
          console.error('Erro ao excluir Profissional:', (error as Error).message);
        }
      },
    });
  };

  const openDrawer = (Profissional?: Profissional) => {
    setCurrentProfissional(Profissional! || {
                        id : 0,
                        nome: '',
                        email: '',
                        telefone : '',
                        data_criacao: '',
                        imagem_url: '',
    });
    setIsEditing(!!Profissional);
    form.setFieldsValue({
      ...Profissional,
    });
    setDrawerVisible(true);
  };

  const closeDrawer = () => {
    setDrawerVisible(false);
    form.resetFields();
  };

  return (
    <div className="mx-auto max-w-md">
      <h1 className="text-xl text-center mb-5">Gerenciamento de Profissionais</h1>

      <Input
        placeholder="Pesquisar Profissional..."
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
        Adicionar Profissional
      </Button>

      <List
        itemLayout="horizontal"
        dataSource={Profissionals}
        renderItem={(Profissional) => (
          <List.Item
            actions={[
              <Button
                key={Profissional.id}
                type="primary"
                icon={<FaPen />}
                onClick={() => openDrawer(Profissional)}
              />,
              <Button
                key={Profissional.id}
                type="primary"
                danger
                icon={<FaTrash />}
                onClick={() => deleteProfissional(Profissional.id!)}
              />,
              <Link key={Profissional.id} href={`/profissionais/${Profissional.id}`}>
                <Button type="link" icon={<FaInfo />} />
              </Link>
            ]}
          >
            <List.Item.Meta
              title={
                <div className='flex flex-row items-center space-x-2'>
                  <img src={Profissional.imagem_url} alt="" className='rounded-full w-10 h-10' />
                  <span>
                    {Profissional.nome}
                  </span> 
                </div>
              }
        
              description={
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span>E-mail: {Profissional.email}</span>
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
        title={isEditing ? 'Editar Profissional' : 'Adicionar Profissional'}
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
                  .then(values => saveProfissional(values))
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
        <Formulario onFinish={saveProfissional} form={form} initialValues={currentProfissional} />
      </Drawer>
    </div>
  );
};

export default ProfissionalManagement;
