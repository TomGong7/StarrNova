/* ========================================
   StarrNova - 通用JavaScript文件
   所有页面的通用功能和工具函数
   ======================================== */

// 1. 文档加载完成时执行的初始化函数
document.addEventListener('DOMContentLoaded', function() {
    console.log('StarrNova 应用已初始化');
    
    // 初始化导航栏
    initNavigation();
});

// 2. 导航栏初始化和活动状态管理
function initNavigation() {
    const path = window.location.pathname.replace(/\/$/, '') || '/';
    document.querySelectorAll('nav a').forEach(link => {
        const href = link.getAttribute('href')?.replace(/\/$/, '') || '/';
        link.classList.toggle('active', path === href || path.endsWith(href));
    });
}

// 4. 表单验证 - 邮箱验证
function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// 5. 表单验证 - 密码强度检查
function validatePasswordStrength(password) {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(password);
}

// 6. 确认对话框
function confirmAction(message) {
    return confirm(message);
}

// 7. 本地存储操作
const storage = {
    set: (key, value) => localStorage.setItem(key, JSON.stringify(value)),
    get: (key) => {
        try { return JSON.parse(localStorage.getItem(key)); }
        catch (e) { return null; }
    },
    remove: (key) => localStorage.removeItem(key)
};

// 兼容旧函数名
function setLocalStorage(key, value) { return storage.set(key, value); }
function getLocalStorage(key) { return storage.get(key); }
function removeLocalStorage(key) { return storage.remove(key); }

// 8. 获取当前用户类型
function getUserType() {
    return getLocalStorage('userType') || null;
}

// 9. 检查用户是否已登录
function isUserLoggedIn() {
    return getLocalStorage('userId') !== null;
}

// 10. 退出登录
function logout() {
    if (confirmAction('确定要退出登录吗？')) {
        removeLocalStorage('userId');
        removeLocalStorage('userType');
        removeLocalStorage('starrnovaId');
        window.location.href = './StarrNova.html';
    }
}