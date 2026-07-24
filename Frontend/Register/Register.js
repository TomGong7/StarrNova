(function () {
    'use strict';

    function showMessage(text, type) {
        var existing = document.querySelector('.register-message');
        if (existing) existing.remove();
        var msg = document.createElement('div');
        msg.className = 'register-message ' + (type || '');
        msg.textContent = text;
        msg.style.cssText = 'padding:12px;border-radius:8px;margin-top:16px;text-align:center;' +
            (type === 'error' ? 'background:#fee;color:#c00;' :
                type === 'success' ? 'background:#efe;color:#0a0;' :
                    'background:#eef;color:#00c;');
        var form = document.getElementById('registerForm');
        if (form) form.appendChild(msg);
        setTimeout(function () { msg.remove(); }, 3000);
    }

    function validatePassword(pw) {
        if (pw.length < 8) return false;
        if (!/[a-z]/.test(pw)) return false;
        if (!/[A-Z]/.test(pw)) return false;
        if (!/[0-9]/.test(pw)) return false;
        return true;
    }

    function handleRegister(e) {
        e.preventDefault();

        var userType = document.getElementById('userType');
        var starrnovaid = document.getElementById('starrnovaid');
        var email = document.getElementById('email');
        var password = document.getElementById('password');
        var confirmPassword = document.getElementById('confirmPassword');
        var fullName = document.getElementById('fullName');
        var studentId = document.getElementById('studentId');
        var terms = document.getElementById('terms');

        if (!userType.value) { showMessage('请选择账户类型', 'error'); userType.focus(); return; }
        if (!starrnovaid.value.trim()) { showMessage('请输入 StarrNova ID', 'error'); starrnovaid.focus(); return; }
        if (!email.value.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) { showMessage('请输入有效的邮箱地址', 'error'); email.focus(); return; }
        if (!validatePassword(password.value)) { showMessage('密码至少8位，需包含大小写字母和数字', 'error'); password.focus(); return; }
        if (password.value !== confirmPassword.value) { showMessage('两次输入的密码不一致', 'error'); confirmPassword.focus(); return; }
        if (!fullName.value.trim()) { showMessage('请输入真实姓名', 'error'); fullName.focus(); return; }
        if (!studentId.value.trim()) { showMessage('请输入学号/工号', 'error'); studentId.focus(); return; }
        if (!terms.checked) { showMessage('请同意服务条款和隐私政策', 'error'); return; }

        showMessage('注册功能暂未连接后端', 'info');
    }

    function init() {
        var form = document.getElementById('registerForm');
        if (form) {
            form.addEventListener('submit', handleRegister);
        }

        var password = document.getElementById('password');
        var confirmPassword = document.getElementById('confirmPassword');
        if (password && confirmPassword) {
            confirmPassword.addEventListener('input', function () {
                if (this.value && this.value !== password.value) {
                    this.style.borderColor = '#e74c3c';
                } else {
                    this.style.borderColor = '';
                }
            });
        }

        var userType = document.getElementById('userType');
        if (userType) {
            userType.addEventListener('change', function () {
                var studentIdGroup = document.getElementById('studentId');
                if (studentIdGroup) {
                    studentIdGroup.placeholder = this.value === 'teacher' ? '请输入工号' : '请输入学号或工号';
                }
            });
        }
    }

    document.addEventListener('DOMContentLoaded', init);
})();