import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const NavigationBar = () => {
    const user = useSelector((state) => state.user);
    const couleurPreferee = user?.couleur || '#000000';

    return (
        <nav style={navBarStyle}>
            <ul style={navListStyle}>
                <li style={navItemStyle}><Link to="/Accueil" style={{ ...linkStyle, backgroundColor: couleurPreferee }}>Accueil</Link></li>
                <li style={navItemStyle}><Link to="/Accueil/profile" style={{ ...linkStyle, backgroundColor: couleurPreferee }}>Mon Profil</Link></li>
                <li style={navItemStyle}><Link to="/Accueil/color" style={{ ...linkStyle, backgroundColor: couleurPreferee }}>Modifier Couleur</Link></li>

                {!user?.admin && (
                    <>
                        <li style={navItemStyle}><Link to="/Accueil/add-request" style={{ ...linkStyle, backgroundColor: couleurPreferee }}>Ajouter Demande</Link></li>
                        <li style={navItemStyle}><Link to="/Accueil/my-requests" style={{ ...linkStyle, backgroundColor: couleurPreferee }}>Mes Demandes</Link></li>
                    </>
                )}

                {user?.admin && (
                    <>
                        <li style={navItemStyle}><Link to="/Accueil/users" style={{ ...linkStyle, backgroundColor: couleurPreferee }}>Liste Utilisateurs</Link></li>
                        <li style={navItemStyle}><Link to="/Accueil/add-user" style={{ ...linkStyle, backgroundColor: couleurPreferee }}>Ajouter Utilisateur</Link></li>
                        <li style={navItemStyle}><Link to="/Accueil/all-requests" style={{ ...linkStyle, backgroundColor: couleurPreferee }}> Demandes</Link></li>
                    </>
                )}
            </ul>
        </nav>
    );
};

// Styles pour la navigation
const navBarStyle = {
    width: '100%',
    backgroundColor: '#f5f5f5',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    position: 'fixed',
    top: '80px',
    left: 0,
    zIndex: 999,
};

const navListStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    listStyle: 'none',
    padding: '10px 0',
    margin: 5,
    marginLeft: '70px', // Décalage vers la gauche
};

const navItemStyle = {
    margin: '0 10px',
};

const linkStyle = {
    textDecoration: 'none',
    color: '#ffffff',
    padding: '10px 15px',
    borderRadius: '5px',
    transition: 'background-color 0.3s ease',
};

export default NavigationBar;
