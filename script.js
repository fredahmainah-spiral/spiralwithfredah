// ===== MOBILE NAV TOGGLE =====
const navToggle = document.getElementById('navToggle');
const navLinks  = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// Close nav when a link is clicked
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
  });
});

// ===== ACTIVE NAV HIGHLIGHT ON SCROLL =====
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-links a');

function highlightNav() {
  let scrollY = window.scrollY + 80;
  sections.forEach(section => {
    const top    = section.offsetTop;
    const height = section.offsetHeight;
    const id     = section.getAttribute('id');
    if (scrollY >= top && scrollY < top + height) {
      navItems.forEach(a => a.classList.remove('active'));
      const active = document.querySelector(`.nav-links a[href="#${id}"]`);
      if (active) active.classList.add('active');
    }
  });
}
window.addEventListener('scroll', highlightNav, { passive: true });

// ===== CONTACT FORM =====
function handleSubmit(e) {
  e.preventDefault();
  const form    = document.getElementById('contactForm');
  const success = document.getElementById('formSuccess');
  const btn     = form.querySelector('button[type="submit"]');

  const firstName = document.getElementById('firstName').value.trim();
  const lastName  = document.getElementById('lastName').value.trim();
  const email     = document.getElementById('email').value.trim();
  const message   = document.getElementById('message').value.trim();

  // Build mailto link as fallback (no server needed)
  const subject  = encodeURIComponent(`Message from ${firstName} ${lastName} via spiralwithfredah.com`);
  const body     = encodeURIComponent(`Name: ${firstName} ${lastName}\nEmail: ${email}\n\nMessage:\n${message}`);
  const mailto   = `mailto:fredahpersonalcoach@httpspersonalized-life-coaching.com?subject=${subject}&body=${body}`;

  btn.disabled = true;
  btn.textContent = 'Sending...';

  // Open mailto
  window.location.href = mailto;

  setTimeout(() => {
    success.style.display = 'block';
    form.reset();
    btn.disabled = false;
    btn.textContent = 'Submit';
  }, 800);
}

// ===== SCROLL REVEAL (simple fade-in) =====
const revealEls = document.querySelectorAll(
  '.talk-card, .book-card, .testimonial-card, .mission-grid, .about-grid, .coaching-grid'
);

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

revealEls.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});
