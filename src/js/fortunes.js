/**
 * Fortune Manager - Handles loading, retrieving, and storing fortunes
 * Created with the help of Amazon Q Developer
 */
class FortuneManager {
    constructor() {
        this.fortunes = {};
        this.history = [];
        this.loadFortunes();
        this.loadHistory();
    }

    /**
     * Load fortunes from the JSON file
     */
    async loadFortunes() {
        try {
            const response = await fetch('src/data/fortunes.json');
            if (!response.ok) {
                throw new Error('Failed to load fortunes');
            }
            this.fortunes = await response.json();
            console.log('Fortunes loaded successfully');
        } catch (error) {
            console.error('Error loading fortunes:', error);
            // Fallback fortunes in case the JSON file fails to load
            this.fortunes = {
                life: ["The future is bright, but you must turn on the light."],
                career: ["Your career path is about to take an exciting turn."],
                tech: ["The best code is the one that ships."],
                code: ["console.log('Hello Future!');\n// Your destiny awaits"]
            };
        }
    }

    /**
     * Get a random fortune based on the selected type
     * @param {string} type - The type of fortune to retrieve (life, career, tech, code)
     * @returns {string} A random fortune of the specified type
     */
    getFortune(type) {
        if (!this.fortunes[type] || this.fortunes[type].length === 0) {
            return "The crystal ball is cloudy. Try again later.";
        }
        
        const randomIndex = Math.floor(Math.random() * this.fortunes[type].length);
        const fortune = this.fortunes[type][randomIndex];
        
        // Add to history
        this.addToHistory({
            type,
            text: fortune,
            timestamp: new Date().toISOString()
        });
        
        return fortune;
    }

    /**
     * Add a fortune to the history
     * @param {Object} fortuneData - The fortune data to add to history
     */
    addToHistory(fortuneData) {
        this.history.unshift(fortuneData);
        
        // Keep history limited to last 10 items
        if (this.history.length > 10) {
            this.history.pop();
        }
        
        // Save to localStorage
        localStorage.setItem('fortuneHistory', JSON.stringify(this.history));
        
        // Update the UI
        this.updateHistoryUI();
    }

    /**
     * Load fortune history from localStorage
     */
    loadHistory() {
        const savedHistory = localStorage.getItem('fortuneHistory');
        if (savedHistory) {
            try {
                this.history = JSON.parse(savedHistory);
                this.updateHistoryUI();
            } catch (error) {
                console.error('Error parsing fortune history:', error);
                this.history = [];
            }
        }
    }

    /**
     * Update the history section in the UI
     */
    updateHistoryUI() {
        const historyContainer = document.getElementById('fortune-history');
        if (!historyContainer) return;
        
        // Clear current history display
        historyContainer.innerHTML = '';
        
        if (this.history.length === 0) {
            historyContainer.innerHTML = '<p class="empty-history">Your past fortunes will appear here...</p>';
            return;
        }
        
        // Add each history item
        this.history.forEach(item => {
            const historyItem = document.createElement('div');
            historyItem.className = 'history-item';
            
            const date = new Date(item.timestamp);
            const formattedDate = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
            
            if (item.type === 'code') {
                historyItem.innerHTML = `
                    <div class="history-meta">
                        <span class="history-type">${this.capitalizeFirstLetter(item.type)}</span>
                        <span class="history-date">${formattedDate}</span>
                    </div>
                    <pre class="code-fortune">${item.text}</pre>
                `;
            } else {
                historyItem.innerHTML = `
                    <div class="history-meta">
                        <span class="history-type">${this.capitalizeFirstLetter(item.type)}</span>
                        <span class="history-date">${formattedDate}</span>
                    </div>
                    <p>${item.text}</p>
                `;
            }
            
            historyContainer.appendChild(historyItem);
        });
    }

    /**
     * Helper function to capitalize the first letter of a string
     * @param {string} string - The string to capitalize
     * @returns {string} The capitalized string
     */
    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    /**
     * Get the most recent fortune
     * @returns {Object|null} The most recent fortune or null if history is empty
     */
    getLatestFortune() {
        return this.history.length > 0 ? this.history[0] : null;
    }

    /**
     * Clear the fortune history
     */
    clearHistory() {
        this.history = [];
        localStorage.removeItem('fortuneHistory');
        this.updateHistoryUI();
    }
}