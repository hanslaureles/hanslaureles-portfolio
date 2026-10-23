/**
 * AURA — responsive product photos.
 * AVIF/WebP variants from tools/optimize_images.py (SSIM in tools/image-manifest.json;
 * masters in C:\AI-Workspace\archive\images\aura-store-masters). The JPG in assets/
 * is an 800 px fallback. Keyed by file name, so carts saved with older image paths
 * still resolve.
 */
(function () {
  'use strict';

  const DIR = '/images/aura-store/';
  const VARIANTS = {
    'artisan_croissant.jpg': {
      avif: 'artisan-croissant-480.71bfaa53.avif 480w, artisan-croissant-960.a6f11446.avif 960w, artisan-croissant-1024.dcd5d38a.avif 1024w',
      webp: 'artisan-croissant-480.7569045f.webp 480w, artisan-croissant-960.f0ff39fa.webp 960w, artisan-croissant-1024.0aca51a6.webp 1024w'
    },
    'caramel_macchiato.jpg': {
      avif: 'caramel-macchiato-480.57a8375c.avif 480w, caramel-macchiato-960.da3fd384.avif 960w, caramel-macchiato-1024.eccf6337.avif 1024w',
      webp: 'caramel-macchiato-480.09304fe6.webp 480w, caramel-macchiato-960.408169cf.webp 960w, caramel-macchiato-1024.6085bbaf.webp 1024w'
    },
    'dark_mocha_frappe.jpg': {
      avif: 'dark-mocha-frappe-480.55cb50d6.avif 480w, dark-mocha-frappe-960.06e15a55.avif 960w, dark-mocha-frappe-1024.5c120823.avif 1024w',
      webp: 'dark-mocha-frappe-480.d7b8d5a5.webp 480w, dark-mocha-frappe-960.6b327d8a.webp 960w, dark-mocha-frappe-1024.f1fab793.webp 1024w'
    },
    'matcha_cloud_latte.jpg': {
      avif: 'matcha-cloud-latte-480.a528c593.avif 480w, matcha-cloud-latte-960.42789452.avif 960w, matcha-cloud-latte-1024.999dad1e.avif 1024w',
      webp: 'matcha-cloud-latte-480.2c8d02b5.webp 480w, matcha-cloud-latte-960.a56f6bfa.webp 960w, matcha-cloud-latte-1024.6a4d3b2b.webp 1024w'
    },
    'spanish_latte.jpg': {
      avif: 'spanish-latte-480.f9e2922f.avif 480w, spanish-latte-960.861e0620.avif 960w, spanish-latte-1024.42eadb63.avif 1024w',
      webp: 'spanish-latte-480.a60e3b8c.webp 480w, spanish-latte-960.fd843d23.webp 960w, spanish-latte-1024.4bee1f7e.webp 1024w'
    },
    'velvet_cappuccino.jpg': {
      avif: 'velvet-cappuccino-480.45d57ff0.avif 480w, velvet-cappuccino-960.24f92de3.avif 960w, velvet-cappuccino-1024.5ff794b6.avif 1024w',
      webp: 'velvet-cappuccino-480.18f06152.webp 480w, velvet-cappuccino-960.8e8eeb7c.webp 960w, velvet-cappuccino-1024.be7f084d.webp 1024w'
    }
  };

  const srcset = (list) => list.split(', ').map((s) => DIR + s).join(', ');

  // <picture> markup for a product photo. `image` is any path ending in a known file
  // name; `imgAttrs` is extra raw attribute text for the <img> (class, style, loading).
  function picture(image, alt, sizes, imgAttrs = '') {
    const name = String(image).split('/').pop();
    const v = VARIANTS[name];
    const img = `<img src="/aura-store/assets/${name}" alt="${alt}" width="1024" height="1024" decoding="async" ${imgAttrs}>`;
    if (!v) return img;
    return `<picture><source type="image/avif" srcset="${srcset(v.avif)}" sizes="${sizes}">` +
      `<source type="image/webp" srcset="${srcset(v.webp)}" sizes="${sizes}">${img}</picture>`;
  }

  window.AuraMedia = { picture };
})();
