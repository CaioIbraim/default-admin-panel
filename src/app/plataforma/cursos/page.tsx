'use client';

import { useState, useEffect } from 'react';
import { Button, Drawer, List, notification, Modal, Pagination, Input, Form } from 'antd';
import { FaPen, FaTrash, FaPlus, FaInfo } from 'react-icons/fa';
import { supabase } from '../../lib/supabaseClient';
import Link from 'next/link';
import dayjs from 'dayjs';
import Formulario from './Form';

import { Curso } from '../types/Cursos'; 

const CursoManagement = () => {
  const [form] = Form.useForm();
  const [Cursos, setCursos] = useState<Curso[]>([]);
  
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [currentCurso, setCurrentCurso] = useState<Curso | undefined>(undefined);
  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(0);
  const itemsPerPage = 10;

  const fetchCursosData = async () => {
    const { data, error, count } = await supabase
      .from('cursos')
      .select('*', { count: 'exact' })
      .ilike('titulo', `%${searchTerm}%`)
      .range((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage - 1);

    if (data) {
      setCursos(data);
      setTotalItems(count || 0);
    } else if (error) {
      console.error('Erro ao buscar Cursos:', error.message);
    }
  };


  useEffect(() => {
    const fetchUserData = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (data && !error) {
        fetchCursosData();
      }
    };

    fetchUserData();
  }, [searchTerm, currentPage]);

  const saveCurso = async (values: any) => {
    try {
      const Curso = { ...values, id: currentCurso?.id };
      
      const { data, error } = await supabase
        .from('cursos')
        .select('*')
        .eq('id', Curso.id);

      

      if (data?.length !== 0 && data?.length !== undefined)  {
        // Realizar update
        const { error } = await supabase
          .from('cursos')
          .update(Curso)
          .eq('id', Curso.id);

        if (error) throw error;

        notification.success({
          message: 'Curso Atualizado',
          description: 'Curso atualizado com sucesso.',
        });
      } else {
        // Inserir
        delete Curso.id;
        console.log([Curso])

        const { error } = await supabase
          .from('cursos')
          .insert([Curso]);

        if (error) throw error;

        notification.success({
          message: 'Curso Adicionado',
          description: 'Curso adicionado com sucesso.',
        });
      }

      closeDrawer();
      fetchCursosData();
    } catch (error) {
      console.error('Erro ao salvar Curso:', (error as Error).message);
      notification.error({
        message: 'Erro',
        description: 'Ocorreu um erro ao salvar o Curso.',
      });
    }
  };

  const deleteCurso = (id: number) => {
    Modal.confirm({
      title: 'Confirmar Exclusão',
      content: 'Você tem certeza que deseja excluir este Curso?',
      okText: 'Sim',
      okType: 'danger',
      cancelText: 'Não',
      onOk: async () => {
        try {
          const { error } = await supabase
            .from('cursos')
            .delete()
            .eq('id', id);

          if (error) throw error;

          fetchCursosData();

          notification.success({
            message: 'Curso Excluído',
            description: 'Curso excluído com sucesso.',
          });
        } catch (error) {
          console.error('Erro ao excluir Curso:', (error as Error).message);
        }
      },
    });
  };

  const openDrawer = (Curso?: Curso) => {
    setCurrentCurso(Curso! || {
                        id : 0,
                        titulo: '',
                        descricao: '',
                        carga_horaria: 0,
                        categoria: '', // para classificação
                        criado_em: new Date(),
                        atualizado_em: new Date(),
                        banner_url : '',
    });
    setIsEditing(!!Curso);
    form.setFieldsValue({
      ...Curso,
    });
    setDrawerVisible(true);
  };

  const closeDrawer = () => {
    setDrawerVisible(false);
    form.resetFields();
  };

  return (
    <div className="mx-auto max-w-md">
      <h1 className="text-xl text-center mb-5">Gerenciamento de Cursos</h1>

      <Input
        placeholder="Pesquisar Curso..."
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
        Adicionar Curso
      </Button>

      <List
        itemLayout="horizontal"
        dataSource={Cursos}
        renderItem={(Curso) => (
          <List.Item
            actions={[
              <Button
                key={Curso.id}
                type="primary"
                icon={<FaPen />}
                onClick={() => openDrawer(Curso)}
              />,
              <Button
                key={Curso.id}
                type="primary"
                danger
                icon={<FaTrash />}
                onClick={() => deleteCurso(Curso.id!)}
              />,
              <Link key={Curso.id} href={`/cursos/${Curso.id}`}>
                <Button type="link" icon={<FaInfo />} />
              </Link>
            ]}
          >
            <List.Item.Meta
              title={
                <div className='flex flex-row items-center space-x-2'>
                  <img src={Curso.banner_url} alt="" className='rounded-full w-10 h-10' />
                  <span>
                    {Curso.titulo}
                  </span> 
                </div>
              }
        
              description={
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span>Descrição: {Curso.descricao}</span>
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
        title={isEditing ? 'Editar Curso' : 'Adicionar Curso'}
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
                  .then(values => saveCurso(values))
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
        <Formulario onFinish={saveCurso} form={form} initialValues={currentCurso} />
      </Drawer>
    </div>
  );
};

export default CursoManagement;
