export function ThemeScript() {
  const code = `
(function () {
  try {
    var stored = localStorage.getItem("ama-theme");
    var theme = stored === "light" ? "light" : "dark";
    if (stored !== theme) localStorage.setItem("ama-theme", theme);
    document.documentElement.dataset.theme = theme;
    document.documentElement.dataset.themePref = theme;
  } catch (e) {
    document.documentElement.dataset.theme = "dark";
    document.documentElement.dataset.themePref = "dark";
  }
})();
`;

  return <script dangerouslySetInnerHTML={{ __html: code }} />;
}
