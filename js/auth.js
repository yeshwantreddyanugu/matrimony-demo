// Authentication module
const Auth = (function() {
    // Private variables
    const authTokenKey = 'authToken';
    const loggedInEmailKey = 'loggedInEmail';
    const lastLoginKey = 'lastLogin';

    // Public methods
    return {
        // Check if user is authenticated
        isAuthenticated: function() {
            return !!localStorage.getItem(authTokenKey);
        },

        // Store authentication data
        login: function(token, email) {
            localStorage.setItem(authTokenKey, token);
            localStorage.setItem(loggedInEmailKey, email);
            localStorage.setItem(lastLoginKey, new Date().toISOString());
        },

        // Clear authentication data
        logout: function() {
            localStorage.removeItem(authTokenKey);
            localStorage.removeItem(loggedInEmailKey);
            localStorage.removeItem(lastLoginKey);
            sessionStorage.clear();
            
            // Clear cookies
            document.cookie.split(";").forEach(function(c) {
                document.cookie = c.replace(/^ +/, "")
                    .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
            });
        },

        // Get current auth token
        getToken: function() {
            return localStorage.getItem(authTokenKey);
        },

        // Verify token with server
        verifyToken: async function() {
            try {
                const response = await fetch('/api/auth/verify', {
                    headers: {
                        'Authorization': `Bearer ${this.getToken()}`
                    }
                });
                return response.ok;
            } catch (error) {
                return false;
            }
        },

        // Check auth status
        checkAuth: function() {
            if (!this.isAuthenticated()) {
                window.location.replace('index.html?auth=' + Date.now());
            }
        },

        // Initialize auth protection
        init: function() {
            // Only run on protected pages (not login page)
            if (!window.location.pathname.includes('index.html')) {
                this.checkAuth();
                
                // Add pageshow event listener
                window.addEventListener('pageshow', function(event) {
                    if (event.persisted) {
                        Auth.checkAuth();
                    }
                });
            }
        }
    };
})();

// Initialize auth protection when script loads
document.addEventListener('DOMContentLoaded', function() {
    Auth.init();
});