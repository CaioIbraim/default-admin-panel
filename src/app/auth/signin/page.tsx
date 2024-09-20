'use client';

import { useState } from 'react';
import Link from "next/link";
import Image from "next/image"
import { FaSignInAlt, FaGoogle } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import {supabase} from '../../../lib/supabaseClient';
import '../../../../css/auth.css';
import BackLink from '../../../components/BackLink';

import Swal from 'sweetalert2';
type Provider = 'google' | 'linkedin' ;



const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();


  const handleSignIn = async () => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      Swal.fire({
        icon: 'error',
        title: 'Erro',
        text: error.message,
      });
    } else{
      Swal.fire({
        icon: 'success',
        title: 'Sucesso',
        text: 'Login realizado com sucesso!',
        showConfirmButton: false,
        timer: 1500,
        willClose: () => {
          router.push('/inicio');
        }
      });
    }
  };

  const handleLogin = async (provider: Provider) => {
    const { error } = await supabase.auth.signInWithOAuth({ provider });
    if (error) {
      Swal.fire({
        icon: 'error',
        title: 'Erro',
        text: error.message,
      });
    } 
  };



  return (

    <div>
      <BackLink href="/" label="Voltar" />
    <div className="auth-container">
      

      <Link href="/">
        <span className="flex items-center justify-center space-x-2 text-2xl font-medium text-[#00796b] dark:text-gray-100">
          <Image
            src="/img/logo.png"
            alt="STIVESGPRO"
            width={150}
            height={150}
          />
        </span>
      </Link>

      

      <h2 className='flex flex-row justify-center  items-center w-full space-x-4 text-[#00796b] mt-2 font-bold'> <FaSignInAlt className="hero-icon" /> <span> Entrar </span></h2>
      
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleSignIn}>Entrar</button>

   
   
    </div>
    </div>
  );
};

export default SignIn;
