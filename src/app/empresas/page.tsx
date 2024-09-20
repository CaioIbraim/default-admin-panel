'use client';

import { useState, useEffect } from 'react';
import { Button, Drawer, Input, List, notification, Modal, Pagination } from 'antd';
import { FaPen, FaTrash, FaPlus, FaInfo } from 'react-icons/fa';
import { supabase } from '../../lib/supabaseClient';
import { Empresa } from '../types/Empresa';


const EmpresaManagement = () => {
  const [empresas, setEmpresas] = useState<Empresa[]>([]);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [currentEmpresa, setCurrentEmpresa] = useState<Empresa | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(0);
  const itemsPerPage = 10;

  const fetchEmpresasData = async () => {
    const { data, error, count } = await supabase
      .from('empresas')
      .select('*', { count: 'exact' })
      .ilike('nome', `%${searchTerm}%`)
      .range((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage - 1);

    if (data) {
      setEmpresas(data);
      setTotalItems(count || 0);
    } else if (error) {
      console.error('Erro ao buscar empresas:', error.message);
    }
  };

  useEffect(() => {
    fetchEmpresasData();
  }, [searchTerm, currentPage]);

  const insertEmpresa = async (empresa: Empresa) => {
    try {
      const { data, error } = await supabase.from('empresas').insert([empresa]);

      if (error) throw error;

      fetchEmpresasData();
      notification.success({
        message: 'Empresa Adicionada',
        description: 'Empresa adicionada com sucesso.',
      });
      closeDrawer();
    } catch (error) {
      console.error('Erro ao inserir empresa:', (error as Error).message);
    }
  };

  const updateEmpresa = async (empresa: Empresa) => {
    try {
      const { data, error } = await supabase.from('empresas').update(empresa).eq('id', empresa.id);

      if (error) throw error;

      fetchEmpresasData();
      notification.success({
        message: 'Empresa Atualizada',
        description: 'Empresa atualizada com sucesso.',
      });
      closeDrawer();
    } catch (error) {
      console.error('Erro ao atualizar empresa:', (error as Error).message);
    }
  };

  const saveEmpresa = async () => {
    if (currentEmpresa) {
      try {
        const { id, ...empresaData } = currentEmpresa;
  
        if (id) {
          const { data, error: fetchError } = await supabase
            .from('empresas')
            .select('id')
            .eq('id', id);
  
          if (fetchError) {
            throw fetchError;
          }
  
          if (data?.length === 0) {
            await supabase
              .from('empresas')
              .insert([{ ...empresaData, id }]);
          } else {
            await supabase
              .from('empresas')
              .update(empresaData)
              .eq('id', id);
          }
        } else {
          await supabase
            .from('empresas')
            .insert([empresaData]);
        }
  
        notification.success({
          message: id ? 'Empresa Atualizada' : 'Empresa Adicionada',
          description: id ? 'Empresa atualizada com sucesso.' : 'Empresa adicionada com sucesso.',
        });
        closeDrawer();
        fetchEmpresasData(); // Função fictícia para recarregar a lista de empresas, ajuste conforme necessário.
      } catch (error) {
        console.error('Erro ao salvar empresa:', (error as Error).message);
        notification.error({
          message: 'Erro',
          description: 'Ocorreu um erro ao salvar a empresa.',
        });
      }
    } else {
      notification.error({
        message: 'Erro',
        description: 'Por favor, preencha todos os campos.',
      });
    }
  };
  

  const openDrawer = () => {
    setCurrentEmpresa({
      id: crypto.randomUUID(),
      nome: '',
      cnpj: '',
      endereco: '',
    });
    setIsEditing(false);
    setDrawerVisible(true);
  };

  const closeDrawer = () => {
    setDrawerVisible(false);
  };

  const deleteEmpresa = (id: string) => {
    Modal.confirm({
      title: 'Confirmar Exclusão',
      content: 'Você tem certeza que deseja excluir esta empresa?',
      okText: 'Sim',
      okType: 'danger',
      cancelText: 'Não',
      onOk: async () => {
        try {
          const { error } = await supabase.from('empresas').delete().eq('id', id);

          if (error) throw error;

          fetchEmpresasData();
          notification.success({
            message: 'Empresa Excluída',
            description: 'Empresa excluída com sucesso.',
          });
        } catch (error) {
          console.error('Erro ao excluir empresa:', (error as Error).message);
        }
      },
    });
  };

  return (
    <div className="mx-auto max-w-md">
      <h1 className="text-xl text-center mb-5">Gerenciamento de Empresas</h1>

      <Input
        placeholder="Pesquisar empresa..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-5"
      />

      <Button
        type="primary"
        className="mb-5 p-5 bg-[#3da399] text-white rounded flex items-center w-full"
        icon={<FaPlus />}
        onClick={openDrawer}
      >
        Adicionar Empresa
      </Button>

      <List
        itemLayout="horizontal"
        dataSource={empresas}
        renderItem={(empresa) => (
          <List.Item
            actions={[
              <Button
                key={empresa.id}
                type="primary"
                icon={<FaPen />}
                onClick={() => {
                  setCurrentEmpresa(empresa);
                  setIsEditing(true);
                  setDrawerVisible(true);
                }}
              />,
              <Button
                key={empresa.id}
                type="primary"
                danger
                icon={<FaTrash />}
                onClick={() => deleteEmpresa(empresa.id!)}
              />,
            ]}
          >
            <List.Item.Meta title={empresa.nome} description={`CNPJ: ${empresa.cnpj}`} />
          </List.Item>
        )}
      />

      <Pagination
        current={currentPage}
        total={totalItems}
        pageSize={itemsPerPage}
        onChange={(page) => setCurrentPage(page)}
        className="mt-5"
      />

      <Drawer
        title={isEditing ? 'Editar Empresa' : 'Adicionar Empresa'}
        placement="right"
        closable={true}
        onClose={closeDrawer}
        open={drawerVisible}
        width={400}
      >
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Nome</label>
          <Input
            type="text"
            value={currentEmpresa?.nome ?? ''}
            onChange={(e) => setCurrentEmpresa((prev) => ({ ...prev!, nome: e.target.value }))}
            placeholder="Digite o nome da empresa"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">CNPJ</label>
          <Input
            type="text"
            value={currentEmpresa?.cnpj ?? ''}
            onChange={(e) => setCurrentEmpresa((prev) => ({ ...prev!, cnpj: e.target.value }))}
            placeholder="Digite o CNPJ da empresa"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Endereço</label>
          <Input
            type="text"
            value={currentEmpresa?.endereco ?? ''}
            onChange={(e) => setCurrentEmpresa((prev) => ({ ...prev!, endereco: e.target.value }))}
            placeholder="Digite o endereço da empresa"
          />
        </div>
        <div className="flex justify-end">
          <Button onClick={saveEmpresa} type="primary">
            {isEditing ? 'Atualizar' : 'Salvar'}
          </Button>
        </div>
      </Drawer>
    </div>
  );
};

export default EmpresaManagement;
