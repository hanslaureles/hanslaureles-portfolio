/**
 * AURA COFFEE & KITCHEN — 1-Page Checkout Controller
 * Handles order summary rendering, courier toggle, Philippine payment method selection,
 * demo autofill, and order submission to confirmation receipt.
 */

(function () {
  'use strict';

  const CART_STORAGE_KEY = 'aura_coffee_cart_v2';
  const ORDER_STORAGE_KEY = 'aura_last_order';
  const FREE_DELIVERY_THRESHOLD = 500;
  const STANDARD_DELIVERY_FEE = 60;
  const EXPRESS_DELIVERY_FEE = 120;

  let cart = [];
  let selectedCourier = 'standard';
  let selectedPayment = 'gcash';

  // --- 1. Load or Initialize Cart ---
  function loadCart() {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      cart = saved ? JSON.parse(saved) : [];
    } catch (e) {
      cart = [];
    }

    // Default demo cart if empty
    if (!cart || cart.length === 0) {
      cart = [
        {
          key: 'spanish-latte-regular',
          id: 'spanish-latte',
          name: 'Signature Spanish Latte',
          image: 'assets/spanish_latte.jpg',
          unitPrice: 185,
          qty: 2,
          isBeverage: true,
          customizations: {
            size: 'Regular (12oz)',
            milk: 'Oat Milk',
            sweetness: '70% (Less Sweet)',
            ice: 'Regular Ice'
          }
        },
        {
          key: 'artisan-croissant',
          id: 'artisan-croissant',
          name: 'Artisanal Butter Croissant',
          image: 'assets/artisan_croissant.jpg',
          unitPrice: 120,
          qty: 1,
          isBeverage: false,
          customizations: null
        }
      ];
      try {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
      } catch (e) {}
    }
  }

  // --- 2. Compute Totals & Render Summary ---
  function renderOrderSummary() {
    const itemsList = document.getElementById('checkout-items-list');
    const subtotalEl = document.getElementById('sum-subtotal');
    const deliveryEl = document.getElementById('sum-delivery');
    const totalEl = document.getElementById('sum-total');
    const submitBtnPrice = document.getElementById('submit-btn-price');
    const stdFeeEl = document.getElementById('std-courier-fee');

    let subtotal = 0;
    if (itemsList) {
      itemsList.innerHTML = cart.map(item => {
        const itemTotal = item.unitPrice * item.qty;
        subtotal += itemTotal;
        const mods = item.customizations 
          ? `${item.customizations.size} · ${item.customizations.milk} · ${item.customizations.sweetness}`
          : 'Fresh Daily Bake';

        return `
          <div style="display: flex; gap: 12px; align-items: center; justify-content: space-between;">
            <div style="display: flex; gap: 10px; align-items: center;">
              <img src="${item.image}" alt="${item.name}" style="width: 48px; height: 48px; border-radius: 8px; object-fit: cover; flex-shrink: 0;" />
              <div>
                <div style="font-weight: 700; font-size: 0.90rem; color: var(--espresso-dark);">${item.name}</div>
                <div style="font-size: 0.74rem; color: var(--espresso-light);">${mods}</div>
                <div style="font-size: 0.76rem; font-weight: 600; color: var(--espresso-muted);">Qty: ${item.qty}</div>
              </div>
            </div>
            <div style="font-weight: 800; font-size: 0.92rem; color: var(--espresso-dark);">
              ₱${itemTotal.toFixed(2)}
            </div>
          </div>
        `;
      }).join('');
    }

    // Courier calculation
    const qualifiesFree = subtotal >= FREE_DELIVERY_THRESHOLD;
    let deliveryFee = 0;
    if (selectedCourier === 'express') {
      deliveryFee = EXPRESS_DELIVERY_FEE;
    } else {
      deliveryFee = qualifiesFree ? 0 : STANDARD_DELIVERY_FEE;
    }

    const finalTotal = subtotal + deliveryFee;

    if (subtotalEl) subtotalEl.textContent = `₱${subtotal.toFixed(2)}`;
    if (stdFeeEl) stdFeeEl.textContent = qualifiesFree ? 'FREE' : `₱${STANDARD_DELIVERY_FEE.toFixed(2)}`;
    if (deliveryEl) deliveryEl.textContent = deliveryFee === 0 ? 'FREE' : `₱${deliveryFee.toFixed(2)}`;
    if (totalEl) totalEl.textContent = `₱${finalTotal.toFixed(2)}`;
    if (submitBtnPrice) submitBtnPrice.textContent = `₱${finalTotal.toFixed(2)}`;
  }

  // --- 3. Interactive Handlers ---
  window.updateCourierOption = function (courierType) {
    selectedCourier = courierType;
    renderOrderSummary();
  };

  window.selectPaymentMethod = function (methodKey, el) {
    selectedPayment = methodKey;
    document.querySelectorAll('.payment-method-pill').forEach(p => p.classList.remove('active'));
    if (el) el.classList.add('active');
  };

  window.autofillDemo = function () {
    document.getElementById('email').value = 'maria.santos@gmail.com';
    document.getElementById('firstName').value = 'Maria';
    document.getElementById('lastName').value = 'Santos';
    document.getElementById('phone').value = '0917 842 1900';
    document.getElementById('street').value = 'Unit 14B, Arya Residences, McKinley Pkwy';
    document.getElementById('barangay').value = 'Fort Bonifacio';
    document.getElementById('city').value = 'Taguig City';
    document.getElementById('province').value = 'Metro Manila';
    document.getElementById('zip').value = '1634';
  };

  window.quickExpressPay = function (walletName) {
    window.autofillDemo();
    const pill = document.querySelector(`[data-method="${walletName.toLowerCase()}"]`);
    if (pill) {
      window.selectPaymentMethod(walletName.toLowerCase(), pill);
    }
    const form = document.getElementById('checkout-form');
    if (form) {
      form.requestSubmit();
    }
  };

  // --- 4. Place Order & Route to Scalloped Confirmation Receipt ---
  window.handlePlaceOrder = function (event) {
    event.preventDefault();

    const email = document.getElementById('email').value.trim();
    const firstName = document.getElementById('firstName').value.trim();
    const lastName = document.getElementById('lastName').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const street = document.getElementById('street').value.trim();
    const barangay = document.getElementById('barangay').value.trim();
    const city = document.getElementById('city').value.trim();

    if (!email || !firstName || !street || !phone) {
      alert('Please fill in your delivery details.');
      return;
    }

    const subtotal = cart.reduce((acc, i) => acc + (i.unitPrice * i.qty), 0);
    const qualifiesFree = subtotal >= FREE_DELIVERY_THRESHOLD;
    const deliveryFee = selectedCourier === 'express' 
      ? EXPRESS_DELIVERY_FEE 
      : (qualifiesFree ? 0 : STANDARD_DELIVERY_FEE);
    const totalAmount = subtotal + deliveryFee;

    const orderNum = 'AUR-' + Math.floor(1000 + Math.random() * 9000);
    const orderData = {
      orderId: orderNum,
      timestamp: new Date().toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' }),
      customer: {
        name: `${firstName} ${lastName}`,
        email: email,
        phone: phone,
        address: `${street}, ${barangay}, ${city}`
      },
      courier: selectedCourier === 'express' ? 'Priority Heat-Sealed Dispatch' : 'Standard Roastery Courier',
      paymentMethod: selectedPayment.toUpperCase(),
      items: cart,
      subtotal: subtotal,
      deliveryFee: deliveryFee,
      total: totalAmount
    };

    // Show processing button state
    const submitBtn = document.getElementById('place-order-main-btn');
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = `<span>Connecting to ${orderData.paymentMethod} Gateway...</span>`;
    }

    // Simulate instant gateway confirmation
    setTimeout(() => {
      try {
        localStorage.setItem(ORDER_STORAGE_KEY, JSON.stringify(orderData));
        localStorage.removeItem(CART_STORAGE_KEY);
      } catch (e) {}
      window.location.href = 'confirmation.html';
    }, 900);
  };

  // --- 5. Init on Load ---
  document.addEventListener('DOMContentLoaded', () => {
    loadCart();
    renderOrderSummary();
  });

})();
