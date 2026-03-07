(function () {
    var scrollListener = null;

    function initReadingProgress() {
        var bar = document.getElementById('reading-progress-bar');
        if (!bar) return;

        // Remove previous scroll listener if any
        if (scrollListener) {
            window.removeEventListener('scroll', scrollListener, { passive: true });
            scrollListener = null;
        }

        // Only activate on post/page layouts (check for article content)
        var article = document.querySelector('.column-main .content');
        if (!article) {
            bar.style.width = '0';
            return;
        }

        function updateProgress() {
            var scrollTop = window.scrollY || document.documentElement.scrollTop;
            var docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            var progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
            bar.style.width = Math.min(100, Math.max(0, progress)) + '%';
        }

        scrollListener = updateProgress;
        window.addEventListener('scroll', scrollListener, { passive: true });
        updateProgress();
    }

    document.addEventListener('pjax:complete', initReadingProgress);
    document.addEventListener('DOMContentLoaded', initReadingProgress);
}());
