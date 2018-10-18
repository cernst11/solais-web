/* eslint-disable  */

export default new class ColorHelper {
    HSVtoHEX(h, s, v) {
        let r, g, b, i, f, p, q, t;
        i = Math.floor(h * 6);
        f = h * 6 - i;
        p = v * (1 - s);
        q = v * (1 - f * s);
        t = v * (1 - (1 - f) * s);
        switch (i % 6) {
            case 0:
                (r = v), (g = t), (b = p);
                break;
            case 1:
                (r = q), (g = v), (b = p);
                break;
            case 2:
                (r = p), (g = v), (b = t);
                break;
            case 3:
                (r = p), (g = q), (b = v);
                break;
            case 4:
                (r = t), (g = p), (b = v);
                break;
            case 5:
                (r = v), (g = p), (b = q);
                break;
            default:
        }
        let color = `#${this.componentToHex(Math.round(r * 255))}${this.componentToHex(
            Math.round(g * 255)
        )}${this.componentToHex(Math.round(b * 255))}`;
        return color;
    }

    componentToHex(c) {
        const hex = c.toString(16);
        return hex.length == 1 ? `0${hex}` : hex;
    }
}();
