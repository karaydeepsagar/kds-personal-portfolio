import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Info, Download, CheckCircle } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import IndustrialBackground from './IndustrialBackground';
import { useBreakpoint, shouldReduceAnimations } from '../hooks/useBreakpoint';
// DevOps & Cloud Icons from multiple sets to ensure availability
import { SiDocker, SiKubernetes, SiAnsible, SiJenkins, SiDatadog, SiTerraform, SiGrafana, SiGithub } from 'react-icons/si';
import { VscAzure, VscTerminal } from 'react-icons/vsc';

// Official GCP icon (4-colour logo)
const GcpGradientIcon = ({ size = 24 }) => (
    <svg width={size} height={size} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" aria-hidden="true">
        <path fill="#ea4535" d="M80.6 40.3h.4l-.2-.2 14-14v-.3c-11.8-10.4-28.1-14-43.2-9.5C36.5 20.8 24.9 32.8 20.7 48c.2-.1.5-.2.8-.2 5.2-3.4 11.4-5.4 17.9-5.4 2.2 0 4.3.2 6.4.6.1-.1.2-.1.3-.1 9-9.9 24.2-11.1 34.6-2.6h-.1z"/>
        <path fill="#557ebf" d="M108.1 47.8c-2.3-8.5-7.1-16.2-13.8-22.1L80 39.9c6 4.9 9.5 12.3 9.3 20v2.5c16.9 0 16.9 25.2 0 25.2H63.9v20h-.1l.1.2h25.4c14.6.1 27.5-9.3 31.8-23.1 4.3-13.8-1-28.8-13-36.9z"/>
        <path fill="#36a852" d="M39 107.9h26.3V87.7H39c-1.9 0-3.7-.4-5.4-1.1l-15.2 14.6v.2c6 4.3 13.2 6.6 20.7 6.6z"/>
        <path fill="#f9bc15" d="M40.2 41.9c-14.9.1-28.1 9.3-32.9 22.8-4.8 13.6 0 28.5 11.8 37.3l15.6-14.9c-8.6-3.7-10.6-14.5-4-20.8 6.6-6.4 17.8-4.4 21.7 3.8L68 55.2C61.4 46.9 51.1 42 40.2 42.1z"/>
    </svg>
);

