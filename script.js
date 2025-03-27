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

    const scanners = [
        { name: 'Scanner A', probability: 0.4 },
        { name: 'Scanner B', probability: 0.3 },
        { name: 'Scanner C', probability: 0.2 },
        { name: 'Scanner D', probability: 0.5 },
    ];

    const results = scanners.map(scanner => {
        const isInfected = Math.random() < scanner.probability;
        return `${scanner.name}: ${isInfected ? '⚠️ Infected' : '✅ Safe'}`;
    });

    scanStatus.innerHTML = results.join('<br>');
    scanStatus.style.color = '#3498db';

    if (results.some(result => result.includes('Infected'))) {
        scanStatus.innerHTML += '<br><strong style="color:#e74c3c;">Some threats detected. Please take appropriate action.</strong>';
    } else {
        scanStatus.innerHTML += '<br><strong style="color:#2ecc71;">All scans completed. No threats detected.</strong>';
    }
}
