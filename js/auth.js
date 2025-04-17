document.addEventListener('DOMContentLoaded', function () {
    const mobileInput = document.getElementById('mobile');
    const otpGroup = document.querySelector('.otp-group');
    const otpInput = document.getElementById('otp');
    const requestOtpBtn = document.getElementById('requestOtpBtn');
    const loginBtn = document.getElementById('loginBtn');
    const timerElement = document.getElementById('timer');
    const loginForm = document.getElementById('loginForm');

    const FIXED_OTP = '123456'; // Simulated backend OTP
    let timer;
    let timeLeft = 120;

    // Handle "Request OTP"
    requestOtpBtn.addEventListener('click', function () {
        const mobile = mobileInput.value.trim();

        // Validate mobile number
        if (!/^\d{10}$/.test(mobile)) {
            alert('Please enter a valid 10-digit mobile number.');
            return;
        }

        // Simulate sending OTP (real world: call backend API here)
        console.log(`OTP sent to +91-${mobile}: ${FIXED_OTP}`);

        // Show OTP input and login button
        otpGroup.style.display = 'block';
        loginBtn.style.display = 'inline-block';
        requestOtpBtn.style.display = 'none';

        // Focus on OTP input
        otpInput.focus();

        // Start OTP expiration timer
        startTimer();
    });

    // Handle Login form submission
    loginForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const enteredOtp = otpInput.value.trim();

        // Validate OTP input
        if (!/^\d{6}$/.test(enteredOtp)) {
            alert('Please enter a valid 6-digit OTP.');
            return;
        }

        // Check against fixed OTP
        if (enteredOtp === FIXED_OTP) {
            alert('OTP verified successfully!');
            window.location.href = 'home.html'; // Redirect to dashboard
        } else {
            alert('Invalid OTP. Please try again.');
        }
    });

    // Start countdown timer
    function startTimer() {
        clearInterval(timer);
        timeLeft = 120;
        updateTimerDisplay();

        timer = setInterval(function () {
            timeLeft--;
            updateTimerDisplay();

            if (timeLeft <= 0) {
                clearInterval(timer);
                alert('OTP expired. Please request a new one.');
                resetOtpUI();
            }
        }, 1000);
    }

    // Update timer display
    function updateTimerDisplay() {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        timerElement.textContent = `${minutes.toString().padStart(2, '0')}:${seconds
            .toString()
            .padStart(2, '0')}`;
    }

    // Reset OTP section after expiry
    function resetOtpUI() {
        otpGroup.style.display = 'none';
        loginBtn.style.display = 'none';
        requestOtpBtn.style.display = 'inline-block';
        otpInput.value = '';
        timerElement.textContent = '';
    }
});
