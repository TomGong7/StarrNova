/* ========================================
   StarrNova - 学生首页 JavaScript
   ======================================== */

document.addEventListener('DOMContentLoaded', function() {
    console.log('学生首页已加载');
    
    // 初始化学生首页
    initStudentDashboard();
});

// 初始化学生首页仪表板
function initStudentDashboard() {
    // 检查用户是否已登录
    if (!isUserLoggedIn()) {
        window.location.href = '../StarrNova.html';
        return;
    }
    
    // 加载学生信息
    loadStudentInfo();
    
    // 加载课程列表
    loadCourses();
    
    // 加载待处理任务
    loadPendingTasks();
}

// 加载学生信息
function loadStudentInfo() {
    // 这里可以添加从后端API获取学生信息的逻辑
    const studentName = getLocalStorage('starrnovaId') || '学生用户';
    console.log('加载学生信息:', studentName);
}

// 加载课程列表
function loadCourses() {
    // 这里可以添加从后端API获取课程列表的逻辑
    console.log('加载课程列表');
}

// 加载待处理任务
function loadPendingTasks() {
    // 这里可以添加从后端API获取待处理任务的逻辑
    console.log('加载待处理任务');
}

// 学生特有的函数可以添加在这里