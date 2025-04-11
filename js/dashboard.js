document.addEventListener('DOMContentLoaded', function() {
    // Highlight current page in sidebar
    const currentPage = window.location.pathname.split('/').pop() || 'home.html';
    const menuItems = document.querySelectorAll('.sidebar li');
    
    menuItems.forEach(item => {
        const link = item.querySelector('a');
        if (link.getAttribute('href') === currentPage) {
            item.classList.add('active');
        }
    });
    
    // You can add more dashboard-specific functionality here
});