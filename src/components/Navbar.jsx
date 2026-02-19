import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
    const { theme } = useTheme();
    const [scrolled, setScrolled] = useState(false);
    const [visible, setVisible] = useState(true);
    const [activeSection, setActiveSection] = useState('home');
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const rafIdRef = useRef(null);
    const lastActiveRef = useRef('home');
    const { scrollY } = useScroll();

    useMotionValueEvent(scrollY, "change", (latest) => {
        const previous = scrollY.getPrevious();
        if (latest > previous && latest > 150) {
            setVisible(false);
        } else {
            setVisible(true);
        }
    });

    useEffect(() => {
        const sections = ['home', 'projects', 'experience', 'skills', 'education', 'blog', 'contact'];

        const updateOnScroll = () => {
            rafIdRef.current = null;
            setScrolled(window.scrollY > 50);

            for (const section of sections) {
                const element = document.getElementById(section);
                if (!element) continue;
                const rect = element.getBoundingClientRect();
                if (rect.top <= 150 && rect.bottom >= 150) {
                    if (lastActiveRef.current !== section) {
                        lastActiveRef.current = section;
                        setActiveSection(section);
                    }
                    break;
                }
            }
        };

        const onScroll = () => {
            if (rafIdRef.current != null) return;
            rafIdRef.current = window.requestAnimationFrame(updateOnScroll);
        };

        updateOnScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => {
            window.removeEventListener('scroll', onScroll);
            if (rafIdRef.current != null) {
                window.cancelAnimationFrame(rafIdRef.current);
            }
        };
    }, []);

    const navLinks = [
        { name: 'Home', id: 'home' },
        { name: 'Projects', id: 'projects' },
        { name: 'Experience', id: 'experience' },
        { name: 'Skills', id: 'skills' },
        { name: 'Education', id: 'education' },
        { name: 'Blog', id: 'blog' },
        { name: 'Contact', id: 'contact' },
    ];

    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            setMobileMenuOpen(false);
        }
    };

    return (
        <motion.nav
            initial={{ y: 0, x: '-50%', opacity: 1 }}
            animate={{ 
                y: visible ? 0 : -100,
                opacity: visible ? 1 : 0, 
                x: '-50%'
            }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            style={{
                position: 'fixed',
                top: scrolled ? '8px' : '15px', // Reduced top spacing
                left: '50%',                   // Always center aligned
                transform: 'translateX(-50%)', // Centering technique
                width: '90%',                  // Always reduced width
                maxWidth: '1200px',            // Reduced max-width for better compactness
                right: 'auto',                 // Reset right property
                margin: '0',                   // Reset auto margin since we use translate
                zIndex: 1000,
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                // Scrolled: Blur + Semi-transparent BG
                // Frosted Glass Effect: Lower opacity + High Blur
                backgroundColor: scrolled || mobileMenuOpen ? (theme.mode === 'dark' ? 'rgba(20, 20, 20, 0.4)' : 'rgba(255, 255, 255, 0.4)') : 'transparent',
                backdropFilter: scrolled || mobileMenuOpen ? 'blur(16px) saturate(180%)' : 'none',
                WebkitBackdropFilter: scrolled || mobileMenuOpen ? 'blur(16px) saturate(180%)' : 'none', // Safari support
                padding: '8px 24px',           // Reduced padding
                borderRadius: '50px',          // Always rounded
                border: scrolled ? `1px solid ${theme.borderAccent}` : '1px solid transparent',
                boxShadow: scrolled ? '0 10px 30px rgba(0,0,0,0.1)' : 'none'
            }}
        >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', margin: '0' }}>
                <motion.div
                    onClick={() => scrollToSection('home')}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px' }}
                >
                    {/* Resized Logo SVG */}
                    <svg width="40" height="40" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
                        {/* Left Gear */}
                        <motion.g animate={{ rotate: 360 }} transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}>
                            <circle cx="35" cy="50" r="18" fill="none" stroke={theme.accent} strokeWidth="3.5" />
                            <circle cx="35" cy="50" r="28" fill="none" stroke={theme.accent} strokeWidth="3" strokeDasharray="8,4" opacity="0.6" />
                        </motion.g>
                        {/* Right Gear */}
                        <motion.g animate={{ rotate: -360 }} transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}>
                            <circle cx="65" cy="50" r="18" fill="none" stroke={theme.accent} strokeWidth="3.5" />
                            <circle cx="65" cy="50" r="28" fill="none" stroke={theme.accent} strokeWidth="3" strokeDasharray="8,4" opacity="0.6" />
                        </motion.g>
                        {/* Connecting element */}
                        <line x1="53" y1="50" x2="47" y2="50" stroke={theme.accent} strokeWidth="2" />
                    </svg>
                    <h1 style={{
                        color: theme.accent,
                        fontSize: 'clamp(1.2rem, 3vw, 1.5rem)', // Reduced font size
                        fontWeight: '900',
                        letterSpacing: '1px',
                        margin: 0
                    }}>
                        DSK<span style={{ color: theme.primaryText }}>.</span>
                    </h1>
                </motion.div>

                {/* Theme Toggle */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <ThemeToggle />

                    {/* Desktop Menu */}
                    <div className="desktop-nav" style={{ display: 'flex', gap: '6px', alignItems: 'center', background: theme.cardBg, padding: '4px', borderRadius: '24px', border: `1px solid ${theme.border}`, backdropFilter: theme.navBlur }}>
                        {navLinks.map((link) => (
                            <button
                                key={link.id}
                                onClick={() => scrollToSection(link.id)}
                                style={{
                                    background: activeSection === link.id ? `${theme.accent}15` : 'transparent',
                                    border: '1px solid transparent',
                                    borderColor: activeSection === link.id ? theme.borderAccent : 'transparent',
                                    borderRadius: '20px',
                                    padding: '6px 14px',
                                    cursor: 'pointer',
                                    fontSize: '0.75rem',
                                    color: activeSection === link.id ? theme.primaryText : theme.mutedText,
                                    fontWeight: activeSection === link.id ? '700' : '500',
                                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                                    position: 'relative',
                                    textTransform: 'uppercase',
                                    letterSpacing: '1.2px',
                                    boxShadow: activeSection === link.id ? `0 0 20px ${theme.accent}66` : 'none',
                                    textShadow: activeSection === link.id ? `0 0 10px ${theme.accent}80` : 'none'
                                }}
                                onMouseOver={(e) => {
                                    if (activeSection !== link.id) {
                                        e.currentTarget.style.background = theme.cardBg;
                                        e.currentTarget.style.color = theme.primaryText;
                                    }
                                }}
                                onMouseOut={(e) => {
                                    if (activeSection !== link.id) {
                                        e.currentTarget.style.background = 'transparent';
                                        e.currentTarget.style.color = theme.mutedText;
                                    }
                                }}
                            >
                                {link.name}
                            </button>
                        ))}
                    </div>

                    {/* Mobile Menu Toggle */}
                    <motion.button
                        className="mobile-toggle"
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        style={{
                            background: theme.cardBg,
                            border: `1px solid ${theme.border}`,
                            color: theme.primaryText,
                            cursor: 'pointer',
                            padding: '8px',
                            borderRadius: '12px',
                            display: 'none', // Controlled by CSS
                            alignItems: 'center',
                            justifyContent: 'center',
                            backdropFilter: theme.navBlur
                        }}
                    >
                        {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                    </motion.button>
                </div>

                {/* Mobile Menu Overlay - Premium Cinematic Style */}
                <AnimatePresence>
                    {mobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, x: '100%' }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            style={{
                                position: 'fixed',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: '100vh',
                                background: theme.mode === 'dark' ? 'rgba(0, 0, 0, 0.95)' : 'rgba(245, 245, 247, 0.95)',
                                backdropFilter: 'blur(30px)',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                zIndex: 2000,
                                padding: '80px 20px 40px',
                                overflowY: 'auto'
                            }}
                        >
                            {/* Close button inside full-screen menu */}
                            <button
                                onClick={() => setMobileMenuOpen(false)}
                                style={{
                                    position: 'fixed',
                                    top: '30px',
                                    right: '6%',
                                    background: theme.cardBg,
                                    border: `1px solid ${theme.border}`,
                                    color: theme.primaryText,
                                    padding: '12px',
                                    borderRadius: '50%',
                                    cursor: 'pointer',
                                    zIndex: 2001
                                }}
                            >
                                <X size={28} />
                            </button>

                            <div style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '15px', // Reduced gap for tighter landscape fit
                                width: '100%',
                                alignItems: 'center'
                            }}>
                                {navLinks.map((link, idx) => (
                                    <motion.button
                                        key={link.id}
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: idx * 0.05 + 0.2 }}
                                        onClick={() => scrollToSection(link.id)}
                                        style={{
                                            background: 'none',
                                            border: 'none',
                                            fontSize: 'clamp(1.5rem, 8vh, 2rem)',
                                            color: activeSection === link.id ? theme.accent : theme.primaryText,
                                            fontWeight: '900',
                                            textTransform: 'uppercase',
                                            letterSpacing: '4px',
                                            padding: '5px',
                                            width: '100%',
                                            textAlign: 'center',
                                            transition: 'color 0.3s ease'
                                        }}
                                    >
                                        {link.name}
                                    </motion.button>
                                ))}
                            </div>

                            {/* Social/Bottom links in menu for appeal */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.6 }}
                                style={{
                                    position: 'absolute',
                                    bottom: '60px',
                                    color: theme.mutedText,
                                    fontSize: '0.8rem',
                                    letterSpacing: '2px',
                                    textTransform: 'uppercase'
                                }}
                            >
                                Architecting the Future
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <style>{`
                .desktop-nav { display: flex; }
                .mobile-toggle { display: none; }
                
                @media (max-width: 1024px) {
                    .desktop-nav { display: none !important; }
                    .mobile-toggle { display: flex !important; }
                }
            `}</style>
        </motion.nav>
    );
};

export default Navbar;
