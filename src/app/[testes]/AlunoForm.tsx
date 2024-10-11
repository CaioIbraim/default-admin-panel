import React from 'react';
import { Form, Input, DatePicker, Select, Checkbox, Tabs, Button } from 'antd';
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
  empresas: Empresa[];
  initialValues?: Aluno; // Tipo correto
  onFinish: (values: AlunoFormValues) => void; // Função para lidar com a submissão
}

const AlunoForm: React.FC<AlunoFormProps> = ({ form, empresas, initialValues, onFinish }) => {
  // Função para converter Date para Dayjs
  const convertToDayjs = (date: Date | undefined): Dayjs | undefined => {
    return date ? dayjs(date) : undefined;
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
      data_de_nascimento: convertToDayjs(initialValues?.data_de_nascimento),
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
        <Form.Item
          name="data_de_nascimento"
          label="Data de Nascimento"
          rules={[{ required: true, message: 'Por favor, insira a data de nascimento!' }]}
        >
          <DatePicker format="DD/MM/YYYY" />
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
      
    </Tabs>
    
  </Form>
  
  );
};

export default AlunoForm;
