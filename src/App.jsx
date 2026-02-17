import React, { useState, Suspense, lazy } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import ErrorBoundary from './components/ErrorBoundary';
import DSKIntro from './components/DSKIntro';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import PremiumEffects from './components/PremiumEffects';
import { portfolioData } from './data/portfolioData';

// Lazy loading non-critical sections to reduce initial bundle size
const Projects = lazy(() => import('./components/Projects'));
const Experience = lazy(() => import('./components/Experience'));
const Skills = lazy(() => import('./components/Skills'));
const Education = lazy(() => import('./components/Education'));
const Blog = lazy(() => import('./components/Blog'));
const Contact = lazy(() => import('./components/Contact'));

// Loading Placeholder for Suspense
const SectionPlaceholder = () => <div style={{ minHeight: '50vh', background: 'transparent' }} />;

const AppContent = () => {
    const { theme } = useTheme();

    return (
        <div className="App" style={{ backgroundColor: theme.primaryBg, minHeight: '100vh', transition: 'background-color 0.4s ease' }}>
            <PremiumEffects />
            <Navbar />
            <Hero data={portfolioData.personalInfo} />

            <Suspense fallback={<SectionPlaceholder />}>
                <Projects data={portfolioData.projects} />
                <Experience data={portfolioData.experience} />
                <Skills data={portfolioData.skills} />
                <Education data={portfolioData.education} />
                <Blog data={portfolioData.blogs} />
                <Contact data={portfolioData.personalInfo} />
            </Suspense>

            <footer style={{
                textAlign: 'center',
                padding: '40px',
                borderTop: `1px solid ${theme.border}`,
                color: theme.mutedText,
                fontSize: '0.9rem',
                background: 'transparent'
            }}>
                <p>© {new Date().getFullYear()} Deep Sagar Karay. All rights reserved.</p>
            </footer>
        </div>
    );
};

function App() {
    const [showIntro, setShowIntro] = useState(true);

    return (
        <ErrorBoundary>
            <ThemeProvider>
                <Router>
                    <style>{`
                        /* Only transition properties that don't trigger reflow for smooth theme switching */
                        body, .App, .section-title, p, h1, h2, h3, h4, h5, h6, button, a {
                            transition: background-color 0.3s cubic-bezier(0.4, 0, 0.2, 1), 
                                        color 0.3s cubic-bezier(0.4, 0, 0.2, 1), 
                                        border-color 0.3s cubic-bezier(0.4, 0, 0.2, 1),
                                        box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                        }
                        
                        html {
                            scroll-behavior: smooth;
                            background-color: #000;
                        }
                        
                        body {
                            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
                            min-width: 320px;
                            touch-action: manipulation;
                            -webkit-font-smoothing: antialiased;
                            -moz-osx-font-smoothing: grayscale;
                            text-rendering: optimizeLegibility;
                        }
                        
                        section {
                            min-height: 100vh;
                            display: flex;
                            flex-direction: column;
                            justify-content: center;
                            contain: content; /* Significant performance boost for layout engine */
                        }

                        /* Disable heavy effects on low-power devices if needed */
                        @media (prefers-reduced-motion: reduce) {
                            * {
                                animation-duration: 0.01ms !important;
                                animation-iteration-count: 1 !important;
                                transition-duration: 0.01ms !important;
                                scroll-behavior: auto !important;
                            }
                        }
                    `}</style>
                    <AnimatePresence mode="wait">
                        {showIntro ? (
                            <DSKIntro key="intro" onComplete={() => setShowIntro(false)} />
                        ) : (
                            <motion.div
                                key="main-app"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 1 }}
                            >
                                <AppContent />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </Router>
            </ThemeProvider>
        </ErrorBoundary>
    );
}

export default App;
