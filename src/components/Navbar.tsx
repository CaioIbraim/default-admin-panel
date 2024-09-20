"use client";
import Link from "next/link";
import ThemeChanger from "./DarkSwitch";
import Image from "next/image";
import { Disclosure } from "@headlessui/react";
import React from 'react';
import { FaSignOutAlt } from "react-icons/fa";

interface NavbarProps {
  loggedIn: boolean;
  onLogout: () => void;
  userFullName: string | null;
  userAvatar: string | null;
}

export const Navbar: React.FC<NavbarProps> = ({ loggedIn, onLogout, userFullName, userAvatar }) => {
  return (
    <div className="w-full">
      {/* Renderize a Navbar com base na propriedade loggedIn */}
      {loggedIn ? (
        <NavComponent loggedIn={loggedIn} onLogout={onLogout} userFullName={userFullName} userAvatar={userAvatar} />
      ) : (
        <NavComponent loggedIn={loggedIn} userFullName={userFullName} userAvatar={userAvatar} />
      )}
    </div>
  );
};

interface NavComponentProps {
  loggedIn: boolean;
  onLogout?: () => void;
  userFullName: string | null;
  userAvatar: string | null;
}

const NavComponent: React.FC<NavComponentProps> = ({ loggedIn, onLogout, userFullName, userAvatar }) => {
  const navigation = [
    { path: "funcionalidades", label: "Funcionalidades" },
    // { path: "news", label: "Notícias" }
  ];

  const navigationLoggedIn = [
    { path: "inicio", label: "Inicio" },
    { path: "associados", label: "Associados" },
    { path: "empresas", label: "Empresas" },
    { path: "pagamentos", label: "Pagamentos" },
    
  ];

  let navItems = loggedIn ? navigationLoggedIn : navigation;

  return (
    <nav className="container relative flex flex-wrap items-center justify-between p-8 mx-auto lg:justify-between xl:px-0">
      {/* Logo */}
      <Disclosure>
        {({ open }) => (
          <>
            <div className="flex flex-wrap items-center justify-between w-full lg:w-auto">
              <Link href="/">
                <span className="flex items-center space-x-2 text-2xl font-medium text-[#00796b] dark:text-gray-100">
                  <Image
                    src="/img/logo.png"
                    alt="N"
                    width={52}
                    height={52}
                  />
                  <span>STIVESGPRO</span>
                </span>
              </Link>

              <Disclosure.Button
                aria-label="Toggle Menu"
                className="px-2 py-1 ml-auto text-[#3da399] rounded-md lg:hidden hover:text-[#3da399] focus:text-[#00796b] focus:bg-indigo-100 focus:outline-none dark:text-gray-300 dark:focus:bg-trueGray-700"
              >
                <svg
                  className="w-6 h-6 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  {open ? (
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z"
                    />
                  ) : (
                    <path
                      fillRule="evenodd"
                      d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                    />
                  )}
                </svg>
              </Disclosure.Button>

              <Disclosure.Panel className="flex flex-wrap w-full my-5 lg:hidden">
                {navItems.map((item, index) => (
                  <Link key={index} href={`/${item.path}`} className="w-full px-4 py-2 -ml-4 text-[#3da399] rounded-md dark:text-gray-300 hover:text-[#00796b] focus:text-[#00796b] focus:bg-indigo-100 dark:focus:bg-gray-800 focus:outline-none">
                    {item.label}
                  </Link>
                ))}
                {loggedIn ? (
                  <div className="flex w-full justify-between items-center bg-slate-100 border-solid border-cyan-400  rounded-md p-2">
                    <Image
                      src={userAvatar ?? '/img/default-avatar.png'}
                      alt={userFullName ?? 'Default User'}
                      className="rounded-full w-8"
                      width={52} // Adicione a largura apropriada
                      height={52} // Adicione a altura apropriada
                    />
                    <span>{userFullName}</span>
                    <button onClick={onLogout} className="px-6 py-2 border-solid border-2 border-red-700 text-red-700 bg-red-300 rounded-lg md:ml-5">
                      <FaSignOutAlt className="hero-icon" />
                    </button>
                  </div>
                ) : (
                  <Link href="/auth/signin" className="w-full px-6 py-2 mt-3 text-center text-white bg-[#00796b] rounded-md lg:ml-5">
                    Entrar
                  </Link>
                )}
              </Disclosure.Panel>
            </div>
          </>
        )}
      </Disclosure>

      {/* Menu */}
      <div className="hidden text-center lg:flex lg:items-center">
        <ul className="items-center justify-end flex-1 pt-6 list-none lg:pt-0 lg:flex">
          {navItems.map((menu, index) => (
            <li className="mr-3 nav__item" key={index}>
              <Link href={`/${menu.path}`} className=" inline-block px-4 py-2 text-md font-normal text-[#00796b] no-underline rounded-md dark:text-gray-200 hover:text-[#00796b] focus:text-[#00796b] focus:bg-indigo-100 focus:outline-none dark:focus:bg-gray-800">
                {menu.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="hidden mr-3 space-x-4 lg:flex nav__item">
        {loggedIn ? (
          <>
            <div className="flex space-x-2 justify-center items-center">
              <Image
                src={userAvatar ?? '/img/default-avatar.png'}
                alt={userFullName ?? 'Default User'}
                className="rounded-full w-12"
                width={52} // Adicione a largura apropriada
                height={52} // Adicione a altura apropriada
              />
              <span>{userFullName}</span>
            </div>
            <button onClick={onLogout} className="px-6 py-2 border-solid border-2 border-red-700 text-red-700 bg-red-300 rounded-lg md:ml-5">
              <FaSignOutAlt className="hero-icon" />
            </button>
          </>
        ) : (
          <Link href="/auth/signin" className="px-6 py-2 text-white bg-[#00796b] rounded-md md:ml-5">
            Entrar
          </Link>
        )}
        <ThemeChanger />
      </div>
    </nav>
  );
};
