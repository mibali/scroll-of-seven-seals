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
        const response = await fetch('https://give-me-my-key.onrender.com/api/key');
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

// Prefetch API key on page load to reduce latency
function prefetchApiKey() {
    // Trigger fetch and populate cache; ignore errors here (will be handled on-demand later)
    return fetchApiKey()
        .then((key) => {
            if (key) {
                console.debug('[api-utils] API key prefetched and cached.');
                return key;
            }
            return null;
        })
        .catch((err) => {
            // Non-fatal: on-demand calls will retry and surface errors appropriately
            console.warn('[api-utils] API key prefetch failed (will retry on demand):', err?.message || err);
            return null;
        });
}

// Initialize API key prefetching when the module loads
if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', prefetchApiKey);
    } else {
        // Document already loaded
        prefetchApiKey();
    }
}

// Make functions available globally if running in browser
if (typeof window !== 'undefined') {
    window.apiUtils = {
        fetchApiKey,
        prefetchApiKey
    };
}

// Export the functions (for module systems)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { fetchApiKey, prefetchApiKey };
}
