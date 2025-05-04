/**
 * Fortune Teller CLI
 * 
 * A command-line interface version of the Fortune Teller app.
 * This demonstrates how the same fortune generation logic can be used in a terminal environment.
 * 
 * Usage (Node.js):
 * node fortune-cli.js [category]
 * 
 * Categories: life, career, tech, code
 * If no category is specified, a random one will be chosen.
 */

// Import the fs module for file operations (Node.js only)
// const fs = require('fs');
// const path = require('path');

// ASCII Art for the crystal ball
const crystalBallArt = `
    .:::.
  .::::::::.
 :::::::::::
 :::::::::::
 '::::::::'
   ':::::'
     ':'
`;

// ANSI color codes for terminal output
const colors = {
    reset: "\x1b[0m",
    bright: "\x1b[1m",
    dim: "\x1b[2m",
    underscore: "\x1b[4m",
    blink: "\x1b[5m",
    reverse: "\x1b[7m",
    hidden: "\x1b[8m",
    
    black: "\x1b[30m",
    red: "\x1b[31m",
    green: "\x1b[32m",
    yellow: "\x1b[33m",
    blue: "\x1b[34m",
    magenta: "\x1b[35m",
    cyan: "\x1b[36m",
    white: "\x1b[37m",
    
    bgBlack: "\x1b[40m",
    bgRed: "\x1b[41m",
    bgGreen: "\x1b[42m",
    bgYellow: "\x1b[43m",
    bgBlue: "\x1b[44m",
    bgMagenta: "\x1b[45m",
    bgCyan: "\x1b[46m",
    bgWhite: "\x1b[47m"
};

/**
 * Sample fortunes for CLI mode
 * In a real implementation, these would be loaded from the fortunes.json file
 */
const sampleFortunes = {
    life: [
        "The path less traveled will lead to unexpected treasures.",
        "A moment of patience in a moment of anger saves a thousand moments of regret.",
        "Your greatest strength is not in never falling, but in rising every time you fall."
    ],
    career: [
        "Your next big opportunity will come disguised as a small one.",
        "The project you're hesitant to start will become your greatest achievement.",
        "A mentor will appear when you're ready to level up your skills."
    ],
    tech: [
        "The best code is no code at all.",
        "There are two hard things in computer science: cache invalidation, naming things, and off-by-one errors.",
        "It's not a bug – it's an undocumented feature."
    ],
    code: [
        "function findYourPath(options) {\n  return options.filter(path => path.bringsJoy)\n    .sort((a, b) => b.opportunity - a.opportunity)[0];\n}\n// Your destiny awaits in unexpected functions",
        "try {\n  life.execute(plans);\n} catch (uncertainty) {\n  adapt(uncertainty);\n  grow();\n}\n// Errors are just redirections to better outcomes",
        "// The algorithm of success:\nwhile (!success) {\n  tryAgain();\n  if (needHelp()) askForHelp();\n  learnFromMistakes();\n}\n// Persistence always terminates the loop"
    ]
};

/**
 * Get a random fortune from the specified category
 * @param {string} category - The fortune category
 * @returns {string} A random fortune
 */
function getRandomFortune(category) {
    // In a real implementation, this would load fortunes from the JSON file
    const fortunes = sampleFortunes[category] || [];
    if (fortunes.length === 0) {
        return "No fortunes found for this category.";
    }
    
    const randomIndex = Math.floor(Math.random() * fortunes.length);
    return fortunes[randomIndex];
}

/**
 * Display a fortune with fancy terminal formatting
 * @param {string} category - The fortune category
 */
function displayFortune(category) {
    // If no category is specified, choose a random one
    if (!category || !sampleFortunes[category]) {
        const categories = Object.keys(sampleFortunes);
        category = categories[Math.floor(Math.random() * categories.length)];
    }
    
    // Get a random fortune
    const fortune = getRandomFortune(category);
    
    // Clear the console
    console.clear();
    
    // Display the header
    console.log(`${colors.cyan}${colors.bright}=== AI FORTUNE TELLER v1.0 ===${colors.reset}`);
    console.log(`${colors.magenta}${crystalBallArt}${colors.reset}`);
    
    // Display the category
    console.log(`${colors.yellow}Category: ${category.toUpperCase()}${colors.reset}`);
    console.log(`${colors.dim}------------------------------${colors.reset}`);
    
    // Display the fortune with appropriate formatting
    if (category === 'code') {
        console.log(`${colors.green}${fortune}${colors.reset}`);
    } else {
        console.log(`${colors.cyan}"${fortune}"${colors.reset}`);
    }
    
    console.log(`${colors.dim}------------------------------${colors.reset}`);
    console.log(`${colors.bright}Press Ctrl+C to exit or run again for another fortune.${colors.reset}`);
}

/**
 * Main function to run the CLI
 */
function main() {
    // Get the category from command line arguments
    // In a browser environment, this would be adapted
    const args = process.argv.slice(2);
    const category = args[0];
    
    displayFortune(category);
}

// Check if this script is being run directly
if (typeof require !== 'undefined' && require.main === module) {
    main();
}

// Export functions for potential use in other scripts
if (typeof module !== 'undefined') {
    module.exports = {
        getRandomFortune,
        displayFortune
    };
}