// Theme-aware AWS icon: letterforms adapt to dark/light, orange smile stays constant
const AwsThemedIcon = ({ size = 24 }) => {
    const { theme } = useTheme();
    const textColor = theme.mode === 'dark' ? '#FFFFFF' : '#232F3E';
    return (
        <svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg" width={size} height={size} aria-hidden="true">
            <path fill={textColor} d="M36.379 53.64c0 1.56.168 2.825.465 3.75.336.926.758 1.938 1.347 3.032.207.336.293.672.293.969 0 .418-.254.84-.8 1.261l-2.653 1.77c-.379.25-.758.379-1.093.379-.422 0-.844-.211-1.266-.59a13.28 13.28 0 0 1-1.516-1.98 34.153 34.153 0 0 1-1.304-2.485c-3.282 3.875-7.41 5.813-12.38 5.813-3.535 0-6.355-1.012-8.421-3.032-2.063-2.023-3.114-4.718-3.114-8.086 0-3.578 1.262-6.484 3.833-8.671 2.566-2.192 5.976-3.286 10.316-3.286 1.43 0 2.902.125 4.46.336 1.56.211 3.161.547 4.845.926v-3.074c0-3.2-.676-5.43-1.98-6.734C26.061 32.633 23.788 32 20.546 32c-1.473 0-2.988.168-4.547.547a33.416 33.416 0 0 0-4.547 1.433c-.676.293-1.18.461-1.473.547-.296.082-.507.125-.675.125-.59 0-.883-.422-.883-1.304v-2.063c0-.676.082-1.18.293-1.476.21-.293.59-.586 1.18-.883 1.472-.758 3.242-1.39 5.304-1.895 2.063-.547 4.254-.8 6.57-.8 5.008 0 8.672 1.136 11.032 3.41 2.316 2.273 3.492 5.726 3.492 10.359v13.64Zm-17.094 6.403c1.387 0 2.82-.254 4.336-.758 1.516-.508 2.863-1.433 4-2.695.672-.8 1.18-1.684 1.43-2.695.254-1.012.422-2.23.422-3.665v-1.765a34.401 34.401 0 0 0-3.871-.719 31.816 31.816 0 0 0-3.961-.25c-2.82 0-4.883.547-6.274 1.684-1.387 1.136-2.062 2.734-2.062 4.84 0 1.98.504 3.453 1.558 4.464 1.012 1.051 2.485 1.559 4.422 1.559Zm33.809 4.547c-.758 0-1.262-.125-1.598-.422-.34-.254-.633-.84-.887-1.64L40.715 29.98c-.25-.843-.38-1.39-.38-1.687 0-.672.337-1.05 1.013-1.05h4.125c.8 0 1.347.124 1.644.421.336.25.59.84.84 1.64l7.074 27.876 6.57-27.875c.208-.84.462-1.39.797-1.64.34-.255.93-.423 1.688-.423h3.367c.8 0 1.348.125 1.684.422.336.25.633.84.8 1.64l6.653 28.212 7.285-28.211c.25-.84.547-1.39.84-1.64.336-.255.887-.423 1.644-.423h3.914c.676 0 1.055.336 1.055 1.051 0 .21-.043.422-.086.676-.043.254-.125.59-.293 1.05L80.801 62.57c-.254.84-.547 1.387-.887 1.64-.336.255-.883.423-1.598.423h-3.62c-.801 0-1.348-.13-1.684-.422-.34-.297-.633-.844-.801-1.684l-6.527-27.16-6.485 27.117c-.21.844-.46 1.391-.8 1.684-.337.297-.926.422-1.684.422Zm54.105 1.137c-2.187 0-4.379-.254-6.484-.758-2.106-.504-3.746-1.055-4.84-1.684-.676-.379-1.137-.8-1.305-1.18a2.919 2.919 0 0 1-.254-1.18v-2.148c0-.882.336-1.304.97-1.304.25 0 .503.043.757.129.25.082.629.25 1.05.418a23.102 23.102 0 0 0 4.634 1.476c1.683.336 3.324.504 5.011.504 2.653 0 4.715-.465 6.145-1.39 1.433-.926 2.191-2.274 2.191-4 0-1.18-.379-2.145-1.136-2.946-.758-.8-2.192-1.516-4.254-2.191l-6.106-1.895c-3.074-.969-5.348-2.398-6.734-4.293-1.39-1.855-2.106-3.918-2.106-6.105 0-1.77.38-3.328 1.137-4.676a10.829 10.829 0 0 1 3.031-3.453c1.262-.965 2.696-1.684 4.38-2.188 1.683-.504 3.452-.715 5.304-.715.926 0 1.894.043 2.82.168.969.125 1.852.293 2.738.461.84.211 1.641.422 2.399.676.758.254 1.348.504 1.77.758.59.336 1.011.672 1.261 1.05.254.34.379.802.379 1.391v1.98c0 .884-.336 1.348-.969 1.348-.336 0-.883-.171-1.597-.507-2.403-1.094-5.098-1.641-8.086-1.641-2.399 0-4.293.379-5.598 1.18-1.309.797-1.98 2.02-1.98 3.746 0 1.18.421 2.191 1.261 2.988.844.8 2.403 1.602 4.633 2.316l5.98 1.895c3.032.969 5.22 2.316 6.524 4.043 1.305 1.727 1.938 3.707 1.938 5.895 0 1.812-.38 3.453-1.094 4.882-.758 1.434-1.77 2.696-3.074 3.707-1.305 1.051-2.864 1.809-4.672 2.36-1.895.586-3.875.883-6.024.883Zm0 0"/>
            <path fill="#FF9900" d="M118 73.348c-4.432.063-9.664 1.052-13.621 3.832-1.223.883-1.012 2.062.336 1.894 4.508-.547 14.44-1.726 16.21.547 1.77 2.23-1.976 11.62-3.663 15.79-.504 1.26.59 1.769 1.726.8 7.41-6.231 9.348-19.242 7.832-21.137-.757-.925-4.388-1.79-8.82-1.726zM1.63 75.859c-.927.116-1.347 1.236-.368 2.121 16.508 14.902 38.359 23.872 62.613 23.872 17.305 0 37.43-5.43 51.281-15.66 2.273-1.688.297-4.254-2.02-3.204-15.534 6.57-32.421 9.77-47.788 9.77-22.778 0-44.8-6.273-62.653-16.633-.39-.231-.755-.304-1.064-.266z"/>
        </svg>
    );
};

