import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Calendar } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import IndustrialBackground from './IndustrialBackground';

const Education = ({ data }) => {
    const { theme } = useTheme();
    const [isMobile, setIsMobile] = useState(false);
    const [isInView, setIsInView] = useState(false);
    const sectionRef = React.useRef(null);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        handleResize();
        window.addEventListener('resize', handleResize);

        const observer = new IntersectionObserver(
            ([entry]) => setIsInView(entry.isIntersecting),
            { threshold: 0.1 }
        );
        if (sectionRef.current) observer.observe(sectionRef.current);

        return () => {
            window.removeEventListener('resize', handleResize);
            observer.disconnect();
        };
    }, []);

    return (
        <section ref={sectionRef} id="education" style={{ position: 'relative', overflow: 'hidden' }}>
            <div
                className="section-padding"
                style={{
                    padding: isMobile ? '100px 15px 40px' : '120px 6% 80px',
                    background: 'transparent',
                    minHeight: '100vh',
                    color: theme.primaryText
                }}
            >
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    style={{ textAlign: 'center', marginBottom: isMobile ? '60px' : '80px' }}
                >
                    <h2
                        style={{
                            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                            fontWeight: '800',
                            marginBottom: '20px',
                            color: theme.primaryText
                        }}
                    >
                        <span>Education</span> <span style={{ color: theme.accent }}>Details</span>
                    </h2>
                    <p style={{ color: theme.mutedText, fontSize: '1.2rem', maxWidth: '780px', margin: '0 auto' }}>
                        Academic foundation supporting cloud and DevOps expertise.
                    </p>
                </motion.div>

                <div style={{ maxWidth: '900px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    {data.map((item, idx) => (
                        <motion.div
                            key={`${item.degree}-${item.year}-${idx}`}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-80px' }}
                            transition={{ duration: 0.55, delay: idx * 0.05 }}
                            whileHover={{ y: -5, boxShadow: theme.mode === 'dark' ? `0 0 30px ${theme.accent}33` : `0 0 20px rgba(0,0,0,0.1)` }}
                            style={{
                                // Increased transparency for both modes
                                background: theme.mode === 'dark' ? 'rgba(255, 255, 255, 0.03)' : 'rgba(255, 255, 255, 0.6)',
                                backdropFilter: 'blur(12px)', // Stronger blur for glass effect
                                borderRadius: '20px', // Slightly smaller radius
                                padding: isMobile ? '16px' : '24px', // Reduced padding
                                border: `1px solid ${theme.border}`,
                                // Simplified theme-aware glow to prevent rendering "shades"
                                boxShadow: theme.mode === 'dark'
                                    ? `-20px 0 30px -15px #ffffff33, 20px 0 30px -15px #ffffff33`
                                    : `0 10px 30px -10px rgba(0,0,0,0.1)`,
                                position: 'relative',
                                display: 'flex',
                                alignItems: 'center',
                                userSelect: 'none'
                            }}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '18px', flexWrap: 'wrap', width: '100%' }}>
                                <div style={{ display: 'flex', gap: '14px', alignItems: 'center', minWidth: '260px', flex: 1 }}>
                                    <div
                                        style={{
                                            width: '44px',
                                            height: '44px',
                                            borderRadius: '14px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            background: `${theme.accent}1A`,
                                            border: `1px solid ${theme.borderAccent}`,
                                            color: theme.accent,
                                            flexShrink: 0
                                        }}
                                    >
                                        <GraduationCap size={22} />
                                    </div>
                                    <div>
                                        <h3 style={{ fontSize: '1.25rem', fontWeight: '900', color: theme.primaryText, lineHeight: '1.25', marginBottom: '6px' }}>
                                            {item.degree}
                                            {item.institute ? (
                                                <span style={{ color: theme.secondaryText, fontWeight: 700 }}> &nbsp;-&nbsp; {item.institute}</span>
                                            ) : null}
                                        </h3>
                                    </div>
                                </div>

                                <div
                                    style={{
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '10px',
                                        padding: '12px 16px',
                                        borderRadius: '14px',
                                        border: `1px solid ${theme.border}`,
                                        background: theme.secondaryBg,
                                        color: theme.secondaryText,
                                        fontWeight: 700
                                    }}
                                >
                                    <Calendar size={18} style={{ color: theme.accent }} />
                                    <span>{item.year}</span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Education;
