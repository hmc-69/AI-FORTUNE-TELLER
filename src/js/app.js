/**
 * AI Fortune Teller - Main Application
 * Created with the help of Amazon Q Developer
 */
document.addEventListener('DOMContentLoaded', () => {
    // Initialize the Fortune Manager
    const fortuneManager = new FortuneManager();
    
    // DOM Elements
    const crystalBall = document.getElementById('crystal-ball');
    const fortuneButton = document.getElementById('fortune-button');
    const fortuneDisplay = document.getElementById('fortune-display');
    const shareButton = document.getElementById('share-button');
    const copyButton = document.getElementById('copy-button');
    const fortuneTypeRadios = document.querySelectorAll('input[name="fortune-type"]');
    
    // Current fortune type
    let currentFortuneType = 'life';
    
    /**
     * Get the selected fortune type from radio buttons
     * @returns {string} The selected fortune type
     */
    function getSelectedFortuneType() {
        const selected = document.querySelector('input[name="fortune-type"]:checked');
        return selected ? selected.value : 'life';
    }
    
    /**
     * Display a new fortune based on the selected type
     */
    function revealFortune() {
        // Add animation class
        crystalBall.classList.add('revealing');
        
        // Get the selected fortune type
        currentFortuneType = getSelectedFortuneType();
        
        // Get a random fortune of the selected type
        const fortune = fortuneManager.getFortune(currentFortuneType);
        
        // Display the fortune with a typing effect
        if (currentFortuneType === 'code') {
            // For code fortunes, use a pre element with code formatting
            fortuneDisplay.innerHTML = '';
            const codeElement = document.createElement('pre');
            codeElement.className = 'code-fortune';
            fortuneDisplay.appendChild(codeElement);
            
            // Simple typing effect for code
            let i = 0;
            const typeCode = () => {
                if (i < fortune.length) {
                    codeElement.textContent += fortune.charAt(i);
                    i++;
                    setTimeout(typeCode, 10);
                } else {
                    // Remove animation class when done
                    setTimeout(() => {
                        crystalBall.classList.remove('revealing');
                    }, 500);
                }
            };
            typeCode();
        } else {
            // For text fortunes, use a simple typing effect
            fortuneDisplay.textContent = '';
            let i = 0;
            const typeText = () => {
                if (i < fortune.length) {
                    fortuneDisplay.textContent += fortune.charAt(i);
                    i++;
                    setTimeout(typeText, 30);
                } else {
                    // Remove animation class when done
                    setTimeout(() => {
                        crystalBall.classList.remove('revealing');
                    }, 500);
                }
            };
            typeText();
        }
        
        // Add glowing effect to the crystal ball
        crystalBall.style.boxShadow = '0 0 40px rgba(0, 255, 255, 0.8)';
        setTimeout(() => {
            crystalBall.style.boxShadow = '0 0 20px rgba(0, 255, 255, 0.8)';
        }, 2000);
    }
    
    /**
     * Share the current fortune
     */
    function shareFortune() {
        const latestFortune = fortuneManager.getLatestFortune();
        
        if (!latestFortune) {
            alert('No fortune to share yet. Reveal a fortune first!');
            return;
        }
        
        // Check if Web Share API is available
        if (navigator.share) {
            navigator.share({
                title: 'My AI Fortune',
                text: latestFortune.type === 'code' 
                    ? 'My code prophecy from AI Fortune Teller: ' + latestFortune.text
                    : 'My fortune from AI Fortune Teller: ' + latestFortune.text,
                url: window.location.href
            })
            .catch(error => {
                console.error('Error sharing:', error);
                fallbackShare(latestFortune);
            });
        } else {
            fallbackShare(latestFortune);
        }
    }
    
    /**
     * Fallback sharing method when Web Share API is not available
     * @param {Object} fortune - The fortune to share
     */
    function fallbackShare(fortune) {
        // Create a temporary input for copying text
        const textToCopy = fortune.type === 'code'
            ? 'My code prophecy from AI Fortune Teller:\n\n' + fortune.text
            : 'My fortune from AI Fortune Teller: ' + fortune.text;
            
        copyToClipboard(textToCopy);
        alert('Fortune copied to clipboard! You can now paste it wherever you want to share.');
    }
    
    /**
     * Copy the current fortune to clipboard
     */
    function copyFortune() {
        const latestFortune = fortuneManager.getLatestFortune();
        
        if (!latestFortune) {
            alert('No fortune to copy yet. Reveal a fortune first!');
            return;
        }
        
        const textToCopy = latestFortune.type === 'code'
            ? latestFortune.text
            : latestFortune.text;
            
        copyToClipboard(textToCopy);
        
        // Visual feedback
        copyButton.textContent = 'COPIED!';
        setTimeout(() => {
            copyButton.textContent = 'COPY FORTUNE';
        }, 2000);
    }
    
    /**
     * Helper function to copy text to clipboard
     * @param {string} text - The text to copy
     */
    function copyToClipboard(text) {
        // Create a temporary textarea element
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.setAttribute('readonly', '');
        textarea.style.position = 'absolute';
        textarea.style.left = '-9999px';
        document.body.appendChild(textarea);
        
        // Select and copy the text
        textarea.select();
        document.execCommand('copy');
        
        // Clean up
        document.body.removeChild(textarea);
    }
    
    // Event Listeners
    fortuneButton.addEventListener('click', revealFortune);
    crystalBall.addEventListener('click', revealFortune);
    shareButton.addEventListener('click', shareFortune);
    copyButton.addEventListener('click', copyFortune);
    
    // Listen for fortune type changes
    fortuneTypeRadios.forEach(radio => {
        radio.addEventListener('change', () => {
            currentFortuneType = getSelectedFortuneType();
        });
    });
    
    // Add keyboard shortcut (spacebar) to reveal fortune
    document.addEventListener('keydown', (event) => {
        if (event.code === 'Space' && document.activeElement.tagName !== 'INPUT') {
            event.preventDefault();
            revealFortune();
        }
    });
    
    // Add some retro terminal effects
    const addRetroTerminalEffects = () => {
        // Add scanline effect
        const scanline = document.createElement('div');
        scanline.className = 'scanline';
        document.body.appendChild(scanline);
        
        // Add random glitch effect to the title
        const title = document.querySelector('h1');
        if (title) {
            setInterval(() => {
                if (Math.random() > 0.99) {
                    title.style.textShadow = '2px 0 0 rgba(255,0,255,0.7), -2px 0 0 rgba(0,255,255,0.7)';
                    setTimeout(() => {
                        title.style.textShadow = '0 0 10px var(--primary-color), 0 0 20px var(--primary-color)';
                    }, 100);
                }
            }, 500);
        }
    };
    
    // Initialize the app
    addRetroTerminalEffects();
    
    // Add CSS for additional retro effects
    const addRetroCSS = () => {
        const style = document.createElement('style');
        style.textContent = `
            .scanline {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 2px;
                background: rgba(0, 255, 255, 0.1);
                opacity: 0.75;
                animation: scanline 6s linear infinite;
                pointer-events: none;
                z-index: 9999;
            }
            
            @keyframes scanline {
                0% {
                    top: 0%;
                }
                100% {
                    top: 100%;
                }
            }
            
            .revealing {
                animation: pulse 1s infinite alternate;
            }
            
            @keyframes pulse {
                0% {
                    box-shadow: 0 0 20px rgba(0, 255, 255, 0.8);
                }
                100% {
                    box-shadow: 0 0 40px rgba(0, 255, 255, 1);
                }
            }
        `;
        document.head.appendChild(style);
    };
    
    addRetroCSS();
    
    // Easter Egg: Konami Code
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let konamiIndex = 0;
    
    document.addEventListener('keydown', (event) => {
        if (event.key === konamiCode[konamiIndex]) {
            konamiIndex++;
            if (konamiIndex === konamiCode.length) {
                // Activate Easter Egg
                document.body.style.animation = 'rainbow-background 5s linear infinite';
                const style = document.createElement('style');
                style.textContent = `
                    @keyframes rainbow-background {
                        0% { background-color: #000033; }
                        20% { background-color: #330033; }
                        40% { background-color: #003333; }
                        60% { background-color: #333300; }
                        80% { background-color: #330033; }
                        100% { background-color: #000033; }
                    }
                `;
                document.head.appendChild(style);
                alert('🌈 Rainbow Mode Activated! 🌈');
                konamiIndex = 0;
            }
        } else {
            konamiIndex = 0;
        }
    });
});