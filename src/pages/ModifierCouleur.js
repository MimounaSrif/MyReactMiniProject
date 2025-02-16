import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { setUser } from '../redux/store';
import { toast } from "react-hot-toast";

const ModifierCouleur = () => {
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const initialCouleur = user?.couleur || '#007BFF';
    const [nouvelleCouleur, setNouvelleCouleur] = useState(initialCouleur);

    if (!user) {
        return <p className="text-center text-red-500">Veuillez vous connecter pour modifier votre couleur préférée.</p>;
    }

    if (user.admin === false && user.age < 15) {
        return <p className="text-center text-red-500">Vous n'avez pas l'autorisation de modifier votre couleur préférée.</p>;
    }

    const handleValidation = async () => {
        try {
            const updatedUser = { ...user, couleur: nouvelleCouleur };
            dispatch(setUser(updatedUser));

            await axios.put(`https://678177b885151f714b0ae2c7.mockapi.io/myapitest/users/${user.id}`, {
                couleur: nouvelleCouleur,
            });

            toast.success("Couleur préférée mise à jour avec succès !");
        } catch (error) {
            toast.error("Une erreur est survenue lors de la mise à jour de votre couleur.");
        }
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="w-[400px] bg-white shadow-lg p-6 rounded-lg">
                <h2 className="text-xl font-bold text-center mb-4">Modifier ma couleur préférée</h2>
                <div className="text-center mb-4">
                    <p className="mb-2">Couleur actuelle :</p>
                    <div 
                        className="w-24 h-8 rounded-lg border border-black mx-auto" 
                        style={{ backgroundColor: nouvelleCouleur }}
                    />
                </div>
                <div className="flex justify-center mb-4">
                    <input 
                        type="color" 
                        value={nouvelleCouleur} 
                        onChange={(e) => setNouvelleCouleur(e.target.value)} 
                        className="cursor-pointer border border-gray-300 rounded-lg p-2"
                    />
                </div>
                <button 
                    onClick={handleValidation} 
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition-all"
                >
                    Valider
                </button>
            </div>
        </div>
    );
};

export default ModifierCouleur;
