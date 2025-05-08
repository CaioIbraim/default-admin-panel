'use client';

import { useEffect, useState } from 'react';
import { Line, Bar, Pie } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend } from 'chart.js';
import { supabase } from '../../lib/supabaseClient';

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const [associadosData, setAssociadosData] = useState<number[]>([]);
  const [empresasData, setEmpresasData] = useState<number[]>([]);
  const [pagamentosData, setPagamentosData] = useState<number[]>([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      // Exemplo de contagem de associados, empresas e pagamentos por mês
      const associados = await supabase
        .from('associados')
        .select('id, created_at')
        .gte('created_at', new Date(new Date().getFullYear(), 0, 1).toISOString());

      const empresas = await supabase
        .from('empresas')
        .select('id, created_at')
        .gte('created_at', new Date(new Date().getFullYear(), 0, 1).toISOString());

      const pagamentos = await supabase
        .from('pagamentos')
        .select('id, data_pagamento')
        .gte('data_pagamento', new Date(new Date().getFullYear(), 0, 1).toISOString());

      // Processamento dos dados para a contagem mensal
      const countPerMonth = (data: any[], dateField: string) => {
        const months = new Array(12).fill(0);
        data.forEach(item => {
          const month = new Date(item[dateField]).getMonth();
          months[month]++;
        });
        return months;
      };

      setAssociadosData(countPerMonth(associados.data || [], 'created_at'));
      setEmpresasData(countPerMonth(empresas.data || [], 'created_at'));
      setPagamentosData(countPerMonth(pagamentos.data || [], 'data_pagamento'));
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="p-5">
      <h1 className="text-xl text-center mb-5">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <div>
          <h2 className="text-lg mb-3">Novos Associados por Mês</h2>
          <Line
            data={{
              labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
              datasets: [
                {
                  label: 'Associados',
                  data: associadosData,
                  borderColor: 'rgba(75,192,192,1)',
                  fill: false,
                },
              ],
            }}
          />
        </div>

        <div>
          <h2 className="text-lg mb-3">Novas Empresas por Mês</h2>
          <Bar
            data={{
              labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
              datasets: [
                {
                  label: 'Empresas',
                  data: empresasData,
                  backgroundColor: 'rgba(153,102,255,0.6)',
                },
              ],
            }}
          />
        </div>

        <div>
          <h2 className="text-lg mb-3">Pagamentos por Mês</h2>
          <Pie
            data={{
              labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
              datasets: [
                {
                  label: 'Pagamentos',
                  data: pagamentosData,
                  backgroundColor: [
                    'rgba(255,99,132,0.6)',
                    'rgba(54,162,235,0.6)',
                    'rgba(255,206,86,0.6)',
                    'rgba(75,192,192,0.6)',
                    'rgba(153,102,255,0.6)',
                    'rgba(255,159,64,0.6)',
                    'rgba(99,132,255,0.6)',
                    'rgba(235,54,162,0.6)',
                    'rgba(86,255,206,0.6)',
                    'rgba(192,75,75,0.6)',
                    'rgba(102,153,255,0.6)',
                    'rgba(159,255,64,0.6)',
                  ],
                },
              ],
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
