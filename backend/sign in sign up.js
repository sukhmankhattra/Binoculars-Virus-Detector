// Helper function to hash passwords (for simplicity, using a basic hash function)
function hashPassword(password) {
    return password.split('').reverse().join(''); // Simple hash function (not secure for real applications)
}

// Sign Up
function signup() {
    const username = document.getElementById('signup-username').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;

    if (!username || !email || !password) {
        alert('Please fill in all fields.');
        return;
    }

    const hashedPassword = hashPassword(password);
    const user = {
        username: username,
        email: email,
        password: hashedPassword
    };

    localStorage.setItem(email, JSON.stringify(user));
    alert('User created successfully.');
}

// Login
function login() {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    const user = JSON.parse(localStorage.getItem(email));

    if (!user) {
        alert('User not found.');
        return;
    }

    const hashedPassword = hashPassword(password);

    if (user.password === hashedPassword) {
        alert('Login successful.');
    } else {
        alert('Invalid credentials.');
    }
}

// Forgot Password
function forgotPassword() {
    const email = document.getElementById('forgot-password-email').value;

    const user = JSON.parse(localStorage.getItem(email));

    if (!user) {
        alert('User not found.');
        return;
    }

    alert('Password reset link sent to your email.');
    document.getElementById('forgot-password-form').style.display = 'none';
    document.getElementById('reset-password-form').style.display = 'block';
}

// Reset Password
function resetPassword() {
    const email = document.getElementById('forgot-password-email').value;
    const newPassword = document.getElementById('reset-password').value;

    if (!newPassword) {
        alert('Please enter a new password.');
        return;
    }

    const user = JSON.parse(localStorage.getItem(email));

    if (!user) {
        alert('User not found.');
        return;
    }

    const hashedPassword = hashPassword(newPassword);
    user.password = hashedPassword;
    localStorage.setItem(email, JSON.stringify(user));

    alert('Password reset successfully.');
    document.getElementById('reset-password-form').style.display = 'none';
    document.getElementById('forgot-password-form').style.display = 'block';
}