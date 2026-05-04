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
const artistPresaleButton = document.querySelector('#artist-presale-button');

const artistPresaleState = {
  isOpen: false,
  linkUrl: ''
};

let artistPresaleToastTimeoutId = null;

const showArtistPresaleToast = (message) => {
  if (!message) {
    return;
  }

  let toast = document.querySelector('#artist-presale-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'artist-presale-toast';
    toast.setAttribute('role', 'status');
    toast.setAttribute('aria-live', 'polite');
    toast.style.position = 'fixed';
    toast.style.left = '50%';
    toast.style.bottom = '24px';
    toast.style.transform = 'translateX(-50%) translateY(12px)';
    toast.style.padding = '10px 14px';
    toast.style.borderRadius = '8px';
    toast.style.backgroundColor = 'rgba(17, 17, 17, 0.92)';
    toast.style.color = '#ffffff';
    toast.style.fontSize = '14px';
    toast.style.lineHeight = '1.4';
    toast.style.opacity = '0';
    toast.style.pointerEvents = 'none';
    toast.style.transition = 'opacity 0.2s ease, transform 0.2s ease';
    toast.style.zIndex = '9999';
    document.body.appendChild(toast);
  }

  toast.textContent = message;
  toast.style.opacity = '1';
  toast.style.transform = 'translateX(-50%) translateY(0)';

  if (artistPresaleToastTimeoutId) {
    window.clearTimeout(artistPresaleToastTimeoutId);
  }

  artistPresaleToastTimeoutId = window.setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(-50%) translateY(12px)';
  }, 2200);
};

const preloadArtistPresaleData = async () => {
  try {
    const response = await fetch('https://sodtix.com/api/v1/public-events/link-url/Pk3nfysi7');
    if (!response.ok) {
      return;
    }

    const result = await response.json();
    const data = result && result.data;

    if (!data) {
      return;
    }

    artistPresaleState.isOpen = data.isOpen === true;
    artistPresaleState.linkUrl = typeof data.link_url === 'string' ? data.link_url : '';
  } catch (error) {
    // Intentionally no-op: keep default closed state when request fails.
  }
};

const applyArtistPresaleState = () => {
  if (!artistPresaleButton) {
    return;
  }
  if (artistPresaleState.isOpen !== true) {
    artistPresaleButton.setAttribute('aria-disabled', 'true');
    artistPresaleButton.removeAttribute('href');
  } else {
    artistPresaleButton.removeAttribute('aria-disabled');
  }
};

if (artistPresaleButton) {
  preloadArtistPresaleData().then(applyArtistPresaleState);

  artistPresaleButton.addEventListener('click', (event) => {
    event.preventDefault();

    if (artistPresaleState.isOpen !== true) {
      return;
    }

    if (artistPresaleState.linkUrl) {
      window.open(artistPresaleState.linkUrl, '_blank', 'noopener,noreferrer');
    }
  });
}

const generalSalesButton = document.querySelector('#general-sales-button');

const generalSalesState = {
  isOpen: false,
  linkUrl: ''
};

let generalSalesToastTimeoutId = null;

const showGeneralSalesToast = (message) => {
  if (!message) {
    return;
  }

  let toast = document.querySelector('#general-sales-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'general-sales-toast';
    toast.setAttribute('role', 'status');
    toast.setAttribute('aria-live', 'polite');
    toast.style.position = 'fixed';
    toast.style.left = '50%';
    toast.style.bottom = '24px';
    toast.style.transform = 'translateX(-50%) translateY(12px)';
    toast.style.padding = '10px 14px';
    toast.style.borderRadius = '8px';
    toast.style.backgroundColor = 'rgba(17, 17, 17, 0.92)';
    toast.style.color = '#ffffff';
    toast.style.fontSize = '14px';
    toast.style.lineHeight = '1.4';
    toast.style.opacity = '0';
    toast.style.pointerEvents = 'none';
    toast.style.transition = 'opacity 0.2s ease, transform 0.2s ease';
    toast.style.zIndex = '9999';
    document.body.appendChild(toast);
  }

  toast.textContent = message;
  toast.style.opacity = '1';
  toast.style.transform = 'translateX(-50%) translateY(0)';

  if (generalSalesToastTimeoutId) {
    window.clearTimeout(generalSalesToastTimeoutId);
  }

  generalSalesToastTimeoutId = window.setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(-50%) translateY(12px)';
  }, 2200);
};

const preloadGeneralSalesData = async () => {
  try {
    const response = await fetch('https://sodtix.com/api/v1/public-events/link-url/I93nOjd8');
    if (!response.ok) {
      return;
    }

    const result = await response.json();
    const data = result && result.data;

    if (!data) {
      return;
    }

    generalSalesState.isOpen = data.isOpen === true;
    generalSalesState.linkUrl = typeof data.link_url === 'string' ? data.link_url : '';
  } catch (error) {
    // Intentionally no-op: keep default closed state when request fails.
  }
};

const applyGeneralSalesState = () => {
  if (!generalSalesButton) {
    return;
  }
  if (generalSalesState.isOpen !== true) {
    generalSalesButton.setAttribute('aria-disabled', 'true');
    generalSalesButton.removeAttribute('href');
  } else {
    generalSalesButton.removeAttribute('aria-disabled');
  }
};

if (generalSalesButton) {
  preloadGeneralSalesData().then(applyGeneralSalesState);

  generalSalesButton.addEventListener('click', (event) => {
    event.preventDefault();

    if (generalSalesState.isOpen !== true) {
      return;
    }

    if (generalSalesState.linkUrl) {
      window.open(generalSalesState.linkUrl, '_blank', 'noopener,noreferrer');
    }
  });
}

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
