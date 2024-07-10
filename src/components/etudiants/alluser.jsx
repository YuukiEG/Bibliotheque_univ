import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button } from 'react-bootstrap';
import { FaEdit, FaSave, FaTrash , FaPlus} from 'react-icons/fa';

const AllUser = () => {
  const [users, setUsers] = useState([]);
  const [editingUserId, setEditingUserId] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3002/students')
      .then(response => setUsers(response.data))
      .catch(error => console.error('Erreur lors de la récupération des utilisateurs:', error));
  }, []);

  const handleEditClick = (id) => {
    setEditingUserId(id);
  };

  const handleSaveClick = (id) => {
    const user = users.find(user => user.id_student === id);
    axios.put(`http://localhost:3002/students/${id}`, user)
      .then(response => {
        setEditingUserId(null);
        console.log('Utilisateur modifié avec succès.',response.data);
      })
      .catch(error => console.error('Erreur lors de la modification de l\'utilisateur:', error));
  };

  const handleDeleteClick = (id) => {
    axios.delete(`http://localhost:3002/students/${id}`)
      .then(response => {
        setUsers(users.filter(user => user.id_student !== id));
        console.log('Utilisateur supprimé avec succès.');
      })
      .catch(error => console.error('Erreur lors de la suppression de l\'utilisateur:', error));
  };

  const handleContentChange = (e, id, field) => {
    const { innerText } = e.target;
    setUsers(prevUsers => prevUsers.map(user =>
      user.id_student === id ? { ...user, [field]: innerText } : user
    ));
  };

  const handleAddUser = async (e) => {
    window.location.pathname = "/inscription"; 
  }

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Matricule</th>
          <th>Nom</th>
          <th>Prénom</th>
          <th>Email</th>
          <th>Téléphone</th>
          <th>Adresse</th>
          <th>Categorie</th>
          <th>Date de Naissance</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map(user => (
          <tr key={user.id_student}>
            <td>
                {user.matricule}
            </td>
            <td>
              <div
                contentEditable={editingUserId === user.id_student}
                suppressContentEditableWarning={true}
                onBlur={(e) => handleContentChange(e, user.id_student, 'name')}
                style={{
                  borderBottom: editingUserId === user.id_student ? '1px solid #ccc' : 'none',
                  padding: '5px 10px',
                }}
              >
                {user.name}
              </div>
            </td>
            <td>
              <div
                contentEditable={editingUserId === user.id_student}
                suppressContentEditableWarning={true}
                onBlur={(e) => handleContentChange(e, user.id_student, 'last_name')}
                style={{
                  borderBottom: editingUserId === user.id_student ? '1px solid #ccc' : 'none',
                  padding: '5px 10px',
                }}
              >
                {user.last_name}
              </div>
            </td>
            <td>
              <div
                contentEditable={editingUserId === user.id_student}
                suppressContentEditableWarning={true}
                onBlur={(e) => handleContentChange(e, user.id_student, 'email')}
                style={{
                  borderBottom: editingUserId === user.id_student ? '1px solid #ccc' : 'none',
                  padding: '5px 10px',
                }}
              >
                {user.email}
              </div>
            </td>
            <td>
              <div
                contentEditable={editingUserId === user.id_student}
                suppressContentEditableWarning={true}
                onBlur={(e) => handleContentChange(e, user.id_student, 'phone')}
                style={{
                  borderBottom: editingUserId === user.id_student ? '1px solid #ccc' : 'none',
                  padding: '5px 10px',
                }}
              >
                {user.phone}
              </div>
            </td>
            <td>
              <div
                contentEditable={editingUserId === user.id_student}
                suppressContentEditableWarning={true}
                onBlur={(e) => handleContentChange(e, user.id_student, 'address')}
                style={{
                  borderBottom: editingUserId === user.id_student ? '1px solid #ccc' : 'none',
                  padding: '5px 10px',
                }}
              >
                {user.address}
              </div>
            </td>
            <td>
              <div
                contentEditable={editingUserId === user.id_student}
                suppressContentEditableWarning={true}
                onBlur={(e) => handleContentChange(e, user.id_student, 'category')}
                style={{
                  borderBottom: editingUserId === user.id_student ? '1px solid #ccc' : 'none',
                  padding: '5px 10px',
                }}
              >
                {user.category}
              </div>
            </td>
            <td>
              <div
                contentEditable={editingUserId === user.id_student}
                suppressContentEditableWarning={true}
                onBlur={(e) => handleContentChange(e, user.id_student, 'birthday')}
                style={{
                  borderBottom: editingUserId === user.id_student ? '1px solid #ccc' : 'none',
                  padding: '5px 10px',
                }}
              >
                {user.birthday.slice(0, 10)}
              </div>
            </td>
            <td>
              {editingUserId === user.id_student ? (
                <Button variant="success" onClick={() => handleSaveClick(user.id_student)}>
                  <FaSave /> Sauvegarder
                </Button>
              ) : (
                <Button variant="primary" onClick={() => handleEditClick(user.id_student)}>
                  <FaEdit /> Modifier
                </Button>
              )}
              <Button variant="danger" onClick={() => handleDeleteClick(user.id_student)}>
                <FaTrash /> Supprimer
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
      <Button variant="primary" onClick={handleAddUser }>
                < FaPlus/> Ajouter
        </Button>
    </Table>
  );
};

export default AllUser;
