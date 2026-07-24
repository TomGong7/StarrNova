(function () {
    'use strict';

    function initTabs() {
        document.querySelectorAll('.tabs').forEach(function (tabsContainer) {
            tabsContainer.querySelectorAll('.tab').forEach(function (tab) {
                tab.addEventListener('click', function () {
                    tabsContainer.querySelectorAll('.tab').forEach(function (t) {
                        t.classList.remove('active');
                    });
                    tab.classList.add('active');

                    var targetId = tab.getAttribute('data-tab');
                    if (targetId) {
                        var wrapper = tabsContainer.closest('.login-section') || tabsContainer.parentElement;
                        if (wrapper) {
                            wrapper.querySelectorAll('.tab-panel').forEach(function (panel) {
                                panel.classList.remove('active');
                            });
                            var target = wrapper.querySelector('#panel-' + targetId) || wrapper.querySelector('[data-panel="' + targetId + '"]');
                            if (target) {
                                target.classList.add('active');
                            }
                        }
                    }
                });
            });
        });
    }

    function initNavActive() {
        var currentPath = window.location.pathname;
        var normalizedPath = currentPath;
        if (currentPath === '/' || currentPath === '/index.html' || currentPath === '') {
            normalizedPath = '/StarrNova.html';
        }
        document.querySelectorAll('nav a').forEach(function (link) {
            var href = link.getAttribute('href');
            if (href === normalizedPath) {
                link.classList.add('active');
            }
        });
    }

    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
            anchor.addEventListener('click', function (e) {
                var targetId = this.getAttribute('href');
                if (targetId === '#') return;
                var target = document.querySelector(targetId);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });
    }

    function initMobileNav() {
        var nav = document.querySelector('nav');
        if (!nav) return;
        var toggle = document.createElement('button');
        toggle.className = 'nav-toggle';
        toggle.innerHTML = '☰';
        toggle.style.cssText = 'display:none;background:none;border:none;font-size:1.5rem;cursor:pointer;color:inherit;padding:8px;';
        var container = nav.querySelector('.container');
        if (container) {
            container.insertBefore(toggle, container.firstChild);
        }
        function checkMobile() {
            if (window.innerWidth <= 768) {
                toggle.style.display = 'block';
                var ul = nav.querySelector('ul');
                if (ul) {
                    ul.style.display = nav.classList.contains('nav-open') ? 'flex' : 'none';
                }
            } else {
                toggle.style.display = 'none';
                var ul = nav.querySelector('ul');
                if (ul) ul.style.display = '';
                nav.classList.remove('nav-open');
            }
        }
        toggle.addEventListener('click', function () {
            nav.classList.toggle('nav-open');
            var ul = nav.querySelector('ul');
            if (ul) {
                ul.style.display = nav.classList.contains('nav-open') ? 'flex' : 'none';
            }
        });
        window.addEventListener('resize', checkMobile);
        checkMobile();
    }

    function initCardAnimations() {
        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        document.querySelectorAll('.glass-card, .card, .stat-card').forEach(function (el) {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            observer.observe(el);
        });
    }

    document.addEventListener('DOMContentLoaded', function () {
        initTabs();
        initNavActive();
        initSmoothScroll();
        initMobileNav();
        initCardAnimations();
    });

    window.Main = {
        initTabs: initTabs,
        initNavActive: initNavActive
    };
})();