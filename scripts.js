
document.addEventListener('DOMContentLoaded', function () {

    const menuToggle = document.getElementById('menuToggle');
    const mainNav = document.getElementById('mainNav');

    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', function () {
            const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
            menuToggle.setAttribute('aria-expanded', !isExpanded);
            menuToggle.classList.toggle('active');
            mainNav.classList.toggle('nav-active');
        });

        mainNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                mainNav.classList.remove('nav-active');
                menuToggle.setAttribute('aria-expanded', 'false');
            });
        });
    }

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    const accordionItems = document.querySelectorAll('.accordion-item');

    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');

        header.addEventListener('click', () => {
            const isActive = item.classList.contains('active');

            accordionItems.forEach(otherItem => {
                otherItem.classList.remove('active');
                otherItem.querySelector('.accordion-header').setAttribute('aria-expanded', 'false');
            });

            if (!isActive) {
                item.classList.add('active');
                header.setAttribute('aria-expanded', 'true');
            }
        });
    });

    const testimonials = document.querySelectorAll('.testimonial-card');
    const dots = document.querySelectorAll('.dot');

    dots.forEach(dot => {
        dot.addEventListener('click', function () {
            const index = this.getAttribute('data-index');

            testimonials.forEach(t => t.classList.remove('active'));
            dots.forEach(d => d.classList.remove('active'));

            testimonials[index].classList.add('active');
            this.classList.add('active');
        });
    });

    const stats = document.querySelectorAll('.stat-number');

    const statsObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                const duration = 2000;
                const startTime = performance.now();

                function updateCount(currentTime) {
                    const elapsed = currentTime - startTime;
                    const progress = Math.min(elapsed / duration, 1);

                    const value = Math.floor(target * (1 - (1 - progress) * (1 - progress)));

                    counter.innerText = value;

                    if (progress < 1) {
                        requestAnimationFrame(updateCount);
                    } else {
                        counter.innerText = target;
                    }
                }

                requestAnimationFrame(updateCount);
                observer.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });

    stats.forEach(stat => statsObserver.observe(stat));
    const contactForm = document.getElementById('footerContactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const nameIdx = document.getElementById('contactName');
            const emailIdx = document.getElementById('contactEmail');
            const msgIdx = document.getElementById('contactMessage');
            const feedback = contactForm.querySelector('.form-message');

            const name = nameIdx.value.trim();
            const email = emailIdx.value.trim();
            const msg = msgIdx.value.trim();

            feedback.style.color = 'inherit';

            if (!name || !email || !msg) {
                feedback.textContent = "Please fill in all fields.";
                feedback.style.color = "#ff4444";
                return;
            }

            if (!email.includes('@')) {
                feedback.textContent = "Please enter a valid email.";
                feedback.style.color = "#ff4444";
                return;
            }

            if (msg.length < 10) {
                feedback.textContent = "Message must be at least 10 characters.";
                feedback.style.color = "#ff4444";
                return;
            }
            // Success
            contactForm.innerHTML = `
                <div style="text-align: center; color: var(--deep);">
                    <h3>Message Sent!</h3>
                    <p>Thanks ${name}, we'll be in touch soon.</p>
                </div>
            `;
        });
    }

});
