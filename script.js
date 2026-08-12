/* ==========================================================================
   THISAIVA VENTURES — JAVASCRIPT INTERACTIONS
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initNavbarScroll();
  initMobileMenu();
  initStatCounters();
  initGlobalMap();
  initFormHandlers();
});

/* --------------------------------------------------------------------------
   1. NAVBAR SCROLL & ACTIVE LINK EFFECTS
   -------------------------------------------------------------------------- */
function initNavbarScroll() {
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-links a');
  const sections = document.querySelectorAll('section, footer');

  window.addEventListener('scroll', () => {
    // Scroll Blur class
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Active Section Tracking
    let currentSection = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        currentSection = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('active');
      }
    });
  });
}

/* --------------------------------------------------------------------------
   2. MOBILE NAVIGATION MENU
   -------------------------------------------------------------------------- */
function initMobileMenu() {
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const navLinks = document.getElementById('navLinks');

  if (hamburgerBtn && navLinks) {
    hamburgerBtn.addEventListener('click', () => {
      const isOpen = navLinks.style.display === 'flex';
      navLinks.style.display = isOpen ? 'none' : 'flex';
      navLinks.style.flexDirection = 'column';
      navLinks.style.position = 'absolute';
      navLinks.style.top = '100%';
      navLinks.style.left = '0';
      navLinks.style.right = '0';
      navLinks.style.background = 'rgba(6, 26, 21, 0.98)';
      navLinks.style.backdropFilter = 'blur(20px)';
      navLinks.style.padding = '2rem';
      navLinks.style.borderBottom = '1px solid var(--border-gold)';
      
      hamburgerBtn.innerHTML = isOpen ? '<i class="fa-solid fa-bars"></i>' : '<i class="fa-solid fa-xmark"></i>';
    });

    // Close menu on link click
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
          navLinks.style.display = 'none';
          hamburgerBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
        }
      });
    });
  }
}

/* --------------------------------------------------------------------------
   3. ANIMATED METRICS COUNTER
   -------------------------------------------------------------------------- */
function initStatCounters() {
  const metricSection = document.querySelector('.metrics-section');
  const numbers = document.querySelectorAll('.metric-number');
  let animated = false;

  if (!metricSection) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        animated = true;
        numbers.forEach(num => {
          const rawTarget = num.getAttribute('data-target');
          if (!rawTarget) return;

          const isFloat = rawTarget.includes('.');
          const targetVal = parseFloat(rawTarget);
          const originalText = num.textContent;
          const prefix = originalText.startsWith('$') ? '$' : '';
          const suffix = originalText.replace(/[\$\d\.]/g, '');

          let start = 0;
          const duration = 2000; // ms
          const stepTime = 30;
          const steps = duration / stepTime;
          const increment = targetVal / steps;

          const timer = setInterval(() => {
            start += increment;
            if (start >= targetVal) {
              start = targetVal;
              clearInterval(timer);
            }
            const displayVal = isFloat ? start.toFixed(1) : Math.floor(start);
            num.textContent = `${prefix}${displayVal}${suffix}`;
          }, stepTime);
        });
      }
    });
  }, { threshold: 0.3 });

  observer.observe(metricSection);
}

/* --------------------------------------------------------------------------
   4. LOCATION CARDS INTERACTIVITY
   -------------------------------------------------------------------------- */
function initGlobalMap() {
  const cards = document.querySelectorAll('.location-card');

  cards.forEach(card => {
    card.addEventListener('click', () => {
      cards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');
    });
  });
}

/* --------------------------------------------------------------------------
   5. MODAL SYSTEM & FORM HANDLERS
   -------------------------------------------------------------------------- */
function openModal(contextTitle) {
  const modal = document.getElementById('contactModal');
  const modalTitle = document.getElementById('modalTitle');
  if (contextTitle && modalTitle) {
    modalTitle.textContent = contextTitle;
  }
  if (modal) {
    modal.classList.add('active');
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('active');
  }
}

// Button triggers
document.getElementById('getStartedBtn')?.addEventListener('click', () => {
  openModal('Get Started with Thisaiva');
});
document.getElementById('loginBtn')?.addEventListener('click', (e) => {
  e.preventDefault();
  openModal('Thisaiva Investor & VC Portal Login');
});

/* --------------------------------------------------------------------------
   6. FORM SUBMISSIONS & TOAST NOTIFICATIONS
   -------------------------------------------------------------------------- */
function initFormHandlers() {
  const contactForm = document.getElementById('contactForm');
  const newsletterForm = document.getElementById('newsletterForm');

  contactForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    closeModal('contactModal');
    showToast('Thank you! Your inquiry has been sent to our VC team.');
    contactForm.reset();
  });

  newsletterForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    showToast('Subscribed! You will now receive daily VC insights.');
    newsletterForm.reset();
  });
}

function showToast(message) {
  const toast = document.getElementById('toastNotification');
  const toastMsg = document.getElementById('toastMessage');
  
  if (toast && toastMsg) {
    toastMsg.textContent = message;
    toast.classList.add('active');

    setTimeout(() => {
      toast.classList.remove('active');
    }, 4000);
  }
}
