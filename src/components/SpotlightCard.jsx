// src/components/SpotlightCard.jsx
import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const SpotlightCard = ({ children, className = "", onClick, style = {} }) => {
    const divRef = useRef(null);
    const spotlightRef = useRef(null);
    const { theme } = useTheme();

    const handleMouseMove = (e) => {
        if (!divRef.current || !spotlightRef.current) return;

        const rect = divRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        spotlightRef.current.style.background = `radial-gradient(600px circle at ${x}px ${y}px, ${theme.borderAccent}, transparent 40%)`;
        spotlightRef.current.style.opacity = 1;
    };

    const handleMouseLeave = () => {
        if (spotlightRef.current) {
            spotlightRef.current.style.opacity = 0;
        }
    };

    return (
        <div
            ref={divRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={onClick}
            className={className}
            style={{
                position: 'relative',
                overflow: 'hidden',
                borderRadius: '16px',
                border: `1px solid ${theme.border}`,
                backgroundColor: theme.cardBg,
                backdropFilter: 'blur(10px)',
                transition: 'border-color 0.3s ease, transform 0.2s ease',
                cursor: onClick ? 'pointer' : 'default',
                ...style
            }}
        >
            <div
                ref={spotlightRef}
                style={{
                    pointerEvents: 'none',
                    position: 'absolute',
                    inset: '-1px', // Extend slightly to cover borders
                    opacity: 0,
                    transition: 'opacity 0.3s ease',
                    background: 'transparent',
                    zIndex: 0,
                    borderRadius: 'inherit'
                }}
            />
            {/* Inner Content Layer */}
            <div style={{ position: 'relative', zIndex: 1, height: '100%' }}>
                {children}
            </div>
        </div>
    );
};

export default SpotlightCard;
