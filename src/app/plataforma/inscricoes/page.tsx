'use client';

import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function EnrollmentsPage() {
  const [enrollments, setEnrollments] = useState([
    { id: 1, name: "John Doe", course: "React Basics", status: "Active" },
    { id: 2, name: "Jane Smith", course: "TypeScript", status: "Pending" },
  ]);

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Enrollments</h1>
        <div className="flex gap-4">
          <Input placeholder="Search enrollments..." className="w-64" />
          <Button>New Enrollment</Button>
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Course</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {enrollments.map((enrollment) => (
            <TableRow key={enrollment.id}>
              <TableCell>{enrollment.id}</TableCell>
              <TableCell>{enrollment.name}</TableCell>
              <TableCell>{enrollment.course}</TableCell>
              <TableCell>{enrollment.status}</TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">Edit</Button>
                  <Button variant="destructive" size="sm">Delete</Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
