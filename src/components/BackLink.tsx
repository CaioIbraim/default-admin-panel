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
      <span className="flex items-center text-[#70faea] hover:text-[#00796b] ">
        <FaArrowLeft className="mr-2" />
        {label}
      </span>
    </Link>
  );
};

export default BackLink;
