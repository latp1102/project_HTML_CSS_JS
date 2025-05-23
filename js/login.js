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
    } else if (passwordInput.value.length < 8){
        document.getElementById('passwordError').textContent = 'Mật khẩu có ít nhất 8 ký tự';
        isValid = false;
    } else {
        document.getElementById('passwordError').textContent = '';
    }

    if (isValid) {
        const userData = JSON.parse(localStorage.getItem('userData'));

        if (userData && userData.email === emailInput.value && userData.password === passwordInput.value) {
            Swal.fire({
                text: "Đăng nhập thành công",
                icon: "success"
            }).then(()=> {
                window.location.href = 'home.html'; 
            });
        } else {
            Swal.fire({
                text: "Email hoặc mật khẩu không đúng",
                icon: "error"
            });
        }
    }
});
