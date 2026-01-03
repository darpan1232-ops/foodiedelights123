// Cart management functions
function getCart() {
    return JSON.parse(localStorage.getItem('cart')) || [];
}

function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function addToCart(productId, name, price, imageUrl) {
    let cart = getCart();
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: productId,
            name: name,
            price: price,
            imageUrl: imageUrl,
            quantity: 1
        });
    }
    
    saveCart(cart);
    updateCartBadge();
    alert('Item added to cart!');
}

function removeFromCart(productId) {
    let cart = getCart();
    cart = cart.filter(item => item.id !== productId);
    saveCart(cart);
    displayCart();
    updateCartBadge();
}

function updateQuantity(productId, change) {
    let cart = getCart();
    const item = cart.find(item => item.id === productId);
    
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productId);
            return;
        }
        saveCart(cart);
        displayCart();
        updateCartBadge();
    }
}

function displayCart() {
    const cart = getCart();
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    
    if (!cartItems) return;
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p style="text-align: center; padding: 2rem;">Your cart is empty.</p>';
        if (cartTotal) cartTotal.textContent = '0.00';
        return;
    }
    
    let total = 0;
    cartItems.innerHTML = cart.map(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        return `
            <div class="cart-item">
                <div class="cart-item-info">
                    <h3>${item.name}</h3>
                    <p>$${item.price.toFixed(2)} each</p>
                </div>
                <div class="cart-item-controls">
                    <div class="quantity-controls">
                        <button onclick="updateQuantity('${item.id}', -1)">-</button>
                        <span>${item.quantity}</span>
                        <button onclick="updateQuantity('${item.id}', 1)">+</button>
                    </div>
                    <div style="font-weight: 600; min-width: 80px; text-align: right;">
                        $${itemTotal.toFixed(2)}
                    </div>
                    <button onclick="removeFromCart('${item.id}')" style="background: #dc3545; color: white; border: none; padding: 0.5rem 1rem; border-radius: 5px; cursor: pointer;">Remove</button>
                </div>
            </div>
        `;
    }).join('');
    
    if (cartTotal) cartTotal.textContent = total.toFixed(2);
}

function updateCartBadge() {
    const cart = getCart();
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    // You can add a badge element in the navbar if needed
}

function goToCheckout() {
    const cart = getCart();
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    window.location.href = '/checkout';
}

// Initialize cart badge on page load
document.addEventListener('DOMContentLoaded', function() {
    updateCartBadge();
});

