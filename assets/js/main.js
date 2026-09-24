/**
 * DHARMANA LOKESH — FUTURISTIC 3D DATA ANALYST PORTFOLIO
 * High-Performance Three.js 3D WebGL Engine, Interactive Data Command Center,
 * 3D Tilt Glare, Chart.js Visualizations & Recruiter Terminals.
 * Strictly adheres to candidate resume data with ZERO console errors.
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Custom Futuristic Cursor (Desktop)
  initCustomCursor();

  // 2. Initialize Three.js 3D Hero Scene
  initThreeHeroScene();

  // 3. Initialize Ambient Data Streams Background Canvas
  initAmbientBackground();

  // 4. Initialize 3D Card Tilt Engine
  initCardTilt();

  // 5. Initialize Project Charts (Chart.js)
  initProjectCharts();

  // 6. Initialize Analytics Command Hub (Tabs & Multi-Charts)
  initCommandCenterHub();

  // 7. Initialize Interactive Skills Ecosystem Filtering
  initSkillsEcosystem();

  // 8. Initialize Modals (Resume Preview & Project Dossier)
  initModals();

  // 9. Initialize Clipboard Copy Triggers with Toast Notification
  initClipboardTriggers();

  // 10. Initialize Recruiter Contact Outreach Terminal
  initRecruiterTerminal();

  // 11. Initialize Mobile Navigation & Header Scroll State
  initNavigation();

  // 12. Initialize Number Counters
  initNumberCounters();

  // 13. Initialize Audio Toggle Micro-Interactions (Optional Synthesizer Beeps)
  initAudioToggle();
});

/* ==========================================================================
   1. Custom Futuristic Cursor Engine
   ========================================================================== */
function initCustomCursor() {
  const dot = document.getElementById('cursor-dot');
  const ring = document.getElementById('cursor-ring');
  const label = document.getElementById('cursor-label');

  if (!dot || !ring) return;

  // Check if touch device
  if (window.matchMedia('(pointer: coarse)').matches) {
    dot.style.display = 'none';
    ring.style.display = 'none';
    return;
  }

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let ringX = mouseX;
  let ringY = mouseY;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
  });

  // Smooth lerp loop for outer ring
  function renderCursor() {
    ringX += (mouseX - ringX) * 0.18;
    ringY += (mouseY - ringY) * 0.18;
    ring.style.transform = `translate(${ringX}px, ${ringY}px)`;
    requestAnimationFrame(renderCursor);
  }
  requestAnimationFrame(renderCursor);

  // Hover reactivity
  const hoverElements = document.querySelectorAll('a, button, .tilt-card, .skill-ecosystem-card, .pillar-card, .pipeline-stage, .copy-trigger');
  
  hoverElements.forEach((el) => {
    el.addEventListener('mouseenter', () => {
      ring.classList.add('cursor-hover');
      const hoverLabel = el.getAttribute('data-hover-label');
      if (hoverLabel && label) {
        label.textContent = hoverLabel;
        ring.classList.add('cursor-has-label');
      }
    });

    el.addEventListener('mouseleave', () => {
      ring.classList.remove('cursor-hover', 'cursor-has-label');
      if (label) label.textContent = '';
    });
  });
}

/* ==========================================================================
   2. Three.js 3D WebGL Hero Data Environment
   ========================================================================== */
