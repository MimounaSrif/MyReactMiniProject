import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/store';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const CreateAccount = () => {
    const [formData, setFormData] = useState({
        nom: '',
        age: '',
        admin: false,
        MotDePasse: '',
        pseudo: '',
        prenom: '',
        couleur: 'Pink',
        Devise: 'MAD',
        Pays: 'Morocco',
        email: '',
        photo: '',
        avatar: '',
    });

    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [errors, setErrors] = useState([]);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const validatePassword = (password) => {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return passwordRegex.test(password);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: name === "admin" ? value === "Admin" : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = [];

        if (!validatePassword(formData.MotDePasse)) {
            validationErrors.push('Le mot de passe doit contenir au moins une majuscule, une minuscule, un chiffre, un caractère spécial et avoir au moins 8 caractères.');
        }
        if (formData.MotDePasse !== confirmPassword) {
            validationErrors.push('La confirmation du mot de passe ne correspond pas.');
        }

        if (validationErrors.length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            const response = await axios.post('https://678177b885151f714b0ae2c7.mockapi.io/myapitest/users', formData);
            dispatch(setUser(response.data));
            navigate('/Accueil');
        } catch (error) {
            setErrors(['Une erreur est survenue lors de la création du compte.']);
        }
    };

    return (
        <div className="container">
            {/* Panneau gauche */}
            <div className="left-panel">
                <h1>Bienvenue !</h1>
                <p>Créez votre compte pour continuer.</p>
            </div>

            {/* Panneau droit */}
            <div className="right-panel">
                <h2>Créer un compte</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-columns">
                        {/* Colonne gauche du formulaire */}
                        <div className="left-column">
                            <input type="text" name="nom" placeholder="Nom" value={formData.nom} onChange={handleChange} required />
                            <input type="text" name="prenom" placeholder="Prénom" value={formData.prenom} onChange={handleChange} required />
                            <input type="number" name="age" placeholder="Âge" value={formData.age} onChange={handleChange} required />
                            <select name="admin" value={formData.admin ? "Admin" : "Visiteur"} onChange={handleChange} required>
                                <option value="Admin">Admin</option>
                                <option value="Visiteur">Visiteur</option>
                            </select>
                            <input type="text" name="pseudo" placeholder="Pseudo" value={formData.pseudo} onChange={handleChange} required />
                            <select name="couleur" value={formData.couleur} onChange={handleChange} required>
                                <option value="Pink">Pink</option>
                                <option value="Red">Red</option>
                                <option value="Blue">Blue</option>
                                <option value="Green">Green</option>
                                <option value="Yellow">Yellow</option>
                                <option value="Black">Black</option>
                                <option value="White">White</option>
                                <option value="Orange">Orange</option>
                                <option value="Violet">Violet</option>
                                <option value="Gray">Gray</option>
                                <option value="Brown">Brown</option>
                                <option value="Cyan">Cyan</option>
                            </select>
                            <select name="Devise" value={formData.Devise} onChange={handleChange} required>
                                <option value="MAD">MAD</option>
                                <option value="USD">USD</option>
                                <option value="EUR">EUR</option>
                                <option value="GBP">GBP</option>
                                <option value="JPY">JPY</option>
                                <option value="CAD">CAD</option>
                                <option value="AUD">AUD</option>
                                <option value="CHF">CHF</option>
                                <option value="CNY">CNY</option>
                                <option value="INR">INR</option>
                                <option value="BRL">BRL</option>
                                <option value="ZAR">ZAR</option>
                            </select>
                        </div>

                        {/* Colonne droite du formulaire */}
                        <div className="right-column">
                            <select name="Pays" value={formData.Pays} onChange={handleChange} required>
                                <option value="Morocco">Morocco</option>
                                <option value="France">France</option>
                                <option value="United States">United States</option>
                                <option value="Canada">Canada</option>
                                <option value="Japan">Japan</option>
                                <option value="Germany">Germany</option>
                                <option value="United Kingdom">United Kingdom</option>
                                <option value="Italy">Italy</option>
                                <option value="Spain">Spain</option>
                                <option value="Brazil">Brazil</option>
                                <option value="Australia">Australia</option>
                                <option value="India">India</option>
                            </select>
                            <input type="text" name="photo" placeholder="Photo (URL)" value={formData.photo} onChange={handleChange} required />
                            <input type="text" name="avatar" placeholder="Avatar (URL)" value={formData.avatar} onChange={handleChange} required />
                            <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />

                            {/* Champ de mot de passe avec icône d'affichage/masquage */}
                            <div className="password-container">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="MotDePasse"
                                    placeholder="Mot de passe"
                                    value={formData.MotDePasse}
                                    onChange={handleChange}
                                    required
                                />
                                <FontAwesomeIcon
                                    icon={showPassword ? faEyeSlash : faEye}
                                    className="eye-icon"
                                    onClick={() => setShowPassword(!showPassword)}
                                />
                            </div>

                            {/* Champ de confirmation du mot de passe */}
                            <div className="password-container">
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    placeholder="Confirmer le mot de passe"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                />
                                <FontAwesomeIcon
                                    icon={showConfirmPassword ? faEyeSlash : faEye}
                                    className="eye-icon"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                />
                            </div>

                            {/* Bouton de soumission */}
                            <button type="submit">Créer un compte</button>

                            {/* Lien de connexion */}
                            <p className="login-link">
                                Vous avez déjà un compte ? <a href="/" className="clean-link">Connectez-vous</a>
                            </p>
                        </div>
                    </div>

                    {/* Affichage des erreurs */}
                    {errors.length > 0 && (
                        <ul className="error-message">
                            {errors.map((error, index) => <li key={index}>{error}</li>)}
                        </ul>
                    )}
                </form>
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
                .form-columns {
                    display: flex;
                    flex-direction: column; /* Par défaut, les colonnes sont empilées verticalement */
                    gap: 20px;
                }
                .left-column, .right-column {
                    width: 100%;
                }
                form {
                    display: flex;
                    flex-direction: column;
                }
                input, select {
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
                a {
                    color: #6a11cb;
                    font-weight: 600;
                    text-decoration: none;
                    transition: color 0.3s ease;
                }
                a:hover {
                    color: #2575fc;
                    text-decoration: underline;
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
                        width: 55%;
                    }
                    .form-columns {
                        flex-direction: row; /* Les colonnes sont côte à côte sur les grands écrans */
                        gap: 20px;
                    }
                    .left-column, .right-column {
                        width: 48%;
                    }
                }
            `}</style>
        </div>
    );
};

export default CreateAccount;