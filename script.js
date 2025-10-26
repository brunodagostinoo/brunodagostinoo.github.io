// Portfolio JavaScript - Vanilla JS only

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
    initializeHNPortfolio();
});

function initializeHNPortfolio() {
    // Initialize all features
    initializeSmoothScrolling();
    initializeKeyboardNavigation();
    initializeResponsiveFeatures();
    initializeHNAnimations();
}

// Smooth scrolling for navigation
function initializeSmoothScrolling() {
    const navLinks = document.querySelectorAll('#hn-nav a[href^="#"]');

    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const headerOffset = 60; // Account for fixed header
                const elementPosition = targetElement.offsetTop;
                const offsetPosition = elementPosition - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Keyboard navigation (HN-style)
function initializeKeyboardNavigation() {
    document.addEventListener('keydown', function (e) {
        // 'j' and 'k' for navigation between sections (like HN)
        if (e.key === 'j' || e.key === 'k') {
            e.preventDefault();
            navigateSections(e.key);
        }

        // 'a' to go to about section
        if (e.key === 'a' && !e.ctrlKey && !e.metaKey) {
            e.preventDefault();
            scrollToSection('#about');
        }

        // 's' to go to skills section
        if (e.key === 's' && !e.ctrlKey && !e.metaKey) {
            e.preventDefault();
            scrollToSection('#skills');
        }

        // 'p' to go to portfolio section
        if (e.key === 'p' && !e.ctrlKey && !e.metaKey) {
            e.preventDefault();
            scrollToSection('#portfolio');
        }

        // 'c' to go to contact section
        if (e.key === 'c' && !e.ctrlKey && !e.metaKey) {
            e.preventDefault();
            scrollToSection('#contact');
        }
    });
}

function navigateSections(direction) {
    const sections = ['#hero', '#about', '#skills', '#portfolio', '#contact'];
    const currentScroll = window.pageYOffset;
    let currentIndex = 0;

    // Find current section
    for (let i = 0; i < sections.length; i++) {
        const section = document.querySelector(sections[i]);
        if (section && section.offsetTop - 100 <= currentScroll) {
            currentIndex = i;
        }
    }

    // Navigate up or down
    if (direction === 'k' && currentIndex > 0) {
        scrollToSection(sections[currentIndex - 1]);
    } else if (direction === 'j' && currentIndex < sections.length - 1) {
        scrollToSection(sections[currentIndex + 1]);
    }
}

function scrollToSection(selector) {
    const element = document.querySelector(selector);
    if (element) {
        const headerOffset = 60;
        const elementPosition = element.offsetTop;
        const offsetPosition = elementPosition - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }
}

// Responsive features
function initializeResponsiveFeatures() {
    // Mobile menu toggle (if needed for small screens)
    const navToggle = document.createElement('div');
    navToggle.id = 'mobile-nav-toggle';
    navToggle.innerHTML = '☰';
    navToggle.style.cssText = `
        display: none;
        position: fixed;
        top: 10px;
        right: 10px;
        background: #007acc;
        color: white;
        padding: 5px 10px;
        border-radius: 3px;
        cursor: pointer;
        font-size: 14px;
        z-index: 1001;
    `;

    document.body.appendChild(navToggle);

    // Show/hide mobile menu based on screen size
    function checkMobile() {
        if (window.innerWidth <= 768) {
            navToggle.style.display = 'block';
            navToggle.addEventListener('click', toggleMobileNav);
        } else {
            navToggle.style.display = 'none';
        }
    }

    checkMobile();
    window.addEventListener('resize', checkMobile);
}

function toggleMobileNav() {
    const nav = document.getElementById('hn-nav');
    const isVisible = nav.style.display !== 'none';

    if (isVisible) {
        nav.style.display = 'none';
    } else {
        nav.style.display = 'block';
        nav.style.position = 'fixed';
        nav.style.top = '0';
        nav.style.left = '0';
        nav.style.right = '0';
        nav.style.zIndex = '1000';
    }
}

// HN-style animations and interactions
function initializeHNAnimations() {
    // Add subtle hover effects to story links
    const storyLinks = document.querySelectorAll('.storylink');
    storyLinks.forEach(link => {
        link.addEventListener('mouseenter', function () {
            this.style.textDecoration = 'underline';
        });

        link.addEventListener('mouseleave', function () {
            this.style.textDecoration = 'none';
        });
    });

    // Add click tracking (for analytics simulation)
    storyLinks.forEach(link => {
        link.addEventListener('click', function () {
            // In a real HN, this would track clicks
            console.log('Story clicked:', this.textContent);
        });
    });

    // Add scroll-based active section highlighting
    let currentSection = '';
    const sections = document.querySelectorAll('.hn-section');

    window.addEventListener('scroll', function () {
        const scrollPosition = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                if (currentSection !== section.id) {
                    currentSection = section.id;
                    updateActiveNav(section.id);
                }
            }
        });
    });
}

function updateActiveNav(activeSection) {
    // Remove active class from all nav links
    const navLinks = document.querySelectorAll('#hn-nav a');
    navLinks.forEach(link => {
        link.style.textDecoration = 'none';
        link.style.fontWeight = 'normal';
    });

    // Add active styling to current section link
    const activeLink = document.querySelector(`#hn-nav a[href="#${activeSection}"]`);
    if (activeLink) {
        activeLink.style.fontWeight = 'bold';
    }
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// HN-style "new" indicator for recent updates
function addNewIndicator() {
    // Add "new" indicators to recent projects
    const projects = document.querySelectorAll('.project-item');
    if (projects.length > 0) {
        const firstProject = projects[0];
        const newSpan = document.createElement('span');
        newSpan.textContent = 'new';
        newSpan.style.cssText = `
            background: #007acc;
            color: white;
            font-size: 9px;
            padding: 1px 3px;
            margin-left: 5px;
            border-radius: 2px;
            text-transform: uppercase;
        `;
        firstProject.querySelector('.storylink').appendChild(newSpan);
    }
}

// Initialize "new" indicators after a delay
setTimeout(addNewIndicator, 1000);

// HN-style keyboard shortcuts help (press 'h' for help)
document.addEventListener('keydown', function (e) {
    if (e.key === 'h' && !e.ctrlKey && !e.metaKey) {
        e.preventDefault();
        showKeyboardHelp();
    }
});

function showKeyboardHelp() {
    const helpDiv = document.createElement('div');
    helpDiv.id = 'keyboard-help';
    helpDiv.innerHTML = `
        <div style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); background: white; border: 1px solid #dddddd; padding: 20px; z-index: 10000; font-family: 'JetBrains Mono', monospace; font-size: 12px; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
            <h3 style="margin-top: 0; color: #000000;">Keyboard Shortcuts</h3>
            <div style="margin: 10px 0;">
                <strong>j/k:</strong> Navigate sections up/down<br>
                <strong>a:</strong> About section<br>
                <strong>s:</strong> Skills section<br>
                <strong>p:</strong> Portfolio section<br>
                <strong>c:</strong> Contact section<br>
                <strong>h:</strong> Show this help
            </div>
            <button onclick="this.parentNode.parentNode.remove()" style="background: #007acc; color: white; border: none; padding: 5px 10px; cursor: pointer;">Close</button>
        </div>
        <div style="position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.5); z-index: 9999;" onclick="this.parentNode.remove()"></div>
    `;
    document.body.appendChild(helpDiv);
}