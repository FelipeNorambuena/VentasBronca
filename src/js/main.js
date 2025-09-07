/**
 * ===============================
 * VENTASBRONCA - SCRIPT PRINCIPAL
 * ===============================
 * 
 * Archivo: main.js
 * Descripción: Script principal para funcionalidades adicionales
 * Tecnologías: JavaScript ES6+, Bootstrap 5, LocalStorage API
 * Autor: VentasBronca Team
 * Fecha: 2025
 */

// ===== CONFIGURACIÓN Y CONSTANTES =====

const CONFIG = {
    WHATSAPP_NUMBER: '56961790214',
    CART_STORAGE_KEY: 'ventasbronca_cart',
    MAX_QUANTITY: 10,
    MIN_QUANTITY: 1,
    ANIMATION_DURATION: 300,
    NOTIFICATION_DURATION: 3000
};

// ===== UTILIDADES GENERALES =====

/**
 * Clase utilitaria para funciones comunes
 */
class Utils {
    /**
     * Valida si un email es válido
     * @param {string} email - Email a validar
     * @returns {boolean} - True si es válido
     */
    static isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    /**
     * Valida si un teléfono chileno es válido
     * @param {string} phone - Teléfono a validar
     * @returns {boolean} - True si es válido
     */
    static isValidChileanPhone(phone) {
        const phoneRegex = /^(\+?56)?[2-9]\d{8}$/;
        return phoneRegex.test(phone.replace(/\s+/g, ''));
    }

    /**
     * Sanitiza una cadena de texto
     * @param {string} str - Cadena a sanitizar
     * @returns {string} - Cadena sanitizada
     */
    static sanitizeString(str) {
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }

    /**
     * Debounce function para optimizar eventos
     * @param {Function} func - Función a ejecutar
     * @param {number} wait - Tiempo de espera en ms
     * @returns {Function} - Función con debounce aplicado
     */
    static debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    /**
     * Genera un ID único
     * @returns {string} - ID único
     */
    static generateUniqueId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }
}

// ===== SISTEMA DE VALIDACIÓN DE FORMULARIOS =====

/**
 * Clase para validación de formularios
 */
class FormValidator {
    constructor(form) {
        this.form = form;
        this.errors = [];
        this.init();
    }

    /**
     * Inicializa el validador
     */
    init() {
        this.addEventListeners();
        this.createErrorContainer();
    }

    /**
     * Agrega event listeners para validación en tiempo real
     */
    addEventListeners() {
        const inputs = this.form.querySelectorAll('input, textarea, select');
        
        inputs.forEach(input => {
            // Validación en tiempo real
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', Utils.debounce(() => this.validateField(input), 300));
        });

        // Validación al enviar formulario
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    }

    /**
     * Crea contenedor para mostrar errores
     */
    createErrorContainer() {
        if (!this.form.querySelector('.validation-errors')) {
            const errorContainer = document.createElement('div');
            errorContainer.className = 'validation-errors alert alert-danger d-none';
            errorContainer.setAttribute('role', 'alert');
            this.form.prepend(errorContainer);
        }
    }

    /**
     * Valida un campo específico
     * @param {HTMLElement} field - Campo a validar
     * @returns {boolean} - True si es válido
     */
    validateField(field) {
        const value = field.value.trim();
        const fieldName = field.getAttribute('name') || field.getAttribute('id');
        let isValid = true;
        let errorMessage = '';

        // Limpiar errores previos
        this.clearFieldError(field);

        // Validaciones según el tipo de campo
        switch (field.type) {
            case 'email':
                if (value && !Utils.isValidEmail(value)) {
                    isValid = false;
                    errorMessage = 'Por favor, ingresa un email válido';
                }
                break;

            case 'tel':
                if (value && !Utils.isValidChileanPhone(value)) {
                    isValid = false;
                    errorMessage = 'Por favor, ingresa un teléfono chileno válido';
                }
                break;

            case 'number':
                const min = parseInt(field.getAttribute('min'));
                const max = parseInt(field.getAttribute('max'));
                const numValue = parseInt(value);
                
                if (value && (numValue < min || numValue > max)) {
                    isValid = false;
                    errorMessage = `El valor debe estar entre ${min} y ${max}`;
                }
                break;

            case 'text':
            case 'textarea':
                const minLength = parseInt(field.getAttribute('minlength'));
                const maxLength = parseInt(field.getAttribute('maxlength'));
                
                if (field.hasAttribute('required') && !value) {
                    isValid = false;
                    errorMessage = 'Este campo es obligatorio';
                } else if (minLength && value.length < minLength) {
                    isValid = false;
                    errorMessage = `Mínimo ${minLength} caracteres requeridos`;
                } else if (maxLength && value.length > maxLength) {
                    isValid = false;
                    errorMessage = `Máximo ${maxLength} caracteres permitidos`;
                }
                break;
        }

        // Mostrar error si existe
        if (!isValid) {
            this.showFieldError(field, errorMessage);
        }

        return isValid;
    }

