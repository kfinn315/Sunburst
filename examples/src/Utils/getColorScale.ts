import { ScaleLinear, scaleLinear, min, max } from "d3";
import { SunburstItem } from "kfinn315_sunburst";

export function getColorScale(data: readonly SunburstItem[], colorGradient: readonly [string, string]): ScaleLinear<string, string> {
    return scaleLinear(
        [min(data, (x) => x.color) ?? 0, max(data, (x) => x.color) ?? 0],
        colorGradient
    );
}
