/**
 * API Utilities for the Scroll of Seven Seals game
 * Handles communication with the Gemini proxy server
 */

const PROXY_URL = 'https://gemini-proxy-qo9a.onrender.com/api/generate';

/**
 * Calls the Gemini API through the proxy server
 * @param {string} prompt - The prompt to send to the API
 * @param {string} puzzleType - The type of puzzle being generated
 * @param {number} temperature - The temperature for response generation (0-1)
 * @returns {Promise<Object>} The parsed JSON response from the API
 */
async function callGeminiAPI(prompt, puzzleType, temperature = 0.7) {
    try {
        const response = await fetch(`${PROXY_URL}?puzzleType=${encodeURIComponent(puzzleType)}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: prompt
                    }]
                }],
                temperature
            })
        });

        if (!response.ok) {
            const errorBody = await response.text();
            throw new Error(`Proxy request failed with status ${response.status}. Response: ${errorBody}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error calling Gemini API:', error);
        throw error;
    }
}

// Make functions available globally if running in browser
if (typeof window !== 'undefined') {
    window.ApiUtils = {
        callGeminiAPI
    };
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { callGeminiAPI };
}
