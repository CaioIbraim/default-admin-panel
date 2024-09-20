import React from 'react';
import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa';

interface BackLinkProps {
  href: string;
  label: string;
}

const BackLink: React.FC<BackLinkProps> = ({ href, label }) => {
  return (
    <Link href={href}>
      <span className="flex items-center text-[#6495ED] hover:text-[#4682B4] ">
        <FaArrowLeft className="mr-2" />
        {label}
      </span>
    </Link>
  );
};

export default BackLink;
