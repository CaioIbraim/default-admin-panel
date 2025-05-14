"use client";

import * as Dialog from '@radix-ui/react-dialog';
import { Button } from './button';

export function PaymentModal({ isOpen, onClose, price, courseId }: {
  isOpen: boolean;
  onClose: () => void;
  price: number;
  courseId: string;
}) {
  const handlePayment = async () => {
    // Add Stripe payment logic here
    const response = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ courseId, price }),
    });
    const { sessionUrl } = await response.json();
    window.location.href = sessionUrl;
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50" />
        <Dialog.Content className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg">
          <Dialog.Title className="text-xl font-bold mb-4">Confirmar Pagamento</Dialog.Title>
          <p className="mb-4">Valor: R$ {price?.toFixed(2)}</p>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={onClose}>Cancelar</Button>
            <Button onClick={handlePayment}>Pagar</Button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}