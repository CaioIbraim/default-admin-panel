'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../../lib/supabaseClient';
import { FaHeartbeat, FaSearch, FaBook, FaChartLine, FaUsers, FaBuilding, FaDollarSign } from 'react-icons/fa';
import '../../../css/style.css';
import '../../../css/landing.css';
import Link from 'next/link';

const functionalities = [
  { name: 'Termos Técnicos', href: 'dicionarios/termos', icon: <FaBook />, description: 'Acesse o dicionário de termos técnicos' },
  { name: 'Relatórios', href: 'relatorios', icon: <FaChartLine />, description: 'Visualize relatórios e análises' },
  { name: 'Usuários', href: 'usuarios', icon: <FaUsers />, description: 'Gestão de usuários' },
];

const Dashboard = () => {
  const [search, setSearch] = useState('');
  const [filteredFunctions, setFilteredFunctions] = useState(functionalities);
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    payments: 120,
    companies: 10,
    associates: 200
  });

  useEffect(() => {
    // Simulando carregamento de dados
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  useEffect(() => {
    setFilteredFunctions(
      functionalities.filter((func) =>
        func.name.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search]);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Cabeçalho */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-300">Bem-vindo ao seu painel de controle</p>
      </div>

      {/* Barra de Pesquisa */}
      <div className="mb-6 relative">
        <div className="relative">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Pesquisar funcionalidades..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Cards de Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="p-6 rounded-lg bg-white dark:bg-gray-800 shadow-lg transform hover:scale-105 transition-transform duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Pagamentos do Mês</p>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">{isLoading ? '...' : stats.payments}</h2>
            </div>
            <FaDollarSign className="text-3xl text-green-500" />
          </div>
        </div>

        <div className="p-6 rounded-lg bg-white dark:bg-gray-800 shadow-lg transform hover:scale-105 transition-transform duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Empresas Ativas</p>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">{isLoading ? '...' : stats.companies}</h2>
            </div>
            <FaBuilding className="text-3xl text-blue-500" />
          </div>
        </div>

        <div className="p-6 rounded-lg bg-white dark:bg-gray-800 shadow-lg transform hover:scale-105 transition-transform duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Associados Ativos</p>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">{isLoading ? '...' : stats.associates}</h2>
            </div>
            <FaUsers className="text-3xl text-purple-500" />
          </div>
        </div>
      </div>

      {/* Grid de Funcionalidades */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredFunctions.map((func, index) => (
          <Link href={func.href} key={index}>
            <div className="p-6 rounded-lg bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow duration-200 cursor-pointer">
              <div className="flex items-center mb-4">
                <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900 mr-4">
                  {func.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{func.name}</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300">{func.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
