import React from 'react';
import { useSelector } from 'react-redux';

const VoirMonProfile = () => {
    const user = useSelector((state) => state.user);

    if (!user) {
        return (
            <div style={errorMessageStyle}>
                <h2>Profil</h2>
                <p style={{ color: 'red', fontSize: '18px' }}>Vous n'êtes pas connecté. Veuillez vous connecter pour voir votre profil.</p>
            </div>
        );
    }

    return (
        <div style={profileContainerStyle}>
            <div style={profileCardStyle}>
                <img src={user.avatar} alt="Avatar" style={avatarStyle} />
                <h2 style={titleStyle}>Mon Profil</h2>
                <table style={tableStyle}>
                    <tbody>
                        <tr>
                            <td style={cellLabelStyle}><strong>Nom :</strong></td>
                            <td style={cellValueStyle}>{user.nom}</td>
                        </tr>
                        <tr>
                            <td style={cellLabelStyle}><strong>Prénom :</strong></td>
                            <td style={cellValueStyle}>{user.prenom}</td>
                        </tr>
                        <tr>
                            <td style={cellLabelStyle}><strong>Âge :</strong></td>
                            <td style={cellValueStyle}>{user.age}</td>
                        </tr>
                        <tr>
                            <td style={cellLabelStyle}><strong>Pseudo :</strong></td>
                            <td style={cellValueStyle}>{user.pseudo}</td>
                        </tr>
                        <tr>
                            <td style={cellLabelStyle}><strong>Email :</strong></td>
                            <td style={cellValueStyle}>{user.email}</td>
                        </tr>
                        <tr>
                            <td style={cellLabelStyle}><strong>Couleur préférée :</strong></td>
                            <td style={cellValueStyle}>{user.couleur}</td>
                        </tr>
                        <tr>
                            <td style={cellLabelStyle}><strong>Devise :</strong></td>
                            <td style={cellValueStyle}>{user.Devise}</td>
                        </tr>
                        <tr>
                            <td style={cellLabelStyle}><strong>Pays :</strong></td>
                            <td style={cellValueStyle}>{user.Pays}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

// Styles responsifs
const profileContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
    width: '90%',
    maxWidth: '1200px', // Centre le contenu sur les grands écrans
    marginLeft: 'auto',
    marginRight: 'auto',
};

const profileCardStyle = {
    backgroundColor: 'white',
    padding: '30px',
    borderRadius: '15px',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    maxWidth: '500px',
    width: '90%',
};

const avatarStyle = {
    width: '150px',
    height: '150px',
    borderRadius: '50%',
    objectFit: 'cover',
    border: '3px solid #ddd',
    marginBottom: '20px',
};

const titleStyle = {
    fontSize: '26px',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '10px',
};

const tableStyle = {
    borderCollapse: 'collapse',
    width: '100%',
    marginTop: '10px',
};

const cellLabelStyle = {
    padding: '12px',
    fontWeight: 'bold',
    textAlign: 'left',
};

const cellValueStyle = {
    padding: '12px',
    textAlign: 'left',
    fontSize: '16px',
    color: '#555',
};

const errorMessageStyle = {
    textAlign: 'center',
    marginTop: '50px',
    color: '#ff6347',
    fontSize: '18px',
};

export default VoirMonProfile;
