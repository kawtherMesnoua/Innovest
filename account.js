document.addEventListener('DOMContentLoaded', function() {
    // Dark Mode Toggle
    const darkModeIcon = document.getElementById('dark-mode-icon');
    const body = document.body;

    if (localStorage.getItem('darkMode') === 'enabled') {
        body.classList.add('dark-mode');
        darkModeIcon.classList.replace('fa-moon', 'fa-sun');
    }

    darkModeIcon.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        
        if (body.classList.contains('dark-mode')) {
            localStorage.setItem('darkMode', 'enabled');
            darkModeIcon.classList.replace('fa-moon', 'fa-sun');
        } else {
            localStorage.setItem('darkMode', 'disabled');
            darkModeIcon.classList.replace('fa-sun', 'fa-moon');
        }
    });

    // FAQ Accordion
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            faqQuestions.forEach(item => {
                if (item !== question && item.classList.contains('active')) {
                    item.classList.remove('active');
                    item.nextElementSibling.style.maxHeight = null;
                }
            });
            
            question.classList.toggle('active');
            const answer = question.nextElementSibling;
            
            if (question.classList.contains('active')) {
                answer.style.maxHeight = answer.scrollHeight + 'px';
            } else {
                answer.style.maxHeight = null;
            }
        });
    });

    // Language Selector
    const languageIcon = document.getElementById('language-icon');
    languageIcon.addEventListener('click', () => {
        alert('Language selection will be available soon!');
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Enhanced auto-scrolling for gallery
    const container = document.querySelector('.options-container');
    if (container) {
        // Duplicate cards for infinite loop effect
        const cards = document.querySelectorAll('.account-card');
        cards.forEach(card => {
            const clone = card.cloneNode(true);
            container.appendChild(clone);
        });

        // Fallback animation for browsers that don't support CSS animation
        if (!('animation' in document.documentElement.style)) {
            let scrollPos = 0;
            const scrollSpeed = 1;
            
            function scrollGallery() {
                scrollPos += scrollSpeed;
                if (scrollPos >= container.scrollWidth / 2) {
                    scrollPos = 0;
                }
                container.scrollLeft = scrollPos;
                requestAnimationFrame(scrollGallery);
            }
            
            // Start animation
            scrollGallery();
            
            // Pause on hover
            container.addEventListener('mouseenter', () => {
                scrollSpeed = 0;
            });
            
            container.addEventListener('mouseleave', () => {
                scrollSpeed = 1;
            });
        }
    }
});