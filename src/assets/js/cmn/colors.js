//渐变颜色值
/**
 *恶补些基础知识
 *1、HSL：对色相(H)、饱和度(S)、明度(L)
 *
 *制作思路：
 *抄袭less的颜色函数，进行rgb、hsl、16进制色值的转换，实现变色
**/
/*将rgb转16进制*/
var colorFunctions;
var Color = function (rgb, a) {//16进制色值，透明度
    if(rgb.length == 7){
    	this.rgb = rgb.slice(1,rgb.length-1).split('').map(function (c) {
            return parseInt(c + c, 16);
        });
    }else{
    	alert('传到色值参数不对')
    }
    this.alpha = typeof a === 'number' ? a : 1;
};
function clamp(val) {
    return Math.min(1, Math.max(0, val));
}
function toHex(v) {
    return '#' + v.map(function (c) {
        c = clamp(Math.round(c), 255);
        return (c < 16 ? '0' : '') + c.toString(16);
    }).join('');
}
function hsla(color) {
    return colorFunctions.hsla(color.h, color.s, color.l, color.a);
}
Color.prototype.toRGB = function () {
    return toHex(this.rgb);
};
Color.prototype.toHSL = function () {
	console.log(this.rgb);
    var r = this.rgb[0] / 255,
        g = this.rgb[1] / 255,
        b = this.rgb[2] / 255,
        a = this.alpha;

    var max = Math.max(r, g, b), min = Math.min(r, g, b);
    var h, s, l = (max + min) / 2, d = max - min;

    if (max === min) {
        h = s = 0;
    } else {
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2;               break;
            case b: h = (r - g) / d + 4;               break;
        }
        h /= 6;
    }
    return { h: h * 360, s: s, l: l, a: a };
};
colorFunctions = {
    rgb: function (r, g, b) {
        return colorFunctions.rgba(r, g, b, 1.0);
    },
    rgba: function (r, g, b, a) {
        a = Number(a);
        let rgba = parseInt(r)+','+parseInt(g)+','+parseInt(b)+','+a;
        console.log('rgba('+rgba+')');
        return 'rgba('+rgba+')';
    },
    hsla: function (h, s, l, a) {
        var m1, m2;

        function hue(h) {
            h = h < 0 ? h + 1 : (h > 1 ? h - 1 : h);
            if (h * 6 < 1) {
                return m1 + (m2 - m1) * h * 6;
            }
            else if (h * 2 < 1) {
                return m2;
            }
            else if (h * 3 < 2) {
                return m1 + (m2 - m1) * (2 / 3 - h) * 6;
            }
            else {
                return m1;
            }
        }

        h = (h % 360) / 360;
        s = clamp(s); l = clamp(l); a = clamp(a);

        m2 = l <= 0.5 ? l * (s + 1) : l + s - l * s;
        m1 = l * 2 - m2;

        return colorFunctions.rgba(hue(h + 1 / 3) * 255,
            hue(h)       * 255,
            hue(h - 1 / 3) * 255,
            a);
    },
    saturate: function (color, amount, alpha) {
        // filter: saturate(3.2);
        // should be kept as is, so check for color
        var hsl = (new Color(color)).toHSL();
        hsl.a = alpha?alpha:1;
        hsl.s += amount
        hsl.s = clamp(hsl.s);
        return hsla(hsl);
    },
    spin: function (color, amount, alpha) {
        var hsl = (new Color(color)).toHSL();
        var hue = (hsl.h + amount*100) % 360;
        hsl.a = alpha?alpha:1;
        hsl.h = hue < 0 ? 360 + hue : hue;
        return hsla(hsl);
    },
    lighten: function (color, amount, alpha) {
        var hsl = (new Color(color)).toHSL();
        hsl.a = alpha?alpha:1;
        hsl.l += amount;
        hsl.l = clamp(hsl.l);
        return hsla(hsl);
    },
    darken: function (color, amount, alpha) {
        var hsl = (new Color(color)).toHSL();
        hsl.a = alpha?alpha:1;
        hsl.l -= amount
        hsl.l = clamp(hsl.l);
        return hsla(hsl);
    },
};

export default colorFunctions;