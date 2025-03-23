// DOM Elements
const fileInput = document.getElementById('fileInput');
const dropZone = document.getElementById('dropZone');
const fileNameDisplay = document.getElementById('fileName');
const scanButton = document.getElementById('scanButton');
const progressContainer = document.getElementById('progressContainer');
const progressBar = document.getElementById('progressBar');
const resultDiv = document.getElementById('result');
const scanStatus = document.getElementById('scanStatus');

let selectedFile = null;


fileInput.addEventListener('change', (e) => {
    selectedFile = e.target.files[0];
    displayFileName(selectedFile.name);
});


dropZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropZone.style.backgroundColor = 'rgba(44, 62, 80, 0.8)';
});

dropZone.addEventListener('dragleave', () => {
    dropZone.style.backgroundColor = 'rgba(44, 62, 80, 0.4)';
});

dropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    dropZone.style.backgroundColor = 'rgba(44, 62, 80, 0.4)';
    selectedFile = e.dataTransfer.files[0];
    displayFileName(selectedFile.name);
    fileInput.files = e.dataTransfer.files; 
});


scanButton.addEventListener('click', () => {
    if (!selectedFile) {
        alert('Please select a file to scan.');
        return;
    }

    progressBar.style.width = '0%';
    progressContainer.classList.remove('hidden');
    resultDiv.classList.add('hidden');
    simulateScan();
});

function displayFileName(name) {
    fileNameDisplay.textContent = `Selected File: ${name}`;
    fileNameDisplay.classList.remove('hidden');
}

function simulateScan() {
    let progress = 0;
    const interval = setInterval(() => {
        progress += 10;
        progressBar.style.width = `${progress}%`;

        if (progress >= 100) {
            clearInterval(interval);
            showResult();
        }
    }, 300);
}

function showResult() {
    progressContainer.classList.add('hidden');
    resultDiv.classList.remove('hidden');

    const isInfected = Math.random() < 0.5; 
    if (isInfected) {
        scanStatus.textContent = '⚠️ File is infected! Please delete it immediately.';
        scanStatus.style.color = '#e74c3c';
    } else {
        scanStatus.textContent = '✅ File is safe! No threats detected.';
        scanStatus.style.color = '#2ecc71';
    }
}