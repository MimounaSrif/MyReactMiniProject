import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearUser } from '../redux/store';

const HeaderSection = () => {
    const user = useSelector((state) => state.user);
    const couleurPreferee = useSelector((state) => state.user?.couleur) || '#000000'; // Couleur noire par défaut
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(clearUser());
        navigate('/');
    };

    return (
        <header style={headerContainerStyle}>
            <div style={logoStyle}>
                <img 
                    src={user?.avatar || 'https://via.placeholder.com/50'} 
                    alt="Avatar utilisateur" 
                    style={logoImageStyle} 
                />
            </div>
            {user && (
                <div style={userInfoStyle}>
                    <p>Connecté en tant que : {user.prenom} {user.nom}</p>
                </div>
            )}
            <div style={buttonContainerStyle}>
                <button onClick={handleLogout} style={{ ...logoutButtonStyle, backgroundColor: couleurPreferee }}>
                    Se déconnecter
                </button>
            </div>
        </header>
    );
};

// Styles CSS
const headerContainerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    height: '80px',
    padding: '0 20px',
    backgroundColor: '#f5f5f5',
    color: '#000000',
    position: 'fixed',
    top: 0,
    left: 0,
    zIndex: 1000,
};

const logoStyle = {
    flex: 1,
};

const logoImageStyle = {
    height: '50px',
    borderRadius: '50%', // Rend l'avatar rond
    objectFit: 'cover', // Ajuste bien l'image
};

const userInfoStyle = {
    flex: 2,
    textAlign: 'center',
    fontSize: '18px',
};

const buttonContainerStyle = {
    flex: 1,
    textAlign: 'right',
    paddingRight: '30px',
};

const logoutButtonStyle = {
    color: '#ffffff',
    border: 'none',
    borderRadius: '5px',
    padding: '10px 15px',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'background-color 0.3s ease',
};

// Media Queries pour les petits écrans
const mediaQueries = `
    @media (max-width: 768px) {
        .headerContainerStyle {
            flexDirection: column; /* Empiler les éléments verticalement */
            height: auto; /* Hauteur automatique */
            padding: '10px 20px'; /* Réduire le padding */
        }
        .logoStyle, .userInfoStyle, .buttonContainerStyle {
            textAlign: center; /* Centrer le texte */
            marginBottom: 10px; /* Espace entre les éléments */
        }
        .buttonContainerStyle {
            paddingRight: 0; /* Supprimer le padding à droite */
        }
    }
`;

export default HeaderSection;