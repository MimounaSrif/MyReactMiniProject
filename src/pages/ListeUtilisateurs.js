import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import LigneUtilisateur from './LigneUtilisateur';

const ListeUtilisateurs = () => {
    const user = useSelector((state) => state.user);
    const [utilisateurs, setUtilisateurs] = useState([]);
    const [message, setMessage] = useState('');
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    // ✅ Détecte automatiquement la taille de l'écran pour appliquer le style mobile
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('https://678177b885151f714b0ae2c7.mockapi.io/myapitest/users');
                setUtilisateurs(response.data);
            } catch (error) {
                setMessage('Erreur lors du chargement des utilisateurs.');
            }
        };
        fetchUsers();
    }, []);

    if (!user) {
        return <p style={errorMessageStyle}>Veuillez vous connecter pour voir la liste des utilisateurs.</p>;
    }

    const handleDelete = async (id) => {
        try {
            await axios.delete(`https://678177b885151f714b0ae2c7.mockapi.io/myapitest/users/${id}`);
            setUtilisateurs((prev) => prev.filter((u) => u.id !== id));
        } catch (error) {
            setMessage(`Erreur lors de la suppression de l'utilisateur.`);
        }
    };

    return (
        <div style={isMobile ? mobileContainerStyle : containerStyle}>
            <h2 style={titleStyle}>Liste des Utilisateurs</h2>
            {message && <p style={errorMessageStyle}>{message}</p>}

            <div style={{ width: '100%' }}>
                <table style={isMobile ? mobileTableStyle : tableStyle}>
                    <thead>
                        <tr style={headerRowStyle}>
                            <th style={{ ...tableHeaderCellStyle, width: '50px' }}>Nom</th>
                            <th style={{ ...tableHeaderCellStyle, width: '50px' }}>Prénom</th>
                            <th style={tableHeaderCellStyle}>Email</th>
                            <th style={{ ...tableHeaderCellStyle, width: '60px' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {utilisateurs.map((utilisateur) => (
                            <LigneUtilisateur
                                key={utilisateur.id}
                                utilisateur={utilisateur}
                                estAdmin={user?.admin ?? false}
                                supprimerUtilisateur={() => handleDelete(utilisateur.id)}
                                isMobile={isMobile} // 👈 Envoie l'état mobile pour activer directement la superposition des boutons
                            />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

// ✅ **Styles**
const containerStyle = {
    width: '80%',
    margin: 'auto',
    padding: '20px',
    background: '#ffffff',
    borderRadius: '10px',
    boxShadow: '0px 8px 12px rgba(0, 0, 0, 0.15)',
    textAlign: 'center',
    minHeight: '100vh',
    marginLeft: '190px',
    transition: 'all 0.3s ease',
};

// 📱 **Styles mobiles**
const mobileContainerStyle = {
    width: '100%', // 🟢 Utilise tout l’espace disponible
    height: '90vh',
    margin: 'auto',
    padding: '15px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    background: '#ffffff',
    borderRadius: '10px',
    boxShadow: '0px 8px 12px rgba(0, 0, 0, 0.15)',
    textAlign: 'center',
    overflow: 'hidden', // 🔥 Empêche tout débordement horizontal
};

const titleStyle = {
    fontSize: '24px',
    color: '#333',
    textAlign: 'center',
    marginBottom: '20px',
};

const tableStyle = {
    width: '100%',
    backgroundColor: '#fff',
    borderCollapse: 'collapse',
    borderRadius: '10px',
    textAlign: 'center',
};

const mobileTableStyle = {
    width: '100%', // 🟢 Utilise toute la largeur sans dépassement
    backgroundColor: '#fff',
    borderCollapse: 'collapse',
    borderRadius: '10px',
    textAlign: 'center',
    tableLayout: 'fixed', // 🔥 Évite tout débordement du tableau
    wordWrap: 'break-word', // 🔥 Coupe les textes longs automatiquement
};

const headerRowStyle = {
    backgroundColor: '#007bff',
    color: 'white',
};

const tableHeaderCellStyle = {
    padding: '14px',
    wordBreak: 'break-word', // 🔥 Empêche les colonnes de dépasser l’écran
};

// Gestion des erreurs
const errorMessageStyle = {
    color: 'red',
};

export default ListeUtilisateurs;
