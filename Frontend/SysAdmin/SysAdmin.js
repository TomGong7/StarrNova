(function () {
    'use strict';

    var monitorInterval = null;

    function logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('user');
        window.location.href = '/StarrNova.html';
    }

    function initQuickActions() {
        document.querySelectorAll('.quick-actions .btn').forEach(function (btn) {
            btn.addEventListener('click', function () {
                var action = this.textContent.trim();
                alert(action + '\n（功能开发中）');
            });
        });
    }

    function initSystemMonitor() {
        function updateMonitor() {
            document.querySelectorAll('.progress-fill').forEach(function (fill) {
                var current = parseInt(fill.style.width, 10) || 50;
                var delta = Math.floor(Math.random() * 7) - 3;
                var next = Math.max(10, Math.min(95, current + delta));
                fill.style.width = next + '%';
                fill.textContent = next + '%';

                fill.className = 'progress-fill';
                if (next >= 80) {
                    fill.classList.add('progress-danger');
                } else if (next >= 60) {
                    fill.classList.add('progress-warning');
                }
            });
        }

        monitorInterval = setInterval(updateMonitor, 5000);
    }

    function initActivityRefresh() {
        var activityList = document.querySelector('.activity-list');
        if (!activityList) return;

        var refreshBtn = document.createElement('button');
        refreshBtn.className = 'btn btn-secondary';
        refreshBtn.textContent = '刷新活动';
        refreshBtn.style.cssText = 'margin-bottom:12px;';
        refreshBtn.addEventListener('click', function () {
            alert('活动列表已刷新（模拟）');
        });

        var cardBody = activityList.parentElement;
        if (cardBody) {
            cardBody.insertBefore(refreshBtn, activityList);
        }
    }

    function init() {
        initQuickActions();
        initSystemMonitor();
        initActivityRefresh();

        window.addEventListener('beforeunload', function () {
            if (monitorInterval) {
                clearInterval(monitorInterval);
                monitorInterval = null;
            }
        });
    }

    window.logout = logout;
    document.addEventListener('DOMContentLoaded', init);
})();