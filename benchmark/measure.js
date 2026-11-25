// Counts what is on a rendered page. Injected by run.sh; result lands in <html data-metrics>.
// shortcut: backgrounds are resolved from solid colours only, so text over a gradient or image
// is measured against the nearest solid ancestor. Use a pixel-based checker if that matters.
(() => {
  const rgba = (s) => {
    const m = s.match(/rgba?\(([^)]+)\)/);
    if (!m) return null;
    const p = m[1].split(/[,\s\/]+/).filter(Boolean).map(Number);
    return { r: p[0], g: p[1], b: p[2], a: p.length > 3 ? p[3] : 1 };
  };
  const sat = (c) => {
    const mx = Math.max(c.r, c.g, c.b), mn = Math.min(c.r, c.g, c.b);
    return mx === 0 ? 0 : (mx - mn) / mx;
  };
  const lum = (c) => {
    const f = (v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; };
    return 0.2126 * f(c.r) + 0.7152 * f(c.g) + 0.0722 * f(c.b);
  };
  const over = (top, under) => ({
    r: top.r * top.a + under.r * (1 - top.a),
    g: top.g * top.a + under.g * (1 - top.a),
    b: top.b * top.a + under.b * (1 - top.a), a: 1,
  });
  const bgOf = (el) => {
    const stack = [];
    for (let e = el; e; e = e.parentElement) {
      const c = rgba(getComputedStyle(e).backgroundColor);
      if (c && c.a > 0) { stack.push(c); if (c.a === 1) break; }
    }
    return stack.reverse().reduce((under, top) => over(top, under), { r: 255, g: 255, b: 255, a: 1 });
  };
  // 12 hue buckets: "blue and a slightly different blue" count once.
  const hue = (c) => {
    const mx = Math.max(c.r, c.g, c.b), mn = Math.min(c.r, c.g, c.b), d = mx - mn;
    let h = mx === c.r ? ((c.g - c.b) / d) % 6 : mx === c.g ? (c.b - c.r) / d + 2 : (c.r - c.g) / d + 4;
    return Math.round(((h * 60 + 360) % 360) / 30) % 12;
  };

  const hues = new Set(), fonts = new Set(), sizes = new Set(), weights = new Set(), radii = new Set();
  let gradients = 0, shadows = 0, animated = 0, visible = 0, textEls = 0, lowContrast = 0, filled = 0;

  for (const el of document.body.querySelectorAll('*')) {
    const r = el.getBoundingClientRect(), s = getComputedStyle(el);
    if (!r.width || !r.height || s.visibility === 'hidden' || s.opacity === '0') continue;
    visible++;
    if (/gradient\(/.test(s.backgroundImage)) gradients++;
    if (s.boxShadow !== 'none') shadows++;
    if (s.animationName !== 'none') animated++;
    if (parseFloat(s.borderTopLeftRadius) > 0) radii.add(s.borderTopLeftRadius);

    const bg = rgba(s.backgroundColor);
    const paints = [bg, parseFloat(s.borderTopWidth) > 0 ? rgba(s.borderTopColor) : null];
    const hasText = [...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim());
    if (hasText) paints.push(rgba(s.color));
    for (const c of paints) if (c && c.a > 0.2 && sat(c) > 0.25 && lum(c) > 0.02) hues.add(hue(c));

    if (el.matches('button, [role=button], a.btn, a.button, input[type=submit]') && bg && bg.a > 0.5) {
      const l = lum(over(bg, bgOf(el.parentElement || el)));
      if (l < 0.5 || sat(bg) > 0.25) filled++; // dark or coloured fill = a button asking for attention
    }
    if (hasText) {
      textEls++;
      fonts.add(s.fontFamily.split(',')[0].replace(/["']/g, '').trim());
      sizes.add(s.fontSize); weights.add(s.fontWeight);
      const fg = over(rgba(s.color), bgOf(el)), l1 = lum(fg), l2 = lum(bgOf(el));
      if ((Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05) < 4.5) lowContrast++;
    }
  }
  document.documentElement.setAttribute('data-metrics', JSON.stringify({
    hues: hues.size, gradients, shadows, animated, filledButtons: filled,
    fontFamilies: fonts.size, fontSizes: sizes.size, fontWeights: weights.size, radii: radii.size,
    lowContrastText: lowContrast, textElements: textEls, visibleElements: visible,
    words: document.body.innerText.trim().split(/\s+/).length,
  }));
})();