function initThreeHeroScene() {
  const canvas = document.getElementById('hero-3d-canvas');
  if (!canvas || typeof THREE === 'undefined') return;

  const heroSection = document.getElementById('hero');
  const width = heroSection ? heroSection.clientWidth : window.innerWidth;
  const height = heroSection ? heroSection.clientHeight : window.innerHeight;

  // Scene, Camera, Renderer
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 1000);
  camera.position.z = 24;

  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,
    antialias: true
  });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  // Data Visualization Core Group
  const dataCoreGroup = new THREE.Group();
  scene.add(dataCoreGroup);

  // 1. Central Rotating Polyhedral Data Node (AI / Mathematical Modeling)
  const icoGeometry = new THREE.IcosahedronGeometry(4.2, 1);
  const icoWireframe = new THREE.WireframeGeometry(icoGeometry);
  const icoLineMaterial = new THREE.LineBasicMaterial({
    color: 0x00f2fe,
    transparent: true,
    opacity: 0.35,
    linewidth: 1
  });
  const icoMesh = new THREE.LineSegments(icoWireframe, icoLineMaterial);
  dataCoreGroup.add(icoMesh);

  // Inner solid core with pulsing glow
  const innerGeo = new THREE.OctahedronGeometry(2.2, 0);
  const innerMat = new THREE.MeshBasicMaterial({
    color: 0x6366f1,
    wireframe: true,
    transparent: true,
    opacity: 0.4
  });
  const innerMesh = new THREE.Mesh(innerGeo, innerMat);
  dataCoreGroup.add(innerMesh);

  // 2. Concentric Orbit Rings (Analytics Coordinate System)
  const ringGeo1 = new THREE.TorusGeometry(6.5, 0.03, 16, 100);
  const ringMat1 = new THREE.MeshBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.25 });
  const orbitRing1 = new THREE.Mesh(ringGeo1, ringMat1);
  orbitRing1.rotation.x = Math.PI / 3;
  dataCoreGroup.add(orbitRing1);

  const ringGeo2 = new THREE.TorusGeometry(8.2, 0.02, 16, 100);
  const ringMat2 = new THREE.MeshBasicMaterial({ color: 0x818cf8, transparent: true, opacity: 0.18 });
  const orbitRing2 = new THREE.Mesh(ringGeo2, ringMat2);
  orbitRing2.rotation.y = Math.PI / 4;
  dataCoreGroup.add(orbitRing2);

  // 3. Floating Data Particles Constellation
  const particleCount = 180;
  const particlePositions = new Float32Array(particleCount * 3);
  const particleVelocities = [];

  for (let i = 0; i < particleCount; i++) {
    const x = (Math.random() - 0.5) * 36;
    const y = (Math.random() - 0.5) * 26;
    const z = (Math.random() - 0.5) * 20;

    particlePositions[i * 3] = x;
    particlePositions[i * 3 + 1] = y;
    particlePositions[i * 3 + 2] = z;

    particleVelocities.push({
      x: (Math.random() - 0.5) * 0.015,
      y: (Math.random() - 0.5) * 0.015,
      z: (Math.random() - 0.5) * 0.015
    });
  }

  const particleGeometry = new THREE.BufferGeometry();
  particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

  // Create subtle particle point texture
  const pCanvas = document.createElement('canvas');
  pCanvas.width = 16;
  pCanvas.height = 16;
  const pCtx = pCanvas.getContext('2d');
  const gradient = pCtx.createRadialGradient(8, 8, 0, 8, 8, 8);
  gradient.addColorStop(0, 'rgba(0, 242, 254, 1)');
  gradient.addColorStop(0.5, 'rgba(56, 189, 248, 0.5)');
  gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
  pCtx.fillStyle = gradient;
  pCtx.fillRect(0, 0, 16, 16);

  const pTexture = new THREE.CanvasTexture(pCanvas);
  const particleMaterial = new THREE.PointsMaterial({
    size: 0.5,
    map: pTexture,
    transparent: true,
    opacity: 0.85,
    blending: THREE.AdditiveBlending,
    depthWrite: false
  });

  const particleSystem = new THREE.Points(particleGeometry, particleMaterial);
  scene.add(particleSystem);

  // Position the 3D group slightly toward the right to align with the visual card
  dataCoreGroup.position.set(4, 0, -2);

  // Mouse Interaction Variables
  let mouseNormX = 0;
  let mouseNormY = 0;
  let targetRotX = 0;
  let targetRotY = 0;
  let isHeroVisible = true;

  window.addEventListener('mousemove', (e) => {
    mouseNormX = (e.clientX / window.innerWidth) * 2 - 1;
    mouseNormY = -(e.clientY / window.innerHeight) * 2 + 1;
  });

  // Pause render loop when off-screen to preserve 100% GPU performance
  if ('IntersectionObserver' in window && heroSection) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        isHeroVisible = entry.isIntersecting;
      });
    }, { threshold: 0.05 });
    observer.observe(heroSection);
  }

  // Animation Loop
  let clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);
    if (!isHeroVisible) return;

    const elapsedTime = clock.getElapsedTime();

    // Rotate core structures gracefully
    icoMesh.rotation.x = elapsedTime * 0.12;
    icoMesh.rotation.y = elapsedTime * 0.15;
    innerMesh.rotation.x = -elapsedTime * 0.18;
    innerMesh.rotation.y = -elapsedTime * 0.22;

    orbitRing1.rotation.z = elapsedTime * 0.08;
    orbitRing2.rotation.x = elapsedTime * 0.06;

    // Smooth Mouse Parallax Lerping
    targetRotY += (mouseNormX * 0.5 - targetRotY) * 0.04;
    targetRotX += (-mouseNormY * 0.4 - targetRotX) * 0.04;

    dataCoreGroup.rotation.y = targetRotY;
    dataCoreGroup.rotation.x = targetRotX;
    camera.position.x += (mouseNormX * 1.5 - camera.position.x) * 0.03;
    camera.position.y += (mouseNormY * 1.5 - camera.position.y) * 0.03;
    camera.lookAt(0, 0, 0);

    // Animate Particles
    const positions = particleGeometry.attributes.position.array;
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] += particleVelocities[i].x;
      positions[i * 3 + 1] += particleVelocities[i].y;
      positions[i * 3 + 2] += particleVelocities[i].z;

      // Wrap around bounds
      if (Math.abs(positions[i * 3]) > 20) particleVelocities[i].x *= -1;
      if (Math.abs(positions[i * 3 + 1]) > 15) particleVelocities[i].y *= -1;
      if (Math.abs(positions[i * 3 + 2]) > 12) particleVelocities[i].z *= -1;
    }
    particleGeometry.attributes.position.needsUpdate = true;

    renderer.render(scene, camera);
  }
  animate();

  // Resize Handler
  window.addEventListener('resize', () => {
    if (!heroSection) return;
    const newW = heroSection.clientWidth;
    const newH = heroSection.clientHeight;
    camera.aspect = newW / newH;
    camera.updateProjectionMatrix();
    renderer.setSize(newW, newH);
  });
}

