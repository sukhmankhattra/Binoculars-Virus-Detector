// Simulated virus signatures and resolutions
const virusSignatures = {
    "malicious_code_snippet_1": "Delete the infected file or restore from backup.",
    "virus_pattern_abc": "Run an antivirus scan and isolate the file.",
    "trojan_script_xyz": "Disconnect from the internet and reinstall the application."
};

document.getElementById("virusForm").addEventListener("submit", function(event) {
    event.preventDefault();

    // Simulate scanning a file
    const fileInput = document.getElementById("fileInput").files[0];
    const resultDiv = document.getElementById("result");

    if (!fileInput) {
        resultDiv.textContent = "Please upload a file.";
        return;
    }

    // Simulated "scanning" result
    const fileName = fileInput.name.toLowerCase();
    let found = false;

    for (let signature in virusSignatures) {
        if (fileName.includes(signature)) {
            found = true;
            resultDiv.innerHTML = `
                <strong>Virus Detected:</strong> ${signature}<br>
                <strong>Resolution:</strong> ${virusSignatures[signature]}
            `;
            break;
        }
    }

    if (!found) {
        resultDiv.textContent = "No viruses detected!";
    }
});