import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import ErrorBoundary from './components/ErrorBoundary';
import DSKIntro from './components/DSKIntro';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Contact from './components/Contact';
import Projects from './components/Projects';
import Blog from './components/Blog';
import { portfolioData } from './data/portfolioData';

const AppContent = () => {
    const { theme } = useTheme();

    return (
        <div className="App" style={{ backgroundColor: theme.primaryBg, minHeight: '100vh', transition: 'background-color 0.3s ease' }}>
            <Navbar />
            <Hero data={portfolioData.personalInfo} />
            <Projects data={portfolioData.projects} />
            <Experience data={portfolioData.experience} />
            <Skills data={portfolioData.skills} />
            <Blog data={portfolioData.blogs} />
            <Contact data={portfolioData.personalInfo} />

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
                        * {
                            transition: background-color 0.25s cubic-bezier(0.4, 0, 0.2, 1), 
                                        color 0.25s cubic-bezier(0.4, 0, 0.2, 1), 
                                        border-color 0.25s cubic-bezier(0.4, 0, 0.2, 1);
                        }
                        body, html, div, section, nav {
                            will-change: background-color, color;
                        }
                        html {
                            scroll-behavior: smooth;
                            background-color: #000;
                        }
                        body {
                            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
                            overflow-x: hidden;
                        }
                        section {
                            min-height: 100vh;
                            display: flex;
                            flex-direction: column;
                            justify-content: center;
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
