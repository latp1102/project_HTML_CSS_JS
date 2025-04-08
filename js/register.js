const firstNameInput = document.getElementById('firstName');
const lastNameInput = document.getElementById('lastName');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirmPassword');
const agreeTermsInput = document.getElementById('agreeTerms');
const registerBtn = document.getElementById('registerBtn');
const passwordErrorSpan = document.getElementById('passwordError'); // Get the password error span

registerBtn.addEventListener('click', function() {
    let isValid = true;

    if (!firstNameInput.value.trim() || !lastNameInput.value.trim()) {
        document.getElementById('nameError').textContent = 'Họ và tên không được để trống.';
        isValid = false;
    } else {
        document.getElementById('nameError').textContent = '';
    }

    if (!emailInput.value.trim()) {
        document.getElementById('emailError').textContent = 'Email không được để trống.';
        isValid = false;
    } else if (!isValidEmail(emailInput.value)) {
        document.getElementById('emailError').textContent = 'Email không đúng định dạng.';
        isValid = false;
    } else {
        document.getElementById('emailError').textContent = '';
    }

    if (!passwordInput.value.trim()) {
        passwordErrorSpan.textContent = 'Mật khẩu không được để trống';
        isValid = false;
    } else if (passwordInput.value.length < 8) {
        passwordErrorSpan.textContent = 'Mật khẩu phải có ít nhất 8 ký tự';
        isValid = false;
    } else if (isPasswordDuplicate(passwordInput.value)) { 
        passwordErrorSpan.textContent = 'Mật khẩu này đã được sử dụng. Vui lòng chọn mật khẩu khác.';
        isValid = false;
    } else {
        passwordErrorSpan.textContent = '';
    }

    if (!confirmPasswordInput.value.trim()) {
        document.getElementById('confirmPasswordError').textContent = 'Vui lòng xác nhận mật khẩu';
        isValid = false;
    } else if (passwordInput.value !== confirmPasswordInput.value) {
        document.getElementById('confirmPasswordError').textContent = 'Mật khẩu và mật khẩu xác nhận không khớp';
        isValid = false;
    } else {
        document.getElementById('confirmPasswordError').textContent = '';
    }

    if (!agreeTermsInput.checked) {
        document.getElementById('termsError').textContent = 'Vui lòng đồng ý với điều khoản';
        isValid = false;
    } else {
        document.getElementById('termsError').textContent = '';
    }

    if (isValid) {
        const userData = {
            firstName: firstNameInput.value.trim(),
            lastName: lastNameInput.value.trim(),
            email: emailInput.value.trim(),
            password: passwordInput.value
        };

        localStorage.setItem('userData', JSON.stringify(userData));

        alert('Đăng ký thành công!');
        window.location.href = 'login.html';
    } else {
        alert('Vui lòng kiểm tra lại thông tin đăng ký.');
    }
});

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isPasswordDuplicate(newPassword) {
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
        const userData = JSON.parse(storedUserData);
        return userData.password === newPassword;
    }
    return false;
}