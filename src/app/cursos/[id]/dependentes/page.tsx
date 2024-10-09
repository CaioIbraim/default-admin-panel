'use client';

import { useState, useEffect } from 'react';
import { Button, Drawer, Input, List, notification, Modal } from 'antd';
import { useParams } from 'next/navigation';
import { FaPen, FaTrash, FaPlus } from 'react-icons/fa';
import { supabase } from '../../../../lib/supabaseClient'; // Certifique-se de que este caminho está correto

interface Dependente {
  id?: number; // `id` é opcional para novos dependentes
  associado_id: number;
  nome: string;
  vinculo: string;
}

interface Associado {
  id: string;
  nome: string;
  documento: string;
  endereco?: string;
  data_de_nascimento?: string;
  empresa_id?: string;
  data_admissao_empresa?: Date;
  data_ingresso_sindicato?: Date;
  data_saida_sindicato?: Date;
  pis?: string;
  ctps?: string;
  desconto_em_folha?: boolean;
  foto?: string;
}

const DependenteManagement = () => {
  const { id } = useParams();
  const [dependentes, setDependentes] = useState<Dependente[]>([]);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [currentDependente, setCurrentDependente] = useState<Dependente | null>(null);
  const [isDependenteEditing, setIsDependenteEditing] = useState(false);
  const [associados, setAssociados] = useState<Associado[]>([]);

  const fetchAssociadosData = async () => {
    const { data, error } = await supabase
      .from('associados')
      .select('*')
      .eq('id', id)
      .single(); // Use `single` se espera um único registro

    if (data) {
      setAssociados([data]);
    } else if (error) {
      console.error('Erro ao buscar associado:', error.message);
    }
  };

  const fetchDependentesData = async () => {
    const { data, error } = await supabase
      .from('dependentes')
      .select('*')
      .eq('associado_id', id);

    if (data) {
      setDependentes(data);
    } else if (error) {
      console.error('Erro ao buscar dependentes:', error.message);
    }
  };

  const addDependente = async () => {
    if (currentDependente && currentDependente.nome && currentDependente.vinculo) {
      try {
        const { data, error } = await supabase
          .from('dependentes')
          .insert([currentDependente]);

        if (error) throw error;

        notification.success({
          message: 'Dependente Adicionado',
          description: 'Dependente adicionado com sucesso.',
        });
        fetchDependentesData();
        closeDrawer();
      } catch (error) {
        console.error('Erro ao adicionar dependente:', (error as Error).message);
        notification.error({
          message: 'Erro',
          description: 'Houve um erro ao adicionar o dependente.',
        });
      }
    } else {
      notification.warning({
        message: 'Atenção',
        description: 'Nome e vínculo são obrigatórios.',
      });
    }
  };

  const updateDependente = async () => {
    if (currentDependente && currentDependente.id) {
      try {
        const { data, error } = await supabase
          .from('dependentes')
          .update({
            nome: currentDependente.nome,
            vinculo: currentDependente.vinculo,
          })
          .eq('id', currentDependente.id);

        if (error) throw error;

        notification.success({
          message: 'Dependente Atualizado',
          description: 'Dependente atualizado com sucesso.',
        });
        fetchDependentesData();
        closeDrawer();
      } catch (error) {
        console.error('Erro ao atualizar dependente:', (error as Error).message);
        notification.error({
          message: 'Erro',
          description: 'Houve um erro ao atualizar o dependente.',
        });
      }
    }
  };

  const deleteDependente = (id: number) => {
    Modal.confirm({
      title: 'Confirmar Exclusão',
      content: 'Tem certeza que deseja excluir este dependente?',
      okText: 'Sim',
      okType: 'danger',
      cancelText: 'Não',
      onOk: async () => {
        try {
          const { error } = await supabase
            .from('dependentes')
            .delete()
            .eq('id', id);

          if (error) throw error;

          setDependentes(prevDependentes => prevDependentes.filter(dependente => dependente.id !== id));
          notification.success({
            message: 'Dependente Excluído',
            description: 'Dependente excluído com sucesso.',
          });
        } catch (error) {
          console.error('Erro ao excluir dependente:', (error as Error).message);
          notification.error({
            message: 'Erro',
            description: 'Houve um erro ao excluir o dependente.',
          });
        }
      },
    });
  };

  const openDrawer = () => {
    setCurrentDependente({
      associado_id: Number(id),
      nome: '',
      vinculo: '',
    });
    setIsDependenteEditing(false);
    setDrawerVisible(true);
  };

  const closeDrawer = () => {
    setDrawerVisible(false);
  };

  useEffect(() => {
    fetchDependentesData();
    fetchAssociadosData();
  }, [id]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 sm:mb-0">Dados do Associado</h1>
      <div className="col-span-1">
        <List
          dataSource={associados}
          renderItem={associado => (
            <List.Item>
              <List.Item.Meta
                title={associado.nome}
                description={`
                  Endereço: ${associado.endereco || 'Não informado'} | Documento: ${associado.documento}
                `}
              />
            </List.Item>
          )}
        />
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center">
        <h1 className="text-2xl font-bold mb-4 sm:mb-0">Gerenciamento de Dependentes</h1>
        <Button type="primary" icon={<FaPlus />} onClick={openDrawer}>
          Adicionar Dependente
        </Button>
      </div>
      <div className="grid grid-cols-1 gap-4">
        <div>
          <List
            dataSource={dependentes}
            renderItem={dependente => (
              <List.Item
                actions={[
                  <Button
                    key="edit"
                    onClick={() => {
                      setCurrentDependente(dependente);
                      setIsDependenteEditing(true);
                      setDrawerVisible(true);
                    }}
                  >
                    <FaPen />
                  </Button>,
                  <Button key="delete" onClick={() => deleteDependente(dependente.id!)}>
                    <FaTrash />
                  </Button>,
                ]}
              >
                <List.Item.Meta
                  title={dependente.nome}
                  description={`Vínculo: ${dependente.vinculo}`}
                />
              </List.Item>
            )}
          />
        </div>
      </div>

      <Drawer
        title={isDependenteEditing ? 'Editar Dependente' : 'Adicionar Dependente'}
        width={720}
        onClose={closeDrawer}
        visible={drawerVisible}
        bodyStyle={{ paddingBottom: 80 }}
      >
        {currentDependente && (
          <div className="space-y-4">
            <Input
              placeholder="Nome"
              value={currentDependente.nome}
              onChange={e => setCurrentDependente({ ...currentDependente, nome: e.target.value })}
            />
            <Input
              placeholder="Vínculo"
              value={currentDependente.vinculo}
              onChange={e => setCurrentDependente({ ...currentDependente, vinculo: e.target.value })}
            />
            <Button type="primary" onClick={isDependenteEditing ? updateDependente : addDependente}>
              {isDependenteEditing ? 'Atualizar' : 'Salvar'}
            </Button>
          </div>
        )}
      </Drawer>
    </div>
  );
};

export default DependenteManagement;
