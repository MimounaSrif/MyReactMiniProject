import React from 'react';
import { useSelector } from 'react-redux';

const Accueil = () => {
    const user = useSelector((state) => state.user);

    return (
        <div style={containerStyle}>
            <div style={cardStyle}>
                <h1>Bienvenue </h1>
                <img src={user.avatar} alt="Avatar" style={avatarStyle} />
                <h1><span style={userNameStyle}>{user.prenom} {user.nom}</span></h1>
                <p>Nous sommes ravis de vous voir.</p>
            </div>
        </div>
    );
};

// 🎨 Styles

const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '15px',
    marginLeft: '140px',
};

const cardStyle = {
    backgroundColor: 'white',
    padding: '30px',
    borderRadius: '10px',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    maxWidth: '400px',
};

const userNameStyle = {
    fontWeight: 'bold',
    fontSize: '24px',
    color: '#007bff',
};

const avatarStyle = {
    width: '150px',
    height: '150px',
    borderRadius: '50%',
    marginBottom: '20px',
};

export default Accueil;
