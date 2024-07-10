import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';


const Disponible = () => {
    const [livres, setLivres] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3002/book')
      .then(response => {
        const disponibles = response.data.filter(livre => livre.statut === true);
        setLivres(disponibles);
      })
      .catch(error => console.error('Erreur lors de la récupération des livres:', error));
  }, []);

  const categories = [...new Set(livres.map(livre => livre.categorie))];

    return(
        <div>
            <div className='d-flex column justify-content-around align-items-center'>
                <h3><Link to="/livre" style={{textDecoration: "none"}}>Tous les livres</Link></h3>
                <h1 className='active' >Disponibles</h1>
                <h3><Link to='/livre-nondisponible' style={{textDecoration: "none"}}>Non Disponibles</Link></h3>
            </div>
            <hr />
            {categories.map(categorie => (
        <div key={categorie}>
          <h3>{categorie}:</h3>
          <hr />
          <div className='d-flex flex-wrap row justify-content-around align-items-center'>
            {livres.filter(livre => livre.categorie === categorie).map(livre => (
              <Card key={livre.id_livre} style={{ width: '10rem', height: "auto" }}>
                <Card.Img variant="top" src={livre.imagePath ? `/uploads/${livre.imagePath}` : 'holder.js/100px180'} alt='No Cover' />
                <Card.Body>
                  <Card.Title>{livre.titre}</Card.Title>
                  <Card.Text>
                    Auteur: {livre.auteur}<br />
                    Date: {livre.createdAt.slice(0, 10)}<br />
                  </Card.Text>
                  <Button variant="success">statut: Dispo</Button>
                </Card.Body>
              </Card>
            ))}
          </div>
          <hr />
        </div>
      ))}
        </div>
    )
}
export default Disponible