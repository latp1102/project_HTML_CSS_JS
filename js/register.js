const firstNameInput = document.getElementById('firstName');
const lastNameInput = document.getElementById('lastName');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const agreeTermsInput = document.getElementById('agreeTerms');
const registerBtn = document.getElementById('registerBtn');
const nameErrorSpan = document.getElementById('nameError');
const emailErrorSpan = document.getElementById('emailError');
const passwordErrorSpan = document.getElementById('passwordError');
const termsErrorSpan = document.getElementById('termsError');
const registrationForm = document.getElementById('registrationForm'); // Lấy tham chiếu đến form (nếu cần)

registerBtn.addEventListener('click', function() {
    let isValid = true;

    // Kiểm tra họ và tên
    if (!firstNameInput.value.trim() || !lastNameInput.value.trim()) {
        nameErrorSpan.textContent = 'Họ và tên không được để trống.';
        isValid = false;
    } else {
        nameErrorSpan.textContent = '';
    }

    // Kiểm tra email
    if (!emailInput.value.trim()) {
        emailErrorSpan.textContent = 'Email không được để trống.';
        isValid = false;
    } else if (!isValidEmail(emailInput.value)) {
        emailErrorSpan.textContent = 'Email không đúng định dạng.';
        isValid = false;
    } else {
        emailErrorSpan.textContent = '';
    }

    // Kiểm tra mật khẩu
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

    // Kiểm tra điều khoản
    if (!agreeTermsInput.checked) {
        termsErrorSpan.textContent = 'Vui lòng đồng ý với điều khoản';
        isValid = false;
    } else {
        termsErrorSpan.textContent = '';
    }

    if (isValid) {
        const userData = {
            firstName: firstNameInput.value.trim(),
            lastName: lastNameInput.value.trim(),
            email: emailInput.value.trim(),
            password: passwordInput.value
        };

        localStorage.setItem('userData', JSON.stringify(userData));

        Swal.fire({
            text: "Đăng ký thành công",
            icon: "success"
        }).then(() => {
            window.location.href = 'login.html';
        });
    } else {
        Swal.fire({
            text: "Vui lòng kiểm tra lại thông tin đăng ký",
            icon: "error"
        });
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