const virusSignatures = {
    "malicious_code_snippet_1": "Delete the infected file or restore from backup.",
    "virus_pattern_abc": "Run an antivirus scan and isolate the file.",
    "trojan_script_xyz": "Disconnect from the internet and reinstall the application."
};

const virusForm = document.getElementById("virusForm");
const fileInput = document.getElementById("fileInput");
const resultDiv = document.getElementById("result");
const passwordInput = document.getElementById("passwordInput");
const passwordError = document.getElementById("passwordError");
const forgotPasswordLink = document.getElementById("forgotPasswordLink"); // Added forgot password link
const forgotPasswordDiv = document.getElementById("forgotPasswordDiv"); // Added forgot password div
const resetEmailInput = document.getElementById("resetEmailInput"); // Added reset email input
const resetPasswordButton = document.getElementById("resetPasswordButton"); // Added reset password button
const resetMessage = document.getElementById("resetMessage"); // Added reset message

// Progress bar elements
const progressContainer = document.createElement("div");
progressContainer.id = "progressContainer";
const progressBar = document.createElement("div");
progressBar.id = "progressBar";
progressContainer.appendChild(progressBar);
virusForm.appendChild(progressContainer);

// File info display
const fileInfo = document.createElement("div");
fileInfo.className = "file-info";
virusForm.appendChild(fileInfo);

// Drag & drop zone
const dropZone = document.createElement("div");
dropZone.className = "drop-zone";
dropZone.textContent = "Or drag & drop a file here to scan";
virusForm.appendChild(dropZone);

// Drag & drop functionality
dropZone.addEventListener("dragover", (e) => {
    e.preventDefault();
    dropZone.style.backgroundColor = "rgba(44, 62, 80, 0.6)";
});

dropZone.addEventListener("dragleave", () => {
    dropZone.style.backgroundColor = "rgba(44, 62, 80, 0.4)";
});

dropZone.addEventListener("drop", (e) => {
    e.preventDefault();
    dropZone.style.backgroundColor = "rgba(44, 62, 80, 0.4)";
    const file = e.dataTransfer.files[0];
    if (file) {
        fileInput.files = e.dataTransfer.files;
        displayFileInfo(file);
    }
});

// File info display function
function displayFileInfo(file) {
    fileInfo.innerHTML = `
        <strong>File Name:</strong> ${file.name}<br>
        <strong>File Size:</strong> ${(file.size / 1024).toFixed(2)} KB<br>
        <strong>File Type:</strong> ${file.type || "Unknown"}
    `;
}

// Progress simulation
function simulateProgress(callback) {
    let progress = 0;
    progressBar.style.width = "0%";

    const interval = setInterval(() => {
        progress += 10;
        progressBar.style.width = `${progress}%`;

        if (progress >= 100) {
            clearInterval(interval);
            setTimeout(callback, 300);
        }
    }, 100);
}

// Password Validation
function validatePassword(password) {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
}

// Forgot Password Logic
forgotPasswordLink.addEventListener("click", (e) => {
    e.preventDefault();
    virusForm.classList.add("hidden");
    forgotPasswordDiv.classList.remove("hidden");
});

resetPasswordButton.addEventListener("click", () => {
    const email = resetEmailInput.value;

    // Simulate sending reset email (replace with your actual backend logic)
    setTimeout(() => {
        resetMessage.textContent = `Reset link sent to ${email} (simulated). Check your email.`;
        resetMessage.classList.remove("hidden");
    }, 1000);
});

// Main scan logic with form submit
virusForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const password = passwordInput.value;
    if (!validatePassword(password)) {
        passwordError.textContent = "Password must be at least 8 characters long and include uppercase, lowercase, numbers, and special characters.";
        passwordError.classList.remove("hidden");
        return;
    } else {
        passwordError.textContent = "";
        passwordError.classList.add("hidden");
    }

    const file = fileInput.files[0];
    if (!file) {
        resultDiv.textContent = "Please upload a file.";
        resultDiv.classList.remove("hidden");
        return;
    }

    displayFileInfo(file);
    resultDiv.textContent = "Scanning...";
    resultDiv.classList.remove("hidden");

    simulateProgress(() => {
        const fileName = file.name.toLowerCase();
        let found = false;

        for (let signature in virusSignatures) {
            if (fileName.includes(signature)) {
                found = true;
                resultDiv.innerHTML = `
                    <strong>🚨 Virus Detected:</strong> ${signature}<br>
                    <strong>🛡 Resolution:</strong> ${virusSignatures[signature]}
                `;
                return;
            }
        }

        resultDiv.innerHTML = "<strong>✅ No viruses detected!</strong>";
    });
});