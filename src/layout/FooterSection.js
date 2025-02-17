import React from 'react';

const FooterSection = () => {
    return (
        <footer style={footerContainerStyle}>
            <div style={footerUserInfoStyle}>
                <p>Adresse : Ista HAY SALAM, Salé, Maroc</p>
            </div>
            <div style={footerButtonContainerStyle}>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" style={footerLinkStyle}>Facebook</a>
                <span style={separatorStyle}> | </span>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" style={footerLinkStyle}>Instagram</a>
                <span style={separatorStyle}> | </span>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" style={footerLinkStyle}>Twitter</a>
            </div>
        </footer>
    );
};

// Styles du footer
const footerContainerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    height: '60px',
    padding: '0 20px',
    backgroundColor: '#f5f5f5',
    color: '#000000',
    position: 'fixed',
    bottom: 0,
    left: 0,
    zIndex: 1000,
};

const footerUserInfoStyle = {
    flex: 1,
    textAlign: 'left',
    fontSize: '14px',
};

const footerButtonContainerStyle = {
    flex: 1,
    textAlign: 'right',
    paddingRight: '20px',
};

const footerLinkStyle = {
    color: '#000000',
    textDecoration: 'none',
    fontSize: '14px',
    padding: '0 10px',
    transition: 'color 0.3s ease',
};

const separatorStyle = {
    color: '#000000',
    padding: '0 5px',
};

// Media Queries pour les petits écrans
const mediaQueries = `
    @media (max-width: 768px) {
        .footerContainerStyle {
            flexDirection: column; /* Empiler les éléments verticalement */
            height: auto; /* Hauteur automatique */
            padding: '10px 20px'; /* Réduire le padding */
        }
        .footerUserInfoStyle, .footerButtonContainerStyle {
            textAlign: center; /* Centrer le texte */
            marginBottom: 10px; /* Espace entre les éléments */
        }
        .footerButtonContainerStyle {
            paddingRight: 0; /* Supprimer le padding à droite */
        }
    }
`;

export default FooterSection;