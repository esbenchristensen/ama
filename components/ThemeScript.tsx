export function ThemeScript() {
  const code = `
(function () {
  try {
    var stored = localStorage.getItem("ama-theme");
    var pref = stored === "light" || stored === "system" ? stored : "dark";
    var theme = pref;
    if (pref === "system") {
      theme = window.matchMedia("(prefers-color-scheme: light)").matches
        ? "light"
        : "dark";
    }
    document.documentElement.dataset.theme = theme;
    document.documentElement.dataset.themePref = pref;
  } catch (e) {
    document.documentElement.dataset.theme = "dark";
    document.documentElement.dataset.themePref = "dark";
  }
})();
`;

  return <script dangerouslySetInnerHTML={{ __html: code }} />;
}
