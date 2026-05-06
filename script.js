// Products Data
const products = [
    {
        id: 1,
        title: "تيشرت رياضي عصري",
        price: 89,
        oldPrice: 199,
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=300&fit=crop",
        discount: "55%"
    },
    {
        id: 2,
        title: "جينز أزرق كلاسيكي",
        price: 149,
        oldPrice: 299,
        image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=300&fit=crop",
        discount: "50%"
    },
    {
        id: 3,
        title: "جاكيت شتوي أنيق",
        price: 299,
        oldPrice: 599,
        image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=300&fit=crop",
        discount: "50%"
    },
    {
        id: 4,
        title: "بلوفر صوفي دافئ",
        price: 199,
        oldPrice: 399,
        image: "https://images.unsplash.com/photo-1529139578434-4a3ed2c6a9d4?w=400&h=300&fit=crop",
        discount: "50%"
    },
    {
        id: 5,
        title: "شورت رياضي مريح",
        price: 69,
        oldPrice: 149,
        image: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=400&h=300&fit=crop",
        discount: "54%"
    },
    {
        id: 6,
        title: "قميص رسمي أسود",
        price: 129,
        oldPrice: 259,
        image: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=400&h=300&fit=crop",
        discount: "50%"
    },
    {
        id: 7,
        title: "بنطلون رياضي",
        price: 119,
        oldPrice: 249,
        image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=300&fit=crop",
        discount: "52%"
    },
    {
        id: 8,
        title: "هودي شتوي كبير",
        price: 249,
        oldPrice: 499,
        image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=300&fit=crop",
        discount: "50%"
    },
    {
        id: 9,
        title: "تيشرت أبيض بسيط",
        price: 79,
        oldPrice: 169,
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=300&fit=crop",
        discount: "53%"
    },
    {
        id: 10,
        title: "جينز رمادي عصري",
        price: 169,
        oldPrice: 349,
        image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=300&fit=crop",
        discount: "52%"
    }
];

let cart = [];

// DOM Elements
const productsGrid = document.getElementById('productsGrid');
const cartModal = document.getElementById('cartModal');
const paymentModal = document.getElementById('paymentModal');
const quickViewModal = document.getElementById('quickViewModal');
const cartCount = document.getElementById('cartCount');
const cartItems = document.getElementById('cartItems');
const totalPrice = document.getElementById('totalPrice');
const checkoutBtn = document.getElementById('checkoutBtn');

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    renderProducts();
    updateCartCount();
});

// Render Products
function renderProducts() {
    productsGrid.innerHTML = products.map(product => `
        <div class="product-card">
            <div class="product-image">
                <img src="${product.image}" alt="${product.title}">
                <div class="discount-badge">${product.discount}</div>
            </div>
            <div class="product-info">
                <h3 class="product-title">${product.title}</h3>
                <div class="product-price">
                    ${product.price} <span class="currency">درهم</span>
                    <span class="old-price">${product.oldPrice} درهم</span>
                </div>
                <div class="product-actions">
                    <button class="btn-quickview" onclick="openQuickView(${product.id})">
                        <i class="fas fa-eye"></i> تفاصيل
                    </button>
                    <button class="btn-add-cart" onclick="addToCart(${product.id})">
                        <i class="fas fa-cart-plus"></i> إضافة
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// Add to Cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    
    updateCartCount();
    showNotification('تم إضافة المنتج للسلة! 🛒');
}

// Update Cart Count
function updateCartCount() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
    cartCount.style.display = totalItems > 0 ? 'block' : 'none';
}

// Cart Modal
document.querySelector('.cart-icon').addEventListener('click', () => {
    renderCart();
    cartModal.style.display = 'block';
});

function renderCart() {
    if (cart.length === 0) {
        cartItems.innerHTML = '<p style="text-align: center; color: #999; padding: 40px;">السلة فارغة 😔</p>';
        totalPrice.textContent = '0';
        return;
    }
    
    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.title}">
            <div class="cart-item-info">
                <h4>${item.title}</h4>
                <p>${item.price} درهم</p>
            </div>
            <div style="margin-left: auto;">
                <div style="display: flex; gap: 10px; align-items: center;">
                    <button onclick="changeQuantity(${item.id}, -1)" style="width: 30px; height: 30px; border: none; background: #667eea; color: white; border-radius: 5px; cursor: pointer;">-</button>
                    <span>${item.quantity}</span>
                    <button onclick="changeQuantity(${item.id}, 1)" style="width: 30px; height: 30px; border: none; background: #667eea; color: white; border-radius: 5px; cursor: pointer;">+</button>
                </div>
                <button onclick="removeFromCart(${item.id})" style="margin-top: 10px; background: #ff6b6b; color: white; border: none; padding: 5px 10px; border-radius: 5px; cursor: pointer;">حذف</button>
            </div>
        </div>
    `).join('');
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    totalPrice.textContent = total;
}

