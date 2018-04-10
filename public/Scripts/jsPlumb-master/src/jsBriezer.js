﻿(function () {
    "undefined" == typeof Math.sgn && (Math.sgn = function (a) { return 0 == a ? 0 : 0 < a ? 1 : -1 }); var q = { subtract: function (a, b) { return { x: a.x - b.x, y: a.y - b.y } }, dotProduct: function (a, b) { return a.x * b.x + a.y * b.y }, square: function (a) { return Math.sqrt(a.x * a.x + a.y * a.y) }, scale: function (a, b) { return { x: a.x * b, y: a.y * b } } }, B = Math.pow(2, -65), x = function (a, b) {
        for (var f = [], d = b.length - 1, g = 2 * d - 1, h = [], e = [], m = [], k = [], l = [[1, 0.6, 0.3, 0.1], [0.4, 0.6, 0.6, 0.4], [0.1, 0.3, 0.6, 1]], c = 0; c <= d; c++) h[c] = q.subtract(b[c], a); for (c = 0; c <= d - 1; c++) e[c] = q.subtract(b[c +
        1], b[c]), e[c] = q.scale(e[c], 3); for (c = 0; c <= d - 1; c++) for (var n = 0; n <= d; n++) m[c] || (m[c] = []), m[c][n] = q.dotProduct(e[c], h[n]); for (c = 0; c <= g; c++) k[c] || (k[c] = []), k[c].y = 0, k[c].x = parseFloat(c) / g; g = d - 1; for (h = 0; h <= d + g; h++) { c = Math.max(0, h - g); for (e = Math.min(h, d) ; c <= e; c++) j = h - c, k[c + j].y += m[j][c] * l[j][c] } d = b.length - 1; k = u(k, 2 * d - 1, f, 0); g = q.subtract(a, b[0]); m = q.square(g); for (c = l = 0; c < k; c++) g = q.subtract(a, v(b, d, f[c], null, null)), g = q.square(g), g < m && (m = g, l = f[c]); g = q.subtract(a, b[d]); g = q.square(g); g < m && (m = g, l = 1); return {
            location: l,
            distance: m
        }
    }, u = function (a, b, f, d) {
        var g = [], h = [], e = [], m = [], k = 0, l, c; c = Math.sgn(a[0].y); for (var n = 1; n <= b; n++) l = Math.sgn(a[n].y), l != c && k++, c = l; switch (k) {
            case 0: return 0; case 1: if (64 <= d) return f[0] = (a[0].x + a[b].x) / 2, 1; var r, p, k = a[0].y - a[b].y; c = a[b].x - a[0].x; n = a[0].x * a[b].y - a[b].x * a[0].y; l = max_distance_below = 0; for (r = 1; r < b; r++) p = k * a[r].x + c * a[r].y + n, p > l ? l = p : p < max_distance_below && (max_distance_below = p); p = c; r = 0 * p - 1 * k; l = (1 * (n - l) - 0 * p) * (1 / r); p = c; c = n - max_distance_below; r = 0 * p - 1 * k; k = (1 * c - 0 * p) * (1 / r); c = Math.min(l, k);
                if (Math.max(l, k) - c < B) return e = a[b].x - a[0].x, m = a[b].y - a[0].y, f[0] = 0 + 1 * (e * (a[0].y - 0) - m * (a[0].x - 0)) * (1 / (0 * e - 1 * m)), 1
        } v(a, b, 0.5, g, h); a = u(g, b, e, d + 1); b = u(h, b, m, d + 1); for (d = 0; d < a; d++) f[d] = e[d]; for (d = 0; d < b; d++) f[d + a] = m[d]; return a + b
    }, v = function (a, b, f, d, g) {
        for (var h = [[]], e = 0; e <= b; e++) h[0][e] = a[e]; for (a = 1; a <= b; a++) for (e = 0; e <= b - a; e++) h[a] || (h[a] = []), h[a][e] || (h[a][e] = {}), h[a][e].x = (1 - f) * h[a - 1][e].x + f * h[a - 1][e + 1].x, h[a][e].y = (1 - f) * h[a - 1][e].y + f * h[a - 1][e + 1].y; if (null != d) for (e = 0; e <= b; e++) d[e] = h[e][0]; if (null != g) for (e =
        0; e <= b; e++) g[e] = h[b - e][e]; return h[b][0]
    }, y = {}, s = function (a, b) {
        var f, d = a.length - 1; f = y[d]; if (!f) {
            f = []; var g = function (a) { return function () { return a } }, h = function () { return function (a) { return a } }, e = function () { return function (a) { return 1 - a } }, m = function (a) { return function (b) { for (var c = 1, d = 0; d < a.length; d++) c *= a[d](b); return c } }; f.push(new function () { return function (a) { return Math.pow(a, d) } }); for (var k = 1; k < d; k++) { for (var l = [new g(d)], c = 0; c < d - k; c++) l.push(new h); for (c = 0; c < k; c++) l.push(new e); f.push(new m(l)) } f.push(new function () {
                return function (a) {
                    return Math.pow(1 -
                    a, d)
                }
            }); y[d] = f
        } for (e = h = g = 0; e < a.length; e++) g += a[e].x * f[e](b), h += a[e].y * f[e](b); return { x: g, y: h }
    }, z = function (a, b) { return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2)) }, A = function (a) { return a[0].x == a[1].x && a[0].y == a[1].y }, t = function (a, b, f) { if (A(a)) return { point: a[0], location: b }; for (var d = s(a, b), g = 0, h = 0 < f ? 1 : -1, e = null; g < Math.abs(f) ;) b += 0.005 * h, e = s(a, b), g += z(e, d), d = e; return { point: e, location: b } }, w = function (a, b) {
        var f = s(a, b), d = s(a.slice(0, a.length - 1), b), g = d.y - f.y, f = d.x - f.x; return 0 == g ? Infinity : Math.atan(g /
        f)
    }; window.jsBezier = {
        distanceFromCurve: x, gradientAtPoint: w, gradientAtPointAlongCurveFrom: function (a, b, f) { b = t(a, b, f); 1 < b.location && (b.location = 1); 0 > b.location && (b.location = 0); return w(a, b.location) }, nearestPointOnCurve: function (a, b) { var f = x(a, b); return { point: v(b, b.length - 1, f.location, null, null), location: f.location } }, pointOnCurve: s, pointAlongCurveFrom: function (a, b, f) { return t(a, b, f).point }, perpendicularToCurveAt: function (a, b, f, d) {
            b = t(a, b, null == d ? 0 : d); a = w(a, b.location); d = Math.atan(-1 / a); a = f / 2 * Math.sin(d);
            f = f / 2 * Math.cos(d); return [{ x: b.point.x + f, y: b.point.y + a }, { x: b.point.x - f, y: b.point.y - a }]
        }, locationAlongCurveFrom: function (a, b, f) { return t(a, b, f).location }, getLength: function (a) { if (A(a)) return 0; for (var b = s(a, 0), f = 0, d = 0, g = null; 1 > d;) d += 0.005, g = s(a, d), f += z(g, b), b = g; return f }
    }
})();

