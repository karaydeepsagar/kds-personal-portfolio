import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Cloud, Terminal, Monitor, Settings, Box, Globe, Server, Activity } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

// Custom AI icon approximating an AI chip with connected nodes
const AiIcon = ({ size = 24 }) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <rect x="22" y="22" width="20" height="20" rx="4" stroke="currentColor" strokeWidth="3" />
        <text
            x="32"
            y="36"
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill="currentColor"
        >
            AI
        </text>
        {/* Top nodes */}
        <circle cx="32" cy="8" r="3" stroke="currentColor" strokeWidth="3" />
        <path d="M32 11V22" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        <circle cx="16" cy="12" r="3" stroke="currentColor" strokeWidth="3" />
        <path d="M19 12H22" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        <circle cx="48" cy="12" r="3" stroke="currentColor" strokeWidth="3" />
        <path d="M42 12H45" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        {/* Side nodes */}
        <circle cx="8" cy="32" r="3" stroke="currentColor" strokeWidth="3" />
        <path d="M11 32H22" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        <circle cx="56" cy="32" r="3" stroke="currentColor" strokeWidth="3" />
        <path d="M42 32H53" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        {/* Bottom nodes */}
        <circle cx="32" cy="56" r="3" stroke="currentColor" strokeWidth="3" />
        <path d="M32 42V53" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        <circle cx="16" cy="52" r="3" stroke="currentColor" strokeWidth="3" />
        <path d="M22 44V49" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        <circle cx="48" cy="52" r="3" stroke="currentColor" strokeWidth="3" />
        <path d="M42 44V49" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
);

// Custom CI/CD icon approximating interlocking gears with flow arrows
const CiCdIcon = ({ size = 24 }) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        {/* Center gear */}
        <circle cx="32" cy="32" r="8" stroke="currentColor" strokeWidth="3" />
        <path
            d="M32 20L34 23M40 24L37 26M44 32L41 32M40 40L37 38M32 44L34 41M24 40L27 38M20 32H23M24 24L27 26"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
        />
        {/* Side gears */}
        <circle cx="18" cy="32" r="5" stroke="currentColor" strokeWidth="2" />
        <circle cx="46" cy="32" r="5" stroke="currentColor" strokeWidth="2" />
        {/* Flow arrows */}
        <path
            d="M10 26C12 20 17 16 23 16H28"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path d="M26 12L32 16L26 20" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <path
            d="M54 38C52 44 47 48 41 48H36"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path d="M38 52L32 48L38 44" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

// Custom Infrastructure as Code icon approximating a cloud with code and two connected nodes
const IaCIcon = ({ size = 24 }) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        {/* Cloud */}
        <path
            d="M18 30C18 24 22.5 20 28 20C29.5 16 33 14 36.5 14C42 14 46 18 47 23C51 23.5 54 27 54 31.5C54 36.5 50 40 45 40H23C20 40 18 38 18 35.5C18 33.5 19 31.5 21 30.5"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        {/* Code circle */}
        <circle cx="32" cy="30" r="8" fill="none" stroke="currentColor" strokeWidth="3" />
        <path d="M29 27L27 30L29 33" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M35 27L37 30L35 33" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M31 34L33 26" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        {/* Bottom connector and nodes */}
        <line x1="32" y1="38" x2="32" y2="44" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        <circle cx="32" cy="46.5" r="3" stroke="currentColor" strokeWidth="3" />
        <line x1="29" y1="46.5" x2="18" y2="46.5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        <line x1="35" y1="46.5" x2="46" y2="46.5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        <rect x="10" y="44" width="10" height="7" rx="1.5" stroke="currentColor" strokeWidth="3" />
        <rect x="44" y="44" width="10" height="7" rx="1.5" stroke="currentColor" strokeWidth="3" />
    </svg>
);

const icons = {
    Cloud: Cloud,
    Scripting: Terminal,
    OS: Monitor,
    'CI CD': CiCdIcon,
    'CI/CD': CiCdIcon,
    Infrastructure_as_Code: IaCIcon,
    'Infrastructure as Code': IaCIcon,
    Containerization: Globe,
    'Web Server': Server,
    Monitoring: Activity,
    AI_Tools: AiIcon,
    'AI Tools': AiIcon
};

import IndustrialBackground from './IndustrialBackground';

const Skills = ({ data }) => {
    const { theme } = useTheme();
    const categories = Object.keys(data);
    const [hoveredCategory, setHoveredCategory] = useState(null);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <section id="skills" style={{ position: 'relative', overflow: 'hidden' }}>
            <IndustrialBackground type="skills" />
            <div className="section-padding" style={{ padding: isMobile ? '100px 15px 40px' : '100px 4% 80px', background: 'transparent' }}>
                <h2 className="section-title" style={{ textAlign: 'center', marginBottom: isMobile ? '2.5rem' : '4rem', fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: '800', color: theme.primaryText }}>
                    <span style={{ color: theme.accent }}>Technical</span> Expertise
                </h2>

                <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(320px, 1fr))', gap: isMobile ? '15px' : '30px' }}>
                    {categories.map((category, index) => {
                        const Icon = icons[category] || Terminal;
                        const isHovered = hoveredCategory === category;

                        return (
                            <motion.div
                                key={category}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                onHoverStart={() => setHoveredCategory(category)}
                                onHoverEnd={() => setHoveredCategory(null)}
                                style={{
                                    position: 'relative',
                                    borderRadius: '20px',
                                    overflow: 'hidden',
                                    background: theme.cardBg,
                                    backdropFilter: 'blur(10px)',
                                    border: `1px solid ${theme.border}`,
                                    minHeight: '220px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    transition: 'all 0.4s ease'
                                }}
                            >
                                {/* Background Icon Watermark */}
                                <motion.div
                                    animate={{
                                        scale: isHovered ? 1.2 : 1,
                                        rotate: isHovered ? -15 : 0,
                                        opacity: isHovered ? 0.2 : 0.05
                                    }}
                                    style={{
                                        position: 'absolute',
                                        right: '-20px',
                                        bottom: '-20px',
                                        color: theme.accent,
                                        zIndex: 0,
                                        pointerEvents: 'none'
                                    }}
                                >
                                    <Icon size={180} />
                                </motion.div>

                                <div style={{ padding: '2rem', position: 'relative', zIndex: 1 }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '1.5rem' }}>
                                        <div style={{
                                            padding: '12px',
                                            borderRadius: '12px',
                                            background: `linear-gradient(135deg, ${theme.accent}1A 0%, transparent 100%)`,
                                            border: `1px solid ${theme.borderAccent}`,
                                            color: theme.accent
                                        }}>
                                            <Icon size={24} />
                                        </div>
                                        <h3 style={{
                                            textTransform: 'capitalize',
                                            fontSize: '1.4rem',
                                            fontWeight: '700',
                                            color: theme.primaryText
                                        }}>
                                            {category === 'OS' ? 'Operating Systems' : (category === 'CI CD' || category === 'CI/CD') ? 'CI/CD' : category}
                                        </h3>
                                    </div>

                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                                        {data[category].map(tech => (
                                            <motion.span
                                                key={tech}
                                                whileHover={{ scale: 1.05, backgroundColor: theme.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)' }}
                                                style={{
                                                    fontSize: '1rem',
                                                    color: theme.secondaryText,
                                                    background: theme.glassBg,
                                                    border: `1px solid ${theme.border}`,
                                                    padding: '8px 14px',
                                                    borderRadius: '50px',
                                                    cursor: 'default',
                                                    zIndex: 2,
                                                    fontWeight: 500
                                                }}
                                            >
                                                {tech}
                                            </motion.span>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Skills;
