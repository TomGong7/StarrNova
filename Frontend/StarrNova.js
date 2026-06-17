/* ========================================
   StarrNova - 欢迎页 JavaScript
   ======================================== */

document.addEventListener('DOMContentLoaded', function () {
    var tabs = document.querySelectorAll('.login-tabs .tab');
    var panels = document.querySelectorAll('.tab-panel');
    var loginForm = document.getElementById('loginForm');
    var loginMessage = document.getElementById('loginMessage');
    var btnSendCode = document.getElementById('btnSendCode');
    var btnForgot = document.getElementById('btnForgot');

    var currentTab = 'starrnova-id';
    var codeCooldown = 0;

    tabs.forEach(function (tab) {
        tab.addEventListener('click', function () {
            var target = this.getAttribute('data-tab');
            if (target === currentTab) return;
            currentTab = target;

            tabs.forEach(function (t) { t.classList.remove('active'); });
            this.classList.add('active');

            panels.forEach(function (p) { p.classList.remove('active'); });
            document.getElementById('panel-' + target).classList.add('active');

            clearMessage();
        });
    });

    loginForm.addEventListener('submit', function (e) {
        e.preventDefault();
        clearMessage();

        var payload = {};

        if (currentTab === 'starrnova-id') {
            var starrnovaId = document.getElementById('sn-starrnovaid').value.trim();
            var password = document.getElementById('sn-password').value;
            if (!starrnovaId || !password) {
                showMessage('请输入 StarrNova ID 和密码', 'error');
                return;
            }
            payload.starrnovaId = starrnovaId;
            payload.password = password;
            payload.method = 'starrnova-id';
        } else if (currentTab === 'sms-code') {
            var contact = document.getElementById('sms-contact').value.trim();
            var code = document.getElementById('sms-code-input').value.trim();
            if (!contact || !code) {
                showMessage('请输入手机号/邮箱和验证码', 'error');
                return;
            }
            var contactType = detectContactType(contact);
            if (!contactType) {
                showMessage('请输入正确的手机号或邮箱地址', 'error');
                return;
            }
            if (contactType === 'phone') {
                payload.phone = contact;
            } else {
                payload.email = contact;
            }
            payload.code = code;
            payload.method = contactType === 'phone' ? 'sms' : 'email-code';
        } else if (currentTab === 'student-id') {
            var sid = document.getElementById('sid-number').value.trim();
            var sidPwd = document.getElementById('sid-password').value;
            if (!sid || !sidPwd) {
                showMessage('请输入学工号和密码', 'error');
                return;
            }
            payload.studentId = sid;
            payload.password = sidPwd;
            payload.method = 'student-id';
        }

        var keepLoggedIn = document.getElementById('keepLoggedIn').checked;
        payload.keepLoggedIn = keepLoggedIn;

        performLogin(payload);
    });

    btnSendCode.addEventListener('click', function () {
        if (codeCooldown > 0) return;
        var contact = document.getElementById('sms-contact').value.trim();
        if (!contact) {
            showMessage('请先输入手机号或邮箱地址', 'error');
            return;
        }
        var contactType = detectContactType(contact);
        if (!contactType) {
            showMessage('请输入正确的手机号或邮箱地址', 'error');
            return;
        }

        startCooldown(btnSendCode, 60);
        if (contactType === 'phone') {
            showMessage('验证码已发送至手机（模拟）', 'success');
        } else {
            showMessage('验证码已发送至邮箱（模拟）', 'success');
        }
    });

    btnForgot.addEventListener('click', function () {
        showMessage('密码重置功能即将上线，请联系管理员', 'error');
    });

    function detectContactType(value) {
        if (/^1\d{10}$/.test(value)) return 'phone';
        if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'email';
        return null;
    }

    function performLogin(payload) {
        var apiBody = {};

        if (payload.method === 'starrnova-id') {
            apiBody.starrnovaId = payload.starrnovaId;
            apiBody.password = payload.password;
        } else if (payload.method === 'sms') {
            apiBody.phone = payload.phone;
            apiBody.code = payload.code;
        } else if (payload.method === 'email-code') {
            apiBody.email = payload.email;
            apiBody.code = payload.code;
        } else if (payload.method === 'student-id') {
            apiBody.studentId = payload.studentId;
            apiBody.password = payload.password;
        }

        fetch('/api/users/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(apiBody)
        })
        .then(function (res) { return res.json(); })
        .then(function (data) {
            if (data.success) {
                showMessage('登录成功，正在跳转...', 'success');
                if (data.data && data.data.token) {
                    var storageObj = payload.keepLoggedIn ? localStorage : sessionStorage;
                    storageObj.setItem('token', data.data.token);
                    storageObj.setItem('userId', data.data.user.id);
                    storageObj.setItem('userType', data.data.user.userType);
                    storageObj.setItem('starrnovaId', data.data.user.starrnovaId);
                }
                var userType = data.data.user.userType;
                setTimeout(function () {
                    if (userType === 'student') {
                        window.location.href = '/student';
                    } else if (userType === 'teacher') {
                        window.location.href = '/teacher';
                    } else if (userType === 'admin') {
                        window.location.href = '/admin';
                    } else {
                        window.location.href = '/';
                    }
                }, 800);
            } else {
                showMessage(data.message || '登录失败，请重试', 'error');
            }
        })
        .catch(function () {
            showMessage('网络错误，请检查连接后重试', 'error');
        });
    }

    function startCooldown(btn, seconds) {
        codeCooldown = seconds;
        btn.disabled = true;
        var remaining = seconds;

        btn.textContent = remaining + 's';
        var timer = setInterval(function () {
            remaining--;
            if (remaining <= 0) {
                clearInterval(timer);
                btn.disabled = false;
                btn.textContent = '获取验证码';
                codeCooldown = 0;
            } else {
                btn.textContent = remaining + 's';
            }
        }, 1000);
    }

    function showMessage(text, type) {
        loginMessage.textContent = text;
        loginMessage.className = 'login-message ' + type;
    }

    function clearMessage() {
        loginMessage.textContent = '';
        loginMessage.className = 'login-message';
    }
});