document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');

  const openMenu = () => {
    hamburger.classList.add('active');
    mobileMenu.classList.remove('hidden');
  };
  const closeMenu = () => {
    hamburger.classList.remove('active');
    mobileMenu.classList.add('hidden');
  };

  hamburger.addEventListener('click', (e) => {
    e.stopPropagation();
    if (mobileMenu.classList.contains('hidden')) openMenu();
    else closeMenu();
  });

  document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
      closeMenu();
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth >= 768) closeMenu();
  });

  const userSpan = document.getElementById('user');
  const nameInput = document.getElementById('name');
  const name = prompt('Selamat datang! Siapa nama Anda?');
  if (name && name.trim() !== '') {
    userSpan.textContent = name;
    nameInput.value = name;
  }

  const timeEl = document.getElementById('time');
  const updateTime = () => timeEl.textContent = new Date().toLocaleString();
  updateTime();
  setInterval(updateTime, 1000);

  const form = document.getElementById('user-form');
  const form2 = document.getElementById('user-form-2');
  const formContainer = document.getElementById('form-container');
  const resultsContainer = document.getElementById('results-container');
  
  const handleFormSubmit = (e, isSecondForm = false) => {
    e.preventDefault();
    
    const formData = {
      name: document.getElementById(isSecondForm ? 'name-2' : 'name').value || '-',
      tgl: document.getElementById(isSecondForm ? 'tgl-2' : 'tgl').value || '-',
      gender: (document.querySelector(isSecondForm ? 'input[name="gender-2"]:checked' : 'input[name="gender"]:checked') || {}).value || '-',
      msg: document.getElementById(isSecondForm ? 'msg-2' : 'msg').value || '-'
    };
    
    document.getElementById('out-name').textContent = formData.name;
    document.getElementById('out-tgl').textContent = formData.tgl;
    document.getElementById('out-gender').textContent = formData.gender;
    document.getElementById('out-msg').textContent = formData.msg;
    
    if (!isSecondForm) {
      formContainer.style.display = 'none';
      
      resultsContainer.classList.remove('hidden');
      
      document.getElementById('name-2').value = formData.name !== '-' ? formData.name : '';
      document.getElementById('tgl-2').value = formData.tgl !== '-' ? formData.tgl : '';
      if (formData.gender !== '-') {
        document.querySelector(`input[name="gender-2"][value="${formData.gender}"]`).checked = true;
      }
      document.getElementById('msg-2').value = formData.msg !== '-' ? formData.msg : '';
    }
    
    const output = document.getElementById('output');
    output.classList.remove('opacity-0', 'translate-y-6');
    output.classList.add('opacity-100', 'translate-y-0');
  };

  form.addEventListener('submit', (e) => handleFormSubmit(e, false));
  form2.addEventListener('submit', (e) => handleFormSubmit(e, true));

  const carouselSlide = document.getElementById('carousel-slide');
  const prevBtn = document.getElementById('prev');
  const nextBtn = document.getElementById('next');
  const indicators = document.getElementById('indicators');
  const imgs = carouselSlide.querySelectorAll('img');
  let currentIndex = 0;

  imgs.forEach((_, i) => {
    const dot = document.createElement('button');
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => {
      currentIndex = i;
      updateCarousel();
    });
    indicators.appendChild(dot);
  });

  const updateCarousel = () => {
    carouselSlide.style.transform = `translateX(-${currentIndex * 100}%)`;
    indicators.querySelectorAll('button').forEach((b, i) => {
      b.classList.toggle('active', i === currentIndex);
    });
  };

  prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + imgs.length) % imgs.length;
    updateCarousel();
  });
  nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % imgs.length;
    updateCarousel();
  });

  let autoSlide = setInterval(() => {
    currentIndex = (currentIndex + 1) % imgs.length;
    updateCarousel();
  }, 5000);
  carouselSlide.addEventListener('mouseenter', () => clearInterval(autoSlide));
  carouselSlide.addEventListener('mouseleave', () => {
    autoSlide = setInterval(() => {
      currentIndex = (currentIndex + 1) % imgs.length;
      updateCarousel();
    }, 5000);
  });

  const sections = document.querySelectorAll('.section-animate');
  const revealOnScroll = () => {
    const triggerBottom = window.innerHeight * 0.85;
    sections.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < triggerBottom) el.classList.add('show');
    });
  };
  window.addEventListener('scroll', revealOnScroll);
  window.addEventListener('load', revealOnScroll);
});
