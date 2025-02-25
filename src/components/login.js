import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { setUser } from '../redux/store';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState([]);
  const [attempts, setAttempts] = useState(0);
  const [isDisabled, setIsDisabled] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // État pour gérer la visibilité du mot de passe
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (attempts >= 3) {
      setIsDisabled(true);
      return;
    }

    try {
      const response = await axios.get(
        `https://678177b885151f714b0ae2c7.mockapi.io/myapitest/users`
      );
      const users = response.data;

      const user = users.find(
        (u) => u.pseudo === username && u.MotDePasse === password
      );

      if (user) {
        dispatch(setUser(user));
        navigate('/Accueil');
      } else {
        setError((prev) => [...prev, 'Nom d’utilisateur ou mot de passe incorrect']);
        setAttempts((prev) => prev + 1);
      }
    } catch (err) {
      setError((prev) => [...prev, 'Une erreur s’est produite lors de la connexion']);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="container">
      {/* Panneau gauche */}
      <div className="left-panel">
        <h1>Bienvenue !</h1>
        <p>Connectez-vous pour continuer.</p>
      </div>

      {/* Panneau droit */}
      <div className="right-panel">
        <h2>Connexion</h2>
        <form onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            placeholder="Pseudo"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            disabled={isDisabled}
            required
          />
          <div className="password-container">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isDisabled}
              required
            />
            <FontAwesomeIcon
              icon={showPassword ? faEyeSlash : faEye}
              className="eye-icon"
              onClick={togglePasswordVisibility}
            />
          </div>
          <button type="button" onClick={handleLogin} disabled={isDisabled}>
            Se connecter
          </button>
          {isDisabled && <p>Vous avez dépassé le nombre de tentatives autorisées.</p>}
          {error.length > 0 && (
            <ul className="error-message">
              {error.map((err, index) => (
                <li key={index}>{err}</li>
              ))}
            </ul>
          )}
        </form>
        <p className="login-link">
          Vous n'avez pas de compte ? <a href="/create-account" className="clean-link">Inscrivez-vous</a>
        </p>
      </div>

      {/* Styles CSS */}
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        .container {
          display: flex;
          flex-direction: column; /* Par défaut, les éléments sont empilés verticalement */
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          background: linear-gradient(135deg, #6a11cb, #2575fc);
          padding: 20px;
        }
        .left-panel {
          width: 100%;
          padding: 20px;
          color: white;
          text-align: center;
          margin-bottom: 20px;
        }
        .right-panel {
          width: 100%;
          padding: 20px;
          background: white;
          border-radius: 15px;
          box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);
        }
        form {
          display: flex;
          flex-direction: column;
        }
        input {
          padding: 10px;
          margin: 10px 0;
          border-radius: 5px;
          border: 1px solid #ccc;
          width: 100%;
        }
        button {
          padding: 10px;
          border-radius: 5px;
          background: #6a11cb;
          color: white;
          border: none;
          cursor: pointer;
          width: 100%;
        }
        .error-message {
          color: red;
          margin-top: 10px;
        }
        .login-link {
          text-align: center;
          margin-top: 15px;
        }
        .clean-link {
          color: #6a11cb;
          text-decoration: none;
          font-weight: bold;
        }
        .clean-link:hover {
          text-decoration: none;
        }
        .password-container {
          position: relative;
        }
        .eye-icon {
          position: absolute;
          right: 10px;
          top: 50%;
          transform: translateY(-50%);
          cursor: pointer;
          color: #6a11cb;
        }

        /* Media Queries pour les écrans plus larges */
        @media (min-width: 768px) {
          .container {
            flex-direction: row; /* Les éléments sont côte à côte sur les grands écrans */
            gap: 40px;
          }
          .left-panel {
            width: 40%;
            margin-bottom: 0;
            text-align: left;
          }
          .right-panel {
            width: 40%;
          }
        }
      `}</style>
    </div>
  );
};

export default Login;