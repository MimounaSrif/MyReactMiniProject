import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Index = () => {
    const user = useSelector((state) => state.user);
    const couleurPreferee = user?.couleur || '#000000'; // Couleur noire par défaut

    return (
        <nav style={sideNavStyle}>
            <ul style={navListStyle}>
                <li style={navItemStyle}><Link to="/Accueil" style={{ ...linkStyle, backgroundColor: couleurPreferee, color: '#ffffff' }}>Accueil</Link></li>
                <li style={navItemStyle}><Link to="/Accueil/profile" style={{ ...linkStyle, backgroundColor: couleurPreferee, color: '#ffffff' }}>Mon Profil</Link></li>
                <li style={navItemStyle}><Link to="/Accueil/color" style={{ ...linkStyle, backgroundColor: couleurPreferee, color: '#ffffff' }}>Modifier Couleur</Link></li>

                {!user?.admin && (
                    <>
                        <li style={navItemStyle}><Link to="/Accueil/add-request" style={{ ...linkStyle, backgroundColor: couleurPreferee, color: '#ffffff' }}>Ajouter Demande</Link></li>
                        <li style={navItemStyle}><Link to="/Accueil/my-requests" style={{ ...linkStyle, backgroundColor: couleurPreferee, color: '#ffffff' }}>Mes Demandes</Link></li>
                    </>
                )}

                {user?.admin && (
                    <>
                        <li style={navItemStyle}><Link to="/Accueil/users" style={{ ...linkStyle, backgroundColor: couleurPreferee, color: '#ffffff' }}>Liste Utilisateurs</Link></li>
                        <li style={navItemStyle}><Link to="/Accueil/add-user" style={{ ...linkStyle, backgroundColor: couleurPreferee, color: '#ffffff' }}>Ajouter Utilisateur</Link></li>
                        <li style={navItemStyle}><Link to="/Accueil/all-requests" style={{ ...linkStyle, backgroundColor: couleurPreferee, color: '#ffffff' }}> Demandes</Link></li>
                    </>
                )}
            </ul>
        </nav>
    );
};

// Styles pour la navigation latérale
const sideNavStyle = {
    position: 'fixed',
    top: '80px',
    left: 0,
    width: '200px',
    height: 'calc(100vh - 80px)',
    backgroundColor: '#f5f5f5',
    padding: '20px 0',
    zIndex: 999,
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
};

const navListStyle = {
    listStyle: 'none',
    padding: 3,
    marginTop: 3,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '35px',
    flex: 1,
};

const navItemStyle = {
    width: '80%',
};

const linkStyle = {
    textDecoration: 'none',
    padding: '9px',
    borderRadius: '5px',
    width: '100%',
    textAlign: 'center',
    display: 'block',
    transition: 'background-color 0.3s ease',
   
};

export default Index;
