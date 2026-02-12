// 主JavaScript文件
document.addEventListener('DOMContentLoaded', function() {
    // 打字动画功能
    const typingText = document.querySelector('.typing-text');
    const typingCursor = document.querySelector('.typing-cursor');
    const texts = [
        'Senior Test Automation Engineer',
        'Quality Assurance Specialist',
        'CI/CD Integration Expert',
        'Playwright/Selenium/Cypress Enthusiast'
    ];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 150;
    let deletingSpeed = 50;
    let delayAfterText = 2000;

    function type() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            typingText.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingText.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }

        if (!isDeleting && charIndex === currentText.length) {
            isDeleting = true;
            typingSpeed = delayAfterText;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typingSpeed = 150;
        } else if (isDeleting) {
            typingSpeed = deletingSpeed;
        } else {
            typingSpeed = 150;
        }

        setTimeout(type, typingSpeed);
    }

    // 初始化打字动画
    if (typingText && typingCursor) {
        type();
    }

    // 移动菜单功能（集中处理，避免重复绑定）
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const menuOverlay = document.querySelector('.menu-overlay');

    // Guard: 避免被多次初始化
    if (menuToggle && !menuToggle.dataset.initialized) {
        menuToggle.dataset.initialized = 'true';
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.setAttribute('aria-label', '切换菜单');
        
        // 切换菜单显示/隐藏
        const toggleMenu = () => {
            const isOpen = menuToggle.classList.toggle('active');
            if (navMenu) navMenu.classList.toggle('active', isOpen);
            if (menuOverlay) menuOverlay.classList.toggle('active', isOpen);
            // 禁止页面滚动
            document.body.classList.toggle('no-scroll', isOpen);
            // 无障碍属性
            menuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
            menuToggle.setAttribute('aria-label', isOpen ? '关闭菜单' : '打开菜单');
            
            // 更新菜单的无障碍属性
            if (navMenu) {
                navMenu.setAttribute('aria-hidden', isOpen ? 'false' : 'true');
            }
            
            // 更新遮罩层的无障碍属性
            if (menuOverlay) {
                menuOverlay.setAttribute('aria-hidden', isOpen ? 'false' : 'true');
                menuOverlay.setAttribute('aria-label', isOpen ? '点击关闭菜单' : '');
            }
        };
        
        menuToggle.addEventListener('click', toggleMenu);

        // 点击遮罩层关闭菜单
        if (menuOverlay) {
            menuOverlay.addEventListener('click', toggleMenu);
        }

        // 点击菜单项后关闭菜单（适配移动端）
        document.querySelectorAll('.nav-menu li a').forEach(item => {
            item.addEventListener('click', () => {
                if (menuToggle.classList.contains('active')) {
                    toggleMenu();
                }
            });
        });

        // 点击主题切换按钮后不关闭菜单
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', (e) => {
                e.stopPropagation();
            });
        }

        // 点击菜单外部关闭菜单
        document.addEventListener('click', (e) => {
            if (!menuToggle.contains(e.target) && !navMenu.contains(e.target) && menuToggle.classList.contains('active')) {
                toggleMenu();
            }
        });

        // 键盘导航支持
        document.addEventListener('keydown', (e) => {
            // ESC键关闭菜单
            if (e.key === 'Escape' && menuToggle.classList.contains('active')) {
                toggleMenu();
                menuToggle.focus();
            }
        });
    }

    // 为菜单添加无障碍属性
    if (navMenu) {
        navMenu.setAttribute('aria-hidden', 'true');
        navMenu.setAttribute('role', 'navigation');
        navMenu.setAttribute('aria-label', '移动端导航菜单');
    }
    
    // 为遮罩层添加无障碍属性
    if (menuOverlay) {
        menuOverlay.setAttribute('aria-hidden', 'true');
        menuOverlay.setAttribute('role', 'button');
    }

    // ========== 主题切换（🌞🌙）==========
    // 默认：自动检测系统主题；手动：点击图标切换；图标：深色模式显示☀️ 浅色显示🌙；持久：localStorage；过渡：CSS 0.3s；粒子随主题
    const themeToggle = document.getElementById('theme-toggle');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

    function getParticleColor() {
        var val = getComputedStyle(document.documentElement).getPropertyValue('--particle-color').trim();
        return val || '#2563eb';
    }

    function initParticles() {
        var el = document.getElementById('particles-js');
        if (!el || typeof window.particlesJS !== 'function') return;
        var color = getParticleColor();
        var count = window.innerWidth <= 768 ? 35 : 70;
        window.particlesJS('particles-js', {
            particles: {
                number: { value: count, density: { enable: true, value_area: 800 } },
                color: { value: color },
                shape: { type: 'circle' },
                opacity: { value: 0.2, random: true },
                size: { value: 3, random: true },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: color,
                    opacity: 0.12,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 1,
                    direction: 'none',
                    random: true,
                    straight: false,
                    out_mode: 'out',
                    bounce: false
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: { enable: true, mode: 'repulse' },
                    onclick: { enable: true, mode: 'push' },
                    resize: true
                }
            },
            retina_detect: true
        });
    }

    function applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        // 图标：深色模式显示太阳☀️（点击切浅色），浅色模式显示月亮🌙（点击切深色）
        if (themeToggle) {
            var icon = themeToggle.querySelector('i');
            if (icon) {
                icon.setAttribute('data-phosphor', theme === 'dark' ? 'sun' : 'moon');
                icon.className = theme === 'dark' ? 'ph-sun' : 'ph-moon';
            }
            themeToggle.setAttribute('aria-label', theme === 'dark' ? '切换到浅色模式' : '切换到深色模式');
        }
        // 粒子颜色随主题（通过 --particle-color 间接控制，切换时重新初始化）
        var container = document.getElementById('particles-js');
        if (container && typeof window.particlesJS === 'function') {
            try {
                if (container.querySelector('canvas')) {
                    container.innerHTML = '';
                    initParticles();
                }
            } catch (e) {}
        }
    }

    var currentTheme = localStorage.getItem('theme');
    if (currentTheme !== 'dark' && currentTheme !== 'light')
        currentTheme = prefersDarkScheme.matches ? 'dark' : 'light';
    applyTheme(currentTheme);

    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            var next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
            applyTheme(next);
        });
    }

    // 粒子背景（使用 --particle-color，与主题协调）
    initParticles();

    // 平滑滚动导航
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // 关闭移动菜单
                if (menuToggle) menuToggle.classList.remove('active');
                if (navMenu) navMenu.classList.remove('active');
            }
        });
    });

    // 滚动时添加头部阴影
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.boxShadow = 'none';
        }
    });

    // 窗口尺寸变化时：关闭移动菜单并恢复滚动，避免菜单残留
    window.addEventListener('resize', function() {
        try {
            if (window.innerWidth > 768) {
                if (menuToggle) {
                    menuToggle.classList.remove('active');
                    menuToggle.setAttribute('aria-expanded', 'false');
                }
                if (navMenu) navMenu.classList.remove('active');
                document.body.classList.remove('no-scroll');
            }
            // 当移动/窄屏时，降低粒子数量（性能）
            var el = document.getElementById('particles-js');
            if (el && typeof window.particlesJS === 'function') {
                // 重建粒子以调整数量
                try { el.innerHTML = ''; initParticles(); } catch(e){}
            }
        } catch (e) {}
    });

    // 卡片动画 - Intersection Observer
    const animateElements = document.querySelectorAll('.skill-card, .project-card');
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);

    animateElements.forEach(element => {
        observer.observe(element);
    });

    // 项目详情按钮功能
    document.addEventListener('click', function(e) {
        if (e.target.closest('.project-detail-btn')) {
            const btn = e.target.closest('.project-detail-btn');
            const projectId = btn.dataset.project;
            
            // 根据项目ID跳转到详情页
            window.location.href = `project-details.html?id=${projectId}`;
        }
    });

    // 回到顶部按钮
    const backToTopButton = document.getElementById('back-to-top');
    if (backToTopButton) {
        // 滚动事件监听
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                backToTopButton.classList.add('active');
            } else {
                backToTopButton.classList.remove('active');
            }
        });
        
        // 点击事件
        backToTopButton.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});