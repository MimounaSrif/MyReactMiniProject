import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { setRequests, updateRequest, deleteRequest } from '../redux/requestsSlice';

const ListeDemandes = () => {
    const user = useSelector((state) => state.user);
    const demandes = useSelector((state) => state.requests.demandes);
    const dispatch = useDispatch();
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    // ✅ Détecte la taille de l'écran
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
                                    {user.admin ? (
                                        <>
                                            <button style={buttonApproveStyle}>Approuver</button>
                                            <button style={buttonRejectStyle}>Rejeter</button>
                                        </>
                                    ) : (
                                        <>
                                            <button 
                                                style={demande.etat === 'En attente' ? buttonCancelStyle : buttonCancelDisabledStyle} 
                                                disabled={demande.etat !== 'En attente'}
                                            >
                                                Annuler
                                            </button>
                                            <button 
                                                style={demande.etat === 'Rejetée' ? buttonDeleteStyle : buttonDeleteDisabledStyle} 
                                                disabled={demande.etat !== 'Rejetée'}
                                            >
                                                Supprimer
                                            </button>
                                        </>
                                    )}
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
    width: '75%',
    marginLeft: '250px', // 🔥 Augmenté le décalage vers la gauche
    padding: '20px',
    background: '#ffffff',
    borderRadius: '10px',
    boxShadow: '0px 8px 12px rgba(0, 0, 0, 0.15)',
    textAlign: 'center',
    minHeight: '100vh',
    transition: 'all 0.3s ease',
};

// 📱 **Styles mobiles**
const mobileContainerStyle = {
    width: '95%',
    height: 'auto',
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

const mobileTableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
    textAlign: 'center',
    tableLayout: 'fixed',
    wordWrap: 'break-word',
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

const tableDescriptionStyle = {
    padding: '8px',
    textAlign: 'left',
    wordWrap: 'break-word',
    maxWidth: '200px',
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

// ✅ **Styles des boutons**
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

const buttonCancelStyle = {
    padding: '6px',
    backgroundColor: 'gray',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '12px',
    width: '100%',
};

const buttonCancelDisabledStyle = {
    ...buttonCancelStyle,
    backgroundColor: '#ccc',
    cursor: 'not-allowed',
};

const buttonDeleteStyle = {
    padding: '6px',
    backgroundColor: 'darkred',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '12px',
    width: '100%',
};

const buttonDeleteDisabledStyle = {
    ...buttonDeleteStyle,
    backgroundColor: '#ccc',
    cursor: 'not-allowed',
};

export default ListeDemandes;
