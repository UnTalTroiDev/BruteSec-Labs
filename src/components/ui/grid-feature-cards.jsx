import { cn } from '@/lib/utils';
import React, { useMemo } from 'react';

// Deterministic pattern based on a seed — no layout shift on re-render
function seededPattern(seed, length = 5) {
    let s = seed;
    const rand = () => {
        s = (s * 1664525 + 1013904223) & 0xffffffff;
        return (s >>> 0) / 0xffffffff;
    };
    return Array.from({ length }, () => [
        Math.floor(rand() * 4) + 7,
        Math.floor(rand() * 6) + 1,
    ]);
}

export function FeatureCard({ feature, index = 0, className, ...props }) {
    const p = useMemo(() => seededPattern(index + 1), [index]);

    return (
        <div className={cn('relative overflow-hidden p-6', className)} {...props}>
            <div className="pointer-events-none absolute top-0 left-1/2 -mt-2 -ml-20 h-full w-full [mask-image:linear-gradient(white,transparent)]">
                <div className="from-foreground/5 to-foreground/1 absolute inset-0 bg-gradient-to-r [mask-image:radial-gradient(farthest-side_at_top,white,transparent)] opacity-100">
                    <GridPattern
                        width={20}
                        height={20}
                        x="-12"
                        y="4"
                        squares={p}
                        className="fill-foreground/5 stroke-foreground/25 absolute inset-0 h-full w-full mix-blend-overlay"
                    />
                </div>
            </div>
            <feature.icon className="text-foreground/75 size-6" strokeWidth={1} aria-hidden />
            <h3 className="mt-10 text-sm md:text-base">{feature.title}</h3>
            <p className="text-muted-foreground relative z-20 mt-2 text-xs font-light">{feature.description}</p>
        </div>
    );
}

function GridPattern({ width, height, x, y, squares, ...props }) {
    const patternId = React.useId();

    return (
        <svg aria-hidden="true" {...props}>
            <defs>
                <pattern id={patternId} width={width} height={height} patternUnits="userSpaceOnUse" x={x} y={y}>
                    <path d={`M.5 ${height}V.5H${width}`} fill="none" />
                </pattern>
            </defs>
            <rect width="100%" height="100%" strokeWidth={0} fill={`url(#${patternId})`} />
            {squares && (
                <svg x={x} y={y} className="overflow-visible">
                    {squares.map(([x, y], index) => (
                        <rect strokeWidth="0" key={index} width={width + 1} height={height + 1} x={x * width} y={y * height} />
                    ))}
                </svg>
            )}
        </svg>
    );
}
