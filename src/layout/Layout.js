import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import HeaderSection from './HeaderSection';
import NavigationBar from './NavigationBar';
import Index from './Index';
import FooterSection from './FooterSection';

const Layout = () => {
    const couleurPreferee = useSelector((state) => state.user.couleur);

    useEffect(() => {
        document.body.style.backgroundColor = couleurPreferee || '#ffffff';
        // Éviter la barre de défilement horizontale
        document.body.style.overflowX = 'hidden';
    }, [couleurPreferee]);

    return (
        <div style={layoutStyle}>
            <HeaderSection />
            <div style={navWrapperStyle}>
                <NavigationBar />
                <Index />
            </div>
            <div style={mainContentWrapperStyle}>
                <main style={contentStyle}>
                    <Outlet />
                </main>
            </div>
            <FooterSection />
        </div>
    );
};

// Styles
const layoutStyle = {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    overflowX: 'hidden', // S'assure qu'il n'y ait pas de débordement horizontal
    margin: 0, // Enlever toute marge de base
};

const navWrapperStyle = {
    display: 'flex',
    flexDirection: 'column', // Par défaut, empiler les éléments verticalement
    width: '100%',
    boxSizing: 'border-box',
    paddingTop: '6px',
};

const mainContentWrapperStyle = {
    flex: 1, // L'espace restant entre la navigation et le footer
    display: 'flex',
    flexDirection: 'column',
    padding: '20px',
    marginTop: '80px', // Compense la hauteur du header si nécessaire
    marginBottom: '80px', // Ajoute de l'espace pour le footer
    overflowY: 'auto',
    width: '100%',
    boxSizing: 'border-box',
};

const contentStyle = {
    flex: 1, // Prend l'espace restant disponible
    padding: '20px',
    width: '100%',
    maxWidth: '100%',
    overflowY: 'auto',
    textAlign: 'center',
    boxSizing: 'border-box',
};

// Media Queries pour les écrans plus larges
const mediaQueries = `
    @media (min-width: 768px) {
        .navWrapperStyle {
            flexDirection: row; /* Les éléments sont côte à côte sur les grands écrans */
        }
        .mainContentWrapperStyle {
            marginTop: 0; /* Réinitialiser la marge pour les grands écrans */
        }
    }
`;

export default Layout;