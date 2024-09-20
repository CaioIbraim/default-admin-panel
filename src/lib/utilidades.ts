import { supabase } from './supabaseClient';

const upsertUser = async (user: any) => {
    const { id, email } = user;

    const { data, error: selectError } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();

    if (selectError && selectError.code !== 'PGRST116') {
      console.error('Erro ao verificar usuário:', selectError.message);
      return;
    }

    if (!data) {
      const { error: insertError } = await supabase
        .from('users')
        .insert([
          {
            id,
            name: user.user_metadata?.full_name || 'Nome desconhecido',
            email,
            password: '', 
          }
        ]);

      if (insertError) {
        console.error('Erro ao inserir usuário:', insertError.message);
      }
    }
  };



  // Função para deletar um pagamento
  /*
  const deleteTodosPagamentos = () => {
    Modal.confirm({
      title: 'Confirmar Exclusão',
      content: 'Você tem certeza que deseja excluir todos os dado?',
      okText: 'Sim',
      okType: 'danger',
      cancelText: 'Não',
      onOk: async () => {
        try {
          const { error } = await supabase.from('pagamentos').delete().neq('associado_id', '4bb5becf-604a-43aa-96b9-b7306f6b0a45');

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

  const deleteTodasEmpresas = () => {
    Modal.confirm({
      title: 'Confirmar Exclusão',
      content: 'Você tem certeza que deseja excluir este pagamento?',
      okText: 'Sim',
      okType: 'danger',
      cancelText: 'Não',
      onOk: async () => {
        try {
          const { error } = await supabase.from('empresas').delete().neq('id', '4bb5becf-604a-43aa-96b9-b7306f6b0a45');

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

  const deleteTodosAssociados = () => {
    Modal.confirm({
      title: 'Confirmar Exclusão',
      content: 'Você tem certeza que deseja excluir todos os dados?',
      okText: 'Sim',
      okType: 'danger',
      cancelText: 'Não',
      onOk: async () => {
        try {
          const { error } = await supabase.from('associados').delete().neq('id', '4bb5becf-604a-43aa-96b9-b7306f6b0a45');

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

  const deleteTodosDependentes = () => {
    Modal.confirm({
      title: 'Confirmar Exclusão',
      content: 'Você tem certeza que deseja excluir todos os dados?',
      okText: 'Sim',
      okType: 'danger',
      cancelText: 'Não',
      onOk: async () => {
        try {
          const { error } = await supabase.from('dependentes').delete().neq('id', '4bb5becf-604a-43aa-96b9-b7306f6b0a45');

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

 
  const deleteHistoricoPagamento = () => {
    Modal.confirm({
      title: 'Confirmar Exclusão',
      content: 'Você tem certeza que deseja excluir todos os dados?',
      okText: 'Sim',
      okType: 'danger',
      cancelText: 'Não',
      onOk: async () => {
        try {
          const { error } = await supabase.from('historico_pagamentos').delete().neq('id', '4bb5becf-604a-43aa-96b9-b7306f6b0a45');

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

*/