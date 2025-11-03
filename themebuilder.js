(function () {
  console.log("Highfy Builder script loaded ✅");

  // --- Add modern round button styles
  const style = document.createElement("style");
  style.textContent = `
    #ghl-theme-builder-btn {
      position: relative;
      width: 44px;
      height: 44px;
      border-radius: 50%;
      background: linear-gradient(135deg, #2563eb, #1d4ed8);
      border: none;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #ffffff;
      font-size: 20px;
      box-shadow: 0 4px 12px rgba(37,99,235,0.25);
      transition: transform 0.2s ease, box-shadow 0.3s ease;
      z-index: 10;
      margin-right: 10px;
    }

    #ghl-theme-builder-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 18px rgba(37,99,235,0.35);
    }

    /* Tooltip */
    #highfy-tooltip {
      position: absolute;
      right: 55px;
      top: 50%;
      transform: translateY(-50%);
      background: #111827;
      color: #ffffff;
      font-size: 13px;
      padding: 6px 10px;
      border-radius: 6px;
      white-space: nowrap;
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.25s ease;
      box-shadow: 0 4px 10px rgba(0,0,0,0.15);
    }

    #ghl-theme-builder-btn:hover #highfy-tooltip {
      opacity: 1;
    }

    /* Popup theme list */
    #ghl-theme-popup {
      backdrop-filter: blur(10px);
    }

    #ghl-theme-popup strong {
      color: #111827;
    }
  `;
  document.head.appendChild(style);

  // --- Theme definitions
  const THEMES = [
    { name: "Blue", url: "https://umairyousaf143.github.io/ghl-themebuilder/theme-blue.css", color: "#2563eb" },
    { name: "Dark", url: "https://umairyousaf143.github.io/ghl-themebuilder/theme-dark.css", color: "#0f172a" },
    { name: "Green", url: "https://umairyousaf143.github.io/ghl-themebuilder/theme-green.css", color: "#16a34a" }
  ];
  const STORAGE_KEY = "ghl-selected-theme-url";

  // --- Wait until header loads
  function waitForHeader(attempt = 0) {
    const header =
      document.querySelector('[data-testid="header-right-actions"]') ||
      document.querySelector("header .right") ||
      document.querySelector("header") ||
      document.querySelector(".topbar");

    if (!header) {
      if (attempt < 20) setTimeout(() => waitForHeader(attempt + 1), 800);
      else console.warn("⏳ GHL header not found after multiple attempts.");
      return;
    }

    injectButton(header);
    applySavedTheme();
  }

  // --- Apply selected theme
  function applyThemeUrl(url) {
    if (!url) return;
    let link = document.getElementById("ghl-theme-link");
    if (link) link.href = url;
    else {
      link = document.createElement("link");
      link.id = "ghl-theme-link";
      link.rel = "stylesheet";
      link.href = url;
      document.head.appendChild(link);
    }
    try {
      localStorage.setItem(STORAGE_KEY, url);
    } catch (e) {}
  }

  // --- Restore saved theme
  function applySavedTheme() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) applyThemeUrl(saved);
    } catch (e) {}
  }

  // --- Inject round button into header
  function injectButton(header) {
    if (document.getElementById("ghl-theme-builder-btn")) return;

    const wrapper = document.createElement("div");
    wrapper.id = "ghl-theme-builder-wrapper";
    wrapper.style.display = "flex";
    wrapper.style.alignItems = "center";
    wrapper.style.marginLeft = "12px";

    const btn = document.createElement("button");
    btn.id = "ghl-theme-builder-btn";
    btn.title = "Highfy Builder";

    // 🎨 Icon (replace emoji if you want SVG or custom icon)
    btn.innerHTML = `
      <span>🎨</span>
      <div id="highfy-tooltip">Highfy Builder</div>
    `;

    wrapper.appendChild(btn);
    header.appendChild(wrapper);

    // Keep aligned right
    header.style.display = "flex";
    header.style.alignItems = "center";
    header.style.justifyContent = "flex-end";

    // --- Click opens popup
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const existing = document.getElementById("ghl-theme-popup");
      if (existing) existing.remove();
      else createPopup(btn);
    });

    // --- Close popup on outside click
    document.addEventListener("click", (ev) => {
      const p = document.getElementById("ghl-theme-popup");
      if (p && !p.contains(ev.target) && ev.target.id !== "ghl-theme-builder-btn") p.remove();
    });
  }

  // --- Popup UI
  function createPopup(btn) {
    const popup = document.createElement("div");
    popup.id = "ghl-theme-popup";
    Object.assign(popup.style, {
      position: "fixed",
      top: btn.getBoundingClientRect().bottom + 10 + "px",
      right: "20px",
      width: "250px",
      background: "#ffffff",
      borderRadius: "10px",
      boxShadow: "0 10px 30px rgba(2,6,23,0.15)",
      padding: "12px",
      zIndex: 99999,
      fontFamily: 'Inter, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial',
    });

    popup.innerHTML = `
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px">
        <strong style="font-size:14px">Highfy Builder</strong>
        <small style="color:#65748b">Select Theme</small>
      </div>
      <div id="ghl-theme-list" style="display:grid;grid-template-columns:1fr 1fr;gap:10px"></div>
      <div style="margin-top:10px;display:flex;justify-content:flex-end">
        <button id="ghl-theme-reset" style="background:#f3f4f6;border:none;padding:6px 10px;border-radius:8px;cursor:pointer">Reset</button>
      </div>
    `;

    document.body.appendChild(popup);

    const list = popup.querySelector("#ghl-theme-list");
    THEMES.forEach((t) => {
      const item = document.createElement("button");
      item.className = "ghl-theme-item";
      item.title = t.name;
      Object.assign(item.style, {
        background: "#fff",
        border: "1px solid #e6eef7",
        padding: "8px",
        borderRadius: "8px",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        gap: "8px",
        justifyContent: "flex-start",
        transition: "0.2s ease",
      });

      const sw = document.createElement("span");
      sw.style.width = "24px";
      sw.style.height = "24px";
      sw.style.borderRadius = "50%";
      sw.style.background = t.color;
      sw.style.boxShadow = "inset 0 -2px 6px rgba(0,0,0,0.08)";
      sw.style.flex = "0 0 24px";

      const label = document.createElement("div");
      label.innerHTML = `<div style="font-weight:600;font-size:13px">${t.name}</div>`;

      item.appendChild(sw);
      item.appendChild(label);

      item.addEventListener("click", () => {
        applyThemeUrl(t.url);
        item.style.boxShadow = "0 4px 10px rgba(37,99,235,0.15)";
      });

      list.appendChild(item);
    });

    popup.querySelector("#ghl-theme-reset").addEventListener("click", () => {
      const link = document.getElementById("ghl-theme-link");
      if (link) link.remove();
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch (e) {}
      popup.remove();
    });
  }

  waitForHeader();
})();
