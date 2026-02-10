import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
}

export function Card({ children, className, ...props }: CardProps) {
    return (
        <div
            className={cn(
                "bg-white rounded-2xl border border-gray-200 shadow-floating p-6 md:p-8",
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
}
