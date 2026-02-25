import React from 'react';
import { useBreakpoint, shouldReduceAnimations } from '../hooks/useBreakpoint';
import { motion, useScroll, useSpring } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

/**
 * PremiumEffects: Adds cinematic overlays and global UX enhancements.
 * 1. Cinematic Grain Overlay (Netflix-style texture)
 * 2. Dynamic Scroll Progress Line
 */
const PremiumEffects = () => {
    const { theme } = useTheme();
    const { scrollYProgress } = useScroll();
    const { isMobile } = useBreakpoint();

    // Smooth out the scroll progress
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    return (
        <>
            {/* 1. Dynamic Scroll Progress Line */}
            <motion.div
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '2px',
                    background: theme.accent,
                    transformOrigin: '0%',
                    scaleX,
                    zIndex: 2000,
                    boxShadow: `0 0 10px ${theme.accent}, 0 0 5px ${theme.accent}`,
                    willChange: 'transform'
                }}
            />

            {/* 2. Cinematic Grain Overlay
                 Skipped on mobile and low-power devices. SVG feTurbulence re-rasterizes
                 every frame and is one of the heaviest GPU operations available in CSS —
                 on mobile it can consume 10-20% of the frame budget alone, contributing
                 directly to intro jank. Desktop-only feature. */}
            {!shouldReduceAnimations && !isMobile && (
                <div
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        pointerEvents: 'none',
                        zIndex: 9998,
                        opacity: theme.mode === 'dark' ? 0.09 : 0.06,
                        mixBlendMode: 'overlay',
                    }}
                >
                    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                        <filter id="noiseFilter">
                            <feTurbulence
                                type="fractalNoise"
                                baseFrequency="0.65"
                                numOctaves="4"
                                stitchTiles="stitch"
                            />
                        </filter>
                        <rect width="100%" height="100%" filter="url(#noiseFilter)" />
                    </svg>
                </div>
            )}

            <style>{`
                /* Ensure grain stays fixed and covers everything */
                .grain-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    pointer-events: none;
                }
            `}</style>
        </>
    );
};

export default PremiumEffects;
