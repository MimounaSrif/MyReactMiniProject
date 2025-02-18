import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { setRequests, updateRequest } from '../redux/requestsSlice';

const ListeDemandes = () => {
    const user = useSelector((state) => state.user);
    const demandes = useSelector((state) => state.requests.demandes);
    const dispatch = useDispatch();
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    // ✅ Détecte la taille de l'écran pour activer le mode mobile
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        const fetchDemandes = async () => {
            try {
                const response = await axios.get('https://678177b885151f714b0ae2c7.mockapi.io/myapitest/users');

                let allDemandes = [];
                if (user.admin) {
                    response.data.forEach(utilisateur => {
                        if (utilisateur.requests) {
                            Object.entries(utilisateur.requests).forEach(([key, demande]) => {
                                allDemandes.push({ id: key, ...demande, utilisateurId: utilisateur.id });
                            });
                        }
                    });
                } else {
                    const utilisateurActuel = response.data.find(u => u.id === user.id);
                    if (utilisateurActuel && utilisateurActuel.requests) {
                        allDemandes = Object.entries(utilisateurActuel.requests).map(([key, demande]) => ({
                            id: key,
                            ...demande,
                            utilisateurId: user.id
                        }));
                    }
                }
                dispatch(setRequests(allDemandes));
            } catch (error) {
                console.error('Erreur lors du chargement des demandes:', error);
            }
        };
        fetchDemandes();
    }, [dispatch, user]);

    return (
        <div style={isMobile ? mobileContainerStyle : containerStyle}>
            <h2 style={titleStyle}>{user.admin ? "Toutes les Demandes" : "Mes Demandes"}</h2>
            <div style={tableContainerStyle}>
                <table style={isMobile ? mobileTableStyle : tableStyle}>
                    <thead>
                        <tr>
                            <th style={tableHeaderStyle}>Titre</th>
                            <th style={tableHeaderStyle}>Description</th>
                            <th style={tableHeaderStyle}>État</th>
                            <th style={tableHeaderStyle}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {demandes.map(demande => (
                            <tr key={demande.id}>
                                <td style={tableCellStyle}>{demande.titre}</td>
                                <td style={tableDescriptionStyle}>{demande.description}</td>
                                <td style={tableCellStyle}>{demande.etat}</td>
                                <td style={isMobile ? buttonContainerMobile : buttonContainerDesktop}>
                                    <button onClick={() => updateRequest(demande.id, 'Approuvée', demande.utilisateurId)} style={isMobile ? buttonApproveStyleMobile : buttonApproveStyle}>Approuver</button>
                                    <button onClick={() => updateRequest(demande.id, 'Rejetée', demande.utilisateurId)} style={isMobile ? buttonRejectStyleMobile : buttonRejectStyle}>Rejeter</button>
                                </td>
                            </tr>
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

// 📱 **Styles mobiles améliorés**
const mobileContainerStyle = {
    width: '97%', // 🔥 Un peu plus large pour plus d’espace
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
    overflow: 'hidden',
};

const titleStyle = {
    fontSize: '22px',
    color: '#333',
    textAlign: 'center',
    marginBottom: '20px',
};

const tableContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
};

const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '20px',
    textAlign: 'center',
};

// 📱 **Tableau pour mobile avec espace ajusté**
const mobileTableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
    textAlign: 'center',
    tableLayout: 'fixed', // 🔥 Gagne de l’espace
    wordWrap: 'break-word',
};

// ✅ **Ajout d'un style spécifique pour la description**
const tableDescriptionStyle = {
    padding: '8px',
    textAlign: 'left',
    wordWrap: 'break-word',
    maxWidth: '200px', // 🔥 Permet d'afficher plus de texte
};

const tableHeaderStyle = {
    backgroundColor: '#007bff',
    color: 'white',
    padding: '12px',
};

const tableCellStyle = {
    padding: '10px',
    borderBottom: '1px solid #ddd',
};

// ✅ **Boutons en ligne sur PC**
const buttonContainerDesktop = {
    display: 'flex',
    flexDirection: 'row',
    gap: '10px',
    justifyContent: 'center',
};

// 📱 **Boutons superposés en mode mobile**
const buttonContainerMobile = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '4px',
};

// ✅ **Boutons plus petits sur mobile**
const buttonApproveStyle = {
    padding: '6px',
    backgroundColor: 'green',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '12px',
    width: '100%',
};

// 📱 **Version réduite des boutons sur mobile**
const buttonApproveStyleMobile = {
    ...buttonApproveStyle,
    padding: '4px',
    fontSize: '10px',
};

const buttonRejectStyle = {
    padding: '6px',
    backgroundColor: 'red',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '12px',
    width: '100%',
};

const buttonRejectStyleMobile = {
    ...buttonRejectStyle,
    padding: '4px',
    fontSize: '10px',
};

export default ListeDemandes;
