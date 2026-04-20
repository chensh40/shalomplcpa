/* ===================================================
   Cookie Consent + Google Analytics 4
   שלום פרץ ולינה רואי חשבון
   =================================================== */

(function () {
    'use strict';

    var GA_MEASUREMENT_ID = 'G-CJSSTQ686C';
    var STORAGE_KEY = 'cc_consent_v1';
    var CONSENT_VERSION = 1;

    var defaultConsent = {
        version: CONSENT_VERSION,
        necessary: true,
        analytics: false,
        marketing: false,
        timestamp: null
    };

    // ---------- Google Consent Mode v2 bootstrap ----------
    window.dataLayer = window.dataLayer || [];
    function gtag() { window.dataLayer.push(arguments); }
    window.gtag = gtag;

    gtag('consent', 'default', {
        'ad_storage': 'denied',
        'ad_user_data': 'denied',
        'ad_personalization': 'denied',
        'analytics_storage': 'denied',
        'functionality_storage': 'granted',
        'security_storage': 'granted',
        'wait_for_update': 500
    });

    // ---------- State helpers ----------
    function readConsent() {
        try {
            var raw = localStorage.getItem(STORAGE_KEY);
            if (!raw) return null;
            var parsed = JSON.parse(raw);
            if (!parsed || parsed.version !== CONSENT_VERSION) return null;
            return parsed;
        } catch (e) {
            return null;
        }
    }

    function writeConsent(state) {
        state.version = CONSENT_VERSION;
        state.timestamp = new Date().toISOString();
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
        } catch (e) {}
    }

    // ---------- GA loader ----------
    var gaLoaded = false;
    function loadGA() {
        if (gaLoaded) return;
        gaLoaded = true;
        var s = document.createElement('script');
        s.async = true;
        s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_MEASUREMENT_ID;
        document.head.appendChild(s);

        gtag('js', new Date());
        gtag('config', GA_MEASUREMENT_ID, {
            anonymize_ip: true,
            send_page_view: true
        });
    }

    function applyConsent(state) {
        gtag('consent', 'update', {
            'analytics_storage': state.analytics ? 'granted' : 'denied',
            'ad_storage': state.marketing ? 'granted' : 'denied',
            'ad_user_data': state.marketing ? 'granted' : 'denied',
            'ad_personalization': state.marketing ? 'granted' : 'denied'
        });
        if (state.analytics) {
            loadGA();
        }
    }

    // ---------- Banner/Modal HTML injection ----------
    function buildBannerHTML() {
        return '' +
            '<div class="cc-banner-content">' +
                '<div class="cc-banner-title">' +
                    '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
                        '<path d="M21.8 11.2a9 9 0 1 1-8.9-9.2 6 6 0 0 0 5.7 6 6 6 0 0 0 3.2 3.2z"/>' +
                        '<circle cx="8" cy="14" r="1"/>' +
                        '<circle cx="13" cy="17" r="1"/>' +
                        '<circle cx="15" cy="11" r="1"/>' +
                    '</svg>' +
                    '<span>העוגיות שלנו</span>' +
                '</div>' +
                '<p class="cc-banner-text">' +
                    'אנו משתמשים בעוגיות (Cookies) כדי לשפר את חוויית הגלישה, לנתח תנועה ולספק שירות טוב יותר. ' +
                    'עוגיות הכרחיות פועלות תמיד. בכפוף להסכמתכם, נשתמש גם בעוגיות אנליטיקה (Google Analytics). ' +
                    'לפרטים מלאים ראו <a href="privacy-policy.html">מדיניות הפרטיות</a>.' +
                '</p>' +
            '</div>' +
            '<div class="cc-actions">' +
                '<button type="button" class="cc-btn cc-btn-link" data-cc-action="settings">הגדרות</button>' +
                '<button type="button" class="cc-btn cc-btn-secondary" data-cc-action="reject">הכרחיים בלבד</button>' +
                '<button type="button" class="cc-btn cc-btn-primary" data-cc-action="accept">אישור הכל</button>' +
            '</div>';
    }

    function buildModalHTML() {
        return '' +
            '<div class="cc-modal" role="dialog" aria-modal="true" aria-labelledby="ccModalTitle">' +
                '<div class="cc-modal-header">' +
                    '<h2 id="ccModalTitle">הגדרות עוגיות</h2>' +
                    '<button type="button" class="cc-close" data-cc-action="close" aria-label="סגור">' +
                        '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>' +
                    '</button>' +
                '</div>' +
                '<div class="cc-modal-body">' +
                    '<p class="cc-modal-intro">' +
                        'אנא בחרו אילו סוגי עוגיות מותר לאתר להשתמש. תוכלו לשנות את הבחירה בכל עת דרך הקישור "הגדרות עוגיות" בתחתית העמוד. ' +
                        'למידע נוסף קראו את <a href="privacy-policy.html">מדיניות הפרטיות</a> שלנו.' +
                    '</p>' +

                    '<div class="cc-category">' +
                        '<div class="cc-category-head">' +
                            '<div>' +
                                '<h3 class="cc-category-title">עוגיות הכרחיות <span class="cc-category-required">תמיד פעיל</span></h3>' +
                                '<p class="cc-category-desc">נדרשות לתפקוד בסיסי של האתר – שמירת העדפות כמו מצב כהה/בהיר, שפה, הגדרות נגישות ושמירת הסכמתכם לעוגיות. אינן מזהות אתכם אישית.</p>' +
                            '</div>' +
                            '<label class="cc-switch" aria-label="עוגיות הכרחיות (תמיד פעיל)">' +
                                '<input type="checkbox" checked disabled>' +
                                '<span class="cc-switch-slider"></span>' +
                            '</label>' +
                        '</div>' +
                    '</div>' +

                    '<div class="cc-category">' +
                        '<div class="cc-category-head">' +
                            '<div>' +
                                '<h3 class="cc-category-title">עוגיות אנליטיקה</h3>' +
                                '<p class="cc-category-desc">Google Analytics 4 – עוזרות להבין כיצד משתמשים באתר (דפים נצפים, זמן שהייה, מקור הגעה). כתובת ה-IP מועברת באופן אנונימי. התוצאות משמשות לשיפור התוכן והחוויה בלבד.</p>' +
                            '</div>' +
                            '<label class="cc-switch" aria-label="הפעלת עוגיות אנליטיקה">' +
                                '<input type="checkbox" data-cc-cat="analytics">' +
                                '<span class="cc-switch-slider"></span>' +
                            '</label>' +
                        '</div>' +
                    '</div>' +

                    '<div class="cc-category">' +
                        '<div class="cc-category-head">' +
                            '<div>' +
                                '<h3 class="cc-category-title">עוגיות שיווק</h3>' +
                                '<p class="cc-category-desc">לשימוש עתידי בכלי פרסום כמו Facebook Pixel או Google Ads. כרגע אינן פעילות באתר. הפעלתן מראש תאפשר התאמה אישית של פרסומות אם ייושמו בעתיד.</p>' +
                            '</div>' +
                            '<label class="cc-switch" aria-label="הפעלת עוגיות שיווק">' +
                                '<input type="checkbox" data-cc-cat="marketing">' +
                                '<span class="cc-switch-slider"></span>' +
                            '</label>' +
                        '</div>' +
                    '</div>' +
                '</div>' +
                '<div class="cc-modal-footer">' +
                    '<button type="button" class="cc-btn cc-btn-secondary" data-cc-action="reject">דחה הכל</button>' +
                    '<button type="button" class="cc-btn cc-btn-secondary" data-cc-action="save">שמור בחירה</button>' +
                    '<button type="button" class="cc-btn cc-btn-primary" data-cc-action="accept">אישור הכל</button>' +
                '</div>' +
            '</div>';
    }

    function ensureElements() {
        var banner = document.getElementById('ccBanner');
        if (!banner) {
            banner = document.createElement('div');
            banner.id = 'ccBanner';
            banner.className = 'cc-banner';
            banner.setAttribute('role', 'dialog');
            banner.setAttribute('aria-live', 'polite');
            banner.setAttribute('aria-label', 'הודעת עוגיות');
            banner.innerHTML = buildBannerHTML();
            document.body.appendChild(banner);
        }

        var overlay = document.getElementById('ccModal');
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.id = 'ccModal';
            overlay.className = 'cc-modal-overlay';
            overlay.innerHTML = buildModalHTML();
            document.body.appendChild(overlay);
        }

        return { banner: banner, overlay: overlay };
    }

    // ---------- Banner controls ----------
    var els = null;
    var lastFocused = null;

    function showBanner() {
        if (!els) return;
        els.banner.classList.add('cc-visible');
        document.body.classList.add('cc-banner-open');
    }

    function hideBanner() {
        if (!els) return;
        els.banner.classList.remove('cc-visible');
        document.body.classList.remove('cc-banner-open');
    }

    function openModal() {
        if (!els) return;
        lastFocused = document.activeElement;
        var current = readConsent() || defaultConsent;
        var analyticsInput = els.overlay.querySelector('[data-cc-cat="analytics"]');
        var marketingInput = els.overlay.querySelector('[data-cc-cat="marketing"]');
        if (analyticsInput) analyticsInput.checked = !!current.analytics;
        if (marketingInput) marketingInput.checked = !!current.marketing;
        els.overlay.classList.add('cc-visible');
        setTimeout(function () {
            var first = els.overlay.querySelector('.cc-close');
            if (first) first.focus();
        }, 50);
    }

    function closeModal() {
        if (!els) return;
        els.overlay.classList.remove('cc-visible');
        if (lastFocused && typeof lastFocused.focus === 'function') {
            try { lastFocused.focus(); } catch (e) {}
        }
    }

    function finalize(state) {
        writeConsent(state);
        applyConsent(state);
        hideBanner();
        closeModal();
    }

    function acceptAll() {
        finalize({ necessary: true, analytics: true, marketing: true });
    }

    function rejectAll() {
        finalize({ necessary: true, analytics: false, marketing: false });
    }

    function saveSelection() {
        if (!els) return;
        var analyticsInput = els.overlay.querySelector('[data-cc-cat="analytics"]');
        var marketingInput = els.overlay.querySelector('[data-cc-cat="marketing"]');
        finalize({
            necessary: true,
            analytics: !!(analyticsInput && analyticsInput.checked),
            marketing: !!(marketingInput && marketingInput.checked)
        });
    }

    function handleAction(action) {
        switch (action) {
            case 'accept': acceptAll(); break;
            case 'reject': rejectAll(); break;
            case 'save': saveSelection(); break;
            case 'settings': openModal(); break;
            case 'close': closeModal(); break;
        }
    }

    function bindEvents() {
        if (!els) return;

        els.banner.addEventListener('click', function (e) {
            var btn = e.target.closest('[data-cc-action]');
            if (!btn) return;
            handleAction(btn.getAttribute('data-cc-action'));
        });

        els.overlay.addEventListener('click', function (e) {
            if (e.target === els.overlay) {
                closeModal();
                return;
            }
            var btn = e.target.closest('[data-cc-action]');
            if (!btn) return;
            handleAction(btn.getAttribute('data-cc-action'));
        });

        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && els.overlay.classList.contains('cc-visible')) {
                closeModal();
            }
        });

        // Public trigger from footer
        document.addEventListener('click', function (e) {
            var opener = e.target.closest('[data-cc-open]');
            if (!opener) return;
            e.preventDefault();
            openModal();
        });
    }

    // ---------- Event tracking helpers ----------
    function sendEvent(name, params) {
        if (typeof window.gtag !== 'function') return;
        window.gtag('event', name, params || {});
    }

    function trackClickEvents() {
        // CTA buttons (primary action buttons across the site)
        document.querySelectorAll('.btn-primary, .btn.btn-primary, .header-cta').forEach(function (btn) {
            btn.addEventListener('click', function () {
                var label = (btn.innerText || btn.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 80);
                var section = btn.closest('section');
                sendEvent('cta_click', {
                    button_name: label || 'cta',
                    section: section ? (section.id || section.className.split(' ')[0] || '') : 'global'
                });
            });
        });

        // WhatsApp
        var wa = document.querySelector('.whatsapp-btn');
        if (wa) wa.addEventListener('click', function () { sendEvent('whatsapp_click'); });

        // Phone links
        document.querySelectorAll('a[href^="tel:"]').forEach(function (a) {
            a.addEventListener('click', function () {
                sendEvent('phone_click', { number: a.getAttribute('href').replace('tel:', '') });
            });
        });

        // Email links
        document.querySelectorAll('a[href^="mailto:"]').forEach(function (a) {
            a.addEventListener('click', function () {
                sendEvent('email_click', { address: a.getAttribute('href').replace('mailto:', '') });
            });
        });

        // Contact form submit
        var form = document.getElementById('contactForm');
        if (form) {
            form.addEventListener('submit', function () {
                var subjectEl = form.querySelector('#subject');
                sendEvent('form_submit', {
                    form_name: 'contact_form',
                    subject: subjectEl ? subjectEl.value || 'unspecified' : 'unspecified'
                });
            });
        }
    }

    function trackScrollDepth() {
        var marks = [50, 100];
        var fired = {};
        function onScroll() {
            var doc = document.documentElement;
            var body = document.body;
            var scrollTop = (doc.scrollTop || body.scrollTop);
            var viewport = window.innerHeight;
            var total = Math.max(doc.scrollHeight, body.scrollHeight) - viewport;
            if (total <= 0) return;
            var pct = Math.round((scrollTop / total) * 100);
            marks.forEach(function (m) {
                if (!fired[m] && pct >= m) {
                    fired[m] = true;
                    sendEvent('scroll_depth', { percent: m });
                }
            });
            if (fired[100]) {
                window.removeEventListener('scroll', onScrollThrottled);
            }
        }
        var ticking = false;
        function onScrollThrottled() {
            if (ticking) return;
            ticking = true;
            requestAnimationFrame(function () {
                onScroll();
                ticking = false;
            });
        }
        window.addEventListener('scroll', onScrollThrottled, { passive: true });
    }

    // ---------- Init ----------
    function init() {
        els = ensureElements();
        bindEvents();

        var stored = readConsent();
        if (stored) {
            applyConsent(stored);
        } else {
            showBanner();
        }

        trackClickEvents();
        trackScrollDepth();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Expose minimal API
    window.CookieConsent = {
        open: function () {
            if (!els) els = ensureElements();
            openModal();
        },
        acceptAll: acceptAll,
        rejectAll: rejectAll,
        getState: function () { return readConsent() || Object.assign({}, defaultConsent); }
    };
})();
