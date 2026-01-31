/**
 * UI Support Scripts for ConvertFileBox
 */
document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const menuBtn = document.getElementById('mobile-menu-btn');
    const navLinks = document.getElementById('nav-links');

    if (menuBtn && navLinks) {
        menuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('open');
            const isExpanded = navLinks.classList.contains('open');
            menuBtn.setAttribute('aria-expanded', isExpanded);
        });
    }

    // Dynamic Year
    const yearEl = document.getElementById('year');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }
});

/**
 * Utility to Copy Text to Clipboard with visual feedback
 * @param {string} text - The text to copy
 * @param {HTMLElement} triggerBtn - The button that triggered the action
 */
async function copyToClipboard(text, triggerBtn) {
    try {
        await navigator.clipboard.writeText(text);
        
        if (triggerBtn) {
            const originalText = triggerBtn.textContent;
            triggerBtn.textContent = 'Copied!';
            triggerBtn.classList.add('btn-success');
            
            setTimeout(() => {
                triggerBtn.textContent = originalText;
                triggerBtn.classList.remove('btn-success');
            }, 2000);
        }
    } catch (err) {
        console.error('Failed to copy text: ', err);
        alert('コピーに失敗しました');
    }
}
