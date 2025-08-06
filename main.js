document.addEventListener('DOMContentLoaded', function() {
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
    
    if (animateElements.length > 0) {
        animateElements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'all 0.6s ease';
        });
        
        window.addEventListener('scroll', animateOnScroll);
        animateOnScroll();
    }

    const detailsTabs = document.querySelectorAll('.details-tab');
    const tabContents = document.querySelectorAll('.tab-content');
    
    if (detailsTabs.length > 0 && tabContents.length > 0) {
        detailsTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                detailsTabs.forEach(t => t.classList.remove('active'));
                tabContents.forEach(c => c.classList.remove('active'));
                this.classList.add('active');
                const tabId = this.getAttribute('data-tab');
                document.getElementById(tabId).classList.add('active');
            });
        });
    }

const contactForm = document.getElementById('contactForm');
const successMessage = document.querySelector('.success-message');

if (contactForm && successMessage) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const formData = new FormData(this);
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });
        
        const subject = 'New Contact Form Submission';
        const messageText = `New Contact Form Submission:
Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone}
Subject: ${data.subject}
Message: ${data.message}`;

        // Primary method - works on most devices
        const emailUrl = `mailto:shivang.m04@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(messageText)}`;
        
        // Create a hidden anchor tag to handle the mailto link
        const mailtoLink = document.createElement('a');
        mailtoLink.href = emailUrl;
        mailtoLink.style.display = 'none';
        document.body.appendChild(mailtoLink);
        
        // Track if the email client was opened
        let emailClientOpened = false;
        const emailOpenTimeout = setTimeout(() => {
            if (!emailClientOpened) {
                handleEmailFallback(subject, messageText);
            }
        }, 500); // Wait 500ms before assuming failure
        
        // Attempt to open email client
        mailtoLink.click();
        
        // This will only run if the email client opened successfully
        window.addEventListener('blur', function onBlur() {
            emailClientOpened = true;
            clearTimeout(emailOpenTimeout);
            window.removeEventListener('blur', onBlur);
            
            // Show success message when we're confident email client opened
            showSuccessMessage();
            
            // Clean up
            setTimeout(() => {
                document.body.removeChild(mailtoLink);
            }, 1000);
        });

        // Reset form immediately for better UX
        contactForm.reset();
    });
}

function handleEmailFallback(subject, messageText) {
    // Fallback method 1: Show email details with copy option
    const emailDetails = `To: shivang.m04@gmail.com\nSubject: ${subject}\n\n${messageText}`;
    
    // Try to copy to clipboard
    if (navigator.clipboard) {
        navigator.clipboard.writeText(emailDetails).then(() => {
            const userConfirmed = confirm('Email details copied to clipboard. Paste them in your email client.\n\nClick OK to confirm you sent the email.');
            if (userConfirmed) {
                showSuccessMessage();
            }
        }).catch(() => {
            showManualEmailDialog(emailDetails);
        });
    } else {
        showManualEmailDialog(emailDetails);
    }
}

function showManualEmailDialog(emailDetails) {
    // Fallback method 2: Show complete email details in a dialog
    const userConfirmed = confirm(`Could not open email automatically. Here are your email details:\n\n${emailDetails}\n\nClick OK after you've sent the email manually.`);
    
    if (userConfirmed) {
        showSuccessMessage();
    }
}

function showSuccessMessage() {
    const successMessage = document.querySelector('.success-message');
    if (successMessage) {
        successMessage.textContent = 'Message sent successfully!';
        successMessage.style.display = 'block';
        
        setTimeout(() => {
            successMessage.style.display = 'none';
        }, 5000);
    }
}

function handleEmailFallback(subject, messageText) {
    // Fallback method 1: Show email details with copy option
    const emailDetails = `To: shivang.m04@gmail.com\nSubject: ${subject}\n\n${messageText}`;
    
    // Try to copy to clipboard
    if (navigator.clipboard) {
        navigator.clipboard.writeText(emailDetails).then(() => {
            alert('Email details copied to clipboard. Please paste them in your email client.');
        }).catch(() => {
            showEmailFallbackDialog(emailDetails);
        });
    } else {
        showEmailFallbackDialog(emailDetails);
    }
}

function showEmailFallbackDialog(emailDetails) {
    // Fallback method 2: Show complete email details in a dialog
    const shouldProceed = confirm(`Could not open email client automatically. Here are your email details:\n\n${emailDetails}\n\nClick OK to try opening your email client, or Cancel to manually copy these details.`);
    
    if (shouldProceed) {
        // Final attempt with simple mailto
        window.location.href = `mailto:shivang.m04@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(messageText)}`;
    }
}

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