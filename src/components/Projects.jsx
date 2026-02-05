import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink, Code2 } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import IndustrialBackground from './IndustrialBackground';

const Projects = ({ data }) => {
    const { theme } = useTheme();
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <section id="projects" style={{ position: 'relative', overflow: 'hidden' }}>
            <IndustrialBackground type="projects" />
            <div className="section-padding" style={{ padding: isMobile ? '100px 15px 40px' : '120px 6% 80px', background: 'transparent', minHeight: '100vh' }}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    style={{ marginBottom: '60px', textAlign: 'center' }}
                >
                    <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: '800', marginBottom: '20px' }}>
                        <span style={{ color: theme.accent }}>Featured</span> <span style={{ color: theme.primaryText }}>Projects</span>
                    </h2>
                    <p style={{ color: theme.mutedText, fontSize: '1.2rem', maxWidth: '700px', margin: '0 auto' }}>
                        Industrial DevOps and Cloud Architecture implementations.
                    </p>
                </motion.div>

                <div className="projects-grid" style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 350px), 1fr))',
                    gap: '30px',
                    maxWidth: '1400px',
                    margin: '0 auto'
                }}>
                    {data.map((project, index) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            style={{
                                background: theme.cardBg,
                                borderRadius: '24px',
                                overflow: 'hidden',
                                border: `1px solid ${theme.border}`,
                                backdropFilter: 'blur(20px)',
                                display: 'flex',
                                flexDirection: 'column',
                                boxShadow: theme.cardShadow
                            }}
                        >
                            <div style={{ height: '220px', overflow: 'hidden', position: 'relative' }}>
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }}
                                    onMouseOver={(e) => e.target.style.transform = 'scale(1.1)'}
                                    onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
                                />
                                <div style={{
                                    position: 'absolute',
                                    top: '15px',
                                    left: '15px',
                                    background: theme.mode === 'dark' ? 'rgba(0,0,0,0.6)' : 'rgba(255,255,255,0.9)',
                                    padding: '8px',
                                    borderRadius: '12px',
                                    backdropFilter: 'blur(5px)'
                                }}>
                                    <Code2 size={20} color={theme.accent} />
                                </div>
                            </div>

                            <div style={{ padding: '30px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                                <h3 style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '15px', color: theme.primaryText }}>{project.title}</h3>
                                <p style={{ color: theme.mutedText, marginBottom: '25px', lineHeight: '1.6', fontSize: '0.95rem', flex: 1 }}>
                                    {project.description}
                                </p>

                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '30px' }}>
                                    {project.technologies.map((tech, i) => (
                                        <span key={i} style={{
                                            fontSize: '0.75rem',
                                            padding: '6px 14px',
                                            background: `${theme.accent}1A`,
                                            color: theme.accent,
                                            borderRadius: '50px',
                                            fontWeight: '700',
                                            border: `1px solid ${theme.borderAccent}`
                                        }}>
                                            {tech}
                                        </span>
                                    ))}
                                </div>

                                <div style={{ display: 'flex', gap: '15px' }}>
                                    {project.link && (
                                        <a
                                            href={project.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '8px',
                                                color: theme.primaryText,
                                                textDecoration: 'none',
                                                fontSize: '0.9rem',
                                                fontWeight: '700',
                                                padding: '10px 20px',
                                                borderRadius: '8px',
                                                background: theme.glassBg,
                                                border: `1px solid ${theme.border}`,
                                                transition: 'all 0.3s'
                                            }}
                                            onMouseOver={(e) => e.currentTarget.style.background = theme.mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}
                                            onMouseOut={(e) => e.currentTarget.style.background = theme.glassBg}
                                        >
                                            <Github size={18} /> Source
                                        </a>
                                    )}
                                    {project.demo && (
                                        <a
                                            href={project.demo}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '8px',
                                                color: theme.mode === 'dark' ? '#000' : '#fff',
                                                textDecoration: 'none',
                                                fontSize: '0.9rem',
                                                fontWeight: '700',
                                                padding: '10px 20px',
                                                borderRadius: '8px',
                                                background: theme.accent,
                                                transition: 'transform 0.2s'
                                            }}
                                            onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-3px)'}
                                            onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                                        >
                                            <ExternalLink size={18} /> Live Demo
                                        </a>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;
