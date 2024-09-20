'use client';


import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../../lib/supabaseClient';
import { FaHeartbeat, FaSyringe, FaNotesMedical, FaSearch, FaPaperclip, FaToiletPaperSlash, FaAddressBook, FaBook, FaCalendar, FaCalculator } from 'react-icons/fa';
import '../../../css/style.css';
import '../../../css/landing.css';
import Link from 'next/link';
import { FaBookAtlas, FaDroplet, FaKitMedical, FaNfcDirectional, FaNoteSticky, FaPaperPlane } from 'react-icons/fa6';
import Image from 'next/image';

const functionalities = [
  { name: 'Termos Técnicos', href: 'dicionarios/termos', icon: <FaBook /> },

];

const Dashboard = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [search, setSearch] = useState('');
  const [filteredFunctions, setFilteredFunctions] = useState(functionalities);
  const router = useRouter();

  const handleSignUp = async () => {
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) {
      alert(error.message);
    } else {
      router.push('/dashboard');
    }
  };

  useEffect(() => {
    setFilteredFunctions(
      functionalities.filter((func) =>
        func.name.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search]);

  return (
    <>

      <div className=" h-screen">
      <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="flex items-center justify-center h-24 rounded bg-gray-600 dark:bg-gray-800 p-10" >
              <p className="text-1xl text-gray-400 dark:text-gray-500">
               Total de pagamentos efetuados no Mês : 120
              </p>
            </div>
            <div className="flex items-center justify-center h-24 rounded bg-gray-600 dark:bg-gray-800 p-10">
              <p className="text-1xl text-gray-400 dark:text-gray-500">
                Total de Empresas Ativas: 10
              </p>
            </div>
            <div className="flex items-center justify-center h-24 rounded bg-gray-600 dark:bg-gray-800 p-10">
              <p className="text-1xl text-gray-400 dark:text-gray-500">
                Total de Associados Ativos:
                200
              </p>
            </div>
          </div>
      </div>

      

      

     
    </>
  );
};

export default Dashboard;
