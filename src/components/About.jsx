import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const About = ({ data, certifications }) => {
    const { theme } = useTheme();
    return (
        <section className="section-padding" style={{ paddingLeft: '4%', paddingRight: '4%' }}>
            <h2 className="section-title">About This Profile</h2>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '40px' }}>
                <div style={{ color: theme.secondaryText, fontSize: '1.1rem', lineHeight: '1.8' }}>
                    <p style={{ marginBottom: '20px' }}>{data.summary}</p>

                    <div style={{ display: 'flex', gap: '20px', marginTop: '30px' }}>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <span style={{ fontSize: '0.9rem', color: theme.mutedText }}>Education</span>
                            <span style={{ color: theme.primaryText }}>B. TECH | Electrical and Electronics</span>
                            <span style={{ fontSize: '0.9rem', color: theme.mutedText }}>2019</span>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <span style={{ fontSize: '0.9rem', color: theme.mutedText }}>Location</span>
                            <span style={{ color: theme.primaryText }}>{data.location}</span>
                        </div>
                    </div>
                </div>

                <div>
                    <h3 style={{ fontSize: '1.1rem', color: theme.primaryText, marginBottom: '15px' }}>Certifications & Awards</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                        {certifications.map((cert, i) => (
                            <div key={i} className="netflix-card" style={{ padding: '15px', display: 'flex', alignItems: 'center', gap: '15px', background: theme.cardBg, borderRadius: '8px', border: `1px solid ${theme.border}` }}>
                                <div style={{
                                    width: '4px',
                                    height: '40px',
                                    background: theme.accent
                                }}></div>
                                <div>
                                    <h4 style={{ fontSize: '1rem', color: theme.primaryText }}>{cert.name}</h4>
                                    <p style={{ fontSize: '0.85rem', color: theme.mutedText }}>{cert.issuer}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
