import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import LigneUtilisateur from './LigneUtilisateur';

const ListeUtilisateurs = () => {
    const user = useSelector((state) => state.user);
    const [utilisateurs, setUtilisateurs] = useState([]);
    const [message, setMessage] = useState('');
    const [page, setPage] = useState(1);
    const [itemsPerPage] = useState(8);

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
        return <p>Veuillez vous connecter pour voir la liste des utilisateurs.</p>;
    }

    const handleDelete = async (id) => {
        try {
            await axios.delete(`https://678177b885151f714b0ae2c7.mockapi.io/myapitest/users/${id}`);
            setUtilisateurs((prev) => prev.filter((u) => u.id !== id));
        } catch (error) {
            setMessage(`Erreur lors de la suppression de l'utilisateur.`);
        }
    };

    const indexOfLastUser = page * itemsPerPage;
    const indexOfFirstUser = indexOfLastUser - itemsPerPage;
    const currentUsers = utilisateurs.slice(indexOfFirstUser, indexOfLastUser);
    const totalPages = Math.ceil(utilisateurs.length / itemsPerPage);

    const paginate = (pageNumber) => setPage(pageNumber);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginLeft: '175px' }}>
            <h2 style={{ fontSize: '24px', color: '#333', marginBottom: '20px' }}>Liste des Utilisateurs</h2>
            {message && <p style={{ color: 'red' }}>{message}</p>}

            <table 
                style={{
                    width: '80%', 
                    backgroundColor: '#fff', 
                    borderCollapse: 'collapse', 
                    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                    borderRadius: '8px',
                    overflow: 'hidden'
                }}
            >
                <thead>
                    <tr style={{ backgroundColor: '#007bff', color: 'white', textAlign: 'left' }}>
                        <th style={{ padding: '12px' }}>Nom</th>
                        <th style={{ padding: '12px' }}>Prénom</th>
                        <th style={{ padding: '12px' }}>Email</th>
                        <th style={{ padding: '12px', width: '100px' }}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {currentUsers.map((utilisateur) => (
                        <LigneUtilisateur
                            key={utilisateur.id}
                            utilisateur={utilisateur}
                            estAdmin={user?.admin ?? false}
                            supprimerUtilisateur={() => handleDelete(utilisateur.id)}
                        />
                    ))}
                </tbody>
            </table>

            <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
                <button 
                    onClick={() => paginate(page - 1)} 
                    disabled={page === 1} 
                    style={{
                        padding: '10px 16px',
                        cursor: 'pointer',
                        border: 'none',
                        backgroundColor: page === 1 ? '#ccc' : '#007bff',
                        color: 'white',
                        borderRadius: '5px',
                        transition: '0.3s',
                    }}
                >
                    Précédent
                </button>
                <button 
                    onClick={() => paginate(page + 1)} 
                    disabled={page === totalPages} 
                    style={{
                        padding: '10px 16px',
                        cursor: 'pointer',
                        border: 'none',
                        backgroundColor: page === totalPages ? '#ccc' : '#007bff',
                        color: 'white',
                        borderRadius: '5px',
                        transition: '0.3s',
                    }}
                >
                    Suivant
                </button>
            </div>
        </div>
    );
};

export default ListeUtilisateurs;
