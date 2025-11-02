function injectThemeButton() {
  const header = document.querySelector('[data-testid="header-right-actions"]');
  if (!header) {
    setTimeout(injectThemeButton, 1000);
    return;
  }

  if (document.getElementById("themeBuilderButton")) return;

  const btn = document.createElement("button");
  btn.id = "themeBuilderButton";
  btn.textContent = "🎨 Theme Builder";
  btn.style.marginRight = "10px";
  btn.style.padding = "6px 10px";
  btn.style.border = "none";
  btn.style.borderRadius = "6px";
  btn.style.background = "#3b82f6";
  btn.style.color = "#fff";
  btn.style.cursor = "pointer";
  btn.addEventListener("click", () => {
    alert("Theme Builder Clicked!");
  });

  header.insertBefore(btn, header.firstChild);
}

window.addEventListener("load", () => {
  setTimeout(injectThemeButton, 3000);
});
