'use client';

import { Form, Input, DatePicker, Select, Button } from 'antd';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import type { Curso } from '../types/Cursos';
import { InputNumber } from 'antd';

interface TreinamentoFormProps {
  form: any;
  onFinish: (values: any) => void;
}

const TreinamentoForm = ({ form, onFinish }: TreinamentoFormProps) => {
  const [cursos, setCursos] = useState<Curso[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCursos = async () => {
      const { data } = await supabase.from('cursos').select('*');
      if (data) setCursos(data);
    };
    fetchCursos();
  }, []);

  const handleSubmit = async (values: any) => {
    setLoading(true);
    try {
      // Convert Dayjs objects to ISO strings for dates
      const formattedValues = {
        ...values,
        data_inicio: values.data_inicio?.format('YYYY-MM-DD'),
        data_fim: values.data_fim?.format('YYYY-MM-DD'),
        criado_em: new Date().toISOString(),
        atualizado_em: new Date().toISOString()
      };
      await onFinish(formattedValues);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleSubmit}
    >
      <Form.Item
        name="curso_id"
        label="Curso"
        rules={[{ required: true, message: 'Selecione o curso' }]}
      >
        <Select>
          {cursos.map(curso => (
            <Select.Option key={curso.id} value={curso.id}>
              {curso.titulo}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        name="local"
        label="Local"
        rules={[{ required: true, message: 'Informe o local' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="data_inicio"
        label="Data de Início"
        rules={[{ required: true, message: 'Informe a data de início' }]}
      >
        <DatePicker className="w-full" />
      </Form.Item>

      <Form.Item
        name="data_fim"
        label="Data de Término"
        rules={[{ required: true, message: 'Informe a data de término' }]}
      >
        <DatePicker className="w-full" />
      </Form.Item>

      <Form.Item
        name="valor"
        label="Valor"
        rules={[{ required: true, message: 'Informe o valor do treinamento' }]}
      >
        <InputNumber
          className="w-full"
          formatter={value => `R$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, '.').replace('.', ',')}
          parser={value => value!.replace(/R\$\s?|(\.*)/g, '').replace(',', '.')}
          precision={2}
          min={0}
          step={0.01}
          decimalSeparator=","
          groupSeparator="."
        />
      </Form.Item>

      <Form.Item
        name="status"
        label="Status"
        rules={[{ required: true, message: 'Selecione o status' }]}
      >
        <Select>
          <Select.Option value="agendado">Agendado</Select.Option>
          <Select.Option value="concluído">Concluído</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item className="mt-6">
        <Button
          type="primary"
          htmlType="submit"
          loading={loading}
          className="w-full bg-blue-500 hover:bg-blue-600"
        >
          {loading ? 'Salvando...' : 'Salvar Treinamento'}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default TreinamentoForm;