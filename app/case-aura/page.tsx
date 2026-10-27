import CaseLayout from '../../components/CaseLayout';
import { cases } from '../../lib/cases';

export const metadata = cases.find((item) => item.slug === 'aura')!.metadata;

export default function Page() {
  return (
    <CaseLayout slug="aura" title="Aura Coffee & Kitchen — Case Study · Hans Aaron Laureles">
      <div className="case-hero">
        <a href="/index.html" className="case-back-link">
          Return to Selected Work
        </a>
        <div className="u-d-flex u-gap-8px u-mb-16px u-wrap-wrap">
          <span className="badge badge-accent">Case Study 04</span>
          <span className="badge">Specialty Commerce</span>
          <span className="badge">Drink Customizer</span>
          <span className="badge">6 Payment Options</span>
        </div>
        <h1 className="case-title" data-case="aura">
          Aura Coffee &amp; Kitchen —<br />{' '}
          <span className="serif-italic">A Warm, One-Page Coffee Ordering Experience</span>
        </h1>
        <p className="case-lead">
          A warm, welcoming coffee-shop store inspired by the mobile apps people already love.
          Customize your drink (size, dairy or plant milk, sweetness, ice), watch your free-delivery
          progress in the Shopping Bag, and check out on one page with 6 payment options (GCash,
          Maya, GrabPay, card, QR Ph and cash on delivery). Every order ends with a scalloped
          paper-style ticket.
        </p>
        <div className="u-d-flex u-gap-12px u-wrap-wrap u-mb-36px">
          <a
            href="/aura-store/index.html"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary u-bg-aura-caramel u-bd-c-aura-caramel u-c-white"
          >
            ☕ Launch Live Aura Coffee Store
          </a>
          <a
            href="https://www.figma.com/community/file/1618158150524481559/laureles-aura-website"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline"
          >
            View Figma Community File
          </a>
          <a
            href="https://www.figma.com/proto/8HGLrT9etT2rKl7MivvGK6/Laureles_Aura---Website?node-id=1-237&p=f&t=sjxbSCQqLc55XjWN-1&scaling=scale-down&content-scaling=fixed&page-id=2%3A4"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline"
          >
            Launch Interactive Prototype
          </a>
        </div>
        <div className="case-meta-table">
          <div className="case-meta-item">
            <div className="label">Platform</div>
            <div className="val">Responsive Web App (Mobile &amp; Desktop)</div>
          </div>
          <div className="case-meta-item">
            <div className="label">Discipline</div>
            <div className="val">Specialty Food &amp; Beverage UI/UX · Checkout Design</div>
          </div>
          <div className="case-meta-item">
            <div className="label">Role</div>
            <div className="val">Lead Product Designer &amp; Frontend Engineer (Solo)</div>
          </div>
          <div className="case-meta-item">
            <div className="label">Stack</div>
            <div className="val">
              Vanilla HTML, CSS &amp; JS · Shopping Bag Saved in the Browser (localStorage)
            </div>
          </div>
        </div>
        <div className="case-challenge-grid">
          <div className="case-challenge-card problem">
            <div className="case-challenge-tag">
              <span>●</span> The Engineering Challenge
            </div>
            <p className="case-challenge-text">
              Standard e-commerce templates (Shopify/WooCommerce) suffer from heavy third-party
              script bloat, slow mobile load times, generic checkout flows, and rigid carts that
              don't support custom beverage modifiers.
            </p>
          </div>
          <div className="case-challenge-card solution">
            <div className="case-challenge-tag">
              <span>●</span> The Architecture Solution
            </div>
            <p className="case-challenge-text">
              Built a dependency-free storefront in vanilla HTML, CSS and JavaScript: a drink
              customizer, a Shopping Bag that stays saved in your browser, and 6 payment options
              (GCash, Maya, GrabPay, card, QR Ph and cash on delivery).
            </p>
          </div>
        </div>
        <div className="case-metrics-strip">
          <div className="case-metric-cell">
            <div className="case-metric-num accent-emerald">0 Frameworks</div>
            <div className="case-metric-label">100% Vanilla HTML5, CSS &amp; ES6+</div>
          </div>
          <div className="case-metric-cell">
            <div className="case-metric-num accent-blue">1-Page Checkout</div>
            <div className="case-metric-label">Bag, Delivery &amp; Payment on One Screen</div>
          </div>
          <div className="case-metric-cell">
            <div className="case-metric-num">6 Options</div>
            <div className="case-metric-label">
              Payment Options: GCash, Maya, GrabPay, Card, QR Ph &amp; COD
            </div>
          </div>
          <div className="case-metric-cell">
            <div className="case-metric-num">100% Client-Side</div>
            <div className="case-metric-label">Bag &amp; Orders Saved in Your Browser</div>
          </div>
        </div>
        <div className="case-banner u-mt-32px u-mb-24px">
          <picture>
            <source
              type="image/avif"
              srcSet="/images/aura-website/aura-mockup-480.b04fa192.avif 480w, /images/aura-website/aura-mockup-960.7caa718c.avif 960w, /images/aura-website/aura-mockup-1600.bfcd01ac.avif 1600w, /images/aura-website/aura-mockup-2400.bc932fc0.avif 2400w"
              sizes="(max-width: 1280px) calc(100vw - 32px), 1240px"
            />
            <source
              type="image/webp"
              srcSet="/images/aura-website/aura-mockup-480.453377f5.webp 480w, /images/aura-website/aura-mockup-960.72d8492e.webp 960w, /images/aura-website/aura-mockup-1600.fe3cbac8.webp 1600w, /images/aura-website/aura-mockup-2400.97ad1a67.webp 2400w"
              sizes="(max-width: 1280px) calc(100vw - 32px), 1240px"
            />
            <img
              src="/images/aura-website/aura-mockup-960.72d8492e.webp"
              alt="Aura Coffee & Kitchen Showcase"
              width="960"
              height="720"
              loading="eager"
              fetchPriority="high"
              decoding="async"
              data-full="/images/aura-website/aura-mockup-2400.97ad1a67.webp"
            />
          </picture>
        </div>
        <div className="u-m-24px-0-32px-0">
          <p className="u-fs-0p92rem u-c-text-secondary u-mb-16px">
            <strong className="u-c-text-primary">How an order flows</strong> — from the menu to a
            warm order ticket, all playable in the live demo:
          </p>
          <div className="lifecycle-grid">
            <div className="lifecycle-card">
              <div className="lifecycle-card-header">
                <span className="lifecycle-step-num">Step 1</span>{' '}
                <span className="lifecycle-actor">Menu</span>
              </div>
              <div className="lifecycle-card-title">Pick a Drink</div>
              <p className="lifecycle-card-desc">
                Browse hot classics, iced brews, frappés and fresh bakes, or search by name.
              </p>
            </div>
            <div className="lifecycle-card">
              <div className="lifecycle-card-header">
                <span className="lifecycle-step-num">Step 2</span>{' '}
                <span className="lifecycle-actor">Customizer</span>
              </div>
              <div className="lifecycle-card-title">Make It Yours</div>
              <p className="lifecycle-card-desc">
                Choose size, milk (whole, oat, almond or soy), sweetness and ice. The price updates
                as you go.
              </p>
            </div>
            <div className="lifecycle-card">
              <div className="lifecycle-card-header">
                <span className="lifecycle-step-num">Step 3</span>{' '}
                <span className="lifecycle-actor">Shopping Bag</span>
              </div>
              <div className="lifecycle-card-title">Fill Your Bag</div>
              <p className="lifecycle-card-desc">
                The bag drawer slides in with a meter showing how much more you need for free
                delivery (₱500).
              </p>
            </div>
            <div className="lifecycle-card">
              <div className="lifecycle-card-header">
                <span className="lifecycle-step-num">Step 4</span>{' '}
                <span className="lifecycle-actor">Checkout</span>
              </div>
              <div className="lifecycle-card-title">One Page, Not Four</div>
              <p className="lifecycle-card-desc">
                Contact details, delivery address and delivery option all sit on a single page.
              </p>
            </div>
            <div className="lifecycle-card">
              <div className="lifecycle-card-header">
                <span className="lifecycle-step-num">Step 5</span>{' '}
                <span className="lifecycle-actor">Payment</span>
              </div>
              <div className="lifecycle-card-title">Pay Your Way</div>
              <p className="lifecycle-card-desc">
                6 payment options: GCash, Maya, GrabPay, card, QR Ph or cash on delivery. The demo
                charges nothing.
              </p>
            </div>
            <div className="lifecycle-card">
              <div className="lifecycle-card-header">
                <span className="lifecycle-step-num">Step 6</span>{' '}
                <span className="lifecycle-actor">Order Ticket</span>
              </div>
              <div className="lifecycle-card-title">Watch It Brew</div>
              <p className="lifecycle-card-desc">
                A scalloped paper-style ticket recaps your order and follows it from received to on
                its way.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="case-content-layout">
        <aside className="case-sidebar">
          <div className="case-toc-title">Table of Contents</div>
          <ul className="case-toc-list">
            <li>
              <a href="#overview">01. Overview &amp; Vision</a>
            </li>
            <li>
              <a href="#heuristics">02. Usability Audits &amp; Friction Points</a>
            </li>
            <li>
              <a href="#wireframes">03. End-to-End Coffee Flow</a>
            </li>
            <li>
              <a href="#trust-signals">04. Local Payments &amp; Reassurance</a>
            </li>
            <li>
              <a href="#outcomes">05. Business Impact &amp; Takeaways</a>
            </li>
          </ul>
        </aside>
        <div className="case-main-narrative">
          <section id="overview" className="case-body-section">
            <div className="section-tag">// 01 · OVERVIEW &amp; VISION</div>
            <h2>Balancing Craft Warmth &amp; Checkout Velocity</h2>
            <p>
              Specialty coffee ordering is deeply personal: customers expect nuanced control over
              cup size, dairy vs. plant-based milk (oat, almond, soy), sweetness levels, and ice
              dilution. However, in conventional e-commerce platforms, complex variant drop-downs
              and multi-page checkouts trigger steep cart abandonment.
            </p>
            <div className="pull-quote">
              “How might we design a coffee ordering experience that feels as inviting, appetizing,
              and tactile as walking into your favorite neighborhood roastery?”
            </div>
            <p>
              Aura Coffee &amp; Kitchen solves this by pairing a warm oat-milk aesthetic (soft
              cream, amber caramel, pill buttons) with a fast, simple ordering flow: a drink
              customizer, a slide-over bag drawer that tracks free delivery, and a one-page checkout
              built around the ways Filipinos actually pay.
            </p>
          </section>
          <section id="heuristics" className="case-body-section">
            <div className="section-tag">// 02 · USABILITY AUDITS &amp; FRICTION POINTS</div>
            <h2>Eliminating Drop-Off in Drink Ordering</h2>
            <p>
              A systematic audit of standard food &amp; beverage ordering funnels revealed three
              primary friction points:
            </p>
            <div className="experience-timeline u-m-24px-0">
              <div className="experience-card">
                <h3 className="u-mb-8px">1. Surprise Courier Fees at the Finish Line</h3>
                <p className="u-fs-0p95rem">
                  Hiding delivery costs until the final payment page triggers immediate price shock.
                  Aura introduces an active free delivery meter in the bag drawer, encouraging
                  upsells to reach the ₱500 threshold.
                </p>
              </div>
              <div className="experience-card">
                <h3 className="u-mb-8px">2. Clunky, Inflexible Customization</h3>
                <p className="u-fs-0p95rem">
                  Requiring customers to navigate away from the menu just to pick oat milk or adjust
                  sweetness causes cognitive fatigue. Aura utilizes a focused, single-viewport modal
                  with immediate visual feedback.
                </p>
              </div>
              <div className="experience-card">
                <h3 className="u-mb-8px">3. Multi-Step Checkout Exhaustion</h3>
                <p className="u-fs-0p95rem">
                  Forcing 4 separate page transitions for Customer Info, Address, Shipping, and
                  Payment creates friction on mobile. Aura consolidates everything onto a single,
                  clear 1-page layout with one-click GCash and Maya buttons.
                </p>
              </div>
            </div>
          </section>
          <section id="wireframes" className="case-body-section">
            <div className="section-tag">// 03 · END-TO-END COFFEE FLOW</div>
            <h2>From Menu Exploration to Scalloped Ticket Receipt</h2>
            <p>Explore the wireframe-to-production design artifacts below:</p>
            <div className="image-gallery">
              <div className="gallery-item">
                <div className="gallery-img-box">
                  <picture>
                    <source
                      type="image/avif"
                      srcSet="/images/aura-website/01-aura-wireframe-cart-drawer-480.2c9fa7aa.avif 480w, /images/aura-website/01-aura-wireframe-cart-drawer-960.065f86c1.avif 960w, /images/aura-website/01-aura-wireframe-cart-drawer-1318.2704147e.avif 1318w"
                      sizes="(max-width: 900px) calc(100vw - 32px), 480px"
                    />
                    <source
                      type="image/webp"
                      srcSet="/images/aura-website/01-aura-wireframe-cart-drawer-480.f9845918.webp 480w, /images/aura-website/01-aura-wireframe-cart-drawer-960.64e4321c.webp 960w, /images/aura-website/01-aura-wireframe-cart-drawer-1318.d327c234.webp 1318w"
                      sizes="(max-width: 900px) calc(100vw - 32px), 480px"
                    />
                    <img
                      src="/images/aura-website/01-aura-wireframe-cart-drawer-960.64e4321c.webp"
                      alt="Bag drawer wireframe"
                      width="960"
                      height="802"
                      loading="lazy"
                      decoding="async"
                      data-full="/images/aura-website/01-aura-wireframe-cart-drawer-1318.d327c234.webp"
                    />
                  </picture>
                </div>
                <div className="gallery-caption">Fig 1.1 — Slide-over Bag Drawer Wireframe</div>
              </div>
              <div className="gallery-item">
                <div className="gallery-img-box">
                  <picture>
                    <source
                      type="image/avif"
                      srcSet="/images/aura-website/01-aura-cart-drawer-480.67f0a15b.avif 480w, /images/aura-website/01-aura-cart-drawer-960.8f688fa1.avif 960w, /images/aura-website/01-aura-cart-drawer-1318.5bd358ed.avif 1318w"
                      sizes="(max-width: 900px) calc(100vw - 32px), 480px"
                    />
                    <source
                      type="image/webp"
                      srcSet="/images/aura-website/01-aura-cart-drawer-480.9c6cddb1.webp 480w, /images/aura-website/01-aura-cart-drawer-960.287576e5.webp 960w, /images/aura-website/01-aura-cart-drawer-1318.68bf4093.webp 1318w"
                      sizes="(max-width: 900px) calc(100vw - 32px), 480px"
                    />
                    <img
                      src="/images/aura-website/01-aura-cart-drawer-960.287576e5.webp"
                      alt="Aura bag drawer with free-delivery meter"
                      width="960"
                      height="802"
                      loading="lazy"
                      decoding="async"
                      data-full="/images/aura-website/01-aura-cart-drawer-1318.68bf4093.webp"
                    />
                  </picture>
                </div>
                <div className="gallery-caption">
                  Fig 1.2 — Production Bag Drawer with Delivery Meter
                </div>
              </div>
            </div>
            <div className="image-gallery">
              <div className="gallery-item">
                <div className="gallery-img-box">
                  <picture>
                    <source
                      type="image/avif"
                      srcSet="/images/aura-website/04-aura-wireframe-one-page-checkout-480.b8885c5c.avif 480w, /images/aura-website/04-aura-wireframe-one-page-checkout-960.bf5ddc89.avif 960w, /images/aura-website/04-aura-wireframe-one-page-checkout-1280.b4372ee6.avif 1280w"
                      sizes="(max-width: 900px) calc(100vw - 32px), 480px"
                    />
                    <source
                      type="image/webp"
                      srcSet="/images/aura-website/04-aura-wireframe-one-page-checkout-480.be4c3868.webp 480w, /images/aura-website/04-aura-wireframe-one-page-checkout-960.b247da25.webp 960w, /images/aura-website/04-aura-wireframe-one-page-checkout-1280.0a395ddd.webp 1280w"
                      sizes="(max-width: 900px) calc(100vw - 32px), 480px"
                    />
                    <img
                      src="/images/aura-website/04-aura-wireframe-one-page-checkout-960.b247da25.webp"
                      alt="One-Page Checkout Wireframe"
                      width="960"
                      height="1024"
                      loading="lazy"
                      decoding="async"
                      data-full="/images/aura-website/04-aura-wireframe-one-page-checkout-1280.0a395ddd.webp"
                    />
                  </picture>
                </div>
                <div className="gallery-caption">
                  Fig 2.1 — 1-Page Consolidated Checkout Structure
                </div>
              </div>
              <div className="gallery-item">
                <div className="gallery-img-box">
                  <picture>
                    <source
                      type="image/avif"
                      srcSet="/images/aura-website/04-aura-one-page-checkout-480.83428481.avif 480w, /images/aura-website/04-aura-one-page-checkout-960.dd739905.avif 960w, /images/aura-website/04-aura-one-page-checkout-1294.d75191d9.avif 1294w"
                      sizes="(max-width: 900px) calc(100vw - 32px), 480px"
                    />
                    <source
                      type="image/webp"
                      srcSet="/images/aura-website/04-aura-one-page-checkout-480.36d8105f.webp 480w, /images/aura-website/04-aura-one-page-checkout-960.d5f60b07.webp 960w, /images/aura-website/04-aura-one-page-checkout-1294.7a910059.webp 1294w"
                      sizes="(max-width: 900px) calc(100vw - 32px), 480px"
                    />
                    <img
                      src="/images/aura-website/04-aura-one-page-checkout-960.d5f60b07.webp"
                      alt="One-Page Checkout UI"
                      width="960"
                      height="1192"
                      loading="lazy"
                      decoding="async"
                      data-full="/images/aura-website/04-aura-one-page-checkout-1294.7a910059.webp"
                    />
                  </picture>
                </div>
                <div className="gallery-caption">
                  Fig 2.2 — Single-View Checkout with Philippine Wallets
                </div>
              </div>
            </div>
            <div className="image-gallery">
              <div className="gallery-item">
                <div className="gallery-img-box">
                  <picture>
                    <source
                      type="image/avif"
                      srcSet="/images/aura-website/03-aura-express-checkout-480.223850a9.avif 480w, /images/aura-website/03-aura-express-checkout-960.8a89d6ac.avif 960w, /images/aura-website/03-aura-express-checkout-1280.b4f5bded.avif 1280w"
                      sizes="(max-width: 900px) calc(100vw - 32px), 480px"
                    />
                    <source
                      type="image/webp"
                      srcSet="/images/aura-website/03-aura-express-checkout-480.a52ee0ca.webp 480w, /images/aura-website/03-aura-express-checkout-960.f206c73e.webp 960w, /images/aura-website/03-aura-express-checkout-1280.1333454e.webp 1280w"
                      sizes="(max-width: 900px) calc(100vw - 32px), 480px"
                    />
                    <img
                      src="/images/aura-website/03-aura-express-checkout-960.f206c73e.webp"
                      alt="Aura Express Checkout Flow"
                      width="960"
                      height="1082"
                      loading="lazy"
                      decoding="async"
                      data-full="/images/aura-website/03-aura-express-checkout-1280.1333454e.webp"
                    />
                  </picture>
                </div>
                <div className="gallery-caption">Fig 3.1 — 1-Tap Express GCash / Maya Flow</div>
              </div>
              <div className="gallery-item">
                <div className="gallery-img-box">
                  <picture>
                    <source
                      type="image/avif"
                      srcSet="/images/aura-website/05-aura-payment-form-480.2ca6ddc5.avif 480w, /images/aura-website/05-aura-payment-form-960.a0f78e60.avif 960w, /images/aura-website/05-aura-payment-form-1280.a9ed6329.avif 1280w"
                      sizes="(max-width: 900px) calc(100vw - 32px), 480px"
                    />
                    <source
                      type="image/webp"
                      srcSet="/images/aura-website/05-aura-payment-form-480.69a45b13.webp 480w, /images/aura-website/05-aura-payment-form-960.8f2e58ff.webp 960w, /images/aura-website/05-aura-payment-form-1280.8b2f0830.webp 1280w"
                      sizes="(max-width: 900px) calc(100vw - 32px), 480px"
                    />
                    <img
                      src="/images/aura-website/05-aura-payment-form-960.8f2e58ff.webp"
                      alt="Aura Payment Form UI"
                      width="960"
                      height="940"
                      loading="lazy"
                      decoding="async"
                      data-full="/images/aura-website/05-aura-payment-form-1280.8b2f0830.webp"
                    />
                  </picture>
                </div>
                <div className="gallery-caption">
                  Fig 3.2 — Payment Form Design (the live demo processes no payment)
                </div>
              </div>
            </div>
            <div className="image-gallery">
              <div className="gallery-item">
                <div className="gallery-img-box">
                  <picture>
                    <source
                      type="image/avif"
                      srcSet="/images/aura-website/02-aura-wireframe-order-confirmation-480.6b7038cd.avif 480w, /images/aura-website/02-aura-wireframe-order-confirmation-960.c95db36f.avif 960w, /images/aura-website/02-aura-wireframe-order-confirmation-1280.3441fe38.avif 1280w"
                      sizes="(max-width: 900px) calc(100vw - 32px), 480px"
                    />
                    <source
                      type="image/webp"
                      srcSet="/images/aura-website/02-aura-wireframe-order-confirmation-480.f4216a56.webp 480w, /images/aura-website/02-aura-wireframe-order-confirmation-960.2a55aaee.webp 960w, /images/aura-website/02-aura-wireframe-order-confirmation-1280.d63d5d50.webp 1280w"
                      sizes="(max-width: 900px) calc(100vw - 32px), 480px"
                    />
                    <img
                      src="/images/aura-website/02-aura-wireframe-order-confirmation-960.2a55aaee.webp"
                      alt="Order Confirmation Wireframe"
                      width="960"
                      height="1014"
                      loading="lazy"
                      decoding="async"
                      data-full="/images/aura-website/02-aura-wireframe-order-confirmation-1280.d63d5d50.webp"
                    />
                  </picture>
                </div>
                <div className="gallery-caption">Fig 4.1 — Order Confirmation Wireframe</div>
              </div>
              <div className="gallery-item">
                <div className="gallery-img-box">
                  <picture>
                    <source
                      type="image/avif"
                      srcSet="/images/aura-website/02-aura-order-confirmation-480.fa99acff.avif 480w, /images/aura-website/02-aura-order-confirmation-960.7ba0d3ed.avif 960w, /images/aura-website/02-aura-order-confirmation-1280.2269c865.avif 1280w"
                      sizes="(max-width: 900px) calc(100vw - 32px), 480px"
                    />
                    <source
                      type="image/webp"
                      srcSet="/images/aura-website/02-aura-order-confirmation-480.8ae63bcd.webp 480w, /images/aura-website/02-aura-order-confirmation-960.62d32689.webp 960w, /images/aura-website/02-aura-order-confirmation-1280.4d8233aa.webp 1280w"
                      sizes="(max-width: 900px) calc(100vw - 32px), 480px"
                    />
                    <img
                      src="/images/aura-website/02-aura-order-confirmation-960.62d32689.webp"
                      alt="Aura Order Confirmation UI"
                      width="960"
                      height="1070"
                      loading="lazy"
                      decoding="async"
                      data-full="/images/aura-website/02-aura-order-confirmation-1280.4d8233aa.webp"
                    />
                  </picture>
                </div>
                <div className="gallery-caption">
                  Fig 4.2 — Scalloped Ticket Receipt with Live Brewing Tracker
                </div>
              </div>
            </div>
          </section>
          <section id="trust-signals" className="case-body-section">
            <div className="section-tag">// 04 · LOCAL PAYMENTS &amp; REASSURANCE</div>
            <h2>Local Relevance &amp; Visual Reassurance</h2>
            <p>
              With 6 payment options (<strong>GCash</strong>, <strong>Maya</strong>,{' '}
              <strong>GrabPay</strong>, <strong>card</strong>, <strong>QR Ph</strong> and{' '}
              <strong>cash on delivery</strong>), local coffee lovers can pay the way they already
              do. Real-time form validation, explicit order recap cards with itemized modifications,
              and an instant order confirmation ticket create complete transparency and peace of
              mind.
            </p>
          </section>
          <section id="outcomes" className="case-body-section">
            <div className="section-tag">// 05 · OUTCOMES &amp; KEY TAKEAWAYS</div>
            <h2>What Shipped</h2>
            <div className="outcome-grid">
              <div className="outcome-card">
                <div className="outcome-number">0</div>
                <div className="outcome-label">
                  Frameworks: Vanilla HTML, CSS &amp; ES6+, So the Page Ships Only the Store
                </div>
              </div>
              <div className="outcome-card">
                <div className="outcome-number">1 Page</div>
                <div className="outcome-label">
                  Checkout: Bag, Delivery &amp; Payment on One Screen
                </div>
              </div>
              <div className="outcome-card">
                <div className="outcome-number">Live</div>
                <div className="outcome-label">
                  Playable Demo at /aura-store, Checkout &amp; Order Ticket Included
                </div>
              </div>
            </div>
            <div className="u-ta-center u-mt-32px">
              <a
                href="/aura-store/index.html"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary u-bg-aura-caramel u-bd-c-aura-caramel u-c-white"
              >
                ☕ Launch Live Aura Coffee Store &amp; 1-Page Checkout
              </a>
            </div>
          </section>
        </div>
      </div>
      <div className="case-pagination-wrap">
        <div className="case-pagination">
          <a href="/case-memory.html" className="pag-card">
            <span className="pag-label">Previous Case Study</span>{' '}
            <span className="pag-title">03 · Memory Core (Lessons-Learned Memory)</span>
          </a>
          <a href="/case-lumina.html" className="pag-card u-ta-right">
            <span className="pag-label">Next Case Study</span>{' '}
            <span className="pag-title">05 · Lumina Analytics (Study &amp; Focus Dashboard)</span>
          </a>
        </div>
      </div>
    </CaseLayout>
  );
}
