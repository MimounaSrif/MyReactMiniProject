import React, { useState } from 'react';
import axios from 'axios';

const LigneUtilisateur = ({ utilisateur, estAdmin }) => {
    const [afficherDetails, setAfficherDetails] = useState(false);
    const [modifierMode, setModifierMode] = useState(false);
    
    // 🔥 Garde l'état local pour voir immédiatement les changements
    const [userData, setUserData] = useState({
        nom: utilisateur.nom,
        prenom: utilisateur.prenom,
        email: utilisateur.email
    });

    const supprimerUtilisateur = async () => {
        try {
            await axios.delete(`https://678177b885151f714b0ae2c7.mockapi.io/myapitest/users/${utilisateur.id}`);
            alert("Utilisateur supprimé !");
        } catch (error) {
            console.error("Erreur lors de la suppression de l'utilisateur :", error);
        }
    };

    const modifierUtilisateur = async () => {
        try {
            const updatedUser = { 
                nom: userData.nom, 
                prenom: userData.prenom, 
                email: userData.email 
            };

            await axios.put(`https://678177b885151f714b0ae2c7.mockapi.io/myapitest/users/${utilisateur.id}`, updatedUser);

            // 🎯 Mise à jour immédiate de l'état local pour afficher les changements
            setUserData(updatedUser);
            setModifierMode(false); // Fermer la modale
        } catch (error) {
            console.error("Erreur lors de la modification de l'utilisateur :", error);
        }
    };

    return (
        <>
            <tr>
                <td>{userData.nom}</td>
                <td>{userData.prenom}</td>
                <td>{userData.email}</td>
                <td style={buttonContainerStyle}>
                    <button onClick={() => setAfficherDetails(true)} style={detailsButtonStyle}>Détails</button>
                    <button onClick={() => setModifierMode(true)} style={editButtonStyle}>Modifier</button>
                    {estAdmin && (
                        <button onClick={supprimerUtilisateur} style={deleteButtonStyle}>Supprimer</button>
                    )}
                </td>
            </tr>

            {/* Popup (modale) pour afficher les détails */}
            {afficherDetails && (
                <div style={modalOverlayStyle}>
                    <div style={modalStyle}>
                        <h2>Détails de l'utilisateur</h2>
                        <div style={userDetailsStyle}>
                            <p><strong>Nom :</strong> {userData.nom}</p>
                            <p><strong>Prénom :</strong> {userData.prenom}</p>
                            <p><strong>Email :</strong> {userData.email}</p>
                        </div>
                        <button onClick={() => setAfficherDetails(false)} style={closeButtonStyle}>Fermer</button>
                    </div>
                </div>
            )}

            {/* Popup (modale) pour modifier l'utilisateur */}
            {modifierMode && (
                <div style={modalOverlayStyle}>
                    <div style={modalStyle}>
                        <h2>Modifier l'utilisateur</h2>
                        <div style={formStyle}>
                            <label>Nom :</label>
                            <input type="text" value={userData.nom} onChange={(e) => setUserData({ ...userData, nom: e.target.value })} />

                            <label>Prénom :</label>
                            <input type="text" value={userData.prenom} onChange={(e) => setUserData({ ...userData, prenom: e.target.value })} />

                            <label>Email :</label>
                            <input type="email" value={userData.email} onChange={(e) => setUserData({ ...userData, email: e.target.value })} />
                        </div>
                        <button onClick={modifierUtilisateur} style={saveButtonStyle}>Enregistrer</button>
                        <button onClick={() => setModifierMode(false)} style={closeButtonStyle}>Annuler</button>
                    </div>
                </div>
            )}
        </>
    );
};

// Styles
const buttonContainerStyle = {
    display: 'flex',
    gap: '10px',
    alignItems: 'center',
};

const deleteButtonStyle = {
    backgroundColor: '#dc3545',
    color: 'white',
    padding: '8px 12px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
};

const editButtonStyle = {
    backgroundColor: '#17a2b8',
    color: 'white',
    padding: '8px 12px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
};

const detailsButtonStyle = {
    backgroundColor: '#17a2b8',
    color: 'white',
    padding: '8px 12px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
};

// Styles pour la popup (modale)
const modalOverlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
};

const modalStyle = {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    textAlign: 'center',
    width: '400px',
};

const userDetailsStyle = {
    textAlign: 'center',
    fontSize: '18px',
    lineHeight: '1.6',
};

const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    alignItems: 'center',
};

const saveButtonStyle = {
    backgroundColor: '#28a745',
    color: 'white',
    padding: '8px 12px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginTop: '10px',
};

const closeButtonStyle = {
    backgroundColor: '#dc3545',
    color: 'white',
    padding: '8px 12px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginTop: '10px',
};

export default LigneUtilisateur;
