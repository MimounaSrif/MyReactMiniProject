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
    overflowX: 'hidden',
    margin: 0,
};

const navWrapperStyle = {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    boxSizing: 'border-box',
    paddingTop: '6px',
};

const mainContentWrapperStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    padding: '20px',
    marginTop: '80px',
    marginBottom: '80px',
    overflowY: 'auto',
    width: '100%',
    boxSizing: 'border-box',
};

const contentStyle = {
    flex: 1,
    padding: '20px',
    width: '100%',
    maxWidth: '100%',
    overflowY: 'auto',
    textAlign: 'center',
    boxSizing: 'border-box',
};

// Media Queries
const mediaQueries = `
    @media (max-width: 768px) {
        .navWrapperStyle {
            flexDirection: column; /* Empiler les éléments verticalement */
        }
        .mainContentWrapperStyle {
            marginTop: 60px; /* Réduire la marge pour les petits écrans */
            marginBottom: 60px;
            padding: 10px; /* Réduire le padding */
        }
        .contentStyle {
            padding: 10px; /* Réduire le padding */
        }
    }

    @media (min-width: 769px) and (max-width: 1024px) {
        .navWrapperStyle {
            flexDirection: row; /* Les éléments sont côte à côte sur les tablettes */
        }
        .mainContentWrapperStyle {
            marginTop: 80px; /* Ajuster la marge pour les tablettes */
            marginBottom: 80px;
        }
    }

    @media (min-width: 1025px) {
        .navWrapperStyle {
            flexDirection: row; /* Les éléments sont côte à côte sur les ordinateurs */
        }
        .mainContentWrapperStyle {
            marginTop: 100px; /* Ajuster la marge pour les grands écrans */
            marginBottom: 100px;
        }
    }
`;

export default Layout;