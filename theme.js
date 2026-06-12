// 固定暗色主题；仅保留移动端菜单逻辑
(function() {
    const root = document.documentElement;
    if (!root) return;
    root.setAttribute('data-theme', 'dark');
    document.body?.setAttribute('data-theme', 'dark');
})();

/* =============================
   Project detail narrative rail
   ============================= */
(function() {
    const path = window.location.pathname.split('/').pop() || 'index.html';
    const excluded = new Set(['index.html', 'projects.html', 'about.html', 'contact.html', 'approach.html']);
    if (excluded.has(path)) return;
    if (document.querySelector('.project-overview-rail')) return;
    const hero = document.querySelector('.hero');
    if (!hero) return;

    const projects = [
        { title: { cn: 'Purajuvé', en: 'Purajuvé' }, category: 'Branding', year: '2025', url: 'future-studio.html' },
        { title: { cn: 'Proya 品牌升级', en: 'Proya Brand Upgrade' }, category: 'Branding', year: '2025', url: 'proya.html' },
        { title: { cn: 'Proya 年底谢谢项目', en: 'Proya Year-end Thanks Project' }, category: 'Branding', year: '2023', url: 'proya-2023.html' },
        { title: { cn: 'Proya 38节项目', en: 'Proya 38 Festival' }, category: 'Branding', year: '2025', url: 'proya-38.html' },
        { title: { cn: 'proya光影科技展UI设计', en: 'System' }, category: 'UX/UI Design', year: '2023', url: 'system.html' },
        { title: { cn: 'Clinique EBCI CAMPAIGN', en: 'Clinique EBCI CAMPAIGN' }, category: 'Campaign', year: '2023', url: 'clinique-ebci-repush.html' },
        { title: { cn: 'EL DW CAMPAIGN', en: 'EL DW CAMPAIGN' }, category: 'Campaign', year: '2023', url: 'estee-lauder-dw.html' },
        { title: { cn: 'ELLANSE CAMPAIGN', en: 'ELLANSE CAMPAIGN' }, category: 'Campaign', year: '2025', url: 'ellanse-cy23-imc.html' },
        { title: { cn: 'PHILIPS CAMPAIGN', en: 'PHILIPS CAMPAIGN' }, category: 'Campaign', year: '2023', url: 'philips-gb-panda-machine.html' },
        { title: { cn: '双妹视频脚本分镜设计', en: 'VIVE Storyboard' }, category: 'Campaign', year: '2023', url: 'shuangmei-storyboard.html' },
        { title: { cn: 'LVMH RETAIL LAB丝带定制UI', en: 'LVMH RETAIL LAB' }, category: 'UX/UI Design', year: '2020', url: 'lvmh-retail-lab.html' },
        { title: { cn: 'LVMH声纹定制UI界面设计', en: 'LVMH Voiceprint UI Design' }, category: 'UX/UI Design', year: '2020', url: 'lvmh-voiceprint-ui.html' },
        { title: { cn: 'Belly声纹定制UI设计', en: 'Belly Voiceprint Custom UI' }, category: 'UX/UI Design', year: '2020', url: 'belly-voiceprint-ui.html' },
        { title: { cn: 'ABSOLUT 定制UI界面设计', en: 'ABSOLUT Custom UI Design' }, category: 'UX/UI Design', year: '2023', url: 'absolut-custom-ui-design.html' },
        { title: { cn: '周大福珠宝定制UI设计', en: 'Chow Tai Fook Jewelry Custom UI Design' }, category: 'UX/UI Design', year: '2020', url: 'chow-tai-fook-jewelry-custom-ui.html' }
    ];

    const focusByCategory = {
        'Branding': 'Brand visual system / identity language',
        'Campaign': 'Campaign visual direction / communication assets',
        'UX/UI Design': 'Interface experience / interaction touchpoint'
    };

    const index = projects.findIndex(project => project.url === path);
    if (index < 0) return;
    const project = projects[index];
    const prev = projects[(index - 1 + projects.length) % projects.length];
    const next = projects[(index + 1) % projects.length];

    const rail = document.createElement('section');
    rail.className = 'project-overview-rail';
    rail.innerHTML = `
        <div class="project-overview-grid">
            <div>
                <span class="project-overview-label">Project</span>
                <strong>${project.title.cn}</strong>
                <em>${project.title.en}</em>
            </div>
            <div>
                <span class="project-overview-label">Discipline</span>
                <strong>${project.category}</strong>
                <em>${focusByCategory[project.category] || 'Selected visual work'}</em>
            </div>
            <div>
                <span class="project-overview-label">Year</span>
                <strong>${project.year}</strong>
                <em>Selected portfolio case</em>
            </div>
        </div>
        <nav class="project-page-nav" aria-label="Project navigation">
            <a href="${prev.url}"><span>Previous</span><strong>${prev.title.en}</strong></a>
            <a href="projects.html"><span>All Projects</span><strong>Index</strong></a>
            <a href="${next.url}"><span>Next</span><strong>${next.title.en}</strong></a>
        </nav>
    `;
    hero.insertAdjacentElement('afterend', rail);
})();

