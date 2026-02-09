import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Info } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import IndustrialBackground from './IndustrialBackground';
// DevOps & Cloud Icons from multiple sets to ensure availability
import { SiDocker, SiKubernetes, SiAnsible, SiJenkins, SiDatadog, SiAmazonwebservices, SiTerraform, SiGrafana, SiGithub } from 'react-icons/si';
import { VscAzure, VscTerminal } from 'react-icons/vsc';

// Gradient multi-color GCP-inspired cloud mark (approx)
const GcpGradientIcon = ({ size = 24 }) => (
    <svg
        width={size}
        height={size}
        // Tighter viewBox so the mark fills the same visual area as react-icons at the same `size`.
        viewBox="12 10 52 44"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        focusable="false"
        preserveAspectRatio="xMidYMid meet"
    >
        <defs>
            <linearGradient id="gcpGrad" x1="10" y1="18" x2="54" y2="46" gradientUnits="userSpaceOnUse">
                <stop offset="0" stopColor="#4285F4" />
                <stop offset="0.35" stopColor="#EA4335" />
                <stop offset="0.7" stopColor="#FBBC05" />
                <stop offset="1" stopColor="#34A853" />
            </linearGradient>
        </defs>

        <path
            d="M18 33C18 26 23.2 21 30 21C31.7 16.8 36 14 40.2 14C46.7 14 51.2 18.4 52.4 24.2C57.3 25.1 61 29.2 61 34.2C61 40.3 56.1 45 50 45H25.5C21.4 45 18 41.7 18 37.6C18 35 19.3 33 22 32"
            stroke="url(#gcpGrad)"
            strokeWidth={Math.max(3.6, size * 0.11)}
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.95"
        />
    </svg>
);

/**
 * DevOpsAtom: Upgraded with 3D-simulated kinetic orbits.
 * Ensures consistent spacing between icons and maintains upright orientation.
 */
