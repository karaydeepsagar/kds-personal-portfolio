import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within ThemeProvider');
    }
    return context;
};

export const themes = {
    dark: {
        // Backgrounds
        primaryBg: '#000000',
        secondaryBg: '#0A0A0A',
        cardBg: 'rgba(255, 255, 255, 0.05)',
        glassBg: 'rgba(255, 255, 255, 0.03)',

        // Text
        primaryText: '#FFFFFF',
        secondaryText: '#E5E5E5',
        mutedText: '#AAAAAA',

        // Accents
        accent: '#D10000',
        accentHover: '#FF0000',

        // Borders
        border: 'rgba(255, 255, 255, 0.1)',
        borderAccent: 'rgba(209, 0, 0, 0.3)',

        // Effects
        glow: 'drop-shadow(0 0 20px rgba(209, 0, 0, 0.6))',
        glowSubtle: 'drop-shadow(0 0 10px rgba(209, 0, 0, 0.3))',
        cardShadow: '0 10px 40px rgba(0, 0, 0, 0.3)',

        // Navbar
        navBg: 'rgba(0, 0, 0, 0.98)',
        navBlur: 'blur(15px)',

        // Animations
        orbitGlow: true,
        particleColor: '#FFFFFF',

        // Mode
        mode: 'dark'
    },
    light: {
        // Backgrounds
        primaryBg: '#F5F5F7',
        secondaryBg: '#FFFFFF',
        cardBg: 'rgba(255, 255, 255, 0.95)',
        glassBg: 'rgba(255, 255, 255, 0.8)',

        // Text
        primaryText: '#1A1A1A',
        secondaryText: '#2D2D2D',
        mutedText: '#64748B',

        // Accents
        accent: '#D10000',
        accentHover: '#A00000',

        // Borders
        border: 'rgba(0, 0, 0, 0.1)',
        borderAccent: 'rgba(209, 0, 0, 0.25)',

        // Effects
        glow: 'drop-shadow(0 4px 12px rgba(0, 0, 0, 0.15))',
        glowSubtle: 'drop-shadow(0 2px 8px rgba(0, 0, 0, 0.1))',
        cardShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',

        // Navbar
        navBg: 'rgba(255, 255, 255, 0.95)',
        navBlur: 'blur(20px)',

        // Animations
        orbitGlow: false,
        particleColor: '#1A1A1A',

        // Mode
        mode: 'light'
    }
};

export const ThemeProvider = ({ children }) => {
    // Check system preference first, then localStorage
    const getInitialTheme = () => {
        const savedTheme = localStorage.getItem('portfolio-theme');
        if (savedTheme) return savedTheme;

        // Check system preference
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
            return 'light';
        }
        return 'dark';
    };

    const [currentTheme, setCurrentTheme] = useState(getInitialTheme);

    useEffect(() => {
        localStorage.setItem('portfolio-theme', currentTheme);
        document.documentElement.style.colorScheme = currentTheme;

        // Update CSS custom properties for smooth transitions
        const theme = themes[currentTheme];
        document.documentElement.style.setProperty('--primary-bg', theme.primaryBg);
        document.documentElement.style.setProperty('--primary-text', theme.primaryText);
        document.documentElement.style.setProperty('--accent', theme.accent);

        // Update mobile address bar color
        const metaThemeColor = document.querySelector('meta[name="theme-color"]');
        if (metaThemeColor) {
            metaThemeColor.setAttribute('content', theme.primaryBg);
        }
    }, [currentTheme]);

    const toggleTheme = () => {
        setCurrentTheme(prev => prev === 'dark' ? 'light' : 'dark');
    };

    const value = {
        theme: themes[currentTheme],
        currentTheme,
        toggleTheme,
        isDark: currentTheme === 'dark'
    };

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    );
};
