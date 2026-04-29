// 主题切换逻辑
(function() {
    const body = document.body;
    const btn = document.getElementById('themeToggle');
    if (!body || !btn) return;

    // 根据时间获取主题
    function getTimeTheme() {
        const hour = new Date().getHours();
        return (hour >= 6 && hour < 18) ? 'light' : 'dark';
    }

    // 设置主题 + 更新按钮图标
    function setTheme(theme) {
        body.setAttribute('data-theme', theme);
        // 太阳/月亮 SVG 图标
        btn.innerHTML = theme === 'dark' 
            ? '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>'
            : '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>';
    }

    function toggleTheme() {
        const current = body.getAttribute('data-theme');
        const newTheme = current === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
        sessionStorage.setItem('braelyn-theme-override', newTheme);
    }

    // 初始化：优先用 sessionStorage，否则按时间
    const override = sessionStorage.getItem('braelyn-theme-override');
    const theme = override || getTimeTheme();
    setTheme(theme);

    btn.addEventListener('click', toggleTheme);
})();
