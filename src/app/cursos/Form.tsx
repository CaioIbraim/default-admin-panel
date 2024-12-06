import React, { useEffect, useState } from 'react';
import { Form, Input, DatePicker, Select, Tabs, Button } from 'antd';
import { supabase } from '../../lib/supabaseClient';
import { Curso } from '../types/Cursos';
import { CategoriaCurso } from '../types/CategoriaCurso';


import dayjs from 'dayjs';
import 'dayjs/locale/pt-br'; // Importa a localidade para o formato brasileiro

// Configura o dayjs para usar o locale brasileiro
dayjs.locale('pt-br');

const { TabPane } = Tabs;

const statusOptions = [
  { id: true, nome: 'Ativo' },
  { id: false, nome: 'Inativo' }
];

interface CursoFormValues extends Curso {}

interface CursoFormProps {
  form: any;
  initialValues?: Curso; // Tipo correto
  onFinish: (values: CursoFormValues) => void; // Função para lidar com a submissão
}

const CursoForm: React.FC<CursoFormProps> = ({ form, initialValues, onFinish }) => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null); // Estado para armazenar o nome da imagem
  const [uploadedImagePath, setUploadedImagePath] = useState<string | null>(null); // Estado para armazenar o caminho da imagem
  const [categoriasCursos, setCategoriasCursos] = useState<CategoriaCurso[]>([]);

  const fetchCategorias = async () => {
    
      const { data, error } = await supabase.from('categoria_curso').select('*');
      if (data) {
        setCategoriasCursos(data);
      } else if (error) {
        console.error('Erro ao buscar aluno:', error.message);
      }
    
  };

  // Função para gerar um nome de arquivo aleatório
  const generateRandomFileName = (originalName: string) => {
    const extension = originalName.split('.').pop();
    const randomName = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    return `${randomName}.${extension}`;
  };

  // Função para deletar a imagem anterior
  const deletePreviousImage = async (imageUrl: string) => {
    const path = imageUrl.split('/storage/v1/object/public/')[1]; // Extrai o caminho do arquivo
    const { error } = await supabase.storage.from('bucket').remove([path]);
    if (error) {
      console.error('Error deleting file:', error);
      alert('Erro ao deletar a imagem anterior.');
    }
  };

  // Função para fazer o upload da imagem
  const uploadImage = async (file: File) => {
    try {
      if (initialValues?.banner_url) {
        await deletePreviousImage(initialValues.banner_url); // Deleta a imagem anterior, se existir
      }

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
      setUploadedImagePath(imageUrl);
      setUploadedImage(randomFileName); // Armazena o nome aleatório da imagem
      
      form.setFieldsValue({ banner_url: imageUrl }); // Atualiza o campo imagem_url no formulário
      return data; // Retorna os dados da resposta
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Erro ao fazer upload da imagem. Por favor, tente novamente.'); // Feedback ao usuário
      return null; // Retorna null em caso de erro
    }
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      await uploadImage(file); // Faz o upload da imagem assim que um arquivo é selecionado
    }
  };




  useEffect(() => {
    // Limpa o estado de imagem ao carregar o formulário
    if (initialValues) {
      setUploadedImage(null);
      setUploadedImagePath(null);
    }
  }, [initialValues]);

  useEffect(() => {
    fetchCategorias();
  }, [initialValues]);
  
  return (
    <Form
      form={form}
      layout="vertical"
      name="Curso_form"
      initialValues={{
        ...initialValues,
      }}
      onFinish={onFinish}
    >
      <Tabs defaultActiveKey="1">
        <TabPane tab="Informações Pessoais" key="1">
          
          <Form.Item
            name="status"
            label="Status"
            rules={[{ required: true, message: 'Por favor, selecione um status!' }]}
          >
            <Select>
              {statusOptions.map(status => (
                <Select.Option key={status.nome} value={status.id}>
                  {status.nome}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="categoria_id"
            label="Categoria"
            rules={[{ required: true, message: 'Por favor, selecione uma categoria!' }]}
          >
            <Select>
              {categoriasCursos.map(categoria => (
                <Select.Option key={categoria.nome} value={categoria.id}>
                  {categoria.nome}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>


          <Form.Item
            name="titulo"
            label="Título"
            rules={[{ required: true, message: 'Por favor, insira o titulo do curso!' }]}
          >
            <Input />
          </Form.Item>


         

          <Form.Item
            name="carga_horaria"
            label="Carga Horária"
          >
            <Input type="number"/>
          </Form.Item>

          <Form.Item
            name="descricao"
            label="Descrição"
            rules={[{ required: true, message: 'Por favor, insira o email!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="banner_url"
            rules={[{ required: true, message: 'A imagem é obrigatória!' }]}
          >
            <Input  type="hidden"/>
          </Form.Item>
        </TabPane>

        <TabPane tab="Upload de Imagem" key="4">
          <Form.Item label="Foto">
            <div style={{ border: '2px dashed #ccc', borderRadius: 8, padding: 16, textAlign: 'center', marginBottom: 16 }}>
              {uploadedImage ? (
                <div style={{ marginBottom: 16 }}>
                  <img 
                    src={uploadedImagePath!} 
                    alt="Preview" 
                    style={{ width: 100, height: 100, objectFit: 'cover', borderRadius: 8, transition: 'transform 0.2s' }} 
                    onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
                    onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                  />
                </div>
              ) : (
                <div style={{ marginBottom: 16 }}>
                  <img 
                    src={initialValues?.banner_url} 
                    alt="Preview" 
                    style={{ width: 100, height: 100, objectFit: 'cover', borderRadius: 8, transition: 'transform 0.2s' }} 
                    onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
                    onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                  />
                </div>
              )}
              <p style={{ margin: '8px 0', color: '#666' }}>Selecione uma imagem para fazer upload (PNG, JPG)</p>
              <Input 
                type="file" 
                accept="image/*" 
                onChange={handleFileChange} 
                style={{ display: 'block', margin: '0 auto' }} 
              />
            </div>
          </Form.Item>
        </TabPane>
      </Tabs>
    </Form>
  );
};

export default CursoForm;
