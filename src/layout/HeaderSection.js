import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearUser } from '../redux/store';

const HeaderSection = () => {
    const user = useSelector((state) => state.user);
    const couleurPreferee = useSelector((state) => state.user?.couleur) || '#000000';
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
                    src={user?.avatar || 'https://via.placeholder.com/60'} 
                    alt="Avatar utilisateur" 
                    style={logoImageStyle} 
                />
            </div>
            {user && (
                <div style={userInfoStyle}>
                    <p>Connecté en tant que: <strong>{user.prenom} {user.nom}</strong></p>
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
    zIndex: 1001,
};

const logoStyle = {
    flex: 1,
};

const logoImageStyle = {
    height: '60px',
    width: '60px',
    borderRadius: '50%',
    objectFit: 'cover',
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
    padding: '8px 12px',
    cursor: 'pointer',
    fontSize: '14px',
    transition: 'background-color 0.3s ease',
};

export default HeaderSection;