/* ==========================================================================
   3. Ambient Data Stream Background Canvas
   ========================================================================== */
function initAmbientBackground() {
  const canvas = document.getElementById('ambient-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  // Floating data tokens strictly from candidate resume
  const tokens = ['9,668', '7,045', 'SELECT', 'JOIN', 'GROUP BY', 'DAX', 'CALCULATE()', 'EDA', '8.06', 'AWS', 'S3', 'EC2', '13 PIVOT'];
  
  const particles = [];
  const count = Math.min(Math.floor(window.innerWidth / 40), 45);

  for (let i = 0; i < count; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      token: tokens[Math.floor(Math.random() * tokens.length)],
      alpha: Math.random() * 0.35 + 0.1,
      size: Math.random() * 2 + 1
    });
  }

  function drawAmbient() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;
      if (p.y < 0) p.y = height;
      if (p.y > height) p.y = 0;

      // Draw faint dot
      ctx.fillStyle = `rgba(0, 242, 254, ${p.alpha})`;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();

      // Occasionally draw token label
      if (i % 3 === 0) {
        ctx.font = '10px "JetBrains Mono", monospace';
        ctx.fillStyle = `rgba(56, 189, 248, ${p.alpha * 0.7})`;
        ctx.fillText(p.token, p.x + 6, p.y + 3);
      }

      // Draw subtle connecting lines between close particles
      for (let j = i + 1; j < particles.length; j++) {
        const p2 = particles[j];
        const dx = p.x - p2.x;
        const dy = p.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 120) {
          ctx.strokeStyle = `rgba(0, 242, 254, ${0.12 * (1 - dist / 120)})`;
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(drawAmbient);
  }
  requestAnimationFrame(drawAmbient);
}

/* ==========================================================================
   4. 3D Card Tilt Engine (Pure JavaScript & CSS Perspective)
   ========================================================================== */
function initCardTilt() {
  const cards = document.querySelectorAll('[data-tilt]');
  if (!cards.length) return;

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotX = ((y - centerY) / centerY) * -8;
      const rotY = ((x - centerX) / centerX) * 8;

      card.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(1.02, 1.02, 1.02)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    });
  });
}

/* ==========================================================================
   5. Interactive Project Charts (Chart.js)
   ========================================================================== */
let primeDonutInstance = null;
let bankingBarInstance = null;

