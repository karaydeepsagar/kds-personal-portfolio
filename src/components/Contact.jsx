import React, { useState, useRef, useEffect } from 'react';
import { useBreakpoint, shouldReduceAnimations } from '../hooks/useBreakpoint';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Linkedin, Github, Send, Copy, Check } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { useTheme } from '../context/ThemeContext';
import SpotlightCard from './SpotlightCard';

const Contact = ({ data }) => {
    const { theme } = useTheme();
    const form = useRef();
    const sectionRef = useRef(null);
    const [copied, setCopied] = useState(null);
    const [status, setStatus] = useState({ sending: false, sent: false, error: false });
    const { isMobile } = useBreakpoint();
    const [formState, setFormState] = useState({ name: '', email: '', company: '' });
    const [isInView, setIsInView] = useState(true);

    useEffect(() => {
        const element = sectionRef.current;
        if (!element || typeof IntersectionObserver === 'undefined') return;
        const observer = new IntersectionObserver(
            ([entry]) => setIsInView(entry.isIntersecting),
            { threshold: 0.1, rootMargin: '350px 0px' }
        );
        observer.observe(element);
        return () => observer.disconnect();
    }, []);

    const shouldLoop = isInView && !shouldReduceAnimations;

    const copyToClipboard = async (text, type) => {
        try {
            await navigator.clipboard.writeText(text);
            setCopied(type);
            setTimeout(() => setCopied(null), 2000);
        } catch {
            setStatus({ sending: false, sent: false, error: true });
            setTimeout(() => setStatus(s => ({ ...s, error: false })), 5000);
        }
    };

    const sendEmail = (e) => {
        e.preventDefault();
        setStatus({ sending: true, sent: false, error: false });

        const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
        const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
        const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

        if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
            setStatus({ sending: false, sent: false, error: true });
            console.error('EmailJS credentials are not configured.');
            setTimeout(() => setStatus(s => ({ ...s, error: false })), 5000);
            return;
        }

        emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form.current, PUBLIC_KEY)
            .then((result) => {
                console.log(result.text);
                setStatus({ sending: false, sent: true, error: false });
                setFormState({ name: '', email: '', company: '' });
                form.current.reset();
                setTimeout(() => setStatus(s => ({ ...s, sent: false })), 5000);
            }, (error) => {
                console.log(error.text);
                setStatus({ sending: false, sent: false, error: true });
                setTimeout(() => setStatus(s => ({ ...s, error: false })), 5000);
            });
    };

    const isProjectDetailsEnabled = formState.name.trim().length > 0 && formState.email.trim().length > 0;

    return (
        <section ref={sectionRef} id="contact" style={{ position: 'relative', overflow: 'hidden' }}>
            <style>{`
                input::placeholder, textarea::placeholder { opacity: 0.7; }
                input:focus::placeholder, textarea:focus::placeholder { opacity: 0; transition: opacity 0.2s ease; }
            `}</style>

            {/* Background section glow */}
            <motion.div
                animate={(isInView && !shouldReduceAnimations) ? { opacity: [0.10, 0.18, 0.10], scale: [1, 1.08, 1] } : false}
                transition={(isInView && !shouldReduceAnimations) ? { duration: 13, repeat: Infinity, ease: 'easeInOut' } : undefined}
                style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    width: 'min(900px, 80vw)',
                    height: 'min(900px, 80vw)',
                    x: '-50%',
                    y: '-50%',
                    background: 'radial-gradient(circle, var(--netflix-red) 0%, transparent 72%)',
                    borderRadius: '50%',
                    filter: 'blur(130px)',
                    opacity: theme.mode === 'dark' ? 0.18 : 0.10,
                    pointerEvents: 'none',
                    zIndex: 0
                }}
            />

            <div className="section-padding" style={{
                paddingLeft: isMobile ? '5%' : '4%', paddingRight: isMobile ? '5%' : '4%',
                paddingTop: isMobile ? '100px' : undefined,
                minHeight: '100vh', background: 'transparent',
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center',
                position: 'relative', zIndex: 1
            }}>
                {/* Heading */}
                <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                    <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 800, color: theme.primaryText, marginBottom: '12px' }}>
                        <span>Let's</span> <span style={{ color: theme.accent }}>Collaborate</span>
                    </h2>
                    <div style={{
                        display: 'inline-flex', alignItems: 'center', gap: '8px',
                        background: `${theme.accent}12`, border: `1px solid ${theme.borderAccent}`,
                        borderRadius: '50px', padding: '7px 18px', marginBottom: '14px',
                        backdropFilter: 'blur(10px)'
                    }}>
                        <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: theme.accent, boxShadow: `0 0 8px ${theme.accent}`, display: 'inline-block', flexShrink: 0 }} />
                        <span style={{ fontSize: '0.82rem', fontWeight: '700', color: theme.accent, letterSpacing: '1.5px', textTransform: 'uppercase' }}>Open to Work — Available Now</span>
                    </div>
                    <p style={{ color: theme.mutedText, fontSize: '1rem', maxWidth: '680px', margin: '0 auto' }}>
                        Ready to elevate your infrastructure? I'm available for new opportunities in Cloud Architecture and DevOps engineering.
                    </p>
                </div>

                {/* Split two-tile layout */}
                <div style={{
                    width: '100%',
                    maxWidth: '1100px',
                    display: 'grid',
                    gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
                    gap: isMobile ? '20px' : '28px',
                    alignItems: 'stretch',
                }}>

                    {/* LEFT TILE — My Details */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        style={{ height: '100%' }}
                    >
                    <SpotlightCard style={{
                        height: '100%',
                        padding: isMobile ? '1.5rem' : '2.5rem',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1.5rem',
                        borderRadius: '24px',
                        background: theme.cardBg,
                        backdropFilter: 'blur(20px)',
                    }}>
                        <motion.div
                            animate={shouldLoop ? { scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] } : {}}
                            transition={shouldLoop ? { duration: 8, repeat: Infinity, ease: 'easeInOut' } : undefined}
                            style={{
                                position: 'absolute', bottom: '-80px', left: '-80px',
                                width: '320px', height: '320px',
                                background: 'radial-gradient(circle, #710202 0%, transparent 70%)',
                                borderRadius: '50%', filter: 'blur(60px)',
                                pointerEvents: 'none', zIndex: 0,
                            }}
                        />
                        <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', height: '100%' }}>
                            <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: theme.primaryText, marginBottom: '0.3rem' }}>My Details</h3>
                            <p style={{ fontSize: '0.9rem', color: theme.mutedText, marginBottom: '1.5rem' }}>Reach out directly through any channel below.</p>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', flex: 1 }}>
                                {/* Email */}
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem 1.1rem', background: theme.secondaryBg, borderRadius: '16px', border: `1px solid ${theme.border}` }}>
                                    <div style={{ background: `${theme.accent}1A`, width: '44px', height: '44px', flexShrink: 0, borderRadius: '12px', color: theme.accent, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <Mail size={20} />
                                    </div>
                                    <div style={{ flex: 1, minWidth: 0 }}>
                                        <span style={{ display: 'block', fontSize: '0.78rem', color: theme.mutedText, marginBottom: '2px' }}>Email</span>
                                        <span style={{ fontSize: '0.95rem', fontWeight: 500, color: theme.primaryText, display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{data.email}</span>
                                    </div>
                                    <button onClick={() => copyToClipboard(data.email, 'email')} style={{ background: 'transparent', border: 'none', color: theme.mutedText, cursor: 'pointer', padding: '6px', flexShrink: 0 }}>
                                        {copied === 'email' ? <Check size={16} color="#46d369" /> : <Copy size={16} />}
                                    </button>
                                </div>

                                {/* Phone */}
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem 1.1rem', background: theme.secondaryBg, borderRadius: '16px', border: `1px solid ${theme.border}` }}>
                                    <div style={{ background: theme.mode === 'dark' ? 'rgba(78,205,196,0.1)' : 'rgba(78,205,196,0.15)', width: '44px', height: '44px', flexShrink: 0, borderRadius: '12px', color: '#4ECDC4', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <Phone size={20} />
                                    </div>
                                    <div style={{ flex: 1, minWidth: 0 }}>
                                        <span style={{ display: 'block', fontSize: '0.78rem', color: theme.mutedText, marginBottom: '2px' }}>Phone</span>
                                        <span style={{ fontSize: '0.95rem', fontWeight: 500, color: theme.primaryText, display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{data.phone}</span>
                                    </div>
                                    <button onClick={() => copyToClipboard(data.phone, 'phone')} style={{ background: 'transparent', border: 'none', color: theme.mutedText, cursor: 'pointer', padding: '6px', flexShrink: 0 }}>
                                        {copied === 'phone' ? <Check size={16} color="#46d369" /> : <Copy size={16} />}
                                    </button>
                                </div>

                                {/* Location */}
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem 1.1rem', background: theme.secondaryBg, borderRadius: '16px', border: `1px solid ${theme.border}` }}>
                                    <div style={{ background: theme.mode === 'dark' ? 'rgba(74,246,38,0.08)' : 'rgba(34,197,94,0.12)', width: '44px', height: '44px', flexShrink: 0, borderRadius: '12px', color: '#4AF626', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <MapPin size={20} />
                                    </div>
                                    <div style={{ flex: 1, minWidth: 0 }}>
                                        <span style={{ display: 'block', fontSize: '0.78rem', color: theme.mutedText, marginBottom: '2px' }}>Location</span>
                                        <span style={{ fontSize: '0.95rem', fontWeight: 600, color: theme.primaryText, display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>Bengaluru, Hyderabad, Chennai</span>
                                        <span style={{ fontSize: '0.75rem', color: theme.accent, fontWeight: 600 }}>Open to Relocation</span>
                                    </div>
                                    <a href="https://maps.google.com/?q=Bengaluru,India" target="_blank" rel="noopener noreferrer"
                                        style={{ background: 'transparent', border: 'none', color: theme.mutedText, cursor: 'pointer', padding: '6px', flexShrink: 0, display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
                                        <MapPin size={16} />
                                    </a>
                                </div>

                                {/* Social Links */}
                                <div style={{ display: 'flex', gap: '1rem', marginTop: 'auto', paddingTop: '0.5rem' }}>
                                    <a href="https://www.linkedin.com/in/karaydeepsagar/" target="_blank" rel="noopener noreferrer"
                                        style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '0.9rem', background: '#0077b5', borderRadius: '14px', color: 'white', textDecoration: 'none', fontWeight: 600, fontSize: '0.95rem', transition: 'transform 0.2s' }}
                                        onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-3px)'}
                                        onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
                                        <Linkedin size={18} /> LinkedIn
                                    </a>
                                    <a href="https://github.com/karaydeepsagar" target="_blank" rel="noopener noreferrer"
                                        style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '0.9rem', background: theme.mode === 'dark' ? '#333' : '#24292e', borderRadius: '14px', color: 'white', textDecoration: 'none', fontWeight: 600, fontSize: '0.95rem', transition: 'transform 0.2s' }}
                                        onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-3px)'}
                                        onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
                                        <Github size={18} /> GitHub
                                    </a>
                                </div>
                            </div>
                        </div>
                    </SpotlightCard>
                    </motion.div>

                    {/* RIGHT TILE — Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        style={{ height: '100%' }}
                    >
                    <SpotlightCard style={{
                        height: '100%',
                        padding: isMobile ? '1.5rem' : '2.5rem',
                        display: 'flex',
                        flexDirection: 'column',
                        borderRadius: '24px',
                        background: theme.cardBg,
                        backdropFilter: 'blur(20px)',
                    }}>
                        <motion.div
                            animate={shouldLoop ? { scale: [1, 1.2, 1], opacity: [0.15, 0.35, 0.15] } : {}}
                            transition={shouldLoop ? { duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 } : undefined}
                            style={{
                                position: 'absolute', top: '-80px', right: '-80px',
                                width: '300px', height: '300px',
                                background: 'radial-gradient(circle, #710202 0%, transparent 70%)',
                                borderRadius: '50%', filter: 'blur(60px)',
                                pointerEvents: 'none', zIndex: 0,
                            }}
                        />
                        <div style={{ position: 'relative', zIndex: 1, flex: 1, display: 'flex', flexDirection: 'column' }}>
                            <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: theme.primaryText, marginBottom: '0.3rem' }}>Send a Message</h3>
                            <p style={{ fontSize: '0.9rem', color: theme.mutedText, marginBottom: '1.5rem' }}>Fill in the details and I'll get back to you promptly.</p>

                            <form ref={form} onSubmit={sendEmail} style={{ display: 'flex', flexDirection: 'column', gap: '14px', flex: 1 }}>
                                <input type="hidden" name="from_name" value={formState.name} />
                                <input type="hidden" name="reply_to" value={formState.email} />
                                <input type="hidden" name="from_email" value={formState.email} />
                                <input type="hidden" name="company" value={formState.company} />

                                <input type="text" name="user_name" placeholder="Your Name" required
                                    value={formState.name} onChange={(e) => setFormState(s => ({ ...s, name: e.target.value }))}
                                    style={{ width: '100%', padding: '14px 16px', background: theme.secondaryBg, border: `1px solid ${theme.border}`, borderRadius: '12px', color: theme.primaryText, outline: 'none', fontSize: '1rem', boxSizing: 'border-box' }} />

                                <input type="email" name="user_email" placeholder="Your Email" required
                                    value={formState.email} onChange={(e) => setFormState(s => ({ ...s, email: e.target.value }))}
                                    style={{ width: '100%', padding: '14px 16px', background: theme.secondaryBg, border: `1px solid ${theme.border}`, borderRadius: '12px', color: theme.primaryText, outline: 'none', fontSize: '1rem', boxSizing: 'border-box' }} />

                                <input type="text" name="company_name" placeholder="Company Name (optional)"
                                    value={formState.company} onChange={(e) => setFormState(s => ({ ...s, company: e.target.value }))}
                                    style={{ width: '100%', padding: '14px 16px', background: theme.secondaryBg, border: `1px solid ${theme.border}`, borderRadius: '12px', color: theme.primaryText, outline: 'none', fontSize: '1rem', boxSizing: 'border-box' }} />

                                <textarea name="message" rows="5"
                                    placeholder={isProjectDetailsEnabled ? 'Project Details' : 'Project Details (enter Name + Email first)'}
                                    required disabled={!isProjectDetailsEnabled}
                                    style={{ width: '100%', flex: 1, padding: '14px 16px', background: theme.secondaryBg, border: `1px solid ${theme.border}`, borderRadius: '12px', color: theme.primaryText, resize: 'none', outline: 'none', fontSize: '1rem', fontFamily: 'inherit', opacity: isProjectDetailsEnabled ? 1 : 0.6, cursor: isProjectDetailsEnabled ? 'text' : 'not-allowed', boxSizing: 'border-box' }}
                                ></textarea>

                                <button type="submit" disabled={status.sending}
                                    style={{
                                        width: '100%', padding: '15px',
                                        background: status.sent ? '#46d369' : status.error ? '#ff5252' : theme.accent,
                                        border: 'none', color: '#fff', borderRadius: '12px',
                                        cursor: status.sending ? 'not-allowed' : 'pointer',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                                        fontWeight: 'bold', fontSize: '1rem', transition: 'all 0.3s ease'
                                    }}>
                                    {status.sending ? 'Sending...' : status.sent ? 'Message Sent!' : status.error ? 'Error! Try Again' : (
                                        <>Send Message <Send size={18} /></>
                                    )}
                                </button>
                            </form>
                        </div>
                    </SpotlightCard>
                    </motion.div>

                </div>
            </div>
        </section>
    );
};

export default Contact;
