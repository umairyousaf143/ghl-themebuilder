(function () {
  console.log("Highfy Builder Button Loaded");

  const style = document.createElement("style");
  style.textContent = `
    #highfy-builder-btn {
      position: relative;
      width: 42px;
      height: 42px;
      border-radius: 50%;
      border: none;
      outline: none;
      background: linear-gradient(135deg, #2563eb, #1d4ed8);
      color: #fff;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 18px;
      box-shadow: 0 4px 10px rgba(37,99,235,0.25);
      transition: transform 0.2s ease, box-shadow 0.3s ease;
      z-index: 9999;
    }

    #highfy-builder-btn:hover {
      transform: translateY(-3px);
      box-shadow: 0 6px 18px rgba(37,99,235,0.35);
    }

    #highfy-builder-tooltip {
      position: absolute;
      right: 50px;
      top: 50%;
      transform: translateY(-50%);
      background: #111827;
      color: #fff;
      font-size: 13px;
      padding: 5px 10px;
      border-radius: 6px;
      white-space: nowrap;
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.25s ease;
    }

    #highfy-builder-btn:hover #highfy-builder-tooltip {
      opacity: 1;
    }
  `;
  document.head.appendChild(style);

  function waitForHeader() {
    const header =
      document.querySelector('[data-testid="header-right-actions"]') ||
      document.querySelector("header .right") ||
      document.querySelector("header") ||
      document.querySelector(".topbar");

    if (!header) return setTimeout(waitForHeader, 700);
    injectButton(header);
  }

  function injectButton(header) {
    if (document.getElementById("highfy-builder-btn")) return;

    const btn = document.createElement("button");
    btn.id = "highfy-builder-btn";
    btn.title = "Open Highfy Builder";

    // 🎨 Icon (you can replace with ⚙️, 🧩, or custom SVG)
    btn.innerHTML = `
      <span>🎨</span>
      <div id="highfy-builder-tooltip">Highfy Builder</div>
    `;

    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      alert("🚀 Highfy Builder Opened!");
      // TODO: Replace with your popup or panel logic
    });

    // attach to header
    header.style.display = "flex";
    header.style.alignItems = "center";
    header.style.justifyContent = "flex-end";
    header.appendChild(btn);
  }

  waitForHeader();
})();
