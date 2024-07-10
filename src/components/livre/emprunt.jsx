import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button } from 'react-bootstrap';
import './emprunt.css';

const GestionEmprunts = () => {
  const [emprunts, setEmprunts] = useState([]);

  useEffect(() => {
    fetchEmprunts();
  }, []);

  const fetchEmprunts = async () => {
    try {
      const response = await axios.get('http://localhost:3002/book/emprunt');
      setEmprunts(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des emprunts:', error);
    }
  };

  const handleReturnClick = async (emprunt) => {
    try {
      await axios.put(`http://localhost:3002/book/emprunt/${emprunt.id_emprunt}`);
      fetchEmprunts();
    } catch (error) {
      console.error('Erreur lors du retour du livre:', error);
    }
  };

  return (
    <div>
      <h1>Gestion des Emprunts</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nom du Livre</th>
            <th>Nom de l'Étudiant</th>
            <th>Date d'Emprunt</th>
            <th>Date de Retour</th>
            <th>Pénalité</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {emprunts.map(emprunt => (
            <tr key={emprunt.id_emprunt}>
              <td>{emprunt.livre.titre}</td>
              <td>{emprunt.student.name} {emprunt.student.last_name}</td>
              <td>{new Date(emprunt.startDate).toLocaleDateString()}</td>
              <td>{new Date(emprunt.endDate).toLocaleDateString()}</td>
              <td>{emprunt.penalty}</td>
              <td>
                {!emprunt.returned && (
                  <Button variant="success" onClick={() => handleReturnClick(emprunt)}>Retourner</Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default GestionEmprunts;
