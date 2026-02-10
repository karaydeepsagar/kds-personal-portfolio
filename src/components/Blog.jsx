import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowRight, BookOpen } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Blog = ({ data }) => {
    const { theme } = useTheme();
    const [isMobile, setIsMobile] = useState(false);
    const sectionRef = useRef(null);
    const [isInView, setIsInView] = useState(true);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        const element = sectionRef.current;
        if (!element || typeof IntersectionObserver === 'undefined') return;

        const observer = new IntersectionObserver(
            ([entry]) => setIsInView(entry.isIntersecting),
            { threshold: 0.1, rootMargin: '300px 0px' }
        );
        observer.observe(element);
        return () => observer.disconnect();
    }, []);

    return (
        <section ref={sectionRef} id="blog" style={{ position: 'relative', overflow: 'hidden' }}>
            {/* Nucleus glow (background) sized for this panel (LEFT) */}
            <motion.div
                animate={isInView ? { opacity: [0.10, 0.18, 0.10], scale: [1, 1.08, 1] } : false}
                transition={isInView ? { duration: 13, repeat: Infinity, ease: 'easeInOut' } : undefined}
                style={{
                    position: 'absolute',
                    top: '50%',
                    left: isMobile ? '50%' : '22%',
                    width: 'min(980px, 78vw)',
                    height: 'min(980px, 78vw)',
                    x: '-50%',
                    y: '-50%',
                    transformOrigin: 'center',
                    background: 'radial-gradient(circle, var(--netflix-red) 0%, transparent 72%)',
                    borderRadius: '50%',
                    filter: 'blur(130px)',
                    opacity: theme.mode === 'dark' ? 0.22 : 0.14,
                    willChange: 'transform, opacity',
                    pointerEvents: 'none',
                    zIndex: 0
                }}
            />
            <div className="section-padding" style={{ padding: isMobile ? '100px 15px 40px' : '120px 6% 80px', background: 'transparent', minHeight: '100vh', position: 'relative', zIndex: 1 }}>
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    style={{ textAlign: 'center', marginBottom: '80px' }}
                >
                    <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: '800', marginBottom: '20px', color: theme.primaryText }}>
                        <span style={{ color: theme.accent }}>Industrial</span> <span>Insights</span>
                    </h2>
                    <p style={{ color: theme.mutedText, fontSize: '1.2rem', maxWidth: '700px', margin: '0 auto' }}>
                        Technical deep-dives into Cloud Architecture, DevOps patterns, and security best practices.
                    </p>
                </motion.div>

                <div className="blog-grid" style={{
                    display: 'grid',
                    gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fill, minmax(360px, 1fr))',
                    gap: isMobile ? '20px' : '30px',
                    maxWidth: '1400px',
                    margin: '0 auto'
                }}>
                    {data.map((post, index) => (
                        <motion.article
                            key={post.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.6 }}
                            whileHover={{ y: -10 }}
                            style={{
                                background: theme.cardBg,
                                backdropFilter: 'blur(20px)',
                                borderRadius: '24px',
                                overflow: 'hidden',
                                border: `1px solid ${theme.border}`,
                                display: 'flex',
                                flexDirection: 'column',
                                boxShadow: theme.cardShadow
                            }}
                        >
                            <div style={{ height: '240px', overflow: 'hidden', position: 'relative' }}>
                                <img
                                    src={post.image}
                                    alt={post.title}
                                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }}
                                    onMouseOver={(e) => e.target.style.transform = 'scale(1.1)'}
                                    onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
                                />
                                
                            </div>

                            <div style={{ padding: isMobile ? '20px' : '30px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                                <div style={{ display: 'flex', gap: '20px', marginBottom: '15px', fontSize: '0.85rem', color: theme.mutedText }}>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                        <Calendar size={14} /> {post.date}
                                    </span>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                        <Clock size={14} /> {post.readTime}
                                    </span>
                                </div>

                                <h3 style={{ fontSize: '1.6rem', fontWeight: '800', color: theme.primaryText, marginBottom: '15px', lineHeight: '1.3' }}>
                                    {post.title}
                                </h3>

                                <p style={{ color: theme.secondaryText, lineHeight: '1.6', marginBottom: '25px', fontSize: '1rem', flex: 1 }}>
                                    {post.summary}
                                </p>

                                <a
                                    href={post.link}
                                    style={{
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '10px',
                                        color: theme.accent,
                                        textDecoration: 'none',
                                        fontWeight: '700',
                                        fontSize: '1rem',
                                        transition: 'gap 0.2s'
                                    }}
                                    onMouseOver={(e) => e.currentTarget.style.gap = '15px'}
                                    onMouseOut={(e) => e.currentTarget.style.gap = '10px'}
                                >
                                    Read Article <ArrowRight size={18} />
                                </a>
                            </div>
                        </motion.article>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Blog;
