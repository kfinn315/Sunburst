import { PropsWithChildren } from "react";

interface UnscaledSVGProps {
    width: number;
    height: number;
}

export default function UnscaledSVG({ width, height, children }: PropsWithChildren<UnscaledSVGProps>) {
    return <svg
        width={width}
        height={height}
        viewBox={`0 0 ${String(width)} ${String(height)}`}
    >{children}</svg>
}
