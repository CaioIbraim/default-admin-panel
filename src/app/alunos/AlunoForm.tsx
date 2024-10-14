import React, { useState } from 'react';
import { Form, Input, DatePicker, Select, Checkbox, Tabs, Button } from 'antd';
import { supabase } from '../../lib/supabaseClient';
import { Empresa } from '../types/Empresa';
import { Aluno } from '../types/Aluno';
import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/pt-br'; // Importa a localidade para o formato brasileiro

// Configura o dayjs para usar o locale brasileiro
dayjs.locale('pt-br');

const { TabPane } = Tabs;

const statusOptions = [
  { id: true, nome: 'Ativo' },
  { id: false, nome: 'Inativo' }
];

interface AlunoFormValues extends Aluno {}

interface AlunoFormProps {
  form: any;
  initialValues?: Aluno; // Tipo correto
  onFinish: (values: AlunoFormValues) => void; // Função para lidar com a submissão
}

const AlunoForm: React.FC<AlunoFormProps> = ({ form,  initialValues, onFinish }) => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null); // Estado para armazenar o nome da imagem
  const [uploadedImagePath, setUploadedImagePath] = useState<string | null>(null); // Estado para armazenar o nome da imagem


  // Função para converter Date para Dayjs
  const convertToDayjs = (date: Date | undefined): Dayjs | undefined => {
    return date ? dayjs(date) : undefined;
  };

  // Função para fazer o upload da imagem
  const uploadImage = async (file: File) => {
    try {
      // Faz o upload da imagem para o bucket 'associados'
      const { data, error } = await supabase.storage
        .from('bucket') // Nome do bucket que você criou no Supabase
        .upload(`public/${file.name}`, file, {
          cacheControl: '3600',
          upsert: false, // Se quiser sobrescrever arquivos existentes
        });

      if (error) {
        throw error; // Lança o erro para ser tratado no catch
      }

      console.log('File uploaded:', data.fullPath);

      setUploadedImagePath(process.env.NEXT_PUBLIC_SUPABASE_URL + '/storage/v1/object/public/bucket/public/'+uploadedImage)
      setUploadedImage(file.name); // Armazena o nome da imagem
      form.setFieldsValue({ foto: file.name }); // Atualiza o campo foto no formulário
      return data; // Retorna os dados da resposta
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Erro ao fazer upload da imagem. Por favor, tente novamente.'); // Feedback ao usuário
      return null; // Retorna null em caso de erro
    }
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    console.log(file)
  };

  // Define o valor inicial do campo filhos para controle do campo quantos_filhos
  const filhosValue = form.getFieldValue('filhos');

  return (
    <Form
    form={form}
    layout="vertical"
    name="Aluno_form"
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
          name="nome"
          label="Nome"
          rules={[{ required: true, message: 'Por favor, insira o nome!' }]}
        >
          <Input />
        </Form.Item>
  
        <Form.Item
          name="documento"
          label="Documento"
          rules={[{ required: true, message: 'Por favor, insira o documento!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="endereco" label="Endereço">
          <Input />
        </Form.Item>
        
        <Form.Item name="naturalidade" label="Naturalidade">
          <Input />
        </Form.Item>
        <Form.Item name="estado_civil" label="Estado Civil">
          <Input />
        </Form.Item>
        <Form.Item name="nome_pai" label="Nome do Pai">
          <Input />
        </Form.Item>
        <Form.Item name="nome_mae" label="Nome da Mãe">
          <Input />
        </Form.Item>
        <Form.Item name="titulo_eleitor" label="Título de Eleitor">
          <Input />
        </Form.Item>
      </TabPane>
      

      <TabPane tab="Upload de Imagem" key="4">
  <Form.Item label="Foto">
    <Input 
      type="file" 
      accept="image/*" 
      onChange={handleFileChange} 
      style={{ marginBottom: 16 }} 
    />
    {uploadedImage && (
      <div style={{ marginBottom: 16 }}>
        <p>Imagem enviada: {uploadedImage}</p>
        
        <img 
          src={uploadedImagePath!} 
          alt="Preview" 
          style={{ width: 100, height: 100, objectFit: 'cover', borderRadius: 8 }} 
        />
      </div>
    )}
  </Form.Item>
  <Form.Item>
    
    <Button 
      type="primary" 
      onClick={async () => {
        const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
        if (fileInput?.files?.length) {
          await uploadImage(fileInput.files[0]);
        } else {
          alert("Por favor, selecione uma imagem antes de enviar.");
        }
      }}
    >
      Enviar Imagem
    </Button>
  </Form.Item>
</TabPane>


    </Tabs>
    
  </Form>
  
  );
};

export default AlunoForm;
