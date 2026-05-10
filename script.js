/* 
  JS Property & Construction - Interactions
*/

document.addEventListener('DOMContentLoaded', () => {
  // --- Navbar Scroll Effect ---
  const navbar = document.getElementById('navbar');
  const scrollThreshold = 100;

  window.addEventListener('scroll', () => {
    if (window.scrollY > scrollThreshold) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    
    // Active Link Highlighting
    highlightNav();
  });

  // --- Mobile Menu Toggle ---
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');

  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('mobile-active');
    hamburger.classList.toggle('active');
  });

  // Close mobile menu when clicking a link
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('mobile-active');
      hamburger.classList.remove('active');
    });
  });

  // --- Highlight Nav Link on Scroll ---
  const sections = document.querySelectorAll('section[id]');
  
  function highlightNav() {
    let scrollY = window.pageYOffset;
    
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 150;
      const sectionId = current.getAttribute('id');
      
      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        document.querySelector('.nav-links a[href*=' + sectionId + ']')?.classList.add('active');
      } else {
        document.querySelector('.nav-links a[href*=' + sectionId + ']')?.classList.remove('active');
      }
    });
  }

  // --- Gallery Filtering ---
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active button
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      galleryItems.forEach(item => {
        if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
          item.style.display = 'block';
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
          }, 10);
        } else {
          item.style.opacity = '0';
          item.style.transform = 'scale(0.8)';
          setTimeout(() => {
            item.style.display = 'none';
          }, 300);
        }
      });
    });
  });

  // --- Contact Form Submission ---
  const contactForm = document.getElementById('contact-form');
  const formSuccess = document.getElementById('form-success');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Simple validation check
      const name = document.getElementById('fname').value;
      const phone = document.getElementById('fphone').value;
      
      if (!name || !phone) {
        alert('Please fill in your name and phone number.');
        return;
      }

      // Simulate form submission
      const btn = document.getElementById('btn-send-message');
      const originalText = btn.innerHTML;
      
      btn.disabled = true;
      btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

      setTimeout(() => {
        contactForm.reset();
        btn.disabled = false;
        btn.innerHTML = originalText;
        formSuccess.style.display = 'block';
        
        // Hide success message after 5 seconds
        setTimeout(() => {
          formSuccess.style.display = 'none';
        }, 5000);
      }, 1500);
    });
  }

  // --- Reveal Animations on Scroll ---
  const observerOptions = {
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal-visible');
      }
    });
  }, observerOptions);

  // Add reveal classes to elements
  const revealElements = document.querySelectorAll('.service-card, .construction-card, .about-image-col, .about-content-col, .contact-card');
  revealElements.forEach(el => {
    el.classList.add('reveal-hidden');
    observer.observe(el);
  });
});

// Add some dynamic CSS for reveal animations
const style = document.createElement('style');
style.textContent = `
  .reveal-hidden {
    opacity: 0;
    transform: translateY(30px);
    transition: all 0.8s ease-out;
  }
  .reveal-visible {
    opacity: 1;
    transform: translateY(0);
  }
  .hamburger.active span:nth-child(1) {
    transform: rotate(45deg) translate(5px, 6px);
  }
  .hamburger.active span:nth-child(2) {
    opacity: 0;
  }
  .hamburger.active span:nth-child(3) {
    transform: rotate(-45deg) translate(5px, -6px);
  }
`;
document.head.appendChild(style);
