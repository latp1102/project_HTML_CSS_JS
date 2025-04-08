const firstNameInput = document.getElementById('firstName');
const lastNameInput = document.getElementById('lastName');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const agreeTermsInput = document.getElementById('agreeTerms');
const registerBtn = document.getElementById('registerBtn');

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
        document.getElementById('passwordError').textContent = 'Mật khẩu không được để trống';
        isValid = false;
    } else if (passwordInput.value.length < 8) {
        document.getElementById('passwordError').textContent = 'Mật khẩu phải có ít nhất 8 ký tự';
        isValid = false;
    } else {
        document.getElementById('passwordError').textContent = '';
    }

    if (!agreeTermsInput.checked) {
        document.getElementById('termsError').textContent = 'Vui lòng đồng ý với điều khoản';
        isValid = false;
    } else {
        document.getElementById('termsError').textContent = '';
    }

    if (isValid) {
        const userData = {
            firstName: firstNameInput.value,
            lastName: lastNameInput.value,
            email: emailInput.value,
            password: passwordInput.value
        };
        localStorage.setItem('userData', JSON.stringify(userData));

        alert('Đăng ký thành công!');
        window.location.href = 'login.html'; 
    }
});

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}