    /**
     * Muestra error en un campo específico
     * @param {HTMLElement} field - Campo con error
     * @param {string} message - Mensaje de error
     */
    showFieldError(field, message) {
        field.classList.add('is-invalid');
        
        let feedback = field.parentElement.querySelector('.invalid-feedback');
        if (!feedback) {
            feedback = document.createElement('div');
            feedback.className = 'invalid-feedback';
            field.parentElement.appendChild(feedback);
        }
        
        feedback.textContent = message;
        feedback.style.display = 'block';
    }

    /**
     * Limpia errores de un campo
     * @param {HTMLElement} field - Campo a limpiar
     */
    clearFieldError(field) {
        field.classList.remove('is-invalid');
        const feedback = field.parentElement.querySelector('.invalid-feedback');
        if (feedback) {
            feedback.style.display = 'none';
        }
    }

    /**
     * Valida todo el formulario
     * @returns {boolean} - True si todo es válido
     */
    validateForm() {
        const inputs = this.form.querySelectorAll('input[required], textarea[required], select[required]');
        let isFormValid = true;

        inputs.forEach(input => {
            if (!this.validateField(input)) {
                isFormValid = false;
            }
        });

        return isFormValid;
    }

    /**
     * Maneja el envío del formulario
     * @param {Event} e - Evento de envío
     */
    handleSubmit(e) {
        e.preventDefault();
        
        if (this.validateForm()) {
            this.onValidSubmit();
        } else {
            this.showGeneralError('Por favor, corrige los errores antes de continuar.');
        }
    }

    /**
     * Muestra error general del formulario
     * @param {string} message - Mensaje de error
     */
    showGeneralError(message) {
        const errorContainer = this.form.querySelector('.validation-errors');
        errorContainer.textContent = message;
        errorContainer.classList.remove('d-none');
        
        // Scroll al error
        errorContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    /**
     * Método a sobrescribir para manejar envío válido
     */
    onValidSubmit() {
        console.log('Formulario válido - sobrescribir este método');
    }
}

// ===== SISTEMA DE BÚSQUEDA =====

/**
 * Clase para funcionalidad de búsqueda
 */
class SearchSystem {
    constructor() {
        this.searchInput = document.querySelector('input[type="search"]');
        this.products = [];
        this.init();
    }

    /**
     * Inicializa el sistema de búsqueda
     */
    init() {
        if (this.searchInput) {
            this.loadProducts();
            this.addEventListeners();
            this.createSearchResults();
        }
    }

    /**
     * Carga productos para búsqueda
     */
    loadProducts() {
        const productCards = document.querySelectorAll('.product-card');
        
        productCards.forEach(card => {
            const title = card.querySelector('.card-title')?.textContent.trim();
            const description = card.querySelector('.card-text')?.textContent.trim();
            const sku = card.querySelector('[data-sku]')?.getAttribute('data-sku');
            const price = card.querySelector('[data-price]')?.getAttribute('data-price');
            
            if (title) {
                this.products.push({
                    title,
                    description,
                    sku,
                    price: parseInt(price),
                    element: card.closest('.col'),
                    searchText: `${title} ${description} ${sku}`.toLowerCase()
                });
            }
        });
    }

    /**
     * Agrega event listeners para búsqueda
     */
    addEventListeners() {
        // Búsqueda en tiempo real
        this.searchInput.addEventListener('input', 
            Utils.debounce(() => this.performSearch(), 300)
        );

        // Búsqueda al enviar formulario
        this.searchInput.closest('form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.performSearch();
        });

