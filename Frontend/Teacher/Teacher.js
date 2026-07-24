(function () {
    'use strict';

    function logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('user');
        window.location.href = '/StarrNova.html';
    }

    function initQuickActions() {
        var buttons = document.querySelectorAll('.quick-actions .btn');
        buttons.forEach(function (btn) {
            btn.addEventListener('click', function () {
                var action = this.textContent.trim();
                alert(action + '\n（功能开发中）');
            });
        });
    }

    function initCourseTable() {
        document.querySelectorAll('.main-content table a').forEach(function (link) {
            link.addEventListener('click', function (e) {
                e.preventDefault();
                var row = this.closest('tr');
                var courseName = row && row.cells[0] ? row.cells[0].textContent : '课程';
                alert('查看课程详情: ' + courseName + '\n（功能开发中）');
            });
        });
    }

    function init() {
        initQuickActions();
        initCourseTable();
    }

    window.logout = logout;
    document.addEventListener('DOMContentLoaded', init);
})();