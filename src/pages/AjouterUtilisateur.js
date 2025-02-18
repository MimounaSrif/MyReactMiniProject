import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AjouterUtilisateur = ({ rafraichirListe }) => {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    const [formData, setFormData] = useState({
        nom: '',
        prenom: '',
        email: '',
        pays: 'Morocco',
        age: '',
        MotDePasse: '',
        pseudo: '',
        couleur: 'Pink',
        admin: false,
        Devise: 'MAD',
        avatar: '',
        photo: '',
    });
    const [showConfirmation, setShowConfirmation] = useState(false); // État pour afficher la confirmation

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                'https://678177b885151f714b0ae2c7.mockapi.io/myapitest/users',
                formData,
                { headers: { 'Content-Type': 'application/json' } }
            );
    
            if (response.status === 201 || response.status === 200) {
                // Afficher le message de confirmation
                setShowConfirmation(true);
    
                // Rafraîchir la liste des utilisateurs
                rafraichirListe(response.data);
    
                // Vider les champs du formulaire IMMÉDIATEMENT
                setFormData({
                    nom: '',
                    prenom: '',
                    email: '',
                    pays: 'Morocco',
                    age: '',
                    MotDePasse: '',
                    pseudo: '',
                    couleur: 'Pink',
                    admin: false,
                    Devise: 'MAD',
                    avatar: '',
                    photo: '',
                });
    
                // Masquer le message de confirmation après 3 secondes
                setTimeout(() => {
                    setShowConfirmation(false);
                }, 3000);
            }
        } catch (error) {
            console.error('Erreur complète:', error);
        }
    };

    return (
        <div style={isMobile ? mobileContainerStyle : containerStyle}>
            <h2 style={titleStyle}>Ajouter un utilisateur</h2>
            {showConfirmation && (
                <div style={confirmationStyle}>
                    Utilisateur ajouté avec succès !
                </div>
            )}
            <form onSubmit={handleSubmit} style={formStyle}>
                <div style={isMobile ? fullWidthInputGroupStyle : formRowStyle}>
                    <div style={inputGroupStyle}>
                        <input type="text" name="nom" value={formData.nom} onChange={handleChange} placeholder="Nom" required style={isMobile ? mobileInputStyle : inputStyle} />
                        <input type="text" name="prenom" value={formData.prenom} onChange={handleChange} placeholder="Prénom" required style={isMobile ? mobileInputStyle : inputStyle} />
                        <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required style={isMobile ? mobileInputStyle : inputStyle} />
                        <select name="pays" value={formData.pays} onChange={handleChange} required style={isMobile ? mobileInputStyle : inputStyle}>
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
                        <input type="text" name="pseudo" value={formData.pseudo} onChange={handleChange} placeholder="Pseudo" required style={isMobile ? mobileInputStyle : inputStyle} />
                    </div>
                    <div style={inputGroupStyle}>
                        <input type="number" name="age" value={formData.age} onChange={handleChange} placeholder="Âge" required style={isMobile ? mobileInputStyle : inputStyle} />
                        <input type="password" name="MotDePasse" value={formData.MotDePasse} onChange={handleChange} placeholder="Mot de passe" required style={isMobile ? mobileInputStyle : inputStyle} />
                        <select name="couleur" value={formData.couleur} onChange={handleChange} required style={isMobile ? mobileInputStyle : inputStyle}>
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
                        <select name="Devise" value={formData.Devise} onChange={handleChange} required style={isMobile ? mobileInputStyle : inputStyle}>
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
                        <label>
                            <input type="checkbox" name="admin" checked={formData.admin} onChange={(e) => setFormData({ ...formData, admin: e.target.checked })} />
                            Administrateur ?
                        </label>
                    </div>
                </div>
                <button type="submit" style={buttonStyle}>Ajouter</button>
            </form>
        </div>
    );
};

// **Styles**
const containerStyle = {
    maxWidth: '500px',
    margin: 'auto',
    padding: '25px',
    borderRadius: '15px',
    backgroundColor: '#ffffff',
    boxShadow: '0px 8px 12px rgba(0, 0, 0, 0.15)',
    textAlign: 'center',
};

const mobileContainerStyle = {
    width: '90%',
    height: 'auto',
    margin: 'auto',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    textAlign: 'center',
};

const titleStyle = {
    fontSize: '24px',
    color: '#333',
    marginBottom: '15px',
};

const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    width: '100%',
};

const formRowStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
};

const fullWidthInputGroupStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    width: '100%',
};

const inputGroupStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    width: '48%',
};

const inputStyle = {
    padding: '10px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    fontSize: '14px',
    width: '100%',
};

const mobileInputStyle = {
    ...inputStyle,
    marginLeft: '105px',
    width: '80%',
};

const buttonStyle = {
    padding: '10px',
    width: '100%',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '14px',
    cursor: 'pointer',
};

const confirmationStyle = {
    padding: '10px',
    backgroundColor: '#4CAF50',
    color: 'white',
    borderRadius: '5px',
    marginBottom: '15px',
    textAlign: 'center',
};

export default AjouterUtilisateur;