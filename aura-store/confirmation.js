// Aura confirmation page: renders the demo receipt from localStorage.
// Moved out of the page for the CSP (Phase 5A): script-src allows no inline script.
document.addEventListener('DOMContentLoaded', () => {
  const ORDER_STORAGE_KEY = 'aura_last_order';
  let orderData = null;

  try {
    const saved = localStorage.getItem(ORDER_STORAGE_KEY);
    if (saved) {
      orderData = JSON.parse(saved);
    }
  } catch (e) {}

  // Fallback demo order if visited directly
  if (!orderData) {
    orderData = {
      orderId: 'AUR-5821',
      timestamp: new Date().toLocaleString(),
      customer: {
        name: 'Maria Santos',
        phone: '0917 842 1900',
        address: 'Unit 14B, Arya Residences, McKinley Pkwy, Taguig City'
      },
      courier: 'Standard Roastery Courier',
      paymentMethod: 'GCASH',
      items: [
        {
          name: 'Signature Spanish Latte',
          qty: 2,
          unitPrice: 185,
          customizations: {
            size: 'Regular (12oz)',
            milk: 'Oat Milk',
            sweetness: '70% (Less Sweet)'
          }
        },
        {
          name: 'Artisanal Butter Croissant',
          qty: 1,
          unitPrice: 120,
          customizations: null
        }
      ],
      subtotal: 490,
      deliveryFee: 60,
      total: 550
    };
  }

  // Populate Receipt DOM
  document.getElementById('receipt-order-id').textContent = orderData.orderId;
  document.getElementById('receipt-customer-name').textContent = orderData.customer.name;
  document.getElementById('receipt-customer-address').textContent = orderData.customer.address;
  document.getElementById('receipt-payment').textContent = orderData.paymentMethod;
  document.getElementById('receipt-subtotal').textContent = `₱${orderData.subtotal.toFixed(2)}`;
  document.getElementById('receipt-delivery').textContent = orderData.deliveryFee === 0 ? 'FREE' : `₱${orderData.deliveryFee.toFixed(2)}`;
  document.getElementById('receipt-total').textContent = `₱${orderData.total.toFixed(2)}`;

  const itemsBody = document.getElementById('receipt-items-body');
  itemsBody.innerHTML = orderData.items.map(item => {
    const mods = item.customizations 
      ? `<br><small style="color:var(--espresso-light); font-size:0.75rem;">${item.customizations.size} · ${item.customizations.milk} · ${item.customizations.sweetness}</small>`
      : '<br><small style="color:var(--espresso-light); font-size:0.75rem;">Fresh Daily Bake</small>';

    return `
      <tr>
        <td style="font-weight: 700;">${item.qty}×</td>
        <td>
          <strong style="color: var(--espresso-dark);">${item.name}</strong>
          ${mods}
        </td>
        <td style="text-align: right; font-weight: 700;">
          ₱${(item.unitPrice * item.qty).toFixed(2)}
        </td>
      </tr>
    `;
  }).join('');
});
