// DOM Elements
const fileInput = document.getElementById('fileInput');
const dropZone = document.getElementById('dropZone');
const fileNameDisplay = document.getElementById('fileName');
const scanButton = document.getElementById('scanButton');
const progressContainer = document.getElementById('progressContainer');
const progressBar = document.getElementById('progressBar');
const resultDiv = document.getElementById('result');
const scanStatus = document.getElementById('scanStatus');
const fileSizeDisplay = document.getElementById('fileSize');
const fileTypeDisplay = document.getElementById('fileType');
const lastModifiedDisplay = document.getElementById('lastModified');

// State
let selectedFile = null;
let isScanning = false;
let scanTimeout = null;

// Event Listeners
fileInput.addEventListener('change', handleFileSelect);
dropZone.addEventListener('dragover', handleDragOver);
dropZone.addEventListener('dragleave', handleDragLeave);
dropZone.addEventListener('drop', handleDrop);
scanButton.addEventListener('click', startScan);

// File Selection Handlers
function handleFileSelect(e) {
    selectedFile = e.target.files[0];
    displayFileInfo(selectedFile);
}

function handleDragOver(e) {
    e.preventDefault();
    dropZone.style.backgroundColor = 'rgba(44, 62, 80, 0.8)';
    dropZone.style.borderColor = '#3498db';
}

function handleDragLeave() {
    dropZone.style.backgroundColor = 'rgba(44, 62, 80, 0.4)';
    dropZone.style.borderColor = '#34495e';
}

function handleDrop(e) {
    e.preventDefault();
    dropZone.style.backgroundColor = 'rgba(44, 62, 80, 0.4)';
    dropZone.style.borderColor = '#34495e';
    
    if (e.dataTransfer.files.length > 1) {
        alert('Please upload only one file at a time.');
        return;
    }
    
    selectedFile = e.dataTransfer.files[0];
    displayFileInfo(selectedFile);
    fileInput.files = e.dataTransfer.files;
}

// File Information Display
function displayFileInfo(file) {
    fileNameDisplay.textContent = file.name;
    fileSizeDisplay.textContent = formatFileSize(file.size);
    fileTypeDisplay.textContent = file.type || 'Unknown';
    lastModifiedDisplay.textContent = new Date(file.lastModified).toLocaleString();
    
    document.getElementById('fileInfo').classList.remove('hidden');
    scanButton.disabled = false;
}

function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2) + ' ' + sizes[i];
}

// Scanning Process
async function startScan() {
    if (!selectedFile) {
        showAlert('Please select a file to scan.', 'error');
        return;
    }
    
    if (isScanning) {
        showAlert('Scan already in progress.', 'warning');
        return;
    }

    // Reset UI
    progressBar.style.width = '0%';
    progressContainer.classList.remove('hidden');
    resultDiv.classList.add('hidden');
    scanButton.disabled = true;
    isScanning = true;
    
    try {
        // Show initial progress
        updateProgress(10, 'Preparing file...');
        await delay(500);
        
        // Hash the file
        updateProgress(20, 'Calculating file hash...');
        const fileHash = await hashFile(selectedFile);
        await delay(800);
        
        // Simulate scanning process
        updateProgress(40, 'Scanning for malware...');
        await delay(1200);
        
        updateProgress(70, 'Analyzing file content...');
        await delay(1500);
        
        updateProgress(90, 'Finalizing results...');
        await delay(800);
        
        updateProgress(100, 'Scan complete!');
        await delay(300);
        
        // Show results
        showResult(fileHash);
    } catch (error) {
        showAlert('Scan failed: ' + error.message, 'error');
        console.error('Scan error:', error);
    } finally {
        isScanning = false;
        scanButton.disabled = false;
        if (scanTimeout) clearTimeout(scanTimeout);
    }
}

function updateProgress(percent, message) {
    progressBar.style.width = `${percent}%`;
    progressBar.setAttribute('aria-valuenow', percent);
    document.getElementById('progressMessage').textContent = message;
}

async function hashFile(file) {
    try {
        const buffer = await file.arrayBuffer();
        const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    } catch (error) {
        console.error('Hashing error:', error);
        throw new Error('Failed to calculate file hash');
    }
}

function showResult(fileHash) {
    progressContainer.classList.add('hidden');
    resultDiv.classList.remove('hidden');
    
    // Get deterministic results based on file hash
    const scanners = getScanResults(fileHash);
    
    // Format results
    const resultsHTML = scanners.map(scanner => {
        return `<div class="scan-result ${scanner.isInfected ? 'infected' : 'clean'}">
            <span class="scanner-name">${scanner.name}</span>
            <span class="scanner-status">${scanner.isInfected ? '⚠️ Infected' : '✅ Clean'}</span>
            <span class="scanner-details">Detection: ${scanner.detectionName || 'None'}</span>
        </div>`;
    }).join('');
    
    scanStatus.innerHTML = resultsHTML;
    
    // Add summary
    const infectedCount = scanners.filter(s => s.isInfected).length;
    const summary = document.createElement('div');
    summary.className = 'scan-summary';
    
    if (infectedCount > 0) {
        summary.innerHTML = `<strong style="color:#e74c3c;">
            ${infectedCount}/${scanners.length} scanners detected threats. File may be unsafe.
        </strong>`;
    } else {
        summary.innerHTML = `<strong style="color:#2ecc71;">
            All scanners reported clean. File appears safe.
        </strong>`;
    }
    
    scanStatus.appendChild(summary);
}

function getScanResults(fileHash) {
    // List of available scanners with base probabilities
    const scanners = [
        { name: 'Antivirus Pro', probability: 0.3 },
        { name: 'Malware Defender', probability: 0.4 },
        { name: 'Threat Scanner', probability: 0.25 },
        { name: 'Secure Shield', probability: 0.35 },
        { name: 'Virus Eliminator', probability: 0.2 }
    ];
    
    // Possible detection names
    const detectionNames = [
        'Trojan.Generic',
        'Heur.AdvML.B',
        'Riskware.PUP',
        'Exploit.CVE-2023-1234',
        'Script.Phishing'
    ];
    
    return scanners.map(scanner => {
        // Create deterministic result based on file hash and scanner name
        const seed = fileHash + scanner.name;
        const rand = deterministicRandom(seed);
        const isInfected = rand < scanner.probability;
        
        return {
            ...scanner,
            isInfected,
            detectionName: isInfected ? 
                detectionNames[Math.floor(deterministicRandom(seed + 'detect') * detectionNames.length] : 
                null
        };
    });
}

// Utility Functions
function deterministicRandom(seed) {
    let hash = 0;
    for (let i = 0; i < seed.length; i++) {
        hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
    }
    return (hash % 1000) / 1000;
}

function delay(ms) {
    return new Promise(resolve => scanTimeout = setTimeout(resolve, ms));
}

function showAlert(message, type) {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type}`;
    alertDiv.textContent = message;
    
    document.body.appendChild(alertDiv);
    
    setTimeout(() => {
        alertDiv.classList.add('fade-out');
        setTimeout(() => alertDiv.remove(), 500);
    }, 3000);
}