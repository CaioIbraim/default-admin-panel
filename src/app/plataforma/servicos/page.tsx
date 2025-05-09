'use client';

import { useState, useEffect } from 'react';
import { Button, Drawer, List, notification, Modal, Pagination, Input, Form } from 'antd';
import { FaPen, FaTrash, FaPlus, FaInfo } from 'react-icons/fa';
import { supabase } from '../../lib/supabaseClient';
import Link from 'next/link';
import dayjs from 'dayjs';
import Formulario from './Form';

import { Servicos } from '../types/Servicos'; 

const ServicosManagement = () => {
  const [form] = Form.useForm();
  const [Servicoss, setServicoss] = useState<Servicos[]>([]);
  
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [currentServicos, setCurrentServicos] = useState<Servicos | undefined>(undefined);
  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(0);
  const itemsPerPage = 10;

  const fetchServicossData = async () => {
    const { data, error, count } = await supabase
      .from('servicos')
      .select('*', { count: 'exact' })
      .ilike('nome', `%${searchTerm}%`)
      .range((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage - 1);

    if (data) {
      setServicoss(data);
      setTotalItems(count || 0);
    } else if (error) {
      console.error('Erro ao buscar Profissionais:', error.message);
    }
  };


  useEffect(() => {
    const fetchUserData = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (data && !error) {
        fetchServicossData();
      }
    };

    fetchUserData();
  }, [searchTerm, currentPage]);

  const saveServicos = async (values: any) => {
    try {
      const Servicos = { ...values, id: currentServicos?.id };
      
      const { data, error } = await supabase
        .from('servicos')
        .select('*')
        .eq('id', Servicos.id);

      

      if (data?.length !== 0 && data?.length !== undefined)  {
        // Realizar update
        const { error } = await supabase
          .from('servicos')
          .update(Servicos)
          .eq('id', Servicos.id);

        if (error) throw error;

        notification.success({
          message: 'Servicos Atualizado',
          description: 'Servicos atualizado com sucesso.',
        });
      } else {
        // Inserir
        delete Servicos.id;
        console.log([Servicos])

        const { error } = await supabase
          .from('servicos')
          .insert([Servicos]);

        if (error) throw error;

        notification.success({
          message: 'Servicos Adicionado',
          description: 'Servicos adicionado com sucesso.',
        });
      }

      closeDrawer();
      fetchServicossData();
    } catch (error) {
      console.error('Erro ao salvar Servicos:', (error as Error).message);
      notification.error({
        message: 'Erro',
        description: 'Ocorreu um erro ao salvar o Servicos.',
      });
    }
  };

  const deleteServicos = (id: number) => {
    Modal.confirm({
      title: 'Confirmar Exclusão',
      content: 'Você tem certeza que deseja excluir este Servicos?',
      okText: 'Sim',
      okType: 'danger',
      cancelText: 'Não',
      onOk: async () => {
        try {
          const { error } = await supabase
            .from('servicos')
            .delete()
            .eq('id', id);

          if (error) throw error;

          fetchServicossData();

          notification.success({
            message: 'Servicos Excluído',
            description: 'Servicos excluído com sucesso.',
          });
        } catch (error) {
          console.error('Erro ao excluir Servicos:', (error as Error).message);
        }
      },
    });
  };

  const openDrawer = (Servicos?: Servicos) => {
    setCurrentServicos(Servicos! || {
                        id : 0,
                        nome: '',
                        descricao: '',
                        preco: '',
                        imagem_url: '',
    });
    setIsEditing(!!Servicos);
    form.setFieldsValue({
      ...Servicos,
    });
    setDrawerVisible(true);
  };

  const closeDrawer = () => {
    setDrawerVisible(false);
    form.resetFields();
  };

  return (
    <div className="mx-auto max-w-md">
      <h1 className="text-xl text-center mb-5">Gerenciamento de Serviços</h1>

      <Input
        placeholder="Pesquisar Servicos..."
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
        Adicionar Servicos
      </Button>

      <List
        itemLayout="horizontal"
        dataSource={Servicoss}
        renderItem={(Servicos) => (
          <List.Item
            actions={[
              <Button
                key={Servicos.id}
                type="primary"
                icon={<FaPen />}
                onClick={() => openDrawer(Servicos)}
              />,
              <Button
                key={Servicos.id}
                type="primary"
                danger
                icon={<FaTrash />}
                onClick={() => deleteServicos(Servicos.id!)}
              />,
              <Link key={Servicos.id} href={`/servicos/${Servicos.id}`}>
                <Button type="link" icon={<FaInfo />} />
              </Link>
            ]}
          >
            <List.Item.Meta
              title={
                <div className='flex flex-row items-center space-x-2'>
                  <img src={Servicos.imagem_url} alt="" className='rounded-full w-10 h-10' />
                  <span>
                    {Servicos.nome}
                  </span> 
                </div>
              }
        
              description={
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span>Descição: {Servicos.descricao}</span>
                  <span>Preço médio: {Servicos.preco}</span>
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
        title={isEditing ? 'Editar Servicos' : 'Adicionar Servicos'}
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
                  .then(values => saveServicos(values))
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
        <Formulario onFinish={saveServicos} form={form} initialValues={currentServicos} />
      </Drawer>
    </div>
  );
};

export default ServicosManagement;
