document.addEventListener('DOMContentLoaded', () => {
  const yearSpan = document.querySelector('[data-year]');
  if (yearSpan) yearSpan.textContent = new Date().getFullYear();

  const navbar = document.querySelector('.navbar');
  const backToTop = document.querySelector('.back-to-top');
  const updateUIOnScroll = () => {
    const scrolled = window.scrollY > 20;
    if (navbar) navbar.classList.toggle('scrolled', scrolled);
    if (backToTop) backToTop.classList.toggle('show', window.scrollY > 320);
  };
  updateUIOnScroll();
  window.addEventListener('scroll', updateUIOnScroll, { passive: true });

  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  const revealItems = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window && revealItems.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add('revealed'));
  }

  const form = document.querySelector('#contactForm');
  const status = document.querySelector('#formStatus');
  if (form && status) {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      status.innerHTML = '<div class="alert alert-success border-0 mb-0" style="background: rgba(164,137,102,0.12); color: #5b4a38;">Thanks for reaching out. Your enquiry has been captured in this front-end demo. Connect the form to Formspree, Netlify Forms, or your backend to make it fully live.</div>';
      form.reset();
    });
  }
});
