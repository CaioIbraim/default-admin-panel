'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { FaHome } from 'react-icons/fa';
import '../../css/breadcrumbs.css';

const Breadcrumbs = () => {
  const pathname = usePathname();
  const [pathParts, setPathParts] = useState<string[]>([]);

  useEffect(() => {
    setPathParts(pathname.split('/').filter(part => part));
  }, [pathname]);

  return (
    <nav aria-label="breadcrumb" className="breadcrumb-container">
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <Link href="/inicio" className="breadcrumb-link">
            <FaHome className="breadcrumb-icon" />  
          </Link>
        </li>
        {pathParts.map((part, index) => (
          <li key={index} className="breadcrumb-item">
            <Link
              href={`/${pathParts.slice(0, index + 1).join('/')}`}
              className="breadcrumb-link"
            >
              {part}
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
