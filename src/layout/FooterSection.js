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
    backgroundColor: '#f5f5f5', // Même couleur que le header
    color: '#000000', // Texte en noir
    position: 'fixed',
    bottom: 0,
    left: 0,
    zIndex: 1000,
};

const footerUserInfoStyle = {
    flex: 1, // Espace pour l'adresse à gauche
    textAlign: 'left', // Aligne l'adresse à gauche
    fontSize: '14px',
};

const footerButtonContainerStyle = {
    flex: 1, // Espace pour les liens sociaux à droite
    textAlign: 'right', // Aligne les liens à droite
    paddingRight: '20px', 
};

const footerLinkStyle = {
    color: '#000000', // Texte en noir
    textDecoration: 'none',
    fontSize: '14px',
    padding: '10px',
    transition: 'color 0.3s ease',
};

const separatorStyle = {
    color: '#000000', // Texte en noir
    padding: '0 5px',
};

export default FooterSection;
