import React, { useEffect, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const DSKIntro = ({ onComplete }) => {
    const { theme } = useTheme();
    const [phase, setPhase] = useState('gradient'); // gradient -> text -> dust

    useEffect(() => {
        const timer1 = setTimeout(() => setPhase('text'), 3000); // 3s gradient
        const timer2 = setTimeout(() => setPhase('dust'), 6000); // 3s text display
        const timer3 = setTimeout(() => onComplete(), 8000); // 2s dust animation
        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
            clearTimeout(timer3);
        };
    }, [onComplete]);

    const particles = useMemo(() =>
        Array.from({ length: 250 }).map((_, i) => ({
            id: i,
            // Spread particles across the rough area of the text (approx 800x200)
            initialX: (Math.random() - 0.5) * 900,
            initialY: (Math.random() - 0.5) * 200,
            // Destined offsets for the "explosion"
            moveX: (Math.random() - 0.5) * 1200,
            moveY: (Math.random() - 0.5) * 800,
            size: Math.random() * 3 + 1,
            color: i % 3 === 0 ? theme.accent : i % 3 === 1 ? theme.accentHover : theme.primaryText,
            delay: Math.random() * 0.5
        })), [theme]);

    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            style={{
                position: 'fixed',
                inset: 0,
                zIndex: 9999,
                background: theme.primaryBg,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden'
            }}
        >
            {/* 1. Gradient Layer */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{
                    opacity: phase === 'gradient' ? 1 : 0.2,
                    backgroundPosition: ['0% 0%', '100% 100%']
                }}
                transition={{
                    opacity: { duration: 1 },
                    backgroundPosition: { duration: 3, repeat: Infinity, ease: "linear" }
                }}
                style={{
                    position: 'absolute',
                    inset: 0,
                    // SEQUENCE: Red -> Grey -> White -> Black
                    background: 'linear-gradient(135deg, #b9090b 0%, #757575 35%, #ffffff 60%, #000000 100%)',
                    backgroundSize: '400% 400%',
                    zIndex: 1
                }}
            />

            {/* 2. Text / Disintegration Phase */}
            <div style={{ position: 'relative', zIndex: 10 }}>
                <AnimatePresence>
                    {phase === 'text' && (
                        <motion.div
                            key="intro-text"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, transition: { duration: 0.2 } }}
                            transition={{ duration: 1.2, ease: "easeOut" }}
                            style={{ textAlign: 'center' }}
                        >
                            <h1 style={{
                                fontSize: 'clamp(2.5rem, 10vw, 7rem)',
                                fontWeight: '900',
                                color: theme.primaryText,
                                textTransform: 'uppercase',
                                letterSpacing: '0.2em',
                                margin: 0,
                                textShadow: `0 0 30px ${theme.glow}`
                            }}>
                                DSK <span style={{ color: theme.accent }}>PORTFOLIO</span>
                            </h1>
                            <motion.div
                                initial={{ scaleX: 0 }}
                                animate={{ scaleX: 1 }}
                                transition={{ duration: 0.8, delay: 0.6 }}
                                style={{ height: '4px', background: theme.accent, width: '100%', marginTop: '20px' }}
                            />
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* 3. Disintegration Particles */}
                {phase === 'dust' && (
                    <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '1px', height: '1px' }}>
                        {particles.map((p, i) => (
                            <motion.div
                                key={p.id}
                                initial={{
                                    x: p.initialX,
                                    y: p.initialY,
                                    opacity: 1,
                                    scale: 1
                                }}
                                animate={{
                                    x: p.initialX + p.moveX,
                                    y: p.initialY + p.moveY,
                                    opacity: 0,
                                    scale: 0,
                                    rotate: Math.random() * 360
                                }}
                                transition={{
                                    duration: 2,
                                    ease: "easeOut",
                                    delay: p.delay
                                }}
                                style={{
                                    position: 'absolute',
                                    width: p.size,
                                    height: p.size,
                                    background: p.color,
                                    borderRadius: i % 2 === 0 ? '50%' : '0%',
                                    boxShadow: `0 0 8px ${p.color}aa`
                                }}
                            />
                        ))}
                    </div>
                )}
            </div>
        </motion.div>
    );
};

export default DSKIntro;
