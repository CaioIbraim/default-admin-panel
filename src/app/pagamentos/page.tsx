'use client';

import { useState, useEffect } from 'react';
import { Button, Drawer, Input, List, notification, Modal, Pagination, Select, Typography } from 'antd';
import { FaPen, FaTrash, FaPlus, FaInfo } from 'react-icons/fa';
import { supabase } from '../../lib/supabaseClient'; // Verifique o caminho correto para o arquivo supabaseClient
import Link from 'next/link';
import { Associado } from '../types/Associado';
import { Pagamento } from '../types/Pagamento';


const PagamentoManagement = () => {
  const [pagamentos, setPagamentos] = useState<Pagamento[]>([]);
  const [associados, setAssociados] = useState<Associado[]>([]);
  const [drawerVisible, setDrawerVisible] = useState<boolean>(false);
  const [currentPagamento, setCurrentPagamento] = useState<Pagamento | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [searchDate, setSearchDate] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(0);
  const itemsPerPage = 10;

  // Função para buscar dados dos pagamentos com dados do associado
  

  const fetchPagamentosData = async () => {
    let query = supabase
      .from('pagamentos')
      .select(`
        *,
        associados (
          id,
          nome,
          documento
        )
      `, { count: 'exact' })
      .range((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage - 1);
  
    // Adicionando filtros
    if (searchTerm) {
      query = query
        .or(`associado_id.ilike.%${searchTerm}%,associados.documento.ilike.%${searchTerm}%`);
    }
    if (searchDate) {
      const startDate = new Date(searchDate);
      const endDate = new Date(startDate);
      endDate.setDate(endDate.getDate() + 1); // Para buscar o dia inteiro
  
      query = query
        .gte('data_pagamento', startDate.toISOString())
        .lt('data_pagamento', endDate.toISOString());
    }
  
    const { data, error, count } = await query;
  
    if (data) {
      setPagamentos(data as Pagamento[]);
      setTotalItems(count || 0);
    } else if (error) {
      console.error('Erro ao buscar pagamentos:', error.message);
    }
  };
  

  // Função para buscar dados dos associados
  const fetchAssociados = async () => {
    const { data, error } = await supabase
      .from('associados')
      .select('*');
    if (data) {
      setAssociados(data as Associado[]);
    } else if (error) {
      console.error('Erro ao buscar associados:', error.message);
    }
  };

  // useEffect para buscar dados quando o termo de pesquisa ou a página atual mudam
  useEffect(() => {
    fetchPagamentosData();
    fetchAssociados();
  }, [searchTerm, searchDate, currentPage]);

  // Função para inserir um novo pagamento
  const insertPagamento = async (pagamento: Pagamento) => {
    try {
      const { error } = await supabase.from('pagamentos').insert([pagamento]);

      if (error) throw error;

      fetchPagamentosData();
      notification.success({
        message: 'Pagamento Adicionado',
        description: 'Pagamento adicionado com sucesso.',
      });
      closeDrawer();
    } catch (error) {
      console.error('Erro ao inserir pagamento:', (error as Error).message);
    }
  };

  // Função para atualizar um pagamento existente
  const updatePagamento = async (pagamento: Pagamento) => {
    try {
      const { associados, ...dadoPagamento } = pagamento; // Desestruturando para remover associados
      const { error } = await supabase.from('pagamentos').update(dadoPagamento).eq('id', dadoPagamento.id);
      if (error) throw error;

      fetchPagamentosData();
      notification.success({
        message: 'Pagamento Atualizado',
        description: 'Pagamento atualizado com sucesso.',
      });
      closeDrawer();
    } catch (error) {
      console.error('Erro ao atualizar pagamento:', (error as Error).message);
    }
  };

  // Função para salvar o pagamento (inserir ou atualizar)
  const savePagamento = async () => {
    if (currentPagamento) {
      if (currentPagamento.id) {
        await updatePagamento(currentPagamento);
      } else {
        await insertPagamento(currentPagamento);
      }
    } else {
      notification.error({
        message: 'Erro',
        description: 'Por favor, preencha todos os campos.',
      });
    }
  };

  // Função para abrir o drawer
  const openDrawer = () => {
    setCurrentPagamento({
      id: crypto.randomUUID(),
      associado_id: '',
      plano_id: '',
      valor_pago: 0,
      forma_pagamento: '',
      status: '',
      referencia: new Date(),
      data_pagamento: new Date(),
      associados: { 
        id: '',
        nome: '',
        documento: '',
        endereco: '',
        data_de_nascimento: new Date(),
        empresa_id: '',
        data_admissao_empresa: new Date(),
        data_ingresso_sindicato: new Date(),
        data_saida_sindicato: new Date(),
        pis: '',
        ctps: '',
        desconto_em_folha: false,
        foto: ''
      }
    });
    setIsEditing(false);
    setDrawerVisible(true);
  };

  // Função para fechar o drawer
  const closeDrawer = () => {
    setDrawerVisible(false);
  };

  // Função para deletar um pagamento
  const deletePagamento = (id: string) => {
    Modal.confirm({
      title: 'Confirmar Exclusão',
      content: 'Você tem certeza que deseja excluir este pagamento?',
      okText: 'Sim',
      okType: 'danger',
      cancelText: 'Não',
      onOk: async () => {
        try {
          const { error } = await supabase.from('pagamentos').delete().eq('id', id);

          if (error) throw error;

          fetchPagamentosData();
          notification.success({
            message: 'Pagamento Excluído',
            description: 'Pagamento excluído com sucesso.',
          });
        } catch (error) {
          console.error('Erro ao excluir pagamento:', (error as Error).message);
        }
      },
    });
  };

  return (
    <div className="mx-auto max-w-md">
      <h1 className="text-xl text-center mb-5">Gerenciamento de Pagamentos</h1>

      <div className="mb-5 flex items-center">
        <Input
          type="date"
          value={searchDate}
          onChange={(e) => setSearchDate(e.target.value)}
          placeholder="Pesquisar por data do pagamento"
          className="mr-2"
        />
        <Button onClick={fetchPagamentosData} type="primary">
          Buscar
        </Button>
      </div>

      <List
        itemLayout="horizontal"
        dataSource={pagamentos}
        renderItem={(pagamento) => (
          <List.Item
            actions={[
              <Button
                key={pagamento.id}
                type="primary"
                icon={<FaPen />}
                onClick={() => {
                  setCurrentPagamento(pagamento);
                  setIsEditing(true);
                  setDrawerVisible(true);
                }}
              />,
              <Button
                key={pagamento.id}
                type="primary"
                danger
                icon={<FaTrash />}
                onClick={() => deletePagamento(pagamento.id)}
              />,
              <Link
                key={pagamento.id}
                href={`/pagamentos/${pagamento.id}/comprovante`}
              >
                Comprovante
              </Link>,
            ]}
          >
            <List.Item.Meta
              title={
                <Link href={`/associados/${pagamento.associado_id}`}>
                  {pagamento.associados?.nome || 'N/A'}
                </Link>
              }
              description={
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span>Status: {pagamento.status}</span>
                  <span>Valor: R$ {pagamento.valor_pago.toFixed(2)}</span>
                  <span>Data do pagamento: {new Date(pagamento.data_pagamento).toLocaleDateString()}</span>
                  <span>Data de referência: {new Date(pagamento.referencia).toLocaleDateString()}</span>
                </div>
              }
            />
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
        title={isEditing ? 'Editar Pagamento' : 'Adicionar Pagamento'}
        placement="right"
        closable={true}
        onClose={closeDrawer}
        open={drawerVisible}
        width={400}
      >
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Associado</label>
          <Select
            value={currentPagamento?.associado_id}
            onChange={(value) => setCurrentPagamento(prev => prev ? { ...prev, associado_id: value } : prev)}
            placeholder="Selecione o associado"
            style={{ width: '100%' }}
            disabled
          >
            {associados.map((associado) => (
              <Select.Option key={associado.id} value={associado.id}>
                {associado.nome}
              </Select.Option>
            ))}
          </Select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Valor</label>
          <Input
            type="number"
            value={currentPagamento?.valor_pago ?? 0}
            onChange={(e) => setCurrentPagamento(prev => prev ? { ...prev, valor_pago: parseFloat(e.target.value) } : prev)}
            placeholder="Digite o valor do pagamento"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Forma de pagamento</label>
          <Select
            value={currentPagamento?.forma_pagamento}
            onChange={(value) => setCurrentPagamento(prev => prev ? { ...prev, forma_pagamento: value } : prev)}
            placeholder="Selecione a forma de pagamento"
            style={{ width: '100%' }}
          >
            <Select.Option value="cartão">Cartão</Select.Option>
            <Select.Option value="boleto">Boleto</Select.Option>
            <Select.Option value="pix">Pix</Select.Option>
            <Select.Option value="dinheiro">Dinheiro</Select.Option>
            <Select.Option value="transferência Bancária">Transferência Bancária</Select.Option>
          </Select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Status do pagamento</label>
          <Select
            value={currentPagamento?.status}
            onChange={(value) => setCurrentPagamento(prev => prev ? { ...prev, status: value } : prev)}
            placeholder="Selecione o status"
            style={{ width: '100%' }}
          >
            <Select.Option value="pendente">Pendente</Select.Option>
            <Select.Option value="pago">Pago</Select.Option>
          </Select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Data do Pagamento</label>
          <Input
            type="date"
            value={currentPagamento?.data_pagamento ? new Date(currentPagamento.data_pagamento).toISOString().substring(0, 10) : ''}
            onChange={(e) => setCurrentPagamento(prev => prev ? { ...prev, data_pagamento: new Date(e.target.value) } : prev)}
            placeholder="Digite a data do pagamento"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Referência</label>
          <Input
            type="date"
            value={currentPagamento?.referencia ? new Date(currentPagamento.referencia).toISOString().substring(0, 10) : ''}
            onChange={(e) => setCurrentPagamento(prev => prev ? { ...prev, referencia: new Date(e.target.value) } : prev)}
            placeholder="Digite a data de referência"
          />
        </div>

        <div className="flex justify-end">
          <Button onClick={savePagamento} type="primary">
            {isEditing ? 'Atualizar' : 'Salvar'}
          </Button>
        </div>
      </Drawer>
    </div>
  );
};

export default PagamentoManagement;
