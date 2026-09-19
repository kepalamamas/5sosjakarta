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
const artistPresaleButton = document.querySelector('#artist-presale-button2');

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
    const response = await fetch('https://sodtix.com/api/v1/public-events/link-url/9sj2jef02');
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

const sodGroupPresaleButton = document.querySelector('#sod-group-presale-button');

const sodGroupPresaleState = {
  isOpen: false,
  linkUrl: ''
};

let sodGroupPresaleToastTimeoutId = null;

const showSodGroupPresaleToast = (message) => {
  if (!message) {
    return;
  }

  let toast = document.querySelector('#sod-group-presale-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'sod-group-presale-toast';
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

  if (sodGroupPresaleToastTimeoutId) {
    window.clearTimeout(sodGroupPresaleToastTimeoutId);
  }

  sodGroupPresaleToastTimeoutId = window.setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(-50%) translateY(12px)';
  }, 2200);
};

const preloadSodGroupPresaleData = async () => {
  try {
    const response = await fetch('https://sodtix.com/api/v1/public-events/link-url/MNk1j3bq');
    if (!response.ok) {
      return;
    }

    const result = await response.json();
    const data = result && result.data;

    if (!data) {
      return;
    }

    sodGroupPresaleState.isOpen = data.isOpen === true;
    sodGroupPresaleState.linkUrl = typeof data.link_url === 'string' ? data.link_url : '';
  } catch (error) {
    // Intentionally no-op: keep default closed state when request fails.
  }
};

const applySodGroupPresaleState = () => {
  if (!sodGroupPresaleButton) {
    return;
  }
  if (sodGroupPresaleState.isOpen !== true) {
    sodGroupPresaleButton.setAttribute('aria-disabled', 'true');
    sodGroupPresaleButton.removeAttribute('href');
  } else {
    sodGroupPresaleButton.removeAttribute('aria-disabled');
  }
};

if (sodGroupPresaleButton) {
  preloadSodGroupPresaleData().then(applySodGroupPresaleState);

  sodGroupPresaleButton.addEventListener('click', (event) => {
    event.preventDefault();

    if (sodGroupPresaleState.isOpen !== true) {
      return;
    }

    if (sodGroupPresaleState.linkUrl) {
      window.open(sodGroupPresaleState.linkUrl, '_blank', 'noopener,noreferrer');
    }
  });
}

const generalSalesButton = document.querySelector('#general-sales-button2');
const ticketStore = document.querySelector('#ticket-store');
const categoryList = document.querySelector('#category-list');
const ticketStoreMessage = document.querySelector('#ticket-store-message');
const generalSalesStatus = document.querySelector('#general-sales-status');
const checkoutModal = document.querySelector('#checkout-modal');
const checkoutForm = document.querySelector('#checkout-form');
const checkoutSummary = document.querySelector('#checkout-summary');
const checkoutError = document.querySelector('#checkout-error');
const passengerFields = document.querySelector('#passenger-fields');
const turnstileWidget = document.querySelector('#turnstile-widget');
const sodtixConfig = window.SODTIX_CONFIG || {};
const cartStorageKey = `sodtix-cart-${sodtixConfig.eventSlug || 'event'}`;
let categories = [];
let selectedCategory = null;
let cart = JSON.parse(window.localStorage.getItem(cartStorageKey) || 'null');
let turnstileWidgetId = null;
let turnstileToken = '';
let checkoutConfig = {
  isNoTicketHolder: false,
  isVoucherMandatory: false,
  fields: {}
};
let checkoutConfigPromise;

const formatPrice = (value) => new Intl.NumberFormat('id-ID', {
  style: 'currency', currency: 'IDR', maximumFractionDigits: 0
}).format(Number(value) || 0);

const categoryStatus = (category) => {
  const now = Date.now();
  if (!category.is_active || (category.start_time && now < Date.parse(category.start_time)) ||
    (category.end_time && now > Date.parse(category.end_time))) return 'not_available';
  if (category.section_id) return 'seated';
  if (Number(category.available_count) <= 0) return 'sold_out';
  return 'available';
};

const statusLabel = { available: 'AVAILABLE', sold_out: 'SOLD OUT', not_available: 'NOT AVAILABLE', seated: 'SEATED' };

const saveCart = () => window.localStorage.setItem(cartStorageKey, JSON.stringify(cart));

const showStoreMessage = (message, isError = false) => {
  ticketStoreMessage.textContent = message;
  ticketStoreMessage.classList.toggle('is-error', isError);
};

