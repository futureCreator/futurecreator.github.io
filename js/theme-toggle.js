(function () {
    function applyTheme(theme) {
        var light = document.getElementById('theme-light');
        var dark = document.getElementById('theme-dark');
        if (!light || !dark) return;
        document.documentElement.classList.add('theme-transitioning');
        if (theme === 'dark') {
            light.disabled = true;
            dark.disabled = false;
        } else {
            light.disabled = false;
            dark.disabled = true;
        }
        localStorage.setItem('theme', theme);
        updateToggleIcon(theme);
        setTimeout(function () {
            document.documentElement.classList.remove('theme-transitioning');
        }, 300);
    }

    function updateToggleIcon(theme) {
        var btn = document.getElementById('theme-toggle-btn');
        if (!btn) return;
        var icon = btn.querySelector('i');
        if (!icon) return;
        icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }

    function init() {
        var savedTheme = localStorage.getItem('theme');
        if (!savedTheme) {
            savedTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        }
        applyTheme(savedTheme);

        var btn = document.getElementById('theme-toggle-btn');
        if (btn) {
            btn.onclick = function () {
                var current = localStorage.getItem('theme') || 'light';
                applyTheme(current === 'dark' ? 'light' : 'dark');
            };
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
