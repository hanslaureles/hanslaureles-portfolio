/**
 * AURA COFFEE & KITCHEN — Client-Side Storefront Engine
 * Warm, friendly, artisanal cafe experience.
 * Handles menu rendering, category filtering, drink configurator modal,
 * and slide-over cart drawer with free delivery progress.
 */

(function () {
  'use strict';

  // --- 1. Product Catalog ---
  const PRODUCTS = [
    {
      id: 'spanish-latte',
      name: 'Signature Spanish Latte',
      category: 'iced',
      categoryLabel: 'Iced Specialty · 12oz',
      basePrice: 185,
      rating: '4.9',
      reviewCount: '1.2k',
      badge: 'Bestseller',
      image: 'assets/spanish_latte.jpg',
      description: 'Velvety espresso marbling into sweetened condensed milk and cold oat milk over handcrafted ice cubes. Smooth, creamy, and delightful.',
      isBeverage: true
    },
    {
      id: 'velvet-cappuccino',
      name: 'Velvet Cappuccino',
      category: 'hot',
      categoryLabel: 'Hot Classic · 8oz',
      basePrice: 170,
      rating: '4.9',
      reviewCount: '890',
      badge: "Chef's Choice",
      image: 'assets/velvet_cappuccino.jpg',
      description: 'Silky micro-foam poured over a rich double shot of specialty Arabica espresso, crowned with delicate rosetta latte art.',
      isBeverage: true
    },
    {
      id: 'caramel-macchiato',
      name: 'Iced Caramel Macchiato',
      category: 'iced',
      categoryLabel: 'Iced Specialty · 12oz',
      basePrice: 195,
      rating: '4.8',
      reviewCount: '750',
      badge: 'Popular',
      image: 'assets/caramel_macchiato.jpg',
      description: 'Layers of vanilla sweet milk and bold espresso, finished with dense vanilla cold foam and a rich crisscross golden caramel drizzle.',
      isBeverage: true
    },
    {
      id: 'dark-mocha-frappe',
      name: 'Dark Mocha Frappé',
      category: 'blends',
      categoryLabel: 'Frappé & Blend · 16oz',
      basePrice: 210,
      rating: '4.8',
      reviewCount: '620',
      badge: 'Must Try',
      image: 'assets/dark_mocha_frappe.jpg',
      description: 'Single-estate espresso blended with rich dark chocolate, iced to perfection and topped with fresh fluffy whipped cream & dark cocoa curls.',
      isBeverage: true
    },
    {
      id: 'matcha-cloud',
      name: 'Matcha Cloud Latte',
      category: 'iced',
      categoryLabel: 'Botanical & Tea · 12oz',
      basePrice: 190,
      rating: '4.9',
      reviewCount: '540',
      badge: 'Trending',
      image: 'assets/matcha_cloud_latte.jpg',
      description: 'First-harvest ceremonial Japanese Uji matcha layered over chilled oat milk, crowned with a velvety sweet vanilla cloud foam.',
      isBeverage: true
    },
    {
      id: 'artisan-croissant',
      name: 'Artisanal Butter Croissant',
      category: 'bakery',
      categoryLabel: 'Fresh Bakery · Daily Bake',
      basePrice: 120,
      rating: '4.9',
      reviewCount: '980',
      badge: 'Fresh Daily',
      image: 'assets/artisan_croissant.jpg',
      description: 'Golden, flaky, and buttery layers crafted with pure French Normandy butter. Baked fresh every morning in our open kitchen.',
      isBeverage: false
    }
  ];

  // Options Pricing Rules
  const SIZE_SURCHARGES = {
    'Small (8oz)': -15,
    'Regular (12oz)': 0,
    'Large (16oz)': 30
  };

  const MILK_SURCHARGES = {
    'Whole Milk': 0,
    'Oat Milk': 30,
    'Almond Milk': 30,
    'Soy Milk': 20
  };

  const FREE_DELIVERY_THRESHOLD = 500;
  const STANDARD_DELIVERY_FEE = 60;
  const PROMO_CODE = 'AURASIP';
  const PROMO_DISCOUNT_PERCENT = 0.15;

  // --- 2. Cart State Management ---
  const CART_STORAGE_KEY = 'aura_coffee_cart_v2';
  let cart = [];
  let currentDiscount = 0; // percentage as decimal

  function loadCart() {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      cart = saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.warn('Could not load cart from storage', e);
      cart = [];
    }
  }

  function saveCart() {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (e) {
      console.warn('Could not save cart to storage', e);
    }
    updateCartUI();
  }

  // --- 3. DOM Elements Cache ---
  const menuGrid = document.getElementById('products-grid');
  const categoryPills = document.querySelectorAll('.category-pill');
  const cartDrawer = document.getElementById('cart-drawer');
  const cartBackdrop = document.getElementById('cart-backdrop');
  const cartTrigger = document.getElementById('cart-trigger');
  const cartCloseBtn = document.getElementById('cart-close-btn');
  const cartItemsList = document.getElementById('cart-items-list');
  const cartCountBadges = document.querySelectorAll('.cart-count-badge');
  const cartSubtotalEl = document.getElementById('cart-subtotal');
  const cartDeliveryEl = document.getElementById('cart-delivery');
  const cartDiscountRow = document.getElementById('cart-discount-row');
  const cartDiscountEl = document.getElementById('cart-discount-val');
  const cartTotalEl = document.getElementById('cart-total');
  const deliveryMeterFill = document.getElementById('delivery-meter-fill');
  const deliveryMeterText = document.getElementById('delivery-meter-text');
  const promoInput = document.getElementById('promo-input');
  const applyPromoBtn = document.getElementById('apply-promo-btn');
  const promoMsg = document.getElementById('promo-msg');

  // Customizer Modal Elements
  const modalOverlay = document.getElementById('customizer-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalDrinkImg = document.getElementById('modal-drink-img');
  const modalDrinkName = document.getElementById('modal-drink-name');
  const modalDrinkDesc = document.getElementById('modal-drink-desc');
  const modalTotalDisplay = document.getElementById('modal-total-display');
  const modalAddBtn = document.getElementById('modal-add-btn');
  const qtyStepperVal = document.getElementById('qty-stepper-val');
  const qtyMinusBtn = document.getElementById('qty-minus-btn');
  const qtyPlusBtn = document.getElementById('qty-plus-btn');

  // Currently Configured Drink in Modal
  let activeProduct = null;
  let activeSize = 'Regular (12oz)';
  let activeMilk = 'Whole Milk';
  let activeSweetness = '100% (Regular)';
  let activeIce = 'Regular Ice';
  let activeQty = 1;

  // --- 4. Render Menu Items ---
  function renderMenu(category = 'all') {
    if (!menuGrid) return;
    menuGrid.innerHTML = '';

    const filtered = category === 'all' 
      ? PRODUCTS 
      : PRODUCTS.filter(p => p.category === category);

    filtered.forEach(prod => {
      const card = document.createElement('article');
      card.className = 'product-card';
      card.innerHTML = `
        <div class="card-img-wrap">
          <span class="card-tag">${prod.badge}</span>
          <div class="card-rating-badge">
            <span>★</span> ${prod.rating}
          </div>
          <img src="${prod.image}" alt="${prod.name}" loading="lazy" />
        </div>
        <div class="card-body">
          <span class="card-category-label">${prod.categoryLabel}</span>
          <h3 class="card-title">${prod.name}</h3>
          <p class="card-desc">${prod.description}</p>
          <div class="card-footer">
            <div class="card-price-wrap">
              <span class="card-price-label">Starts at</span>
              <span class="card-price">₱${prod.basePrice.toFixed(2)}</span>
            </div>
            <button class="card-add-pill" data-id="${prod.id}">
              ${prod.isBeverage ? 'Customize +' : 'Add to Bag +'}
            </button>
          </div>
        </div>
      `;

      // Click event for card button
      const addBtn = card.querySelector('.card-add-pill');
      addBtn.addEventListener('click', () => {
        openCustomizer(prod);
      });

      menuGrid.appendChild(card);
    });
  }

  // --- 5. Customizer Modal Logic ---
  function openCustomizer(product) {
    activeProduct = product;
    activeQty = 1;
    activeSize = 'Regular (12oz)';
    activeMilk = 'Whole Milk';
    activeSweetness = '100% (Regular)';
    activeIce = product.category === 'hot' ? 'Hot' : 'Regular Ice';

    // Update modal display
    modalDrinkImg.src = product.image;
    modalDrinkImg.alt = product.name;
    modalDrinkName.textContent = product.name;
    modalDrinkDesc.textContent = product.description;
    qtyStepperVal.textContent = activeQty;

    // Reset pill selections in DOM
    syncOptionPills();
    updateModalPrice();

    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeCustomizer() {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  function syncOptionPills() {
    document.querySelectorAll('.option-pill-choice').forEach(pill => {
      const type = pill.dataset.optionType;
      const val = pill.dataset.optionValue;

      let isSelected = false;
      if (type === 'size' && val === activeSize) isSelected = true;
      if (type === 'milk' && val === activeMilk) isSelected = true;
      if (type === 'sweetness' && val === activeSweetness) isSelected = true;
      if (type === 'ice' && val === activeIce) isSelected = true;

      pill.classList.toggle('active', isSelected);
    });

    // Hide milk/ice options for bakery items
    const beverageOptions = document.querySelectorAll('.beverage-only-group');
    beverageOptions.forEach(group => {
      group.style.display = activeProduct.isBeverage ? 'flex' : 'none';
    });
  }

  function calculateSingleItemPrice() {
    if (!activeProduct) return 0;
    let price = activeProduct.basePrice;
    if (activeProduct.isBeverage) {
      price += (SIZE_SURCHARGES[activeSize] || 0);
      price += (MILK_SURCHARGES[activeMilk] || 0);
    }
    return price;
  }

  function updateModalPrice() {
    const singlePrice = calculateSingleItemPrice();
    const totalPrice = singlePrice * activeQty;
    modalTotalDisplay.textContent = `₱${totalPrice.toFixed(2)}`;
    modalAddBtn.textContent = `Add to Bag — ₱${totalPrice.toFixed(2)}`;
  }

  // --- 6. Cart Drawer & Calculations ---
  function addItemToCart() {
    if (!activeProduct) return;

    const singlePrice = calculateSingleItemPrice();
    const itemKey = `${activeProduct.id}-${activeSize}-${activeMilk}-${activeSweetness}-${activeIce}`;

    const existingIndex = cart.findIndex(item => item.key === itemKey);

    if (existingIndex > -1) {
      cart[existingIndex].qty += activeQty;
    } else {
      cart.push({
        key: itemKey,
        id: activeProduct.id,
        name: activeProduct.name,
        image: activeProduct.image,
        unitPrice: singlePrice,
        qty: activeQty,
        isBeverage: activeProduct.isBeverage,
        customizations: activeProduct.isBeverage ? {
          size: activeSize,
          milk: activeMilk,
          sweetness: activeSweetness,
          ice: activeIce
        } : null
      });
    }

    saveCart();
    closeCustomizer();
    openCartDrawer();
  }

  function updateCartUI() {
    const totalCount = cart.reduce((acc, item) => acc + item.qty, 0);
    cartCountBadges.forEach(badge => {
      badge.textContent = totalCount;
    });

    if (!cartItemsList) return;

    if (cart.length === 0) {
      cartItemsList.innerHTML = `
        <div style="text-align:center; padding: 48px 16px; color: var(--espresso-light);">
          <div style="font-size: 3rem; margin-bottom: 12px;">☕</div>
          <h4 style="font-family: var(--font-display); font-size: 1.2rem; color: var(--espresso-dark); margin-bottom: 6px;">Your bag is empty</h4>
          <p style="font-size: 0.88rem;">Treat yourself to a delicious handcrafted coffee or fresh bake.</p>
        </div>
      `;
      cartSubtotalEl.textContent = '₱0.00';
      cartDeliveryEl.textContent = '₱0.00';
      cartTotalEl.textContent = '₱0.00';
      deliveryMeterFill.style.width = '0%';
      deliveryMeterText.textContent = `Add ₱${FREE_DELIVERY_THRESHOLD.toFixed(2)} for Free Courier Delivery!`;
      if (cartDiscountRow) cartDiscountRow.style.display = 'none';
      return;
    }

    // Render Items
    cartItemsList.innerHTML = '';
    let subtotal = 0;

    cart.forEach((item, idx) => {
      const itemSubtotal = item.unitPrice * item.qty;
      subtotal += itemSubtotal;

      const modsString = item.customizations 
        ? `${item.customizations.size} · ${item.customizations.milk} · ${item.customizations.sweetness} · ${item.customizations.ice}`
        : 'Fresh Daily Bake';

      const itemCard = document.createElement('div');
      itemCard.className = 'cart-item-card';
      itemCard.innerHTML = `
        <img src="${item.image}" alt="${item.name}" class="cart-item-thumb" />
        <div class="cart-item-details">
          <div style="display:flex; justify-content:space-between; align-items:flex-start;">
            <h4 class="cart-item-title">${item.name}</h4>
            <span class="cart-item-remove" data-index="${idx}" title="Remove">✕</span>
          </div>
          <p class="cart-item-mods">${modsString}</p>
          <div class="cart-item-row">
            <span class="cart-item-price">₱${itemSubtotal.toFixed(2)}</span>
            <div class="qty-stepper" style="gap: 8px;">
              <button class="stepper-btn cart-qty-btn" data-action="minus" data-index="${idx}">−</button>
              <span class="stepper-val" style="font-size: 0.95rem;">${item.qty}</span>
              <button class="stepper-btn cart-qty-btn" data-action="plus" data-index="${idx}">+</button>
            </div>
          </div>
        </div>
      `;

      cartItemsList.appendChild(itemCard);
    });

    // Subtotal & Delivery
    const isFreeDelivery = subtotal >= FREE_DELIVERY_THRESHOLD;
    const deliveryFee = isFreeDelivery ? 0 : STANDARD_DELIVERY_FEE;
    const discountAmount = subtotal * currentDiscount;
    const finalTotal = subtotal - discountAmount + deliveryFee;

    cartSubtotalEl.textContent = `₱${subtotal.toFixed(2)}`;
    cartDeliveryEl.textContent = isFreeDelivery ? 'FREE' : `₱${deliveryFee.toFixed(2)}`;
    cartTotalEl.textContent = `₱${finalTotal.toFixed(2)}`;

    // Delivery Meter
    if (isFreeDelivery) {
      deliveryMeterFill.style.width = '100%';
      deliveryMeterText.innerHTML = '🎉 <strong>Free Courier Delivery Unlocked!</strong>';
    } else {
      const remaining = FREE_DELIVERY_THRESHOLD - subtotal;
      const pct = Math.min(100, Math.round((subtotal / FREE_DELIVERY_THRESHOLD) * 100));
      deliveryMeterFill.style.width = `${pct}%`;
      deliveryMeterText.textContent = `Add ₱${remaining.toFixed(2)} more for Free Courier Delivery!`;
    }

    // Discount Row
    if (cartDiscountRow) {
      if (currentDiscount > 0) {
        cartDiscountRow.style.display = 'flex';
        cartDiscountEl.textContent = `-₱${discountAmount.toFixed(2)}`;
      } else {
        cartDiscountRow.style.display = 'none';
      }
    }
  }

  function openCartDrawer() {
    cartDrawer.classList.add('active');
    cartBackdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeCartDrawer() {
    cartDrawer.classList.remove('active');
    cartBackdrop.classList.remove('active');
    document.body.style.overflow = '';
  }

  // --- 7. Event Listeners Initializer ---
  function initListeners() {
    // Category Pills Filter
    categoryPills.forEach(pill => {
      pill.addEventListener('click', () => {
        categoryPills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        const cat = pill.dataset.category;
        renderMenu(cat);
      });
    });

    // Customizer Modal Option Pills
    document.querySelectorAll('.option-pill-choice').forEach(pill => {
      pill.addEventListener('click', () => {
        const type = pill.dataset.optionType;
        const val = pill.dataset.optionValue;

        if (type === 'size') activeSize = val;
        if (type === 'milk') activeMilk = val;
        if (type === 'sweetness') activeSweetness = val;
        if (type === 'ice') activeIce = val;

        syncOptionPills();
        updateModalPrice();
      });
    });

    // Stepper Quantity in Modal
    if (qtyMinusBtn && qtyPlusBtn) {
      qtyMinusBtn.addEventListener('click', () => {
        if (activeQty > 1) {
          activeQty--;
          qtyStepperVal.textContent = activeQty;
          updateModalPrice();
        }
      });

      qtyPlusBtn.addEventListener('click', () => {
        if (activeQty < 20) {
          activeQty++;
          qtyStepperVal.textContent = activeQty;
          updateModalPrice();
        }
      });
    }

    // Add to Bag Button
    if (modalAddBtn) {
      modalAddBtn.addEventListener('click', addItemToCart);
    }

    // Modal Close
    if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeCustomizer);
    if (modalOverlay) {
      modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) closeCustomizer();
      });
    }

    // Cart Drawer Open / Close
    if (cartTrigger) cartTrigger.addEventListener('click', openCartDrawer);
    if (cartCloseBtn) cartCloseBtn.addEventListener('click', closeCartDrawer);
    if (cartBackdrop) cartBackdrop.addEventListener('click', closeCartDrawer);

    // Cart Items Item Removal / Qty Stepper
    if (cartItemsList) {
      cartItemsList.addEventListener('click', (e) => {
        const removeBtn = e.target.closest('.cart-item-remove');
        if (removeBtn) {
          const index = parseInt(removeBtn.dataset.index, 10);
          cart.splice(index, 1);
          saveCart();
          return;
        }

        const qtyBtn = e.target.closest('.cart-qty-btn');
        if (qtyBtn) {
          const index = parseInt(qtyBtn.dataset.index, 10);
          const action = qtyBtn.dataset.action;
          if (action === 'plus') {
            cart[index].qty++;
          } else if (action === 'minus') {
            if (cart[index].qty > 1) {
              cart[index].qty--;
            } else {
              cart.splice(index, 1);
            }
          }
          saveCart();
        }
      });
    }

    // Promo Code Application
    if (applyPromoBtn && promoInput) {
      applyPromoBtn.addEventListener('click', () => {
        const code = promoInput.value.trim().toUpperCase();
        if (code === PROMO_CODE) {
          currentDiscount = PROMO_DISCOUNT_PERCENT;
          promoMsg.style.display = 'block';
          promoMsg.style.color = 'var(--accent-green)';
          promoMsg.textContent = '🎉 15% discount applied successfully!';
          updateCartUI();
        } else {
          promoMsg.style.display = 'block';
          promoMsg.style.color = 'var(--accent-coral)';
          promoMsg.textContent = 'Invalid promo code. Use AURASIP for 15% off.';
        }
      });
    }

    // Hero Order Now Button (opens Spanish Latte configurator)
    const heroOrderBtn = document.getElementById('hero-order-btn');
    if (heroOrderBtn) {
      heroOrderBtn.addEventListener('click', () => {
        const spanishLatte = PRODUCTS.find(p => p.id === 'spanish-latte');
        if (spanishLatte) openCustomizer(spanishLatte);
      });
    }

    // Scroll Navbar Effect
    window.addEventListener('scroll', () => {
      const header = document.querySelector('.site-header');
      if (header) {
        header.classList.toggle('scrolled', window.scrollY > 20);
      }
    });

    // Close on Escape Key
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeCustomizer();
        closeCartDrawer();
      }
    });
  }

  // --- 8. Initialization ---
  document.addEventListener('DOMContentLoaded', () => {
    loadCart();
    renderMenu('all');
    initListeners();
    updateCartUI();
  });

})();
