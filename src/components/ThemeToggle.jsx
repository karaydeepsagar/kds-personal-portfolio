import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const ThemeToggle = () => {
    const { theme, toggleTheme, isDark } = useTheme();

    return (
        <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={toggleTheme}
            style={{
                position: 'relative',
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                border: `1px solid ${theme.border}`,
                background: theme.glassBg,
                backdropFilter: theme.navBlur,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                boxShadow: theme.cardShadow
            }}
            aria-label="Toggle theme"
        >
            <motion.div
                initial={false}
                animate={{
                    rotate: isDark ? 0 : 180,
                    scale: isDark ? 1 : 0
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                style={{
                    position: 'absolute',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <Moon size={20} color={theme.primaryText} />
            </motion.div>

            <motion.div
                initial={false}
                animate={{
                    rotate: isDark ? -180 : 0,
                    scale: isDark ? 0 : 1
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                style={{
                    position: 'absolute',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <Sun size={20} color={theme.accent} />
            </motion.div>

            {/* Glow effect on hover */}
            <motion.div
                whileHover={{ opacity: 0.2 }}
                style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    background: `radial-gradient(circle, ${theme.accent} 0%, transparent 70%)`,
                    opacity: 0,
                    transition: 'opacity 0.3s ease'
                }}
            />
        </motion.button>
    );
};

export default ThemeToggle;
