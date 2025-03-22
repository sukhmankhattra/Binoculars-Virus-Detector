const virusSignatures = {
    "malicious_code_snippet_1": "Delete the infected file or restore from backup.",
    "virus_pattern_abc": "Run an antivirus scan and isolate the file.",
    "trojan_script_xyz": "Disconnect from the internet and reinstall the application."
};

const virusForm = document.getElementById("virusForm");
const fileInput = document.getElementById("fileInput");
const resultDiv = document.getElementById("result");


const progressContainer = document.createElement("div");
progressContainer.id = "progressContainer";
const progressBar = document.createElement("div");
progressBar.id = "progressBar";
progressContainer.appendChild(progressBar);
virusForm.appendChild(progressContainer);

const fileInfo = document.createElement("div");
fileInfo.className = "file-info";
virusForm.appendChild(fileInfo);

const dropZone = document.createElement("div");
dropZone.className = "drop-zone";
dropZone.textContent = "Or drag & drop a file here to scan";
virusForm.appendChild(dropZone);
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


function displayFileInfo(file) {
    fileInfo.innerHTML = `
        <strong>File Name:</strong> ${file.name}<br>
        <strong>File Size:</strong> ${(file.size / 1024).toFixed(2)} KB<br>
        <strong>File Type:</strong> ${file.type || "Unknown"}
    `;
}


function simulateProgress(callback) {
    let progress = 0;
    progressBar.style.width = "0%";

    const interval = setInterval(() => {
        progress += 10;
        progressBar.style.width = ${progress}%;

        if (progress >= 100) {
            clearInterval(interval);
            setTimeout(callback, 300);
        }
    }, 100);
}


virusForm.addEventListener("submit", function(event) {
    event.preventDefault();

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