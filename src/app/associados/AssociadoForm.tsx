import React from 'react';
import { Form, Input, DatePicker, Select, Checkbox, Tabs, Button } from 'antd';
import { Empresa } from '../types/Empresa';
import { Associado } from '../types/Associado';
import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/pt-br'; // Importa a localidade para o formato brasileiro

// Configura o dayjs para usar o locale brasileiro
dayjs.locale('pt-br');

const { TabPane } = Tabs;

const statusOptions = [
  { id: true, nome: 'Ativo' },
  { id: false, nome: 'Inativo' }
];

interface AssociadoFormValues {
  nome?: string;
  documento?: string;
  endereco?: string;
  data_de_nascimento?: Dayjs;
  data_admissao_empresa?: Dayjs;
  data_ingresso_sindicato?: Dayjs;
  data_saida_sindicato?: Dayjs;
  empresa_id?: string;
  pis?: string;
  ctps?: string;
  desconto_em_folha?: boolean;
  foto?: string;
  matricula?: string;
  naturalidade?: string;
  estado_civil?: string;
  cargo_empresa?: string;
  filhos?: boolean;
  quantos_filhos?: number;
  nome_pai?: string;
  nome_mae?: string;
  titulo_eleitor?: string;
  observacao?: string;
  status?: boolean;
}

interface AssociadoFormProps {
  form: any;
  empresas: Empresa[];
  initialValues?: Associado; // Tipo correto
  onFinish: (values: AssociadoFormValues) => void; // Função para lidar com a submissão
}

const AssociadoForm: React.FC<AssociadoFormProps> = ({ form, empresas, initialValues, onFinish }) => {
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
    name="associado_form"
    initialValues={{
      ...initialValues,
      data_de_nascimento: convertToDayjs(initialValues?.data_de_nascimento),
      data_admissao_empresa: convertToDayjs(initialValues?.data_admissao_empresa),
      data_ingresso_sindicato: convertToDayjs(initialValues?.data_ingresso_sindicato),
      data_saida_sindicato: convertToDayjs(initialValues?.data_saida_sindicato),
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
  
      <TabPane tab="Dados da Empresa" key="2">
        <Form.Item
          name="empresa_id"
          label="Empresa"
          rules={[{ required: true, message: 'Por favor, selecione a empresa!' }]}
        >
          <Select>
            {empresas.map(empresa => (
              <Select.Option key={empresa.id} value={empresa.id}>
                {empresa.nome}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="data_admissao_empresa"
          label="Data de Admissão na Empresa"
          rules={[{ required: true, message: 'Por favor, insira a data de admissão na empresa!' }]}
        >
          <DatePicker format="DD/MM/YYYY" />
        </Form.Item>
        <Form.Item name="cargo_empresa" label="Cargo na Empresa">
          <Input />
        </Form.Item>
        <Form.Item name="matricula" label="Matrícula">
          <Input />
        </Form.Item>
      </TabPane>
  
      <TabPane tab="Dados do Sindicato" key="3">
        <Form.Item
          name="data_ingresso_sindicato"
          label="Data de Ingresso no Sindicato"
          rules={[{ required: true, message: 'Por favor, insira a data de ingresso no sindicato!' }]}
        >
          <DatePicker format="DD/MM/YYYY" />
        </Form.Item>
        <Form.Item name="data_saida_sindicato" label="Data de Saída do Sindicato">
          <DatePicker format="DD/MM/YYYY" />
        </Form.Item>
        <Form.Item
          name="filhos"
          valuePropName="checked"
          label="Tem Filhos"
        >
          <Checkbox />
        </Form.Item>
        <Form.Item
          name="quantos_filhos"
          label="Quantos Filhos"
          dependencies={['filhos']}
          rules={[
            {
              validator: (_, value) => {
                if (form.getFieldValue('filhos') && value === undefined) {
                  return Promise.reject(new Error('Por favor, insira a quantidade de filhos!'));
                }
                return Promise.resolve();
              },
            },
          ]}
        >
          <Input type="number" disabled={!filhosValue} />
        </Form.Item>
      </TabPane>
  
      <TabPane tab="Outros" key="4">
        <Form.Item
          name="pis"
          label="PIS"
          rules={[{ required: true, message: 'Por favor, insira o número do PIS!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="ctps"
          label="CTPS"
          rules={[{ required: true, message: 'Por favor, insira o número do CTPS!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="desconto_em_folha" valuePropName="checked" label="Desconto em Folha">
          <Checkbox />
        </Form.Item>
       
        <Form.Item name="observacao" label="Observação">
          <Input.TextArea />
        </Form.Item>
      </TabPane>
    </Tabs>
    
  </Form>
  
  );
};

export default AssociadoForm;
