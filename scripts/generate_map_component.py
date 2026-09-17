import re

with open('contact-us_1.html', 'r') as f:
    content = f.read()

# Extract CSS
css_match = re.search(r'<style>(.*?)</style>', content, re.DOTALL)
if css_match:
    with open('src/components/InteractiveMapHero.css', 'w') as f:
        f.write(css_match.group(1))

# Extract HTML body
html_match = re.search(r'<div class="page">(.*?)</div>\s*<div class="tooltip" id="tooltip"></div>', content, re.DOTALL)
html = html_match.group(0) if html_match else ""

# Extract Scripts
state_data_match = re.search(r'var STATE_DATA = (.*?);', content, re.DOTALL)
state_data = state_data_match.group(1) if state_data_match else "[]"

app_script_match = re.search(r'<script id="app-script">(.*?)</script>', content, re.DOTALL)
app_script = app_script_match.group(1) if app_script_match else ""

react_component = f"""
import React, {{ useEffect }} from 'react';
import './InteractiveMapHero.css';

const STATE_DATA = {state_data};

export default function InteractiveMapHero() {{
  useEffect(() => {{
    {app_script.replace('(function(){', '').replace('})();', '')}
  }}, []);

  return (
    <div style={{{{ position: 'relative', zIndex: 10, background: 'var(--void)' }}}}>
      <div className="map-hero-wrapper" dangerouslySetInnerHTML={{{{ __html: `{html}` }}}} />
    </div>
  );
}}
"""

with open('src/components/InteractiveMapHero.jsx', 'w') as f:
    f.write(react_component)