const renderCategories = () => {
  categoryList.innerHTML = '';
  const generalAdmission = categories.filter((category) => category.section_id == null);
  if (!generalAdmission.length) {
    showStoreMessage('No general admission categories are available for this event.', true);
    return;
  }
  generalAdmission.forEach((category) => {
    const status = categoryStatus(category);
    const item = document.createElement('article');
    item.className = 'category-card';
    const minimum = category.is_ticket_limitation ? Math.max(1, Number(category.min_ticket) || 1) : 1;
    const maximum = Math.min(Number(category.available_count), category.is_ticket_limitation ? Number(category.max_ticket) || 1 : 4);
    item.innerHTML = `<div><p class="category-name"></p><p class="category-price"></p><p class="category-availability">${statusLabel[status]}</p></div><div class="category-action"><label>QTY <input class="category-quantity" type="number" min="${minimum}" max="${maximum}" value="${minimum}" ${status !== 'available' ? 'disabled' : ''}></label><button type="button" class="category-select" ${status !== 'available' ? 'disabled' : ''}>SELECT</button></div>`;
    item.querySelector('.category-name').textContent = category.name;
    item.querySelector('.category-price').textContent = formatPrice(category.price);
    item.querySelector('.category-select').addEventListener('click', () => openCheckout(category, Number(item.querySelector('.category-quantity').value)));
    categoryList.appendChild(item);
  });
  if (cart) showStoreMessage(`Saved selection: ${cart.quantity} x ${cart.category_name}. Availability will be checked again at checkout.`);
};

const fetchCategories = async (shouldRender = true) => {
  const response = await fetch(`${sodtixConfig.apiBase}/public-category?event_id=${encodeURIComponent(sodtixConfig.eventSlug)}`, { credentials: 'include' });
  if (!response.ok) throw new Error('Unable to load ticket availability.');
  const result = await response.json();
  categories = Array.isArray(result.data) ? result.data : [];
  if (shouldRender) renderCategories();
  return categories;
};

const loadCategories = async () => {
  generalSalesStatus.textContent = 'LOADING TICKETS...';
  try {
    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => controller.abort(), 10000);
    const response = await fetch(`${sodtixConfig.apiBase}/public-category?event_id=${encodeURIComponent(sodtixConfig.eventSlug)}`, { credentials: 'include', signal: controller.signal });
    window.clearTimeout(timeoutId);
    if (!response.ok) throw new Error('Unable to load ticket availability.');
    const result = await response.json();
    categories = Array.isArray(result.data) ? result.data : [];
    generalSalesStatus.textContent = 'TICKETS AVAILABLE';
    renderCategories();
  } catch (error) {
    generalSalesStatus.textContent = 'UNAVAILABLE';
    showStoreMessage('Ticket availability could not be loaded. Please refresh and try again.', true);
  }
};

const loadCheckoutConfig = async () => {
  try {
    const [eventResponse, formResponse] = await Promise.all([
      fetch(`${sodtixConfig.apiBase}/public-events/${encodeURIComponent(sodtixConfig.eventSlug)}`, { credentials: 'include' }),
      fetch(`${sodtixConfig.apiBase}/public-events/${encodeURIComponent(sodtixConfig.eventSlug)}/form-config`, { credentials: 'include' })
    ]);
    if (!eventResponse.ok || !formResponse.ok) throw new Error('Unable to load checkout configuration.');
    const eventResult = await eventResponse.json();
    const formResult = await formResponse.json();
    const event = eventResult.data || {};
    checkoutConfig = {
      isNoTicketHolder: event.is_no_ticket_holder === true,
      isVoucherMandatory: event.is_voucher_mandatory === true,
      fields: (formResult.data && formResult.data.form_config && formResult.data.form_config.fields) ||
        (formResult.form_config && formResult.form_config.fields) || {}
    };
  } catch (error) {
    checkoutConfigPromise = null;
  }
};

const applyFieldConfig = () => {
  Object.entries(checkoutConfig.fields).forEach(([fieldKey, config]) => {
    const input = checkoutForm.elements.namedItem(fieldKey);
    if (!input || !config || typeof config !== 'object') return;
    const field = input.closest('label');
    if (field && config.label) field.firstChild.textContent = config.label;
    input.required = config.required === true;
    if (config.enabled === false && field) field.hidden = true;
  });
  const voucherInput = checkoutForm.elements.namedItem('voucher_code');
  if (voucherInput) {
    voucherInput.required = checkoutConfig.isVoucherMandatory || selectedCategory.is_voucher_mandatory === true;
  }
};

const renderPassengers = (quantity, isNoTicketHolder) => {
  passengerFields.innerHTML = '';
  if (isNoTicketHolder) return;
  const heading = document.createElement('p');
  heading.className = 'passenger-heading';
  heading.textContent = 'TICKET HOLDERS';
  passengerFields.appendChild(heading);
  const passengerKeys = Object.keys(checkoutConfig.fields).filter((key) =>
    checkoutConfig.fields[key] && checkoutConfig.fields[key].enabled !== false &&
    !['email', 'identity_number', 'voucher_code'].includes(key)
  );
  const keys = passengerKeys.length ? passengerKeys : ['name'];
  for (let index = 0; index < quantity; index += 1) {
    const field = document.createElement('div');
    field.className = 'passenger-group';
    keys.forEach((key) => {
      const config = checkoutConfig.fields[key] || {};
      const label = document.createElement('label');
      label.textContent = `${config.label || key.replaceAll('_', ' ')} ${index + 1}`;
      const input = document.createElement('input');
      input.name = `passenger_${index}_${key}`;
      input.required = config.required !== false;
      input.autocomplete = 'off';
      label.appendChild(input);
      field.appendChild(label);
    });
    passengerFields.appendChild(field);
  }
};

