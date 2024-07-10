import React, { useState } from 'react';
import axios from 'axios';

const AddBook = () => {
  const [formData, setFormData] = useState({
    titre: '',
    auteur: '',
    categorie: '',
    langue: '',
    emplacement: '',
    statut: true,
    imagePath:'',
  });

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : (name === 'image' ? files[0] : value),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3002/book', formData);
      console.log('Livre créé avec succès:', response.data);
      window.location.pathname = "/adminlivre"; 
      // Réinitialiser le formulaire ou afficher un message de succès
    } catch (error) {
      console.error('Erreur lors de la création du livre:', error);
      // Gérer les erreurs, afficher un message d'erreur, etc.
    }
  };

  return (
    <div className="container mt-5">
      <div className="card mx-auto" style={{ maxWidth: '600px' }}>
        <div className="card-header text-center"><h1>Ajouter un livre</h1></div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="title">Titre:</label>
              <input 
                type="text" 
                name="titre" 
                value={formData.titre} 
                onChange={handleChange} 
                required 
                className="form-control" 
              />
            </div>
            <div className="form-group">
              <label htmlFor="auteur">Auteur:</label>
              <input 
                type="text" 
                name="auteur" 
                value={formData.auteur} 
                onChange={handleChange} 
                required 
                className="form-control" 
              />
            </div>
            <div className="form-group">
              <label htmlFor="categorie">Genre:</label>
              <select 
                className='form-control' 
                name='categorie' 
                value={formData.categorie} 
                onChange={handleChange}
              >
                <option value="Fiction">Fiction</option>
                <option value="Non_fiction">Non-fiction</option>
                <option value="Jeunesse">Jeunesse</option>
                <option value="Education">Education</option>
                <option value="Bandes dessinées et mangas">Bandes dessinées et mangas</option>
                <option value="Livres pratiques">Livres pratiques</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="langue">Langue:</label>
              <input 
                type="text" 
                name="langue" 
                value={formData.langue} 
                onChange={handleChange} 
                className="form-control" 
              />
            </div>
            <div className="form-group">
              <label htmlFor="emplacement">Emplacement:</label>
              <input 
                type="text" 
                name="emplacement" 
                value={formData.emplacement} 
                onChange={handleChange} 
                className="form-control" 
              />
            </div>
            <div className="form-group">
              <label htmlFor="image">Image:</label>
              <input 
                type="file" 
                name="imagePath" 
                onChange={handleChange} 
                className="form-control-file" 
              />
            </div>
            <div className="text-center">
              <button type="submit" className="btn btn-primary">
                Ajouter
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddBook;
