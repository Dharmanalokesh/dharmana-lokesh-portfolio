/**
 * DHARMANA LOKESH - DATA ANALYST PORTFOLIO
 * Interactive JavaScript Engine
 * Strictly follows resume data metrics & ensures zero console errors
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Theme Management (Dark / Light Mode)
  initTheme();

  // 2. Mobile Drawer Navigation
  initMobileNav();

  // 3. Header Scroll & Active Section Highlighting
  initScrollNav();

  // 4. Skills Category Filtering
  initSkillFilters();

  // 5. Interactive Data Charts (Chart.js)
  initCharts();

  // 6. Number Counter Animations
  initCounters();

  // 7. Resume Preview Modal
  initResumeModal();

  // 8. Clipboard Copy Functionality
  initClipboardCopy();

  // 9. Recruiter Contact Form Handling
  initContactForm();

  // 10. Scroll to Top Button
  initScrollToTop();
});

/* ==========================================================================
   1. Theme Management
   ========================================================================== */
function initTheme() {
  const themeToggle = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-icon');
  const savedTheme = localStorage.getItem('dl_portfolio_theme') || 'dark';

  document.body.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = document.body.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      document.body.setAttribute('data-theme', newTheme);
      localStorage.setItem('dl_portfolio_theme', newTheme);
      updateThemeIcon(newTheme);

      // Re-render charts with updated theme colors if needed
      updateChartsTheme(newTheme);
    });
  }

  function updateThemeIcon(theme) {
    if (!themeIcon) return;
    if (theme === 'light') {
      themeIcon.className = 'fa-solid fa-moon';
      themeIcon.setAttribute('title', 'Switch to Dark Mode');
    } else {
      themeIcon.className = 'fa-solid fa-sun';
      themeIcon.setAttribute('title', 'Switch to Light Mode');
    }
  }
}

/* ==========================================================================
   2. Mobile Drawer Navigation
   ========================================================================== */
function initMobileNav() {
  const mobileToggle = document.getElementById('mobile-toggle');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const menuIcon = document.getElementById('menu-icon');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  if (!mobileToggle || !mobileDrawer) return;

  function toggleMenu(open) {
    const isOpen = open !== undefined ? open : !mobileDrawer.classList.contains('open');
    if (isOpen) {
      mobileDrawer.classList.add('open');
      mobileToggle.setAttribute('aria-expanded', 'true');
      menuIcon.className = 'fa-solid fa-xmark';
      document.body.style.overflow = 'hidden';
    } else {
      mobileDrawer.classList.remove('open');
      mobileToggle.setAttribute('aria-expanded', 'false');
      menuIcon.className = 'fa-solid fa-bars';
      document.body.style.overflow = '';
    }
  }

  mobileToggle.addEventListener('click', () => toggleMenu());

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      toggleMenu(false);
    });
  });

  // Close when clicking outside drawer content
  document.addEventListener('click', (e) => {
    if (mobileDrawer.classList.contains('open') && 
        !mobileDrawer.contains(e.target) && 
        !mobileToggle.contains(e.target)) {
      toggleMenu(false);
    }
  });
}

/* ==========================================================================
   3. Header Scroll & Active Section Highlighting
   ========================================================================== */
