import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

const Index = () => {
    const user = useSelector((state) => state.user);
    const couleurPreferee = user?.couleur || '#000000';
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    return (
        <>
            {isMobile && (
                <button onClick={toggleMenu} style={{ ...hamburgerButtonStyle, backgroundColor: couleurPreferee }}>
                    <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} size="lg" />
                </button>
            )}

            <nav style={{
                ...sideNavStyle,
                transform: isMobile ? (isMenuOpen ? 'translateX(0)' : 'translateX(-100%)') : 'translateX(0)',
                width: isMobile ? '100%' : '200px',
            }}>
                <ul style={{ ...navListStyle, marginTop: '-4px' }}>
                    {[ 
                        { to: "/Accueil", text: "Accueil" },
                        { to: "/Accueil/profile", text: "Mon Profil" },
                        { to: "/Accueil/color", text: "Modifier Couleur" },
                        ...(!user?.admin ? [
                            { to: "/Accueil/add-request", text: "Ajouter Demande" },
                            { to: "/Accueil/my-requests", text: "Mes Demandes" }
                        ] : []),
                        ...(user?.admin ? [
                            { to: "/Accueil/users", text: "Liste Utilisateurs" },
                            { to: "/Accueil/add-user", text: "Ajouter Utilisateur" },
                            { to: "/Accueil/my-requests", text: "Demandes" }
                        ] : [])
                    ].map((item, index) => (
                        <li key={index} style={navItemStyle}>
                            <Link to={item.to} style={{ ...linkStyle, backgroundColor: couleurPreferee }} onClick={() => isMobile && toggleMenu()}>
                                {item.text}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </>
    );
};

const sideNavStyle = {
    position: 'fixed',
    top: '80px',
    left: 0,
    height: 'calc(100vh - 80px)',
    backgroundColor: '#f5f5f5',
    padding: '20px 0',
    zIndex: 999,
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    transition: 'transform 0.3s ease, width 0.3s ease',
};

const navListStyle = {
    listStyle: 'none',
    padding: 5,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: '9px',
    flex: 1,
    overflowY: 'auto',
    maxHeight: 'calc(100vh - 100px)',
};

const navItemStyle = {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
};

const linkStyle = {
    textDecoration: 'none',
    padding: '14px',
    borderRadius: '12px',
    width: '80%',
    textAlign: 'center',
    display: 'block',
    color: '#ffffff',
    transition: 'background-color 0.3s ease',
};

const hamburgerButtonStyle = {
    position: 'fixed',
    top: '71px',
    left: '3px',
    zIndex: 1001,
    border: 'none',
    borderRadius: '5px',
    padding: '10px 13px',
    cursor: 'pointer',
    fontSize: '13px',
    transition: 'background-color 0.3s ease',
};

export default Index;
