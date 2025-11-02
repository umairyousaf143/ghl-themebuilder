(function() {
  console.log("🌈 Theme Builder Script Loaded");

  // Wait for GHL to load completely
  function waitForHeader() {
    const header = document.querySelector('header, [data-testid="top-nav"], .topbar');
    if (header && !document.getElementById('themeBuilderButton')) {
      createThemeButton(header);
    } else {
      setTimeout(waitForHeader, 1000); // check again every second
    }
  }

  // Create the Theme Builder Button
  function createThemeButton(header) {
    const btn = document.createElement("button");
    btn.id = "themeBuilderButton";
    btn.innerText = "🎨 Theme Builder";
    btn.style.background = "#4b6ef5";
    btn.style.color = "#fff";
    btn.style.border = "none";
    btn.style.padding = "6px 12px";
    btn.style.borderRadius = "8px";
    btn.style.marginLeft = "10px";
    btn.style.cursor = "pointer";
    btn.style.fontSize = "14px";
    btn.style.fontWeight = "500";

    btn.addEventListener("click", openThemePopup);

    // Append the button to the right side of the header
    header.appendChild(btn);
    console.log("✅ Theme Builder Button Added");
  }

  // Popup with theme options
  function openThemePopup() {
    if (document.getElementById("themePopup")) return;

    const popup = document.createElement("div");
    popup.id = "themePopup";
    popup.style.position = "fixed";
    popup.style.top = "80px";
    popup.style.right = "20px";
    popup.style.background = "#fff";
    popup.style.border = "1px solid #ccc";
    popup.style.padding = "15px";
    popup.style.borderRadius = "12px";
    popup.style.boxShadow = "0 2px 10px rgba(0,0,0,0.15)";
    popup.style.zIndex = "9999";
    popup.style.width = "220px";
    popup.innerHTML = `
      <h3 style="margin-top:0;">Select Theme</h3>
      <button class="theme-btn" data-color="#2563eb" style="background:#2563eb">Blue</button>
      <button class="theme-btn" data-color="#16a34a" style="background:#16a34a">Green</button>
      <button class="theme-btn" data-color="#dc2626" style="background:#dc2626">Red</button>
      <button id="closeThemePopup" style="margin-top:10px;background:#555;color:#fff;padding:4px 8px;border:none;border-radius:6px;cursor:pointer;">Close</button>
    `;

    document.body.appendChild(popup);

    document.querySelectorAll(".theme-btn").forEach(btn => {
      btn.style.display = "block";
      btn.style.width = "100%";
      btn.style.marginBottom = "8px";
      btn.style.color = "#fff";
      btn.style.padding = "6px";
      btn.style.border = "none";
      btn.style.borderRadius = "6px";
      btn.addEventListener("click", (e) => {
        const color = e.target.dataset.color;
        applyTheme(color);
      });
    });

    document.getElementById("closeThemePopup").onclick = () => popup.remove();
  }

  // Change color theme dynamically
  function applyTheme(color) {
    document.documentElement.style.setProperty("--primary-color", color);
    document.querySelectorAll("button, .btn, .primary, .bg-primary").forEach(el => {
      el.style.background = color;
      el.style.borderColor = color;
    });
  }

  waitForHeader();
})();
