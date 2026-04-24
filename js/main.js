const navbar = document.querySelector('.navbar');
const navbarToggle = document.querySelector('.navbar-toggle');

if (navbar && navbarToggle) {
	navbarToggle.addEventListener('click', () => {
		const isOpen = navbar.classList.toggle('menu-open');
		navbarToggle.setAttribute('aria-expanded', String(isOpen));
	});
}
