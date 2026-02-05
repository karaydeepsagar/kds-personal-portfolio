import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar, Building2, UserCircle, CheckCircle2 } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import IndustrialBackground from './IndustrialBackground';

const Experience = ({ data }) => {
    const { theme } = useTheme();
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <section id="experience" style={{ position: 'relative', overflow: 'hidden' }}>
            <IndustrialBackground type="experience" />
            <div className="section-padding" style={{
                padding: isMobile ? '100px 15px 40px' : '120px 6% 80px',
                background: 'transparent',
                minHeight: '100vh',
                color: theme.primaryText
            }}>
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    style={{ textAlign: 'center', marginBottom: '80px' }}
                >
                    <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: '800', marginBottom: '20px', color: theme.primaryText }}>
                        Professional <span style={{ color: theme.accent }}>Journey</span>
                    </h2>
                    <p style={{ color: theme.mutedText, fontSize: '1.2rem', maxWidth: '700px', margin: '0 auto' }}>
                        Industrial experience as a Cloud Architect and DevOps Engineer.
                    </p>
                </motion.div>

                <div className="experience-list" style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '40px' }}>
                    {data.map((job, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            style={{
                                background: theme.cardBg,
                                backdropFilter: 'blur(20px)',
                                borderRadius: '32px',
                                padding: 'clamp(20px, 5vw, 50px)',
                                border: `1px solid ${theme.border}`,
                                boxShadow: theme.cardShadow,
                                position: 'relative',
                                overflow: 'hidden',
                                width: '100%' // Wide screen layout
                            }}
                        >
                            <div style={{
                                position: 'absolute',
                                top: '-50px',
                                right: '-50px',
                                width: '200px',
                                height: '200px',
                                background: `radial-gradient(circle, ${theme.accent}0D 0%, transparent 70%)`,
                                zIndex: 0
                            }} />

                            <div style={{ position: 'relative', zIndex: 1 }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '30px', marginBottom: '40px' }}>
                                    <div style={{ flex: '1', minWidth: '300px' }}>
                                        <h3 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: '900', color: theme.primaryText, lineHeight: '1.1', marginBottom: '10px' }}>{job.company}</h3>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: theme.secondaryText, fontSize: '1.2rem' }}>
                                            <Building2 size={20} style={{ color: theme.accent }} />
                                            <span style={{ fontWeight: '600' }}>{job.role}</span>
                                            <span style={{ borderLeft: `1px solid ${theme.border}`, height: '15px', margin: '0 10px' }}></span>
                                            <UserCircle size={20} style={{ color: theme.accent }} />
                                            <span>Client: {job.client}</span>
                                        </div>
                                    </div>
                                    <div style={{
                                        padding: '15px 30px',
                                        background: theme.glassBg,
                                        borderRadius: '20px',
                                        border: `1px solid ${theme.border}`,
                                        color: theme.primaryText,
                                        fontSize: '1rem',
                                        fontWeight: '700',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '10px',
                                        height: 'max-content'
                                    }}>
                                        <Calendar size={20} color={theme.accent} />
                                        {job.period}
                                    </div>
                                </div>

                                <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'minmax(0, 2.3fr) minmax(260px, 0.9fr)', gap: isMobile ? '20px' : '40px' }}>
                                    <div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '25px' }}>
                                            <Briefcase size={20} style={{ color: theme.accent }} />
                                            <h4 style={{ color: theme.accent, fontSize: '1rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '2px' }}>Key Responsibilities</h4>
                                        </div>
                                        <ul style={{ listStyle: 'none', padding: 0 }}>
                                            {job.responsibilities.map((resp, i) => (
                                                <li key={i} style={{
                                                    marginBottom: '18px',
                                                    fontSize: '1.05rem',
                                                    lineHeight: '1.7',
                                                    color: theme.secondaryText,
                                                    display: 'flex',
                                                    gap: '15px',
                                                    alignItems: 'flex-start'
                                                }}>
                                                    <CheckCircle2 size={18} style={{ color: theme.accent, marginTop: '5px', flexShrink: 0 }} />
                                                    {resp}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div style={{ display: 'flex', justifyContent: isMobile ? 'stretch' : 'flex-end' }}>
                                        <div style={{ padding: '26px', background: theme.secondaryBg, borderRadius: '24px', border: `1px solid ${theme.border}`, width: isMobile ? '100%' : '310px', minHeight: isMobile ? 'auto' : '200px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
                                            <h4 style={{ color: theme.accent, fontSize: '1rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '20px' }}>Tech Stack & Ecosystem</h4>
                                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                                                {job.tools.split(',').map((tool, i) => (
                                                    <span key={i} style={{
                                                        fontSize: '0.85rem',
                                                        padding: '8px 16px',
                                                        background: theme.glassBg,
                                                        borderRadius: '12px',
                                                        color: theme.secondaryText,
                                                        fontWeight: '600',
                                                        border: `1px solid ${theme.border}`,
                                                        transition: 'all 0.3s'
                                                    }}>
                                                        {tool.trim()}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Experience;
