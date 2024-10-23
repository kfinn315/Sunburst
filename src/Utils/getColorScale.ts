import { ScaleLinear, scaleLinear, min, max } from "d3";

export default function getColorScale(data: readonly { color: number }[], colorGradient: readonly [string, string]): ScaleLinear<string, string> {
    return scaleLinear(
        [min(data, (x) => x.color) ?? 0, max(data, (x) => x.color) ?? 0],
        colorGradient
    );
}
