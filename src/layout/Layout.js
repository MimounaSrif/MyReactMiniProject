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
    height: '100vh',
    overflowX: 'hidden', // S'assure qu'il n'y ait pas de débordement horizontal
    margin: 0, // Enlever toute marge de base
};

const navWrapperStyle = {
    display: 'flex',
    flexDirection: 'row', // Placer le Nav et Index en ligne
    flexShrink: 0, // Ils ne doivent pas rétrécir
    width: '100%', // S'assurer que le conteneur occupe 100% de la largeur
    boxSizing: 'border-box', // Pour éviter les débordements à cause du padding
    minheight: 'calc(100vh - 8px)',/* Ajuste selon la hauteur de la navbar */
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
    width: '100%', // Prendre toute la largeur disponible sans débordement
    boxSizing: 'border-box', // Pour éviter les débordements horizontaux
};

const contentStyle = {
    flex: 1, // Prend l'espace restant disponible
    padding: '20px',
    width: '100%', // Prendre toute la largeur disponible sans débordement
    maxWidth: '100%', // Ne pas permettre le débordement horizontal
    overflowY: 'auto', // Scroll possible si le contenu est plus grand que la zone
    textAlign: 'center', // Centrer le texte si nécessaire
    boxSizing: 'border-box', // Pour prendre en compte le padding dans les calculs de taille
};

export default Layout;
