// register.js

const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const loginBtn = document.getElementById('loginBtn');

loginBtn.addEventListener('click', function() {
    let isValid = true;

    // Validate email
    if (!emailInput.value.trim()) {
        document.getElementById('emailError').textContent = 'Email không được để trống.';
        isValid = false;
    } else {
        document.getElementById('emailError').textContent = '';
    }

    // Validate mật khẩu
    if (!passwordInput.value.trim()) {
        document.getElementById('passwordError').textContent = 'Mật khẩu không được để trống.';
        isValid = false;
    } else {
        document.getElementById('passwordError').textContent = '';
    }

    if (isValid) {
        // Kiểm tra thông tin đăng nhập từ localStorage
        const userData = JSON.parse(localStorage.getItem('userData'));

        if (userData && userData.email === emailInput.value && userData.password === passwordInput.value) {
            // Đăng nhập thành công
            alert('Đăng nhập thành công!');
            window.location.href = 'home.html'; // Thay đổi 'dashboard.html' thành trang bạn muốn chuyển hướng đến
        } else {
            // Đăng nhập thất bại
            alert('Email hoặc mật khẩu không đúng.');
        }
    }
});