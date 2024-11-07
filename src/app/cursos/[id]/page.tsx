'use client';

import { useState, useEffect } from 'react';
import { Button, Modal, Table, Input, notification, Typography, Tabs, Form, Upload } from 'antd';
import { useParams } from 'next/navigation';
import { supabase } from '../../../lib/supabaseClient';
import { Curso } from '../../types/Cursos';
import { Aula } from '../../types/Aula';
import { FaPen, FaTrash } from 'react-icons/fa';
import {generateRandomFileName} from '../../../lib/utilidades'

const { Title } = Typography;
const { TabPane } = Tabs;

const CursoManagement = () => {
  const [form] = Form.useForm();
  const { id } = useParams<{ id: string }>();

  // Estado do curso
  const [curso, setCurso] = useState<Curso | null>(null);

  // Estado das aulas
  const [aulas, setAulas] = useState<Aula[]>([]);

  // Modal visibility states
  const [AulaModalVisible, setAulaModalVisible] = useState(false);

  // Dados atuais de aula
  const [currentAula, setCurrentAula] = useState<Aula | null>(null);

  // Estado de edição
  const [isEditing, setIsEditing] = useState(false);

  // Função para buscar o curso
  const fetchCurso = async () => {
    if (id) {
      const { data, error } = await supabase.from('cursos').select('*, aulas(*)').eq('id', id).single();
      if (data) {
        setCurso(data);
        setAulas(data.aulas || []); // Assumindo que 'aulas' é o campo correto
      } else if (error) {
        console.error('Erro ao buscar curso:', error.message);
      }
    }
  };

  useEffect(() => {
    fetchCurso();
  }, [id]);

  // Funções de abrir e fechar modais
  const openAulaModal = (aula?: Aula) => {
    setCurrentAula(aula || null);
    setIsEditing(!!aula);
    form.setFieldsValue(aula);
    setAulaModalVisible(true);
  };

  const closeAulaModal = () => {
    setAulaModalVisible(false);
    form.resetFields();
  };

  // Função para fazer o upload da imagem
  const handleVideoUpload = async (file: File) => {
    try {
      
      const randomFileName = generateRandomFileName(file.name); // Gera um nome aleatório
      const { data, error } = await supabase.storage
        .from('bucket') // Nome do bucket que você criou no Supabase
        .upload(`public/${randomFileName}`, file, {
          cacheControl: '3600',
          upsert: false,
        });

      if (error) {
        throw error; // Lança o erro para ser tratado no catch
      }

      console.log('File uploaded:', data.fullPath);

      const imageUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${data.fullPath}`;
      // setUploadedImagePath(imageUrl);
      // setUploadedImage(randomFileName); // Armazena o nome aleatório da imagem
      
      form.setFieldsValue({ banner_url: imageUrl }); // Atualiza o campo imagem_url no formulário
      return data; // Retorna os dados da resposta
        } catch (error) {
      alert('Erro ao fazer upload da imagem. Por favor, tente novamente.'); // Feedback ao usuário
      return null; // Retorna null em caso de erro
        }
  };

  // Função para salvar ou atualizar aula
  const saveAula = async () => {
    try {
      // Faz o upload do vídeo se houver
      const videoFile = form.getFieldValue('video');
      let videoUrl = null;

      if (videoFile && videoFile.file) {
        videoUrl = await handleVideoUpload(videoFile.file); // Chama a função de upload do vídeo
      }

      // Se o vídeo foi carregado, inclui o URL no objeto de dados da aula
      const aulaData = {
        ...form.getFieldsValue(),
        video_url: videoUrl || currentAula?.video_url, // Mantém o vídeo atual se não houver novo
      };

      if (isEditing && currentAula) {
        // Atualizando a aula existente
        const { error } = await supabase.from('aulas').update(aulaData).eq('id', currentAula.id);
        if (error) throw error;
        notification.success({
          message: 'Aula Atualizada',
          description: 'Aula foi atualizada com sucesso.',
        });
      } else {
        // Adicionando nova aula
        const { error } = await supabase.from('aulas').insert([aulaData]);
        if (error) throw error;
        notification.success({
          message: 'Aula Adicionada',
          description: 'Aula foi salva com sucesso.',
        });
      }

      closeAulaModal();
      fetchCurso(); // Atualiza o curso e as aulas
    } catch (error) {
      console.error('Erro ao salvar aula:', (error as Error).message);
    }
  };

  // Função para excluir aula
  const deleteAula = async (id: number) => {
    Modal.confirm({
      title: 'Confirmar Exclusão',
      content: 'Você tem certeza que deseja excluir esta aula?',
      okText: 'Sim',
      okType: 'danger',
      cancelText: 'Não',
      onOk: async () => {
        try {
          const { error } = await supabase.from('aulas').delete().eq('id', id);
          if (error) throw error;
          fetchCurso();
          notification.success({
            message: 'Aula Excluída',
            description: 'Aula excluída com sucesso.',
          });
        } catch (error) {
          console.error('Erro ao excluir aula:', (error as Error).message);
        }
      },
    });
  };

  // Definindo colunas da tabela de aulas
  const columns = [
    { title: 'Título da Aula', dataIndex: 'titulo', key: 'titulo' },
    { title: 'Duração da Aula', dataIndex: 'duracao', key: 'duracao' },
    {
      title: 'Ações',
      key: 'actions',
      render: (text: any, record: Aula) => (
        <>
          <Button type="link" onClick={() => openAulaModal(record)}><FaPen /> Editar</Button>
          <Button type="link" danger onClick={() => deleteAula(record.id)}><FaTrash /> Excluir</Button>
        </>
      ),
    },
  ];

  return (
    <div className="mx-auto max-w-4xl p-4">
      <Title level={1} className="text-center mb-5">Informações do Curso</Title>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Dados do Curso" key="1">
          {curso ? (
            <>
              {/* Exibição dos dados do curso */}
              <Table
                dataSource={[curso]}
                columns={[
                  { title: 'Foto', dataIndex: 'banner_url', key: 'banner_url', render: (text: string) => text ? <img src={text} className="rounded-full w-32 h-32" /> : null },
                ]}
                rowKey="id"
                pagination={false}
                className="mt-4"
              />

              <Table
                dataSource={[curso]}
                columns={[
                  { title: 'Título', dataIndex: 'titulo', key: 'titulo' },
                  { title: 'Descrição', dataIndex: 'descricao', key: 'descricao' },
                  { title: 'Carga Horária', dataIndex: 'carga_horaria', key: 'carga_horaria' },
                  { title: 'Categoria', dataIndex: 'categoria', key: 'categoria' },
                ]}
                rowKey="id"
                pagination={false}
                className="mt-4"
              />
            </>
          ) : (
            <p>Carregando curso...</p>
          )}
        </TabPane>

        <TabPane tab="Aulas" key="4">
          <Button type="primary" onClick={() => openAulaModal()} className="mb-4">Adicionar Aula</Button>
          <Table
            dataSource={aulas}
            columns={columns}
            rowKey="id"
            pagination={false}
            className="mt-4"
          />
        </TabPane>

        
      </Tabs>



      {/* Modal de Aula */}
      <Modal
          title={isEditing ? 'Editar Aula' : 'Adicionar Aula'}
          visible={AulaModalVisible}
          onOk={saveAula}
          onCancel={closeAulaModal}
          footer={[
            <Button key="cancel" onClick={closeAulaModal}>Cancelar</Button>,
            <Button key="submit" type="primary" onClick={saveAula}>Salvar</Button>,
          ]}
        >
          <Form form={form} layout="vertical" initialValues={currentAula!}>
            <Form.Item name="titulo" label="Título" rules={[{ required: true, message: 'Por favor, insira o título da aula' }]}>
              <Input />
            </Form.Item>

            <Form.Item name="duracao" label="Duração (em minutos)" rules={[{ required: true, message: 'Por favor, insira a duração da aula' }]}>
              <Input type="number" />
            </Form.Item>

            <Form.Item name="texto" label="Descrição">
              <Input.TextArea rows={4} />
            </Form.Item>

            <Form.Item name="video_url" label="Upload do Vídeo" valuePropName="file" getValueFromEvent={e => e?.file}>
              <Upload name="video_url" beforeUpload={() => false}>
                <Button>Selecionar Vídeo</Button>
              </Upload>
            </Form.Item>
          </Form>
        </Modal>
    </div>
  );
};

export default CursoManagement;
