import {
  ChartBarSquareIcon,
  CursorArrowRaysIcon,
  DevicePhoneMobileIcon,
  AdjustmentsHorizontalIcon,
  SunIcon,
} from "@heroicons/react/24/solid";

import benefitOneImg from "../../public/img/benefit-one.png";
import benefitTwoImg from "../../public/img/benefit-two.png";
import { FaCirclePlus } from "react-icons/fa6";
import { FaCalculator, FaCalendar, FaInfoCircle } from "react-icons/fa";

const benefitOne = {
  title: "Funcionalidades",
  desc: "Revolucionando o cuidado com a saúde através da tecnologia. Nosso aplicativo fornece ferramentas essenciais para enfermeiros gerenciarem pacientes, agendamentos e recursos educacionais, tudo em um só lugar.",
  image: benefitOneImg,
  bullets: [
    {
      title: " Gerenciamento de Plantões",
      desc: "Gerencie seus plantões de maneira fácil.",
      icon: <FaCalendar />,
    },
    {
      title: "Dicionário de Termos Técnicos de Enfermagem",
      desc: "Busca por título ou categoria, detalhes de cada pagamento.",
      icon: <FaCirclePlus />,
    },
    {
      title: "Calculadoras de Doses",
      desc: "Busca por nome ou categoria, fórmula de cálculo, descrição.",
      icon: <FaCalculator />,
    },
    // {
    //   title: " Informações sobre Doenças e Tratamentos",
    //   desc: "Busca por nome de doença, detalhes do tratamento, informações adicionais.",
    //   icon: <FaInfoCircle />,
    // },
    
  ],
};

const benefitTwo = {
  title: "Offer more benefits here",
  desc: "You can use this same layout with a flip image to highlight your rest of the benefits of your product. It can also contain an image or Illustration as above section along with some bullet points.",
  image: benefitTwoImg,
  bullets: [
    {
      title: "Mobile Responsive Template",
      desc: "Nextly is designed as a mobile first responsive template.",
      icon: <DevicePhoneMobileIcon />,
    },
    {
      title: "Powered by Next.js & TailwindCSS",
      desc: "This template is powered by latest technologies and tools.",
      icon: <AdjustmentsHorizontalIcon />,
    },
    {
      title: "Dark & Light Mode",
      desc: "Nextly comes with a zero-config light & dark mode. ",
      icon: <SunIcon />,
    },
  ],
};


export {benefitOne, benefitTwo};