// Change Quantity
function changeQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            renderCart();
            updateCartCount();
        }
    }
}

// Remove from Cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    renderCart();
    updateCartCount();
}

// Checkout
checkoutBtn.addEventListener('click', () => {
    cartModal.style.display = 'none';
    paymentModal.style.display = 'block';
});

// Quick View
function openQuickView(productId) {
    const product = products.find(p => p.id === productId);
    document.getElementById('quickViewContent').innerHTML = `
        <img src="${product.image}" alt="${product.title}">
        <h2 class="product-title">${product.title}</h2>
        <div class="product-price">${product.price} درهم <span class="old-price">${product.old-price} درهم</span></div>
        <p style="margin: 20px 0; color: #666; line-height: 1.6;">
            جودة عالية 100% قطن طبيعي. تصميم عصري يناسب جميع المناسبات.
            شحن مجاني لكل الطلبات + ضمان استبدال 30 يوم.
        </p>
        <div style="display: flex; gap: 15px;">
            <button class="btn-add-cart" onclick="addToCart(${product.id})" style="flex: 1;">
                إضافة للسلة
            </button>
            <button class="btn-quickview" onclick="closeQuickView()" style="flex: 1;">
                إغلاق
            </button>
        </div>
    `;
    quickViewModal.style.display = 'block';
}

function closeQuickView() {
    quickViewModal.style.display = 'none';
}

// Close Modals
document.querySelector('.close').addEventListener('click', () => {
    cartModal.style.display = 'none';
});

document.getElementById('closePayment').addEventListener('click', () => {
    paymentModal.style.display = 'none';
});

document.getElementById('closeQuickView').addEventListener('click', closeQuickView);

// Close on outside click
window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = 'none';
    }
}

// Payment Methods
document.querySelectorAll('.payment-method').forEach(method => {
    method.addEventListener('click', function() {
        const paymentType = this.dataset.method;
        let message = '';
        
        switch(paymentType) {
            case 'whatsapp':
                message = `مرحبا! أريد شراء ${cart.length} منتجات\nالمجموع: ${totalPrice.textContent} درهم\n${cart.map(item => `${item.title} x${item.quantity}`).join('\n')}`;
                window.open(`https://wa.me/212709638822?text=${encodeURIComponent(message)}`, '_blank');
                break;
            case 'paypal':
                alert('سيتم توجيهك لصفحة PayPal قريباً...');
                break;
            case 'visa':
                alert('الدفع بالبطاقة الائتمانية آمن ومضمون');
                break;
            case 'googleplay':
                alert('يمكنك الدفع برصيد Google Play');
                break;
        }
        
        paymentModal.style.display = 'none';
        cart = [];
        updateCartCount();
    });
});

// Notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: linear-gradient(45deg, #ff6b6b, #feca57);
        color: white;
        padding: 15px 30px;
        border-radius: 25px;
        font-weight: bold;
        z-index: 3000;
        animation: slideDown 0.3s ease;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Add CSS for notification
const style = document.createElement('style');
style.textContent = `
    @keyframes slideDown {
        from { transform: translateX(-50%) translateY(-100%); opacity: 0; }
        to { transform: translateX(-50%) translateY(0); opacity: 1; }
    }
`;
document.head.appendChild(style);

// Smooth Scroll
document.querySelector('.cta-btn').addEventListener('click', () => {
    document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
});