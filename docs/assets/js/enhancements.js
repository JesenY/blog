// ====================================================================
// 现代化博客增强动效脚本
// ====================================================================

document.addEventListener('DOMContentLoaded', function() {
    // ====================================================================
    // 1. 滚动监听 - 头部阴影 & 元素进场动画
    // ====================================================================
    
    const header = document.querySelector('.header');
    let lastScrollY = 0;
    
    const handleScroll = () => {
        const currentScrollY = window.scrollY;
        
        // 头部阴影效果
        if (currentScrollY > 50) {
            header?.classList.add('scrolled');
        } else {
            header?.classList.remove('scrolled');
        }
        
        // 防止频繁更新
        lastScrollY = currentScrollY;
    };
    
    // 使用防抖优化滚动性能
    let scrollTimer;
    window.addEventListener('scroll', () => {
        clearTimeout(scrollTimer);
        scrollTimer = setTimeout(handleScroll, 10);
    }, { passive: true });
    
    // ====================================================================
    // 2. 元素进场动画 - Intersection Observer
    // ====================================================================
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observeElements = (selector, animationClass = 'animate') => {
        const elements = document.querySelectorAll(selector);
        if (!elements.length) return;
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add(animationClass);
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        elements.forEach(el => observer.observe(el));
    };
    
    // 观察技能卡片
    observeElements('.skill-card', 'in-view');
    // 观察项目卡片
    observeElements('.project-card', 'in-view');
    // 观察章节标题
    observeElements('.section-title', 'in-view');
    
    // ====================================================================
    // 3. 光标跟踪效果 - 卡片悬停时
    // ====================================================================
    
    const setupCardHoverGlow = () => {
        const cards = document.querySelectorAll('.skill-card, .project-card');
        
        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                card.style.setProperty('--mouse-x', `${x}px`);
                card.style.setProperty('--mouse-y', `${y}px`);
            });
            
            card.addEventListener('mouseleave', (e) => {
                card.style.setProperty('--mouse-x', '50%');
                card.style.setProperty('--mouse-y', '50%');
            });
        });
    };
    
    setupCardHoverGlow();
    
    // ====================================================================
    // 3.1 技能卡片点击选中功能
    // ====================================================================
    
    const setupSkillCardSelection = () => {
        const skillCards = document.querySelectorAll('.skill-card');
        
        skillCards.forEach(card => {
            card.addEventListener('click', () => {
                // 移除所有卡片的active类
                skillCards.forEach(c => c.classList.remove('active'));
                // 为当前点击的卡片添加active类
                card.classList.add('active');
            });
        });
    };
    
    setupSkillCardSelection();
    
    // ====================================================================
    // 4. 平滑滚动导航链接
    // ====================================================================
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // 跳过空链接
            if (href === '#' || href === '') return;
            
            const targetElement = document.querySelector(href);
            if (targetElement) {
                e.preventDefault();
                
                const offsetTop = targetElement.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // 关闭移动菜单
                const menuToggle = document.querySelector('.menu-toggle');
                const navMenu = document.querySelector('.nav-menu');
                if (menuToggle && navMenu) {
                    menuToggle.classList.remove('active');
                    navMenu.classList.remove('active');
                    document.body.classList.remove('no-scroll');
                }
            }
        });
    });
    
    // ====================================================================
    // 5. 移动菜单切换功能
    // ====================================================================
    
    const setupMobileMenu = () => {
        const menuToggle = document.querySelector('.menu-toggle');
        const navMenu = document.querySelector('.nav-menu');
        
        if (!menuToggle || !navMenu) return;
        
        const toggleMenu = () => {
            menuToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.classList.toggle('no-scroll');
        };
        
        menuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleMenu();
        });
        
        // 点击菜单项关闭菜单
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', (e) => {
                if (window.innerWidth <= 768) {
                    toggleMenu();
                }
            });
        });
        
        // 点击菜单外关闭
        document.addEventListener('click', (e) => {
            if (!menuToggle.contains(e.target) && !navMenu.contains(e.target)) {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.classList.remove('no-scroll');
            }
        });
    };
    
    setupMobileMenu();
    
    // ====================================================================
    // 6. 主题切换 - 亮色/深色模式
    // ====================================================================
    
    const setupThemeToggle = () => {
        const themeToggle = document.getElementById('theme-toggle');
        const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
        
        // 获取粒子颜色
        const getParticleColor = () => {
            const color = getComputedStyle(document.documentElement)
                .getPropertyValue('--particle-color')
                .trim();
            return color || '#2563eb';
        };
        
        // 初始化粒子效果
        const initParticles = () => {
            const el = document.getElementById('particles-js');
            if (!el || typeof window.particlesJS !== 'function') return;
            
            const color = getParticleColor();
            const count = window.innerWidth <= 768 ? 35 : 60;
            
            try {
                window.particlesJS('particles-js', {
                    particles: {
                        number: {
                            value: count,
                            density: {
                                enable: true,
                                value_area: 800
                            }
                        },
                        color: { value: color },
                        shape: { type: 'circle' },
                        opacity: {
                            value: 0.2,
                            random: true
                        },
                        size: {
                            value: 3,
                            random: true
                        },
                        line_linked: {
                            enable: true,
                            distance: 150,
                            color: color,
                            opacity: 0.12,
                            width: 1
                        },
                        move: {
                            enable: true,
                            speed: 0.8,
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
                            onhover: { enable: true, mode: 'grab' },
                            onclick: { enable: true, mode: 'push' },
                            resize: true
                        },
                        modes: {
                            grab: {
                                distance: 140,
                                line_linked: { opacity: 1 }
                            },
                            push: {
                                particles_nb: 4
                            }
                        }
                    },
                    retina_detect: true
                });
            } catch (e) {
                console.warn('Particles.js 初始化失败');
            }
        };
        
        // 应用主题
        const applyTheme = (theme) => {
            document.documentElement.setAttribute('data-theme', theme);
            localStorage.setItem('theme', theme);
            
            if (themeToggle) {
                const icon = themeToggle.querySelector('i');
                if (icon) {
                    icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
                }
                themeToggle.setAttribute(
                    'aria-label',
                    theme === 'dark' ? '切换到浅色模式' : '切换到深色模式'
                );
            }
            
            // 重新初始化粒子
            const container = document.getElementById('particles-js');
            if (container && typeof window.particlesJS === 'function') {
                try {
                    const canvas = container.querySelector('canvas');
                    if (canvas) {
                        container.innerHTML = '';
                        setTimeout(initParticles, 100);
                    }
                } catch (e) {
                    console.warn('粒子切换失败:', e);
                }
            }
        };
        
        // 获取初始主题
        let currentTheme = localStorage.getItem('theme');
        if (currentTheme !== 'dark' && currentTheme !== 'light') {
            currentTheme = prefersDarkScheme.matches ? 'dark' : 'light';
        }
        applyTheme(currentTheme);
        
        // 主题切换事件
        if (themeToggle) {
            themeToggle.addEventListener('click', function() {
                const next = document.documentElement.getAttribute('data-theme') === 'dark'
                    ? 'light'
                    : 'dark';
                applyTheme(next);
            });
        }
        
        // 初始化粒子
        initParticles();
    };
    
    setupThemeToggle();
    
    // ====================================================================
    // 7. 侧边栏功能
    // ====================================================================
    
    const setupSidebar = () => {
        const sidebar = document.querySelector('.sidebar');
        const sidebarToggle = document.querySelector('.sidebar-toggle');
        const sidebarLinks = document.querySelectorAll('.sidebar-nav a');
        
        if (!sidebar || !sidebarToggle) return;
        
        const toggleSidebar = () => {
            sidebar.classList.toggle('active');
            document.body.classList.toggle('no-scroll');
        };
        
        sidebarToggle.addEventListener('click', toggleSidebar);
        
        sidebarLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 768) {
                    toggleSidebar();
                }
            });
        });
    };
    
    setupSidebar();
    
    // ====================================================================
    // 8. 项目详情按钮功能
    // ====================================================================
    
    document.addEventListener('click', function(e) {
        const btn = e.target.closest('.project-detail-btn');
        if (btn) {
            const projectId = btn.dataset.project;
            window.location.href = `project-details.html?id=${projectId}`;
        }
    });
    
    // ====================================================================
    // 9. 表单验证与提交处理
    // ====================================================================
    
    const setupForm = () => {
        const form = document.getElementById('contactForm');
        if (!form) return;
        
        const validateEmail = (email) => {
            const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return re.test(email);
        };
        
        const validateForm = () => {
            let isValid = true;
            const name = form.querySelector('#name');
            const email = form.querySelector('#email');
            const message = form.querySelector('#message');
            
            // 清除之前的错误
            form.querySelectorAll('.error-message').forEach(el => el.textContent = '');
            form.querySelectorAll('input.error, textarea.error').forEach(el => {
                el.classList.remove('error');
            });
            
            // 验证名字
            if (!name.value.trim()) {
                document.getElementById('nameError').textContent = '请输入您的名字';
                name.classList.add('error');
                isValid = false;
            }
            
            // 验证邮箱
            if (!email.value.trim()) {
                document.getElementById('emailError').textContent = '请输入您的邮箱';
                email.classList.add('error');
                isValid = false;
            } else if (!validateEmail(email.value)) {
                document.getElementById('emailError').textContent = '请输入有效的邮箱地址';
                email.classList.add('error');
                isValid = false;
            }
            
            // 验证消息
            if (!message.value.trim()) {
                document.getElementById('messageError').textContent = '请输入您的消息';
                message.classList.add('error');
                isValid = false;
            }
            
            return isValid;
        };
        
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (!validateForm()) {
                return;
            }
            
            // 模拟表单提交
            const formData = {
                name: form.querySelector('#name').value,
                email: form.querySelector('#email').value,
                phone: form.querySelector('#phone').value,
                message: form.querySelector('#message').value
            };
            
            // 这里可以发送数据到服务器
            console.log('表单数据:', formData);
            
            // 显示成功消息
            const successMsg = document.getElementById('formSuccess');
            if (successMsg) {
                form.style.display = 'none';
                successMsg.style.display = 'flex';
                
                // 2秒后重置表单
                setTimeout(() => {
                    form.reset();
                    form.style.display = 'block';
                    successMsg.style.display = 'none';
                }, 2000);
            }
        });
        
        // 实时验证
        form.querySelectorAll('input, textarea').forEach(field => {
            field.addEventListener('blur', () => {
                if (field.value.trim()) {
                    field.classList.remove('error');
                    const errorEl = field.parentElement.querySelector('.error-message');
                    if (errorEl) errorEl.textContent = '';
                }
            });
        });
    };
    
    setupForm();
    
    // ====================================================================
    // 10. 响应式优化 - 窗口尺寸变化
    // ====================================================================
    
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            const menuToggle = document.querySelector('.menu-toggle');
            const navMenu = document.querySelector('.nav-menu');
            
            if (window.innerWidth > 768) {
                // 桌面模式 - 关闭移动菜单
                if (menuToggle) menuToggle.classList.remove('active');
                if (navMenu) navMenu.classList.remove('active');
                document.body.classList.remove('no-scroll');
            }
        }, 250);
    });
});

// ====================================================================
// 11. 性能优化 - 页面加载完
// ====================================================================

window.addEventListener('load', () => {
    // 移除加载动画（如果存在）
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.remove();
        }, 300);
    }
});
