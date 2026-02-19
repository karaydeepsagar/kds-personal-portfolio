// src/components/SpotlightCard.jsx
import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const SpotlightCard = ({ children, className = "", onClick, style = {} }) => {
    const divRef = useRef(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [opacity, setOpacity] = useState(0);
    const { theme } = useTheme();

    const handleMouseMove = (e) => {
        if (!divRef.current) return;

        const rect = divRef.current.getBoundingClientRect();
        setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };

    const handleMouseEnter = () => {
        setOpacity(1);
    };

    const handleMouseLeave = () => {
        setOpacity(0);
    };

    return (
        <div
            ref={divRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
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
                style={{
                    pointerEvents: 'none',
                    position: 'absolute',
                    inset: '-1px', // Extend slightly to cover borders
                    opacity,
                    transition: 'opacity 0.3s ease',
                    background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, ${theme.borderAccent}, transparent 40%)`,
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
