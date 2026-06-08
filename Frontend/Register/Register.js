/* ========================================
   StarrNova - 注册页 JavaScript
   ======================================== */

document.addEventListener('DOMContentLoaded', function() {
    console.log('注册页已加载');
    
    // 初始化注册表单
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', handleRegisterSubmit);
    }
});

// 处理注册表单提交
function handleRegisterSubmit(event) {
    event.preventDefault();
    
    // 获取表单数据
    const userType = document.getElementById('userType').value;
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const fullName = document.getElementById('fullName').value;
    const studentId = document.getElementById('studentId').value;
    
    // 表单验证
    if (!userType) {
        showAlert('请选择账户类型', 'warning');
        return;
    }
    
    if (!validateEmail(email)) {
        showAlert('请输入有效的邮箱地址', 'warning');
        return;
    }
    
    if (!validatePasswordStrength(password)) {
        showAlert('密码强度不足（需至少8位，包含大小写字母和数字）', 'warning');
        return;
    }
    
    if (password !== confirmPassword) {
        showAlert('两次输入的密码不一致', 'warning');
        return;
    }
    
    // 这里可以添加后端API调用来提交注册信息
    console.log('注册数据:', {
        userType,
        username,
        email,
        fullName,
        studentId
    });
    
    showAlert('注册成功！', 'success');
    // 可以在这里添加跳转到登录页的逻辑
}