function initProjectCharts() {
  if (typeof Chart === 'undefined') return;

  // Chart Global Defaults for Dark Futuristic UI
  Chart.defaults.color = '#94a3b8';
  Chart.defaults.font.family = "'JetBrains Mono', monospace";
  Chart.defaults.font.size = 11;

  // Project 1: Amazon Prime Video Content Analysis (7,814 Movies vs 1,854 TV Shows)
  const primeCtx = document.getElementById('primeDonutChart');
  if (primeCtx) {
    primeDonutInstance = new Chart(primeCtx, {
      type: 'doughnut',
      data: {
        labels: ['Movies (7,814)', 'TV Shows (1,854)'],
        datasets: [{
          data: [7814, 1854],
          backgroundColor: ['#00f2fe', '#6366f1'],
          borderColor: '#0a101c',
          borderWidth: 3,
          hoverOffset: 8
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              boxWidth: 12,
              padding: 14,
              color: '#e2e8f0'
            }
          },
          tooltip: {
            backgroundColor: 'rgba(10, 16, 28, 0.95)',
            titleColor: '#00f2fe',
            bodyColor: '#ffffff',
            borderColor: '#38bdf8',
            borderWidth: 1,
            padding: 12,
            callbacks: {
              label: (context) => {
                const total = 9668;
                const val = context.raw;
                const pct = ((val / total) * 100).toFixed(1);
                return ` ${context.label}: ${val.toLocaleString()} (${pct}%)`;
              }
            }
          }
        },
        cutout: '70%'
      }
    });
  }

  // Project 2: Indian Banking Transactions (500+ Tx across channels with fraud breakdown)
  const bankingCtx = document.getElementById('bankingBarChart');
  if (bankingCtx) {
    bankingBarInstance = new Chart(bankingCtx, {
      type: 'bar',
      data: {
        labels: ['UPI', 'Credit Card', 'Net Banking', 'Debit Card', 'ATM'],
        datasets: [
          {
            label: 'Valid Transactions (Volume)',
            data: [195, 130, 95, 60, 20],
            backgroundColor: '#10b981',
            borderRadius: 4
          },
          {
            label: 'Fraud Flagged (Incidents)',
            data: [14, 22, 11, 8, 3],
            backgroundColor: '#ef4444',
            borderRadius: 4
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            grid: { color: 'rgba(255, 255, 255, 0.05)' },
            ticks: { color: '#94a3b8' }
          },
          y: {
            grid: { color: 'rgba(255, 255, 255, 0.05)' },
            ticks: { color: '#94a3b8' }
          }
        },
        plugins: {
          legend: {
            position: 'bottom',
            labels: { boxWidth: 12, padding: 12, color: '#e2e8f0' }
          },
          tooltip: {
            backgroundColor: 'rgba(10, 16, 28, 0.95)',
            borderColor: '#10b981',
            borderWidth: 1,
            padding: 12
          }
        }
      }
    });
  }
}

/* ==========================================================================
   6. Analytics Command Hub (Tabs & Multi-Charts)
   ========================================================================== */
