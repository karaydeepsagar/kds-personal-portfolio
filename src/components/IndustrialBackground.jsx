import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    Cloud, Server, Database, Globe, Shield, Terminal,
    Code2, Activity, Cpu, Share2, Settings, Box,
    Lock, Zap, Layout, Monitor, MessageSquare
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

/**
 * IndustrialBackground: Versatile background component for various sections.
 * Features a signature rotating ring, infinity loop, and context-aware icons.
 */
const IndustrialBackground = ({ type, variant = 'full', side = 'right' }) => {
    const { theme } = useTheme();
    const [isMobile, setIsMobile] = useState(false);
    const [viewportWidth, setViewportWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1440);

    useEffect(() => {
        const handleResize = () => {
            setViewportWidth(window.innerWidth);
            setIsMobile(window.innerWidth < 1024);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Technical Expertise (skills) panel should not have the right-side animation/background.
    if (type === 'skills') return null;

    const infinityPath = 'M 400,200 C 400,100 550,100 600,200 C 650,300 800,300 800,200 C 800,100 650,100 600,200 C 550,300 400,300 400,200 Z';

    const getTheme = () => {
        switch (type) {
            case 'projects':
                return {
                    icons: [Code2, Layout, Box, Monitor],
                    mainColor: theme.accent,
                    secondaryColor: theme.border,
                    opacity: 0.4
                };
            case 'experience':
                return {
                    icons: [Server, Activity, Cpu, Share2],
                    mainColor: theme.primaryText,
                    secondaryColor: theme.accent,
                    opacity: 0.3
                };
            case 'blog':
                return {
                    icons: [Globe, Lock, MessageSquare, Zap],
                    mainColor: theme.accent,
                    secondaryColor: theme.mutedText,
                    opacity: 0.35
                };
            case 'contact':
                return {
                    icons: [Shield, Database, Terminal, Cloud],
                    mainColor: theme.primaryText,
                    secondaryColor: theme.accent,
                    opacity: 0.4
                };
            case 'home':
            default:
                return {
                    icons: [Cloud, Server, Database, Globe, Shield],
                    mainColor: theme.accent,
                    secondaryColor: theme.border,
                    opacity: 0.3
                };
        }
    };

    const backgroundTheme = getTheme();
    const { icons, mainColor, secondaryColor, opacity } = backgroundTheme;
    const nonRedIconColor = theme.mode === 'dark' ? theme.primaryText : theme.secondaryText;

    const experienceBoost = type === 'experience';
    const homeBoost = type === 'home';

    // Home right-side infinity should scale up gently on larger screens
    // between (740×370, scale 0.95) and (850×425, scale 1.05)
    const homeInfinityT = Math.max(0, Math.min(1, (viewportWidth - 1024) / (1600 - 1024)));
    const homeInfinityWidthPx = Math.round(740 + (850 - 740) * homeInfinityT);
    const homeInfinityHeightPx = Math.round(370 + (425 - 370) * homeInfinityT);
    const homeInfinityScaleValue = 0.95 + (1.05 - 0.95) * homeInfinityT;
    // For Professional Journey: make ring + nucleus + infinity larger, but keep circulating icons the same size.
    const ringMaxSize = experienceBoost ? '900px' : '700px';
    const ringScale = experienceBoost ? 1.18 : 1;
    const desktopClusterRight = experienceBoost ? '-10%' : '-15%';

    const infinityWidth = experienceBoost ? '840px' : (homeBoost ? `${homeInfinityWidthPx}px` : '760px');
    const infinityHeight = experienceBoost ? '420px' : (homeBoost ? `${homeInfinityHeightPx}px` : '380px');
    const infinityRight = experienceBoost ? '-20%' : '-18%';
    const infinityScale = experienceBoost ? 1.05 : (homeBoost ? homeInfinityScaleValue : 0.97);

    const ambientOnly = variant === 'ambient';
    const ambientOpacity = theme.mode === 'dark' ? 0.26 : 0.18;
    const ambientBlur = theme.mode === 'dark' ? 'blur(1.4px)' : 'blur(1.1px)';

    if (ambientOnly) {
        const glowSize = isMobile ? 'min(560px, 92vw)' : 'min(820px, 76vw)';
        const loopWidth = isMobile ? 'min(860px, 98vw)' : 'min(1280px, 96vw)';
        const loopHeight = isMobile ? 'min(460px, 58vh)' : 'min(680px, 64vh)';

        return (
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                overflow: 'hidden',
                zIndex: 0,
                pointerEvents: 'none'
            }}>
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                {/* Center nucleus glow (blurred) */}
                <motion.div
                    animate={{ scale: [1, 1.12, 1], opacity: [0.35, 0.6, 0.35] }}
                    transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
                    style={{
                        position: 'absolute',
                        width: glowSize,
                        height: glowSize,
                        background: 'radial-gradient(circle, var(--netflix-red) 0%, transparent 75%)',
                        borderRadius: '50%',
                        filter: `blur(110px) ${ambientBlur}`,
                        opacity: ambientOpacity,
                        zIndex: 0
                    }}
                />

                {/* Center infinity loop (blurred) */}
                <svg
                    width={loopWidth}
                    height={loopHeight}
                    viewBox="0 0 800 400"
                    preserveAspectRatio="xMidYMid meet"
                    style={{
                        position: 'absolute',
                        transform: 'scale(1.08)',
                        opacity: theme.mode === 'dark' ? 0.34 : 0.22,
                        filter: ambientBlur,
                        zIndex: 1
                    }}
                >
                    <motion.path
                        d={infinityPath}
                        fill="none"
                        stroke={secondaryColor}
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        opacity={theme.mode === 'dark' ? 0.55 : 0.35}
                    />
                    {/* Higher-intensity highlight in dark mode; muted grey in light mode */}
                    <motion.path
                        d={infinityPath}
                        fill="none"
                        stroke={theme.mode === 'dark' ? '#fff' : theme.mutedText}
                        strokeWidth="3.6"
                        strokeLinecap="butt"
                        strokeLinejoin="round"
                        strokeDasharray="28 92"
                        animate={{ strokeDashoffset: [60, -180] }}
                        transition={{ duration: 7, repeat: Infinity, ease: 'linear' }}
                        opacity={theme.mode === 'dark' ? 0.42 : 0.38}
                    />
                    <motion.path
                        d={infinityPath}
                        fill="none"
                        stroke={mainColor}
                        strokeWidth="4.2"
                        strokeLinecap="butt"
                        strokeLinejoin="round"
                        strokeDasharray="28 92"
                        animate={{ strokeDashoffset: [0, -240] }}
                        transition={{ duration: 7, repeat: Infinity, ease: 'linear' }}
                        opacity={theme.mode === 'dark' ? 0.58 : 0.52}
                    />
                </svg>
                </div>
            </div>
        );
    }

    const isLeft = side === 'left';
    const clusterSideStyle = isLeft
        ? { left: isMobile ? undefined : '-15%', right: isMobile ? '50%' : undefined }
        : { right: isMobile ? '50%' : (homeBoost ? '-8%' : '-15%'), left: isMobile ? undefined : undefined };

    const clusterTransform = isMobile
        ? 'translate(50%, -50%) scale(0.6)'
        : 'translateY(-50%)';

    const infinitySideStyle = isLeft
        ? { left: '-18%', right: undefined }
        : { right: homeBoost ? '-12%' : '-18%', left: undefined };

    return (
        <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            overflow: 'hidden',
            zIndex: 0,
            pointerEvents: 'none'
        }}>
            {/* 3. Symbolic Connection Path (Infinity) - Hidden on Mobile */}
            {!isMobile && (
                <svg
                    width={experienceBoost ? '100%' : infinityWidth}
                    height={experienceBoost ? '100%' : infinityHeight}
                    viewBox="300 0 600 400"
                    preserveAspectRatio={experienceBoost ? 'xMidYMid slice' : 'xMidYMid meet'}
                    style={{
                        position: 'absolute',
                        top: experienceBoost ? 0 : '50%',
                        ...(experienceBoost ? {} : infinitySideStyle),
                        ...(experienceBoost ? { right: infinityRight } : {}),
                        transform: experienceBoost
                            ? `scale(${Math.max(infinityScale, 1.12)})`
                            : `translateY(-50%) scale(${infinityScale})`,
                        opacity: homeBoost
                            ? (theme.mode === 'dark' ? 0.46 : 0.38)
                            : (theme.mode === 'dark' ? 0.32 : 0.26),
                        filter: homeBoost ? `drop-shadow(0 0 16px ${theme.accent}22)` : 'none',
                        zIndex: 0
                    }}
                >
                    <motion.path
                        d={infinityPath}
                        fill="none"
                        stroke={secondaryColor}
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        opacity={homeBoost
                            ? (theme.mode === 'dark' ? 0.68 : 0.44)
                            : (theme.mode === 'dark' ? 0.55 : 0.35)}
                    />
                    {/* Keep white + red dashes interleaved (no overlay) by locking phase offset */}
                    <motion.path
                        d={infinityPath}
                        fill="none"
                        stroke="#fff"
                        strokeWidth={homeBoost ? '3.9' : '3.5'}
                        strokeLinecap="butt"
                        strokeLinejoin="round"
                        strokeDasharray="28 92"
                        animate={{ strokeDashoffset: [60, -180] }}
                        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                        opacity={homeBoost
                            ? (theme.mode === 'dark' ? 0.52 : 0.0)
                            : (theme.mode === 'dark' ? 0.36 : 0.0)}
                    />
                    <motion.path
                        d={infinityPath}
                        fill="none"
                        stroke={theme.mutedText}
                        strokeWidth={homeBoost ? '3.9' : '3.5'}
                        strokeLinecap="butt"
                        strokeLinejoin="round"
                        strokeDasharray="28 92"
                        animate={{ strokeDashoffset: [60, -180] }}
                        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                        opacity={homeBoost
                            ? (theme.mode === 'dark' ? 0.0 : 0.46)
                            : (theme.mode === 'dark' ? 0.0 : 0.34)}
                    />
                    <motion.path
                        d={infinityPath}
                        fill="none"
                        stroke="var(--netflix-red)"
                        strokeWidth={homeBoost ? '4.6' : '4'}
                        strokeLinecap="butt"
                        strokeLinejoin="round"
                        strokeDasharray="28 92"
                        animate={{ strokeDashoffset: [0, -240] }}
                        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                        opacity={homeBoost
                            ? (theme.mode === 'dark' ? 0.72 : 0.72)
                            : (theme.mode === 'dark' ? 0.55 : 0.62)}
                    />
                </svg>
            )}

            {/* 1. Large Themed Animation Cluster (Right Aligned or Centered on Mobile) */}
            <div style={{
                position: 'absolute',
                top: isMobile ? '80%' : '50%',
                ...(isMobile ? { right: '50%' } : clusterSideStyle),
                transform: clusterTransform,
                width: isMobile ? '500px' : '70vw',
                height: isMobile ? '500px' : '70vw',
                maxHeight: ringMaxSize,
                maxWidth: ringMaxSize,
                zIndex: 0,
                opacity: isMobile ? 0.3 : 1
            }}>
                {/* Ring + Nucleus (scaled for Professional Journey; icons remain unscaled) */}
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    transform: `scale(${ringScale})`,
                    transformOrigin: 'center'
                }}>
                    {/* Core Radial Glow */}
                    <motion.div
                        animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.4, 0.7, 0.4]
                        }}
                        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                        style={{
                            position: 'absolute',
                            top: '15%',
                            left: '15%',
                            width: '70%',
                            height: '70%',
                            background: 'radial-gradient(circle, var(--netflix-red) 0%, transparent 75%)',
                            borderRadius: '50%',
                            filter: 'blur(100px)',
                            zIndex: -1
                        }}
                    />

                    {/* Rotating Tech Ring */}
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                        style={{
                            position: 'absolute',
                            inset: 0,
                            border: theme.mode === 'dark' ? '2px solid rgba(255, 255, 255, 0.1)' : '2px solid rgba(0, 0, 0, 0.08)',
                            borderRadius: '50%',
                            borderTop: `${homeBoost ? 5 : 4}px solid ${theme.accent}`,
                            borderTopColor: theme.accent,
                            borderBottom: theme.mode === 'dark' ? `4px solid ${theme.primaryText}` : '4px solid rgba(26, 26, 26, 0.22)',
                            borderRight: theme.mode === 'dark' ? '2px solid rgba(255, 255, 255, 0.3)' : '2px solid rgba(0, 0, 0, 0.14)',
                            opacity: homeBoost
                                ? (theme.mode === 'dark' ? 0.86 : 0.7)
                                : (theme.mode === 'dark' ? 0.7 : 0.55),
                            boxShadow: homeBoost ? `0 0 0 1px ${theme.accent}26, 0 0 22px ${theme.accent}1A` : 'none',
                            willChange: 'transform',
                            backfaceVisibility: 'hidden',
                            WebkitBackfaceVisibility: 'hidden'
                        }}
                    />
                </div>

                {/* 2. Orbital Tech Icons (Rotating with Ring) */}
                {icons.map((Icon, idx) => {
                    // Home: place icons between the outer orbit ring and the infinity loop.
                    // Other panels keep the tighter orbit.
                    const orbitRadius = homeBoost ? 270 : 235;
                    const orbitSpeed = 30; // Faster, synchronized with tech ring
                    // Ensure perfect geometrical spacing (72 degrees for 5 icons)
                    const initialRotation = idx * (360 / icons.length);

                    return (
                        <motion.div
                            key={idx}
                            animate={{ rotate: [initialRotation, initialRotation + 360] }}
                            transition={{
                                duration: orbitSpeed,
                                repeat: Infinity,
                                ease: "linear"
                            }}
                            style={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                width: '1px', // Pivot point
                                height: '1px',
                                zIndex: 2
                            }}
                        >
                            <motion.div
                                animate={{
                                    rotate: [-(initialRotation), -(initialRotation + 360)], // Counter-rotate at matching speed
                                    scale: [1, 1.1, 1],
                                    filter: [
                                        `drop-shadow(0 0 10px ${idx % 2 === 0 ? 'var(--netflix-red)' : secondaryColor}66)`,
                                        `drop-shadow(0 0 25px ${idx % 2 === 0 ? 'var(--netflix-red)' : secondaryColor})`,
                                        `drop-shadow(0 0 10px ${idx % 2 === 0 ? 'var(--netflix-red)' : secondaryColor}66)`
                                    ]
                                }}
                                transition={{
                                    rotate: { duration: orbitSpeed, repeat: Infinity, ease: "linear" },
                                    scale: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                                    filter: { duration: 3, repeat: Infinity, ease: "easeInOut" }
                                }}
                                style={{
                                    position: 'absolute',
                                    left: orbitRadius,
                                    color: idx % 2 === 0 ? 'var(--netflix-red)' : nonRedIconColor,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    top: '-25px' // Half of icon size to center on orbit line
                                }}
                            >
                                <Icon size={50} strokeWidth={1} />

                                {/* Background Glow for the Icon itself */}
                                <div style={{
                                    position: 'absolute',
                                    width: '40px',
                                    height: '40px',
                                    background: idx % 2 === 0 ? 'var(--netflix-red)' : nonRedIconColor,
                                    filter: 'blur(30px)',
                                    opacity: 0.3,
                                    zIndex: -1
                                }} />
                            </motion.div>
                        </motion.div>
                    );
                })}
            </div>

            {/* Subtle Grid Pattern */}
            <div style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px)',
                backgroundSize: '60px 60px',
                zIndex: -1
            }} />
        </div>
    );
};

export default IndustrialBackground;
