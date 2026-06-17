/* ========================================
   StarrNova - 教师首页 JavaScript
   ======================================== */

document.addEventListener('DOMContentLoaded', function() {
    console.log('教师首页已加载');
    
    // 初始化教师首页
    initTeacherDashboard();
});

// 初始化教师首页仪表板
function initTeacherDashboard() {
    // 检查用户是否已登录
    if (!isUserLoggedIn()) {
        window.location.href = '../StarrNova.html';
        return;
    }
    
    // 加载教师信息
    loadTeacherInfo();
    
    // 加载授课课程
    loadTeacherCourses();
    
    // 加载最新活动
    loadTeacherActivity();
}

// 加载教师信息
function loadTeacherInfo() {
    // 这里可以添加从后端API获取教师信息的逻辑
    const teacherName = getLocalStorage('starrnovaId') || '教师用户';
    console.log('加载教师信息:', teacherName);
}

// 加载授课课程
function loadTeacherCourses() {
    // 这里可以添加从后端API获取授课课程的逻辑
    console.log('加载授课课程');
}

// 加载最新活动
function loadTeacherActivity() {
    // 这里可以添加从后端API获取最新活动的逻辑
    console.log('加载最新活动');
}

// 教师特有的函数可以添加在这里