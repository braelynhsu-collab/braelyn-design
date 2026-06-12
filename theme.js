// 固定暗色主题；仅保留移动端菜单逻辑
(function() {
    const root = document.documentElement;
    if (!root) return;
    root.setAttribute('data-theme', 'dark');
    document.body?.setAttribute('data-theme', 'dark');
})();

/* =============================
   Project detail safe gutters
   ============================= */
(function() {
    const page = window.location.pathname.split('/').pop() || 'index.html';
    const excluded = new Set(['index.html', 'projects.html', 'about.html', 'contact.html', 'approach.html']);
    if (excluded.has(page)) return;
    if (!document.querySelector('.visuals, .project-description, .context')) return;

    document.body.classList.add('project-detail-page');

    const style = document.createElement('style');
    style.textContent = `
        @media (max-width: 768px) {
            body.project-detail-page .project-description,
            body.project-detail-page .project-footer,
            body.project-detail-page .context,
            body.project-detail-page .insight-strategy,
            body.project-detail-page .visuals,
            body.project-detail-page .closing {
                padding-left: 24px !important;
                padding-right: 24px !important;
                box-sizing: border-box !important;
            }

            body.project-detail-page .project-description {
                padding-top: 4.5rem !important;
                padding-bottom: 3rem !important;
            }

            body.project-detail-page .project-description .desc-grid,
            body.project-detail-page .two-col {
                grid-template-columns: 1fr !important;
                gap: 2.5rem !important;
            }

            body.project-detail-page .project-description h2,
            body.project-detail-page .project-description .desc-block,
            body.project-detail-page .project-footer .desc-note,
            body.project-detail-page .context-text,
            body.project-detail-page .col-text,
            body.project-detail-page .col-title {
                max-width: 100% !important;
            }
        }

        @media (max-width: 480px) {
            body.project-detail-page .project-description,
            body.project-detail-page .project-footer,
            body.project-detail-page .context,
            body.project-detail-page .insight-strategy,
            body.project-detail-page .visuals,
            body.project-detail-page .closing {
                padding-left: 16px !important;
                padding-right: 16px !important;
            }
        }
    `;
    document.head.appendChild(style);
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
