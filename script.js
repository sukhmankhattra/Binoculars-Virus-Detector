document.addEventListener('DOMContentLoaded', function() {
    // Create the main container
    const settingsContainer = document.createElement('div');
    settingsContainer.className = 'settings-container';
    document.body.appendChild(settingsContainer);

    // Create sidebar
    const sidebar = document.createElement('div');
    sidebar.className = 'sidebar';
    settingsContainer.appendChild(sidebar);

    // Add sidebar items
    const sidebarItems = ['System', 'Devices', 'Network & Internet', 'Update & Security'];
    sidebarItems.forEach(item => {
        const sidebarItem = document.createElement('div');
        sidebarItem.className = 'sidebar-item';
        if (item === 'Update & Security') sidebarItem.classList.add('active');
        sidebarItem.textContent = item;
        sidebarItem.addEventListener('click', function() {
            document.querySelectorAll('.sidebar-item').forEach(el => el.classList.remove('active'));
            this.classList.add('active');
            updateMainContent(item);
        });
        sidebar.appendChild(sidebarItem);
    });

    // Create main content area
    const mainContent = document.createElement('div');
    mainContent.className = 'main-content';
    settingsContainer.appendChild(mainContent);

    // Initial content
    updateMainContent('Update & Security');

    // Function to update main content based on selection
    function updateMainContent(section) {
        mainContent.innerHTML = '';

        if (section === 'Update & Security') {
            // Create security header
            const header = document.createElement('h1');
            header.textContent = 'Windows Security';
            mainContent.appendChild(header);

            // Create virus protection section
            const virusSection = document.createElement('div');
            virusSection.className = 'setting-group';
            
            const virusTitle = document.createElement('div');
            virusTitle.className = 'setting-group-title';
            virusTitle.textContent = 'Virus & threat protection';
            virusSection.appendChild(virusTitle);

            // Add protection status
            const statusItem = document.createElement('div');
            statusItem.className = 'setting-item';
            statusItem.innerHTML = `
                <div>
                    <div>Current threats</div>
                    <div class="setting-description">No current threats</div>
                </div>
                <div class="status-indicator safe">No action needed</div>
            `;
            virusSection.appendChild(statusItem);

            // Add scan options
            const scanItem = document.createElement('div');
            scanItem.className = 'setting-item';
            scanItem.innerHTML = `
                <div>
                    <div>Scan options</div>
                    <div class="setting-description">Choose a scan option</div>
                </div>
                <select class="dropdown" id="scanType">
                    <option>Quick scan</option>
                    <option>Full scan</option>
                    <option>Custom scan</option>
                </select>
            `;
            virusSection.appendChild(scanItem);

            // Add scan button
            const scanButton = document.createElement('button');
            scanButton.className = 'scan-button';
            scanButton.textContent = 'Scan now';
            scanButton.addEventListener('click', runVirusScan);
            virusSection.appendChild(scanButton);

            // Add scan results area
            const resultsArea = document.createElement('div');
            resultsArea.id = 'scanResults';
            resultsArea.className = 'results-area';
            virusSection.appendChild(resultsArea);

            mainContent.appendChild(virusSection);
        } else {
            mainContent.innerHTML = `<h1>${section}</h1><p>Content for ${section} would appear here.</p>`;
        }
    }

    // Virus scan function
    function runVirusScan() {
        const scanType = document.getElementById('scanType').value;
        const resultsArea = document.getElementById('scanResults');
        resultsArea.innerHTML = '<div class="scanning">Scanning your computer...</div>';

        // Simulate scan with timeout
        setTimeout(() => {
            const threatsFound = Math.random() > 0.8 ? Math.floor(Math.random() * 3) + 1 : 0;
            
            if (threatsFound > 0) {
                resultsArea.innerHTML = `
                    <div class="scan-result threat-found">
                        <strong>Scan completed:</strong> ${threatsFound} potential threat(s) found
                        <button class="action-button">Start actions</button>
                    </div>
                `;
            } else {
                resultsArea.innerHTML = `
                    <div class="scan-result safe">
                        <strong>Scan completed:</strong> No threats found
                    </div>
                `;
            }
        }, 3000);
    }

    // Add basic styles
    const style = document.createElement('style');
    style.textContent = `
        body {
            font-family: 'Segoe UI', Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f3f3f3;
            color: #333;
        }
        
        .settings-container {
            display: flex;
            height: 100vh;
        }
        
        .sidebar {
            width: 220px;
            background-color: white;
            padding: 20px 0;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
        }
        
        .sidebar-item {
            padding: 8px 20px;
            cursor: pointer;
        }
        
        .sidebar-item:hover {
            background-color: #f0f0f0;
        }
        
        .sidebar-item.active {
            background-color: #e5f1fb;
            color: #0078d7;
            font-weight: 500;
        }
        
        .main-content {
            flex: 1;
            padding: 30px;
            background-color: white;
            margin: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0,0,0,0.05);
        }
        
        h1 {
            font-size: 24px;
            font-weight: 600;
            margin-bottom: 30px;
        }
        
        .setting-group {
            margin-bottom: 30px;
        }
        
        .setting-group-title {
            font-size: 16px;
            font-weight: 600;
            margin-bottom: 15px;
        }
        
        .setting-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 12px 0;
            border-bottom: 1px solid #eee;
        }
        
        .setting-description {
            color: #666;
            font-size: 14px;
            margin-top: 5px;
        }
        
        .dropdown {
            padding: 8px 12px;
            border-radius: 4px;
            border: 1px solid #ddd;
            background-color: white;
        }
        
        .scan-button {
            background-color: #0078d7;
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 4px;
            cursor: pointer;
            margin-top: 15px;
        }
        
        .scan-button:hover {
            background-color: #106ebe;
        }
        
        .results-area {
            margin-top: 20px;
            padding: 15px;
            border-radius: 4px;
            background-color: #f9f9f9;
        }
        
        .scanning {
            color: #0078d7;
        }
        
        .scan-result {
            padding: 10px;
        }
        
        .threat-found {
            background-color: #fde7e9;
            color: #d13438;
        }
        
        .safe {
            background-color: #e6f4ea;
            color: #107c10;
        }
        
        .action-button {
            background-color: #d13438;
            color: white;
            border: none;
            padding: 5px 10px;
            border-radius: 4px;
            cursor: pointer;
            margin-left: 10px;
        }
        
        .status-indicator {
            padding: 5px 10px;
            border-radius: 4px;
            font-size: 14px;
        }
        
        .status-indicator.safe {
            background-color: #e6f4ea;
            color: #107c10;
        }
    `;
    document.head.appendChild(style);
});