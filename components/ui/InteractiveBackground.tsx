"use client";

import { useEffect, useState } from "react";

export function InteractiveBackground() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (event: MouseEvent) => {
            setMousePosition({
                x: event.clientX,
                y: event.clientY,
            });
        };

        window.addEventListener("mousemove", handleMouseMove);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);

    return (
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-slate-50">
            <div
                className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-500/10 rounded-full blur-[100px] transition-transform duration-300 ease-out will-change-transform mix-blend-multiply"
                style={{
                    transform: `translate(${mousePosition.x * 0.03}px, ${mousePosition.y * 0.03}px)`,
                }}
            />
            <div
                className="absolute top-[10%] right-[-10%] w-[50%] h-[50%] bg-purple-500/10 rounded-full blur-[100px] transition-transform duration-500 ease-out will-change-transform mix-blend-multiply"
                style={{
                    transform: `translate(${mousePosition.x * -0.04}px, ${mousePosition.y * -0.04}px)`,
                }}
            />
            <div
                className="absolute bottom-[-10%] left-[20%] w-[60%] h-[60%] bg-cyan-400/10 rounded-full blur-[120px] transition-transform duration-700 ease-out will-change-transform mix-blend-multiply"
                style={{
                    transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * -0.02}px)`,
                }}
            />
            <div
                className="absolute bottom-[10%] right-[10%] w-[30%] h-[30%] bg-indigo-500/10 rounded-full blur-[100px] transition-transform duration-1000 ease-out will-change-transform mix-blend-multiply"
                style={{
                    transform: `translate(${mousePosition.x * -0.01}px, ${mousePosition.y * 0.01}px)`,
                }}
            />
        </div>
    );
}
