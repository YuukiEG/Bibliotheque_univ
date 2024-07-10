import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button } from 'react-bootstrap';
import { FaEdit, FaSave, FaTrash, FaPlus } from 'react-icons/fa';

const AdminLivre  = () => {
  const [books, setBooks] = useState([]);
  const [editingBookId, setEditingBookId] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3002/book')
      .then(response => setBooks(response.data))
      .catch(error => console.error('Erreur lors de la récupération des livres:', error));
  }, []);

  const handleEditClick = (id) => {
    setEditingBookId(id);
  };

  const handleSaveClick = (id) => {
    const book = books.find(book=> book.id_livre === id);
    axios.put(`http://localhost:3002/book/${id}`, book)
      .then(response => {
        setEditingBookId(null);
        console.log('Livre modifié avec succès.',response.data);
      })
      .catch(error => console.error('Erreur lors de la modification du livre:', error));
  };

  const handleDeleteClick = (id) => {
    axios.delete(`http://localhost:3002/book/${id}`)
      .then(response => {
        setBooks(books.filter(book => book.id_livre !== id));
        console.log('Livre supprimé avec succès.');
      })
      .catch(error => console.error('Erreur lors de la suppression du livre:', error));
  };

  const handleContentChange = (e, id, field) => {
    const { innerText } = e.target;
    setUsers(prevUsers => prevUsers.map(book =>
      book.id_livre === id ? { ...book, [field]: innerText } : book
    ));
  };
  const handleAddLivre = async (e) => {
    window.location.pathname = "/ajoutlivre"; 
  }
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Titre</th>
          <th>Auteur</th>
          <th>Categorie</th>
          <th>Langue</th>
          <th>Emplacement</th>
          <th>status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {books.map(book => (
          <tr key={book.id_livre}>
            <td>
                {book.titre}
            </td>
            <td>
              <div
                contentEditable={editingBookId === book.id_livre}
                suppressContentEditableWarning={true}
                onBlur={(e) => handleContentChange(e, book.id_livre, 'titre')}
                style={{
                  borderBottom: editingBookId=== book.id_livre ? '1px solid #ccc' : 'none',
                  padding: '5px 10px',
                }}
              >
                {book.auteur}
              </div>
            </td>
            <td>
              <div
                contentEditable={editingBookId=== book.id_livre}
                suppressContentEditableWarning={true}
                onBlur={(e) => handleContentChange(e, book.id_livre, 'categorie')}
                style={{
                  borderBottom: editingBookId=== book.id_livre ? '1px solid #ccc' : 'none',
                  padding: '5px 10px',
                }}
              >
                {book.categorie}
              </div>
            </td>
            <td>
              <div
                contentEditable={editingBookId=== book.id_livre}
                suppressContentEditableWarning={true}
                onBlur={(e) => handleContentChange(e, book.id_livre, 'langue')}
                style={{
                  borderBottom: editingBookId=== book.id_livre ? '1px solid #ccc' : 'none',
                  padding: '5px 10px',
                }}
              >
                {book.langue}
              </div>
            </td>
            <td>
              <div
                contentEditable={editingBookId=== book.id_livre}
                suppressContentEditableWarning={true}
                onBlur={(e) => handleContentChange(e, book.id_livre, 'emplacement')}
                style={{
                  borderBottom: editingBookId=== book.id_livre ? '1px solid #ccc' : 'none',
                  padding: '5px 10px',
                }}
              >
                {book.emplacement}
              </div>
            </td>
            <td>
              <div
                contentEditable={editingBookId=== book.id_livre}
                suppressContentEditableWarning={true}
                onBlur={(e) => handleContentChange(e, book.id_livre, 'status')}
                style={{
                  borderBottom: editingBookId=== book.id_livre ? '1px solid #ccc' : 'none',
                  padding: '5px 10px',
                }}
              >
                {book.status}
              </div>
            </td>
            <td>
              {editingBookId=== book.id_livre ? (
                <Button variant="success" onClick={() => handleSaveClick(book.id_livre)}>
                  <FaSave /> Sauvegarder
                </Button>
              ) : (
                <Button variant="primary" onClick={() => handleEditClick(book.id_livre)}>
                  <FaEdit /> Modifier
                </Button>
              )}
              <Button variant="danger" onClick={() => handleDeleteClick(book.id_livre)}>
                <FaTrash /> Supprimer
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
      <Button variant="primary" onClick={handleAddLivre }>
                < FaPlus/> Ajouter
        </Button>
    </Table>
    
  );
};

export default AdminLivre;