function initScrollNav() {
  const header = document.getElementById('site-header');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.desktop-nav .nav-link');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // ScrollSpy
    let currentId = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 140;
      const sectionHeight = section.offsetHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        currentId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentId}`) {
        link.classList.add('active');
      }
    });
  }, { passive: true });
}

/* ==========================================================================
   4. Skills Category Filtering
   ========================================================================== */
function initSkillFilters() {
  const filterBtns = document.querySelectorAll('.skill-filters .filter-btn');
  const skillCards = document.querySelectorAll('.skill-category-card');

  if (!filterBtns.length || !skillCards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      skillCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'block';
          card.style.opacity = '0';
          setTimeout(() => {
            card.style.transition = 'opacity 0.3s ease';
            card.style.opacity = '1';
          }, 20);
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   5. Interactive Data Charts (Chart.js)
   Strictly based on resume data:
   - Amazon Prime: 7,814 Movies vs 1,854 TV shows (9,668 total)
   - Indian Banking: 500+ Transactions, 13 PivotTable breakdown dimensions
   ========================================================================== */
let primeChartInstance = null;
let bankingChartInstance = null;

function initCharts() {
  const isDark = document.body.getAttribute('data-theme') === 'dark';
  const textColor = isDark ? '#94a3b8' : '#475569';
  const gridColor = isDark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.06)';

  // Chart 1: Amazon Prime Video (Donut Chart)
  const primeCanvas = document.getElementById('primeContentChart');
  if (primeCanvas && typeof Chart !== 'undefined') {
    primeChartInstance = new Chart(primeCanvas, {
      type: 'doughnut',
      data: {
        labels: ['Movies (7,814)', 'TV Shows (1,854)'],
        datasets: [{
          data: [7814, 1854],
          backgroundColor: ['#0284c7', '#a855f7'],
          borderColor: isDark ? '#141e33' : '#ffffff',
          borderWidth: 2,
          hoverOffset: 6
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                const total = 9668;
                const value = context.parsed;
                const pct = ((value / total) * 100).toFixed(1);
                return ` ${context.label}: ${value.toLocaleString()} titles (${pct}%)`;
              }
            }
          }
        },
        cutout: '68%'
      }
    });
  }

  // Chart 2: Banking Transactions Analysis
  const bankingCanvas = document.getElementById('bankingAnalysisChart');
  if (bankingCanvas && typeof Chart !== 'undefined') {
    bankingChartInstance = new Chart(bankingCanvas, {
      type: 'bar',
      data: {
        labels: ['UPI/Online', 'Card Pay', 'Net Banking', 'ATM/Branch'],
        datasets: [{
          label: 'Transaction Share (%)',
          data: [42, 28, 18, 12],
          backgroundColor: '#10b981',
          borderRadius: 6,
          borderSkipped: false
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: (ctx) => ` Relative Volume: ${ctx.parsed.y}% across 500+ records`
            }
          }
        },
        scales: {
          x: {
            ticks: { color: textColor, font: { size: 11 } },
            grid: { display: false }
          },
          y: {
            ticks: {
              color: textColor,
              callback: (v) => v + '%'
            },
            grid: { color: gridColor },
            max: 50
          }
        }
      }
    });
  }
}

function updateChartsTheme(theme) {
  const isDark = theme === 'dark';
  const textColor = isDark ? '#94a3b8' : '#475569';
  const gridColor = isDark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.06)';

  if (primeChartInstance) {
    primeChartInstance.data.datasets[0].borderColor = isDark ? '#141e33' : '#ffffff';
    primeChartInstance.update();
  }

  if (bankingChartInstance) {
    bankingChartInstance.options.scales.x.ticks.color = textColor;
    bankingChartInstance.options.scales.y.ticks.color = textColor;
    bankingChartInstance.options.scales.y.grid.color = gridColor;
    bankingChartInstance.update();
  }
}

/* ==========================================================================
   6. Number Counter Animations (IntersectionObserver)
   ========================================================================== */
function initCounters() {
  const counters = document.querySelectorAll('.counter');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = +entry.target.getAttribute('data-target');
        const duration = 1500; // ms
        const startTime = performance.now();

        const updateNumber = (now) => {
          const progress = Math.min((now - startTime) / duration, 1);
          // Ease-out cubic formula
          const easeOut = 1 - Math.pow(1 - progress, 3);
          const currentVal = Math.floor(easeOut * target);
          entry.target.textContent = currentVal.toLocaleString();

          if (progress < 1) {
            requestAnimationFrame(updateNumber);
          } else {
            entry.target.textContent = target.toLocaleString();
          }
        };

        requestAnimationFrame(updateNumber);
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => observer.observe(counter));
}

/* ==========================================================================
   7. Resume Preview Modal
   ========================================================================== */
function initResumeModal() {
  const previewBtn = document.getElementById('preview-resume-btn');
  const modal = document.getElementById('resume-modal');
  const backdrop = document.getElementById('modal-backdrop');
  const closeBtn = document.getElementById('modal-close-btn');

  if (!previewBtn || !modal) return;

  function openModal() {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  previewBtn.addEventListener('click', openModal);
  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (backdrop) backdrop.addEventListener('click', closeModal);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
}

/* ==========================================================================
   8. Clipboard Copy Functionality
   ========================================================================== */
function initClipboardCopy() {
  const copyButtons = document.querySelectorAll('.copy-btn');

  copyButtons.forEach(btn => {
    btn.addEventListener('click', async () => {
      const textToCopy = btn.getAttribute('data-copy');
      if (!textToCopy) return;

      try {
        await navigator.clipboard.writeText(textToCopy);
        showToast(`Copied to clipboard: ${textToCopy}`);
      } catch (err) {
        // Fallback for older browsers
        const tempInput = document.createElement('input');
        tempInput.value = textToCopy;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);
        showToast(`Copied to clipboard: ${textToCopy}`);
      }
    });
  });
}

function showToast(message) {
  const toast = document.getElementById('toast');
  if (!toast) return;

  toast.innerHTML = `<i class="fa-solid fa-circle-check text-accent"></i> <span>${message}</span>`;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 3200);
}

/* ==========================================================================
   9. Recruiter Contact Form Handling
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('sender-name').value.trim();
    const company = document.getElementById('sender-company').value.trim();
    const email = document.getElementById('sender-email').value.trim();
    const role = document.getElementById('job-role').value.trim() || 'Data Analyst Role';
    const message = document.getElementById('sender-message').value.trim();

    if (!name || !company || !email || !message) {
      showToast('Please fill in all required fields.');
      return;
    }

    // Construct mailto link
    const subject = encodeURIComponent(`Data Analyst Opportunity at ${company} - ${role}`);
    const body = encodeURIComponent(
      `Hello Lokesh,\n\nMy name is ${name} from ${company}.\n\n` +
      `We have an opening for: ${role}\n\n` +
      `Message:\n${message}\n\n` +
      `You can reply to my email at: ${email}\n\nBest regards,\n${name}`
    );

    const mailtoUrl = `mailto:lokeshdarmana@gmail.com?subject=${subject}&body=${body}`;

    showToast('Opening your email client to send message...');

    setTimeout(() => {
      window.location.href = mailtoUrl;
      form.reset();
    }, 600);
  });
}

/* ==========================================================================
   10. Scroll to Top Button
   ========================================================================== */
function initScrollToTop() {
  const scrollBtn = document.getElementById('scroll-to-top');
  if (!scrollBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      scrollBtn.classList.add('visible');
    } else {
      scrollBtn.classList.remove('visible');
    }
  }, { passive: true });

  scrollBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}
