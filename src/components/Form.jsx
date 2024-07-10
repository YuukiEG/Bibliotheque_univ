import * as React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

export default function Formulaire(){
    const [auth,setAuth] = useState ({
        email:'',
        password:''
    })
    
    const handleChange = (e) => {
        const {name, value} = e.target;
        setAuth({
            ...auth,
            [name]: value
        });
    };
    const handleSubmit = async (e) =>{
        e.preventDefault();
        await axios.post('http://localhost:3002/auth', auth).then((response) =>{
            console.log('connexion reussi', response.data)
            if (response.data) {
                window.location.pathname = "/c"; 
              } else {
                console.log('Student registration successful (single element).');
              }
        }).catch((error) => {
            console.error('Error registering student:', error);
          })
    }
    return (
        <section className="vh-100 gradient-custom">
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                    <form onSubmit={handleSubmit}>
                        <div className="card bg-dark text-white">
                        <div className="card-body p-5 text-center">

                            <div className="mb-md-5 mt-md-4 pb-5">

                            <h2 className="fw-bold mb-2 text-uppercase">BIENVENUE</h2>
                            <p className="text-white-50 mb-5">Entrer votre nom et mot de passe pour se connecter</p>

                            <div data-mdb-input-init className="form-outline form-white mb-4">    
                                <label className="form-label">E-mail</label>
                                <input type="email" id="typeEmailX" name='email' placeholder='Entrer votre adresse mail' value={auth.email} onChange={handleChange} className="form-control form-control-lg" required/>

                            </div>

                            <div data-mdb-input-init className="form-outline form-white mb-4">
                                <label className="form-label" >Mot de passe</label>
                                <input type="password" placeholder='Entrer votre mot de passe' name='password' value={auth.password} onChange={handleChange} id="typePasswordX" className="form-control form-control-lg" required />

                            </div>

                            <p className="small mb-5 pb-lg-2"><a className="text-white-50" href="#!">Mot de passe oublié?</a></p>

                            <button data-mdb-button-init data-mdb-ripple-init className="btn btn-outline-light btn-lg px-5" type="submit">Se connecter</button>
                            </div>

                            <div>
                            <p className="mb-0">Pas encore de compte? <Link to="/inscription" className="text-white-50 fw-bold">S'inscrire</Link>
                            </p>
                            </div>

                        </div>
                        </div>
                    </form>

                </div>
                </div>
            </div>
        </section>

    )
}