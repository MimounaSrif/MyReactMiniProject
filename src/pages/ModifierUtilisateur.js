import React, { useState } from 'react';
import axios from 'axios';

const ModifierUtilisateur = ({ utilisateur, fermerFormulaire, rafraichirListe }) => {
    const [formData, setFormData] = useState(utilisateur);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`https://678177b885151f714b0ae2c7.mockapi.io/myapitest/users/${formData.id}`, formData);
            rafraichirListe();
            fermerFormulaire();
        } catch (error) {
            console.error("Erreur lors de la mise à jour de l'utilisateur :", error);
        }
    };

    return (
        <tr>
            <td colSpan="5">
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="nom"
                        value={formData.nom}
                        onChange={handleChange}
                        placeholder="Nom"
                        required
                    />
                    <input
                        type="text"
                        name="prenom"
                        value={formData.prenom}
                        onChange={handleChange}
                        placeholder="Prénom"
                        required
                    />
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Email"
                        required
                    />
                    <button type="submit">Sauvegarder</button>
                    <button type="button" onClick={fermerFormulaire}>Annuler</button>
                </form>
            </td>
        </tr>
    );
};

export default ModifierUtilisateur;
