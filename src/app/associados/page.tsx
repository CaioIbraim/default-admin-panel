'use client';

import { useState, useEffect } from 'react';
import { Button, Drawer, List, notification, Modal, Pagination, Input, Form } from 'antd';
import { FaPen, FaTrash, FaPlus, FaInfo } from 'react-icons/fa';
import { supabase } from '../../lib/supabaseClient';
import Link from 'next/link';
import dayjs from 'dayjs';
import AssociadoForm from './AssociadoForm';
import { Empresa } from '../types/Empresa'; 
import { Associado } from '../types/Associado'; 

const AssociadoManagement = () => {
  const [form] = Form.useForm();
  const [associados, setAssociados] = useState<Associado[]>([]);
  const [empresas, setEmpresas] = useState<Empresa[]>([]);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [currentAssociado, setCurrentAssociado] = useState<Associado | undefined>(undefined);
  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(0);
  const itemsPerPage = 10;

  const fetchAssociadosData = async () => {
    const { data, error, count } = await supabase
      .from('associados')
      .select('*', { count: 'exact' })
      .ilike('nome', `%${searchTerm}%`)
      .range((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage - 1);

    if (data) {
      setAssociados(data);
      setTotalItems(count || 0);
    } else if (error) {
      console.error('Erro ao buscar associados:', error.message);
    }
  };

  const fetchEmpresas = async () => {
    const { data, error } = await supabase.from('empresas').select('*');
    if (data) {
      setEmpresas(data);
    } else if (error) {
      console.error('Erro ao buscar empresas:', error.message);
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (data && !error) {
        fetchAssociadosData();
        fetchEmpresas();
      }
    };

    fetchUserData();
  }, [searchTerm, currentPage]);

  const saveAssociado = async (values: any) => {
    try {
      const associado = { ...values, id: currentAssociado?.id };
      
      const { data, error } = await supabase
        .from('associados')
        .select('*')
        .eq('id', associado.id);

      if (data?.length !== 0) {
        // Realizar update
        const { error } = await supabase
          .from('associados')
          .update(associado)
          .eq('id', associado.id);

        if (error) throw error;

        notification.success({
          message: 'Associado Atualizado',
          description: 'Associado atualizado com sucesso.',
        });
      } else {
        // Inserir
        const { error } = await supabase
          .from('associados')
          .insert([associado]);

        if (error) throw error;

        notification.success({
          message: 'Associado Adicionado',
          description: 'Associado adicionado com sucesso.',
        });
      }

      closeDrawer();
      fetchAssociadosData();
    } catch (error) {
      console.error('Erro ao salvar associado:', (error as Error).message);
      notification.error({
        message: 'Erro',
        description: 'Ocorreu um erro ao salvar o associado.',
      });
    }
  };

  const deleteAssociado = (id: string) => {
    Modal.confirm({
      title: 'Confirmar Exclusão',
      content: 'Você tem certeza que deseja excluir este associado?',
      okText: 'Sim',
      okType: 'danger',
      cancelText: 'Não',
      onOk: async () => {
        try {
          const { error } = await supabase
            .from('associados')
            .delete()
            .eq('id', id);

          if (error) throw error;

          fetchAssociadosData();

          notification.success({
            message: 'Associado Excluído',
            description: 'Associado excluído com sucesso.',
          });
        } catch (error) {
          console.error('Erro ao excluir associado:', (error as Error).message);
        }
      },
    });
  };

  const openDrawer = (associado?: Associado) => {
    setCurrentAssociado(associado || {
      id: crypto.randomUUID(),
      nome: '',
      documento: '',
      endereco: '',
      data_de_nascimento: undefined,
      empresa_id: '',
      data_admissao_empresa: undefined,
      data_ingresso_sindicato: undefined,
      data_saida_sindicato: undefined,
      pis: '',
      ctps: '',
      desconto_em_folha: false,
      foto: '',
      matricula: '',
      naturalidade: '',
      estado_civil: '',
      cargo_empresa: '',
      filhos: false,
      quantos_filhos: 0,
      nome_pai: '',
      nome_mae: '',
      titulo_eleitor: '',
      observacao: '',
    });
    setIsEditing(!!associado);
    form.setFieldsValue({
      ...associado,
      data_de_nascimento: associado?.data_de_nascimento ? dayjs(associado.data_de_nascimento) : null,
      data_admissao_empresa: associado?.data_admissao_empresa ? dayjs(associado.data_admissao_empresa) : null,
      data_ingresso_sindicato: associado?.data_ingresso_sindicato ? dayjs(associado.data_ingresso_sindicato) : null,
      data_saida_sindicato: associado?.data_saida_sindicato ? dayjs(associado.data_saida_sindicato) : null,
    });
    setDrawerVisible(true);
  };

  const closeDrawer = () => {
    setDrawerVisible(false);
    form.resetFields();
  };

  return (
    <div className="mx-auto max-w-md">
      <h1 className="text-xl text-center mb-5">Gerenciamento de Associados</h1>

      <Input
        placeholder="Pesquisar associado..."
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
        Adicionar Associado
      </Button>

      <List
        itemLayout="horizontal"
        dataSource={associados}
        renderItem={(associado) => (
          <List.Item
            actions={[
              <Button
                key={associado.id}
                type="primary"
                icon={<FaPen />}
                onClick={() => openDrawer(associado)}
              />,
              <Button
                key={associado.id}
                type="primary"
                danger
                icon={<FaTrash />}
                onClick={() => deleteAssociado(associado.id!)}
              />,
              <Link key={associado.id} href={`/associados/${associado.id}`}>
                <Button type="link" icon={<FaInfo />} />
              </Link>
            ]}
          >
            <List.Item.Meta
              title={associado.nome}
              description={
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span>Documento:  {associado.documento}</span>
                <span>Status: { associado.status == false ? <span className='bg-red-100 p-1 rounded-md text-red-600 '>Inativo</span> : <span className='bg-green-100 p-1 rounded-md text-green-600 '>Ativo</span>}</span>
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
        title={isEditing ? 'Editar Associado' : 'Adicionar Associado'}
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
                  .then(values => saveAssociado(values))
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
        <AssociadoForm onFinish={saveAssociado} form={form} empresas={empresas} initialValues={currentAssociado} />
      </Drawer>
    </div>
  );
};

export default AssociadoManagement;
