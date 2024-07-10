import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import library from './library.png'


export default function Header({ }) {
  
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <a className="navbar-brand" href="/livre">
      <img src={library} alt="Logo" style={{ height: '40px' }} />
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse justify-content-between" id="navbarNav">
        <ul className="navbar-nav" id="navbarNav">
          <li className="nav-item">
            <NavLink to="/livre" className="nav-link">
              Livres
            </NavLink>
          </li>
          <li className="nav-item">
            <Link to="/alluser" className="nav-link">
              Utilisateur
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/adminlivre" className="nav-link">
              Gestion des livres
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/empruntlivre" className="nav-link">
              Gestion des emprunts
            </Link>
          </li>
        </ul>
        <ul className="navbar-nav d-flex align-items-center">
          <li className="nav-item">
            <Link to="/connexion" className="nav-link">
              <i className="bi bi-box-arrow-right"></i> Se connecter
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/inscription" className="nav-link">
              S'inscrire
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
