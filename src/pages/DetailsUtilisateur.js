import React from 'react';

const DetailsUtilisateur = ({ utilisateur }) => {
    return (
        <tr>
            <td colSpan="5">
                <div>
                    <p><strong>Nom:</strong> {utilisateur.nom}</p>
                    <p><strong>Prénom:</strong> {utilisateur.prenom}</p>
                    <p><strong>Email:</strong> {utilisateur.email}</p>
                </div>
            </td>
        </tr>
    );
};

export default DetailsUtilisateur;
