"use client";
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { Inter } from "next/font/google";
import { ThemeProvider } from "next-themes";
import Swal from 'sweetalert2';
import { Sidebar } from '../components/Sidebar';
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

interface MyComponentProps {
  children: React.ReactNode;
}

interface SidelayoutProps extends MyComponentProps {
  loggedIn: boolean;
  onLogout: () => void;
  userFullName: string | null;
  userAvatar: string | null;
}

import { Layout, Menu } from 'antd';


const { Sider } = Layout;

interface SidebarProps {
  loggedIn: boolean;
  onLogout: () => void;
  userFullName: string | null;
  userAvatar: string | null;
}

function Sidelayout({ children, loggedIn, onLogout, userFullName, userAvatar }: SidelayoutProps) {
  return (
    <div className="flex min-h-screen bg-gray-100">
       <Sidebar
        loggedIn={loggedIn}
        onLogout={onLogout}
        userFullName={userFullName}
        userAvatar={userAvatar}
      >
        {children}
      </Sidebar>
      
    </div>
  );
}

export default function RootLayout({ children }: MyComponentProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [loggedIn, setLoggedIn] = useState(false);
  const [userFullName, setUserFullName] = useState<string | null>(null);
  const [userAvatar, setUserAvatar] = useState<string | null>(null);

  useEffect(() => {
    const fetchSession = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error) {
        console.error('Error fetching session:', error.message);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Unable to fetch session. Please try again later.',
        });
        return;
      }
      if (session) {
        setLoggedIn(true);
        setUserFullName(session.user?.user_metadata?.full_name || session.user?.email || null);
        setUserAvatar(session.user?.user_metadata?.avatar_url || null);
      } else {
        setLoggedIn(false);
        setUserFullName(null);
        setUserAvatar(null);
      }
    };

    fetchSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        setLoggedIn(true);
        setUserFullName(session.user?.user_metadata?.full_name || session.user?.email || null);
        setUserAvatar(session.user?.user_metadata?.avatar_url || null);
      } else {
        setLoggedIn(false);
        setUserFullName(null);
        setUserAvatar(null);
      }
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  // useEffect(() => {
  //   if (loggedIn) {
  //     Swal.fire({
  //       icon: 'success',
  //       title: 'Success',
  //       text: 'Logged in successfully!',
  //       showConfirmButton: false,
  //       timer: 1500,
  //     }).then(() => {
  //       router.push('/inicio');
  //     });
  //   }
  // }, [loggedIn, router]);

  const noMenuPaths = ['/', '/auth/signin', '/auth/signup', '/landing'];

  const onLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Error signing out:', error.message);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Unable to sign out. Please try again later.',
      });
    } else {
      setLoggedIn(false);
      setUserFullName(null);
      setUserAvatar(null);
      router.push('/auth/signin');
    }
  };

  const shouldShowMenu = pathname && !noMenuPaths.includes(pathname);

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="google-adsense-account" content="ca-pub-8281950067427967" />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class">
          {loggedIn && shouldShowMenu ? (
            <Sidelayout
              loggedIn={loggedIn}
              onLogout={onLogout}
              userFullName={userFullName}
              userAvatar={userAvatar}
            >
              {children}
            </Sidelayout>
          ) : (
            <div>{children}</div>
          )}
        </ThemeProvider>
      </body>
    </html>
  );
}
