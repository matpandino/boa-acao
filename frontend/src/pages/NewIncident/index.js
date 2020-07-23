import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi'

import api from '../../services/api';

import './styles.css';

import logoImg from '../../assets/logo.svg';

export default function NewIncident() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [value, setValue] = useState('');

  const history = useHistory();

  const ongId = localStorage.getItem('ongId');

  async function handleNewIncident(e) {
    e.preventDefault();

    const data = {
      title,
      description,
      value,
    };

    try {
      await api.post('incidents', data, {
        headers: {
          Authorization: ongId,
        }
      })

      history.push('/profile');
    } catch (err) {
      alert('Erro ao cadastrar, tente novamente.');
    }
  }

  return (
    <div className="new-incident-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="Be The Hero"/>

          <h1>Cadastrar nova história</h1>
          <p>Descreva a história do projeto/pessoa para ajuda.</p>

          <Link className="back-link" to="/profile">
            <FiArrowLeft size={16} color="#9D44B5" />
            Voltar para dashboard
          </Link>
        </section>

        <form onSubmit={handleNewIncident}>
          <input 
            placeholder="Nome da pessoa/projeto"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />

          <textarea 
            placeholder="Conte a história da pessoa/projeto que precisa de ajuda"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />

          <input 
            placeholder="Valor em reais"
            value={value}
            onChange={e => setValue(e.target.value)}
          />

          <button className="button" type="submit">Cadastrar</button>
        </form>
      </div>
    </div>
  )
}