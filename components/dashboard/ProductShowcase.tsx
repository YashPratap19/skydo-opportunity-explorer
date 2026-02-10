import Image from "next/image";

interface ProductShowcaseProps {
    images?: string[];
}

export function ProductShowcase({ images = [] }: ProductShowcaseProps) {
    // Default placeholders if no images provided
    const displayImages = images.length > 0 ? images : [
        "/products/product-1.png",
        "/products/product-2.png",
        "/products/product-3.png",
        "/products/product-4.png",
        "/products/product-1.png", // Repeat for seamless loop
        "/products/product-2.png",
    ];

    return (
        <div className="h-full w-full relative overflow-hidden flex flex-col items-center justify-center">
            {/* Soft ambient glow behind the products, very subtle */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-100/10 via-purple-100/10 to-blue-100/10 rounded-3xl opacity-50" />

            <style jsx>{`
                @keyframes marquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                .animate-marquee-manual {
                    animation: marquee 40s linear infinite;
                    width: max-content; /* Ensure container is wide enough */
                }
            `}</style>

            <div
                className="w-full h-full flex items-center overflow-hidden relative"
                style={{
                    maskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)',
                    WebkitMaskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)'
                }}
            >
                <div className="animate-marquee-manual flex flex-row gap-8 pl-8">
                    {displayImages.map((src, index) => (
                        <div key={index} className="glass-panel p-4 rounded-2xl shadow-sm transform transition-transform hover:scale-[1.02] duration-300 flex-shrink-0 w-80 border-white/40">
                            <div className="aspect-[4/3] relative rounded-xl overflow-hidden bg-white/30 flex items-center justify-center">
                                {/* Use a fallback if image fails or is missing */}
                                <Image
                                    src={src}
                                    alt={`Product showcase ${index + 1}`}
                                    fill
                                    className="object-cover mix-blend-multiply opacity-90 hover:opacity-100 transition-opacity"
                                    onError={(e) => {
                                        // Fallback logic could go here, or just hide
                                        (e.target as HTMLImageElement).style.display = 'none';
                                        (e.target as HTMLImageElement).parentElement!.innerText = "Add image to public/products";
                                    }}
                                />
                            </div>
                        </div>
                    ))}
                    {/* Duplicate for seamless loop */}
                    {displayImages.map((src, index) => (
                        <div key={`dup-${index}`} className="glass-panel p-4 rounded-2xl shadow-sm flex-shrink-0 w-80 border-white/40">
                            <div className="aspect-[4/3] relative rounded-xl overflow-hidden bg-white/30 flex items-center justify-center">
                                <Image
                                    src={src}
                                    alt={`Product showcase ${index + 1}`}
                                    fill
                                    className="object-cover mix-blend-multiply opacity-90 hover:opacity-100 transition-opacity"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
