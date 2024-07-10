import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Modal, Form, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './allbook.css';
import '../view/search.css';

const LivreCategories = () => {
  const [livres, setLivres] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    studentID: '',
    livreID: '',
    startDate: ''
  });
  const [selectedLivreID, setSelectedLivreID] = useState(null);
  const [show, setShow] = useState(false);

  const handleShow = (livreID) => {
    setSelectedLivreID(livreID);
    setFormData({ ...formData, livreID: livreID });
    setShow(true);
  };

  const handleClose = () => setShow(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      studentID: parseInt(formData.studentID, 10),
      livreID: parseInt(formData.livreID, 10),
      startDate: formData.startDate
    };
    axios.post('http://localhost:3002/book/emprunt', data)
      .then(response => {
        setLivres(livres.map(livre => livre.id_livre === formData.livreID ? { ...livre, statut: false } : livre));
        console.log('Livre emprunté avec succès.', response.data);
        handleClose();
      })
      .catch(error => console.error('Erreur lors de l\'emprunt du livre:', error));
  };

  useEffect(() => {
    axios.get('http://localhost:3002/book')
      .then(response => {
        setLivres(response.data);
        const uniqueCategories = [...new Set(response.data.map(livre => livre.categorie))];
        setCategories(uniqueCategories);
      })
      .catch(error => console.error('Erreur lors de la récupération des livres:', error));
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredLivres = livres.filter(livre => 
    livre.titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    livre.auteur.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className='d-flex column justify-content-around align-items-center'>
        <h1 className='active'>Livres</h1>
        <h3><Link to='/livre-disponible' style={{textDecoration: "none"}}>Disponibles</Link></h3>
        <h3><Link to='/livre-nondisponible' style={{textDecoration: "none"}}>Non Disponibles</Link></h3>
      </div>
      <div className="search">
        <div className="search-box">
          <div className="search-field">
            <input placeholder="Search..." className="input" type="text" name='text' onChange={handleSearchChange} />
            <div className="search-box-icon">
              <button className="btn-icon-content">
                <i className="search-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 512 512">
                    <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" fill="#fff"></path>
                  </svg>
                </i>
              </button>
            </div>
          </div>
        </div>
      </div>
      {categories.map(categorie => (
        <div key={categorie}>
          <h3>{categorie}:</h3>
          <hr />
          <Row>
            {filteredLivres.filter(livre => livre.categorie === categorie).map(livre => (
              <Col key={livre.id_livre} xs={12} sm={6} md={4} lg={3} className="mb-3">
                <div className="book-grid">
                  <img 
                    src={livre.imagePath ? `/uploads/${livre.imagePath}` : 'holder.js/100px180'} 
                    alt="No Cover" 
                    className="book-image"
                  />
                  <h5>{livre.titre}</h5>
                  <p>Auteur: {livre.auteur}</p>
                  <p>Date: {livre.createdAt.slice(0, 10)}</p>
                  <Button variant={livre.statut ? "success" : "danger"} className="mb-2">
                    statut: {livre.statut ? 'Disponible' : 'Non Disponible'}
                  </Button>
                  {livre.statut && (
                    <Button variant="primary" onClick={() => handleShow(livre.id_livre)} className="mr-2">Emprunter</Button>
                  )}
                </div>
              </Col>
            ))}
          </Row>
          <hr />
        </div>
      ))}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Emprunter un livre</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formStudentID">
              <Form.Label>Student ID</Form.Label>
              <Form.Control
                type="number"
                name="studentID"
                value={formData.studentID}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formLivreID">
              <Form.Label>Livre ID</Form.Label>
              <Form.Control
                type="text"
                name="livreID"
                value={selectedLivreID}
                readOnly
              />
            </Form.Group>
            <Form.Group controlId="formStartDate">
              <Form.Label>Date de début</Form.Label>
              <Form.Control
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Emprunter
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default LivreCategories;
