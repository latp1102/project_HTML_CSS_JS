const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const loginBtn = document.getElementById('loginBtn');

loginBtn.addEventListener('click', function() {
    let isValid = true;

    if (!emailInput.value.trim()) {
        document.getElementById('emailError').textContent = 'Email không được để trống.';
        isValid = false;
    } else {
        document.getElementById('emailError').textContent = '';
    }

    if (!passwordInput.value.trim()) {
        document.getElementById('passwordError').textContent = 'Mật khẩu không được để trống.';
        isValid = false;
    } else {
        document.getElementById('passwordError').textContent = '';
    }

    if (isValid) {
        const userData = JSON.parse(localStorage.getItem('userData'));

        if (userData && userData.email === emailInput.value && userData.password === passwordInput.value) {
            alert('Đăng nhập thành công!');
            window.location.href = 'dashboard.html'; 
        } else {
            alert('Email hoặc mật khẩu không đúng.');
        }
    }
});
