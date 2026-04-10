/* ===================================================
   שלום פרץ ולינה רואי חשבון - קובץ JavaScript ראשי
   =================================================== */

document.addEventListener('DOMContentLoaded', () => {

    // ===== מערכת תרגום (i18n) =====
    let currentLang = localStorage.getItem('lang') || 'he';

    // מיפוי אלמנטים מובנים לפי סלקטורים
    const structuralMap = [
        // Services section header
        { sel: '#services .section-tag', key: 'services_tag' },
        { sel: '#services-title', key: 'services_title' },
        { sel: '#services .section-desc', key: 'services_desc' },
        // Service cards - title & desc
        ...Array.from({ length: 12 }, (_, i) => [
            { sel: `.services-grid .service-card:nth-child(${i + 1}) .service-title`, key: `svc${i + 1}_title` },
            { sel: `.services-grid .service-card:nth-child(${i + 1}) .service-desc`, key: `svc${i + 1}_desc` }
        ]).flat(),
        // About
        { sel: '#about .section-tag', key: 'about_tag' },
        { sel: '#about-title', key: 'about_title' },
        { sel: '.about-text', key: 'about_text' },
        { sel: '.experience-text', key: 'about_exp_text', html: true },
        { sel: '.about-feature:nth-child(1) h4', key: 'about_f1_title' },
        { sel: '.about-feature:nth-child(1) p', key: 'about_f1_desc' },
        { sel: '.about-feature:nth-child(2) h4', key: 'about_f2_title' },
        { sel: '.about-feature:nth-child(2) p', key: 'about_f2_desc' },
        { sel: '.about-feature:nth-child(3) h4', key: 'about_f3_title' },
        { sel: '.about-feature:nth-child(3) p', key: 'about_f3_desc' },
        { sel: '.about-feature:nth-child(4) h4', key: 'about_f4_title' },
        { sel: '.about-feature:nth-child(4) p', key: 'about_f4_desc' },
        // Process
        { sel: '#process .section-tag', key: 'process_tag' },
        { sel: '#process-title', key: 'process_title' },
        { sel: '#process .section-desc', key: 'process_desc' },
        { sel: '.process-step:nth-child(2) .step-content h3', key: 'proc1_title' },
        { sel: '.process-step:nth-child(2) .step-content p', key: 'proc1_desc' },
        { sel: '.process-step:nth-child(3) .step-content h3', key: 'proc2_title' },
        { sel: '.process-step:nth-child(3) .step-content p', key: 'proc2_desc' },
        { sel: '.process-step:nth-child(4) .step-content h3', key: 'proc3_title' },
        { sel: '.process-step:nth-child(4) .step-content p', key: 'proc3_desc' },
        { sel: '.process-step:nth-child(5) .step-content h3', key: 'proc4_title' },
        { sel: '.process-step:nth-child(5) .step-content p', key: 'proc4_desc' },
        // Testimonials
        { sel: '#testimonials .section-tag', key: 'testimonials_tag' },
        { sel: '#testimonials-title', key: 'testimonials_title' },
        { sel: '#testimonials .section-desc', key: 'testimonials_desc' },
        ...Array.from({ length: 6 }, (_, i) => [
            { sel: `.testimonial-card[data-test="${i + 1}"] .testimonial-text`, key: `test${i + 1}_text`, all: true },
            { sel: `.testimonial-card[data-test="${i + 1}"] .author-name`, key: `test${i + 1}_name`, all: true }
        ]).flat(),
        // FAQ
        { sel: '#faq .section-tag', key: 'faq_tag' },
        { sel: '#faq-title', key: 'faq_title' },
        { sel: '#faq .section-desc', key: 'faq_desc' },
        ...Array.from({ length: 7 }, (_, i) => [
            { sel: `.faq-item:nth-child(${i + 1}) .faq-question span`, key: `faq${i + 1}_q` },
            { sel: `.faq-item:nth-child(${i + 1}) .faq-answer p`, key: `faq${i + 1}_a` }
        ]).flat(),
        // Contact
        { sel: '#contact .section-tag', key: 'contact_tag' },
        { sel: '#contact-title', key: 'contact_title' },
        { sel: '#contact .section-desc', key: 'contact_desc' },
        { sel: '.contact-item:nth-child(1) h4', key: 'contact_phone' },
        { sel: '.contact-item:nth-child(2) h4', key: 'contact_email' },
        { sel: '.contact-item:nth-child(3) h4', key: 'contact_address_label' },
        { sel: '.contact-item:nth-child(3) p', key: 'contact_address' },
        { sel: '.contact-item:nth-child(4) h4', key: 'contact_hours_label' },
        { sel: '.contact-item:nth-child(4) p', key: 'contact_hours' },
        // Form labels
        { sel: 'label[for="name"]', key: 'form_name' },
        { sel: 'label[for="phone"]', key: 'form_phone' },
        { sel: 'label[for="email"]', key: 'form_email' },
        { sel: 'label[for="subject"]', key: 'form_subject' },
        { sel: 'label[for="message"]', key: 'form_message' },
        { sel: '#submitBtn .btn-text', key: 'form_submit' },
        // Footer
        { sel: '.footer-desc', key: 'footer_desc' },
        { sel: '.footer-links:nth-child(2) .footer-title', key: 'footer_quick_links' },
        { sel: '.footer-links:nth-child(3) .footer-title', key: 'footer_services' },
        { sel: '.footer-contact .footer-title', key: 'footer_contact' },
        // WhatsApp
        { sel: '.whatsapp-tooltip', key: 'whatsapp_tooltip' }
    ];

    // Footer quick links & service links
    const footerNavKeys = ['nav_home', 'nav_services', 'nav_about', 'nav_process', 'nav_testimonials', 'nav_contact'];
    const footerSvcKeys = ['svc1_title', 'svc2_title', 'svc3_title', 'svc4_title', 'svc5_title', 'svc7_title'];

    const applyTranslations = (lang) => {
        if (typeof translations === 'undefined') return;
        currentLang = lang;

        // כיוון טקסט לפי שפה
        const isRTL = lang === 'he' || lang === 'ar';
        document.documentElement.setAttribute('dir', isRTL ? 'rtl' : 'ltr');
        document.documentElement.setAttribute('lang', lang);

        // עדכון data-i18n elements
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[key] && translations[key][lang]) {
                el.textContent = translations[key][lang];
            }
        });

        // עדכון אלמנטים מובנים
        structuralMap.forEach(({ sel, key, html, all }) => {
            if (all) {
                // עדכון כל המופעים (לדוגמה כרטיסי המלצות משוכפלים)
                document.querySelectorAll(sel).forEach(el => {
                    if (translations[key] && translations[key][lang]) {
                        el.textContent = translations[key][lang];
                    }
                });
            } else {
                const el = document.querySelector(sel);
                if (el && translations[key] && translations[key][lang]) {
                    if (html) {
                        el.innerHTML = translations[key][lang];
                    } else {
                        el.textContent = translations[key][lang];
                    }
                }
            }
        });

        // Footer quick links
        const quickLinks = document.querySelectorAll('.footer-links:nth-child(2) ul li a');
        quickLinks.forEach((a, i) => {
            if (footerNavKeys[i] && translations[footerNavKeys[i]]) {
                a.textContent = translations[footerNavKeys[i]][lang];
            }
        });

        // Footer service links
        const svcLinks = document.querySelectorAll('.footer-links:nth-child(3) ul li a');
        svcLinks.forEach((a, i) => {
            if (footerSvcKeys[i] && translations[footerSvcKeys[i]]) {
                a.textContent = translations[footerSvcKeys[i]][lang];
            }
        });

        // Form placeholders
        const nameInput = document.getElementById('name');
        const messageInput = document.getElementById('message');
        if (nameInput && translations.form_name_ph) nameInput.placeholder = translations.form_name_ph[lang];
        if (messageInput && translations.form_message_ph) messageInput.placeholder = translations.form_message_ph[lang];

        // Select options
        const subjectSelect = document.getElementById('subject');
        if (subjectSelect) {
            const optionKeys = ['form_subject_ph', 'form_subject_o1', 'form_subject_o2', 'form_subject_o3', 'form_subject_o4', 'form_subject_o5', 'form_subject_o6', 'form_subject_o7', 'form_subject_o8', 'form_subject_o9'];
            subjectSelect.querySelectorAll('option').forEach((opt, i) => {
                if (optionKeys[i] && translations[optionKeys[i]]) {
                    opt.textContent = translations[optionKeys[i]][lang];
                }
            });
        }

        // Footer copyright
        const copyright = document.querySelector('.footer-bottom p');
        if (copyright && translations.footer_copyright) {
            copyright.innerHTML = `&copy; 2024 ${translations.footer_copyright[lang]}`;
        }

        // Title
        const titleMap = {
            he: 'שלום פרץ ולינה | רואי חשבון - חיפה',
            en: 'Shalom Peretz & Lina | CPA - Haifa',
            ar: 'شالوم بيرتس ولينا | محاسبون قانونيون - حيفا',
            ru: 'Шалом Перец и Лина | Бухгалтеры - Хайфа'
        };
        document.title = titleMap[lang] || titleMap.he;

        // עדכון label בבורר שפה
        const langLabels = { he: 'עברית', en: 'English', ar: 'العربية', ru: 'Русский' };
        const labelEl = document.getElementById('currentLangLabel');
        if (labelEl) labelEl.textContent = langLabels[lang];

        // Active state בבורר
        document.querySelectorAll('.lang-option').forEach(opt => {
            opt.classList.toggle('active', opt.dataset.lang === lang);
        });

        // שמירה
        localStorage.setItem('lang', lang);
    };

    // בורר שפה - פתיחה/סגירה
    const langToggle = document.getElementById('langToggle');
    const langDropdown = document.getElementById('langDropdown');
    const langPicker = document.getElementById('langPicker');

    if (langToggle && langDropdown) {
        langToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            const isOpen = langDropdown.classList.toggle('open');
            langToggle.setAttribute('aria-expanded', isOpen);
        });

        document.querySelectorAll('.lang-option').forEach(opt => {
            opt.addEventListener('click', () => {
                applyTranslations(opt.dataset.lang);
                langDropdown.classList.remove('open');
                langToggle.setAttribute('aria-expanded', 'false');
            });
        });

        // סגירה בלחיצה מחוץ
        document.addEventListener('click', (e) => {
            if (!langPicker.contains(e.target)) {
                langDropdown.classList.remove('open');
                langToggle.setAttribute('aria-expanded', 'false');
            }
        });
    }

    // החלת שפה ראשונית
    applyTranslations(currentLang);

    // ===== Preloader =====
    const preloader = document.getElementById('preloader');
    window.addEventListener('load', () => {
        document.body.classList.remove('loading');
        preloader.classList.add('hidden');
        setTimeout(() => preloader.remove(), 600);
    });
    // Fallback - הסרת preloader אחרי 3 שניות
    setTimeout(() => {
        document.body.classList.remove('loading');
        preloader.classList.add('hidden');
    }, 3000);

    // ===== אנימציית Hero - קו נע בין נקודות =====
    const heroNodes = document.querySelectorAll('.hero-node');
    const heroLine = document.getElementById('heroLine');
    const heroGlow = document.getElementById('heroGlow');
    const heroTrail = document.getElementById('heroTrail');

    if (heroNodes.length > 0 && heroLine && heroGlow && heroTrail) {
        const points = Array.from(heroNodes).map(node => ({
            x: parseFloat(node.getAttribute('cx')),
            y: parseFloat(node.getAttribute('cy')),
            el: node
        }));

        let currentIndex = 0;
        let progress = 0;
        const speed = 0.012;
        let trailPoints = [];

        const animate = () => {
            const from = points[currentIndex];
            const toIndex = (currentIndex + 1) % points.length;
            const to = points[toIndex];

            progress += speed;

            if (progress >= 1) {
                progress = 0;
                to.el.setAttribute('opacity', '1');
                to.el.setAttribute('r', '7');
                setTimeout(() => {
                    to.el.setAttribute('r', '5');
                    to.el.setAttribute('opacity', '0.6');
                }, 600);

                trailPoints.push(`${to.x},${to.y}`);
                currentIndex = toIndex;

                if (currentIndex === 0) {
                    setTimeout(() => {
                        heroTrail.style.transition = 'opacity 1s';
                        heroTrail.setAttribute('opacity', '0');
                        setTimeout(() => {
                            trailPoints = [];
                            heroTrail.setAttribute('points', '');
                            heroTrail.setAttribute('opacity', '0.2');
                            heroTrail.style.transition = '';
                        }, 1000);
                    }, 300);
                }

                if (trailPoints.length >= 2) {
                    heroTrail.setAttribute('points', trailPoints.join(' '));
                }
            }

            const eased = progress < 0.5
                ? 2 * progress * progress
                : 1 - Math.pow(-2 * progress + 2, 2) / 2;

            const cx = from.x + (to.x - from.x) * eased;
            const cy = from.y + (to.y - from.y) * eased;

            heroLine.setAttribute('x1', from.x);
            heroLine.setAttribute('y1', from.y);
            heroLine.setAttribute('x2', cx);
            heroLine.setAttribute('y2', cy);
            heroLine.setAttribute('opacity', '1');

            heroGlow.setAttribute('cx', cx);
            heroGlow.setAttribute('cy', cy);
            heroGlow.setAttribute('opacity', 0.4 + Math.sin(progress * Math.PI) * 0.6);

            requestAnimationFrame(animate);
        };

        points[0].el.setAttribute('opacity', '1');
        points[0].el.setAttribute('r', '7');
        trailPoints.push(`${points[0].x},${points[0].y}`);

        setTimeout(() => {
            points[0].el.setAttribute('r', '5');
            points[0].el.setAttribute('opacity', '0.6');
        }, 600);

        setTimeout(() => requestAnimationFrame(animate), 1500);
    }

    // ===== Header Scroll Effect =====
    const header = document.getElementById('header');
    const backToTop = document.getElementById('backToTop');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;

        // Header שקוף/מלא
        if (scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // כפתור חזרה למעלה
        if (scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }

        lastScroll = scrollY;
    }, { passive: true });

    // כפתור חזרה למעלה
    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ===== המבורגר מנו =====
    const hamburger = document.getElementById('hamburger');
    const nav = document.getElementById('nav');
    const navLinks = document.querySelectorAll('.nav-link');

    hamburger.addEventListener('click', () => {
        const isActive = hamburger.classList.toggle('active');
        nav.classList.toggle('active');
        document.body.classList.toggle('menu-open');
        hamburger.setAttribute('aria-expanded', isActive);
    });

    // סגירת תפריט בלחיצה על קישור
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            nav.classList.remove('active');
            document.body.classList.remove('menu-open');
            hamburger.setAttribute('aria-expanded', 'false');
        });
    });

    // ===== ניווט אקטיבי לפי גלילה =====
    const sections = document.querySelectorAll('section[id]');

    const updateActiveNav = () => {
        const scrollPos = window.scrollY + 100;
        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');
            const link = document.querySelector(`.nav-link[href="#${id}"]`);
            if (link) {
                if (scrollPos >= top && scrollPos < top + height) {
                    navLinks.forEach(l => l.classList.remove('active'));
                    link.classList.add('active');
                }
            }
        });
    };

    window.addEventListener('scroll', updateActiveNav, { passive: true });

    // ===== Dark Mode Toggle =====
    const themeToggle = document.getElementById('themeToggle');
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.documentElement.setAttribute('data-theme', 'dark');
    }

    themeToggle.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme');
        const next = current === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', next);
        localStorage.setItem('theme', next);
    });

    // ===== אנימציות Scroll - Intersection Observer =====
    const animateElements = document.querySelectorAll('.animate-on-scroll');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    animateElements.forEach(el => observer.observe(el));

    // ===== אנימציית ספירת מספרים =====
    const statNumbers = document.querySelectorAll('.stat-number');
    let statsAnimated = false;

    const animateCounters = () => {
        if (statsAnimated) return;
        const statsSection = document.getElementById('stats');
        if (!statsSection) return;

        const rect = statsSection.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            statsAnimated = true;
            statNumbers.forEach(num => {
                const target = parseInt(num.getAttribute('data-target'));
                const duration = 2000;
                const start = performance.now();

                const updateCount = (currentTime) => {
                    const elapsed = currentTime - start;
                    const progress = Math.min(elapsed / duration, 1);
                    // Easing function - ease-out
                    const eased = 1 - Math.pow(1 - progress, 3);
                    const current = Math.floor(eased * target);

                    // פורמט מספרים עם פסיקים
                    num.textContent = current.toLocaleString('he-IL');

                    if (progress < 1) {
                        requestAnimationFrame(updateCount);
                    } else {
                        num.textContent = target.toLocaleString('he-IL');
                    }
                };

                requestAnimationFrame(updateCount);
            });
        }
    };

    window.addEventListener('scroll', animateCounters, { passive: true });
    // בדיקה ראשונית
    animateCounters();

    // ===== Testimonials Vertical Columns =====
    // שכפול כרטיסיות לכל עמודה ליצירת אפקט גלילה אינסופית
    document.querySelectorAll('.testimonials-column-track').forEach(track => {
        const cards = track.innerHTML;
        track.innerHTML = cards + cards; // שכפול לגלילה חלקה
        const duration = track.getAttribute('data-duration') || 20;
        track.style.animationDuration = duration + 's';
    });

    // ===== FAQ Accordion =====
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');

            // סגירת כל השאלות
            faqItems.forEach(i => {
                i.classList.remove('active');
                i.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
            });

            // פתיחה/סגירה של הנוכחית
            if (!isActive) {
                item.classList.add('active');
                question.setAttribute('aria-expanded', 'true');
            }
        });
    });

    // ===== טופס צור קשר - ולידציה =====
    const contactForm = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');

    // פונקציית עזר לתרגום הודעות ולידציה
    const t = (key) => {
        if (typeof translations !== 'undefined' && translations[key]) {
            return translations[key][currentLang] || translations[key].he;
        }
        return key;
    };

    const validators = {
        name: (value) => {
            if (!value.trim()) return t('val_name_required');
            if (value.trim().length < 2) return t('val_name_short');
            return '';
        },
        phone: (value) => {
            if (!value.trim()) return t('val_phone_required');
            const phoneRegex = /^[\d\-+() ]{9,15}$/;
            if (!phoneRegex.test(value.trim())) return t('val_phone_invalid');
            return '';
        },
        email: (value) => {
            if (!value.trim()) return t('val_email_required');
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value.trim())) return t('val_email_invalid');
            return '';
        }
    };

    const validateField = (field) => {
        const validator = validators[field.id];
        if (!validator) return true;

        const error = validator(field.value);
        const errorEl = field.parentElement.querySelector('.form-error');

        if (error) {
            field.classList.add('error');
            if (errorEl) errorEl.textContent = error;
            return false;
        } else {
            field.classList.remove('error');
            if (errorEl) errorEl.textContent = '';
            return true;
        }
    };

    // ולידציה בזמן אמת
    ['name', 'phone', 'email'].forEach(id => {
        const field = document.getElementById(id);
        if (field) {
            field.addEventListener('blur', () => validateField(field));
            field.addEventListener('input', () => {
                if (field.classList.contains('error')) {
                    validateField(field);
                }
            });
        }
    });

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // ולידציה של כל השדות
        const fields = ['name', 'phone', 'email'];
        let isValid = true;

        fields.forEach(id => {
            const field = document.getElementById(id);
            if (!validateField(field)) {
                isValid = false;
            }
        });

        if (!isValid) return;

        // אנימציית שליחה
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;

        try {
            const formData = new FormData(contactForm);
            const response = await fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: { 'Accept': 'application/json' }
            });

            if (response.ok) {
                submitBtn.classList.remove('loading');
                submitBtn.classList.add('success');

                setTimeout(() => {
                    submitBtn.classList.remove('success');
                    submitBtn.disabled = false;
                    contactForm.reset();
                }, 3000);
            } else {
                throw new Error('שגיאה בשליחה');
            }
        } catch {
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;
            alert(t('val_form_error'));
        }
    });

    // ===== Smooth Scroll לקישורי אנקור =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const targetId = anchor.getAttribute('href');
            if (targetId === '#') return;

            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // ===== תפריט נגישות =====
    const a11yToggle = document.getElementById('a11yToggle');
    const a11yPanel = document.getElementById('a11yPanel');
    const a11yClose = document.getElementById('a11yClose');
    const a11yModal = document.getElementById('a11yModal');
    const a11yModalClose = document.getElementById('a11yModalClose');
    const a11yStatementLink = document.getElementById('a11yStatementLink');

    let fontSizeLevel = parseInt(localStorage.getItem('a11y-font-size') || '0');

    // פתיחה/סגירה של הפאנל
    if (a11yToggle) {
        a11yToggle.addEventListener('click', () => {
            a11yPanel.classList.toggle('open');
        });
    }
    if (a11yClose) {
        a11yClose.addEventListener('click', () => {
            a11yPanel.classList.remove('open');
        });
    }

    // סגירה בלחיצה מחוץ
    document.addEventListener('click', (e) => {
        const widget = document.getElementById('a11yWidget');
        if (widget && !widget.contains(e.target)) {
            a11yPanel.classList.remove('open');
        }
    });

    // פונקציה להחלפת toggle
    const toggleA11y = (className, storageKey, btnId) => {
        const btn = document.getElementById(btnId);
        if (!btn) return;
        btn.addEventListener('click', () => {
            document.body.classList.toggle(className);
            btn.classList.toggle('active');
            const isActive = document.body.classList.contains(className);
            localStorage.setItem(storageKey, isActive ? '1' : '0');
        });
        // שחזור מ-localStorage
        if (localStorage.getItem(storageKey) === '1') {
            document.body.classList.add(className);
            btn.classList.add('active');
        }
    };

    // הגדלת טקסט
    const applyFontSize = () => {
        document.documentElement.style.fontSize = (16 + fontSizeLevel * 2) + 'px';
        localStorage.setItem('a11y-font-size', fontSizeLevel);
    };

    const fontIncBtn = document.getElementById('a11yFontInc');
    const fontDecBtn = document.getElementById('a11yFontDec');

    if (fontIncBtn) {
        fontIncBtn.addEventListener('click', () => {
            if (fontSizeLevel < 5) {
                fontSizeLevel++;
                applyFontSize();
            }
        });
    }
    if (fontDecBtn) {
        fontDecBtn.addEventListener('click', () => {
            if (fontSizeLevel > -2) {
                fontSizeLevel--;
                applyFontSize();
            }
        });
    }
    // שחזור גודל פונט
    if (fontSizeLevel !== 0) applyFontSize();

    // Toggles
    toggleA11y('a11y-high-contrast', 'a11y-contrast', 'a11yContrast');
    toggleA11y('a11y-readable-font', 'a11y-readable', 'a11yReadableFont');
    toggleA11y('a11y-highlight-links', 'a11y-links', 'a11yHighlightLinks');
    toggleA11y('a11y-big-cursor', 'a11y-cursor', 'a11yBigCursor');
    toggleA11y('a11y-stop-animations', 'a11y-animations', 'a11yStopAnimations');

    // איפוס
    const resetBtn = document.getElementById('a11yReset');
    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            // הסרת כל הקלאסים
            ['a11y-high-contrast', 'a11y-readable-font', 'a11y-highlight-links', 'a11y-big-cursor', 'a11y-stop-animations'].forEach(cls => {
                document.body.classList.remove(cls);
            });
            // איפוס כפתורים
            document.querySelectorAll('.a11y-btn.active').forEach(btn => btn.classList.remove('active'));
            // איפוס פונט
            fontSizeLevel = 0;
            document.documentElement.style.fontSize = '';
            // ניקוי localStorage
            ['a11y-contrast', 'a11y-readable', 'a11y-links', 'a11y-cursor', 'a11y-animations', 'a11y-font-size'].forEach(key => {
                localStorage.removeItem(key);
            });
        });
    }

    // הצהרת נגישות - מודאל
    if (a11yStatementLink) {
        a11yStatementLink.addEventListener('click', (e) => {
            e.preventDefault();
            a11yPanel.classList.remove('open');
            a11yModal.classList.add('open');
        });
    }
    if (a11yModalClose) {
        a11yModalClose.addEventListener('click', () => {
            a11yModal.classList.remove('open');
        });
    }
    if (a11yModal) {
        a11yModal.addEventListener('click', (e) => {
            if (e.target === a11yModal) a11yModal.classList.remove('open');
        });
    }
});