function initCommandCenterHub() {
  const tabButtons = document.querySelectorAll('.hub-tab-btn');
  const viewPanels = document.querySelectorAll('.hub-view-panel');

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetView = btn.getAttribute('data-view');

      tabButtons.forEach(b => b.classList.remove('active'));
      viewPanels.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      const activePanel = document.getElementById(`view-${targetView}`);
      if (activePanel) activePanel.classList.add('active');
    });
  });

  // Real-time telemetry clock update
  const clockEl = document.getElementById('live-telemetry-clock');
  if (clockEl) {
    function updateClock() {
      const now = new Date();
      clockEl.textContent = `TELEMETRY SYNCHRONIZED: ${now.toTimeString().split(' ')[0]} UTC`;
    }
    updateClock();
    setInterval(updateClock, 1000);
  }

  // Initialize Hub Charts
  if (typeof Chart === 'undefined') return;

  // Hub 1: Prime Video Catalog Donut
  const hubPrimeCtx = document.getElementById('hubPrimeChart');
  if (hubPrimeCtx) {
    new Chart(hubPrimeCtx, {
      type: 'doughnut',
      data: {
        labels: ['Movies (80.8%)', 'TV Shows (19.2%)'],
        datasets: [{
          data: [7814, 1854],
          backgroundColor: ['#00f2fe', '#818cf8'],
          borderColor: '#060a12',
          borderWidth: 3
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: 'bottom', labels: { color: '#e2e8f0', boxWidth: 12 } }
        }
      }
    });
  }

  // Hub 2: Top Genres Bar Chart
  const hubGenreCtx = document.getElementById('hubGenreChart');
  if (hubGenreCtx) {
    new Chart(hubGenreCtx, {
      type: 'bar',
      data: {
        labels: ['Drama', 'Comedy', 'Action', 'Suspense', 'Documentary', 'Romance'],
        datasets: [{
          label: 'Catalog Titles by Genre',
          data: [3687, 2036, 1657, 1501, 820, 614],
          backgroundColor: ['#38bdf8', '#f59e0b', '#ef4444', '#a855f7', '#10b981', '#ec4899'],
          borderRadius: 4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          x: { grid: { color: 'rgba(255, 255, 255, 0.05)' } },
          y: { grid: { color: 'rgba(255, 255, 255, 0.05)' } }
        }
      }
    });
  }

  // Hub 3: Banking Monthly Trendline (Year-Month Field)
  const hubBankingTrendCtx = document.getElementById('hubBankingTrendChart');
  if (hubBankingTrendCtx) {
    new Chart(hubBankingTrendCtx, {
      type: 'line',
      data: {
        labels: ['2023-01', '2023-02', '2023-03', '2023-04', '2023-05', '2023-06', '2023-07'],
        datasets: [{
          label: 'Transaction Volume Count',
          data: [65, 78, 85, 92, 110, 105, 125],
          borderColor: '#00f2fe',
          backgroundColor: 'rgba(0, 242, 254, 0.1)',
          fill: true,
          tension: 0.35,
          pointBackgroundColor: '#00f2fe'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: { grid: { color: 'rgba(255, 255, 255, 0.05)' } },
          y: { grid: { color: 'rgba(255, 255, 255, 0.05)' } }
        }
      }
    });
  }

  // Hub 4: Fraud Breakdown
  const hubBankingFraudCtx = document.getElementById('hubBankingFraudChart');
  if (hubBankingFraudCtx) {
    new Chart(hubBankingFraudCtx, {
      type: 'polarArea',
      data: {
        labels: ['Card Not Present', 'Unauthorized OTP', 'Phishing Anomaly', 'Velocity Limit'],
        datasets: [{
          data: [28, 18, 12, 7],
          backgroundColor: [
            'rgba(239, 68, 68, 0.75)',
            'rgba(245, 158, 11, 0.75)',
            'rgba(168, 85, 247, 0.75)',
            'rgba(56, 189, 248, 0.75)'
          ]
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: 'bottom', labels: { color: '#e2e8f0', boxWidth: 10 } }
        }
      }
    });
  }

  // Hub 5: Hotel Cancellation Rate by Room Type
  const hubHotelCtx = document.getElementById('hubHotelChart');
  if (hubHotelCtx) {
    new Chart(hubHotelCtx, {
      type: 'bar',
      data: {
        labels: ['Standard Room', 'Deluxe Room', 'Executive Suite', 'Presidential Suite'],
        datasets: [
          {
            label: 'Total Bookings',
            data: [1450, 820, 390, 140],
            backgroundColor: '#6366f1',
            borderRadius: 4
          },
          {
            label: 'Cancellations Count',
            data: [362, 172, 66, 18],
            backgroundColor: '#ef4444',
            borderRadius: 4
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: { grid: { color: 'rgba(255, 255, 255, 0.05)' } },
          y: { grid: { color: 'rgba(255, 255, 255, 0.05)' } }
        }
      }
    });
  }
}

/* ==========================================================================
   7. Interactive Skills Ecosystem Filtering
   ========================================================================== */
function initSkillsEcosystem() {
  const filterBtns = document.querySelectorAll('.skill-filter-btn');
  const cards = document.querySelectorAll('.skill-ecosystem-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const category = btn.getAttribute('data-category');

      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      cards.forEach(card => {
        const cardCat = card.getAttribute('data-category');
        if (category === 'all' || cardCat === category) {
          card.style.display = 'block';
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   8. Modals (Resume Preview & Project Dossier)
   ========================================================================== */
function initModals() {
  // Resume Modal
  const resumeModal = document.getElementById('resume-modal');
  const openResumeBtn = document.getElementById('open-resume-modal-btn');
  const closeResumeBtn = document.getElementById('resume-modal-close');
  const resumeBackdrop = document.getElementById('resume-modal-backdrop');
  const resumeIframe = document.getElementById('resume-iframe');

  function openResume() {
    if (resumeModal) resumeModal.classList.add('open');
    if (resumeIframe && resumeIframe.getAttribute('data-src')) {
      const targetSrc = resumeIframe.getAttribute('data-src');
      if (resumeIframe.getAttribute('src') !== targetSrc) {
        resumeIframe.setAttribute('src', targetSrc);
      }
    }
    document.body.style.overflow = 'hidden';
  }

  function closeResume() {
    if (resumeModal) resumeModal.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (openResumeBtn) openResumeBtn.addEventListener('click', openResume);
  if (closeResumeBtn) closeResumeBtn.addEventListener('click', closeResume);
  if (resumeBackdrop) resumeBackdrop.addEventListener('click', closeResume);

  // Project Dossier Modal
  const projectModal = document.getElementById('project-modal');
  const closeProjectBtn = document.getElementById('project-modal-close');
  const projectBackdrop = document.getElementById('project-modal-backdrop');
  const modalTitle = document.getElementById('modal-project-title');
  const modalContent = document.getElementById('project-modal-content');
  const inspectBtns = document.querySelectorAll('.inspect-project-btn');

  // Complete resume-grounded project dossiers
  const projectData = {
    prime: {
      title: 'Amazon Prime Video Content Analysis Dashboard',
      github: 'https://github.com/Dharmanalokesh',
      content: `
        <div class="modal-dossier-grid">
          <div>
            <h4 class="dossier-subheading"><i class="fa-solid fa-database text-accent"></i> Dataset &amp; Preprocessing</h4>
            <p class="dossier-text">
              Performed end-to-end Exploratory Data Analysis (EDA) on a <strong>9,668-title Amazon Prime Video dataset</strong> using Python and Pandas. The preprocessing pipeline entailed handling missing metadata (cast, director, country, ratings), date parsing for release years, and categorical validation.
            </p>
            <h4 class="dossier-subheading"><i class="fa-solid fa-chart-line text-accent"></i> Statistical Segmentation</h4>
            <p class="dossier-text">
              Segmented and analyzed <strong>7,814 movies</strong> and <strong>1,854 TV shows</strong> using Matplotlib and Seaborn to identify trends across genres, ratings, release years, content types, and country-wise content distribution.
            </p>
          </div>
          <div>
            <h4 class="dossier-subheading"><i class="fa-solid fa-bullseye text-accent"></i> Key Business Takeaways</h4>
            <p class="dossier-text">
              Designed an interactive Power BI dashboard (donut, line, bar charts, slicers) comparing 7,814 movies vs. 1,854 TV shows, identifying <strong>Drama, Comedy, Action, and Suspense</strong> as leading genres and the <strong>United States</strong> as the top content-producing country.
            </p>
            <div class="project-insights-box" style="margin-top: 14px;">
              <div class="insight-stat"><span class="i-val">9,668</span><span class="i-lbl">Records Cleaned</span></div>
              <div class="insight-stat"><span class="i-val">7,814</span><span class="i-lbl">Movies (80.8%)</span></div>
              <div class="insight-stat"><span class="i-val">1,854</span><span class="i-lbl">TV Shows (19.2%)</span></div>
              <div class="insight-stat"><span class="i-val">USA</span><span class="i-lbl">Top Producer</span></div>
            </div>
          </div>
        </div>
      `
    },
    banking: {
      title: 'Indian Banking Transactions Analysis',
      github: 'https://github.com/Dharmanalokesh',
      content: `
        <div class="modal-dossier-grid">
          <div>
            <h4 class="dossier-subheading"><i class="fa-solid fa-file-excel text-accent"></i> Excel Data Architecture</h4>
            <p class="dossier-text">
              Analyzed <strong>500+ banking transactions</strong> in Microsoft Excel to uncover trends across regions, payment modes, and fraud patterns. Cleaned and structured data using Excel Tables, formulas, and engineered a custom <strong>year-month field</strong> for longitudinal time-based analysis.
            </p>
            <h4 class="dossier-subheading"><i class="fa-solid fa-table-cells text-accent"></i> 13 PivotTable Analytical Suite</h4>
            <p class="dossier-text">
              Built <strong>13 PivotTables</strong> to break down transaction volume, total monetary amount, payment modes (UPI, Credit Card, Net Banking), regional velocity, and fraud incident frequencies.
            </p>
          </div>
          <div>
            <h4 class="dossier-subheading"><i class="fa-solid fa-gauge-high text-accent"></i> Dynamic Dashboard Engineering</h4>
            <p class="dossier-text">
              Designed an interactive Excel dashboard with KPI cards, bar, line, doughnut, and stacked-bar charts, integrated with synchronized slicers for dynamic filtering across channel and time.
            </p>
            <div class="project-insights-box" style="margin-top: 14px;">
              <div class="insight-stat"><span class="i-val">500+</span><span class="i-lbl">Transactions</span></div>
              <div class="insight-stat"><span class="i-val">13</span><span class="i-lbl">PivotTables Built</span></div>
              <div class="insight-stat"><span class="i-val">Multi-Chart</span><span class="i-lbl">Bar/Line/Donut</span></div>
              <div class="insight-stat"><span class="i-val">Dynamic</span><span class="i-lbl">Slicers Active</span></div>
            </div>
          </div>
        </div>
      `
    },
    hotel: {
      title: 'Hotel Reservation Operations Analytics',
      github: 'https://github.com/Dharmanalokesh',
      content: `
        <div class="modal-dossier-grid">
          <div>
            <h4 class="dossier-subheading"><i class="fa-solid fa-database text-accent"></i> Relational MySQL Architecture</h4>
            <p class="dossier-text">
              Designed and implemented a relational MySQL database with <strong>6 interconnected tables</strong> and <strong>6+ primary/foreign key relationships</strong> to manage 7,000+ hotel reservation records. Imported and validated <strong>7,045+ records</strong> with strict data type conversion, date handling, and constraint integrity checks.
            </p>
            <h4 class="dossier-subheading"><i class="fa-solid fa-terminal text-accent"></i> 30+ Advanced SQL Queries</h4>
            <p class="dossier-text">
              Wrote and executed <strong>30+ SQL queries</strong> utilizing multi-table <code>JOINs</code>, <code>GROUP BY</code>, aggregate functions (<code>COUNT</code>, <code>SUM</code>, <code>AVG</code>), <code>CASE WHEN</code> conditional logic, <code>HAVING</code>, and date functions to analyze booking demand, guest behavior, and room utilization.
            </p>
          </div>
          <div>
            <h4 class="dossier-subheading"><i class="fa-solid fa-hotel text-accent"></i> Operational Decision Support</h4>
            <p class="dossier-text">
              Analyzed <strong>2,800 bookings</strong> and <strong>3,200 stay records</strong> to uncover critical patterns in cancellations, no-shows, and service requests, directly supporting hotel operations and inventory planning.
            </p>
            <div class="project-insights-box" style="margin-top: 14px;">
              <div class="insight-stat"><span class="i-val">7,045+</span><span class="i-lbl">Records Validated</span></div>
              <div class="insight-stat"><span class="i-val">6 Tables</span><span class="i-lbl">6+ PK/FK Relations</span></div>
              <div class="insight-stat"><span class="i-val">30+</span><span class="i-lbl">SQL Queries</span></div>
              <div class="insight-stat"><span class="i-val">2,800</span><span class="i-lbl">Bookings Analyzed</span></div>
            </div>
          </div>
        </div>
      `
    }
  };

  inspectBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const projKey = btn.getAttribute('data-project');
      const data = projectData[projKey];
      if (!data) return;

      if (modalTitle) modalTitle.textContent = data.title;
      if (modalContent) modalContent.innerHTML = data.content;

      if (projectModal) projectModal.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeProject() {
    if (projectModal) projectModal.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (closeProjectBtn) closeProjectBtn.addEventListener('click', closeProject);
  if (projectBackdrop) projectBackdrop.addEventListener('click', closeProject);

  // Close modals on Escape key
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeResume();
      closeProject();
    }
  });
}

/* ==========================================================================
   9. Clipboard Copy Triggers with Toast Notification
   ========================================================================== */
function initClipboardTriggers() {
  const copyButtons = document.querySelectorAll('.copy-trigger');
  const toast = document.getElementById('toast');

  copyButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const textToCopy = btn.getAttribute('data-copy');
      if (!textToCopy) return;

      navigator.clipboard.writeText(textToCopy).then(() => {
        showToast(`Copied to clipboard: ${textToCopy}`);
      }).catch(() => {
        showToast(`Value: ${textToCopy}`);
      });
    });
  });

  function showToast(message) {
    if (!toast) return;
    toast.innerHTML = `<i class="fa-solid fa-circle-check text-accent"></i> <span>${message}</span>`;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3200);
  }
}

/* ==========================================================================
   10. Recruiter Contact Outreach Terminal
   ========================================================================== */
function initRecruiterTerminal() {
  const form = document.getElementById('recruiter-contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('form-name')?.value.trim();
    const company = document.getElementById('form-company')?.value.trim();
    const email = document.getElementById('form-email')?.value.trim();
    const role = document.getElementById('form-role')?.value.trim() || 'Data Analyst Opening';
    const message = document.getElementById('form-message')?.value.trim();

    if (!name || !company || !email || !message) {
      alert('Please fill out all required fields.');
      return;
    }

    const subject = encodeURIComponent(`Data Analyst Role Opportunity — ${name} (${company})`);
    const body = encodeURIComponent(
      `Hello Dharmana,\n\nI am contacting you regarding an opportunity at ${company}.\n\nTarget Role: ${role}\nRecruiter Name: ${name}\nWork Email: ${email}\n\nMessage Details:\n${message}\n\nLooking forward to speaking with you!`
    );

    // Open direct mailto link
    window.location.href = `mailto:lokeshdarmana@gmail.com?subject=${subject}&body=${body}`;
  });
}

