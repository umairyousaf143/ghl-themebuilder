(function(){
  console.log("Theme Builder script loaded");

  // URLs of your hosted theme CSS files
  const THEMES = [
    { name: "Blue", url: "https://yourusername.github.io/ghl-themebuilder/theme-blue.css", color: "#2563eb" },
    { name: "Dark", url: "https://yourusername.github.io/ghl-themebuilder/theme-dark.css", color: "#0f172a" },
    { name: "Green", url: "https://yourusername.github.io/ghl-themebuilder/theme-green.css", color: "#16a34a" }
  ];
  const STORAGE_KEY = "ghl-selected-theme-url";

  // wait for header area to exist (retries until found)
  function waitForHeader() {
    // try multiple selectors to find header area in different GHL versions
    const header = document.querySelector('[data-testid="header-right-actions"]') ||
                   document.querySelector('header .right') ||
                   document.querySelector('header') ||
                   document.querySelector('.topbar');

    if (!header) {
      setTimeout(waitForHeader, 800);
      return;
    }
    injectButton(header);
    applySavedTheme(); // apply previously saved theme on load
  }

  // Insert or update <link id="ghl-theme-link">
  function applyThemeUrl(url) {
    if (!url) return;
    let link = document.getElementById('ghl-theme-link');
    if (link) link.href = url;
    else {
      link = document.createElement('link');
      link.id = 'ghl-theme-link';
      link.rel = 'stylesheet';
      link.href = url;
      document.head.appendChild(link);
    }
    try { localStorage.setItem(STORAGE_KEY, url); } catch(e) {}
  }

  function applySavedTheme() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) applyThemeUrl(saved);
    } catch(e){}
  }

  // Create a polished button and attach popup
  function injectButton(header) {
    if (document.getElementById('ghl-theme-builder-btn')) return;

    // wrapper to align with header items
    const wrapper = document.createElement('div');
    wrapper.id = 'ghl-theme-builder-wrapper';
    wrapper.style.display = 'inline-flex';
    wrapper.style.alignItems = 'center';
    wrapper.style.marginLeft = '8px';
    wrapper.style.marginRight = '6px';

    // styled button
    const btn = document.createElement('button');
    btn.id = 'ghl-theme-builder-btn';
    btn.title = 'Open Theme Builder';
    btn.innerHTML = '🎨 <span style="font-weight:600;margin-left:6px">Theme</span>';
    // button styles (clean, modern)
    Object.assign(btn.style, {
      background: 'linear-gradient(90deg,#4b6ef5,#2563eb)',
      color: '#fff',
      border: 'none',
      padding: '8px 12px',
      borderRadius: '8px',
      boxShadow: '0 6px 18px rgba(37,99,235,0.18)',
      cursor: 'pointer',
      fontSize: '13px',
      display: 'flex',
      alignItems: 'center',
      gap: '6px'
    });

    // small caret icon
    const caret = document.createElement('span');
    caret.innerHTML = '▾';
    caret.style.marginLeft = '6px';
    caret.style.opacity = '0.9';
    caret.style.fontSize = '12px';
    // append
    wrapper.appendChild(btn);
    header.appendChild(wrapper);

    // click -> toggle popup
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const existing = document.getElementById('ghl-theme-popup');
      if (existing) existing.remove();
      else createPopup(btn);
    });

    // close popup when clicking outside
    document.addEventListener('click', (ev) => {
      const p = document.getElementById('ghl-theme-popup');
      if (p && !p.contains(ev.target) && ev.target.id !== 'ghl-theme-builder-btn') p.remove();
    });
  }

  // build popup UI
  function createPopup(btn) {
    const popup = document.createElement('div');
    popup.id = 'ghl-theme-popup';
    Object.assign(popup.style, {
      position: 'fixed',
      top: (btn.getBoundingClientRect().bottom + 8) + 'px',
      right: '18px',
      width: '260px',
      background: '#fff',
      borderRadius: '10px',
      boxShadow: '0 10px 30px rgba(2,6,23,0.12)',
      padding: '12px',
      zIndex: 99999,
      fontFamily: 'Inter, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial'
    });

    popup.innerHTML = `
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px">
        <strong style="font-size:14px">Theme Builder</strong>
        <small style="color:#65748b">Choose a theme</small>
      </div>
      <div id="ghl-theme-list" style="display:grid;grid-template-columns:1fr 1fr;gap:10px"></div>
      <div style="margin-top:10px;display:flex;justify-content:flex-end">
        <button id="ghl-theme-reset" style="background:#f3f4f6;border:none;padding:6px 10px;border-radius:8px;cursor:pointer">Reset</button>
      </div>
    `;

    document.body.appendChild(popup);

    const list = popup.querySelector('#ghl-theme-list');
    THEMES.forEach(t => {
      const item = document.createElement('button');
      item.className = 'ghl-theme-item';
      item.title = t.name;
      Object.assign(item.style, {
        background: '#fff',
        border: '1px solid #e6eef7',
        padding: '8px',
        borderRadius: '8px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        justifyContent: 'flex-start'
      });

      // preview circle
      const sw = document.createElement('span');
      sw.style.width = '28px';
      sw.style.height = '28px';
      sw.style.borderRadius = '50%';
      sw.style.background = t.color;
      sw.style.boxShadow = 'inset 0 -2px 6px rgba(0,0,0,0.08)';
      sw.style.flex = '0 0 28px';

      const label = document.createElement('div');
      label.innerHTML = `<div style="font-weight:600">${t.name}</div><div style="font-size:12px;color:#65748b">${t.url.split('/').pop()}</div>`;

      item.appendChild(sw);
      item.appendChild(label);

      item.addEventListener('click', () => {
        applyThemeUrl(t.url);
        // small feedback
        item.style.boxShadow = '0 6px 16px rgba(37,99,235,0.12)';
      });

      list.appendChild(item);
    });

    // Reset button behavior
    popup.querySelector('#ghl-theme-reset').addEventListener('click', () => {
      const link = document.getElementById('ghl-theme-link');
      if (link) link.remove();
      try { localStorage.removeItem(STORAGE_KEY); } catch(e){}
      popup.remove();
    });
  }

  // start
  waitForHeader();
})();
