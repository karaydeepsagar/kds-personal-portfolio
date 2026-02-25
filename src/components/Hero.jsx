import React, { useState, useEffect, useId } from 'react';
import { motion } from 'framer-motion';
import { Play, Info, Download, CheckCircle } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import IndustrialBackground from './IndustrialBackground';
import { useBreakpoint, shouldReduceAnimations } from '../hooks/useBreakpoint';
// DevOps & Cloud Icons from multiple sets to ensure availability
import { SiDocker, SiKubernetes, SiAnsible, SiJenkins, SiDatadog, SiAmazonwebservices, SiTerraform, SiGrafana, SiGithub } from 'react-icons/si';
import { VscAzure, VscTerminal } from 'react-icons/vsc';

// Gradient multi-color GCP-inspired cloud mark (approx)
// Uses useId() to generate a unique gradient ID per instance, preventing
// SVG <defs> ID collisions when multiple instances exist in the DOM.
const GcpGradientIcon = ({ size = 24 }) => {
    const uid = useId();
    const gradId = `gcpGrad-${uid.replace(/:/g, '')}`;
    return (
        <svg
            width={size}
            height={size}
            viewBox="12 10 52 44"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            focusable="false"
            preserveAspectRatio="xMidYMid meet"
        >
            <defs>
                <linearGradient id={gradId} x1="10" y1="18" x2="54" y2="46" gradientUnits="userSpaceOnUse">
                    <stop offset="0" stopColor="#4285F4" />
                    <stop offset="0.35" stopColor="#EA4335" />
                    <stop offset="0.7" stopColor="#FBBC05" />
                    <stop offset="1" stopColor="#34A853" />
                </linearGradient>
            </defs>

            <path
                d="M18 33C18 26 23.2 21 30 21C31.7 16.8 36 14 40.2 14C46.7 14 51.2 18.4 52.4 24.2C57.3 25.1 61 29.2 61 34.2C61 40.3 56.1 45 50 45H25.5C21.4 45 18 41.7 18 37.6C18 35 19.3 33 22 32"
                stroke={`url(#${gradId})`}
                strokeWidth={Math.max(3.6, size * 0.11)}
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity="0.95"
            />
        </svg>
    );
};

/**
 * DevOpsAtom: Upgraded with 3D-simulated kinetic orbits.
 * Ensures consistent spacing between icons and maintains upright orientation.
 */
