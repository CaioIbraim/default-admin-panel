'use client';

import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Button, notification, Modal, Form } from 'antd';
import { FaPlus } from 'react-icons/fa';
import { supabase } from '../../lib/supabaseClient';
import dayjs from 'dayjs';
import { Empresa } from '../types/Empresa'; 
import { Aluno } from '../types/Aluno'; 

const AlunoManagement = () => {

  const { testes } = useParams<{ testes: string }>();  
  const [form] = Form.useForm();
  const [Alunos, setAlunos] = useState<Aluno[]>([]);
  const [empresas, setEmpresas] = useState<Empresa[]>([]);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [currentAluno, setCurrentAluno] = useState<Aluno | undefined>(undefined);
  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(0);
  const itemsPerPage = 10;

  const fetchAlunosData = async () => {
    const { data, error, count } = await supabase
      .from('associados')
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
        fetchAlunosData();
        fetchEmpresas();
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

  const deleteAluno = (id: string) => {
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
      id: crypto.randomUUID(),
      nome: '',
      documento: '',
      endereco: '',
      data_de_nascimento: undefined,
      foto: '',
      matricula: '',
      naturalidade: '',
      estado_civil: '',
      nome_pai: '',
      nome_mae: '',
      observacao: '',
    });
    setIsEditing(!!Aluno);
    form.setFieldsValue({
      ...Aluno,
      data_de_nascimento: Aluno?.data_de_nascimento ? dayjs(Aluno.data_de_nascimento) : null,
    });
    setDrawerVisible(true);
  };

  const closeDrawer = () => {
    setDrawerVisible(false);
    form.resetFields();
  };

  return (
    <div className="mx-auto max-w-md">
      <h1 className="text-xl text-center mb-5">{testes}</h1>

    </div>
  );
};

export default AlunoManagement;
