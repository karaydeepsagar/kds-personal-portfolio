import React, { useEffect, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const DSKIntro = ({ onComplete }) => {
    const { theme } = useTheme();
    const [phase, setPhase] = useState('init');

    useEffect(() => {
        // Sequence:
        // 0.5s: Triangles start flying in
        // 2.0s: Text Reveal
        // 5.5s: Finish
        const t1 = setTimeout(() => setPhase('triangles'), 500);
        const t2 = setTimeout(() => setPhase('text'), 2000);
        const t3 = setTimeout(() => onComplete(), 5500);

        return () => {
            clearTimeout(t1);
            clearTimeout(t2);
            clearTimeout(t3);
        };
    }, [onComplete]);

    // Generate random triangles for EDGES (Top, Bottom, Left, Right corners)
    const particles = useMemo(() => {
        // Increased density to coverage top-mid and bottom-mid as well
        return Array.from({ length: 120 }).map((_, i) => {
            // Distribute into 6 sectors to ensuring coverage
            // 0,1: Top Left / Top Right
            // 2,3: Bottom Left / Bottom Right
            // 4: Top Middle
            // 5: Bottom Middle
            const sector = i % 6; 
            
            // Random properties
            const size = Math.random() * 35 + 15; 
            const rotation = Math.random() * 360;
            const delay = Math.random() * 0.8;
            
            // Colors
            const type = Math.floor(Math.random() * 3);
            let color;
            if (type === 0) color = theme.accent || '#b91c1c'; // Red
            else if (type === 1) color = '#e5e5e5'; // White/Light Grey
            else color = '#333333'; // Dark Grey

            // Position Logic
            // REFINED: Ensure "Surrounded but not too close"
            // Use stricter limits to keep center clean (Center safe zone approx 40% of screen)
            let style = {};
            let initial = {};
            const flyDist = 150;

            // Safe Zone Logic:
            // Keep elements within 0-35% of the edges, leaving the middle 30% totally clear.
            const spreadFromEdge = Math.random() * 35; // 0% to 35% from the edge
            const spreadAlongEdge = Math.random() * 100; // 0% to 100% along the edge side

            if (sector === 0) { // Top Left Corner 
                // Restrict to top-left corner zone
                style = { top: `${Math.random() * 30}%`, left: `${Math.random() * 35}%` };
                initial = { x: -flyDist, y: -flyDist };
            } else if (sector === 1) { // Top Right Corner
                style = { top: `${Math.random() * 30}%`, right: `${Math.random() * 35}%` };
                initial = { x: flyDist, y: -flyDist };
            } else if (sector === 2) { // Bottom Left Corner
                style = { bottom: `${Math.random() * 30}%`, left: `${Math.random() * 35}%` };
                initial = { x: -flyDist, y: flyDist };
            } else if (sector === 3) { // Bottom Right Corner
                style = { bottom: `${Math.random() * 30}%`, right: `${Math.random() * 35}%` };
                initial = { x: flyDist, y: flyDist };
            } else if (sector === 4) { // Top Middle - Shallow depth
                // Must stay very close to top to avoid hitting text
                style = { top: `${Math.random() * 20}%`, left: `${20 + Math.random() * 60}%` };
                initial = { y: -flyDist, x: 0 };
            } else { // Bottom Middle - Shallow depth
                // Must stay very close to bottom
                style = { bottom: `${Math.random() * 20}%`, left: `${20 + Math.random() * 60}%` };
                initial = { y: flyDist, x: 0 };
            }

            return {
                id: i,
                style,
                initial,
                size,
                rotation,
                color,
                delay
            };
        });
    }, [theme]);

    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.8 } }}
            style={{
                position: 'fixed',
                inset: 0,
                zIndex: 9999,
                // Background: Keeping it clean/minimal as per "Live Tiles" request
                // Using theme background to adapt
                background: theme.primaryBg,
                // Add a subtle radial gradient from center to edges
                backgroundImage: `radial-gradient(circle at center, ${theme.primaryBg} 0%, ${theme.secondaryBg || '#f5f5f5'} 100%)`,
                overflow: 'hidden'
            }}
        >
            {/* 1. Scattered Triangle Particles from 4 Corners */}
            {(phase === 'triangles' || phase === 'text') && particles.map((p) => (
                <motion.div
                    key={p.id}
                    initial={{ ...p.initial, opacity: 0, scale: 0 }}
                    animate={{ 
                        x: 0, 
                        y: 0, 
                        opacity: 1, 
                        scale: 1,
                        rotate: p.rotation 
                    }}
                    transition={{ 
                        duration: 1.2, 
                        delay: p.delay, 
                        ease: "backOut" 
                    }}
                    style={{
                        position: 'absolute',
                        ...p.style,
                        zIndex: 1
                    }}
                >
                    {/* Inner interactive triangle */}
                    <motion.div
                        whileHover={{ 
                            scale: 1.2, 
                            rotate: p.rotation + 45, 
                            zIndex: 10
                        }}
                        animate={{
                            y: [0, -10, 0],
                            rotate: [0, 5, -5, 0]
                        }}
                        transition={{
                            // Float animation
                            y: { duration: 3 + Math.random() * 2, repeat: Infinity, ease: "easeInOut" },
                            rotate: { duration: 4 + Math.random() * 3, repeat: Infinity, ease: "easeInOut" }
                        }}
                        style={{
                            width: 0,
                            height: 0,
                            borderLeft: `${p.size/2}px solid transparent`,
                            borderRight: `${p.size/2}px solid transparent`,
                            borderBottom: `${p.size}px solid ${p.color}`,
                            filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.1))',
                            cursor: 'pointer',
                            opacity: 0.9
                        }}
                    />
                </motion.div>
            ))}

            {/* 2. Center Text Reveal - ABSOLUTE MIDDLE */}
            <AnimatePresence>
                {phase === 'text' && (
                    <motion.div
                        key="intro-text"
                        // Animation: Scale Up + Fade In (clean/minimal)
                        initial={{ opacity: 0, scale: 0.8, y: 20, x: '-50%' }}
                        animate={{ opacity: 1, scale: 1, y: '-50%', x: '-50%' }}
                        exit={{ opacity: 0, scale: 1.1, filter: 'blur(5px)' }}
                        transition={{ duration: 0.8, ease: "circOut" }}
                        style={{ 
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            zIndex: 20, 
                            textAlign: 'center',
                            width: 'auto',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        {/* Radial Glow behind text for separation */}
                        <div style={{
                            position: 'absolute',
                            inset: '-50px',
                            background: `radial-gradient(circle closest-side, ${theme.primaryBg} 0%, transparent 100%)`,
                            zIndex: -1,
                            opacity: 0.8,
                            filter: 'blur(20px)'
                        }} />

                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '15px',
                            flexWrap: 'wrap',
                            whiteSpace: 'nowrap'
                        }}>
                             <h1 style={{
                                fontSize: 'clamp(2.5rem, 6vw, 5rem)',
                                fontWeight: '900',
                                color: theme.primaryText,
                                textTransform: 'uppercase',
                                letterSpacing: '0.1em',
                                margin: 0,
                                textShadow: `0 0 30px ${theme.glow}`
                            }}>
                                DSK 
                            </h1>
                            <h1 style={{
                                fontSize: 'clamp(2.5rem, 6vw, 5rem)',
                                fontWeight: '300',
                                color: theme.accent || '#e11d48',
                                textTransform: 'uppercase',
                                letterSpacing: '0.1em',
                                margin: 0,
                                textShadow: `0 0 30px ${theme.accent}44`
                            }}>
                                PORTFOLIO
                            </h1>
                        </div>
                        
                        {/* Decorative line under text */}
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: '100%' }}
                            transition={{ duration: 0.8, delay: 0.5 }}
                            style={{ 
                                height: '2px', 
                                background: theme.accent || '#b91c1c', 
                                marginTop: '10px',
                                borderRadius: '2px'
                            }}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};


export default DSKIntro;
