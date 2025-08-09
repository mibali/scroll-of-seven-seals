// Security utilities for safe HTML handling
class SecurityUtils {
    // Escape HTML to prevent XSS
    static escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
    
    // Sanitize user input for display
    static sanitizeUserInput(input) {
        if (typeof input !== 'string') {
            return '';
        }
        
        // Remove script tags and other dangerous elements
        return input
            .replace(/<script[^>]*>.*?<\/script>/gi, '')
            .replace(/<iframe[^>]*>.*?<\/iframe>/gi, '')
            .replace(/<object[^>]*>.*?<\/object>/gi, '')
            .replace(/<embed[^>]*>/gi, '')
            .replace(/javascript:/gi, '')
            .replace(/on\w+\s*=/gi, '');
    }
    
    // Safe innerHTML replacement
    static safeInnerHTML(element, content) {
        if (!element) return;
        
        // For user-generated content, escape it
        if (typeof content === 'string' && content.includes('<script')) {
            element.textContent = content;
        } else {
            element.innerHTML = content;
        }
    }
    
    // Validate verse content (specific to this game)
    static validateBibleVerse(verse) {
        if (!verse || typeof verse !== 'string') {
            return false;
        }
        
        // Basic validation - verses should not contain scripts or suspicious content
        const suspicious = ['<script', 'javascript:', 'onload=', 'onerror='];
        return !suspicious.some(pattern => verse.toLowerCase().includes(pattern));
    }
}

// Make available globally
window.SecurityUtils = SecurityUtils;

console.log('🔒 Security utilities loaded - Safe HTML handling ready!');
