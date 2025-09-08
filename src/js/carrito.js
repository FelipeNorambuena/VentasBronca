/**
 * ===============================
 * SISTEMA DE CARRITO DE COMPRAS
 * ===============================
 * Este script maneja toda la funcionalidad del carrito de compras:
 * - Agregar productos
 * - Modificar cantidades
 * - Eliminar productos
 * - Persistencia en localStorage
 * - Integración con WhatsApp
 */

// ===== INICIALIZACIÓN DE VARIABLES GLOBALES =====

// Cargar carrito desde localStorage o inicializar como array vacío
let cart = JSON.parse(localStorage.getItem('ventasbronca_cart')) || [];

// Referencias a elementos del DOM para mejor rendimiento
const cartElements = {
    items: document.getElementById('cart-items'),
    count: document.getElementById('cart-count'),
    countNav: document.getElementById('cart-count-nav'),
    empty: document.getElementById('cart-empty'),
    summary: document.getElementById('cart-summary'),
    totalItems: document.getElementById('total-items'),
    totalPrice: document.getElementById('total-price'),
    checkoutBtn: document.getElementById('checkout-btn')
};

// ===== FUNCIONES UTILITARIAS =====

function saveCart() {
    try {
        localStorage.setItem('ventasbronca_cart', JSON.stringify(cart));
    } catch (error) {
        console.error('Error al guardar el carrito:', error);
        showNotification('Error al guardar el carrito', 'error');
    }
}

function formatCurrency(amount) {
    return new Intl.NumberFormat('es-CL', {
        style: 'currency',
        currency: 'CLP'
    }).format(amount);
}

function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `alert alert-${type === 'error' ? 'danger' : type} alert-dismissible fade show position-fixed`;
    notification.style.cssText = 'top: 100px; right: 20px; z-index: 1060; min-width: 300px;';
    notification.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;
    document.body.appendChild(notification);
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 3000);
}

// ===== FUNCIONES DEL CARRITO =====

function updateCart() {
    cartElements.items.innerHTML = '';
    let totalItems = 0;
    let totalPrice = 0;
    if (cart.length === 0) {
        cartElements.empty.style.display = 'block';
        cartElements.summary.classList.add('d-none');
        cartElements.checkoutBtn.disabled = true;
    } else {
        cartElements.empty.style.display = 'none';
        cartElements.summary.classList.remove('d-none');
        cartElements.checkoutBtn.disabled = false;
        cart.forEach(item => {
            totalItems += item.quantity;
            totalPrice += item.price * item.quantity;
            const listItem = document.createElement('li');
            listItem.className = 'list-group-item';
            listItem.innerHTML = `
                <div class="d-flex justify-content-between align-items-start">
                    <div class="flex-grow-1">
                        <h6 class="mb-1">${item.name}</h6>
                        <small class="text-muted">SKU: ${item.sku}</small>
                        <div class="mt-2">
                            <span class="badge bg-primary">${item.quantity} × ${formatCurrency(item.price)}</span>
                            <span class="fw-bold ms-2">${formatCurrency(item.price * item.quantity)}</span>
                        </div>
                    </div>
                    <div class="btn-group-vertical btn-group-sm ms-3" role="group">
                        <button class="btn btn-outline-secondary modify-qty" 
                                data-id="${item.id}" data-change="1" 
                                aria-label="Aumentar cantidad">
                            <i class="fas fa-plus"></i>
                        </button>
                        <button class="btn btn-outline-secondary modify-qty" 
                                data-id="${item.id}" data-change="-1" 
                                aria-label="Disminuir cantidad">
                            <i class="fas fa-minus"></i>
                        </button>
                        <button class="btn btn-outline-danger delete-item" 
                                data-id="${item.id}" 
                                aria-label="Eliminar producto">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            `;
            cartElements.items.appendChild(listItem);
        });
        cartElements.totalItems.textContent = totalItems;
        cartElements.totalPrice.textContent = formatCurrency(totalPrice);
    }
    cartElements.count.textContent = totalItems;
    if (cartElements.countNav) {
        cartElements.countNav.textContent = totalItems;
    }
    saveCart();
}

