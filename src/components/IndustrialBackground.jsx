import React, { useState, useEffect, useRef } from 'react';
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
const IndustrialBackground = ({ type = 'home', variant = 'default', side = 'right', isActive = true }) => {
    const { theme } = useTheme();
    const [isMobile, setIsMobile] = useState(false);
    const [viewportWidth, setViewportWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1440);
    const [isScrolling, setIsScrolling] = useState(false);
    const scrollingRef = useRef(false);
    const scrollTimeoutRef = useRef(null);

    useEffect(() => {
        const handleResize = () => {
            setViewportWidth(window.innerWidth);
            setIsMobile(window.innerWidth < 1024);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // While the user is actively scrolling, avoid expensive paint effects.
    useEffect(() => {
        const onScroll = () => {
            if (!scrollingRef.current) {
                scrollingRef.current = true;
                setIsScrolling(true);
            }
            if (scrollTimeoutRef.current) {
                clearTimeout(scrollTimeoutRef.current);
            }
            scrollTimeoutRef.current = setTimeout(() => {
                scrollingRef.current = false;
                setIsScrolling(false);
            }, 140);
        };

        window.addEventListener('scroll', onScroll, { passive: true });
        return () => {
            window.removeEventListener('scroll', onScroll);
            if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
        };
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
                    icons: [Cloud, Server, Database, Globe, Shield, Settings, Code2, Cpu],
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
    // Reduced by ~8% as requested
    const homeInfinityT = Math.max(0, Math.min(1, (viewportWidth - 1024) / (1600 - 1024)));
    const homeInfinityWidthPx = Math.round(653 + (751 - 653) * homeInfinityT);
    const homeInfinityHeightPx = Math.round(327 + (375 - 327) * homeInfinityT);
    const homeInfinityScaleValue = 0.84 + (0.93 - 0.84) * homeInfinityT;
    // For Professional Journey: make ring + nucleus + infinity larger, but keep circulating icons the same size.
    const ringMaxSize = experienceBoost ? '900px' : '567px';
    const ringScale = experienceBoost ? 1.18 : 1;
    const desktopClusterRight = experienceBoost ? '-10%' : '1.5%'; // Mirrored gap from left side's 1% appearance

    const infinityWidth = experienceBoost ? '840px' : (homeBoost ? `${homeInfinityWidthPx}px` : '760px');
    const infinityHeight = experienceBoost ? '420px' : (homeBoost ? `${homeInfinityHeightPx}px` : '380px');
    const infinityRight = experienceBoost ? '-20%' : '-18%';
    const infinityScale = experienceBoost ? 1.05 : (homeBoost ? homeInfinityScaleValue : 0.97);

    const ambientOnly = variant === 'ambient';
    const ambientOpacity = theme.mode === 'dark' ? 0.26 : 0.12;
    const ambientBlur = theme.mode === 'dark' ? 'blur(1.4px)' : 'blur(0.8px)';

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
                            stroke={theme.mode === 'dark' ? '#fff' : '#94a3b8'}
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
        : { right: isMobile ? '50%' : desktopClusterRight, left: isMobile ? undefined : undefined };

    const clusterTransform = isMobile
        ? 'translate(50%, -50%) scale(0.6)'
        : 'translateY(-50%)';

    const infinitySideStyle = isLeft
        ? { left: '-18%', right: undefined }
        : {
            // Perfectly align center of infinity (infinityWidth/2) with center of ring (desktopClusterRight + ringMaxSize/2)
            right: homeBoost
                ? `calc(${desktopClusterRight} + (${ringMaxSize} / 2) - (${infinityWidth} / 2))`
                : '-18%',
            left: undefined
        };

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
            {/* 3. Symbolic Connection Path (Infinity) - Now Visible on Mobile (Scaled) */}
            <svg
                width={isMobile ? '100%' : (experienceBoost ? '100%' : infinityWidth)}
                height={isMobile ? '200px' : (experienceBoost ? '100%' : infinityHeight)}
                viewBox={isMobile ? "0 0 800 400" : "300 0 600 400"} // Full view on mobile, cropped on desktop
                preserveAspectRatio={experienceBoost ? 'xMidYMid slice' : 'xMidYMid meet'}
                style={{
                    position: 'absolute',
                    top: experienceBoost ? 0 : (isMobile ? '65%' : '50%'), // Lower on mobile to sit behind ring
                    ...(experienceBoost ? {} : (isMobile ? { left: '0', right: '0' } : infinitySideStyle)), // Centered on mobile
                    ...(experienceBoost ? { right: infinityRight } : {}),
                    transform: experienceBoost
                        ? `scale(${Math.max(infinityScale, 1.12)})`
                        : (isMobile ? `translateY(-50%) scale(0.6)` : `translateY(-50%) scale(${infinityScale})`), // Smaller scale on mobile
                    opacity: (homeBoost && isActive)
                        ? (theme.mode === 'dark' ? 0.61 : 0.40)
                        : (theme.mode === 'dark' ? 0.32 : 0.15),
                    filter: homeBoost && !isScrolling ? `drop-shadow(0 0 16px ${theme.accent}22)` : 'none',
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
                            ? (theme.mode === 'dark' ? 0.83 : 0.59)
                            : (theme.mode === 'dark' ? 0.55 : 0.35)}
                    />
                    {/* Keep white + red dashes interleaved (no overlay) by locking phase offset */}
                    <motion.path
                        d={infinityPath}
                        fill="none"
                        stroke={theme.mode === 'dark' ? '#fff' : '#94a3b8'}
                        strokeWidth={homeBoost ? '3.9' : '3.5'}
                        strokeLinecap="butt"
                        strokeLinejoin="round"
                        strokeDasharray="28 92"
                        animate={(homeBoost && isActive) ? { strokeDashoffset: [60, -180] } : {}}
                        transition={(homeBoost && isActive) ? { duration: 6, repeat: Infinity, ease: "linear" } : {}}
                        opacity={homeBoost
                            ? (theme.mode === 'dark' ? 0.67 : 0.15)
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
                        animate={(homeBoost && isActive) ? { strokeDashoffset: [60, -180] } : {}}
                        transition={(homeBoost && isActive) ? { duration: 6, repeat: Infinity, ease: "linear" } : {}}
                        opacity={homeBoost
                            ? (theme.mode === 'dark' ? 0.15 : 0.61)
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
                        animate={(homeBoost && isActive) ? { strokeDashoffset: [0, -240] } : {}}
                        transition={(homeBoost && isActive) ? { duration: 6, repeat: Infinity, ease: "linear" } : {}}
                        opacity={homeBoost
                            ? (theme.mode === 'dark' ? 0.87 : 0.87)
                            : (theme.mode === 'dark' ? 0.55 : 0.62)}
                    />
                </svg>

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
                    transformOrigin: 'center',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    {/* Core Radial Glow */}
                    <motion.div
                        animate={(homeBoost && isActive) ? {
                            scale: [1, 1.2, 1],
                            opacity: [0.4, 0.7, 0.4]
                        } : {}}
                        transition={(homeBoost && isActive) ? { duration: 8, repeat: Infinity, ease: "easeInOut" } : {}}
                        style={{
                            position: 'relative',
                            width: '70%',
                            height: '70%',
                            background: 'radial-gradient(circle, var(--netflix-red) 0%, transparent 75%)',
                            borderRadius: '50%',
                            filter: isMobile
                                ? 'blur(40px)' // Light blur for mobile
                                : (theme.mode === 'dark' ? 'blur(100px)' : 'blur(80px)'),
                            opacity: theme.mode === 'dark' ? 1 : 0.5,
                            zIndex: -1
                        }}
                    />

                    {/* Rotating Tech Ring - REMOVED as per request */}
                    
                </div>

                {/* 2. Orbital Tech Icons (Rotating with Ring) */}
                {icons.map((Icon, idx) => {
                    // Responsive Orbit: calculate radius based on actual container size
                    const currentContainerSize = isMobile ? 500 : Math.min(parseInt(ringMaxSize), viewportWidth * 0.7);
                    const safeRadius = (currentContainerSize / 2);
                    const orbitRadius = homeBoost ? (safeRadius * 0.72) : (safeRadius * 0.84);
                    const orbitSpeed = 30; // Faster, synchronized with tech ring
                    // Ensure perfect geometrical spacing (72 degrees for 5 icons)
                    const initialRotation = idx * (360 / icons.length);

                    return (
                        <motion.div
                            key={idx}
                            animate={(homeBoost && isActive) ? { rotate: [initialRotation, initialRotation + 360] } : {}}
                            transition={(homeBoost && isActive) ? {
                                duration: orbitSpeed,
                                repeat: Infinity,
                                ease: "linear"
                            } : {}}
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
                                animate={(homeBoost && isActive) ? {
                                    rotate: [-(initialRotation), -(initialRotation + 360)], // Counter-rotate at matching speed
                                    scale: [1, 1.1, 1],
                                } : {}}
                                transition={(homeBoost && isActive) ? {
                                    rotate: { duration: orbitSpeed, repeat: Infinity, ease: "linear" },
                                    scale: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                                } : {}}
                                style={{
                                    position: 'absolute',
                                    left: orbitRadius,
                                    color: idx % 2 === 0 ? 'var(--netflix-red)' : nonRedIconColor,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    top: '-25px',
                                    filter: (isScrolling || isMobile) // No drop-shadow on mobile or during scroll
                                        ? 'none'
                                        : `drop-shadow(0 0 16px ${idx % 2 === 0 ? 'var(--netflix-red)' : secondaryColor}66)`,
                                    willChange: 'transform'
                                }}
                            >
                                <Icon size={45} strokeWidth={1} /> {/* Reduced by 10% (from 50) */}

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
