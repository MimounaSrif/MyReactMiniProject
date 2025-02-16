import React, { useEffect } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { setRequests, updateRequest, deleteRequest } from '../redux/requestsSlice';

const ListeDemandes = () => {
    const user = useSelector((state) => state.user);
    const demandes = useSelector((state) => state.requests.demandes);
    const dispatch = useDispatch();

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

    const handleStatutChange = async (id, newStatus, utilisateurId) => {
        try {
            const userResponse = await axios.get(`https://678177b885151f714b0ae2c7.mockapi.io/myapitest/users/${utilisateurId}`);
            let userData = userResponse.data;

            if (userData.requests && userData.requests[id]) {
                userData.requests[id].etat = newStatus;
            }

            await axios.put(`https://678177b885151f714b0ae2c7.mockapi.io/myapitest/users/${utilisateurId}`, {
                requests: userData.requests
            });

            dispatch(updateRequest({ id, etat: newStatus }));
        } catch (error) {
            console.error('Erreur lors de la mise à jour de la demande:', error);
        }
    };

    const handleCancelRequest = async (id, utilisateurId, etat) => {
        if (etat !== 'En attente') return;

        try {
            const userResponse = await axios.get(`https://678177b885151f714b0ae2c7.mockapi.io/myapitest/users/${utilisateurId}`);
            let userData = userResponse.data;

            if (userData.requests && userData.requests[id]) {
                delete userData.requests[id];
            }

            await axios.put(`https://678177b885151f714b0ae2c7.mockapi.io/myapitest/users/${utilisateurId}`, {
                requests: userData.requests
            });

            dispatch(deleteRequest(id));
        } catch (error) {
            console.error(`Erreur lors de l'annulation de la demande:`, error);
        }
    };

    const handleDeleteRequest = async (id, utilisateurId, etat) => {
        if (etat !== 'Rejetée') return;

        try {
            const userResponse = await axios.get(`https://678177b885151f714b0ae2c7.mockapi.io/myapitest/users/${utilisateurId}`);
            let userData = userResponse.data;

            if (userData.requests && userData.requests[id]) {
                delete userData.requests[id];
            }

            await axios.put(`https://678177b885151f714b0ae2c7.mockapi.io/myapitest/users/${utilisateurId}`, {
                requests: userData.requests
            });

            dispatch(deleteRequest(id));
        } catch (error) {
            console.error(`Erreur lors de la suppression de la demande:`, error);
        }
    };

    return (
        <div style={containerStyle}>
            <h2 style={titleStyle}>{user.admin ? "Toutes les Demandes" : "Mes Demandes"}</h2>
            <div style={tableContainerStyle}>
                <table style={tableStyle}>
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
                                <td style={tableCellStyle}>{demande.description}</td>
                                <td style={tableCellStyle}>{demande.etat}</td>
                                <td style={tableCellStyle}>
                                    {user.admin ? (
                                        <>
                                            <button onClick={() => handleStatutChange(demande.id, 'Approuvée', demande.utilisateurId)} style={buttonApproveStyle}>Approuver</button>
                                            <button onClick={() => handleStatutChange(demande.id, 'Rejetée', demande.utilisateurId)} style={buttonRejectStyle}>Rejeter</button>
                                        </>
                                    ) : (
                                        <>
                                            <button 
                                                onClick={() => handleCancelRequest(demande.id, demande.utilisateurId, demande.etat)} 
                                                style={demande.etat === 'En attente' ? buttonCancelStyle : buttonCancelDisabledStyle} 
                                                disabled={demande.etat !== 'En attente'}
                                            >
                                                Annuler
                                            </button>
                                            <button 
                                                onClick={() => handleDeleteRequest(demande.id, demande.utilisateurId, demande.etat)} 
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
    width: '80%',
    margin: 'auto',
    padding: '20px',
    background: '#ffffff',
    borderRadius: '10px',
    boxShadow: '0px 8px 12px rgba(0, 0, 0, 0.15)',
    textAlign: 'center',
    minHeight: '100vh',
    marginLeft:'190px',
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

const tableHeaderStyle = {
    backgroundColor: '#007bff',
    color: 'white',
    padding: '12px',
};

const tableCellStyle = {
    padding: '10px',
    borderBottom: '1px solid #ddd',
};

const buttonApproveStyle = {
    padding: '8px',
    backgroundColor: 'green',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
};

const buttonRejectStyle = {
    padding: '8px',
    backgroundColor: 'red',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
};

const buttonCancelStyle = {
    padding: '8px',
    backgroundColor: 'gray',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
};

const buttonCancelDisabledStyle = {
    ...buttonCancelStyle,
    backgroundColor: '#ccc',
    cursor: 'not-allowed',
};

const buttonDeleteStyle = {
    ...buttonCancelStyle,
    backgroundColor: 'darkred',
};

const buttonDeleteDisabledStyle = {
    ...buttonCancelDisabledStyle,
};

export default ListeDemandes;