const DevOpsAtom = ({ theme, isActive = true }) => {
    const desktopLeftOffset = '3%';
    const { isMobile } = useBreakpoint();

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
                
                { Icon: SiDatadog, color: '#b602ce' },
                { Icon: SiAmazonwebservices, color: '#FF9900' },
                { Icon: VscAzure, color: '#0078D4' },
                { Icon: GcpGradientIcon, color: '#4285F4' },
                { Icon: SiGithub, color: theme.mode === 'dark' ? '#FFFFFF' : '#1A1A1A' },
                { Icon: SiTerraform, color: '#7B42BC' }
            ],
            direction: 1 // Clockwise
        }
    ];

    // On low-power devices / TVs, skip all orbit animations and just show static icons
    if (shouldReduceAnimations) {
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
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                opacity: 0.5
            }}>
                <div style={{
                    width: '100px',
                    height: '100px',
                    background: 'radial-gradient(circle, #b9090b 0%, transparent 70%)',
                    borderRadius: '50%',
                    filter: 'blur(20px)',
                    opacity: 0.6
                }} />
            </div>
        );
    }

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
            justifyContent: 'center',
            opacity: isActive ? 1 : 0
        }}>
            {/* Core Nucleus Pulse */}
            {isActive && (
                <motion.div
                    animate={{
                        scale: [1, 1.4, 1],
                        opacity: [0.3, 0.6, 0.3],
                        filter: isMobile ? ['blur(10px)', 'blur(20px)', 'blur(10px)'] : ['blur(20px)', 'blur(35px)', 'blur(20px)']
                    }}
                    transition={{ duration: 4, repeat: Infinity }}
                    style={{
                        width: '100px',
                        height: '100px',
                        background: 'radial-gradient(circle, #b9090b 0%, transparent 70%)',
                        borderRadius: '50%',
                        position: 'absolute',
                        zIndex: 0,
                        opacity: 0.8
                    }}
                />
            )}

            {isActive && orbits.map((orbit, orbitIdx) => (
                <div key={orbitIdx} style={{ position: 'absolute', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    
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
                                            scale: [0.8, 1.1, 0.8]
                                        }}
                                        transition={{
                                            rotate: { duration: orbit.speed, repeat: Infinity, ease: "linear" },
                                            scale: { duration: 3, repeat: Infinity, ease: "easeInOut" }
                                        }}
                                        style={{
                                            color: tool.color,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            filter: isMobile ? 'none' : `drop-shadow(0 0 10px ${tool.color}44)`
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
    const { isTablet: isMobile, isLandscape } = useBreakpoint();
    const [isInView, setIsInView] = useState(true);
    const sectionRef = React.useRef(null);

    useEffect(() => {
        // Smart animation pause using Intersection Observer
        const observer = new IntersectionObserver(
            ([entry]) => setIsInView(entry.isIntersecting),
            { threshold: 0.1 }
        );
        if (sectionRef.current) observer.observe(sectionRef.current);

        return () => observer.disconnect();
    }, []);

    return (
        <section ref={sectionRef} id="home" style={{
            minHeight: '100vh',
            width: '100%',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            backgroundColor: theme.primaryBg,
            paddingTop: isMobile ? '80px' : '0',
            transition: 'background-color 0.3s ease',
            contain: 'paint' // Optimize rendering boundaries
        }}>
            <IndustrialBackground type="home" isActive={isInView} />

            {/* DevOps Atom Cluster - Side-by-side in Landscape, Top in Portrait */}
            <div style={{
                position: 'absolute',
                left: isLandscape ? '0%' : (isMobile ? '50%' : '1%'),
                top: isLandscape ? '50%' : (isMobile ? '28%' : '50%'), // Adjusted mobile top to center it better 
                transform: isLandscape ? 'translateY(-50%) scale(0.55)' : (isMobile ? 'translateX(-50%) scale(0.65)' : 'translateY(-50%) scale(0.97)'), // Increased mobile scale slightly
                // Unified opacity: High visibility on all devices as requested
                opacity: isInView ? 1 : 0, 
                transition: 'all 0.5s ease',
                willChange: 'transform' // Consolidated hardware acceleration hint
            }}>
                <DevOpsAtom theme={theme} isActive={isInView} />
            </div>

            <div className="container" style={{
                zIndex: 10,
                position: 'relative',
                width: '100%',
                display: 'flex',
                justifyContent: isLandscape ? 'flex-end' : 'center',
                paddingLeft: isMobile ? '15px' : '4%',
                paddingRight: isLandscape ? '5%' : (isMobile ? '15px' : '4%'),
                // Push content down on desktop to avoid nav overlap while keeping it roughly centered
                marginTop: isMobile ? '40px' : '100px'
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
                            fontSize: 'clamp(2.35rem, 4.7vw, 3.95rem)', // Decreased by ~6%
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
                            <motion.div
                                whileHover={{ y: -5 }}
                                style={{
                                    display: 'inline-block',
                                    background: theme.mode === 'dark' ? 'rgba(20, 20, 20, 0.85)' : 'rgba(255, 255, 255, 0.9)',
                                    backdropFilter: 'blur(15px)',
                                    border: `1px solid ${theme.borderAccent}`,
                                    padding: '8px 25px',
                                    borderRadius: '50px',
                                    boxShadow: theme.cardShadow,
                                    cursor: 'default'
                                }}
                            >
                                <span style={{
                                    fontSize: 'clamp(0.75rem, 1.13vw, 1.03rem)', // Decreased by ~6%
                                    fontWeight: '700',
                                    color: theme.primaryText,
                                    textTransform: 'uppercase',
                                    letterSpacing: '3px'
                                }}>
                                    Cloud Architect
                                    <span style={{ color: theme.accent, margin: '0 15px' }}>|</span>
                                    DevOps Engineer
                                </span>
                            </motion.div>
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
                                fontSize: '0.95rem', // Decreased by ~6%
                                color: theme.secondaryText
                            }}>
                                <SiAmazonwebservices color="#FF9900" size={26} />
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
                                fontSize: '0.95rem', // Decreased by ~6%
                                color: theme.secondaryText
                            }}>
                                <VscAzure color="#0078D4" size={26} />
                                <span>Certified in <span style={{ color: theme.primaryText, fontWeight: '700' }}>Azure Fundamentals</span> (AZ-900)</span>
                            </div>
                        </div>

                        {/* Description Paragraph - Smaller Font, Centered, High Impact 4-Line */}
                        <div style={{
                            fontSize: 'clamp(0.8rem, 1.22vw, 1.08rem)', // Decreased by ~6%
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
                            <p style={{ marginBottom: '6px', fontSize: '1.13rem', fontWeight: '400', color: theme.primaryText, letterSpacing: '1px' }}>
                                Transforming <span style={{ color: theme.accent, fontWeight: '700' }}>Infrastructure</span> into Excellence
                            </p>
                            <p style={{ marginBottom: '6px', lineHeight: '1.5' }}><span style={{ color: theme.accent, fontWeight: '700' }}>5+</span> years architecting resilient <span style={{ fontWeight: '700' }}>multi-cloud</span> <span style={{ fontWeight: '700' }}>ecosystems</span> on <span style={{ color: theme.accent, fontWeight: '700' }}>AWS</span>, <span style={{ color: theme.accent, fontWeight: '700' }}>Azure</span>, and <span style={{ color: theme.accent, fontWeight: '700' }}>GCP</span>.</p>
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
                                    padding: '12px 28px',
                                    fontSize: '0.9rem',
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
                                    gap: '8px'
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
                                <Info size={13} color={theme.accent} /> Career Path
                            </button>
                            <a
                                href="/Resume.pdf"
                                download="Deep_Sagar_Karay_Resume.pdf"
                                className="netflix-btn"
                                style={{
                                    padding: '12px 28px',
                                    fontSize: '0.9rem',
                                    borderRadius: '12px',
                                    background: theme.glassBg,
                                    color: theme.primaryText,
                                    border: `1px solid ${theme.borderAccent}`,
                                    boxShadow: `0 0 20px ${theme.accent}1A`,
                                    transition: 'all 0.3s ease',
                                    fontWeight: '600',
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    textDecoration: 'none',
                                    backdropFilter: 'blur(15px)',
                                    cursor: 'pointer'
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
                                <Download size={13} color={theme.accent} /> Resume
                            </a>
                            <button
                                onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
                                className="netflix-btn"
                                style={{
                                    padding: '12px 28px',
                                    fontSize: '0.9rem',
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
                                    gap: '8px'
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
                                <Play size={13} color={theme.accent} /> Let's Talk
                            </button>
                        </div>
                    </motion.div>
                </div>
            </div>

        </section>
    );
};

export default Hero;
