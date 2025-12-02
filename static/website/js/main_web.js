(function() {
	"use strict";

	/**
	 * Easy selector helper function
	 */
	const select = (el, all = false) => {
		el = el.trim()
		if (all) {
			return [...document.querySelectorAll(el)]
		} else {
			return document.querySelector(el)
		}
	}

	/**
	 * Easy event listener function
	 */
	const on = (type, el, listener, all = false) => {
		if (all) {
			select(el, all).forEach(e => e.addEventListener(type, listener))
		} else {
			select(el, all).addEventListener(type, listener)
		}
	}

	/**
	 * Easy on scroll event listener 
	 */
	const onscroll = (el, listener) => {
		el.addEventListener('scroll', listener)
	}

	/**
	 * Navbar links active state on scroll
	 */
	let navbarlinks = select('#navbar .scrollto', true)
	const navbarlinksActive = () => {
		let position = window.scrollY + 200;

		navbarlinks.forEach(navbarlink => {
			if (!navbarlink.hash) return
				let section = select(navbarlink.hash)

			if (!section) return
				if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
					navbarlink.classList.add('active')
				} else {
					navbarlink.classList.remove('active')
				}
			})
	}
	window.addEventListener('load', navbarlinksActive)
	onscroll(document, navbarlinksActive)

	/**
	 * Scrolls to an element with header offset
	 */
	const scrollto = (el) => {
		let header = select('#header')
		let offset = header.offsetHeight

		if (!header.classList.contains('header-scrolled')) {
			offset -= 10
		}

		let elementPos = select(el).offsetTop
		window.scrollTo({
			top: elementPos - offset,
			behavior: 'smooth'
		})
	}

	/**
	 * Toggle .header-scrolled class to #header when page is scrolled
	 */
	let selectHeader = select('#header')
	if (selectHeader) {
		const headerScrolled = () => {
			if (window.scrollY > 100) {
				selectHeader.classList.add('header-scrolled')
			} else {
				selectHeader.classList.remove('header-scrolled')
			}
		}
		window.addEventListener('load', headerScrolled)
		onscroll(document, headerScrolled)
	}

	/**
	 * Back to top button
	 */
	let backtotop = select('.back-to-top')
	if (backtotop) {
		const toggleBacktotop = () => {
			if (window.scrollY > 100) {
				backtotop.classList.add('active')
			} else {
				backtotop.classList.remove('active')
			}
		}
		window.addEventListener('load', toggleBacktotop)
		onscroll(document, toggleBacktotop)
	}

	/**
	 * Mobile nav toggle
	 */
	// Mobile menu toggle (new modern header)
	on('click', '#mobile-menu-toggle', function(e) {
		e.preventDefault()
		e.stopPropagation()
		let mobileMenu = select('#mobile-menu')
		let menuIcon = select('#mobile-menu-icon')
		if (mobileMenu && menuIcon) {
			mobileMenu.classList.toggle('hidden')
			if (mobileMenu.classList.contains('hidden')) {
				menuIcon.classList.remove('bx-x')
				menuIcon.classList.add('bx-menu')
			} else {
				menuIcon.classList.remove('bx-menu')
				menuIcon.classList.add('bx-x')
			}
		}
	})

	// Close mobile menu when clicking on a link
	on('click', '#mobile-menu a', function() {
		let mobileMenu = select('#mobile-menu')
		let menuIcon = select('#mobile-menu-icon')
		if (mobileMenu && menuIcon) {
			mobileMenu.classList.add('hidden')
			menuIcon.classList.remove('bx-x')
			menuIcon.classList.add('bx-menu')
		}
	})
	
	// Close mobile menu when clicking outside
	document.addEventListener('click', function(e) {
		let mobileMenu = select('#mobile-menu')
		let toggleBtn = select('#mobile-menu-toggle')
		let menuIcon = select('#mobile-menu-icon')
		if (mobileMenu && !mobileMenu.contains(e.target) && toggleBtn && !toggleBtn.contains(e.target)) {
			if (!mobileMenu.classList.contains('hidden')) {
				mobileMenu.classList.add('hidden')
				if (menuIcon) {
					menuIcon.classList.remove('bx-x')
					menuIcon.classList.add('bx-menu')
				}
			}
		}
	})

	on('click', '.mobile-nav-toggle', function(e) {
		select('#navbar').classList.toggle('navbar-mobile')
		this.classList.toggle('bx-menu')
		this.classList.toggle('bx-x')
	})

	/**
	 * Mobile nav dropdowns activate
	 */
	on('click', '.navbar .dropdown > a', function(e) {
		if (select('#navbar').classList.contains('navbar-mobile')) {
			e.preventDefault()
			this.nextElementSibling.classList.toggle('dropdown-active')
		}
	}, true)

	/**
	 * Scrool with ofset on links with a class name .scrollto
	 */
	on('click', '.scrollto', function(e) {
		if (select(this.hash)) {
			e.preventDefault()

			let navbar = select('#navbar')
			if (navbar.classList.contains('navbar-mobile')) {
				navbar.classList.remove('navbar-mobile')
				let navbarToggle = select('.mobile-nav-toggle')
				navbarToggle.classList.toggle('bx-menu')
				navbarToggle.classList.toggle('bx-x')
			}
			scrollto(this.hash)
		}
	}, true)

	/**
	 * Scroll with ofset on page load with hash links in the url
	 */
	window.addEventListener('load', () => {
		if (window.location.hash) {
			if (select(window.location.hash)) {
				scrollto(window.location.hash)
			}
		}
	});

	
	var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
	var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
		return new bootstrap.Tooltip(tooltipTriggerEl)
	})


	/**
	 * Clients Slider
	 */
	new Swiper('.clients-slider', {
		speed: 400,
		loop: true,
		autoplay: {
			delay: 5000,
			disableOnInteraction: false
		},
		slidesPerView: 'auto',
		pagination: {
			el: '.swiper-pagination',
			type: 'bullets',
			clickable: true
		},
		breakpoints: {
			320: {
				slidesPerView: 2,
				spaceBetween: 40
			},
			480: {
				slidesPerView: 3,
				spaceBetween: 60
			},
			640: {
				slidesPerView: 4,
				spaceBetween: 80
			},
			992: {
				slidesPerView: 6,
				spaceBetween: 120
			}
		}
	});

	/**
	 * Porfolio isotope and filter
	 */
	window.addEventListener('load', () => {
		let portfolioContainer = select('.portfolio-container');
		if (portfolioContainer) {
			let portfolioIsotope = new Isotope(portfolioContainer, {
				itemSelector: '.portfolio-item',
				layoutMode: 'fitRows'
			});

			let portfolioFilters = select('#portfolio-flters li', true);

			on('click', '#portfolio-flters li', function(e) {
				e.preventDefault();
				portfolioFilters.forEach(function(el) {
					el.classList.remove('filter-active');
				});
				this.classList.add('filter-active');

				portfolioIsotope.arrange({
					filter: this.getAttribute('data-filter')
				});
			}, true);
		}

	});

	/**
	 * Initiate portfolio lightbox 
	 */
	const portfolioLightbox = GLightbox({
		selector: '.portfokio-lightbox'
	});

	/**
	 * Portfolio details slider
	 */
	new Swiper('.portfolio-details-slider', {
		speed: 400,
		autoplay: {
			delay: 5000,
			disableOnInteraction: false
		},
		pagination: {
			el: '.swiper-pagination',
			type: 'bullets',
			clickable: true
		}
	});

	/**
	 * Testimonials slider
	 */
	new Swiper('.testimonials-slider', {
		speed: 600,
		loop: true,
		autoplay: {
			delay: 5000,
			disableOnInteraction: false
		},
		slidesPerView: 'auto',
		pagination: {
			el: '.swiper-pagination',
			type: 'bullets',
			clickable: true
		},
		breakpoints: {
			320: {
				slidesPerView: 1,
				spaceBetween: 40
			},

			1200: {
				slidesPerView: 3,
			}
		}
	});

	/**
	 * Animation on scroll - REMOVED AOS
	 */
	// AOS removed - no longer needed

	/**
	 * Custom Accordion for Tailwind
	 */
	const initAccordion = () => {
		const buttons = document.querySelectorAll('.accordion-button');
		
		buttons.forEach(button => {
			button.addEventListener('click', function() {
				const targetId = this.getAttribute('data-accordion-target');
				const content = document.getElementById(targetId);
				const icon = this.querySelector('i');
				
				// Close all other accordions
				buttons.forEach(otherButton => {
					if (otherButton !== this) {
						const otherId = otherButton.getAttribute('data-accordion-target');
						const otherContent = document.getElementById(otherId);
						const otherIcon = otherButton.querySelector('i');
						
						otherContent.classList.add('hidden');
						otherIcon.style.transform = 'rotate(0deg)';
					}
				});
				
				// Toggle current accordion
				content.classList.toggle('hidden');
				
				// Rotate icon
				if (content.classList.contains('hidden')) {
					icon.style.transform = 'rotate(0deg)';
				} else {
					icon.style.transform = 'rotate(180deg)';
				}
			});
		});
	};
	
	window.addEventListener('load', initAccordion);


})();

$(document).ready(function() {

	const current_theme = Cookies.get('theme');

	if (current_theme === 'dark') {
		document.documentElement.classList.add('dark');
		$('#theme_switch').removeClass('bx-sun').addClass('bx-loader text-algova-primary');
	} else {
		document.documentElement.classList.remove('dark');
		$('#theme_switch').removeClass('bx-loader text-algova-primary').addClass('bx-sun');
	}

	$('#theme_switch').click(function() {
		const isDark = document.documentElement.classList.toggle('dark');
		
		if (isDark) {
			$(this).removeClass('bx-sun').addClass('bx-loader text-algova-primary');
			Cookies.set('theme', 'dark');
		} else {
			$(this).removeClass('bx-loader text-algova-primary').addClass('bx-sun');
			Cookies.set('theme', 'light');
		}
	});
});