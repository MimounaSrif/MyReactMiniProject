import React, { useState, useEffect } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';

const FooterSection = () => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <footer style={{ 
            ...footerContainerStyle,
            flexDirection: isMobile ? 'column' : 'row',
            height: isMobile ? 'auto' : '60px',
            padding: isMobile ? '15px 20px' : '0 20px'
        }}>
            <div style={{ 
                ...footerUserInfoStyle,
                textAlign: isMobile ? 'center' : 'left',
                marginBottom: isMobile ? '10px' : '0'
            }}>
                <p>Adresse : Ista HAY SALAM, Salé, Maroc</p>
            </div>
            
            <div style={{ 
                ...footerButtonContainerStyle,
                textAlign: 'center',
                paddingRight: isMobile ? '0' : '20px'
            }}>
                {/* Icône Facebook */}
                <a 
                    href="https://web.facebook.com/profile.php?id=100075918195926" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    style={footerLinkStyle}
                    aria-label="Facebook"
                >
                    <i className="fab fa-facebook-f" style={iconStyle}></i>
                </a>

                {/* Icône Instagram */}
                <a 
                    href="https://www.instagram.com/srifmimouna/?next=%2F&hl=fr" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    style={footerLinkStyle}
                    aria-label="Instagram"
                >
                    <i className="fab fa-instagram" style={iconStyle}></i>
                </a>

                {/* Icône LinkedIn */}
                <a 
                    href="https://linkedin.com" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    style={footerLinkStyle}
                    aria-label="LinkedIn"
                >
                    <i className="fab fa-linkedin-in" style={iconStyle}></i>
                </a>

                {/* Icône GitHub */}
                <a 
                    href="https://github.com/MimounaSrif" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    style={footerLinkStyle}
                    aria-label="GitHub"
                >
                    <i className="fab fa-github" style={iconStyle}></i>
                </a>
            </div>
        </footer>
    );
};

// Styles communs
const footerContainerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    backgroundColor: '#f5f5f5',
    color: '#000000',
    position: 'fixed',
    bottom: 0,
    left: 0,
    zIndex: 1000,
    transition: 'all 0.3s ease'
};

const footerUserInfoStyle = {
    flex: 1,
    fontSize: '14px'
};

const footerButtonContainerStyle = {
    flex: 1,
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '20px'
};

const footerLinkStyle = {
    color: '#000000',
    textDecoration: 'none',
    transition: 'color 0.3s ease'
};

const iconStyle = {
    fontSize: '24px',
    width: '40px',
    height: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '50%',
    transition: 'all 0.3s ease',
    ':hover': {
        backgroundColor: '#00000015'
    }
};

export default FooterSection;