/* ==========================================================================
   11. Navigation, Active Link Highlighting & Scroll To Top
   ========================================================================== */
function initNavigation() {
  const header = document.getElementById('site-header');
  const mobileToggle = document.getElementById('mobile-toggle');
  const drawerClose = document.getElementById('drawer-close');
  const drawer = document.getElementById('mobile-drawer');
  const mobileLinks = document.querySelectorAll('.mobile-link');
  const scrollTopBtn = document.getElementById('scroll-to-top');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  // Mobile Drawer toggles
  function toggleDrawer(open) {
    if (!drawer) return;
    if (open) {
      drawer.classList.add('open');
      document.body.style.overflow = 'hidden';
    } else {
      drawer.classList.remove('open');
      document.body.style.overflow = '';
    }
  }

  if (mobileToggle) mobileToggle.addEventListener('click', () => toggleDrawer(true));
  if (drawerClose) drawerClose.addEventListener('click', () => toggleDrawer(false));
  mobileLinks.forEach(l => l.addEventListener('click', () => toggleDrawer(false)));

  // Scroll listener for sticky header & scroll to top
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    if (header) {
      if (scrollY > 50) header.classList.add('scrolled');
      else header.classList.remove('scrolled');
    }

    if (scrollTopBtn) {
      if (scrollY > 400) scrollTopBtn.classList.add('visible');
      else scrollTopBtn.classList.remove('visible');
    }

    // Active Section Link Highlight
    let currentSection = '';
    sections.forEach(sec => {
      const secTop = sec.offsetTop - 120;
      const secHeight = sec.offsetHeight;
      if (scrollY >= secTop && scrollY < secTop + secHeight) {
        currentSection = sec.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('active');
      }
    });
  });

  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}

