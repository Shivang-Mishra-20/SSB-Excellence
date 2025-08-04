// main.js - Consolidated JavaScript for SSB Excellence website

document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle - Common across all pages
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            const icon = this.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-times');
                icon.classList.toggle('fa-bars');
            }
        });

        // Close mobile menu when clicking a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                const icon = hamburger.querySelector('i');
                if (icon) {
                    icon.classList.add('fa-bars');
                    icon.classList.remove('fa-times');
                }
            });
        });
    }

    // Sticky header on scroll - Common across all pages
    const header = document.querySelector('.header');
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // Back to top button - Common across all pages
    const backToTopBtn = document.querySelector('.back-to-top');
    if (backToTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('active');
            } else {
                backToTopBtn.classList.remove('active');
            }
        });

        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }


// Course collapse functionality
const collapseToggles = document.querySelectorAll('.collapse-toggle');
if (collapseToggles.length > 0) {
    collapseToggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            this.classList.toggle('active');
            const content = this.nextElementSibling;
            content.classList.toggle('active');
        });
    });
}



    // Add active class to current page in navigation - Common across all pages
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinksAll = document.querySelectorAll('.navbar .nav-links a');
    
    navLinksAll.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (currentPage === linkPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // Animation on scroll - Common across all pages
    const animateElements = document.querySelectorAll('.about-content, .about-image, .feature-item, .mv-card, .team-member, .info-item, .contact-form, .contact-card, .course-card, .details-content, .details-sidebar');
    
    function animateOnScroll() {
        animateElements.forEach(element => {
            const elementPos = element.getBoundingClientRect().top;
            const screenPos = window.innerHeight / 1.2;
            
            if(elementPos < screenPos) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Set initial state
    if (animateElements.length > 0) {
        animateElements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'all 0.6s ease';
        });
        
        window.addEventListener('scroll', animateOnScroll);
        animateOnScroll(); // Run once on load
    }

    // Course details tabs - Specific to courses.html
    const detailsTabs = document.querySelectorAll('.details-tab');
    const tabContents = document.querySelectorAll('.tab-content');
    
    if (detailsTabs.length > 0 && tabContents.length > 0) {
        detailsTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                // Remove active class from all tabs and contents
                detailsTabs.forEach(t => t.classList.remove('active'));
                tabContents.forEach(c => c.classList.remove('active'));
                
                // Add active class to clicked tab and corresponding content
                this.classList.add('active');
                const tabId = this.getAttribute('data-tab');
                document.getElementById(tabId).classList.add('active');
            });
        });
    }

    // Form submission handler - Specific to contact.html
    const contactForm = document.getElementById('contactForm');
    const successMessage = document.querySelector('.success-message');
    
    if (contactForm && successMessage) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = {};
            formData.forEach((value, key) => {
                data[key] = value;
            });
            
            // Create message text
            const messageText = `New Contact Form Submission:
Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone}
Subject: ${data.subject}
Message: ${data.message}`;
            
            // Send SMS
            const smsUrl = `sms:7738230065?body=${encodeURIComponent(messageText)}`;
            window.open(smsUrl, '_blank');
            
            // Send email
            const emailUrl = `mailto:ssbexcellence25@gmail.com ?subject=New Contact Form Submission&body=${encodeURIComponent(messageText)}`;
            window.open(emailUrl, '_blank');
            
            // Show success message
            successMessage.style.display = 'block';
            contactForm.reset();
            
            // Hide success message after 5 seconds
            setTimeout(() => {
                successMessage.style.display = 'none';
            }, 5000);
        });
    }
});

// Additional utility functions can be added here
function debounce(func, wait = 20, immediate = true) {
    let timeout;
    return function() {
        const context = this, args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}