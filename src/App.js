import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './layout/Layout';
import Accueil from './pages/Accueil';
import Login from './components/login';
import CreateAccount from './components/CreateAccount';
import VoirMonProfile from './pages/VoirMonProfile';
import ModifierCouleur from './pages/ModifierCouleur';
import ListeUtilisateurs from './pages/ListeUtilisateurs';
import AjouterUtilisateur from './pages/AjouterUtilisateur';
import AjouterDemande from './pages/AjouterDemande';
import ListeDemandes from './pages/ListeDemandes'; // Assure-toi d'importer ce fichier
const App = () => {
    return (
        <Router>
            <Routes>
                {/* Route pour la page de connexion */}
                <Route path="/" element={<Login />} />
                {/* Route pour la création de compte */}
                <Route path="create-account" element={<CreateAccount />} />
                {/* Routes imbriquées sous Layout */}
                <Route path="/Accueil" element={<Layout />}>
                    <Route index element={<Accueil />} /> {/* Page d'accueil par défaut */}
                    <Route path="/Accueil/profile" element={<VoirMonProfile />} />
                    <Route path="/Accueil/color" element={<ModifierCouleur/>} />
                    <Route path="/Accueil/users" element={<ListeUtilisateurs/>} />
                    <Route path="/Accueil/add-user" element={<AjouterUtilisateur/>} />
                    <Route path="/Accueil/add-request" element={<AjouterDemande />} />
                    <Route path="/Accueil/my-requests" element={<ListeDemandes />} />

                </Route>
            </Routes>
        </Router>
    );
};

export default App;