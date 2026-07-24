(function () {
    'use strict';

    var countdownTimer = null;
    var countdownSeconds = 0;

    function switchLoginTab(tabName) {
        document.querySelectorAll('.login-tabs .tab').forEach(function (tab) {
            tab.classList.toggle('active', tab.getAttribute('data-tab') === tabName);
        });
        document.querySelectorAll('.tab-panel').forEach(function (panel) {
            panel.classList.toggle('active', panel.id === 'panel-' + tabName);
        });
    }

    function startCountdown(seconds) {
        var btn = document.getElementById('btnSendCode');
        if (!btn) return;
        countdownSeconds = seconds;
        btn.disabled = true;
        btn.textContent = countdownSeconds + 's 后重发';
        clearInterval(countdownTimer);
        countdownTimer = setInterval(function () {
            countdownSeconds--;
            if (countdownSeconds <= 0) {
                clearInterval(countdownTimer);
                btn.disabled = false;
                btn.textContent = '获取验证码';
            } else {
                btn.textContent = countdownSeconds + 's 后重发';
            }
        }, 1000);
    }

    function showMessage(text, type) {
        var msgEl = document.getElementById('loginMessage');
        if (!msgEl) return;
        msgEl.textContent = text;
        msgEl.className = 'login-message ' + (type || '');
        msgEl.style.display = 'block';
        setTimeout(function () {
            msgEl.style.display = 'none';
        }, 3000);
    }

    function handleLogin(e) {
        e.preventDefault();
        var activeTab = document.querySelector('.login-tabs .tab.active');
        if (!activeTab) return;
        var method = activeTab.getAttribute('data-tab');
        var data = {};

        if (method === 'starrnova-id') {
            var id = document.getElementById('sn-starrnovaid');
            var pw = document.getElementById('sn-password');
            if (!id.value.trim()) { showMessage('请输入 StarrNova ID', 'error'); id.focus(); return; }
            if (!pw.value) { showMessage('请输入密码', 'error'); pw.focus(); return; }
            data.starrnovaId = id.value.trim();
            data.password = pw.value;
        } else if (method === 'sms-code') {
            var contact = document.getElementById('sms-contact');
            var code = document.getElementById('sms-code-input');
            if (!contact.value.trim()) { showMessage('请输入手机号或邮箱', 'error'); contact.focus(); return; }
            if (!code.value.trim()) { showMessage('请输入验证码', 'error'); code.focus(); return; }
            data.contact = contact.value.trim();
            data.code = code.value.trim();
        } else if (method === 'student-id') {
            var sid = document.getElementById('sid-number');
            var spw = document.getElementById('sid-password');
            if (!sid.value.trim()) { showMessage('请输入学号/工号', 'error'); sid.focus(); return; }
            if (!spw.value) { showMessage('请输入密码', 'error'); spw.focus(); return; }
            data.studentId = sid.value.trim();
            data.password = spw.value;
        }

        showMessage('登录功能暂未连接后端', 'info');
    }

    function init() {
        var loginForm = document.getElementById('loginForm');
        if (loginForm) {
            loginForm.addEventListener('submit', handleLogin);
        }

        var btnSendCode = document.getElementById('btnSendCode');
        if (btnSendCode) {
            btnSendCode.addEventListener('click', function () {
                var contact = document.getElementById('sms-contact');
                if (!contact || !contact.value.trim()) {
                    showMessage('请先输入手机号或邮箱', 'error');
                    if (contact) contact.focus();
                    return;
                }
                startCountdown(60);
                showMessage('验证码已发送（模拟）', 'info');
            });
        }

        var btnForgot = document.getElementById('btnForgot');
        if (btnForgot) {
            btnForgot.addEventListener('click', function () {
                showMessage('密码重置功能暂未开放', 'info');
            });
        }

        document.querySelectorAll('.login-tabs .tab').forEach(function (tab) {
            tab.addEventListener('click', function () {
                switchLoginTab(this.getAttribute('data-tab'));
            });
        });
    }

    document.addEventListener('DOMContentLoaded', init);
})();