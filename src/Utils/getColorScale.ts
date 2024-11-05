import { ScaleLinear, scaleLinear, min, max } from "d3";

export default function getColorScale<T>(data: T[], color: (item: T) => number, colorGradient: readonly [string, string]): ScaleLinear<string, string> {
    return scaleLinear(
        [
            min(data, color) ?? 0,
            max(data, color) ?? 0
        ],
        colorGradient,
    )
}
