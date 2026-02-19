"use client";

import { useEffect, useRef } from "react";

export function InteractiveBackground() {
    const ref1 = useRef<HTMLDivElement>(null);
    const ref2 = useRef<HTMLDivElement>(null);
    const ref3 = useRef<HTMLDivElement>(null);
    const ref4 = useRef<HTMLDivElement>(null);
    const rafId = useRef<number>(0);
    const mouse = useRef({ x: 0, y: 0 });

    useEffect(() => {
        let ticking = false;

        const update = () => {
            const { x, y } = mouse.current;
            if (ref1.current) ref1.current.style.transform = `translate(${x * 0.03}px, ${y * 0.03}px)`;
            if (ref2.current) ref2.current.style.transform = `translate(${x * -0.04}px, ${y * -0.04}px)`;
            if (ref3.current) ref3.current.style.transform = `translate(${x * 0.02}px, ${y * -0.02}px)`;
            if (ref4.current) ref4.current.style.transform = `translate(${x * -0.01}px, ${y * 0.01}px)`;
            ticking = false;
        };

        const handleMouseMove = (event: MouseEvent) => {
            mouse.current = { x: event.clientX, y: event.clientY };
            if (!ticking) {
                ticking = true;
                rafId.current = requestAnimationFrame(update);
            }
        };

        window.addEventListener("mousemove", handleMouseMove, { passive: true });
        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            cancelAnimationFrame(rafId.current);
        };
    }, []);

    return (
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-slate-50" aria-hidden="true">
            <div
                ref={ref1}
                className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-500/10 rounded-full blur-[100px] will-change-transform mix-blend-multiply"
            />
            <div
                ref={ref2}
                className="absolute top-[10%] right-[-10%] w-[50%] h-[50%] bg-purple-500/10 rounded-full blur-[100px] will-change-transform mix-blend-multiply"
            />
            <div
                ref={ref3}
                className="absolute bottom-[-10%] left-[20%] w-[60%] h-[60%] bg-cyan-400/10 rounded-full blur-[120px] will-change-transform mix-blend-multiply"
            />
            <div
                ref={ref4}
                className="absolute bottom-[10%] right-[10%] w-[30%] h-[30%] bg-indigo-500/10 rounded-full blur-[100px] will-change-transform mix-blend-multiply"
            />
        </div>
    );
}
