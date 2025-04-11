document.addEventListener('DOMContentLoaded', function() {
    const mobileInput = document.getElementById('mobile');
    const otpGroup = document.querySelector('.otp-group');
    const otpInput = document.getElementById('otp');
    const requestOtpBtn = document.getElementById('requestOtpBtn');
    const loginBtn = document.getElementById('loginBtn');
    const timerElement = document.getElementById('timer');
    const loginForm = document.getElementById('loginForm');
    
    // Fixed OTP for testing
    const FIXED_OTP = '123456';
    let otp = FIXED_OTP;
    let timer;
    let timeLeft = 120; // 2 minutes in seconds
    
    // Request OTP button click handler
    requestOtpBtn.addEventListener('click', function() {
        const mobile = mobileInput.value.trim();
        
        // Simple validation
        if (!mobile || !/^\d{10}$/.test(mobile)) {
            alert('Please enter a valid 10-digit mobile number');
            return;
        }
        
        // Immediately use the fixed OTP without generating a random one
        console.log('Using fixed OTP: ' + FIXED_OTP); // For demo purposes
                    
        // Show OTP field and login button
        otpGroup.style.display = 'block';
        loginBtn.style.display = 'inline-block';
        requestOtpBtn.style.display = 'none';
        
        // Start timer
        startTimer();
    });
    
    // Login form submission handler
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const enteredOtp = otpInput.value.trim();
        
        if (!enteredOtp || enteredOtp.length !== 6) {
            alert('Please enter a valid 6-digit OTP');
            return;
        }
        
        // Verify against the fixed OTP
        if (enteredOtp === FIXED_OTP) {
            // On successful verification, redirect to dashboard
            window.location.href = 'home.html';
        } else {
            alert('Invalid OTP. Please try again.');
        }
    });
    
    // Timer functions
    function startTimer() {
        clearInterval(timer);
        timeLeft = 120;
        updateTimerDisplay();
        
        timer = setInterval(function() {
            timeLeft--;
            updateTimerDisplay();
            
            if (timeLeft <= 0) {
                clearInterval(timer);
                alert('OTP expired. Please request a new one.');
                otpGroup.style.display = 'none';
                loginBtn.style.display = 'none';
                requestOtpBtn.style.display = 'inline-block';
            }
        }, 1000);
    }
    
    function updateTimerDisplay() {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        timerElement.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
});