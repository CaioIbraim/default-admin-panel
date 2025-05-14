'use client';

import { useState, useEffect } from 'react';
import { Button, Drawer, List, notification, Modal, Pagination, Input, Form } from 'antd';
import { FaPen, FaTrash, FaPlus, FaInfo } from 'react-icons/fa';
import { supabase } from '@/lib/supabaseClient';
import Link from 'next/link';
import TreinamentoForm from './TreinamentoForm';
import { Treinamento } from '../types/Treinamentos';
import dayjs from 'dayjs';

const TreinamentoManagement = () => {
  const [form] = Form.useForm();
  const [treinamentos, setTreinamentos] = useState<Treinamento[]>([]);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [currentTreinamento, setCurrentTreinamento] = useState<Treinamento | undefined>(undefined);
  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(0);
  const itemsPerPage = 10;

  const fetchTreinamentos = async () => {
    const { data, error, count } = await supabase
      .from('treinamentos')
      .select('*, cursos(titulo)', { count: 'exact' })
      .ilike('local', `%${searchTerm}%`)
      .range((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage - 1);

    if (data) {
      setTreinamentos(data);
      setTotalItems(count || 0);
    } else if (error) {
      notification.error({
        message: 'Erro',
        description: 'Erro ao carregar treinamentos: ' + error.message,
      });
    }
  };

  useEffect(() => {
    fetchTreinamentos();
  }, [searchTerm, currentPage]);

  const saveTreinamento = async (values: any) => {
    try {
      if (isEditing && currentTreinamento) {
        const { error } = await supabase
          .from('treinamentos')
          .update({
            ...values,
            atualizado_em: new Date().toISOString()
          })
          .eq('id', currentTreinamento.id);

        if (error) throw error;

        notification.success({
          message: 'Treinamento Atualizado',
          description: 'Treinamento atualizado com sucesso.',
        });
      } else {
        // Remove any undefined id for new records
        const { id, ...treinamentoData } = values;
        
        const { error } = await supabase
          .from('treinamentos')
          .insert([treinamentoData]);

        if (error) throw error;

        notification.success({
          message: 'Treinamento Adicionado',
          description: 'Treinamento adicionado com sucesso.',
        });
      }

      closeDrawer();
      fetchTreinamentos();
    } catch (error: any) {
      notification.error({
        message: 'Erro',
        description: 'Erro ao salvar treinamento: ' + error.message,
      });
    }
  };

  const deleteTreinamento = (id: number) => {
    Modal.confirm({
      title: 'Confirmar Exclusão',
      content: 'Tem certeza que deseja excluir este treinamento?',
      okText: 'Sim',
      okType: 'danger',
      cancelText: 'Não',
      onOk: async () => {
        const { error } = await supabase
          .from('treinamentos')
          .delete()
          .eq('id', id);

        if (error) {
          notification.error({
            message: 'Erro',
            description: 'Erro ao excluir treinamento: ' + error.message,
          });
        } else {
          notification.success({
            message: 'Sucesso',
            description: 'Treinamento excluído com sucesso.',
          });
          fetchTreinamentos();
        }
      },
    });
  };

  const openDrawer = (treinamento?: Treinamento) => {
    setCurrentTreinamento(treinamento);
    setIsEditing(!!treinamento);
    if (treinamento) {
      // Format dates for the form
      const formattedTreinamento = {
        ...treinamento,
        data_inicio: dayjs(treinamento.data_inicio),
        data_fim: dayjs(treinamento.data_fim),
      };
      form.setFieldsValue(formattedTreinamento);
    } else {
      form.resetFields();
    }
    setDrawerVisible(true);
  };

  const closeDrawer = () => {
    setDrawerVisible(false);
    form.resetFields();
  };

  return (
    <div className="mx-auto max-w-7xl p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Gerenciamento de Treinamentos</h1>
        <Button
          type="primary"
          icon={<FaPlus />}
          onClick={() => openDrawer()}
          className="bg-blue-500"
        >
          Novo Treinamento
        </Button>
      </div>

      <Input
        placeholder="Pesquisar por local..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-6"
      />

      <List
        dataSource={treinamentos}
        renderItem={(treinamento) => (
          <List.Item
            actions={[
              <Button
                key="edit"
                icon={<FaPen />}
                onClick={() => openDrawer(treinamento)}
              />,
              <Button
                key="delete"
                danger
                icon={<FaTrash />}
                onClick={() => deleteTreinamento(treinamento.id)}
              />,
              <Link key="view" href={`/treinamentos/${treinamento.id}`}>
                <Button icon={<FaInfo />} />
              </Link>
            ]}
          >
            <List.Item.Meta
              title={`Treinamento em ${treinamento.local}`}
              description={
                <div>
                  <p>Curso: {(treinamento as any).cursos?.titulo}</p>
                  <p>Início: {dayjs(treinamento.data_inicio).format('DD/MM/YYYY')}</p>
                  <p>Status: {treinamento.status}</p>
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
        onChange={setCurrentPage}
        className="mt-6"
      />

      <Drawer
        title={isEditing ? 'Editar Treinamento' : 'Novo Treinamento'}
        width={720}
        onClose={closeDrawer}
        open={drawerVisible}
      >
        <TreinamentoForm form={form} onFinish={saveTreinamento} />
      </Drawer>
    </div>
  );
};

export default TreinamentoManagement;