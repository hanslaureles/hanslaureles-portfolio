import CaseLayout from '../../components/CaseLayout';
import MetricCard from '../../components/MetricCard';
import { cases } from '../../lib/cases';

export const metadata = cases.find(item => item.slug === 'aura')!.metadata;

export default function Page() {
  return <CaseLayout slug="aura" title="Aura Coffee & Kitchen — Case Study · Hans Aaron Laureles">{"\n    \n    "}
{"\n    "}
<div className="case-hero">
{"\n      "}
<a href="index.html" className="case-back-link">
{"\n        ← Return to Selected Work\n      "}
</a>
{"\n      \n      "}
<div className="u-d-flex u-gap-8px u-mb-16px u-wrap-wrap">
{"\n        "}
<span className="badge badge-accent">
{"Case Study 04"}
</span>
{"\n        "}
<span className="badge">
{"Specialty Commerce"}
</span>
{"\n        "}
<span className="badge">
{"Drink Customizer"}
</span>
{"\n        "}
<span className="badge">
{"6 Payment Options"}
</span>
{"\n      "}
</div>
{"\n\n      "}
<h1 className="case-title" data-case="aura">
{"\n        Aura Coffee & Kitchen —"}
<br />
{"\n        "}
<span className="serif-italic">
{"A Warm, One-Page Coffee Ordering Experience"}
</span>
{"\n      "}
</h1>
{"\n\n      "}
<p className="case-lead">
{"\n        A warm, welcoming coffee-shop store inspired by the mobile apps people already love. Customize your drink (size, dairy or plant milk, sweetness, ice), watch your free-delivery progress in the Shopping Bag, and check out on one page with 6 payment options (GCash, Maya, GrabPay, card, QR Ph and cash on delivery). Every order ends with a scalloped paper-style ticket.\n      "}
</p>
{"\n\n      "}
<div className="u-d-flex u-gap-12px u-wrap-wrap u-mb-36px">
{"\n        "}
<a href="aura-store/index.html" target="_blank" rel="noopener noreferrer" className="btn btn-primary u-bg-aura-caramel u-bd-c-aura-caramel u-c-white">
{"\n          ☕ Launch Live Aura Coffee Store ↗\n        "}
</a>
{"\n        "}
<a href="https://www.figma.com/community/file/1618158150524481559/laureles-aura-website" target="_blank" rel="noopener noreferrer" className="btn btn-outline">
{"\n          View Figma Community File ↗\n        "}
</a>
{"\n        "}
<a href="https://www.figma.com/proto/8HGLrT9etT2rKl7MivvGK6/Laureles_Aura---Website?node-id=1-237&p=f&t=sjxbSCQqLc55XjWN-1&scaling=scale-down&content-scaling=fixed&page-id=2%3A4" target="_blank" rel="noopener noreferrer" className="btn btn-outline">
{"\n          Launch Interactive Prototype ↗\n        "}
</a>
{"\n      "}
</div>
{"\n\n      "}
{"\n      "}
<div className="case-meta-table">
{"\n        "}
<div className="case-meta-item">
{"\n          "}
<div className="label">
{"Platform"}
</div>
{"\n          "}
<div className="val">
{"Responsive Web App (Mobile & Desktop)"}
</div>
{"\n        "}
</div>
{"\n        "}
<div className="case-meta-item">
{"\n          "}
<div className="label">
{"Discipline"}
</div>
{"\n          "}
<div className="val">
{"Specialty Food & Beverage UI/UX · Checkout Design"}
</div>
{"\n        "}
</div>
{"\n        "}
<div className="case-meta-item">
{"\n          "}
<div className="label">
{"Role"}
</div>
{"\n          "}
<div className="val">
{"Lead Product Designer & Frontend Engineer (Solo)"}
</div>
{"\n        "}
</div>
{"\n        "}
<div className="case-meta-item">
{"\n          "}
<div className="label">
{"Stack"}
</div>
{"\n          "}
<div className="val">
{"Vanilla HTML, CSS & JS · Shopping Bag Saved in the Browser (localStorage)"}
</div>
{"\n        "}
</div>
{"\n      "}
</div>
{"\n\n      "}
{"\n      "}
<div className="case-challenge-grid">
{"\n        "}
<div className="case-challenge-card problem">
{"\n          "}
<div className="case-challenge-tag">
{"\n            "}
<span>
{"●"}
</span>
{" The Engineering Challenge\n          "}
</div>
{"\n          "}
<p className="case-challenge-text">
{"\n            Standard e-commerce templates (Shopify/WooCommerce) suffer from heavy third-party script bloat, slow mobile load times, generic checkout flows, and rigid carts that don't support custom beverage modifiers.\n          "}
</p>
{"\n        "}
</div>
{"\n        "}
<div className="case-challenge-card solution">
{"\n          "}
<div className="case-challenge-tag">
{"\n            "}
<span>
{"●"}
</span>
{" The Architecture Solution\n          "}
</div>
{"\n          "}
<p className="case-challenge-text">
{"\n            Built a dependency-free storefront in vanilla HTML, CSS and JavaScript: a drink customizer, a Shopping Bag that stays saved in your browser, and 6 payment options (GCash, Maya, GrabPay, card, QR Ph and cash on delivery).\n          "}
</p>
{"\n        "}
</div>
{"\n      "}
</div>
{"\n\n      "}
<div className="case-metrics-strip">
{"\n        "}
<div className="case-metric-cell">
{"\n          "}
<div className="case-metric-num accent-emerald">
{"0 Frameworks"}
</div>
{"\n          "}
<div className="case-metric-label">
{"100% Vanilla HTML5, CSS & ES6+"}
</div>
{"\n        "}
</div>
{"\n        "}
<div className="case-metric-cell">
{"\n          "}
<div className="case-metric-num accent-blue">
{"1-Page Checkout"}
</div>
{"\n          "}
<div className="case-metric-label">
{"Bag, Delivery & Payment on One Screen"}
</div>
{"\n        "}
</div>
{"\n        "}
<div className="case-metric-cell">
{"\n          "}
<div className="case-metric-num">
{"6 Options"}
</div>
{"\n          "}
<div className="case-metric-label">
{"Payment Options: GCash, Maya, GrabPay, Card, QR Ph & COD"}
</div>
{"\n        "}
</div>
{"\n        "}
<div className="case-metric-cell">
{"\n          "}
<div className="case-metric-num">
{"100% Client-Side"}
</div>
{"\n          "}
<div className="case-metric-label">
{"Bag & Orders Saved in Your Browser"}
</div>
{"\n        "}
</div>
{"\n      "}
</div>
{"\n\n      "}
{"\n      "}
<div className="case-banner u-mt-32px u-mb-24px">
{"\n        "}
<picture>
{"\n          "}
<source type="image/avif" srcSet="images/aura-website/aura-mockup-480.b04fa192.avif 480w, images/aura-website/aura-mockup-960.7caa718c.avif 960w, images/aura-website/aura-mockup-1600.bfcd01ac.avif 1600w, images/aura-website/aura-mockup-2400.bc932fc0.avif 2400w" sizes="(max-width: 1280px) calc(100vw - 32px), 1240px" />
{"\n          "}
<source type="image/webp" srcSet="images/aura-website/aura-mockup-480.453377f5.webp 480w, images/aura-website/aura-mockup-960.72d8492e.webp 960w, images/aura-website/aura-mockup-1600.fe3cbac8.webp 1600w, images/aura-website/aura-mockup-2400.97ad1a67.webp 2400w" sizes="(max-width: 1280px) calc(100vw - 32px), 1240px" />
{"\n          "}
<img src="images/aura-website/aura-mockup-960.72d8492e.webp" alt="Aura Coffee & Kitchen Showcase" width="960" height="720" loading="eager" fetchPriority="high" decoding="async" data-full="images/aura-website/aura-mockup-2400.97ad1a67.webp" />
{"\n        "}
</picture>
{"\n      "}
</div>
{"\n\n      "}
{"\n      "}
<div className="u-m-24px-0-32px-0">
{"\n        "}
<p className="u-fs-0p92rem u-c-text-secondary u-mb-16px">
{"\n          "}
<strong className="u-c-text-primary">
{"How an order flows"}
</strong>
{" — from the menu to a warm order ticket, all playable in the live demo:\n        "}
</p>
{"\n        "}
<div className="lifecycle-grid">
{"\n          "}
<div className="lifecycle-card">
{"\n            "}
<div className="lifecycle-card-header">
{"\n              "}
<span className="lifecycle-step-num">
{"Step 1"}
</span>
{"\n              "}
<span className="lifecycle-actor">
{"Menu"}
</span>
{"\n            "}
</div>
{"\n            "}
<div className="lifecycle-card-title">
{"Pick a Drink"}
</div>
{"\n            "}
<p className="lifecycle-card-desc">
{"Browse hot classics, iced brews, frappés and fresh bakes, or search by name."}
</p>
{"\n          "}
</div>
{"\n          "}
<div className="lifecycle-card">
{"\n            "}
<div className="lifecycle-card-header">
{"\n              "}
<span className="lifecycle-step-num">
{"Step 2"}
</span>
{"\n              "}
<span className="lifecycle-actor">
{"Customizer"}
</span>
{"\n            "}
</div>
{"\n            "}
<div className="lifecycle-card-title">
{"Make It Yours"}
</div>
{"\n            "}
<p className="lifecycle-card-desc">
{"Choose size, milk (whole, oat, almond or soy), sweetness and ice. The price updates as you go."}
</p>
{"\n          "}
</div>
{"\n          "}
<div className="lifecycle-card">
{"\n            "}
<div className="lifecycle-card-header">
{"\n              "}
<span className="lifecycle-step-num">
{"Step 3"}
</span>
{"\n              "}
<span className="lifecycle-actor">
{"Shopping Bag"}
</span>
{"\n            "}
</div>
{"\n            "}
<div className="lifecycle-card-title">
{"Fill Your Bag"}
</div>
{"\n            "}
<p className="lifecycle-card-desc">
{"The bag drawer slides in with a meter showing how much more you need for free delivery (₱500)."}
</p>
{"\n          "}
</div>
{"\n          "}
<div className="lifecycle-card">
{"\n            "}
<div className="lifecycle-card-header">
{"\n              "}
<span className="lifecycle-step-num">
{"Step 4"}
</span>
{"\n              "}
<span className="lifecycle-actor">
{"Checkout"}
</span>
{"\n            "}
</div>
{"\n            "}
<div className="lifecycle-card-title">
{"One Page, Not Four"}
</div>
{"\n            "}
<p className="lifecycle-card-desc">
{"Contact details, delivery address and delivery option all sit on a single page."}
</p>
{"\n          "}
</div>
{"\n          "}
<div className="lifecycle-card">
{"\n            "}
<div className="lifecycle-card-header">
{"\n              "}
<span className="lifecycle-step-num">
{"Step 5"}
</span>
{"\n              "}
<span className="lifecycle-actor">
{"Payment"}
</span>
{"\n            "}
</div>
{"\n            "}
<div className="lifecycle-card-title">
{"Pay Your Way"}
</div>
{"\n            "}
<p className="lifecycle-card-desc">
{"6 payment options: GCash, Maya, GrabPay, card, QR Ph or cash on delivery. The demo charges nothing."}
</p>
{"\n          "}
</div>
{"\n          "}
<div className="lifecycle-card">
{"\n            "}
<div className="lifecycle-card-header">
{"\n              "}
<span className="lifecycle-step-num">
{"Step 6"}
</span>
{"\n              "}
<span className="lifecycle-actor">
{"Order Ticket"}
</span>
{"\n            "}
</div>
{"\n            "}
<div className="lifecycle-card-title">
{"Watch It Brew"}
</div>
{"\n            "}
<p className="lifecycle-card-desc">
{"A scalloped paper-style ticket recaps your order and follows it from received to on its way."}
</p>
{"\n          "}
</div>
{"\n        "}
</div>
{"\n      "}
</div>
{"\n\n    "}
</div>
{"\n\n    "}
{"\n    "}
<div className="case-content-layout">
{"\n      \n      "}
{"\n      "}
<aside className="case-sidebar">
{"\n        "}
<div className="case-toc-title">
{"Table of Contents"}
</div>
{"\n        "}
<ul className="case-toc-list">
{"\n          "}
<li>
<a href="#overview">
{"01. Overview & Vision"}
</a>
</li>
{"\n          "}
<li>
<a href="#heuristics">
{"02. Usability Audits & Friction Points"}
</a>
</li>
{"\n          "}
<li>
<a href="#wireframes">
{"03. End-to-End Coffee Flow"}
</a>
</li>
{"\n          "}
<li>
<a href="#trust-signals">
{"04. Local Payments & Reassurance"}
</a>
</li>
{"\n          "}
<li>
<a href="#outcomes">
{"05. Business Impact & Takeaways"}
</a>
</li>
{"\n        "}
</ul>
{"\n      "}
</aside>
{"\n\n      "}
{"\n      "}
<div className="case-main-narrative">
{"\n        \n        "}
{"\n        "}
<section id="overview" className="case-body-section">
{"\n          "}
<div className="section-tag">
{"// 01 · OVERVIEW & VISION"}
</div>
{"\n          "}
<h2>
{"Balancing Craft Warmth & Checkout Velocity"}
</h2>
{"\n          "}
<p>
{"\n            Specialty coffee ordering is deeply personal: customers expect nuanced control over cup size, dairy vs. plant-based milk (oat, almond, soy), sweetness levels, and ice dilution. However, in conventional e-commerce platforms, complex variant drop-downs and multi-page checkouts trigger steep cart abandonment.\n          "}
</p>
{"\n          "}
<div className="pull-quote">
{"\n            “How might we design a coffee ordering experience that feels as inviting, appetizing, and tactile as walking into your favorite neighborhood roastery?”\n          "}
</div>
{"\n          "}
<p>
{"\n            Aura Coffee & Kitchen solves this by pairing a warm oat-milk aesthetic (soft cream, amber caramel, pill buttons) with a fast, simple ordering flow: a drink customizer, a slide-over bag drawer that tracks free delivery, and a one-page checkout built around the ways Filipinos actually pay.\n          "}
</p>
{"\n        "}
</section>
{"\n\n        "}
{"\n        "}
<section id="heuristics" className="case-body-section">
{"\n          "}
<div className="section-tag">
{"// 02 · USABILITY AUDITS & FRICTION POINTS"}
</div>
{"\n          "}
<h2>
{"Eliminating Drop-Off in Drink Ordering"}
</h2>
{"\n          "}
<p>
{"\n            A systematic audit of standard food & beverage ordering funnels revealed three primary friction points:\n          "}
</p>
{"\n          "}
<div className="experience-timeline u-m-24px-0">
{"\n            "}
<div className="experience-card">
{"\n              "}
<h3 className="u-mb-8px">
{"1. Surprise Courier Fees at the Finish Line"}
</h3>
{"\n              "}
<p className="u-fs-0p95rem">
{"Hiding delivery costs until the final payment page triggers immediate price shock. Aura introduces an active free delivery meter in the bag drawer, encouraging upsells to reach the ₱500 threshold."}
</p>
{"\n            "}
</div>
{"\n            "}
<div className="experience-card">
{"\n              "}
<h3 className="u-mb-8px">
{"2. Clunky, Inflexible Customization"}
</h3>
{"\n              "}
<p className="u-fs-0p95rem">
{"Requiring customers to navigate away from the menu just to pick oat milk or adjust sweetness causes cognitive fatigue. Aura utilizes a focused, single-viewport modal with immediate visual feedback."}
</p>
{"\n            "}
</div>
{"\n            "}
<div className="experience-card">
{"\n              "}
<h3 className="u-mb-8px">
{"3. Multi-Step Checkout Exhaustion"}
</h3>
{"\n              "}
<p className="u-fs-0p95rem">
{"Forcing 4 separate page transitions for Customer Info, Address, Shipping, and Payment creates friction on mobile. Aura consolidates everything onto a single, clear 1-page layout with one-click GCash and Maya buttons."}
</p>
{"\n            "}
</div>
{"\n          "}
</div>
{"\n        "}
</section>
{"\n\n        "}
{"\n        "}
<section id="wireframes" className="case-body-section">
{"\n          "}
<div className="section-tag">
{"// 03 · END-TO-END COFFEE FLOW"}
</div>
{"\n          "}
<h2>
{"From Menu Exploration to Scalloped Ticket Receipt"}
</h2>
{"\n          "}
<p>
{"\n            Explore the wireframe-to-production design artifacts below:\n          "}
</p>
{"\n\n          "}
{"\n          "}
<div className="image-gallery">
{"\n            "}
<div className="gallery-item">
{"\n              "}
<div className="gallery-img-box">
{"\n                "}
<picture>
{"\n                  "}
<source type="image/avif" srcSet="images/aura-website/01-aura-wireframe-cart-drawer-480.2c9fa7aa.avif 480w, images/aura-website/01-aura-wireframe-cart-drawer-960.065f86c1.avif 960w, images/aura-website/01-aura-wireframe-cart-drawer-1318.2704147e.avif 1318w" sizes="(max-width: 900px) calc(100vw - 32px), 480px" />
{"\n                  "}
<source type="image/webp" srcSet="images/aura-website/01-aura-wireframe-cart-drawer-480.f9845918.webp 480w, images/aura-website/01-aura-wireframe-cart-drawer-960.64e4321c.webp 960w, images/aura-website/01-aura-wireframe-cart-drawer-1318.d327c234.webp 1318w" sizes="(max-width: 900px) calc(100vw - 32px), 480px" />
{"\n                  "}
<img src="images/aura-website/01-aura-wireframe-cart-drawer-960.64e4321c.webp" alt="Bag drawer wireframe" width="960" height="802" loading="lazy" decoding="async" data-full="images/aura-website/01-aura-wireframe-cart-drawer-1318.d327c234.webp" />
{"\n                "}
</picture>
{"\n              "}
</div>
{"\n              "}
<div className="gallery-caption">
{"Fig 1.1 — Slide-over Bag Drawer Wireframe"}
</div>
{"\n            "}
</div>
{"\n            "}
<div className="gallery-item">
{"\n              "}
<div className="gallery-img-box">
{"\n                "}
<picture>
{"\n                  "}
<source type="image/avif" srcSet="images/aura-website/01-aura-cart-drawer-480.67f0a15b.avif 480w, images/aura-website/01-aura-cart-drawer-960.8f688fa1.avif 960w, images/aura-website/01-aura-cart-drawer-1318.5bd358ed.avif 1318w" sizes="(max-width: 900px) calc(100vw - 32px), 480px" />
{"\n                  "}
<source type="image/webp" srcSet="images/aura-website/01-aura-cart-drawer-480.9c6cddb1.webp 480w, images/aura-website/01-aura-cart-drawer-960.287576e5.webp 960w, images/aura-website/01-aura-cart-drawer-1318.68bf4093.webp 1318w" sizes="(max-width: 900px) calc(100vw - 32px), 480px" />
{"\n                  "}
<img src="images/aura-website/01-aura-cart-drawer-960.287576e5.webp" alt="Aura bag drawer with free-delivery meter" width="960" height="802" loading="lazy" decoding="async" data-full="images/aura-website/01-aura-cart-drawer-1318.68bf4093.webp" />
{"\n                "}
</picture>
{"\n              "}
</div>
{"\n              "}
<div className="gallery-caption">
{"Fig 1.2 — Production Bag Drawer with Delivery Meter"}
</div>
{"\n            "}
</div>
{"\n          "}
</div>
{"\n\n          "}
{"\n          "}
<div className="image-gallery">
{"\n            "}
<div className="gallery-item">
{"\n              "}
<div className="gallery-img-box">
{"\n                "}
<picture>
{"\n                  "}
<source type="image/avif" srcSet="images/aura-website/04-aura-wireframe-one-page-checkout-480.b8885c5c.avif 480w, images/aura-website/04-aura-wireframe-one-page-checkout-960.bf5ddc89.avif 960w, images/aura-website/04-aura-wireframe-one-page-checkout-1280.b4372ee6.avif 1280w" sizes="(max-width: 900px) calc(100vw - 32px), 480px" />
{"\n                  "}
<source type="image/webp" srcSet="images/aura-website/04-aura-wireframe-one-page-checkout-480.be4c3868.webp 480w, images/aura-website/04-aura-wireframe-one-page-checkout-960.b247da25.webp 960w, images/aura-website/04-aura-wireframe-one-page-checkout-1280.0a395ddd.webp 1280w" sizes="(max-width: 900px) calc(100vw - 32px), 480px" />
{"\n                  "}
<img src="images/aura-website/04-aura-wireframe-one-page-checkout-960.b247da25.webp" alt="One-Page Checkout Wireframe" width="960" height="1024" loading="lazy" decoding="async" data-full="images/aura-website/04-aura-wireframe-one-page-checkout-1280.0a395ddd.webp" />
{"\n                "}
</picture>
{"\n              "}
</div>
{"\n              "}
<div className="gallery-caption">
{"Fig 2.1 — 1-Page Consolidated Checkout Structure"}
</div>
{"\n            "}
</div>
{"\n            "}
<div className="gallery-item">
{"\n              "}
<div className="gallery-img-box">
{"\n                "}
<picture>
{"\n                  "}
<source type="image/avif" srcSet="images/aura-website/04-aura-one-page-checkout-480.83428481.avif 480w, images/aura-website/04-aura-one-page-checkout-960.dd739905.avif 960w, images/aura-website/04-aura-one-page-checkout-1294.d75191d9.avif 1294w" sizes="(max-width: 900px) calc(100vw - 32px), 480px" />
{"\n                  "}
<source type="image/webp" srcSet="images/aura-website/04-aura-one-page-checkout-480.36d8105f.webp 480w, images/aura-website/04-aura-one-page-checkout-960.d5f60b07.webp 960w, images/aura-website/04-aura-one-page-checkout-1294.7a910059.webp 1294w" sizes="(max-width: 900px) calc(100vw - 32px), 480px" />
{"\n                  "}
<img src="images/aura-website/04-aura-one-page-checkout-960.d5f60b07.webp" alt="One-Page Checkout UI" width="960" height="1192" loading="lazy" decoding="async" data-full="images/aura-website/04-aura-one-page-checkout-1294.7a910059.webp" />
{"\n                "}
</picture>
{"\n              "}
</div>
{"\n              "}
<div className="gallery-caption">
{"Fig 2.2 — Single-View Checkout with Philippine Wallets"}
</div>
{"\n            "}
</div>
{"\n          "}
</div>
{"\n\n          "}
{"\n          "}
<div className="image-gallery">
{"\n            "}
<div className="gallery-item">
{"\n              "}
<div className="gallery-img-box">
{"\n                "}
<picture>
{"\n                  "}
<source type="image/avif" srcSet="images/aura-website/03-aura-express-checkout-480.223850a9.avif 480w, images/aura-website/03-aura-express-checkout-960.8a89d6ac.avif 960w, images/aura-website/03-aura-express-checkout-1280.b4f5bded.avif 1280w" sizes="(max-width: 900px) calc(100vw - 32px), 480px" />
{"\n                  "}
<source type="image/webp" srcSet="images/aura-website/03-aura-express-checkout-480.a52ee0ca.webp 480w, images/aura-website/03-aura-express-checkout-960.f206c73e.webp 960w, images/aura-website/03-aura-express-checkout-1280.1333454e.webp 1280w" sizes="(max-width: 900px) calc(100vw - 32px), 480px" />
{"\n                  "}
<img src="images/aura-website/03-aura-express-checkout-960.f206c73e.webp" alt="Aura Express Checkout Flow" width="960" height="1082" loading="lazy" decoding="async" data-full="images/aura-website/03-aura-express-checkout-1280.1333454e.webp" />
{"\n                "}
</picture>
{"\n              "}
</div>
{"\n              "}
<div className="gallery-caption">
{"Fig 3.1 — 1-Tap Express GCash / Maya Flow"}
</div>
{"\n            "}
</div>
{"\n            "}
<div className="gallery-item">
{"\n              "}
<div className="gallery-img-box">
{"\n                "}
<picture>
{"\n                  "}
<source type="image/avif" srcSet="images/aura-website/05-aura-payment-form-480.2ca6ddc5.avif 480w, images/aura-website/05-aura-payment-form-960.a0f78e60.avif 960w, images/aura-website/05-aura-payment-form-1280.a9ed6329.avif 1280w" sizes="(max-width: 900px) calc(100vw - 32px), 480px" />
{"\n                  "}
<source type="image/webp" srcSet="images/aura-website/05-aura-payment-form-480.69a45b13.webp 480w, images/aura-website/05-aura-payment-form-960.8f2e58ff.webp 960w, images/aura-website/05-aura-payment-form-1280.8b2f0830.webp 1280w" sizes="(max-width: 900px) calc(100vw - 32px), 480px" />
{"\n                  "}
<img src="images/aura-website/05-aura-payment-form-960.8f2e58ff.webp" alt="Aura Payment Form UI" width="960" height="940" loading="lazy" decoding="async" data-full="images/aura-website/05-aura-payment-form-1280.8b2f0830.webp" />
{"\n                "}
</picture>
{"\n              "}
</div>
{"\n              "}
<div className="gallery-caption">
{"Fig 3.2 — Payment Form Design (the live demo processes no payment)"}
</div>
{"\n            "}
</div>
{"\n          "}
</div>
{"\n\n          "}
{"\n          "}
<div className="image-gallery">
{"\n            "}
<div className="gallery-item">
{"\n              "}
<div className="gallery-img-box">
{"\n                "}
<picture>
{"\n                  "}
<source type="image/avif" srcSet="images/aura-website/02-aura-wireframe-order-confirmation-480.6b7038cd.avif 480w, images/aura-website/02-aura-wireframe-order-confirmation-960.c95db36f.avif 960w, images/aura-website/02-aura-wireframe-order-confirmation-1280.3441fe38.avif 1280w" sizes="(max-width: 900px) calc(100vw - 32px), 480px" />
{"\n                  "}
<source type="image/webp" srcSet="images/aura-website/02-aura-wireframe-order-confirmation-480.f4216a56.webp 480w, images/aura-website/02-aura-wireframe-order-confirmation-960.2a55aaee.webp 960w, images/aura-website/02-aura-wireframe-order-confirmation-1280.d63d5d50.webp 1280w" sizes="(max-width: 900px) calc(100vw - 32px), 480px" />
{"\n                  "}
<img src="images/aura-website/02-aura-wireframe-order-confirmation-960.2a55aaee.webp" alt="Order Confirmation Wireframe" width="960" height="1014" loading="lazy" decoding="async" data-full="images/aura-website/02-aura-wireframe-order-confirmation-1280.d63d5d50.webp" />
{"\n                "}
</picture>
{"\n              "}
</div>
{"\n              "}
<div className="gallery-caption">
{"Fig 4.1 — Order Confirmation Wireframe"}
</div>
{"\n            "}
</div>
{"\n            "}
<div className="gallery-item">
{"\n              "}
<div className="gallery-img-box">
{"\n                "}
<picture>
{"\n                  "}
<source type="image/avif" srcSet="images/aura-website/02-aura-order-confirmation-480.fa99acff.avif 480w, images/aura-website/02-aura-order-confirmation-960.7ba0d3ed.avif 960w, images/aura-website/02-aura-order-confirmation-1280.2269c865.avif 1280w" sizes="(max-width: 900px) calc(100vw - 32px), 480px" />
{"\n                  "}
<source type="image/webp" srcSet="images/aura-website/02-aura-order-confirmation-480.8ae63bcd.webp 480w, images/aura-website/02-aura-order-confirmation-960.62d32689.webp 960w, images/aura-website/02-aura-order-confirmation-1280.4d8233aa.webp 1280w" sizes="(max-width: 900px) calc(100vw - 32px), 480px" />
{"\n                  "}
<img src="images/aura-website/02-aura-order-confirmation-960.62d32689.webp" alt="Aura Order Confirmation UI" width="960" height="1070" loading="lazy" decoding="async" data-full="images/aura-website/02-aura-order-confirmation-1280.4d8233aa.webp" />
{"\n                "}
</picture>
{"\n              "}
</div>
{"\n              "}
<div className="gallery-caption">
{"Fig 4.2 — Scalloped Ticket Receipt with Live Brewing Tracker"}
</div>
{"\n            "}
</div>
{"\n          "}
</div>
{"\n\n        "}
</section>
{"\n\n        "}
{"\n        "}
<section id="trust-signals" className="case-body-section">
{"\n          "}
<div className="section-tag">
{"// 04 · LOCAL PAYMENTS & REASSURANCE"}
</div>
{"\n          "}
<h2>
{"Local Relevance & Visual Reassurance"}
</h2>
{"\n          "}
<p>
{"\n            With 6 payment options ("}
<strong>
{"GCash"}
</strong>
{", "}
<strong>
{"Maya"}
</strong>
{", "}
<strong>
{"GrabPay"}
</strong>
{", "}
<strong>
{"card"}
</strong>
{", "}
<strong>
{"QR Ph"}
</strong>
{" and "}
<strong>
{"cash on delivery"}
</strong>
{"), local coffee lovers can pay the way they already do. Real-time form validation, explicit order recap cards with itemized modifications, and an instant order confirmation ticket create complete transparency and peace of mind.\n          "}
</p>
{"\n        "}
</section>
{"\n\n        "}
{"\n        "}
<section id="outcomes" className="case-body-section">
{"\n          "}
<div className="section-tag">
{"// 05 · OUTCOMES & KEY TAKEAWAYS"}
</div>
{"\n          "}
<h2>
{"What Shipped"}
</h2>
{"\n          "}
<div className="outcome-grid">
{"\n            "}
<div className="outcome-card">
{"\n              "}
<div className="outcome-number">
{"0"}
</div>
{"\n              "}
<div className="outcome-label">
{"Frameworks: Vanilla HTML, CSS & ES6+, So the Page Ships Only the Store"}
</div>
{"\n            "}
</div>
{"\n            "}
<div className="outcome-card">
{"\n              "}
<div className="outcome-number">
{"1 Page"}
</div>
{"\n              "}
<div className="outcome-label">
{"Checkout: Bag, Delivery & Payment on One Screen"}
</div>
{"\n            "}
</div>
{"\n            "}
<div className="outcome-card">
{"\n              "}
<div className="outcome-number">
{"Live"}
</div>
{"\n              "}
<div className="outcome-label">
{"Playable Demo at /aura-store, Checkout & Order Ticket Included"}
</div>
{"\n            "}
</div>
{"\n          "}
</div>
{"\n\n          "}
<div className="u-ta-center u-mt-32px">
{"\n            "}
<a href="aura-store/index.html" target="_blank" rel="noopener noreferrer" className="btn btn-primary u-bg-aura-caramel u-bd-c-aura-caramel u-c-white">
{"\n              ☕ Launch Live Aura Coffee Store & 1-Page Checkout ↗\n            "}
</a>
{"\n          "}
</div>
{"\n        "}
</section>
{"\n\n      "}
</div>
{"\n\n    "}
</div>
{"\n\n    "}
{"\n    "}
<div className="case-pagination-wrap">
{"\n      "}
<div className="case-pagination">
{"\n        "}
<a href="case-memory.html" className="pag-card">
{"\n          "}
<span className="pag-label">
{"← Previous Case Study"}
</span>
{"\n          "}
<span className="pag-title">
{"03 · Memory Core (Lessons-Learned Memory)"}
</span>
{"\n        "}
</a>
{"\n        "}
<a href="case-lumina.html" className="pag-card u-ta-right">
{"\n          "}
<span className="pag-label">
{"Next Case Study →"}
</span>
{"\n          "}
<span className="pag-title">
{"05 · Lumina Analytics (Study & Focus Dashboard)"}
</span>
{"\n        "}
</a>
{"\n      "}
</div>
{"\n    "}
</div>
{"\n\n  "}</CaseLayout>;
}