/* =============================
   Mobile Hamburger Menu
   ============================= */
(function() {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    if (!hamburger || !navLinks) return;

    hamburger.addEventListener('click', () => {
        const isOpen = navLinks.classList.toggle('open');
        hamburger.classList.toggle('active');
        document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('open');
            hamburger.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navLinks.classList.contains('open')) {
            navLinks.classList.remove('open');
            hamburger.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
})();

/* =============================
   全站右键保护 + 玻璃 Toast
   ============================= */
(function() {
    /* --- CSS --- */
    var s = document.createElement('style');
    s.textContent = [
        '#context-toast {',
        '  position: fixed; z-index: 99999;',
        '  padding: 8px 16px; border-radius: 12px;',
        '  background: rgba(255,255,255,0.08);',
        '  backdrop-filter: blur(18px);',
        '  -webkit-backdrop-filter: blur(18px);',
        '  border: 1px solid rgba(255,255,255,0.12);',
        '  color: rgba(255,255,255,0.88);',
        '  font-family: "Montserrat","PingFang SC",sans-serif;',
        '  font-size: 12px; letter-spacing: 0.02em; font-weight: 400;',
        '  white-space: nowrap;',
        '  opacity: 0; pointer-events: none;',
        '  transform: translateY(6px);',
        '  transition: opacity 0.35s ease, transform 0.35s cubic-bezier(0.22,1,0.36,1);',
        '}',
        '#context-toast.show {',
        '  opacity: 1; transform: translateY(0);',
        '}',
        /* light theme 适配 */
        '[data-theme="light"] #context-toast {',
        '  background: rgba(0,0,0,0.06);',
        '  border-color: rgba(0,0,0,0.08);',
        '  color: rgba(0,0,0,0.85);',
        '}',
        /* 防截图覆盖层 */
        '.full-image, .full-video, .hero-image,',
        '.project-img-wrapper, .img-wrapper {',
        '  position: relative; overflow: hidden;',
        '}',
        '.full-image::after, .full-video::after,',
        '.hero-image::after, .project-img-wrapper::after,',
        '.img-wrapper::after {',
        '  content: "";',
        '  position: absolute; inset: 0; z-index: 1;',
        '  pointer-events: none; /* 不阻挡点击 */',
        '}',
        'img, video {',
        '  -webkit-user-drag: none !important;',
        '  user-select: none !important;',
        '  -webkit-touch-callout: none !important;',
        '}'
    ].join('\n');
    document.head.appendChild(s);

    /* --- Keyboard: 拦截截图快捷键 --- */
    document.addEventListener('keydown', function(e) {
        /* PrintScreen (keyCode 44) */
        if (e.key === 'PrintScreen' || e.keyCode === 44) {
            e.preventDefault();
            show(e.clientX || 0, e.clientY || 0);
            return false;
        }
        /* Ctrl+Shift+S / Cmd+Shift+S */
        if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'S' || e.key === 's')) {
            /* 仅拦截图片区域触发的，不拦截全局 */
            var t = e.target;
            if (t && (t.tagName === 'IMG' || t.tagName === 'VIDEO' || t.closest('.full-image,.full-video,.project-img-wrapper'))) {
                e.preventDefault();
                show(e.clientX, e.clientY);
                return false;
            }
        }
    });

    /* --- DOM --- */
    var toast = document.createElement('div');
    toast.id = 'context-toast';
    toast.textContent = '此作品仅限于此呈现，请尊重其原始呈现方式。';
    document.body.appendChild(toast);
    var timer;

    function show(x, y) {
        clearTimeout(timer);
        var w = toast.offsetWidth || 240;
        var h = toast.offsetHeight || 32;
        var maxX = window.innerWidth - w - 16;
        var maxY = window.innerHeight - h - 16;
        toast.style.left = Math.min(x, maxX) + 'px';
        toast.style.top = Math.min(y, maxY) + 'px';
        toast.classList.add('show');
        timer = setTimeout(function() { toast.classList.remove('show'); }, 2000);
    }

    /* --- 全站右键拦截 --- */
    document.addEventListener('contextmenu', function(e) {
        e.preventDefault();
        show(e.clientX, e.clientY);
    });

    /* --- 图片/视频拖拽保护 --- */
    document.querySelectorAll('img, video').forEach(function(el) {
        el.setAttribute('draggable', 'false');
        el.addEventListener('dragstart', function(e) { e.preventDefault(); });
        el.addEventListener('mousedown', function(e) {
            if (e.button === 1 || e.button === 2) { e.preventDefault(); }
        });
        el.addEventListener('copy', function(e) { e.preventDefault(); });
    });
})();
