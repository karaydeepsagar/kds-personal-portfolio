import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, Linkedin, Github, Send, Copy, Check } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { useTheme } from '../context/ThemeContext';

const Contact = ({ data }) => {
    const { theme } = useTheme();
    const form = useRef();
    const sectionRef = useRef(null);
    const [copied, setCopied] = useState(null);
    const [status, setStatus] = useState({ sending: false, sent: false, error: false });
    const [isMobile, setIsMobile] = useState(false);
    const [formState, setFormState] = useState({ name: '', email: '', company: '' });
    const [isInView, setIsInView] = useState(true);

    // Centered infinity loop path (0..800 viewBox)
    const infinityPath = 'M 200,200 C 200,100 350,100 400,200 C 450,300 600,300 600,200 C 600,100 450,100 400,200 C 350,300 200,300 200,200 Z';

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
            { threshold: 0.1, rootMargin: '350px 0px' }
        );
        observer.observe(element);
        return () => observer.disconnect();
    }, []);

    const shouldLoop = isInView;

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

        // Replace these with your actual IDs from EmailJS Dashboard
        const SERVICE_ID = "service_081bfnh";
        const TEMPLATE_ID = "template_8bi1rzo";
        const PUBLIC_KEY = "ce75KhFQtTzjSjB-o";

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
                input::placeholder, textarea::placeholder {
                    opacity: 0.7;
                }
                input:focus::placeholder, textarea:focus::placeholder {
                    opacity: 0;
                    transition: opacity 0.2s ease;
                }
            `}</style>
            <div className="section-padding" style={{ paddingLeft: '4%', paddingRight: '4%', minHeight: '100vh', background: 'transparent', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                {/* Heading outside the panel, similar to Industrial Insights */}
                <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                    <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 800, color: theme.primaryText, marginBottom: '12px' }}>
                        <span>Let's</span> <span style={{ color: theme.accent }}>Collaborate</span>
                    </h2>
                    <p style={{ color: theme.mutedText, fontSize: '1rem', maxWidth: '680px', margin: '0 auto' }}>
                        Ready to elevate your infrastructure? I'm available for new opportunities in Cloud Architecture and DevOps engineering.
                    </p>
                </div>

                <div
                    className="contact-container"
                    style={{
                        width: '100%',
                        maxWidth: '900px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: isMobile ? '1.5rem' : '2rem',
                        padding: isMobile ? '1.5rem' : '2.5rem',
                        background: theme.cardBg,
                        backdropFilter: 'blur(20px)',
                        borderRadius: '24px',
                        border: `1px solid ${theme.border}`,
                        boxShadow: theme.cardShadow,
                        position: 'relative',
                        overflow: 'hidden'
                    }}
                >
                    {/* Nucleus glow centered INSIDE the contact tile */}
                    <div
                        style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            width: isMobile ? 'min(620px, 95%)' : 'min(820px, 92%)',
                            height: isMobile ? 'min(620px, 95%)' : 'min(820px, 92%)',
                            transform: 'translate(-50%, -50%)',
                            transformOrigin: 'center',
                            background: 'radial-gradient(circle, var(--netflix-red) 0%, transparent 72%)',
                            borderRadius: '50%',
                            filter: 'blur(125px)',
                            opacity: theme.mode === 'dark' ? 0.22 : 0.14,
                            pointerEvents: 'none',
                            zIndex: 0
                        }}
                    />

                    {/* Big infinity loop animation (centered in tile) */}
                    <svg
                        width={isMobile ? 'min(1200px, 145%)' : 'min(1600px, 150%)'}
                        height={isMobile ? 'min(560px, 88%)' : 'min(760px, 92%)'}
                        viewBox="0 0 800 400"
                        preserveAspectRatio="xMidYMid meet"
                        style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            filter: theme.mode === 'dark' ? 'blur(1.2px)' : 'blur(1px)',
                            opacity: theme.mode === 'dark' ? 0.42 : 0.34,
                            pointerEvents: 'none',
                            zIndex: 0
                        }}
                        aria-hidden="true"
                    >
                        <motion.path
                            d={infinityPath}
                            fill="none"
                            stroke={theme.border}
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            opacity={theme.mode === 'dark' ? 0.55 : 0.35}
                        />
                        <motion.path
                            d={infinityPath}
                            fill="none"
                            stroke={theme.mode === 'dark' ? '#fff' : theme.mutedText}
                            strokeWidth="3.6"
                            strokeLinecap="butt"
                            strokeLinejoin="round"
                            strokeDasharray="28 92"
                            animate={shouldLoop ? { strokeDashoffset: [60, -180] } : { strokeDashoffset: 0 }}
                            transition={shouldLoop ? { duration: 7, repeat: Infinity, ease: 'linear' } : undefined}
                            opacity={theme.mode === 'dark' ? 0.34 : 0.28}
                        />
                        <motion.path
                            d={infinityPath}
                            fill="none"
                            stroke="var(--netflix-red)"
                            strokeWidth="4.2"
                            strokeLinecap="butt"
                            strokeLinejoin="round"
                            strokeDasharray="28 92"
                            animate={shouldLoop ? { strokeDashoffset: [0, -240] } : { strokeDashoffset: 0 }}
                            transition={shouldLoop ? { duration: 7, repeat: Infinity, ease: 'linear' } : undefined}
                            opacity={theme.mode === 'dark' ? 0.42 : 0.36}
                        />
                    </svg>

                    {/* Contact Info Card */}
                    <div
                        style={{
                            padding: 0,
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '1.5rem',
                            position: 'relative',
                            zIndex: 1
                        }}
                    >
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                            {/* Email Item */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', padding: '1.1rem 1.25rem', background: theme.secondaryBg, borderRadius: '16px', transition: 'background 0.3s', border: `1px solid ${theme.border}`, width: '100%', maxWidth: '100%' }}>
                                <div style={{ background: `${theme.accent}1A`, padding: '12px', borderRadius: '12px', color: theme.accent }}>
                                    <Mail size={24} />
                                </div>
                                <div style={{ flex: 1, minWidth: 0 }}>
                                    <span style={{ display: 'block', fontSize: '0.85rem', color: theme.mutedText, marginBottom: '4px' }}>Email</span>
                                    <span style={{ fontSize: '1.1rem', fontWeight: 500, color: theme.primaryText, display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{data.email}</span>
                                </div>
                                <button
                                    onClick={() => copyToClipboard(data.email, 'email')}
                                    style={{ background: 'transparent', border: 'none', color: theme.mutedText, cursor: 'pointer', padding: '8px', flexShrink: 0 }}
                                >
                                    {copied === 'email' ? <Check size={18} color="#46d369" /> : <Copy size={18} />}
                                </button>
                            </div>

                            {/* Phone Item */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', padding: '1.1rem 1.25rem', background: theme.secondaryBg, borderRadius: '16px', border: `1px solid ${theme.border}`, width: '100%', maxWidth: '100%' }}>
                                <div style={{ background: theme.mode === 'dark' ? 'rgba(78, 205, 196, 0.1)' : 'rgba(78, 205, 196, 0.15)', padding: '12px', borderRadius: '12px', color: '#4ECDC4' }}>
                                    <Phone size={24} />
                                </div>
                                <div style={{ flex: 1, minWidth: 0 }}>
                                    <span style={{ display: 'block', fontSize: '0.85rem', color: theme.mutedText, marginBottom: '4px' }}>Phone</span>
                                    <span style={{ fontSize: '1.1rem', fontWeight: 500, color: theme.primaryText, display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{data.phone}</span>
                                </div>
                                <button
                                    onClick={() => copyToClipboard(data.phone, 'phone')}
                                    style={{ background: 'transparent', border: 'none', color: theme.mutedText, cursor: 'pointer', padding: '8px', flexShrink: 0 }}
                                >
                                    {copied === 'phone' ? <Check size={18} color="#46d369" /> : <Copy size={18} />}
                                </button>
                            </div>

                            {/* Links Section */}
                            <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                                <a
                                    href="https://www.linkedin.com/in/karaydeepsagar/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{
                                        flex: 1,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '10px',
                                        padding: '1rem',
                                        background: '#0077b5',
                                        borderRadius: '16px',
                                        color: 'white',
                                        textDecoration: 'none',
                                        fontWeight: 600,
                                        transition: 'transform 0.2s'
                                    }}
                                    onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-3px)'}
                                    onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                                >
                                    <Linkedin size={20} /> LinkedIn
                                </a>
                                <a
                                    href="https://github.com/karaydeepsagar"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{
                                        flex: 1,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '10px',
                                        padding: '1rem',
                                        background: '#333',
                                        borderRadius: '16px',
                                        color: 'white',
                                        textDecoration: 'none',
                                        fontWeight: 600,
                                        transition: 'transform 0.2s'
                                    }}
                                    onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-3px)'}
                                    onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                                >
                                    <Github size={20} /> GitHub
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Form Card */}
                    <div
                        style={{
                            position: 'relative',
                            zIndex: 1
                        }}
                    >
                        <form
                            ref={form}
                            onSubmit={sendEmail}
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '20px',
                                background: 'transparent',
                                padding: 0,
                                borderRadius: '0',
                                border: 'none',
                            }}
                        >
                            {/* EmailJS template compatibility fields (safe even if unused) */}
                            <input type="hidden" name="from_name" value={formState.name} />
                            <input type="hidden" name="reply_to" value={formState.email} />
                            <input type="hidden" name="from_email" value={formState.email} />
                            <input type="hidden" name="company" value={formState.company} />

                            <h3 style={{ fontSize: '1.4rem', marginBottom: '0.5rem', color: theme.primaryText }}>Message Details</h3>

                            <div className="input-group">
                                <input
                                    type="text"
                                    name="user_name"
                                    placeholder="Your Name"
                                    required
                                    value={formState.name}
                                    onChange={(e) => setFormState(s => ({ ...s, name: e.target.value }))}
                                    style={{ width: '100%', padding: '16px', background: theme.secondaryBg, border: `1px solid ${theme.border}`, borderRadius: '12px', color: theme.primaryText, outline: 'none', fontSize: '1rem' }}
                                />
                            </div>
                            <div className="input-group">
                                <input
                                    type="email"
                                    name="user_email"
                                    placeholder="Your Email"
                                    required
                                    value={formState.email}
                                    onChange={(e) => setFormState(s => ({ ...s, email: e.target.value }))}
                                    style={{ width: '100%', padding: '16px', background: theme.secondaryBg, border: `1px solid ${theme.border}`, borderRadius: '12px', color: theme.primaryText, outline: 'none', fontSize: '1rem' }}
                                />
                            </div>
                            <div style={{
                                fontSize: '0.9rem',
                                color: theme.mutedText,
                                marginTop: '-6px',
                                paddingLeft: '4px'
                            }}>
                                Enter your name and email first to unlock “Project Details”.
                            </div>
                            <div className="input-group">
                                <input
                                    type="text"
                                    name="company_name"
                                    placeholder="Company Name"
                                    value={formState.company}
                                    onChange={(e) => setFormState(s => ({ ...s, company: e.target.value }))}
                                    style={{ width: '100%', padding: '16px', background: theme.secondaryBg, border: `1px solid ${theme.border}`, borderRadius: '12px', color: theme.primaryText, outline: 'none', fontSize: '1rem' }}
                                />
                            </div>
                            <div className="input-group">
                                <textarea
                                    name="message"
                                    rows="5"
                                    placeholder={isProjectDetailsEnabled ? 'Project Details' : 'Project Details (unlock by entering Name + Email above)'}
                                    required
                                    disabled={!isProjectDetailsEnabled}
                                    style={{ width: '100%', padding: '16px', background: theme.secondaryBg, border: `1px solid ${theme.border}`, borderRadius: '12px', color: theme.primaryText, resize: 'none', outline: 'none', fontSize: '1rem', fontFamily: 'inherit', opacity: isProjectDetailsEnabled ? 1 : 0.7, cursor: isProjectDetailsEnabled ? 'text' : 'not-allowed' }}
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                disabled={status.sending}
                                style={{
                                    marginTop: '10px',
                                    width: '100%',
                                    justifyContent: 'center',
                                    padding: '16px',
                                    background: status.sent ? '#46d369' : status.error ? '#ff5252' : theme.accent,
                                    border: 'none',
                                    color: status.sent || status.error ? '#fff' : '#fff',
                                    borderRadius: '8px',
                                    cursor: status.sending ? 'not-allowed' : 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    fontWeight: 'bold',
                                    transition: 'all 0.3s ease'
                                }}
                            >
                                {status.sending ? 'Sending...' : status.sent ? 'Message Sent!' : status.error ? 'Error! Try Again' : (
                                    <>Send Message <Send size={18} style={{ marginLeft: '8px' }} /></>
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
