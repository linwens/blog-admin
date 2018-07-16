//渐变颜色值
/*将rgb转16进制*/
var colorFunctions;
var Color = function (rgb, a) {//16进制色值，透明度
    //
    // The end goal here, is to parse the arguments
    // into an integer triplet, such as `128, 255, 0`
    //
    // This facilitates operations and conversions.
    //
    // if (Array.isArray(rgb)) {
    //     this.rgb = rgb;
    // } else if (rgb.length == 6) {
    //     this.rgb = rgb.match(/.{2}/g).map(function (c) {
    //         return parseInt(c, 16);
    //     });
    // } else {
    //     this.rgb = rgb.split('').map(function (c) {
    //         return parseInt(c + c, 16);
    //     });
    // }
    
    // if (typeof originalForm !== 'undefined') {
    //     this.value = originalForm;
    // }
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
        let rgb = toHex([r, g, b]);
        a = Number(a);
        console.log('rgba('+r+','+g+','+b+','+a+')');
        return 'rgba('+r+','+g+','+b+','+a+')';
    },
    // hsl: function (h, s, l) {
    //     return colorFunctions.hsla(h, s, l, 1.0);
    // },
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
    lighten: function (color, amount, alpha) {
        var hsl = (new Color(color)).toHSL();
        console.log(hsl);
        console.log(amount);
        hsl.a = alpha?alpha:1;
        hsl.l += amount;
        console.log(hsl.l);
        hsl.l = clamp(hsl.l);
        return hsla(hsl);
    },
    darken: function (color, amount, method) {
        var hsl = color.toHSL();

        if (typeof method !== "undefined" && method.value === "relative") {
            hsl.l -=  hsl.l * amount.value / 100;
        }
        else {
            hsl.l -= amount.value / 100;
        }
        hsl.l = clamp(hsl.l);
        return colorFunctions.hsla(hsl);
    },
};
export const gradualChange = (rgba,val)=>{
    //先拿到rgba的值
    //再抄几个颜色值转换公共方法
    //再抄api方法

}

export default colorFunctions;