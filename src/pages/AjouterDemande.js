import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addRequest } from '../redux/requestsSlice';

const AjouterDemande = () => {
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        titre: '',
        description: '',
        etat: 'En attente',
    });

    const [message, setMessage] = useState('');
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    // 🔄 Détecte automatiquement la taille de l'écran
    React.useEffect(() => {
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
        console.log("Envoi de la demande:", formData);

        if (!user?.id) {
            setMessage("Erreur : L'utilisateur doit être connecté !");
            return;
        }

        try {
            const userResponse = await axios.get(`https://678177b885151f714b0ae2c7.mockapi.io/myapitest/users/${user.id}`);
            let userData = userResponse.data;

            const updatedRequests = {
                ...userData.requests,
                [Date.now()]: formData,
            };

            const updateResponse = await axios.put(
                `https://678177b885151f714b0ae2c7.mockapi.io/myapitest/users/${user.id}`,
                { requests: updatedRequests }
            );

            console.log("Réponse API après ajout de la demande:", updateResponse.data);

            dispatch(addRequest({ id: user.id, requests: updatedRequests }));

            setFormData({ titre: '', description: '', etat: 'En attente' });
            setMessage('Votre demande a été ajoutée avec succès ! ✅');

            setTimeout(() => setMessage(''), 3000);
        } catch (error) {
            console.error("Erreur complète:", error);
            setMessage(`Erreur lors de l'ajout de la demande: ${error.message}`);
        }
    };

    return (
        <div style={isMobile ? mobileContainerStyle : containerStyle}>
            <h2 style={titleStyle}>Ajouter une demande</h2>
            {message && <p style={message.includes('succès') ? successMessageStyle : errorMessageStyle}>{message}</p>}
            <form onSubmit={handleSubmit} style={formStyle}>
                <input
                    type="text"
                    name="titre"
                    value={formData.titre}
                    onChange={handleChange}
                    placeholder="Titre"
                    required
                    style={inputStyle}
                />
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Description"
                    required
                    style={textareaStyle}
                />
                <button type="submit" style={buttonStyle}>
                    Envoyer
                </button>
            </form>
        </div>
    );
};

// 🎨 **Styles adaptés**
const containerStyle = {
    maxWidth: '500px',
    marginLeft: 'auto',
    marginRight: '220px', // Espace à droite pour les grands écrans
    marginTop: '100px',
    padding: '20px',
    borderRadius: '20px',
    backgroundColor: '#ffffff',
    boxShadow: '0px 12px 24px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
};

// 📱 **Styles pour mobile/tablette**
const mobileContainerStyle = {
    width: '90%', // Augmenter la largeur sur mobiles
    maxWidth: '500px', // Limite la largeur
    margin: '50px auto', // Centré verticalement et horizontalement
    padding: '20px',
    borderRadius: '15px',
    backgroundColor: '#ffffff',
    boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
};

const titleStyle = {
    fontSize: '26px',
    marginBottom: '20px',
    color: '#2c3e50',
    fontWeight: '700',
    letterSpacing: '-0.5px',
};

const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
};

const inputStyle = {
    padding: '14px',
    borderRadius: '10px',
    border: '1px solid #e0e0e0',
    fontSize: '16px',
    outline: 'none',
    transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
    backgroundColor: '#f8f9fa',
};

const textareaStyle = {
    ...inputStyle,
    height: '120px',
    resize: 'vertical',
};

const buttonStyle = {
    padding: '14px',
    backgroundColor: '#6c5ce7',
    color: 'white',
    border: 'none',
    borderRadius: '10px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease, transform 0.2s ease',
};

const successMessageStyle = {
    color: '#00b894',
    fontSize: '14px',
    marginBottom: '20px',
    fontWeight: '500',
};

const errorMessageStyle = {
    color: '#d63031',
    fontSize: '14px',
    marginBottom: '20px',
    fontWeight: '500',
};

export default AjouterDemande;