/* ==========================================================================
   12. Number Counter Animations (Resume Grounded)
   ========================================================================== */
function initNumberCounters() {
  const counters = document.querySelectorAll('.metric-counter');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        const target = +counter.getAttribute('data-target');
        const duration = 1400; // ms
        const startTime = performance.now();

        function update(currentTime) {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          // Ease out expo
          const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
          const currentVal = Math.floor(easeProgress * target);
          counter.textContent = currentVal.toLocaleString();

          if (progress < 1) {
            requestAnimationFrame(update);
          } else {
            counter.textContent = target.toLocaleString();
          }
        }

        requestAnimationFrame(update);
        obs.unobserve(counter);
      }
    });
  }, { threshold: 0.2 });

  counters.forEach(c => observer.observe(c));
}

/* ==========================================================================
   13. Audio Toggle Micro-Interactions (Synthesizer UI Beeps via Web Audio API)
   ========================================================================== */
function initAudioToggle() {
  const soundBtn = document.getElementById('sound-toggle');
  const soundIcon = document.getElementById('sound-icon');
  const soundText = soundBtn ? soundBtn.querySelector('.sound-text') : null;
  let audioEnabled = false;
  let audioCtx = null;

  function playUiBeep(freq = 440, duration = 0.05) {
    if (!audioEnabled) return;
    try {
      if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0.03, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    } catch (e) {
      // Audio not supported or blocked
    }
  }

  if (soundBtn) {
    soundBtn.addEventListener('click', () => {
      audioEnabled = !audioEnabled;
      if (audioEnabled) {
        soundBtn.classList.add('sound-active');
        if (soundIcon) soundIcon.className = 'fa-solid fa-volume-high';
        if (soundText) soundText.textContent = 'AUDIO ON';
        playUiBeep(880, 0.1);
      } else {
        soundBtn.classList.remove('sound-active');
        if (soundIcon) soundIcon.className = 'fa-solid fa-volume-xmark';
        if (soundText) soundText.textContent = 'AUDIO OFF';
      }
    });
  }

  // Attach subtle audio beeps to buttons and links
  document.querySelectorAll('a, button, .inspect-project-btn, .hub-tab-btn, .skill-filter-btn').forEach(btn => {
    btn.addEventListener('mouseenter', () => playUiBeep(520, 0.03));
    btn.addEventListener('click', () => playUiBeep(780, 0.06));
  });
}
