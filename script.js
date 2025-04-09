document.addEventListener('DOMContentLoaded', function() {
    // ========== HEADER SCROLL EFFECT ==========
    const header = document.querySelector('.main-header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // ========== MOBILE MENU TOGGLE ==========
    const hamburgerBtn = document.querySelector('.hamburger-btn');
    const mainNav = document.querySelector('.main-nav');
    
    hamburgerBtn.addEventListener('click', function() {
        this.classList.toggle('active');
        mainNav.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
    });

    // ========== DROPDOWN MENUS ==========
    const dropdowns = document.querySelectorAll('.dropdown');
    
    dropdowns.forEach(dropdown => {
        const link = dropdown.querySelector('a');
        
        link.addEventListener('click', function(e) {
            if (window.innerWidth < 992) {
                e.preventDefault();
                dropdown.classList.toggle('active');
            }
        });
    });

    // ========== PRODUCT FILTERS ==========
    const filterButtons = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const filter = this.dataset.filter;
            
            // Filter products with animation
            productCards.forEach((card, index) => {
                setTimeout(() => {
                    if (filter === 'all' || card.dataset.category === filter || 
                        (filter === 'nuevo' && card.querySelector('.product-badge'))) {
                        card.style.display = 'block';
                        card.style.animation = 'fadeIn 0.5s forwards';
                    } else {
                        card.style.animation = 'fadeOut 0.3s forwards';
                        setTimeout(() => card.style.display = 'none', 300);
                    }
                }, index * 50);
            });
        });
    });

    // ========== CART FUNCTIONALITY ==========
    const cartButtons = document.querySelectorAll('.add-to-cart');
    const cartCount = document.querySelector('.cart-count');
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || 0;
    
    // Update cart count on load
    if (cartCount) cartCount.textContent = cartItems;
    
    cartButtons.forEach(button => {
        button.addEventListener('click', function() {
            cartItems++;
            localStorage.setItem('cartItems', cartItems);
            
            // Update cart count with animation
            if (cartCount) {
                cartCount.textContent = cartItems;
                cartCount.classList.add('pulse');
                setTimeout(() => cartCount.classList.remove('pulse'), 500);
            }
            
            // Button feedback
            this.innerHTML = '<i class="fas fa-check"></i> Añadido';
            this.classList.add('added');
            
            setTimeout(() => {
                this.innerHTML = '<i class="fas fa-cart-plus"></i> Añadir al carrito';
                this.classList.remove('added');
            }, 2000);
        });
    });

    // ========== TESTIMONIALS SLIDER ==========
    const testimonials = document.querySelectorAll('.testimonial-card');
    let currentTestimonial = 0;
    
    if (testimonials.length > 1) {
        // Show first testimonial
        testimonials[currentTestimonial].style.display = 'block';
        
        // Auto-rotate testimonials
        setInterval(() => {
            testimonials[currentTestimonial].style.animation = 'fadeOut 0.5s forwards';
            
            setTimeout(() => {
                testimonials[currentTestimonial].style.display = 'none';
                currentTestimonial = (currentTestimonial + 1) % testimonials.length;
                testimonials[currentTestimonial].style.display = 'block';
                testimonials[currentTestimonial].style.animation = 'fadeIn 0.5s forwards';
            }, 500);
        }, 5000);
    }

    // ========== NEWSLETTER FORM ==========
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if (validateEmail(email)) {
                showNotification('¡Gracias por suscribirte! Pronto recibirás nuestras novedades.', 'success');
                emailInput.value = '';
                
                // Save to localStorage
                const subscribers = JSON.parse(localStorage.getItem('newsletterSubscribers')) || [];
                subscribers.push(email);
                localStorage.setItem('newsletterSubscribers', JSON.stringify(subscribers));
            } else {
                showNotification('Por favor ingresa un email válido.', 'error');
                emailInput.focus();
            }
        });
    }

    // ========== HELPER FUNCTIONS ==========
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    function showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'fadeOut 0.5s forwards';
            setTimeout(() => notification.remove(), 500);
        }, 3000);
    }

    // ========== LOAD PRODUCTS DYNAMICALLY ==========
    const productsGrid = document.querySelector('.products-grid');
    
    if (productsGrid) {
        // Simulated product data (replace with your actual data)
        const products = [
            {
                id: 1,
                title: 'Camiseta Pareja Anime - Kimetsu no Yaiba',
                category: 'parejas',
                price: 89900,
                image: 'img/products/pareja1.jpg',
                badge: 'Nuevo'
            },
            {
                id: 2,
                title: 'Camiseta Grupo - Attack on Titan',
                category: 'amigos',
                price: 79900,
                image: 'img/products/amigos1.jpg',
                badge: ''
            },
            {
                id: 3,
                title: 'Camiseta Individual - Jujutsu Kaisen',
                category: 'individual',
                price: 69900,
                image: 'img/products/individual1.jpg',
                badge: 'Más vendido'
            },
            {
                id: 4,
                title: 'Hoodie Pareja - Naruto',
                category: 'parejas',
                price: 129900,
                image: 'img/products/pareja2.jpg',
                badge: ''
            },
            {
                id: 5,
                title: 'Camiseta Grupo - One Piece',
                category: 'amigos',
                price: 84900,
                image: 'img/products/amigos2.jpg',
                badge: 'Nuevo'
            },
            {
                id: 6,
                title: 'Camiseta Individual - Demon Slayer',
                category: 'individual',
                price: 74900,
                image: 'img/products/individual2.jpg',
                badge: ''
            }
        ];

        // Generate product cards
        productsGrid.innerHTML = products.map(product => `
            <div class="product-card" data-category="${product.category}">
                <div class="product-image">
                    <img src="${product.image}" alt="${product.title}" loading="lazy">
                    ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
                </div>
                <div class="product-info">
                    <h3 class="product-title">${product.title}</h3>
                    <span class="product-category">${product.category.charAt(0).toUpperCase() + product.category.slice(1)}</span>
                    <div class="product-price">
                        <span class="current-price">$${product.price.toLocaleString()}</span>
                    </div>
                    <div class="product-actions">
                        <button class="add-to-cart btn btn-primary">
                            <i class="fas fa-cart-plus"></i> Añadir al carrito
                        </button>
                        <button class="wishlist-btn" aria-label="Añadir a favoritos">
                            <i class="far fa-heart"></i>
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
    }

    // ========== LAZY LOAD IMAGES ==========
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const image = entry.target;
                    image.src = image.dataset.src || image.src;
                    imageObserver.unobserve(image);
                }
            });
        });

        lazyImages.forEach(image => {
            imageObserver.observe(image);
        });
    }
});