        // Limpiar búsqueda con Escape
        this.searchInput.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.clearSearch();
            }
        });
    }

    /**
     * Crea contenedor para resultados de búsqueda
     */
    createSearchResults() {
        const searchResults = document.createElement('div');
        searchResults.id = 'search-results';
        searchResults.className = 'search-results position-absolute bg-white shadow-lg rounded-3 p-3 d-none';
        searchResults.style.cssText = `
            top: 100%;
            left: 0;
            right: 0;
            z-index: 1060;
            max-height: 300px;
            overflow-y: auto;
        `;
        
        this.searchInput.parentElement.style.position = 'relative';
        this.searchInput.parentElement.appendChild(searchResults);
    }

    /**
     * Realiza la búsqueda
     */
    performSearch() {
        const query = this.searchInput.value.trim().toLowerCase();
        
        if (query.length < 2) {
            this.clearSearch();
            return;
        }

        const results = this.products.filter(product => 
            product.searchText.includes(query)
        );

        this.displayResults(results, query);
        this.highlightProducts(results);
    }

    /**
     * Muestra resultados de búsqueda
     * @param {Array} results - Resultados encontrados
     * @param {string} query - Término de búsqueda
     */
    displayResults(results, query) {
        const resultsContainer = document.getElementById('search-results');
        
        if (results.length === 0) {
            resultsContainer.innerHTML = `
                <div class="text-center text-muted">
                    <i class="fas fa-search fa-2x mb-2"></i>
                    <p>No se encontraron productos para "${query}"</p>
                </div>
            `;
        } else {
            resultsContainer.innerHTML = `
                <div class="mb-2">
                    <small class="text-muted">${results.length} producto(s) encontrado(s)</small>
                </div>
                ${results.slice(0, 5).map(product => `
                    <div class="search-result-item p-2 rounded hover-bg-light cursor-pointer" 
                         data-product-id="${product.sku}">
                        <strong>${this.highlightText(product.title, query)}</strong>
                        <small class="d-block text-muted">SKU: ${product.sku} - ${Utils.formatCurrency(product.price)}</small>
                    </div>
                `).join('')}
                ${results.length > 5 ? `<small class="text-muted">Y ${results.length - 5} más...</small>` : ''}
            `;
            
            // Agregar event listeners a resultados
            resultsContainer.querySelectorAll('.search-result-item').forEach(item => {
                item.addEventListener('click', () => {
                    const productId = item.getAttribute('data-product-id');
                    this.scrollToProduct(productId);
                    this.clearSearch();
                });
            });
        }
        
        resultsContainer.classList.remove('d-none');
    }

    /**
     * Resalta texto de búsqueda
     * @param {string} text - Texto original
     * @param {string} query - Término a resaltar
     * @returns {string} - Texto con resaltado
     */
    highlightText(text, query) {
        const regex = new RegExp(`(${query})`, 'gi');
        return text.replace(regex, '<mark>$1</mark>');
    }

    /**
     * Resalta productos en la página
     * @param {Array} results - Productos a resaltar
     */
    highlightProducts(results) {
        // Limpiar resaltados previos
        this.products.forEach(product => {
            product.element.style.display = '';
            product.element.classList.remove('search-highlighted');
        });

        // Ocultar productos que no coinciden
        if (results.length > 0) {
            this.products.forEach(product => {
                if (!results.includes(product)) {
                    product.element.style.display = 'none';
                } else {
                    product.element.classList.add('search-highlighted');
                }
            });
        }
    }

    /**
     * Scroll a un producto específico
     * @param {string} productId - ID del producto
     */
    scrollToProduct(productId) {
        const product = this.products.find(p => p.sku === productId);
        if (product) {
            product.element.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'center' 
            });
            
            // Efecto de resaltado temporal
            product.element.classList.add('pulse');
            setTimeout(() => {
                product.element.classList.remove('pulse');
            }, 2000);
        }
    }

    /**
     * Limpia la búsqueda
     */
    clearSearch() {
        this.searchInput.value = '';
        const resultsContainer = document.getElementById('search-results');
        resultsContainer.classList.add('d-none');
        
        // Mostrar todos los productos
        this.products.forEach(product => {
            product.element.style.display = '';
            product.element.classList.remove('search-highlighted');
        });
    }
}

// ===== SISTEMA DE SCROLL SUAVE =====

/**
 * Clase para navegación con scroll suave
 */
class SmoothScroll {
    constructor() {
        this.init();
    }

