// ─── Nav scroll shadow ───
function initNavScrollShadow() {
  const nav = document.getElementById('nav');
  addEventListener('scroll', () => nav.classList.toggle('scrolled', scrollY > 20));
}

// ─── Mobile burger menu ───
function initMobileNav() {
  const burger = document.getElementById('burger');
  const navLinks = document.getElementById('navLinks');

  const setOpen = open => {
    navLinks.classList.toggle('open', open);
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  };

  burger.addEventListener('click', () => setOpen(!navLinks.classList.contains('open')));
  navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setOpen(false)));
}

// ─── Scroll-reveal animations ───
function initScrollReveal() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in'); });
  }, { threshold: 0.1, rootMargin: '0px 0px -36px 0px' });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

// ─── Active nav link — one observer watching all sections ───
function initActiveNavLink() {
  const navLinks = document.getElementById('navLinks');
  const sections = document.querySelectorAll('section[id]');
  const navAnchors = navLinks.querySelectorAll('a[href^="#"]');

  const navObserver = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        navAnchors.forEach(a => {
          a.classList.toggle('active', a.getAttribute('href') === '#' + e.target.id);
        });
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(s => navObserver.observe(s));
}

// ─── Contact form — hands off to the visitor's email client via mailto ───
function initContactForm() {
  const form = document.getElementById('cForm');
  form.addEventListener('submit', e => {
    e.preventDefault();
    const firstName = form.firstName.value.trim();
    const lastName = form.lastName.value.trim();
    const email = form.email.value.trim();
    const subject = form.subject.value.trim() || 'Portfolio Contact Form';
    const message = form.message.value.trim();

    const body = `Name: ${firstName} ${lastName}\nEmail: ${email}\n\n${message}`;
    const mailto = `mailto:segunetomu@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    window.location.href = mailto;

    form.querySelector('.form-btn').style.display = 'none';
    document.getElementById('formOk').style.display = 'flex';
    form.reset();
  });
}

// ─── Footer year — stays correct without manual edits ───
function initFooterYear() {
  document.getElementById('year').textContent = new Date().getFullYear();
}

initNavScrollShadow();
initMobileNav();
initScrollReveal();
initActiveNavLink();
initContactForm();
initFooterYear();
