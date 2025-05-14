"use client";

import * as Dialog from '@radix-ui/react-dialog';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  price: number;
  courseId: string;
}

export function PaymentModal({ isOpen, onClose, price, courseId }: PaymentModalProps) {
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ courseId, price }),
      });

      const { sessionUrl } = await response.json();
      window.location.href = sessionUrl;
    } catch (error) {
      console.error('Payment error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
        <Dialog.Content className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-[90%] max-w-md">
          <Dialog.Title className="text-xl font-bold mb-4">Confirmar Pagamento</Dialog.Title>
          
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-md">
              <p className="text-sm text-gray-600 dark:text-gray-300">Valor do curso:</p>
              <p className="text-2xl font-bold">R$ {price?.toFixed(2)}</p>
            </div>

            <div className="text-sm text-gray-500 dark:text-gray-400">
              <p>Você será redirecionado para a página de pagamento seguro.</p>
            </div>
          </div>

          <div className="flex justify-end gap-2 mt-6">
            <Button 
              variant="outline" 
              onClick={onClose}
              disabled={loading}
            >
              Cancelar
            </Button>
            <Button 
              onClick={handlePayment}
              disabled={loading}
            >
              {loading ? 'Processando...' : 'Continuar para pagamento'}
            </Button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}