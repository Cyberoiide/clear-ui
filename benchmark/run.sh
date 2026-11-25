#!/usr/bin/env bash
# Screenshots and measures each run in benchmark/runs/<skill>/.
# Usage: CHROME=/path/to/chrome benchmark/run.sh
set -euo pipefail
here="$(cd "$(dirname "$0")" && pwd)"
chrome="${CHROME:-chromium}"
tmp="$(mktemp -d)"; trap 'rm -rf "$tmp"' EXIT
shot() { # url out width height
  "$chrome" --headless=new --no-sandbox --hide-scrollbars --user-data-dir="$tmp/p" \
    --window-size="$3,$4" --virtual-time-budget=4000 --screenshot="$2" "$1" >/dev/null 2>&1
}

mkdir -p "$here/shots"
echo "{" > "$here/metrics.json"; sep=""
for dir in "$here"/runs/*/; do
  name="$(basename "$dir")"
  shot "file://$dir/index.html" "$here/shots/$name-final.png" 1440 900
  shot "file://$dir/index.html" "$here/shots/$name-phone.png" 390 844
  [ -f "$dir/first-reply.html" ] && shot "file://$dir/first-reply.html" "$here/shots/$name-first.png" 1440 900

  # measured copy: same page with measure.js appended, in the same folder so relative paths hold
  { cat "$dir/index.html"; echo "<script>"; cat "$here/measure.js"; echo "</script>"; } > "$dir/.measured.html"
  m="$("$chrome" --headless=new --no-sandbox --user-data-dir="$tmp/p" --window-size=1440,900 \
        --virtual-time-budget=4000 --dump-dom "file://$dir/.measured.html" 2>/dev/null |
      python3 -I -c 'import sys,re,html; print(html.unescape(re.search(r"data-metrics=\"([^\"]*)\"", sys.stdin.read()).group(1)))')"
  rm -f "$dir/.measured.html"
  printf '%s  "%s": %s' "$sep" "$name" "${m%\}}, \"bytes\": $(wc -c < "$dir/index.html")}" >> "$here/metrics.json"; sep=$',\n'
done
printf '\n}\n' >> "$here/metrics.json"
cat "$here/metrics.json"
