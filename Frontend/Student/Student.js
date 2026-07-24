(function () {
    'use strict';

    function logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('user');
        window.location.href = '/StarrNova.html';
    }

    function initCourseButtons() {
        document.querySelectorAll('.course-item .btn-primary').forEach(function (btn) {
            btn.addEventListener('click', function () {
                var courseItem = this.closest('.course-item');
                var courseName = courseItem ? courseItem.querySelector('h4') : null;
                var name = courseName ? courseName.textContent : '课程';
                alert('即将进入: ' + name + '\n（课程详情功能开发中）');
            });
        });
    }

    function initTaskStatus() {
        document.querySelectorAll('.status-pending').forEach(function (status) {
            status.addEventListener('click', function () {
                var row = this.closest('tr');
                if (!row) return;
                var taskType = row.cells[0] ? row.cells[0].textContent : '';
                alert('任务: ' + taskType + '\n（任务详情功能开发中）');
            });
            status.style.cursor = 'pointer';
        });
    }

    function init() {
        initCourseButtons();
        initTaskStatus();
    }

    window.logout = logout;
    document.addEventListener('DOMContentLoaded', init);
})();