const renderTurnstile = () => {
  turnstileToken = '';
  if (!turnstileWidget || !sodtixConfig.turnstileSiteKey || !window.turnstile) return;
  turnstileWidget.innerHTML = '';
  turnstileWidgetId = window.turnstile.render(turnstileWidget, {
    sitekey: sodtixConfig.turnstileSiteKey,
    callback: (token) => { turnstileToken = token; },
    'expired-callback': () => { turnstileToken = ''; },
    'error-callback': () => { turnstileToken = ''; }
  });
};

const resetTurnstile = () => {
  turnstileToken = '';
  if (window.turnstile && turnstileWidgetId !== null) window.turnstile.reset(turnstileWidgetId);
};

const openCheckout = async (category, requestedQuantity) => {
  if (checkoutConfigPromise) await checkoutConfigPromise;
  selectedCategory = category;
  const minimum = category.is_ticket_limitation ? Math.max(1, Number(category.min_ticket) || 1) : 1;
  const maximum = Math.min(Number(category.available_count), category.is_ticket_limitation ? Number(category.max_ticket) || 1 : 4);
  const quantity = Math.max(minimum, Math.min(Number(requestedQuantity || (cart && cart.category_id === category.id ? cart.quantity : minimum)), maximum));
  cart = { event_id: category.event_id, category_id: category.id, category_name: category.name, price: category.price, quantity };
  saveCart();
  checkoutSummary.textContent = `${category.name} | ${quantity} ticket${quantity === 1 ? '' : 's'} | ${formatPrice(category.price * quantity)}`;
  renderPassengers(quantity, checkoutConfig.isNoTicketHolder);
  applyFieldConfig();
  checkoutError.textContent = '';
  checkoutModal.hidden = false;
  document.body.classList.add('checkout-open');
  renderTurnstile();
};

const closeCheckout = () => { checkoutModal.hidden = true; document.body.classList.remove('checkout-open'); };
document.querySelectorAll('[data-close-checkout]').forEach((element) => element.addEventListener('click', closeCheckout));

checkoutForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  checkoutError.textContent = '';
  if (!sodtixConfig.payloadSecret || !window.CryptoJS) {
    checkoutError.textContent = 'Checkout is not configured yet. The site owner must add the payload secret before payment can be submitted.';
    return;
  }
  try {
    await fetchCategories(false);
  } catch (error) {
    checkoutError.textContent = 'Ticket availability could not be refreshed. Please try again.';
    return;
  }
  const freshCategory = categories.find((category) => category.id === selectedCategory.id);
  if (!freshCategory || categoryStatus(freshCategory) !== 'available' || Number(freshCategory.available_count) < cart.quantity) {
    checkoutError.textContent = 'Availability changed. Please close this form and choose your tickets again.';
    return;
  }
  if (sodtixConfig.turnstileSiteKey && !turnstileToken) {
    checkoutError.textContent = 'Please complete the bot check before continuing.';
    return;
  }
  const values = Object.fromEntries(new FormData(checkoutForm).entries());
  const passengersByIndex = {};
  Object.keys(values).filter((key) => key.startsWith('passenger_')).forEach((key) => {
    const [, index, field] = key.split('_');
    if (!passengersByIndex[index]) passengersByIndex[index] = {};
    passengersByIndex[index][field] = values[key];
  });
  const passengers = Object.values(passengersByIndex);
  const payload = { event_id: cart.event_id, detail: [{ category_id: cart.category_id, quantity: cart.quantity, category_name: cart.category_name }], voucher_code: values.voucher_code, orderInfo: { name: values.name, email: values.email, phone: values.phone, gender: values.gender, identity_number: values.identity_number }, passengers, is_aggree: values.is_aggree === 'on', turnstile_token: turnstileToken };
  const submitButton = checkoutForm.querySelector('.checkout-submit');
  submitButton.disabled = true;
  submitButton.textContent = 'PROCESSING...';
  try {
    const data = window.CryptoJS.AES.encrypt(JSON.stringify(payload), sodtixConfig.payloadSecret).toString();
    const response = await fetch(`${sodtixConfig.apiBase}/categories/checkout`, { method: 'POST', credentials: 'include', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ data }) });
    const result = await response.json();
    if (!response.ok || !result.payment_url) {
      if (result.code === 'TURNSTILE_REFRESH_REQUIRED' || response.status === 403) resetTurnstile();
      throw new Error(result.error || 'Checkout could not be completed.');
    }
    window.location.assign(result.payment_url);
  } catch (error) {
    checkoutError.textContent = error.message;
    submitButton.disabled = false;
    submitButton.textContent = 'CONTINUE TO PAYMENT';
  }
});

if (generalSalesButton) {
  checkoutConfigPromise = loadCheckoutConfig();
  loadCategories();

  generalSalesButton.addEventListener('click', () => {
    ticketStore.hidden = false;
    ticketStore.scrollIntoView({ behavior: 'smooth', block: 'center' });
    loadCategories();
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
