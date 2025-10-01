// API Utilities for secure API key management

let cachedApiKey = null;

/**
 * Fetches the API key from the secure server
 * @returns {Promise<string>} The API key
 */
async function fetchApiKey() {
    if (cachedApiKey) {
        return cachedApiKey;
    }

    try {
        const response = await fetch('https://give-me-my-key.onrender.com');
        if (!response.ok) {
            throw new Error(`Failed to fetch API key: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        cachedApiKey = data.key;
        return cachedApiKey;
    } catch (error) {
        console.error('Error fetching API key:', error);
        throw error; // Re-throw to allow calling code to handle the error
    }
}

// Export the function
window.apiUtils = {
    fetchApiKey
};
