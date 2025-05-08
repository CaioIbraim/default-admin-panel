'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import * as Dialog from '@radix-ui/react-dialog'

interface ProfessionalType {
  id: number
  name: string
}

export default function ProfessionalTypes() {
  const [types, setTypes] = useState<ProfessionalType[]>([
    { id: 1, name: 'Doctor' },
    { id: 2, name: 'Nurse' },
  ])
  const [newType, setNewType] = useState('')

  const handleAddType = () => {
    if (newType.trim()) {
      setTypes([...types, { id: types.length + 1, name: newType }])
      setNewType('')
    }
  }

  const handleDeleteType = (id: number) => {
    setTypes(types.filter(type => type.id !== id))
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Professional Types</h1>
      
      // Replace the Dialog section with:
      <div className="mb-6">
        <Dialog.Root>
          <Dialog.Trigger asChild>
            <Button>Add New Type</Button>
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 bg-black/50" />
            <Dialog.Content className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg">
              <Dialog.Title className="text-lg font-bold mb-4">
                Add Professional Type
              </Dialog.Title>
              <div className="flex gap-2">
                <Input
                  value={newType}
                  onChange={(e) => setNewType(e.target.value)}
                  placeholder="Type name"
                />
                <Button onClick={handleAddType}>Add</Button>
              </div>
              <Dialog.Close />
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {types.map((type) => (
            <TableRow key={type.id}>
              <TableCell>{type.id}</TableCell>
              <TableCell>{type.name}</TableCell>
              <TableCell>
                <Button
                  variant="destructive"
                  onClick={() => handleDeleteType(type.id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
