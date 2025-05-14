"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import {Skeleton} from "@/components/ui/skeleton"; // Ajuste o caminho conforme sua estrutura
import { useRouter } from 'next/navigation';
import { PaymentModal } from '@/components/payment-modal';
import { supabase } from '@/lib/supabaseClient'
import { transcode } from "buffer";

export default function ProductPage() {
  const { id } = useParams();
  const [training, setTraining] = useState<any | []>([]);
  const [loading, setLoading] = useState(true);
  const [mainImage, setMainImage] = useState("");
  const router = useRouter();
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  const defaultImages = [
    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080&q=80 ",
    "https://images.unsplash.com/photo-1505751171710-1f6d0ace5a85?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080&q=80 ",
    "https://images.unsplash.com/photo-1484704849700-f032a568e944?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080&q=80 ",
    "https://images.unsplash.com/photo-1496957961599-e35b69ef5d7c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080&q=80 ",
    "https://images.unsplash.com/photo-1528148343865-51218c4a13e6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080&q=80 "
  ];

  useEffect(() => {
    const fetchTraining = async () => {
      try {
        const { data, error } = await supabase
          .from('cursos')
          .select('*, aulas(*)')
          .eq('id', id);

        setTraining(data?.[0] || null);
        // Set initial main image
        setMainImage(data?.[0]?.banner_url || defaultImages[0]);
      } catch (error) {
        console.error("Error fetching training:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTraining();
  }, [id]);

  if (loading) {
    return (
      <div className="p-6">
        <Skeleton className="h-12 w-[250px] mb-6" />
        <div className="grid gap-6">
          <Skeleton className="h-[400px] md:h-[500px]" />
          <Skeleton className="h-[200px]" />
        </div>
      </div>
    );
  }

  if (!training) {
    return <div className="p-6">Curso não encontrado</div>;
  }

  const thumbnails = training.images?.slice(1, 5) || defaultImages.slice(1);

  
  const handlePurchase = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      router.push('/auth/signup');
      return;
    }

    setIsPaymentModalOpen(true);
  };

  return (
    <div className="bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap -mx-4">
          {/* Product Images */}

          
          
          <div className="w-full md:w-1/2 px-4 mb-8">
            <img
              src={training.banner_url}
              alt={training.titulo || "Curso"}
              className="w-full h-[300px] md:h-[400px] object-cover rounded-lg shadow-md mb-4"
            />
           <div className="flex flex-col  justify-center overflow-y-auto">
                    <div className="flex ">
                    <div className="overflow-x-auto w-full max-w-4xl">
                        <table className="w-full bg-white shadow-md rounded-lg border border-gray-200">
                        <thead>
                            <tr className="border-b">
                            <th className="px-6 py-4 text-left text-gray-600 font-medium">Aulas</th>
                            </tr>
                        </thead>
                        <tbody>
                            {training.aulas.map((aula : any, index : number) => (
                            <tr key={index} className="border-b hover:bg-gray-50 transition">
                                <td className="px-6 py-4 flex items-center gap-4">
                                <div>
                                    <p className="text-gray-800 font-medium">{aula.titulo }</p>
                                </div>
                                </td>
                            </tr>
                            ))}
                        </tbody>
                        </table>
                    </div>
                    </div>

             
            </div>
          </div>

          {/* Product Details */}
          <div className="w-full md:w-1/2 px-4">
            <h2 className="text-3xl font-bold mb-2">{training.titulo}</h2>
            {/* <p className="text-gray-600 mb-4">SKU: {training.sku || "N/A"}</p> */}
            <div className="mb-4">
              <span className="text-2xl font-bold mr-2">R$ {training.valor?.toFixed(2) || '00,00'}</span>
            </div>

            {/* <div className="flex items-center mb-4">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-6 text-yellow-500"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                    clipRule="evenodd"
                  />
                </svg>
              ))}
              <span className="ml-2 text-gray-600">4.5 (120 reviews)</span>
            </div> */}

            <p className="text-gray-700 mb-6">{training.descricao}</p>

            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Duração:</h3>
              <p>{training.carga_horaria } horas  de conteúdo</p>
            </div>

            <div className="flex space-x-4 mb-6">

                {  (training.valor  == null) ? 
                
                <button className="bg-indigo-600 flex gap-2 items-center text-white px-6 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                    Matricular-se gratuitamente
                </button>
                
                : 
                <>
                    <button 
                    onClick={handlePurchase}
                            className="bg-indigo-600 flex gap-2 items-center text-white px-6 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                    Comprar
                    </button>

                    <PaymentModal 
                    isOpen={isPaymentModalOpen}
                    onClose={() => setIsPaymentModalOpen(false)}
                    price={training.valor}
                    courseId={id as string}
                    />

                </>
}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}