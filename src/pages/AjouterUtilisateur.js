import React, { useState } from 'react';
import axios from 'axios';

const AjouterUtilisateur = ({ rafraichirListe }) => {
    const [formData, setFormData] = useState({
        nom: '',
        prenom: '',
        email: '',
        pays: '',
        age: '',
        MotDePasse: '',
        pseudo: '',
        couleur: 'azure',
        admin: false,
        Devise: 'MAD',
        avatar: 'https://via.placeholder.com/150',
        photo: 'https://via.placeholder.com/640x480',
    });

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
                rafraichirListe(response.data);
                setTimeout(() => {
                    setFormData({
                        nom: '', prenom: '', email: '', pays: '', age: '', MotDePasse: '', pseudo: '', couleur: 'azure', admin: false, Devise: 'MAD', avatar: 'https://via.placeholder.com/150', photo: 'https://via.placeholder.com/640x480',
                    });
                }, 100);
            }
        } catch (error) {
            console.error('Erreur complète:', error);
        }
    };

    return (
        <div style={containerStyle}>
            <h2 style={titleStyle}>Ajouter un utilisateur</h2>
            <form onSubmit={handleSubmit} style={formStyle}>
                <div style={formRowStyle}>
                    <div style={formColumnStyle}>
                        <input type="text" name="nom" value={formData.nom} onChange={handleChange} placeholder="Nom" required style={inputStyle} />
                        <input type="text" name="prenom" value={formData.prenom} onChange={handleChange} placeholder="Prénom" required style={inputStyle} />
                        <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required style={inputStyle} />
                        <input type="text" name="pays" value={formData.pays} onChange={handleChange} placeholder="Pays" required style={inputStyle} />
                    </div>
                    <div style={formColumnStyle}>
                        <input type="number" name="age" value={formData.age} onChange={handleChange} placeholder="Âge" required style={inputStyle} />
                        <input type="password" name="MotDePasse" value={formData.MotDePasse} onChange={handleChange} placeholder="Mot de passe" required style={inputStyle} />
                        <input type="text" name="pseudo" value={formData.pseudo} onChange={handleChange} placeholder="Pseudo" required style={inputStyle} />
                        <button type="submit" style={buttonStyle}>Ajouter</button>
                    </div>
                </div>
            </form>
        </div>
    );
};

const containerStyle = {
    maxWidth: '420px',
    height: 'auto',
    margin: 'auto',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    padding: '25px',
    borderRadius: '15px',
    backgroundColor: '#ffffff',
    boxShadow: '0px 8px 12px rgba(0, 0, 0, 0.15)',
    textAlign: 'center',
};

const titleStyle = {
    fontSize: '24px',
    marginBottom: '18px',
    color: '#333',
    fontWeight: 'bold',
};

const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
};

const formRowStyle = {
    display: 'flex',
    justifyContent: 'space-between',
};

const formColumnStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    width: '48%',
};

const inputStyle = {
    padding: '12px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    fontSize: '15px',
    backgroundColor: '#f9f9f9',
};

const buttonStyle = {
    padding: '12px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease-in-out',
};

export default AjouterUtilisateur;
