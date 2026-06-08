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
    const currentPage = window.location.pathname;
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (currentPage.includes(link.getAttribute('href'))) {
            link.classList.add('active');
        }
    });
}

// 3. 表单验证 - 邮箱验证
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// 4. 表单验证 - 密码强度检查
function validatePasswordStrength(password) {
    // 密码长度至少8位，包含大小写字母和数字
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    return passwordRegex.test(password);
}

// 5. 显示提示消息
function showAlert(message, type = 'info') {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type}`;
    alertDiv.textContent = message;
    
    const container = document.querySelector('.container') || document.body;
    container.insertBefore(alertDiv, container.firstChild);
    
    // 5秒后自动移除
    setTimeout(() => {
        alertDiv.remove();
    }, 5000);
}

// 6. 确认对话框
function confirmAction(message) {
    return confirm(message);
}

// 7. 设置本地存储
function setLocalStorage(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
        return true;
    } catch (e) {
        console.error('本地存储失败:', e);
        return false;
    }
}

// 8. 获取本地存储
function getLocalStorage(key) {
    try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : null;
    } catch (e) {
        console.error('获取本地存储失败:', e);
        return null;
    }
}

// 9. 移除本地存储
function removeLocalStorage(key) {
    try {
        localStorage.removeItem(key);
        return true;
    } catch (e) {
        console.error('移除本地存储失败:', e);
        return false;
    }
}

// 10. 格式化日期
function formatDate(date, format = 'YYYY-MM-DD') {
    if (typeof date === 'string') {
        date = new Date(date);
    }
    
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    
    return format
        .replace('YYYY', year)
        .replace('MM', month)
        .replace('DD', day);
}

// 11. 防抖函数（用于搜索等场景）
function debounce(func, delay) {
    let timer;
    return function(...args) {
        clearTimeout(timer);
        timer = setTimeout(() => func.apply(this, args), delay);
    };
}

// 12. 节流函数（用于滚动事件等）
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// 13. 页面加载后的过渡效果
function addPageTransition() {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease-in';
        document.body.style.opacity = '1';
    }, 100);
}

// 14. 获取当前用户类型（从本地存储或session）
function getUserType() {
    return getLocalStorage('userType') || null;
}

// 15. 检查用户是否已登录
function isUserLoggedIn() {
    return getLocalStorage('userId') !== null;
}

// 16. 退出登录
function logout() {
    if (confirmAction('确定要退出登录吗？')) {
        removeLocalStorage('userId');
        removeLocalStorage('userType');
        removeLocalStorage('userName');
        window.location.href = './StarrNova.html';
    }
}
