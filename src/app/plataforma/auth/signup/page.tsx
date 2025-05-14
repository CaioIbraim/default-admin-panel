'use client';

import { useState } from 'react';
import Link from "next/link";
import Image from "next/image"

import { useRouter } from 'next/navigation';
import {supabase} from '@/lib/supabaseClient';
import '@/css/auth.css';
import { Container } from '@/components/Container';
import {  FaPlus, FaGoogle } from 'react-icons/fa';
import Swal from 'sweetalert2';

import BackLink from '@/components/BackLink';

type Provider = 'google' | 'linkedin' ;


const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSignUp = async () => {
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) {
      Swal.fire({
        icon: 'error',
        title: 'Erro',
        text: error.message,
      });
    } else {
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
      router.push('/auth/signin');
    }
  };


  const handleLogin = async (provider: Provider) => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
    });
    if (error){
      Swal.fire({
        icon: 'error',
        title: 'Erro',
        text: 'Erro de autenticação',
      });
      console.error('Erro de autenticação:', error.message)
    }else{
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
      router.push('/inicio');
    }
  };

  return (

    <div>
      <BackLink href="/" label="Voltar" />
    <div className="auth-container">
      

     
    <Link href="/">
        <span className="flex items-center justify-center space-x-2 text-2xl font-medium text-[#4682B4] dark:text-gray-100">
          <Image
            src="/img/logo.png"
            alt="STIVESGPRO"
            width={150}
            height={150}
          />
        </span>
      </Link>

                
      <h2 className='flex flex-row justify-center  items-center w-full space-x-4 text-[#4682B4] mt-2 font-bold'> <FaPlus className="hero-icon" /> <span> Cadastre-se </span></h2>
     
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
      <button onClick={handleSignUp}>Cadastrar</button>

      

    </div>
    </div>
  );
};

export default SignUp;
