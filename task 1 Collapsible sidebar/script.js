// DOM Elements
const sidebar = document.getElementById('sidebar');
const toggleBtn = document.getElementById('toggleBtn');

// State management
let isCollapsed = false;
let isMobile = window.innerWidth <= 768;

// Initialize the sidebar
function initSidebar() {
    // Check screen size
    checkScreenSize();
    
    // Add event listeners
    toggleBtn.addEventListener('click', toggleSidebar);
    window.addEventListener('resize', handleResize);
    
    // Add touch support for mobile
    if ('ontouchstart' in window) {
        addTouchSupport();
    }
    
    // Create mobile overlay
    createOverlay();
}

// Toggle sidebar function
function toggleSidebar() {
    if (isMobile) {
        // Mobile behavior: slide in/out from left
        sidebar.classList.toggle('open');
        document.querySelector('.sidebar-overlay')?.classList.toggle('active');
        
        // Prevent body scroll when sidebar is open
        if (sidebar.classList.contains('open')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    } else {
        // Desktop behavior: collapse/expand
        isCollapsed = !isCollapsed;
        sidebar.classList.toggle('collapsed');
        
        // Update toggle button icon
        const icon = toggleBtn.querySelector('i');
        if (isCollapsed) {
            icon.className = 'fas fa-chevron-right';
        } else {
            icon.className = 'fas fa-bars';
        }
    }
}

// Check screen size and update behavior
function checkScreenSize() {
    const wasMobile = isMobile;
    isMobile = window.innerWidth <= 768;
    
    if (wasMobile !== isMobile) {
        // Reset sidebar state when switching between mobile and desktop
        sidebar.classList.remove('collapsed', 'open');
        document.body.style.overflow = '';
        document.querySelector('.sidebar-overlay')?.classList.remove('active');
        
        // Reset toggle button icon
        const icon = toggleBtn.querySelector('i');
        icon.className = 'fas fa-bars';
        
        isCollapsed = false;
    }
}

// Handle window resize
function handleResize() {
    checkScreenSize();
}

// Add touch support for mobile
function addTouchSupport() {
    let startX = 0;
    let currentX = 0;
    let isDragging = false;
    
    document.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        isDragging = true;
    });
    
    document.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        
        currentX = e.touches[0].clientX;
        const diff = currentX - startX;
        
        // Only allow right swipe to open sidebar
        if (diff > 50 && !sidebar.classList.contains('open')) {
            sidebar.classList.add('open');
            document.querySelector('.sidebar-overlay')?.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    });
    
    document.addEventListener('touchend', () => {
        isDragging = false;
    });
}

// Create overlay for mobile
function createOverlay() {
    const overlay = document.createElement('div');
    overlay.className = 'sidebar-overlay';
    overlay.addEventListener('click', () => {
        if (isMobile && sidebar.classList.contains('open')) {
            toggleSidebar();
        }
    });
    document.body.appendChild(overlay);
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initSidebar();
}); 