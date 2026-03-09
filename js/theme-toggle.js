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
        setTimeout(function () {
            document.documentElement.classList.remove('theme-transitioning');
        }, 300);
    }

    function init() {
        var mq = window.matchMedia('(prefers-color-scheme: dark)');
        applyTheme(mq.matches ? 'dark' : 'light');
        mq.addEventListener('change', function (e) {
            applyTheme(e.matches ? 'dark' : 'light');
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
