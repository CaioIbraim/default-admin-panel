"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import {Skeleton} from "@/components/ui/skeleton"; // Ajuste o caminho conforme sua estrutura
import { supabase } from '@/lib/supabaseClient'
import Image from "next/image";

export default function ProductPage() {
  const { id } = useParams();
  const [produto, setProduto] = useState<any | []>([]);
  const [loading, setLoading] = useState(true);
  const [mainImage, setMainImage] = useState("");

  

  useEffect(() => {
    const fetchTraining = async () => {
      try {
        const { data, error } = await supabase
          .from('produtos')
          .select('*, empresas(*)')
          .eq('id', id);

        setProduto(data?.[0] || null);
        // Set initial main image
        setMainImage(data?.[0]?.imagens);
      } catch (error) {
        console.error("Error fetching produto:", error);
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

  if (!produto) {
    return <div className="p-6">Produto não encontrado</div>;
  }

  const thumbnails = produto.imagens?.slice(0, 5);

  return (
    <div className="bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap -mx-4">
          {/* Product Images */}

          
          
          <div className="w-full md:w-1/2 px-4 mb-8">
            
            <img
              src={mainImage}
              alt={produto.nome || "Curso"}
             className="w-full h-[300px] md:h-[400px] object-cover rounded-lg shadow-md mb-4"
            />

            <div className="flex gap-4 py-4 justify-center overflow-x-auto">
              {thumbnails.map((thumb: string, index : number) => (
                <img
                  key={index}
                  src={thumb}
                  alt={`Thumbnail ${index + 1}`}
                  className="size-16 sm:size-20 object-cover rounded-md cursor-pointer opacity-60 hover:opacity-100 transition duration-300"
                  onClick={() => setMainImage(thumb)}
                />
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="w-full md:w-1/2 px-4">
          <div className="mb-4 flex items-center gap-2">
            <img 
              alt="Imagem da empresa" 
              src={produto.empresas.imagem_url} 
              width={50}
              height={50}
              className="rounded-full object-cover"
            /> 
            <span className="text-xl font-bold">{produto.empresas.nome}</span>
          </div>
            <h2 className="text-3xl font-bold mb-2">{produto.nome}</h2>
            {/* <p className="text-gray-600 mb-4">SKU: {produto.sku || "N/A"}</p> */}
            <div className="mb-4">
              <span className="text-2xl font-bold mr-2">R$ {produto.preco?.toFixed(2) || '00,00'}</span>
              <span className="text-2xl font-bold mr-2">- {produto.unidade_medida}</span>
            </div>

           

            <div className="flex items-center mb-4">
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
            </div>

            <p className="text-gray-700 mb-6">{produto.descricao}</p>

           

            <div className="flex space-x-4 mb-6">
              <button className="bg-indigo-600 flex gap-2 items-center text-white px-6 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                </svg> */}
                Comprar
              </button>
              <button className="bg-gray-200 flex gap-2 items-center text-gray-800 px-6 py-2 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                </svg>
                Por no Carrinho
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}