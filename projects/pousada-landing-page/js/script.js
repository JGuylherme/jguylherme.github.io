document.addEventListener('DOMContentLoaded', () => {

  // animação inicial do hero
  const hero = document.querySelector('.hero');
  setTimeout(() => {
    hero.classList.add('revealed');
  }, 100);

  // navbar muda estilo ao rolar a página
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });

  // menu mobile
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');

  hamburger.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  document.querySelectorAll('.mob-link').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      hamburger.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  // reveal ao entrar na tela
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal-card').forEach((el, i) => {
    el.style.transitionDelay = `${i * 0.12}s`;
    revealObserver.observe(el);
  });

  document.querySelectorAll('.reveal-exp').forEach((el, i) => {
    el.style.transitionDelay = `${i * 0.08}s`;
    revealObserver.observe(el);
  });

  // slider de depoimentos
  const track = document.getElementById('depTrack');
  const dots = document.querySelectorAll('.dot');
  let current = 0;
  let autoSlide;

  function goTo(index) {
    current = index;
    track.style.transform = `translateX(calc(-${index * 100}% - ${index * 28}px))`;
    dots.forEach((d, i) => d.classList.toggle('active', i === index));
  }

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      goTo(parseInt(dot.dataset.i));
      resetAuto();
    });
  });

  function resetAuto() {
    clearInterval(autoSlide);
    autoSlide = setInterval(() => {
      goTo((current + 1) % dots.length);
    }, 5000);
  }

  // swipe no mobile
  let touchStartX = 0;
  const slider = document.getElementById('depSlider');

  slider.addEventListener('touchstart', e => {
    touchStartX = e.touches[0].clientX;
  }, { passive: true });

  slider.addEventListener('touchend', e => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      goTo(diff > 0
        ? Math.min(current + 1, dots.length - 1)
        : Math.max(current - 1, 0)
      );
      resetAuto();
    }
  }, { passive: true });

  resetAuto();

  // controle das etapas do formulário
  const step1 = document.getElementById('step1');
  const step2 = document.getElementById('step2');
  const step3 = document.getElementById('step3');
  const progressBar = document.getElementById('progressBar');

  function showStep(stepEl, progress) {
    [step1, step2, step3].forEach(s => s.classList.remove('active'));
    stepEl.classList.add('active');
    progressBar.style.width = progress + '%';
  }

  // validação das datas
  document.getElementById('toStep2')?.addEventListener('click', (e) => {

    e.preventDefault();

    const checkinEl = document.getElementById('checkin');
    const checkoutEl = document.getElementById('checkout');

    const checkin = checkinEl.value;
    const checkout = checkoutEl.value;

    if (!checkin) {
      pulse(checkinEl);
      return;
    }

    if (!checkout) {
      pulse(checkoutEl);
      return;
    }

    if (new Date(checkout) <= new Date(checkin)) {
      pulse(checkoutEl);
      return;
    }

    showStep(step2, 66);
  });

  document.getElementById('toStep1')?.addEventListener('click', (e) => {
    e.preventDefault();
    showStep(step1, 33);
  });

  // valida dados e envia para whatsapp
  document.getElementById('toStep3')?.addEventListener('click', (e) => {

    e.preventDefault();

    const nameEl = document.getElementById('guestName');
    const phoneEl = document.getElementById('guestPhone');
    const emailEl = document.getElementById('guestEmail');

    const checkin = document.getElementById('checkin').value;
    const checkout = document.getElementById('checkout').value;

    const name = nameEl.value.trim();
    const phone = phoneEl.value.trim();
    const email = emailEl.value.trim();

    if (!name) {
      pulse(nameEl);
      return;
    }

    if (!phone && !email) {
      pulse(phoneEl);
      pulse(emailEl);
      return;
    }

    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (email && !emailValid) {
      pulse(emailEl);
      return;
    }

    const message = `Olá! Quero fazer uma reserva na Pousada Serra Verde.

Check-in: ${checkin}
Check-out: ${checkout}
Hóspedes: ${guests}

Nome: ${name}
Telefone: ${phone}
Email: ${email}`;

    const url = `https://wa.me/5522999999999?text=${encodeURIComponent(message)}`;

    window.open(url, '_blank');

    showStep(step3, 100);

  });

  // destaque visual de erro
  function pulse(el) {
    el.style.borderColor = '#e05555';
    el.style.boxShadow = '0 0 0 3px rgba(224, 85, 85, 0.15)';
    setTimeout(() => {
      el.style.borderColor = '';
      el.style.boxShadow = '';
    }, 1200);
  }

  document.querySelectorAll('.form-input').forEach(input => {
    input.addEventListener('input', () => {
      input.style.borderColor = '';
      input.style.boxShadow = '';
    });
  });

  // contador de hóspedes
  let guests = 2;
  const guestCount = document.getElementById('guestCount');

  document.getElementById('guestMinus')?.addEventListener('click', (e) => {
    e.preventDefault();
    if (guests > 1) {
      guests--;
      guestCount.textContent = guests;
    }
  });

  document.getElementById('guestPlus')?.addEventListener('click', (e) => {
    e.preventDefault();
    if (guests < 10) {
      guests++;
      guestCount.textContent = guests;
    }
  });

  // impedir datas anteriores
  const today = new Date().toISOString().split('T')[0];
  const checkinInput = document.getElementById('checkin');
  const checkoutInput = document.getElementById('checkout');

  if (checkinInput) {
    checkinInput.min = today;

    checkinInput.addEventListener('change', () => {

      checkoutInput.min = checkinInput.value;

      if (checkoutInput.value && checkoutInput.value <= checkinInput.value) {
        checkoutInput.value = '';
      }

    });
  }

});