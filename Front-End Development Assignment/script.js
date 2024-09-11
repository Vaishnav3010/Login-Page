document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const togglePassword = document.getElementById('togglePassword');
    const eyeIcon = document.getElementById('eyeIcon');
    const eyeSlashIcon = document.getElementById('eyeSlashIcon');
    const errorMessage = document.createElement('p');
    errorMessage.style.color = 'red';
    form.appendChild(errorMessage);

    const modal = document.getElementById('loginSuccessModal');
    const closeModalBtn = document.querySelector('.close-btn');

    form.addEventListener('submit', async function(event) {
        event.preventDefault();
        errorMessage.textContent = ''; 

        if (!emailInput.value) {
            errorMessage.textContent = 'Email is required.';
            emailInput.focus();
            return;
        } else if (!validateEmail(emailInput.value)) {
            errorMessage.textContent = 'Please enter a valid email address.';
            emailInput.focus();
            return;
        }

        if (!passwordInput.value) {
            errorMessage.textContent = 'Password is required.';
            passwordInput.focus();
            return;
        } else if (passwordInput.value.length < 6) {
            errorMessage.textContent = 'Password must be at least 6 characters long.';
            passwordInput.focus();
            return;
        }

        const data = {
            username: emailInput.value,
            password: passwordInput.value
        };

        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                const result = await response.json();
                openModal();
                console.log('API Response:', result);
            } else {
                errorMessage.textContent = 'Login failed. Please try again.';
            }
        } catch (error) {
            errorMessage.textContent = 'An error occurred. Please try again.';
            console.error('API Error:', error);
        }
    });

    function validateEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    togglePassword.addEventListener('click', function () {
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            eyeIcon.style.display = 'none';
            eyeSlashIcon.style.display = 'inline';
        } else {
            passwordInput.type = 'password';
            eyeIcon.style.display = 'inline';
            eyeSlashIcon.style.display = 'none';
        }
    });

    function openModal() {
        modal.style.display = 'block';
    }

    closeModalBtn.addEventListener('click', function() {
        modal.style.display = 'none';
    });

    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
});
