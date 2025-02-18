import React from 'react';
import { useSelector } from 'react-redux';

const Accueil = () => {
    const user = useSelector((state) => state.user);

    return (
        <div style={containerStyle}>
            <div style={cardStyle}>
                <h1>Bienvenue</h1>
                <img src={user.avatar} alt="Avatar" style={avatarStyle} />
                <h1><span style={userNameStyle}>{user.prenom} {user.nom}</span></h1>
                <p>Nous sommes ravis de vous voir.</p>
            </div>
        </div>
    );
};

// 🎨 **Styles**
const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
    minHeight: '100vh',
    maxWidth: '1200px',
    overflowX: 'hidden', // 🚫 Cache toute barre de défilement horizontale
    boxSizing: 'border-box',
};

const cardStyle = {
    backgroundColor: 'white',
    padding: '30px',
    borderRadius: '10px',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    maxWidth: '400px',
    width: '100%',
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

// 📱 **Media Queries pour un design responsive**
const mediaStyles = `
    @media (max-width: 768px) {
        body, html {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
            overflow-x: hidden;
        }

        .cardStyle {
            max-width: 90%;
            padding: 20px;
        }

        .avatarStyle {
            width: 120px;
            height: 120px;
        }
    }
`;

export default Accueil;
