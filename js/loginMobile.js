// project_03.js

const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const agreeTermsInput = document.getElementById('agreeTerms');
const registerBtn = document.getElementById('registerBtn');

registerBtn.addEventListener('click', function() {
    let isValid = true;

    // Validate email
    if (!emailInput.value.trim()) {
        document.getElementById('emailError').textContent = 'Email không được để trống.';
        isValid = false;
    } else if (!isValidEmail(emailInput.value)) {
        document.getElementById('emailError').textContent = 'Email không đúng định dạng.';
        isValid = false;
    } else {
        document.getElementById('emailError').textContent = '';
    }

    // Validate mật khẩu
    if (!passwordInput.value.trim()) {
        document.getElementById('passwordError').textContent = 'Mật khẩu không được để trống.';
        isValid = false;
    } else if (passwordInput.value.length < 8) {
        document.getElementById('passwordError').textContent = 'Mật khẩu phải có ít nhất 8 ký tự.';
        isValid = false;
    } else {
        document.getElementById('passwordError').textContent = '';
    }

    // Validate điều khoản
    if (!agreeTermsInput.checked) {
        document.getElementById('termsError').textContent = 'Vui lòng đồng ý với điều khoản.';
        isValid = false;
    } else {
        document.getElementById('termsError').textContent = '';
    }

    if (isValid) {
        // Lưu trữ thông tin đăng ký vào localStorage
        const userData = {
            email: emailInput.value,
            password: passwordInput.value
        };
        localStorage.setItem('userData', JSON.stringify(userData));

        // Chuyển hướng đến trang đăng nhập (hoặc trang khác)
        alert('Đăng ký thành công!');
        window.location.href = 'login.html'; // Thay đổi 'login.html' thành trang bạn muốn chuyển hướng đến
    }
});

function isValidEmail(email) {
    // Regular expression để kiểm tra định dạng email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}