import React, { useEffect, useRef, useState } from 'react';
import { useMotionValue, useSpring, motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const INTERACTIVE = 'a, button, input, textarea, select, label, [role="button"], [tabindex], .netflix-btn';

const CustomCursor = () => {
    const { theme } = useTheme();
    const [isHovering, setIsHovering] = useState(false);
    const [isVisible, setIsVisible]   = useState(false);
    const [isClicking, setIsClicking] = useState(false);
    const isVisibleRef = useRef(false);

    // Dot element — updated directly in RAF, no re-renders
    const dotRef  = useRef(null);
    // Previous raw position for velocity delta
    const prevX   = useRef(-100);
    const prevY   = useRef(-100);

    // Raw mouse — dot snaps here instantly
    const rawX = useMotionValue(-100);
    const rawY = useMotionValue(-100);

    // Ring trails with spring
    const springCfg = { stiffness: 190, damping: 22, mass: 0.5 };
    const ringX = useSpring(rawX, springCfg);
    const ringY = useSpring(rawY, springCfg);

    // ── RAF: position dot + compute velocity → stretch/squash ─────────
    useEffect(() => {
        let rafId;
        const tick = () => {
            rafId = requestAnimationFrame(tick);
            if (!dotRef.current) return;
            const cx = rawX.get(), cy = rawY.get();
            const vx = cx - prevX.current, vy = cy - prevY.current;
            prevX.current = cx; prevY.current = cy;

            // Position — set directly, zero lag
            dotRef.current.style.left = cx + 'px';
            dotRef.current.style.top  = cy + 'px';

            // Velocity liquid — stretch along direction of travel
            const spd    = Math.sqrt(vx * vx + vy * vy);
            const angle  = Math.atan2(vy, vx) * 180 / Math.PI;
            const stretch = Math.min(1 + spd * 0.09, 2.8);
            const squeeze = 1 / Math.sqrt(stretch);
            const s = isClicking ? 0.55 : 1;

            dotRef.current.style.transform =
                `translate(-50%,-50%) rotate(${angle}deg) scaleX(${stretch * s}) scaleY(${squeeze * s})`;
        };
        tick();
        return () => cancelAnimationFrame(rafId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isClicking]);

    // ── Mouse event listeners ────────────────────────────────────────
    useEffect(() => {
        if (window.matchMedia('(pointer: coarse)').matches) return;

        const onMove = (e) => {
            rawX.set(e.clientX);
            rawY.set(e.clientY);
            if (!isVisibleRef.current) { isVisibleRef.current = true; setIsVisible(true); }
        };
        const onOver  = (e) => { if (e.target.closest(INTERACTIVE)) setIsHovering(true); };
        const onOut   = (e) => { if (e.target.closest(INTERACTIVE)) setIsHovering(false); };
        const onDown  = () => setIsClicking(true);
        const onUp    = () => setIsClicking(false);
        const onLeave = () => { isVisibleRef.current = false; setIsVisible(false); };
        const onEnter = () => { isVisibleRef.current = true;  setIsVisible(true); };

        window.addEventListener('mousemove', onMove);
        window.addEventListener('mouseover', onOver);
        window.addEventListener('mouseout',  onOut);
        window.addEventListener('mousedown', onDown);
        window.addEventListener('mouseup',   onUp);
        document.documentElement.addEventListener('mouseleave', onLeave);
        document.documentElement.addEventListener('mouseenter', onEnter);
        return () => {
            window.removeEventListener('mousemove', onMove);
            window.removeEventListener('mouseover', onOver);
            window.removeEventListener('mouseout',  onOut);
            window.removeEventListener('mousedown', onDown);
            window.removeEventListener('mouseup',   onUp);
            document.documentElement.removeEventListener('mouseleave', onLeave);
            document.documentElement.removeEventListener('mouseenter', onEnter);
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) return null;

    // Dot: white in dark mode, near-black in light mode
    const dotColor  = theme.mode === 'dark' ? '#ffffff' : '#111111';
    // Ring: subtle in idle, turns accent-red on hover
    const ringColor = isHovering
        ? theme.accent
        : theme.mode === 'dark' ? 'rgba(255,255,255,0.35)' : 'rgba(20,20,20,0.3)';

    return (
        <>
            {/* ── Velocity Liquid dot — direct DOM ref, zero re-renders ── */}
            <div
                ref={dotRef}
                style={{
                    position:      'fixed',
                    top:           '-100px',
                    left:          '-100px',
                    width:         '11px',
                    height:        '11px',
                    borderRadius:  '50%',
                    background:    dotColor,
                    opacity:       isVisible ? 1 : 0,
                    pointerEvents: 'none',
                    zIndex:        99999,
                    willChange:    'transform',
                    transition:    'opacity 0.25s ease, background 0.3s ease',
                }}
            />

            {/* ── Ring — spring follower ── */}
            <motion.div
                style={{
                    position:      'fixed',
                    top:           0,
                    left:          0,
                    x:             ringX,
                    y:             ringY,
                    translateX:    '-50%',
                    translateY:    '-50%',
                    pointerEvents: 'none',
                    zIndex:        99998,
                    width:         isHovering ? '20px' : '32px',
                    height:        isHovering ? '20px' : '32px',
                    borderRadius:  '50%',
                    border:        `1px solid ${ringColor}`,
                    background:    isHovering ? `${theme.accent}12` : 'transparent',
                    opacity:       isVisible ? 1 : 0,
                    transition:
                        'width 0.25s cubic-bezier(0.34,1.56,0.64,1), ' +
                        'height 0.25s cubic-bezier(0.34,1.56,0.64,1), ' +
                        'border-color 0.2s ease, background 0.2s ease, opacity 0.25s ease',
                    willChange:    'transform',
                }}
            />
        </>
    );
};

export default CustomCursor;
