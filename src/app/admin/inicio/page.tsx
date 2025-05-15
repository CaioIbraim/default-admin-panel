'use client';
import { useState, useEffect } from 'react';
import { Line, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, CategoryScale, LinearScale, BarElement, LineElement, PointElement } from 'chart.js';
import '@/../css/style.css';
import '@/../css/landing.css';

// Configuração do Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

// Tipos TypeScript para os dados
interface PagamentoPorDia {
  created_at: string;
  count: number;
}

interface AssociadoPorMes {
  month: string;
  count: number;
}

const Dashboard = () => {
  const [totalPagamentos, setTotalPagamentos] = useState<number>(0);
  const [totalEmpresas, setTotalEmpresas] = useState<number>(0);
  const [totalAssociados, setTotalAssociados] = useState<number>(0);
  const [pagamentosPorDia, setPagamentosPorDia] = useState<PagamentoPorDia[]>([]);
  const [associadosPorMes, setAssociadosPorMes] = useState<AssociadoPorMes[]>([]);

  useEffect(() => {
    // Gerar dados fictícios
    const fetchData = async () => {
      // Dados fictícios para total de pagamentos, empresas e associados
      setTotalPagamentos(150);
      setTotalEmpresas(25);
      setTotalAssociados(300);

      // Dados fictícios para pagamentos por dia
      setPagamentosPorDia([
        { created_at: '2024-09-01', count: 10 },
        { created_at: '2024-09-02', count: 12 },
        { created_at: '2024-09-03', count: 8 },
        { created_at: '2024-09-04', count: 15 },
        { created_at: '2024-09-05', count: 20 },
        { created_at: '2024-09-06', count: 18 },
        { created_at: '2024-09-07', count: 22 },
      ]);

      // Dados fictícios para associados por mês
      setAssociadosPorMes([
        { month: '2024-01-01', count: 50 },
        { month: '2024-02-01', count: 55 },
        { month: '2024-03-01', count: 60 },
        { month: '2024-04-01', count: 65 },
        { month: '2024-05-01', count: 70 },
        { month: '2024-06-01', count: 75 },
        { month: '2024-07-01', count: 80 },
        { month: '2024-08-01', count: 85 },
        { month: '2024-09-01', count: 90 },
      ]);
    };

    fetchData();
  }, []);

  // Preparar dados para gráficos
  const pagamentosData = {
    labels: pagamentosPorDia.map(item => new Date(item.created_at).toLocaleDateString()),
    datasets: [
      {
        label: 'Pagamentos por Dia',
        data: pagamentosPorDia.map(item => item.count),
        borderColor: 'rgba(75,192,192,0.7)',
        backgroundColor: 'rgba(75,192,192,0.2)',
        fill: true,
      },
    ],
  };

  const associadosData = {
    labels: associadosPorMes.map(item => new Date(item.month).toLocaleDateString('default', { month: 'long', year: 'numeric' })),
    datasets: [
      {
        label: 'Associados por Mês',
        data: associadosPorMes.map(item => item.count),
        backgroundColor: 'rgba(75,192,192,0.7)',
        borderColor: 'rgba(153,102,255,1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="h-screen p-4 bg-gray-100">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        <div className="flex items-center justify-center h-24 rounded bg-gray-600  p-4">
          <p className="text-sm text-gray-100 ">
            Total de pagamentos efetuados no Mês: {totalPagamentos}
          </p>
        </div>
        <div className="flex items-center justify-center h-24 rounded bg-gray-600  p-4">
          <p className="text-sm text-gray-100 ">
            Total de repasses efetuados no Mês: {totalPagamentos}
          </p>
        </div>
        <div className="flex items-center justify-center h-24 rounded bg-gray-600  p-4">
          <p className="text-sm text-gray-100 ">
            Total de Empresas Ativas: {totalEmpresas}
          </p>
        </div>
        <div className="flex items-center justify-center h-24 rounded bg-gray-600  p-4">
          <p className="text-sm text-gray-100 ">
            Total de Associados Ativos: {totalAssociados}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 rounded bg-gray-600 ">
          <h2 className="text-sm text-gray-100  mb-2">Pagamentos por Dia</h2>
          <div className="h-60">
            <Line data={pagamentosData} options={{ maintainAspectRatio: false }} />
          </div>
        </div>
        <div className="p-4 rounded bg-gray-600 ">
          <h2 className="text-sm text-gray-100  mb-2">Associados por Mês</h2>
          <div className="h-60">
            <Bar data={associadosData} options={{ maintainAspectRatio: false }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
