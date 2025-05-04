/**
 * Fortune Generator Script
 * 
 * This script can be used to generate new fortunes and add them to the fortunes.json file.
 * It was created with the help of Amazon Q Developer to demonstrate automation capabilities.
 * 
 * Usage:
 * - Run this script to generate new fortunes and add them to the fortunes.json file
 * - Modify the generateFortune function to customize the fortune generation logic
 */

// Sample fortune templates for each category
const fortuneTemplates = {
    life: [
        "The {adjective} path leads to {noun} beyond your imagination.",
        "Your {noun} will {verb} when you least expect it.",
        "A {adjective} opportunity awaits in the {timeframe}.",
        "The {noun} you seek is already within you.",
        "Remember that {adjective} moments often lead to {adjective} discoveries."
    ],
    career: [
        "Your next {careerNoun} will require {skill} skills you already possess.",
        "A {adjective} mentor will help you {verb} your career goals.",
        "The {project} you're working on will open doors to {opportunity}.",
        "Your unique approach to {problem} will be recognized by {authority}.",
        "The {timeframe} will bring a {adjective} shift in your professional life."
    ],
    tech: [
        "The best {techThing} is the one that {techVerb} without getting in your way.",
        "Never {techVerb} what you can {techVerb} in half the time.",
        "Your {bug} isn't a mistake; it's a {feature} waiting to be documented.",
        "The {techTool} you've been avoiding will become your favorite next month.",
        "{techVerb} early, {techVerb} often, and don't forget to {techVerb} your work."
    ],
    code: [
        "function future() {\n  const possibilities = [{possibility1}, {possibility2}];\n  return possibilities.filter(p => p.{attribute});\n}\n// Your {timeframe} holds many returns",
        "try {\n  life.{lifeMethod}();\n} catch (error) {\n  learn(error);\n  grow();\n}\n// Exceptions are just opportunities",
        "// The algorithm of {concept}:\nwhile (!{achieved}) {\n  {verb}();\n  if ({condition}) break;\n}\n// Your loop will terminate successfully",
        "const promise = new Promise((resolve) => {\n  setTimeout(() => {\n    resolve('{resolution}');\n  }, {timeframe});\n});\n// Good things come to those who await",
        "class {concept} {\n  constructor() {\n    this.{attribute} = {initialValue};\n  }\n  \n  {method}() {\n    return this.{attribute} + '{message}';\n  }\n}\n// Instantiate your potential"
    ]
};

// Word banks for filling in templates
const wordBank = {
    adjective: ['unexpected', 'brilliant', 'challenging', 'rewarding', 'mysterious', 'enlightening', 'surprising'],
    noun: ['success', 'journey', 'discovery', 'opportunity', 'wisdom', 'insight', 'breakthrough'],
    verb: ['transform', 'flourish', 'evolve', 'manifest', 'accelerate', 'emerge', 'materialize'],
    timeframe: ['near future', 'coming weeks', 'next phase', 'right moment', 'perfect time'],
    careerNoun: ['challenge', 'project', 'role', 'opportunity', 'promotion', 'venture'],
    skill: ['creative', 'analytical', 'leadership', 'technical', 'communication', 'problem-solving'],
    project: ['side project', 'current task', 'innovative idea', 'collaboration', 'experiment'],
    opportunity: ['new possibilities', 'unexpected offers', 'growth opportunities', 'leadership roles'],
    problem: ['challenges', 'complex problems', 'technical issues', 'team dynamics', 'innovation'],
    authority: ['leadership', 'industry experts', 'potential clients', 'your team', 'key stakeholders'],
    techThing: ['code', 'algorithm', 'system', 'architecture', 'framework', 'tool', 'solution'],
    techVerb: ['debug', 'refactor', 'optimize', 'deploy', 'test', 'document', 'automate'],
    bug: ['error', 'bug', 'issue', 'glitch', 'unexpected behavior'],
    feature: ['feature', 'opportunity', 'learning experience', 'improvement'],
    techTool: ['framework', 'language', 'library', 'tool', 'platform', 'methodology'],
    possibility1: "'growth'", "'learning'", "'opportunity'", "'challenge'", "'adventure'"],
    possibility2: "'success'", "'achievement'", "'discovery'", "'innovation'", "'breakthrough'"],
    attribute: ['isAchievable', 'bringsJoy', 'alignsWithGoals', 'hasValue', 'createsFuture'],
    lifeMethod: ['pursue', 'execute', 'implement', 'achieve', 'experience', 'discover'],
    concept: ['success', 'growth', 'learning', 'progress', 'mastery', 'innovation'],
    achieved: ['success', 'mastery', 'completion', 'perfection', 'goal'],
    condition: ['isComplete()', 'reachedGoal()', 'achievedMastery()', 'foundSolution()'],
    resolution: ['success awaits', 'breakthrough achieved', 'goals realized', 'dreams fulfilled'],
    method: ['achieve', 'realize', 'discover', 'create', 'transform', 'implement'],
    initialValue: ["'beginning'", "0", "true", "new Map()", "[]"],
    message: ['is just the beginning', 'will multiply', 'leads to greatness', 'creates opportunity']
};

/**
 * Get a random item from an array
 * @param {Array} array - The array to select from
 * @returns {*} A random item from the array
 */
function getRandomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
}

/**
 * Generate a fortune based on a template
 * @param {string} template - The template string with placeholders
 * @returns {string} The generated fortune
 */
function fillTemplate(template) {
    // Replace all placeholders with random words from the word bank
    let result = template;
    const placeholders = template.match(/\{(\w+)\}/g) || [];
    
    placeholders.forEach(placeholder => {
        const key = placeholder.replace(/[{}]/g, '');
        if (wordBank[key]) {
            result = result.replace(placeholder, getRandomItem(wordBank[key]));
        }
    });
    
    return result;
}

/**
 * Generate a new fortune for the specified category
 * @param {string} category - The fortune category
 * @returns {string} A newly generated fortune
 */
function generateFortune(category) {
    if (!fortuneTemplates[category]) {
        return "Invalid category";
    }
    
    const template = getRandomItem(fortuneTemplates[category]);
    return fillTemplate(template);
}

/**
 * Generate multiple fortunes for each category
 * @param {number} count - Number of fortunes to generate per category
 * @returns {Object} Object containing arrays of fortunes by category
 */
function generateFortuneBatch(count = 3) {
    const result = {};
    
    Object.keys(fortuneTemplates).forEach(category => {
        result[category] = [];
        for (let i = 0; i < count; i++) {
            result[category].push(generateFortune(category));
        }
    });
    
    return result;
}

/**
 * Add generated fortunes to the fortunes.json file
 * This function would need to be adapted for actual file system access
 * when running in a Node.js environment
 */
function addFortunesToFile() {
    // In a browser environment, this would need to be adapted
    // This is a placeholder for the actual implementation
    console.log("Generated fortunes:");
    const newFortunes = generateFortuneBatch(2);
    console.log(JSON.stringify(newFortunes, null, 2));
    
    // In a Node.js environment, you would:
    // 1. Read the existing fortunes.json file
    // 2. Parse the JSON
    // 3. Add the new fortunes to each category
    // 4. Write the updated JSON back to the file
    
    return newFortunes;
}

// Example usage in browser console
// addFortunesToFile();