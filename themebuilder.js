(function () {
  console.log("Theme Builder script loaded");

  const THEMES = [
    { name: "Blue", url: "https://umairyousaf143.github.io/ghl-themebuilder/theme-blue.css", color: "#2563eb" },
    { name: "Dark", url: "https://umairyousaf143.github.io/ghl-themebuilder/theme-dark.css", color: "#0f172a" },
    { name: "Green", url: "https://umairyousaf143.github.io/ghl-themebuilder/theme-green.css", color: "#16a34a" }
  ];
  const STORAGE_KEY = "ghl-selected-theme-url";

  function waitForHeader() {
    const header =
      document.querySelector('[data-testid="header-right-actions"]') ||
      document.querySelector("header .right") ||
      document.querySelector("header") ||
      document.querySelector(".topbar");

    if (!header) {
      setTimeout(waitForHeader, 800);
      return;
    }
    injectButton(header);
    applySavedTheme();
  }

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

  function applySavedTheme() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) applyThemeUrl(saved);
    } catch (e) {}
  }

  function injectButton(header) {
    if (document.getElementById("ghl-theme-builder-btn")) return;

    const wrapper = document.createElement("div");
    wrapper.id = "ghl-theme-builder-wrapper";
    wrapper.style.display = "flex";
    wrapper.style.alignItems = "center";
    wrapper.style.marginLeft = "12px";

    const btn = document.createElement("button");
    btn.id = "ghl-theme-builder-btn";
    btn.title = "Open Theme Builder";
    btn.innerHTML = `<span style="font-size:14px; font-weight:600;">🎨 Theme</span>`;

    // 🧠 Updated modern button styling
    Object.assign(btn.style, {
      background: "transparent",
      border: "1px solid #d1d5db",
      color: "#374151",
      padding: "6px 12px",
      borderRadius: "6px",
      cursor: "pointer",
      fontSize: "13px",
      fontWeight: "500",
      transition: "all 0.2s ease",
    });

    // hover effect
    btn.addEventListener("mouseenter", () => {
      btn.style.background = "#2563eb";
      btn.style.color = "#fff";
      btn.style.borderColor = "#2563eb";
      btn.style.boxShadow = "0 4px 12px rgba(37,99,235,0.2)";
    });
    btn.addEventListener("mouseleave", () => {
      btn.style.background = "transparent";
      btn.style.color = "#374151";
      btn.style.borderColor = "#d1d5db";
      btn.style.boxShadow = "none";
    });

    wrapper.appendChild(btn);
    header.appendChild(wrapper);

    // keep it always at the far right
    header.style.display = "flex";
    header.style.alignItems = "center";
    header.style.justifyContent = "flex-end";

    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const existing = document.getElementById("ghl-theme-popup");
      if (existing) existing.remove();
      else createPopup(btn);
    });

    document.addEventListener("click", (ev) => {
      const p = document.getElementById("ghl-theme-popup");
      if (p && !p.contains(ev.target) && ev.target.id !== "ghl-theme-builder-btn") p.remove();
    });
  }

  function createPopup(btn) {
    const popup = document.createElement("div");
    popup.id = "ghl-theme-popup";
    Object.assign(popup.style, {
      position: "fixed",
      top: btn.getBoundingClientRect().bottom + 8 + "px",
      right: "18px",
      width: "250px",
      background: "#fff",
      borderRadius: "10px",
      boxShadow: "0 10px 30px rgba(2,6,23,0.15)",
      padding: "12px",
      zIndex: 99999,
      fontFamily: 'Inter, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial',
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
