function checkAuth() {
    if (!localStorage.getItem('loggedInEmail')) {
        window.location.replace('index.html?auth=' + Date.now());
    }
}