import React, { useEffect, useState } from 'react';

interface Patient {
  id: number;
  name: string;
  address: string;
  birthday: string;
  weight: number;
  height: number;
  bedOrAddress: string;
  visitingHours: string;
  shifts: string;
  medicalRecords: string;
  nursingProceduresHistory: string[];
}

const PatientDetails: React.FC<{ patient: Patient }> = ({ patient }) => {
  const [bmi, setBmi] = useState<number | null>(null);

  useEffect(() => {
    if (patient.weight && patient.height) {
      const heightInMeters = patient.height / 100;
      const calculatedBmi = patient.weight / (heightInMeters * heightInMeters);
      setBmi(calculatedBmi);
    }
  }, [patient.weight, patient.height]);

  return (
    <div className="border p-4 rounded shadow-md">
      <h2 className="text-xl font-semibold mb-4">Detalhes do Paciente</h2>
      <p><strong>Nome:</strong> {patient.name}</p>
      <p><strong>Endereço:</strong> {patient.address}</p>
      <p><strong>Data de Aniversário:</strong> {patient.birthday}</p>
      <p><strong>Peso:</strong> {patient.weight} kg</p>
      <p><strong>Altura:</strong> {patient.height} cm</p>
      <p><strong>Leito ou Endereço:</strong> {patient.bedOrAddress}</p>
      <p><strong>Horários de Visita ou Plantões:</strong> {patient.visitingHours}</p>
      <p><strong>Informações de Prontuário:</strong> {patient.medicalRecords}</p>
      <p><strong>Histórico de Procedimentos de Enfermagem:</strong> {patient.nursingProceduresHistory.join(', ')}</p>
      {bmi && <p><strong>IMC:</strong> {bmi.toFixed(2)}</p>}
    </div>
  );
};

export default PatientDetails;