/**
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
                { Icon: SiDocker, color: '#61b1ed' },
                { Icon: SiKubernetes, color: '#1b53cc' },
                { Icon: SiAnsible, color: '#B22222' }
            ],
            direction: 1 // Clockwise
        },
        {
            radius: 200,
            speed: 35,
            tools: [
                { Icon: SiGrafana, color: '#fd5234' },
                { Icon: VscTerminal, color: '#4AF626' },
                { Icon: SiDatadog, color: '#632CA6' }
            ],
            direction: -1 // Counter-clockwise
        },
        {
            radius: 280,
            speed: 45,
            tools: [
                { Icon: SiJenkins, color: theme.mode === 'dark' ? '#FFFFFF' : '#4A4A4A' },
                { Icon: AwsThemedIcon, color: '#FF9900' },
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
                                <svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg" width={28} height={28} style={{ flexShrink: 0 }}>
                                    <path fill={theme.primaryText} d="M36.379 53.64c0 1.56.168 2.825.465 3.75.336.926.758 1.938 1.347 3.032.207.336.293.672.293.969 0 .418-.254.84-.8 1.261l-2.653 1.77c-.379.25-.758.379-1.093.379-.422 0-.844-.211-1.266-.59a13.28 13.28 0 0 1-1.516-1.98 34.153 34.153 0 0 1-1.304-2.485c-3.282 3.875-7.41 5.813-12.38 5.813-3.535 0-6.355-1.012-8.421-3.032-2.063-2.023-3.114-4.718-3.114-8.086 0-3.578 1.262-6.484 3.833-8.671 2.566-2.192 5.976-3.286 10.316-3.286 1.43 0 2.902.125 4.46.336 1.56.211 3.161.547 4.845.926v-3.074c0-3.2-.676-5.43-1.98-6.734C26.061 32.633 23.788 32 20.546 32c-1.473 0-2.988.168-4.547.547a33.416 33.416 0 0 0-4.547 1.433c-.676.293-1.18.461-1.473.547-.296.082-.507.125-.675.125-.59 0-.883-.422-.883-1.304v-2.063c0-.676.082-1.18.293-1.476.21-.293.59-.586 1.18-.883 1.472-.758 3.242-1.39 5.304-1.895 2.063-.547 4.254-.8 6.57-.8 5.008 0 8.672 1.136 11.032 3.41 2.316 2.273 3.492 5.726 3.492 10.359v13.64Zm-17.094 6.403c1.387 0 2.82-.254 4.336-.758 1.516-.508 2.863-1.433 4-2.695.672-.8 1.18-1.684 1.43-2.695.254-1.012.422-2.23.422-3.665v-1.765a34.401 34.401 0 0 0-3.871-.719 31.816 31.816 0 0 0-3.961-.25c-2.82 0-4.883.547-6.274 1.684-1.387 1.136-2.062 2.734-2.062 4.84 0 1.98.504 3.453 1.558 4.464 1.012 1.051 2.485 1.559 4.422 1.559Zm33.809 4.547c-.758 0-1.262-.125-1.598-.422-.34-.254-.633-.84-.887-1.64L40.715 29.98c-.25-.843-.38-1.39-.38-1.687 0-.672.337-1.05 1.013-1.05h4.125c.8 0 1.347.124 1.644.421.336.25.59.84.84 1.64l7.074 27.876 6.57-27.875c.208-.84.462-1.39.797-1.64.34-.255.93-.423 1.688-.423h3.367c.8 0 1.348.125 1.684.422.336.25.633.84.8 1.64l6.653 28.212 7.285-28.211c.25-.84.547-1.39.84-1.64.336-.255.887-.423 1.644-.423h3.914c.676 0 1.055.336 1.055 1.051 0 .21-.043.422-.086.676-.043.254-.125.59-.293 1.05L80.801 62.57c-.254.84-.547 1.387-.887 1.64-.336.255-.883.423-1.598.423h-3.62c-.801 0-1.348-.13-1.684-.422-.34-.297-.633-.844-.801-1.684l-6.527-27.16-6.485 27.117c-.21.844-.46 1.391-.8 1.684-.337.297-.926.422-1.684.422Zm54.105 1.137c-2.187 0-4.379-.254-6.484-.758-2.106-.504-3.746-1.055-4.84-1.684-.676-.379-1.137-.8-1.305-1.18a2.919 2.919 0 0 1-.254-1.18v-2.148c0-.882.336-1.304.97-1.304.25 0 .503.043.757.129.25.082.629.25 1.05.418a23.102 23.102 0 0 0 4.634 1.476c1.683.336 3.324.504 5.011.504 2.653 0 4.715-.465 6.145-1.39 1.433-.926 2.191-2.274 2.191-4 0-1.18-.379-2.145-1.136-2.946-.758-.8-2.192-1.516-4.254-2.191l-6.106-1.895c-3.074-.969-5.348-2.398-6.734-4.293-1.39-1.855-2.106-3.918-2.106-6.105 0-1.77.38-3.328 1.137-4.676a10.829 10.829 0 0 1 3.031-3.453c1.262-.965 2.696-1.684 4.38-2.188 1.683-.504 3.452-.715 5.304-.715.926 0 1.894.043 2.82.168.969.125 1.852.293 2.738.461.84.211 1.641.422 2.399.676.758.254 1.348.504 1.77.758.59.336 1.011.672 1.261 1.05.254.34.379.802.379 1.391v1.98c0 .884-.336 1.348-.969 1.348-.336 0-.883-.171-1.597-.507-2.403-1.094-5.098-1.641-8.086-1.641-2.399 0-4.293.379-5.598 1.18-1.309.797-1.98 2.02-1.98 3.746 0 1.18.421 2.191 1.261 2.988.844.8 2.403 1.602 4.633 2.316l5.98 1.895c3.032.969 5.22 2.316 6.524 4.043 1.305 1.727 1.938 3.707 1.938 5.895 0 1.812-.38 3.453-1.094 4.882-.758 1.434-1.77 2.696-3.074 3.707-1.305 1.051-2.864 1.809-4.672 2.36-1.895.586-3.875.883-6.024.883Zm0 0"/>
                                    <path fill="#f90" d="M118 73.348c-4.432.063-9.664 1.052-13.621 3.832-1.223.883-1.012 2.062.336 1.894 4.508-.547 14.44-1.726 16.21.547 1.77 2.23-1.976 11.62-3.663 15.79-.504 1.26.59 1.769 1.726.8 7.41-6.231 9.348-19.242 7.832-21.137-.757-.925-4.388-1.79-8.82-1.726zM1.63 75.859c-.927.116-1.347 1.236-.368 2.121 16.508 14.902 38.359 23.872 62.613 23.872 17.305 0 37.43-5.43 51.281-15.66 2.273-1.688.297-4.254-2.02-3.204-15.534 6.57-32.421 9.77-47.788 9.77-22.778 0-44.8-6.273-62.653-16.633-.39-.231-.755-.304-1.064-.266z"/>
                                </svg>
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
                                    e.currentTarget.style.background = theme.mode === 'dark' ? '#FFFFFF' : theme.accent;
                                    e.currentTarget.style.color = theme.mode === 'dark' ? '#141414' : '#FFFFFF';
                                    e.currentTarget.style.borderColor = theme.mode === 'dark' ? '#FFFFFF' : theme.accent;
                                    e.currentTarget.style.boxShadow = theme.mode === 'dark' ? '0 0 30px rgba(255,255,255,0.3)' : `0 0 30px ${theme.accent}4D`;
                                }}
                                onMouseOut={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.background = theme.glassBg;
                                    e.currentTarget.style.color = theme.primaryText;
                                    e.currentTarget.style.borderColor = theme.borderAccent;
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
                                    e.currentTarget.style.background = theme.mode === 'dark' ? '#FFFFFF' : theme.accent;
                                    e.currentTarget.style.color = theme.mode === 'dark' ? '#141414' : '#FFFFFF';
                                    e.currentTarget.style.borderColor = theme.mode === 'dark' ? '#FFFFFF' : theme.accent;
                                    e.currentTarget.style.boxShadow = theme.mode === 'dark' ? '0 0 30px rgba(255,255,255,0.3)' : `0 0 30px ${theme.accent}4D`;
                                }}
                                onMouseOut={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.background = theme.glassBg;
                                    e.currentTarget.style.color = theme.primaryText;
                                    e.currentTarget.style.borderColor = theme.borderAccent;
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
                                    e.currentTarget.style.background = theme.mode === 'dark' ? '#FFFFFF' : theme.accent;
                                    e.currentTarget.style.color = theme.mode === 'dark' ? '#141414' : '#FFFFFF';
                                    e.currentTarget.style.borderColor = theme.mode === 'dark' ? '#FFFFFF' : theme.accent;
                                    e.currentTarget.style.boxShadow = theme.mode === 'dark' ? '0 0 30px rgba(255,255,255,0.3)' : `0 0 30px ${theme.accent}4D`;
                                }}
                                onMouseOut={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.background = theme.glassBg;
                                    e.currentTarget.style.color = theme.primaryText;
                                    e.currentTarget.style.borderColor = theme.borderAccent;
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
