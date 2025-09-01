// main.js - interactions & animations (uses GSAP)
document.addEventListener('DOMContentLoaded', () => {
  // set year
  document.getElementById('year').textContent = new Date().getFullYear();

  // mobile menu
  const ham = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  ham.addEventListener('click', () => {
    const expanded = ham.getAttribute('aria-expanded') === 'true';
    ham.setAttribute('aria-expanded', String(!expanded));
    navLinks.style.display = expanded ? '' : 'flex';
  });

  // contact form mock submit
  window.submitContact = function(e){
    e.preventDefault();
    const fm = document.getElementById('formMessage');
    fm.textContent = "Thanks — message sent (demo). I'll reply to you on email.";
    setTimeout(()=> fm.textContent = "", 5000);
    e.target.reset();
  };

  // animate skill bars on scroll with GSAP
  if (window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);

    gsap.utils.toArray('.bar-fill').forEach(el=>{
      gsap.fromTo(el,{width:0}, {
        width: el.dataset.width || '75%',
        duration: 1.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 80%',
        }
      });
    });

    // fade-in sections
    gsap.utils.toArray('section').forEach(sec=>{
      gsap.from(sec, {
        autoAlpha: 0,
        y: 30,
        duration: 0.9,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sec,
          start: 'top 85%',
        }
      });
    });

    // subtle hero text animation
    gsap.from('.hero-title', {y: -10, autoAlpha: 0, duration: 1, delay: 0.2});
    gsap.from('.hero-sub', {y: -6, autoAlpha: 0, duration: 1, delay: 0.35});
  } else {
    // fallback: simple CSS transition (bars set via inline)
    document.querySelectorAll('.bar-fill').forEach(el=>{
      el.style.width = el.dataset.width || '75%';
    })
  }

  // smooth scroll for nav
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', function(e){
      const href = this.getAttribute('href');
      if(href.startsWith('#')){
        e.preventDefault();
        document.querySelector(href).scrollIntoView({behavior:'smooth', block:'start'});
      }
    });
  });

  // small performance: lazy load avatar image
  const avatar = document.querySelector('.avatar-card img');
  if(avatar) avatar.loading = 'lazy';
});