const DevOpsAtom = ({ theme }) => {
    const desktopLeftOffset = '3%';
    const orbits = [
        {
            radius: 120,
            speed: 25,
            tools: [
                { Icon: SiDocker, color: '#2496ED' },
                { Icon: SiKubernetes, color: '#326CE5' },
                { Icon: SiAnsible, color: '#D10000' }
            ],
            direction: 1 // Clockwise
        },
        {
            radius: 200,
            speed: 35,
            tools: [
                { Icon: SiJenkins, color: theme.mode === 'dark' ? '#FFFFFF' : '#4A4A4A' },
                { Icon: SiGrafana, color: '#F05A28' },
                { Icon: VscTerminal, color: '#4AF626' }
            ],
            direction: -1 // Counter-clockwise
        },
        {
            radius: 280,
            speed: 45,
            tools: [
                { Icon: VscAzure, color: '#0078D4' },
                { Icon: SiAmazonwebservices, color: '#FF9900' },
                { Icon: GcpGradientIcon, color: '#4285F4' },
                { Icon: SiGithub, color: theme.mode === 'dark' ? '#FFFFFF' : '#1A1A1A' },
                { Icon: SiTerraform, color: '#7B42BC' }
            ],
            direction: 1 // Clockwise
        }
    ];

    return (
        <div style={{
            position: 'absolute',
            left: desktopLeftOffset,
            top: '50%',
            transform: 'translateY(-50%)',
            width: '600px',
            height: '600px',
            zIndex: 1,
            pointerEvents: 'none',
            perspective: '1200px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            {/* Core Nucleus Pulse */}
            <motion.div
                animate={{
                    scale: [1, 1.4, 1],
                    opacity: [0.3, 0.6, 0.3],
                    filter: ['blur(20px)', 'blur(35px)', 'blur(20px)']
                }}
                transition={{ duration: 4, repeat: Infinity }}
                style={{
                    width: '100px',
                    height: '100px',
                    background: 'radial-gradient(circle, var(--netflix-red) 0%, transparent 75%)',
                    borderRadius: '50%',
                    position: 'absolute',
                    zIndex: 0
                }}
            />

            {orbits.map((orbit, orbitIdx) => (
                <div key={orbitIdx} style={{ position: 'absolute', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {/* The Visual Orbit Strip */}
                    <motion.div
                        animate={{ rotate: 360 * orbit.direction }}
                        transition={{ duration: orbit.speed, repeat: Infinity, ease: "linear" }}
                        style={{
                            position: 'absolute',
                            width: orbit.radius * 2,
                            height: orbit.radius * 2,
                            borderRadius: '50%',
                            border: `1px solid ${theme.border}`,
                            borderTop: `2px solid ${orbitIdx % 2 === 0 ? theme.accent : (theme.mode === 'dark' ? theme.primaryText : theme.mutedText)}`,
                            borderBottom: `2px solid ${orbitIdx % 2 === 0 ? (theme.mode === 'dark' ? theme.primaryText : theme.mutedText) : theme.accent}`,
                            opacity: theme.mode === 'dark' ? 0.3 : 0.5,
                            boxShadow: theme.mode === 'dark' ? `0 0 20px ${theme.accent}1A` : `0 0 15px ${theme.accent}33`
                        }}
                    />

                    {/* Icons Rotating along the Strip */}
                    {orbit.tools.map((tool, toolIdx) => {
                        const angle = toolIdx * (360 / orbit.tools.length);
                        return (
                            <motion.div
                                key={toolIdx}
                                style={{
                                    position: 'absolute',
                                    width: '100%',
                                    height: '100%',
                                    transformStyle: 'preserve-3d'
                                }}
                                animate={{ rotate: 360 * orbit.direction }}
                                transition={{ duration: orbit.speed, repeat: Infinity, ease: "linear" }}
                            >
                                <div style={{
                                    position: 'absolute',
                                    left: '50%',
                                    top: '50%',
                                    transform: `translate(-50%, -50%) rotate(${angle}deg) translateX(${orbit.radius - 35}px)`
                                }}>
                                    <motion.div
                                        animate={{
                                            rotate: [-(angle + 0), -(angle + 360 * orbit.direction)],
                                            scale: [0.8, 1.1, 0.8],
                                            opacity: 1
                                        }}
                                        transition={{
                                            rotate: { duration: orbit.speed, repeat: Infinity, ease: "linear" },
                                            scale: { duration: 3, repeat: Infinity, ease: "easeInOut" },
                                            opacity: { duration: 0 }
                                        }}
                                        style={{
                                            color: tool.color,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            filter: `drop-shadow(0 0 10px ${tool.color}44)`
                                        }}
                                    >
                                        <tool.Icon size={38} />
                                    </motion.div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            ))}
        </div>
    );
};

const Hero = ({ data }) => {
    const { theme } = useTheme();
    const [isMobile, setIsMobile] = useState(false);
    const [isLandscape, setIsLandscape] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 1024);
            setIsLandscape(window.innerWidth > window.innerHeight && window.innerWidth < 1100);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <section id="home" style={{
            minHeight: '100vh',
            width: '100%',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            backgroundColor: theme.primaryBg,
            paddingTop: isMobile ? '80px' : '0',
            transition: 'background-color 0.3s ease'
        }}>
            <IndustrialBackground type="home" />

            {/* Bottom fade to blend Home into next panel */}
            <div
                style={{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    bottom: 0,
                    height: isMobile ? '120px' : '180px',
                    // Use a mask so only `backgroundColor` needs to transition (prevents a bottom-first flash on theme toggle).
                    backgroundColor: theme.primaryBg,
                    WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,1) 75%)',
                    maskImage: 'linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,1) 75%)',
                    pointerEvents: 'none',
                    zIndex: 2
                }}
                aria-hidden="true"
            />

            {/* DevOps Atom Cluster - Side-by-side in Landscape, Top in Portrait */}
            <div style={{
                position: 'absolute',
                left: isLandscape ? '0%' : (isMobile ? '50%' : '1%'),
                top: isLandscape ? '50%' : (isMobile ? '20%' : '50%'),
                transform: isLandscape ? 'translateY(-50%) scale(0.55)' : (isMobile ? 'translateX(-50%) scale(0.6)' : 'translateY(-50%)'),
                opacity: isMobile ? 0.35 : 1,
                transition: 'all 0.5s ease'
            }}>
                <DevOpsAtom theme={theme} />
            </div>

            <div className="container" style={{
                zIndex: 10,
                position: 'relative',
                width: '100%',
                display: 'flex',
                justifyContent: isLandscape ? 'flex-end' : 'center',
                padding: isMobile ? '0 15px' : '0 4%',
                paddingRight: isLandscape ? '5%' : (isMobile ? '15px' : '4%')
            }}>
                <div style={{
                    maxWidth: isLandscape ? '60%' : '1000px',
                    textAlign: isLandscape ? 'left' : 'center'
                }}>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                    >
                        {/* Name Headline - Professional Center Alignment */}
                        <h1 style={{
                            fontSize: 'clamp(2.5rem, 5vw, 4.2rem)',
                            fontWeight: '900',
                            color: theme.accent,
                            lineHeight: '1.05',
                            marginBottom: '20px',
                            letterSpacing: '-2px',
                            textShadow: theme.mode === 'dark' ? '0 10px 40px rgba(0,0,0,0.8)' : '0 4px 20px rgba(0,0,0,0.1)'
                        }}>
                            {data.name}
                        </h1>

                        {/* Title Badge */}
                        <div style={{
                            display: 'flex',
                            justifyContent: isLandscape ? 'flex-start' : 'center',
                            marginBottom: '20px'
                        }}>
                            <div style={{
                                display: 'inline-block',
                                background: theme.mode === 'dark' ? 'rgba(20, 20, 20, 0.85)' : 'rgba(255, 255, 255, 0.9)',
                                backdropFilter: 'blur(15px)',
                                border: `1px solid ${theme.borderAccent}`,
                                padding: '8px 25px',
                                borderRadius: '50px',
                                boxShadow: theme.cardShadow
                            }}>
                                <span style={{
                                    fontSize: 'clamp(0.8rem, 1.2vw, 1.1rem)',
                                    fontWeight: '700',
                                    color: theme.primaryText,
                                    textTransform: 'uppercase',
                                    letterSpacing: '3px'
                                }}>
                                    Cloud Architect
                                    <span style={{ color: theme.accent, margin: '0 15px' }}>|</span>
                                    DevOps Engineer
                                </span>
                            </div>
                        </div>

                        {/* Certifications Row - Professional Alignment */}
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '12px',
                            alignItems: isLandscape ? 'flex-start' : 'center',
                            marginBottom: '40px'
                        }}>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '15px',
                                background: theme.cardBg,
                                backdropFilter: theme.navBlur,
                                padding: '8px 20px',
                                borderRadius: '50px',
                                border: '1px solid rgba(255, 153, 0, 0.3)',
                                fontSize: '1.01rem',
                                color: theme.secondaryText
                            }}>
                                <SiAmazonwebservices color="#FF9900" size={28} />
                                <span>Certified in <span style={{ color: theme.primaryText, fontWeight: '700' }}>AWS Solution Architect Associate</span> (SAA-C03)</span>
                            </div>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '15px',
                                background: theme.cardBg,
                                backdropFilter: theme.navBlur,
                                padding: '8px 20px',
                                borderRadius: '50px',
                                border: '1px solid rgba(0, 120, 212, 0.3)',
                                fontSize: '1.01rem',
                                color: theme.secondaryText
                            }}>
                                <VscAzure color="#0078D4" size={26} />
                                <span>Certified in <span style={{ color: theme.primaryText, fontWeight: '700' }}>Azure Fundamentals</span> (AZ-900)</span>
                            </div>
                        </div>

                        {/* Description Paragraph - Smaller Font, Centered, High Impact 4-Line */}
                        <div style={{
                            fontSize: 'clamp(0.85rem, 1.3vw, 1.15rem)',
                            lineHeight: '1.6',
                            color: theme.secondaryText,
                            maxWidth: '750px',
                            marginBottom: '40px',
                            marginRight: isLandscape ? '0' : 'auto',
                            marginLeft: isLandscape ? '0' : 'auto',
                            fontWeight: '400',
                            textAlign: isLandscape ? 'left' : 'center',
                            background: theme.glassBg,
                            backdropFilter: 'blur(20px)',
                            padding: '25px 35px',
                            borderRadius: '24px',
                            border: `1px solid ${theme.border}`,
                            boxShadow: theme.cardShadow
                        }}>
                            <p style={{ marginBottom: '6px', fontSize: '1.2rem', fontWeight: '400', color: theme.primaryText, letterSpacing: '1px' }}>
                                Transforming <span style={{ color: theme.accent, fontWeight: '700' }}>Infrastructure</span> into Excellence
                            </p>
                            <p style={{ marginBottom: '6px', lineHeight: '1.5' }}><span style={{ color: theme.accent, fontWeight: '700' }}>6+</span> years architecting resilient <span style={{ fontWeight: '700' }}>multi-cloud</span> <span style={{ fontWeight: '700' }}>ecosystems</span> on <span style={{ color: theme.accent, fontWeight: '700' }}>AWS</span>, <span style={{ color: theme.accent, fontWeight: '700' }}>Azure</span>, and <span style={{ color: theme.accent, fontWeight: '700' }}>GCP</span>.</p>
                            <p style={{ marginBottom: '6px', lineHeight: '1.5' }}>Expert in <span style={{ color: theme.accent, fontWeight: '700' }}>CI/CD</span> <span style={{ fontWeight: '700' }}>automation</span>, <span style={{ color: theme.accent, fontWeight: '700' }}>Kubernetes</span> <span style={{ fontWeight: '700' }}>orchestration</span>, <span style={{ color: theme.accent, fontWeight: '700' }}>Terraform</span> and <span style={{ color: theme.primaryText, fontWeight: '700' }}>infrastructure-as-code.</span></p>
                            <p style={{ marginBottom: '6px', lineHeight: '1.5' }}><span style={{ fontWeight: '700' }}>Specialist in</span> <span style={{ color: theme.accent, fontWeight: '700' }}>DevSecOps</span> practices and <span style={{ color: theme.accent, fontWeight: '700' }}>security</span> architecture.</p>
                            <p style={{ marginBottom: 0, lineHeight: '1.5' }}>Enabling <span style={{ color: theme.accent, fontWeight: '700' }}>high-velocity</span> engineering teams with world-class <span style={{ fontWeight: '700' }}>operational systems</span>.</p>
                        </div>

                        {/* Centered Buttons */}
                        <div style={{ display: 'flex', gap: '25px', flexWrap: 'wrap', justifyContent: 'center' }}>
                            <button
                                onClick={() => document.getElementById('experience').scrollIntoView({ behavior: 'smooth' })}
                                className="netflix-btn"
                                style={{
                                    padding: '18px 45px',
                                    fontSize: '1.1rem',
                                    borderRadius: '12px',
                                    background: theme.glassBg,
                                    backdropFilter: 'blur(15px)',
                                    color: theme.primaryText,
                                    border: `1px solid ${theme.borderAccent}`,
                                    boxShadow: `0 0 20px ${theme.accent}1A`,
                                    transition: 'all 0.3s ease',
                                    cursor: 'pointer',
                                    fontWeight: '600',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '10px'
                                }}
                                onMouseOver={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-3px)';
                                    e.currentTarget.style.background = `${theme.accent}1A`;
                                    e.currentTarget.style.boxShadow = `0 0 30px ${theme.accent}4D`;
                                }}
                                onMouseOut={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.background = theme.glassBg;
                                    e.currentTarget.style.boxShadow = `0 0 20px ${theme.accent}1A`;
                                }}
                            >
                                <Info size={16} color={theme.accent} /> Career Path
                            </button>
                            <button
                                onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
                                className="netflix-btn"
                                style={{
                                    padding: '18px 45px',
                                    fontSize: '1.1rem',
                                    borderRadius: '12px',
                                    background: theme.mode === 'dark' ? 'rgba(255, 255, 255, 0.9)' : theme.accent,
                                    color: theme.mode === 'dark' ? '#000' : '#fff',
                                    border: `1px solid ${theme.border}`,
                                    boxShadow: theme.mode === 'dark' ? '0 10px 30px rgba(255, 255, 255, 0.1)' : `0 10px 30px ${theme.accent}33`,
                                    transition: 'all 0.3s ease',
                                    cursor: 'pointer',
                                    fontWeight: '600',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '10px'
                                }}
                                onMouseOver={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-3px)';
                                    e.currentTarget.style.boxShadow = theme.mode === 'dark' ? '0 15px 40px rgba(255, 255, 255, 0.2)' : `0 15px 40px ${theme.accent}55`;
                                }}
                                onMouseOut={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = theme.mode === 'dark' ? '0 10px 30px rgba(255, 255, 255, 0.1)' : `0 10px 30px ${theme.accent}33`;
                                }}
                            >
                                <Play fill={theme.mode === 'dark' ? 'black' : 'white'} size={16} /> Let's Talk
                            </button>
                        </div>
                    </motion.div>
                </div>
            </div>

        </section>
    );
};

export default Hero;
