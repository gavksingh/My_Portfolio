/**
 * WORLD-CLASS PORTFOLIO - ENHANCED JAVASCRIPT
 * Premium interactions and animations
 */

(function () {
  "use strict";

  // ENHANCED NAVIGATION & MOBILE MENU
  function initNavigation() {
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const header = document.querySelector('#header');

    if (mobileNavToggle) {
      mobileNavToggle.addEventListener('click', function (e) {
        e.preventDefault();
        header.classList.toggle('mobile-nav-active');
        document.body.classList.toggle('mobile-nav-active');

        // Animate the toggle button
        this.style.transform = header.classList.contains('mobile-nav-active')
          ? 'scale(1.1) rotate(90deg)'
          : 'scale(1) rotate(0deg)';
      });
    }

    // Close mobile nav when clicking on overlay
    document.addEventListener('click', function (e) {
      if (header.classList.contains('mobile-nav-active') &&
        !header.contains(e.target) &&
        !mobileNavToggle.contains(e.target)) {
        header.classList.remove('mobile-nav-active');
        document.body.classList.remove('mobile-nav-active');
        if (mobileNavToggle) {
          mobileNavToggle.style.transform = 'scale(1) rotate(0deg)';
        }
      }
    });
  }

  // PREMIUM SCROLL PROGRESS INDICATOR
  function updateScrollProgress() {
    const scrollProgress = document.getElementById('scroll-progress');
    if (scrollProgress) {
      const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      scrollProgress.style.width = Math.min(scrolled, 100) + '%';
    }
  }

  // SOPHISTICATED HEADER SCROLL EFFECTS
  function headerScrollEffect() {
    const header = document.querySelector('#header');
    if (header) {
      if (window.scrollY > 100) {
        header.classList.add('header-scrolled');
      } else {
        header.classList.remove('header-scrolled');
      }
    }
  }

  // SMOOTH SCROLL WITH ENHANCED EASING
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));

        if (target) {
          const headerHeight = document.querySelector('#header')?.offsetHeight || 0;
          const targetPosition = target.offsetTop - headerHeight - 20;

          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });

          // Update active nav item
          updateActiveNavItem(this.getAttribute('href'));

          // Close mobile menu if open
          const header = document.querySelector('#header');
          const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
          if (header?.classList.contains('mobile-nav-active')) {
            header.classList.remove('mobile-nav-active');
            document.body.classList.remove('mobile-nav-active');
            if (mobileNavToggle) {
              mobileNavToggle.style.transform = 'scale(1) rotate(0deg)';
            }
          }
        }
      });
    });
  }

  // DYNAMIC ACTIVE NAV ITEM
  function updateActiveNavItem(targetHref) {
    document.querySelectorAll('.nav-menu a').forEach(link => {
      link.classList.remove('active');
    });

    const activeLink = document.querySelector(`.nav-menu a[href="${targetHref}"]`);
    if (activeLink) {
      activeLink.classList.add('active');
    }
  }

  // INTERSECTION OBSERVER FOR ANIMATIONS
  function initScrollAnimations() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');

          // Add staggered animation for child elements
          const children = entry.target.querySelectorAll('.modern-card, .portfolio-item, .info-item');
          children.forEach((child, index) => {
            setTimeout(() => {
              child.style.animation = `fadeInUp 0.6s ease-out ${index * 0.1}s both`;
            }, index * 100);
          });
        }
      });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.animate-on-scroll, section').forEach(el => {
      observer.observe(el);
    });
  }

  // MODERN EMAILJS CONTACT FORM
  function initContactForm() {
    // Initialize EmailJS with your public key - REPLACE WITH YOUR ACTUAL KEY
    if (typeof emailjs !== 'undefined') {
      emailjs.init('YOUR_PUBLIC_KEY_HERE'); // Replace with your actual public key
    }

    const modernContactForm = document.getElementById('contact-form-modern');
    if (modernContactForm) {
      modernContactForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const loadingEl = document.querySelector('.loading-modern');
        const errorEl = document.querySelector('.error-message-modern');
        const successEl = document.querySelector('.success-message-modern');
        const submitBtn = document.querySelector('.btn-send-modern');

        // Show enhanced loading state
        if (loadingEl) loadingEl.style.display = 'flex';
        if (errorEl) errorEl.style.display = 'none';
        if (successEl) successEl.style.display = 'none';

        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status"></span>Sending...';
          submitBtn.style.transform = 'scale(0.98)';
        }

        // EmailJS service - REPLACE WITH YOUR SERVICE AND TEMPLATE IDs
        if (typeof emailjs !== 'undefined') {
          emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', this)
            .then(() => {
              // Success with enhanced animation
              if (loadingEl) loadingEl.style.display = 'none';
              if (successEl) {
                successEl.style.display = 'block';
                successEl.style.animation = 'slideInUp 0.5s ease-out';
              }
              this.reset();

              // Auto-hide success message
              setTimeout(() => {
                if (successEl) {
                  successEl.style.animation = 'fadeOut 0.3s ease-out';
                  setTimeout(() => successEl.style.display = 'none', 300);
                }
              }, 5000);
            })
            .catch((error) => {
              // Enhanced error handling
              console.error('EmailJS Error:', error);
              if (loadingEl) loadingEl.style.display = 'none';
              if (errorEl) {
                errorEl.textContent = 'Failed to send message. Please try again or contact me directly at ksingh.gav@gmail.com';
                errorEl.style.display = 'block';
                errorEl.style.animation = 'slideInUp 0.5s ease-out';
              }

              // Auto-hide error message
              setTimeout(() => {
                if (errorEl) {
                  errorEl.style.animation = 'fadeOut 0.3s ease-out';
                  setTimeout(() => errorEl.style.display = 'none', 300);
                }
              }, 8000);
            })
            .finally(() => {
              // Reset button state with animation
              if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.innerHTML = '<i class="bi bi-send me-2"></i>Send Message';
                submitBtn.style.transform = 'scale(1)';
              }
            });
        } else {
          // Fallback if EmailJS is not loaded
          if (loadingEl) loadingEl.style.display = 'none';
          if (errorEl) {
            errorEl.textContent = 'Email service not available. Please contact me directly at ksingh.gav@gmail.com';
            errorEl.style.display = 'block';
          }
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = '<i class="bi bi-send me-2"></i>Send Message';
          }
        }
      });
    }
  }

  // ENHANCED TYPED.JS INITIALIZATION WITH VISIBILITY FIX
  function initTypedEffect() {
    const typedElement = document.querySelector('.typed-modern');
    if (typedElement && typeof Typed !== 'undefined') {
      const typedOptions = {
        strings: typedElement.getAttribute('data-typed-items').split(','),
        typeSpeed: 80,
        backSpeed: 50,
        backDelay: 2000,
        startDelay: 500,
        loop: true,
        showCursor: true,
        cursorChar: '|',
        autoInsertCss: true,
        onComplete: function (self) {
          // Ensure cursor is white and visible
          if (self.cursor) {
            self.cursor.style.color = '#ffffff';
            self.cursor.style.textShadow = '2px 2px 4px rgba(0, 0, 0, 0.8)';
            self.cursor.style.animation = 'blink 1s infinite';
          }
        },
        onStringTyped: function (pos, self) {
          // Ensure text remains white
          if (self.el) {
            self.el.style.color = '#ffffff';
            self.el.style.textShadow = '2px 2px 4px rgba(0, 0, 0, 0.8)';
          }
        }
      };

      new Typed('.typed-modern', typedOptions);

      // Additional fix for text visibility
      setTimeout(() => {
        const typedText = document.querySelector('.typed-modern');
        if (typedText) {
          typedText.style.color = '#ffffff !important';
          typedText.style.textShadow = '2px 2px 4px rgba(0, 0, 0, 0.8)';
        }

        const typedCursor = document.querySelector('.typed-cursor');
        if (typedCursor) {
          typedCursor.style.color = '#ffffff !important';
          typedCursor.style.textShadow = '2px 2px 4px rgba(0, 0, 0, 0.8)';
        }
      }, 1000);
    }
  }

  // TEXT VISIBILITY ENFORCEMENT
  function enforceTextVisibility() {
    // Ensure hero text is white and visible
    const heroElements = [
      '.hero-title',
      '.hero-subtitle',
      '.typed-modern',
      '.typed-cursor'
    ];

    heroElements.forEach(selector => {
      const elements = document.querySelectorAll(selector);
      elements.forEach(el => {
        if (el) {
          el.style.color = '#ffffff';
          el.style.textShadow = '2px 2px 4px rgba(0, 0, 0, 0.8)';
        }
      });
    });
  }

  // ENHANCED BACK TO TOP BUTTON
  function initBackToTop() {
    const backToTop = document.querySelector('.back-to-top');

    if (backToTop) {
      const toggleBackToTop = () => {
        if (window.scrollY > 100) {
          backToTop.classList.add('active');
        } else {
          backToTop.classList.remove('active');
        }
      };

      window.addEventListener('scroll', toggleBackToTop);

      backToTop.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });

        // Add click animation
        backToTop.style.transform = 'scale(0.9)';
        setTimeout(() => {
          backToTop.style.transform = '';
        }, 150);
      });
    }
  }

  // PORTFOLIO ISOTOPE INITIALIZATION
  function initPortfolioFilter() {
    if (typeof Isotope !== 'undefined') {
      const portfolioContainer = document.querySelector('.portfolio-container');
      const portfolioFilters = document.querySelectorAll('#portfolio-flters li');

      if (portfolioContainer) {
        const isotope = new Isotope(portfolioContainer, {
          itemSelector: '.portfolio-item',
          layoutMode: 'fitRows',
          transitionDuration: '0.5s',
          hiddenStyle: {
            opacity: 0,
            transform: 'scale(0.8) translateY(30px)'
          },
          visibleStyle: {
            opacity: 1,
            transform: 'scale(1) translateY(0px)'
          }
        });

        portfolioFilters.forEach(filter => {
          filter.addEventListener('click', function () {
            portfolioFilters.forEach(f => f.classList.remove('filter-active'));
            this.classList.add('filter-active');

            const filterValue = this.getAttribute('data-filter');
            isotope.arrange({ filter: filterValue });

            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
              this.style.transform = '';
            }, 150);
          });
        });
      }
    }
  }

  // ENHANCED AOS INITIALIZATION
  function initAOS() {
    if (typeof AOS !== 'undefined') {
      AOS.init({
        duration: 800,
        easing: 'ease-in-out-cubic',
        once: true,
        mirror: false,
        offset: 50,
        delay: 100,
        disable: function () {
          return window.innerWidth < 768;
        }
      });
    }
  }

  // PERFORMANCE OPTIMIZED SCROLL HANDLER
  let ticking = false;
  function optimizedScrollHandler() {
    if (!ticking) {
      requestAnimationFrame(() => {
        updateScrollProgress();
        headerScrollEffect();
        ticking = false;
      });
      ticking = true;
    }
  }

  // PRELOADER ANIMATION
  function initPreloader() {
    const preloader = document.querySelector('#preloader');
    if (preloader) {
      window.addEventListener('load', () => {
        preloader.style.transition = 'opacity 0.5s ease-out';
        preloader.style.opacity = '0';
        setTimeout(() => {
          preloader.remove();
        }, 500);
      });
    }
  }

  // MODERN SWIPER INITIALIZATION
  function initSwiper() {
    if (typeof Swiper !== 'undefined') {
      const testimonialsSwiper = document.querySelector('.testimonials-slider');
      if (testimonialsSwiper) {
        new Swiper('.testimonials-slider', {
          speed: 600,
          loop: true,
          autoplay: {
            delay: 5000,
            disableOnInteraction: false
          },
          slidesPerView: 'auto',
          pagination: {
            el: '.swiper-pagination',
            type: 'bullets',
            clickable: true
          },
          effect: 'slide',
          spaceBetween: 30,
          breakpoints: {
            320: {
              slidesPerView: 1,
              spaceBetween: 20
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 30
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 30
            }
          }
        });
      }
    }
  }

  // INITIALIZE ALL COMPONENTS
  document.addEventListener('DOMContentLoaded', function () {
    // Core functionality
    initNavigation();
    initSmoothScroll();
    initBackToTop();
    initContactForm();
    initPreloader();

    // Visual enhancements
    initScrollAnimations();
    initTypedEffect();
    initAOS();
    initSwiper();
    initPortfolioFilter();

    // Text visibility fix
    enforceTextVisibility();

    // Scroll optimizations
    window.addEventListener('scroll', optimizedScrollHandler);

    // Keyboard accessibility
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        const header = document.querySelector('#header');
        const mobileNavToggle = document.querySelector('.mobile-nav-toggle');

        if (header?.classList.contains('mobile-nav-active')) {
          header.classList.remove('mobile-nav-active');
          document.body.classList.remove('mobile-nav-active');
          if (mobileNavToggle) {
            mobileNavToggle.style.transform = 'scale(1) rotate(0deg)';
          }
        }
      }
    });

    // Enhanced resize handler
    let resizeTimeout;
    window.addEventListener('resize', function () {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        // Recalculate AOS on resize
        if (typeof AOS !== 'undefined') {
          AOS.refresh();
        }
        // Re-enforce text visibility
        enforceTextVisibility();
      }, 250);
    });

    // Periodic text visibility check
    setInterval(enforceTextVisibility, 2000);
  });

  // Add CSS for additional animations and text visibility
  const additionalCSS = `
    @keyframes fadeOut {
      from { opacity: 1; transform: translateY(0); }
      to { opacity: 0; transform: translateY(-10px); }
    }
    
    .portfolio-item {
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .nav-menu a {
      position: relative;
      overflow: hidden;
    }
    
    /* Force text visibility */
    .hero-title,
    .hero-subtitle,
    .typed-modern,
    .typed-cursor {
      color: #ffffff !important;
      text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8) !important;
    }
    
    .typed-cursor {
      animation: blink 1s infinite !important;
    }
    
    @keyframes blink {
      0%, 50% { opacity: 1; }
      51%, 100% { opacity: 0; }
    }
  `;

  // Inject additional CSS
  const styleSheet = document.createElement('style');
  styleSheet.textContent = additionalCSS;
  document.head.appendChild(styleSheet);

  // ==============================================
  // CYBERPUNK PORTFOLIO FUNCTIONALITY
  // ==============================================

  // Loading Screen
  window.addEventListener('load', () => {
    setTimeout(() => {
      const loaderWrapper = document.querySelector('.loader-wrapper');
      if (loaderWrapper) {
        loaderWrapper.style.opacity = '0';
        setTimeout(() => {
          loaderWrapper.style.display = 'none';
        }, 500);
      }
    }, 2000);
  });

  // Custom Cursor
  function initCyberpunkCursor() {
    const cursor = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');

    if (cursor && cursorOutline) {
      document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX - 4 + 'px';
        cursor.style.top = e.clientY - 4 + 'px';

        cursorOutline.style.left = e.clientX - 15 + 'px';
        cursorOutline.style.top = e.clientY - 15 + 'px';
      });

      // Cursor hover effects
      const hoverElements = document.querySelectorAll('a, button, .nav-dot, .skill-hex, .project-card, .contact-card, .cyber-btn');
      hoverElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
          cursorOutline.style.transform = 'scale(1.5)';
          cursorOutline.style.borderColor = 'var(--neon-pink)';
        });
        element.addEventListener('mouseleave', () => {
          cursorOutline.style.transform = 'scale(1)';
          cursorOutline.style.borderColor = 'var(--neon-cyan)';
        });
      });
    }
  }

  // Typing Animation
  function initCyberpunkTyping() {
    const typedTexts = [
      "Software Developer",
      "Cloud Architect",
      "AI/ML Engineer",
      "Open Source Contributor",
      "Content Creator",
      "Problem Solver"
    ];

    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingSpeed = 100;
    const deletingSpeed = 50;
    const pauseEnd = 2000;

    function typeText() {
      const typedOutput = document.getElementById('typed-output');
      if (!typedOutput) return;

      const currentText = typedTexts[textIndex];

      if (!isDeleting && charIndex < currentText.length) {
        typedOutput.textContent += currentText.charAt(charIndex);
        charIndex++;
        setTimeout(typeText, typingSpeed);
      } else if (isDeleting && charIndex > 0) {
        typedOutput.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
        setTimeout(typeText, deletingSpeed);
      } else {
        isDeleting = !isDeleting;
        if (!isDeleting) {
          textIndex = (textIndex + 1) % typedTexts.length;
        }
        setTimeout(typeText, isDeleting ? pauseEnd : 500);
      }
    }

    typeText();
  }

  // Terminal Animation
  function initTerminalAnimation() {
    const terminalLines = [
      { text: "$ whoami", delay: 500 },
      { text: "gaurav_singh", delay: 1000 },
      { text: "$ cat skills.txt", delay: 1500 },
      { text: "• Java | Spring Boot | Microservices", delay: 2000 },
      { text: "• Python | Machine Learning | Data Science", delay: 2200 },
      { text: "• AWS | Cloud Architecture | DevOps", delay: 2400 },
      { text: "• React | Node.js | Full Stack Development", delay: 2600 },
      { text: "$ git status", delay: 3000 },
      { text: "On branch: master-degree", delay: 3500 },
      { text: "Location: SUNY Buffalo, NY", delay: 3700 },
      { text: "Status: Open to opportunities", delay: 3900 },
      { text: "$ echo $PASSION", delay: 4200 },
      { text: "Building innovative solutions at the intersection of code and creativity", delay: 4500 }
    ];

    function animateTerminal() {
      const terminalContent = document.getElementById('terminal-content');
      if (!terminalContent) return;

      terminalContent.innerHTML = '';

      terminalLines.forEach((line, index) => {
        setTimeout(() => {
          const lineElement = document.createElement('div');
          lineElement.className = 'terminal-line';
          lineElement.style.animationDelay = '0s';

          if (line.text.startsWith('$')) {
            lineElement.innerHTML = `<span class="terminal-prompt">guest@portfolio</span>:~$ ${line.text.substring(2)}`;
          } else {
            lineElement.textContent = line.text;
          }

          terminalContent.appendChild(lineElement);
          terminalContent.scrollTop = terminalContent.scrollHeight;
        }, line.delay);
      });
    }

    // Trigger terminal animation when section is visible
    const terminalSection = document.querySelector('#terminal');
    if (terminalSection) {
      terminalSection.addEventListener('mouseenter', animateTerminal);
    }

    return animateTerminal;
  }

  // Enhanced Navigation
  function initCyberpunkNavigation() {
    const sections = document.querySelectorAll('.section');
    const navItems = document.querySelectorAll('.nav-item');
    const navDots = document.querySelectorAll('.nav-dot');

    if (navItems.length === 0) return;

    window.addEventListener('scroll', () => {
      let current = '';
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (scrollY >= (sectionTop - 200)) {
          current = section.getAttribute('id') || '';
        }
      });

      navItems.forEach((item, index) => {
        const dot = item.querySelector('.nav-dot');
        item.classList.remove('active');
        dot.classList.remove('active');

        if (current && sections[index] && sections[index].id === current) {
          item.classList.add('active');
          dot.classList.add('active');
        } else if (current === '' && index === 0) {
          item.classList.add('active');
          dot.classList.add('active');
        }
      });
    });

    // Click navigation
    navItems.forEach((item, index) => {
      item.addEventListener('click', () => {
        if (sections[index]) {
          sections[index].scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  }

  // Enhanced Contact Form
  function initCyberpunkContactForm() {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) return;

    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      // Get form data
      const formData = new FormData(this);
      const name = formData.get('name');
      const email = formData.get('email');
      const subject = formData.get('subject');
      const message = formData.get('message');

      // Basic validation
      if (!name || !email || !subject || !message) {
        showCyberpunkAlert('Please fill in all fields', 'error');
        return;
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        showCyberpunkAlert('Please enter a valid email address', 'error');
        return;
      }

      // Show loading state
      const submitBtn = this.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = 'TRANSMITTING...';
      submitBtn.disabled = true;

      // Simulate sending (replace with actual EmailJS integration)
      setTimeout(() => {
        showCyberpunkAlert(`Message received, ${name}! I'll get back to you at ${email} within 24 hours.`, 'success');
        this.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }, 2000);
    });
  }

  // Cyberpunk Alert System
  function showCyberpunkAlert(message, type = 'info') {
    // Remove existing alert
    const existingAlert = document.querySelector('.cyber-alert');
    if (existingAlert) {
      existingAlert.remove();
    }

    // Create new alert
    const alert = document.createElement('div');
    alert.className = `cyber-alert cyber-alert-${type}`;
    alert.innerHTML = `
      <div class="cyber-alert-content">
        <i class="bi ${type === 'success' ? 'bi-check-circle' : type === 'error' ? 'bi-x-circle' : 'bi-info-circle'}"></i>
        <span>${message}</span>
        <button class="cyber-alert-close">&times;</button>
      </div>
    `;

    // Add styles
    alert.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 10001;
      background: var(--dark-surface);
      border: 2px solid ${type === 'success' ? 'var(--neon-green)' : type === 'error' ? '#ff5f56' : 'var(--neon-cyan)'};
      border-radius: 8px;
      padding: 15px 20px;
      color: var(--text-primary);
      font-family: 'Rajdhani', sans-serif;
      box-shadow: 0 0 20px ${type === 'success' ? 'var(--neon-green)' : type === 'error' ? '#ff5f56' : 'var(--neon-cyan)'};
      animation: slideInRight 0.3s ease;
    `;

    alert.querySelector('.cyber-alert-content').style.cssText = `
      display: flex;
      align-items: center;
      gap: 10px;
    `;

    alert.querySelector('.cyber-alert-close').style.cssText = `
      background: none;
      border: none;
      color: var(--text-primary);
      font-size: 1.5rem;
      cursor: pointer;
      margin-left: 10px;
    `;

    document.body.appendChild(alert);

    // Auto remove after 5 seconds
    setTimeout(() => {
      if (alert.parentNode) {
        alert.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => alert.remove(), 300);
      }
    }, 5000);

    // Manual close
    alert.querySelector('.cyber-alert-close').addEventListener('click', () => {
      alert.style.animation = 'slideOutRight 0.3s ease';
      setTimeout(() => alert.remove(), 300);
    });
  }

  // Back to Top Button
  function initBackToTopCyber() {
    const backToTop = document.querySelector('.back-to-top');
    if (!backToTop) return;

    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        backToTop.classList.add('show');
      } else {
        backToTop.classList.remove('show');
      }
    });

    backToTop.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // Intersection Observer for Cyberpunk Animations
  function initCyberpunkAnimations() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const animateTerminal = initTerminalAnimation();

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');

          // Trigger terminal animation when terminal section is visible
          if (entry.target.id === 'terminal') {
            animateTerminal();
          }
        }
      });
    }, observerOptions);

    // Observe elements
    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

    const terminalSection = document.querySelector('#terminal');
    if (terminalSection) {
      observer.observe(terminalSection);
    }
  }

  // Glitch effect trigger
  function initGlitchEffects() {
    document.querySelectorAll('.glitch').forEach(element => {
      element.addEventListener('mouseenter', () => {
        element.style.animation = 'none';
        setTimeout(() => {
          element.style.animation = '';
        }, 10);
      });
    });
  }

  // Add cyberpunk-specific CSS animations
  const cyberpunkCSS = `
    @keyframes slideInRight {
      from {
        transform: translateX(100%);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }
    
    @keyframes slideOutRight {
      from {
        transform: translateX(0);
        opacity: 1;
      }
      to {
        transform: translateX(100%);
        opacity: 0;
      }
    }
  `;

  // Initialize EmailJS if available
  function initEmailJS() {
    if (typeof emailjs !== 'undefined') {
      // Replace with your actual EmailJS public key
      emailjs.init('YOUR_PUBLIC_KEY_HERE');
    }
  }

  // Enhanced DOMContentLoaded event with cyberpunk features
  const originalDOMContentLoaded = document.addEventListener;

  // Skills Progress Animation
  function initSkillsAnimation() {
    const skillsGrid = document.querySelector('.skills-grid');
    if (!skillsGrid) return;

    const skillsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
          skillsObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.3
    });

    skillsObserver.observe(skillsGrid);
  }

  // Initialize cyberpunk features
  function initCyberpunkFeatures() {
    initCyberpunkCursor();
    initCyberpunkTyping();
    initCyberpunkNavigation();
    initCyberpunkContactForm();
    initBackToTopCyber();
    initCyberpunkAnimations();
    initGlitchEffects();
    initEmailJS();
    initFooterFeatures();
    initSkillsAnimation();
  }

  // Footer Features
  function initFooterFeatures() {
    // Update current year
    const currentYearElement = document.getElementById('current-year');
    if (currentYearElement) {
      currentYearElement.textContent = new Date().getFullYear();
    }
  }

  // Add cyberpunk CSS to document
  const cyberpunkStyleSheet = document.createElement('style');
  cyberpunkStyleSheet.textContent = cyberpunkCSS;
  document.head.appendChild(cyberpunkStyleSheet);

  // Initialize cyberpunk features
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCyberpunkFeatures);
  } else {
    initCyberpunkFeatures();
  }

})();