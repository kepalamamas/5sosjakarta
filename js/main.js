const navbar = document.querySelector('.navbar');
const navbarToggle = document.querySelector('.navbar-toggle');
const navLinks = document.querySelectorAll('.navbar-menu a[href^="#"]');

if (navbar && navbarToggle) {
  navbarToggle.addEventListener('click', () => {
    const isOpen = navbar.classList.toggle('menu-open');
    navbarToggle.setAttribute('aria-expanded', String(isOpen));
  });
}

if (navbar && navLinks.length > 0) {
  navLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
      const href = link.getAttribute('href');
      if (!href || href === '#') {
        return;
      }

      const target = document.querySelector(href);
      if (!target) {
        return;
      }

      event.preventDefault();
      const headerOffset = navbar.offsetHeight + 8;
      const top = target.getBoundingClientRect().top + window.scrollY - headerOffset;

      window.scrollTo({
        top,
        behavior: 'smooth'
      });

      if (navbar.classList.contains('menu-open')) {
        navbar.classList.remove('menu-open');
        navbarToggle.setAttribute('aria-expanded', 'false');
      }
    });
  });
}

const vipItems = document.querySelectorAll('.vip-item');

const setVipPanelState = (item, shouldOpen) => {
  const trigger = item.querySelector('.vip-trigger');
  const panel = item.querySelector('.vip-panel');
  if (!trigger || !panel) {
    return;
  }

  if (shouldOpen) {
    item.classList.add('is-open');
    trigger.setAttribute('aria-expanded', 'true');
    panel.style.maxHeight = `${panel.scrollHeight}px`;
  } else {
    item.classList.remove('is-open');
    trigger.setAttribute('aria-expanded', 'false');
    panel.style.maxHeight = '0px';
  }
};

if (vipItems.length > 0) {
  vipItems.forEach((item) => {
    setVipPanelState(item, false);

    const trigger = item.querySelector('.vip-trigger');
    if (!trigger) {
      return;
    }

    trigger.addEventListener('click', () => {
      const shouldOpen = !item.classList.contains('is-open');
      setVipPanelState(item, shouldOpen);
    });
  });

  window.addEventListener('resize', () => {
    vipItems.forEach((item) => {
      if (!item.classList.contains('is-open')) {
        return;
      }

      const panel = item.querySelector('.vip-panel');
      if (panel) {
        panel.style.maxHeight = `${panel.scrollHeight}px`;
      }
    });
  });
}
