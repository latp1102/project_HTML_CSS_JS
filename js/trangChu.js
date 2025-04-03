const userData = JSON.parse(localStorage.getItem('userData'));

if (userData) {
    document.getElementById('userName').textContent = userData.email; 
} else {
    document.getElementById('logoutBtn').style.display = 'none';
}

document.getElementById('logoutBtn').addEventListener('click', function() {
    localStorage.removeItem('userData');

    window.location.href = 'login.html';
});