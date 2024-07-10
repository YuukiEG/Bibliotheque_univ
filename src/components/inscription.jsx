import * as React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useState} from 'react';


export default function Inscription(){
    const [formData, setFormData] = useState({
        name: '',
        last_name: '',
        address: '',
        email: '',
        phone: '',
        birthday: '',
        category: '',
        password: '',
      });
      
      const [error, setError] = useState('');

      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value
        });
      };
      
      const validatePasswords = () => {
        return formData.password === formData.confirmPassword;
      };

      const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('tafiditra');
        if (!validatePasswords()) {
            setError('Les mots de passe ne correspondent pas');
            return;
          }
          setError('');
        console.log('tafiditra');
        await axios.post('http://localhost:3002/students', formData).then((response) =>{
            console.log('Student registered successfully:', response.data);
            if (response.data) {
                window.location.pathname = "/livre"; 
              } else {
                console.log('Student connexion successful (single element).');
              }
        })
        .catch((error) => {
          console.error('Error registering student:', error);
        })
        console.log('tafiditra');
      };
    
    return (
        <section className="vh-100 gradient-custom">
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center">
                <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                    <div className="card bg-dark text-white">
                        <form onSubmit={handleSubmit}>
                            <div className="card-body p-5 text-center">
                                <div className="mb-md-5 mt-md-4 pb-5">
                                <h2 className="fw-bold mb-2 text-uppercase">S'inscrire</h2>
                                <p className="text-white-50 mb-5">Veuillez completer les informations suivantes pour s'inscrire</p>

                                <div data-mdb-input-init className="form-outline form-white mb-4"> 
                                    <label className="form-label" >Nom</label>
                                    <input type="text" placeholder='Entrer votre nom' name='name' value={formData.name} onChange={handleChange}  className="form-control form-control-lg" required />
                                </div>
                                <div data-mdb-input-init className="form-outline form-white mb-4">
                                    <label className="form-label">Prénom</label>
                                    <input type="text" placeholder='Entrer votre prenom' name='last_name' value={formData.last_name} onChange={handleChange} className="form-control form-control-lg" required />
                                </div>
                                <div data-mdb-input-init className="form-outline form-white mb-4">
                                    <label className="form-label">Date de naissance</label>
                                    <input type="date" name='birthday' value={formData.birthday} onChange={handleChange} className="form-control form-control-lg" required />
                                </div>
                                <div data-mdb-input-init className="form-outline form-white mb-4">
                                    <label className="form-label">Adresse mail</label>
                                    <input type="email" placeholder='Entrer votre email' name='email' value={formData.email} onChange={handleChange} className="form-control form-control-lg" required />
                                </div>
                                <div data-mdb-input-init className="form-outline form-white mb-4">
                                    <label className="form-label">votre Adresse</label>
                                    <input type="text"  placeholder='Entrer votre adresse exacte' name='address' value={formData.address} onChange={handleChange} className="form-control form-control-lg" required />
                                </div>
                                <div data-mdb-input-init className="form-outline form-white mb-4">
                                    <label className="form-label">Numéro de téléphone</label>
                                    <input type="tel" placeholder='Entrer votre numero' name='phone' value={formData.phone} onChange={handleChange} className="form-control form-control-lg" required />
                                </div>
                                <div data-mdb-input-init className="form-outline form-white mb-4">
                                    <label className="form-label">Vous êtes un(e):</label>
                                    <select className='form-control form-control-lg' name='category' onChange={handleChange}>
                                        <option value="Etudiant">Etudiant</option>
                                        <option value="Professeur">Professeur</option>
                                        <option value="Personnel">Personnel(le)</option>
                                        <option value="Autre">Autre</option>
                                    </select>
                                </div>

                                <div data-mdb-input-init className="form-outline form-white mb-4">
                                    <label className="form-label">Mot de passe</label>
                                    <input type="password" placeholder='Votre mot de passe' name='password' value={formData.password} onChange={handleChange} className="form-control form-control-lg" required />
                                </div>
                                <div data-mdb-input-init className="form-outline form-white mb-4">
                                    <label className="form-label">Confirmer votre Mot de passe</label>
                                    <input type="password" placeholder='Confirmer votre mot de passe' name='confirmPassword' value={formData.confirmPassword} onChange={handleChange} className="form-control form-control-lg" required />
                                </div>
                                {error && <p className='text-red-500 mt-4'>{error}</p>}
                                <button data-mdb-button-init data-mdb-ripple-init className="btn btn-outline-light btn-lg px-5" type="submit">S'inscrire</button>
                                </div>

                                <div>
                                <p className="mb-0">Vous avez déja un compte? <Link to="/connexion" className="text-white-50 fw-bold">Se connecter</Link>
                                </p>
                                </div>

                            </div>      
                        </form>
                    </div>
                </div>
                </div>
            </div>
        </section>

    )
}