function addToCart(product) {
    if (!product.id || !product.name || !product.price) {
        showNotification('Error: Datos del producto incompletos', 'error');
        return;
    }
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
        existingItem.quantity += product.quantity;
        showNotification(`Se agregaron ${product.quantity} ${product.name}(s) más al carrito`, 'info');
    } else {
        cart.push(product);
        showNotification(`${product.name} agregado al carrito`, 'success');
    }
    updateCart();
}

function modifyQuantity(productId, change) {
    const item = cart.find(i => i.id === productId);
    if (!item) return;
    item.quantity += change;
    if (item.quantity <= 0) {
        if (confirm(`¿Eliminar ${item.name} del carrito?`)) {
            removeFromCart(productId);
        } else {
            item.quantity = 1;
        }
    }
    updateCart();
}

function removeFromCart(productId) {
    const item = cart.find(i => i.id === productId);
    if (item && confirm(`¿Eliminar ${item.name} del carrito?`)) {
        cart = cart.filter(i => i.id !== productId);
        updateCart();
        showNotification('Producto eliminado del carrito', 'info');
    }
}

document.addEventListener('click', function(e) {
    if (e.target.closest('.add-to-cart')) {
        const button = e.target.closest('.add-to-cart');
        const quantityInput = button.parentElement.querySelector('.qty-input');
        const quantity = parseInt(quantityInput.value) || 1;
        if (quantity < 1 || quantity > 10) {
            showNotification('La cantidad debe estar entre 1 y 10', 'error');
            quantityInput.value = 1;
            return;
        }
        const product = {
            id: button.getAttribute('data-id'),
            sku: button.getAttribute('data-sku'),
            name: button.getAttribute('data-name'),
            price: parseInt(button.getAttribute('data-price')),
            quantity: quantity
        };
        addToCart(product);
        quantityInput.value = 1;
    }
});

cartElements.items.addEventListener('click', function(e) {
    const productId = e.target.closest('button')?.getAttribute('data-id');
    if (!productId) return;
    if (e.target.closest('.modify-qty')) {
        const change = parseInt(e.target.closest('button').getAttribute('data-change'));
        modifyQuantity(productId, change);
    } else if (e.target.closest('.delete-item')) {
        removeFromCart(productId);
    }
});

cartElements.checkoutBtn.addEventListener('click', function() {
    if (cart.length === 0) {
        showNotification('El carrito está vacío', 'error');
        return;
    }
    let message = "¡Hola! Me interesa adquirir los siguientes productos:%0A%0A";
    let totalPrice = 0;
    cart.forEach(item => {
        const subtotal = item.price * item.quantity;
        totalPrice += subtotal;
        message += `• ${item.name}%0A`;
        message += `  Cantidad: ${item.quantity}%0A`;
        message += `  Precio unitario: ${formatCurrency(item.price)}%0A`;
        message += `  Subtotal: ${formatCurrency(subtotal)}%0A%0A`;
    });
    message += `TOTAL: ${formatCurrency(totalPrice)}%0A%0A`;
    message += "¿Están disponibles? ¡Gracias!";
    const phoneNumber = "56974161396";
    const whatsappURL = `https://api.whatsapp.com/send/?phone=${phoneNumber}&text=${message}&type=phone_number&app_absent=0`;
    window.open(whatsappURL, '_blank');
    showNotification('Redirigiendo a WhatsApp...', 'success');
});

document.addEventListener('input', function(e) {
    if (e.target.classList.contains('qty-input')) {
        const value = parseInt(e.target.value);
        if (value < 1) e.target.value = 1;
        if (value > 10) e.target.value = 10;
    }
});

document.addEventListener('DOMContentLoaded', function() {
    updateCart();
    console.log('Sistema de carrito VentasBronca inicializado correctamente');
});

updateCart();
