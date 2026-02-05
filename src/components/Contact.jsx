import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, Linkedin, Github, Send, Copy, Check } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { useTheme } from '../context/ThemeContext';
import IndustrialBackground from './IndustrialBackground';

const Contact = ({ data }) => {
    const { theme } = useTheme();
    const form = useRef();
    const [copied, setCopied] = useState(null);
    const [status, setStatus] = useState({ sending: false, sent: false, error: false });
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const copyToClipboard = (text, type) => {
        navigator.clipboard.writeText(text);
        setCopied(type);
        setTimeout(() => setCopied(null), 2000);
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
                form.current.reset();
                setTimeout(() => setStatus(s => ({ ...s, sent: false })), 5000);
            }, (error) => {
                console.log(error.text);
                setStatus({ sending: false, sent: false, error: true });
                setTimeout(() => setStatus(s => ({ ...s, error: false })), 5000);
            });
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.5,
                ease: "easeOut"
            }
        }
    };

    return (
        <section id="contact" style={{ position: 'relative', overflow: 'hidden' }}>
            <style>{`
                input::placeholder, textarea::placeholder {
                    opacity: 0.7;
                }
                input:focus::placeholder, textarea:focus::placeholder {
                    opacity: 0;
                    transition: opacity 0.2s ease;
                }
            `}</style>
            <IndustrialBackground type="contact" />
            <div className="section-padding" style={{ paddingLeft: '4%', paddingRight: '4%', minHeight: '100vh', background: 'transparent', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                {/* Heading outside the panel, similar to Industrial Insights */}
                <motion.div
                    variants={itemVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    style={{ textAlign: 'center', marginBottom: '40px' }}
                >
                    <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 800, color: theme.primaryText, marginBottom: '12px' }}>
                        <span style={{ color: theme.accent }}>Let's</span> <span>Collaborate</span>
                    </h2>
                    <p style={{ color: theme.mutedText, fontSize: '1rem', maxWidth: '680px', margin: '0 auto' }}>
                        Ready to elevate your infrastructure? I'm available for new opportunities in Cloud Architecture and DevOps engineering.
                    </p>
                </motion.div>

                <motion.div
                    className="contact-container"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
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
                        boxShadow: theme.cardShadow
                    }}
                >
                    {/* Contact Info Card */}
                    <motion.div
                        variants={itemVariants}
                        style={{
                            padding: 0,
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '1.5rem'
                        }}
                    >
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                            {/* Email Item */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', padding: '1.1rem 1.25rem', background: theme.secondaryBg, borderRadius: '16px', transition: 'background 0.3s', border: `1px solid ${theme.border}` }}>
                                <div style={{ background: `${theme.accent}1A`, padding: '12px', borderRadius: '12px', color: theme.accent }}>
                                    <Mail size={24} />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <span style={{ display: 'block', fontSize: '0.85rem', color: theme.mutedText, marginBottom: '4px' }}>Email</span>
                                    <span style={{ fontSize: '1.1rem', fontWeight: 500, color: theme.primaryText }}>{data.email}</span>
                                </div>
                                <button
                                    onClick={() => copyToClipboard(data.email, 'email')}
                                    style={{ background: 'transparent', border: 'none', color: theme.mutedText, cursor: 'pointer', padding: '8px' }}
                                >
                                    {copied === 'email' ? <Check size={18} color="#46d369" /> : <Copy size={18} />}
                                </button>
                            </div>

                            {/* Phone Item */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', padding: '1.1rem 1.25rem', background: theme.secondaryBg, borderRadius: '16px', border: `1px solid ${theme.border}` }}>
                                <div style={{ background: theme.mode === 'dark' ? 'rgba(78, 205, 196, 0.1)' : 'rgba(78, 205, 196, 0.15)', padding: '12px', borderRadius: '12px', color: '#4ECDC4' }}>
                                    <Phone size={24} />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <span style={{ display: 'block', fontSize: '0.85rem', color: theme.mutedText, marginBottom: '4px' }}>Phone</span>
                                    <span style={{ fontSize: '1.1rem', fontWeight: 500, color: theme.primaryText }}>{data.phone}</span>
                                </div>
                                <button
                                    onClick={() => copyToClipboard(data.phone, 'phone')}
                                    style={{ background: 'transparent', border: 'none', color: theme.mutedText, cursor: 'pointer', padding: '8px' }}
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
                    </motion.div>

                    {/* Form Card */}
                    <motion.div
                        variants={itemVariants}
                        style={{
                            position: 'relative'
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
                            <h3 style={{ fontSize: '1.4rem', marginBottom: '0.5rem', color: theme.primaryText }}>Message Details</h3>

                            <div className="input-group">
                                <input
                                    type="text"
                                    name="user_name"
                                    placeholder="Your Name"
                                    required
                                    style={{ width: '100%', padding: '16px', background: theme.secondaryBg, border: `1px solid ${theme.border}`, borderRadius: '12px', color: theme.primaryText, outline: 'none', fontSize: '1rem' }}
                                />
                            </div>
                            <div className="input-group">
                                <input
                                    type="email"
                                    name="user_email"
                                    placeholder="Your Email"
                                    required
                                    style={{ width: '100%', padding: '16px', background: theme.secondaryBg, border: `1px solid ${theme.border}`, borderRadius: '12px', color: theme.primaryText, outline: 'none', fontSize: '1rem' }}
                                />
                            </div>
                            <div className="input-group">
                                <input
                                    type="text"
                                    name="company_name"
                                    placeholder="Company Name"
                                    style={{ width: '100%', padding: '16px', background: theme.secondaryBg, border: `1px solid ${theme.border}`, borderRadius: '12px', color: theme.primaryText, outline: 'none', fontSize: '1rem' }}
                                />
                            </div>
                            <div className="input-group">
                                <textarea
                                    name="message"
                                    rows="5"
                                    placeholder="Project Details"
                                    required
                                    style={{ width: '100%', padding: '16px', background: theme.secondaryBg, border: `1px solid ${theme.border}`, borderRadius: '12px', color: theme.primaryText, resize: 'none', outline: 'none', fontSize: '1rem', fontFamily: 'inherit' }}
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
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default Contact;
