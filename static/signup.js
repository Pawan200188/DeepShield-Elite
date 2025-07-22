document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('signupForm');
    const button = document.getElementById('signupButton');
    const inputs = document.querySelectorAll('input[type="text"], input[type="email"], input[type="password"]');
    const userTypeInputs = document.querySelectorAll('input[name="userType"]');
    const doctorFields = document.querySelectorAll('.doctor-field');

    // Add placeholder attribute for label animation
    inputs.forEach(input => {
        input.setAttribute('placeholder', ' ');
    });

    // Handle user type selection
    userTypeInputs.forEach(input => {
        input.addEventListener('change', (e) => {
            if (e.target.value === 'doctor') {
                doctorFields.forEach(field => {
                    field.classList.remove('hidden');
                    field.querySelector('input').required = true;
                });
            } else {
                doctorFields.forEach(field => {
                    field.classList.add('hidden');
                    field.querySelector('input').required = false;
                });
            }
        });
    });

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const fullName = document.getElementById('fullName').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        const userType = document.querySelector('input[name="userType"]:checked').value;
        
        // Get doctor-specific fields if doctor is selected
        const specialization = userType === 'doctor' ? document.getElementById('specialization').value : null;
        const licenseNumber = userType === 'doctor' ? document.getElementById('licenseNumber').value : null;

        // Basic validation
        if (!fullName || !email || !password || !confirmPassword) {
            alert('Please fill in all required fields');
            return;
        }

        if (!isValidEmail(email)) {
            alert('Please enter a valid email address');
            return;
        }

        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }

        if (password.length < 8) {
            alert('Password must be at least 8 characters long');
            return;
        }

        if (userType === 'doctor' && (!specialization || !licenseNumber)) {
            alert('Please fill in all doctor-specific fields');
            return;
        }

        // Show loading state
        button.classList.add('loading');

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // Here you would typically make your actual API call
            console.log('Signup attempt with:', {
                userType,
                fullName,
                email,
                specialization,
                licenseNumber
            });
            
            // Simulate successful signup
            alert('Account created successfully!');
            window.location.href = 'index.html'; // Redirect to login page
        } catch (error) {
            alert('Signup failed. Please try again.');
        } finally {
            button.classList.remove('loading');
        }
    });

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
});