    /**
     * Inicializa el scroll suave
     */
    init() {
        // Agregar evento a todos los enlaces internos
        document.querySelectorAll('a[href^="#"]').forEach(link => {
            link.addEventListener('click', (e) => this.handleClick(e));
        });
    }

    /**
     * Maneja el click en enlaces internos
     * @param {Event} e - Evento de click
     */
    handleClick(e) {
        e.preventDefault();
        
        const targetId = e.target.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            const headerHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = targetElement.offsetTop - headerHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    }
}

// ===== SISTEMA DE LAZY LOADING PARA IMÁGENES =====

/**
 * Clase para carga perezosa de imágenes
 */
class LazyImageLoader {
    constructor() {
        this.images = document.querySelectorAll('img[loading="lazy"]');
        this.init();
    }

    /**
     * Inicializa el lazy loading
     */
    init() {
        if ('IntersectionObserver' in window) {
            this.observer = new IntersectionObserver(
                (entries) => this.handleIntersection(entries),
                { rootMargin: '50px' }
            );
            
            this.images.forEach(img => this.observer.observe(img));
        } else {
            // Fallback para navegadores sin soporte
            this.images.forEach(img => this.loadImage(img));
        }
    }

    /**
     * Maneja la intersección de imágenes
     * @param {Array} entries - Entradas del observer
     */
    handleIntersection(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                this.loadImage(entry.target);
                this.observer.unobserve(entry.target);
            }
        });
    }

    /**
     * Carga una imagen
     * @param {HTMLElement} img - Elemento de imagen
     */
    loadImage(img) {
        img.addEventListener('load', () => {
            img.classList.add('fade-in');
        });
        
        img.addEventListener('error', () => {
            img.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlbiBubyBkaXNwb25pYmxlPC90ZXh0Pjwvc3ZnPg==';
            img.alt = 'Imagen no disponible';
        });
    }
}

// ===== INICIALIZACIÓN DE LA APLICACIÓN =====

/**
 * Clase principal de la aplicación
 */
class App {
    constructor() {
        this.init();
    }

    /**
     * Inicializa la aplicación
     */
    init() {
        // Esperar a que el DOM esté listo
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.onDOMReady());
        } else {
            this.onDOMReady();
        }
    }

    /**
     * Se ejecuta cuando el DOM está listo
     */
    onDOMReady() {
        console.log('🚀 VentasBronca App iniciada');
        
        // Inicializar sistemas
        this.searchSystem = new SearchSystem();
        this.smoothScroll = new SmoothScroll();
        this.lazyImageLoader = new LazyImageLoader();
        
        // Inicializar validadores de formularios
        this.initFormValidators();
        
        // Agregar event listeners globales
        this.addGlobalEventListeners();
        
        // Configurar tooltips de Bootstrap
        this.initBootstrapComponents();
        
        console.log('✅ Todos los sistemas inicializados correctamente');
    }

    /**
     * Inicializa validadores de formularios
     */
    initFormValidators() {
        const forms = document.querySelectorAll('form');
        forms.forEach(form => {
            if (!form.classList.contains('no-validation')) {
                new FormValidator(form);
            }
        });
    }

    /**
     * Agrega event listeners globales
     */
    addGlobalEventListeners() {
        // Cerrar dropdowns al hacer click fuera
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.dropdown')) {
                const openDropdowns = document.querySelectorAll('.dropdown-menu.show');
                openDropdowns.forEach(dropdown => {
                    dropdown.classList.remove('show');
                });
            }
        });

        // Manejar errores de imágenes globalmente
        document.addEventListener('error', (e) => {
            if (e.target.tagName === 'IMG') {
                console.warn('Error al cargar imagen:', e.target.src);
            }
        }, true);
    }

    /**
     * Inicializa componentes de Bootstrap
     */
    initBootstrapComponents() {
        // Inicializar tooltips
        const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        tooltipTriggerList.map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));

        // Inicializar popovers
        const popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
        popoverTriggerList.map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl));
    }
}

// ===== EXPORTAR UTILIDADES PARA USO GLOBAL =====

// Hacer Utils disponible globalmente
window.VentasBroncaUtils = Utils;
window.VentasBroncaConfig = CONFIG;

// ===== INICIALIZAR APLICACIÓN =====

// Crear instancia de la aplicación
const app = new App();
