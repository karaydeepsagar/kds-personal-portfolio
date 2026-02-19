import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Cloud, Terminal, Monitor, Settings, Box, Globe, Server, Activity } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import SpotlightCard from './SpotlightCard';

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

// Custom Infrastructure as Code icon: Gear with code brackets
const IaCIcon = ({ size = 24 }) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        {/* Gear body */}
        <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.72l-.15.1a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.38a2 2 0 0 0-.73-2.73l-.15-.1a2 2 0 0 1-1-1.72v-.51a2 2 0 0 1 1-1.72l.15-.1a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
        {/* Code brackets inside */}
        <polyline points="9 9 6 12 9 15" />
        <polyline points="15 9 18 12 15 15" />
        <line x1="14" y1="8" x2="10" y2="16" />
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

    // Staggered Container Variant for list entrance
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1, // Faster stagger for snappier feel
                delayChildren: 0.2
            }
        }
    };

    // Item Variant for individual card entrance (Fade Up)
    const cardVariants = {
        hidden: { opacity: 0, y: 30, scale: 0.95 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 20
            }
        }
    };

    return (
        <section id="skills" style={{ position: 'relative', overflow: 'hidden' }}>
            <div className="section-padding" style={{ padding: isMobile ? '100px 15px 40px' : '100px 4% 80px', background: 'transparent' }}>
                <div style={{ textAlign: 'center', marginBottom: isMobile ? '40px' : '60px' }}>
                    <h2 className="section-title" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: '800', color: theme.primaryText, marginBottom: '16px' }}>
                        <span style={{ color: theme.accent }}>Technical</span> Expertise
                    </h2>
                    <p style={{ color: theme.mutedText, fontSize: '1.2rem', maxWidth: isMobile ? '700px' : '100%', margin: '0 auto', whiteSpace: isMobile ? 'normal' : 'nowrap' }}>
                        Core competencies in Cloud Architecture, DevOps automation, and System Design.
                    </p>
                </div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                    style={{
                        display: 'grid',
                        // Force 4 columns on non-mobile screens to achieve the 4x2 layout (assuming 8 items)
                        gridTemplateColumns: isMobile ? '1fr' : 'repeat(4, 1fr)', 
                        gap: isMobile ? '15px' : '20px',
                        maxWidth: '1400px', // Increased max-width to accommodate 4 columns comfortably
                        margin: '0 auto'
                    }}
                >
                    {categories.map((category) => {
                        const Icon = icons[category] || Terminal;
                        const isHovered = hoveredCategory === category;

                        return (
                            <motion.div
                                key={category}
                                variants={cardVariants}
                                style={{
                                    height: '100%',
                                    minHeight: '220px'
                                }}
                                onHoverStart={() => setHoveredCategory(category)}
                                onHoverEnd={() => setHoveredCategory(null)}
                            >
                                <SpotlightCard
                                    style={{
                                        height: '100%',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        background: theme.cardBg,
                                        boxShadow: theme.cardShadow
                                    }}
                                >
                                    {/* Background Icon Watermark */}
                                    <motion.div
                                        animate={{
                                            scale: isHovered ? 1.2 : 1,
                                            rotate: isHovered ? -15 : 0,
                                            opacity: isHovered
                                                ? (theme.mode === 'dark' ? 0.18 : 0.12)
                                                : (theme.mode === 'dark' ? 0.08 : 0.05)
                                        }}
                                        style={{
                                            position: 'absolute',
                                            right: '-20px',
                                            bottom: '-20px',
                                            color: theme.accent,
                                            filter: isHovered
                                                ? `drop-shadow(0 0 20px ${theme.accent}26)`
                                                : `drop-shadow(0 0 10px ${theme.accent}1A)`,
                                            zIndex: 0,
                                            pointerEvents: 'none',
                                            transition: 'opacity 0.4s ease'
                                        }}
                                    >
                                        <Icon size={160} />
                                    </motion.div>

                                    <div style={{ padding: '2rem', position: 'relative', zIndex: 1, height: '100%', display: 'flex', flexDirection: 'column' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '1.5rem' }}>
                                            <div style={{
                                                padding: '12px',
                                                borderRadius: '12px',
                                                background: `linear-gradient(135deg, ${theme.accent}1A 0%, transparent 100%)`,
                                                border: `1px solid ${theme.borderAccent}`,
                                                color: theme.accent,
                                                boxShadow: `0 4px 12px ${theme.accent}1A`
                                            }}>
                                                <Icon size={24} />
                                            </div>
                                            <h3 style={{
                                                textTransform: 'capitalize',
                                                fontSize: '1.4rem',
                                                fontWeight: '700',
                                                color: theme.primaryText,
                                                letterSpacing: '-0.01em'
                                            }}>
                                                {category === 'OS' ? 'Operating Systems' : (category === 'CI CD' || category === 'CI/CD') ? 'CI/CD' : (category === 'Infrastructure_as_Code' || category === 'Infrastructure as Code') ? 'Infrastructure as Code' : category}
                                            </h3>
                                        </div>

                                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', alignContent: 'flex-start' }}>
                                            {data[category].map(tech => (
                                                <motion.span
                                                    key={tech}
                                                    whileHover={{ scale: 1.05, backgroundColor: theme.mode === 'dark' ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.08)' }}
                                                    style={{
                                                        fontSize: '0.9rem',
                                                        color: theme.secondaryText,
                                                        background: 'rgba(128, 128, 128, 0.1)',
                                                        border: `1px solid ${theme.border}`,
                                                        padding: '6px 12px',
                                                        borderRadius: '6px',
                                                        cursor: 'default',
                                                        zIndex: 2,
                                                        fontWeight: 500,
                                                        transition: 'border-color 0.2s ease'
                                                    }}
                                                >
                                                    {tech}
                                                </motion.span>
                                            ))}
                                        </div>
                                    </div>
                                </SpotlightCard>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
};

export default Skills;
