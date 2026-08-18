"use strict";

/* ==========================================================================
   Config
   ========================================================================== */

// Create a free form at https://formspree.io and drop its ID here to send
// real emails from the contact form. Left empty, the form falls back to a
// pre-filled mailto: link, so it's functional either way.
const FORMSPREE_ID = "";
const MIN_FILL_TIME_MS = 2500; // below this, a submission is almost certainly a bot

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const isFinePointer = window.matchMedia("(pointer: fine) and (hover: hover)").matches;

const GRADIENT_MAP = {
    accent: "var(--accent)", accent2: "var(--accent-2)", green: "var(--green)",
    orange: "var(--orange)", red: "var(--red)", blue: "var(--blue)",
    pink: "var(--pink)", yellow: "var(--yellow)", purple: "var(--purple)",
};

function resolveGradient(token) {
    // "from-accent to-accent2" -> "linear-gradient(90deg, var(--accent), var(--accent-2))"
    const m = /from-(\w+)\s+to-(\w+)/.exec(token || "");
    if (!m) return "linear-gradient(90deg, var(--accent), var(--accent-2))";
    const a = GRADIENT_MAP[m[1]] || "var(--accent)";
    const b = GRADIENT_MAP[m[2]] || "var(--accent-2)";
    return `linear-gradient(90deg, ${a}, ${b})`;
}

function escapeHtml(str) {
    return String(str).replace(/[&<>"']/g, (c) => ({
        "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
    }[c]));
}

/* ==========================================================================
   Boot
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
    initTheme();
    initNavbar();
    initMobileMenu();
    initCursor();
    initMagnetic();
    initParallax();
    initReveal();
    document.getElementById("year").textContent = new Date().getFullYear();

    fetch("data.json")
        .then((r) => r.json())
        .then((data) => {
            renderMeta(data);
            renderHero(data);
            renderAbout(data);
            renderSkills(data);
            renderCommunity(data);
            renderProjects(data);
            renderContact(data);
            renderFooter(data);
            initHeroReveal();
            initTypewriter(data.typewriter);
            // Newly injected content needs its own reveal + magnetic wiring.
            initReveal();
            initMagnetic();
        })
        .catch((err) => console.error("Failed to load data.json", err));

    initContactForm();
    loadBlog();
});

/* ==========================================================================
   Theme toggle
   ========================================================================== */

function initTheme() {
    const toggle = document.getElementById("theme-toggle");
    toggle.addEventListener("click", () => {
        const current = document.documentElement.getAttribute("data-theme");
        const next = current === "light" ? "dark" : "light";
        document.documentElement.setAttribute("data-theme", next);
        localStorage.setItem("theme", next);
    });
}

/* ==========================================================================
   Navbar + mobile menu
   ========================================================================== */

function initNavbar() {
    const nav = document.getElementById("navbar");
    const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
}

function initMobileMenu() {
    const btn = document.getElementById("hamburger");
    const menu = document.getElementById("mobile-menu");
    const links = menu.querySelectorAll("a");

    const close = () => {
        menu.classList.remove("open");
        document.body.classList.remove("menu-open");
        btn.setAttribute("aria-expanded", "false");
    };
    const open = () => {
        menu.classList.add("open");
        document.body.classList.add("menu-open");
        btn.setAttribute("aria-expanded", "true");
    };

    btn.addEventListener("click", () => {
        menu.classList.contains("open") ? close() : open();
    });
    links.forEach((a) => a.addEventListener("click", close));
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && menu.classList.contains("open")) close();
    });
}

/* ==========================================================================
   Custom cursor: dot + ring (desktop only) + lightweight particle trail
   ========================================================================== */

function initCursor() {
    if (!isFinePointer || prefersReducedMotion) return;
    document.documentElement.classList.add("cursor-active");

    const dot = document.getElementById("cursor-dot");
    const ring = document.getElementById("cursor-ring");
    let mx = window.innerWidth / 2, my = window.innerHeight / 2;
    let rx = mx, ry = my;

    window.addEventListener("pointermove", (e) => {
        if (e.pointerType !== "mouse") return;
        mx = e.clientX; my = e.clientY;
        dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;
    }, { passive: true });

    const tick = () => {
        rx += (mx - rx) * 0.18;
        ry += (my - ry) * 0.18;
        ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
        requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);

    document.addEventListener("mouseover", (e) => {
        if (e.target.closest("a, button, .card-glow, input, textarea")) ring.classList.add("hovering");
    });
    document.addEventListener("mouseout", (e) => {
        if (e.target.closest("a, button, .card-glow, input, textarea")) ring.classList.remove("hovering");
    });

    initCursorSpray();
}

function initCursorSpray() {
    const canvas = document.getElementById("cursor-canvas");
    const ctx = canvas.getContext("2d");
    const MAX = 220, SPAWN_PER_MOVE = 3, MIN_DIST = 7;

    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
        dpr = Math.min(window.devicePixelRatio || 1, 2);
        canvas.width = window.innerWidth * dpr;
        canvas.height = window.innerHeight * dpr;
        canvas.style.width = `${window.innerWidth}px`;
        canvas.style.height = `${window.innerHeight}px`;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const accentRgb = () => {
        const hex = getComputedStyle(document.documentElement).getPropertyValue("--accent").trim() || "#22e5ff";
        const c = hex.replace("#", "");
        return [parseInt(c.slice(0, 2), 16) || 34, parseInt(c.slice(2, 4), 16) || 229, parseInt(c.slice(4, 6), 16) || 255];
    };
    let [ar, ag, ab] = accentRgb();
    new MutationObserver(() => { [ar, ag, ab] = accentRgb(); })
        .observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

    const pool = Array.from({ length: MAX }, () => ({ alive: false, x: 0, y: 0, vx: 0, vy: 0, r: 0, life: 0, maxLife: 0, color: "" }));
    let cursor = pool.length, lastX = -1, lastY = -1;

    const spawn = (x, y) => {
        for (let i = 0; i < SPAWN_PER_MOVE; i++) {
            cursor = (cursor + 1) % pool.length;
            const p = pool[cursor];
            const angle = Math.random() * Math.PI * 2;
            const speed = 0.5 + Math.random() * 2;
            p.alive = true; p.x = x; p.y = y;
            p.vx = Math.cos(angle) * speed;
            p.vy = Math.sin(angle) * speed - 0.3;
            p.r = 1 + Math.random() * 2.4;
            p.maxLife = 36 + Math.random() * 26;
            p.life = p.maxLife;
            const shade = 0.55 + Math.random() * 0.45;
            p.color = `${Math.round(ar * shade)},${Math.round(ag * shade)},${Math.round(ab * shade)}`;
        }
    };

    window.addEventListener("pointermove", (e) => {
        if (e.pointerType !== "mouse") return;
        const dx = lastX < 0 ? Infinity : e.clientX - lastX;
        const dy = lastY < 0 ? Infinity : e.clientY - lastY;
        if (Math.hypot(dx, dy) < MIN_DIST) return;
        lastX = e.clientX; lastY = e.clientY;
        spawn(e.clientX, e.clientY);
    }, { passive: true });

    let rafId = 0;
    const tick = () => {
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
        for (const p of pool) {
            if (!p.alive) continue;
            p.life -= 1;
            if (p.life <= 0) { p.alive = false; continue; }
            p.vy += 0.018; p.vx *= 0.97; p.vy *= 0.97;
            p.x += p.vx; p.y += p.vy;
            const alpha = p.life / p.maxLife;
            ctx.beginPath();
            ctx.fillStyle = `rgba(${p.color},${alpha * 0.7})`;
            ctx.arc(p.x, p.y, p.r * alpha, 0, Math.PI * 2);
            ctx.fill();
        }
        rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    document.addEventListener("visibilitychange", () => {
        if (document.hidden) cancelAnimationFrame(rafId);
        else rafId = requestAnimationFrame(tick);
    });
}

/* ==========================================================================
   Magnetic buttons
   ========================================================================== */

function initMagnetic() {
    if (prefersReducedMotion || !isFinePointer) return;
    document.querySelectorAll(".magnetic").forEach((el) => {
        if (el.dataset.magneticBound) return;
        el.dataset.magneticBound = "1";
        el.addEventListener("mousemove", (e) => {
            const rect = el.getBoundingClientRect();
            const x = (e.clientX - rect.left - rect.width / 2) * 0.25;
            const y = (e.clientY - rect.top - rect.height / 2) * 0.25;
            el.style.transform = `translate(${x}px, ${y}px)`;
        });
        el.addEventListener("mouseleave", () => { el.style.transform = ""; });
    });
}

/* ==========================================================================
   Parallax background orbs
   ========================================================================== */

function initParallax() {
    if (prefersReducedMotion) return;
    const orbA = document.querySelector(".orb-a");
    const orbB = document.querySelector(".orb-b");
    const orbC = document.querySelector(".orb-c");
    let ticking = false;

    const update = () => {
        const y = window.scrollY;
        if (orbA) orbA.style.transform = `translate3d(${y * -0.03}px, ${y * 0.12}px, 0)`;
        if (orbB) orbB.style.transform = `translate3d(${y * 0.02}px, ${y * -0.1}px, 0)`;
        if (orbC) orbC.style.transform = `translate3d(${y * 0.04}px, ${y * 0.08}px, 0)`;
        ticking = false;
    };

    window.addEventListener("scroll", () => {
        if (!ticking) { requestAnimationFrame(update); ticking = true; }
    }, { passive: true });
}

/* ==========================================================================
   Reveal-on-scroll
   ========================================================================== */

let revealObserver;
function initReveal() {
    if (!revealObserver) {
        if (prefersReducedMotion) {
            revealObserver = { observe: (el) => el.classList.add("in-view") };
        } else {
            revealObserver = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("in-view");
                        revealObserver.unobserve(entry.target);
                    }
                });
            }, { rootMargin: "-80px 0px", threshold: 0.05 });
        }
    }
    document.querySelectorAll(".reveal:not(.reveal-bound)").forEach((el) => {
        el.classList.add("reveal-bound");
        revealObserver.observe(el);
    });
}

/* ==========================================================================
   Hero: char-split heading reveal + typewriter role line
   ========================================================================== */

function initHeroReveal() {
    const heading = document.getElementById("hero-name");
    const rest = document.getElementById("hero-rest");
    if (prefersReducedMotion) {
        rest.style.opacity = "1";
        return;
    }
    const text = heading.textContent;
    // Split into words first (each an inline-block, so line-breaks only
    // happen between words) then split each word into per-char spans.
    heading.innerHTML = text.split(" ").map((word) =>
        `<span class="word">${word.split("").map((ch) => `<span class="char">${ch}</span>`).join("")}</span>`
    ).join(" ");
    heading.querySelectorAll(".char").forEach((span, i) => {
        span.style.opacity = "0";
        span.style.transform = "translateY(120%) rotate(6deg)";
        span.style.transition = `opacity 0.6s var(--ease-out), transform 0.6s var(--ease-out)`;
        span.style.transitionDelay = `${0.15 + i * 0.018}s`;
        requestAnimationFrame(() => requestAnimationFrame(() => {
            span.style.opacity = "1";
            span.style.transform = "translateY(0) rotate(0)";
        }));
    });
    rest.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    rest.style.transform = "translateY(20px)";
    setTimeout(() => { rest.style.opacity = "1"; rest.style.transform = "translateY(0)"; }, 500);
}

function initTypewriter(words) {
    const el = document.getElementById("hero-role-text");
    if (!el || !words || !words.length || prefersReducedMotion) {
        if (el && words) el.textContent = words[0];
        return;
    }
    let wordIndex = 0, charIndex = 0, deleting = false;

    const tick = () => {
        const word = words[wordIndex];
        if (!deleting) {
            charIndex++;
            el.textContent = word.slice(0, charIndex);
            if (charIndex === word.length) {
                deleting = true;
                setTimeout(tick, 1600);
                return;
            }
        } else {
            charIndex--;
            el.textContent = word.slice(0, charIndex);
            if (charIndex === 0) {
                deleting = false;
                wordIndex = (wordIndex + 1) % words.length;
            }
        }
        setTimeout(tick, deleting ? 35 : 65);
    };
    tick();
}

/* ==========================================================================
   Render: data.json -> DOM
   ========================================================================== */

function renderMeta(d) {
    document.title = `${d.meta.name} — ${d.meta.role}`;
    document.querySelector('meta[name="description"]').setAttribute("content", d.meta.tagline);
    document.querySelector('meta[property="og:description"]').setAttribute("content", d.meta.tagline);
    document.querySelector('meta[name="twitter:description"]').setAttribute("content", d.meta.tagline);
}

function renderHero(d) {
    const m = d.meta;
    document.getElementById("hero-name").textContent = m.name;
    document.getElementById("hero-tagline").textContent = m.tagline;

    if (m.available) {
        document.getElementById("hero-badge").hidden = false;
        document.getElementById("hero-badge-text").textContent = m.availableText;
    }

    const stats = [
        { value: m.yearsExp, label: "Years Exp" },
        { value: m.shippedProjects, label: "Shipped Projects" },
        { value: m.cgpa, label: "CGPA" },
    ];
    document.getElementById("hero-stats").innerHTML = stats.map((s) => `
        <div><div class="stat-value">${escapeHtml(s.value)}</div><div class="stat-label">${escapeHtml(s.label)}</div></div>
    `).join("");

    document.getElementById("hero-badge-exp").textContent = `${m.yearsExp} yrs exp`;
    document.querySelectorAll(".resume-link").forEach((a) => { a.href = m.resumeHref; });
}

function renderAbout(d) {
    document.getElementById("about-bio").innerHTML = d.bio.map((p) => `<p>${p}</p>`).join("");
    document.getElementById("about-tags").innerHTML = d.tags.map((t) => `<span class="tag-pill">${escapeHtml(t)}</span>`).join("");
    document.getElementById("about-langs").innerHTML = d.languages.map((l) => `
        <div><div class="name">${escapeHtml(l.name)}</div><div class="level">${escapeHtml(l.level)}</div></div>
    `).join("");

    const colorMap = { accent: "var(--accent)", accent2: "var(--accent-2)", border: "var(--border)" };
    document.getElementById("timeline").innerHTML = d.timeline.map((item) => {
        const col = colorMap[item.color] || colorMap.border;
        return `
        <div class="timeline-item reveal">
            <span class="timeline-dot" style="background:${col};box-shadow:0 0 10px ${col}"></span>
            <div class="timeline-period">${escapeHtml(item.period)}</div>
            <div class="timeline-role">${escapeHtml(item.role)}</div>
            <div class="timeline-org">${escapeHtml(item.org)}</div>
            ${item.desc ? `<p class="timeline-desc">${escapeHtml(item.desc)}</p>` : ""}
        </div>`;
    }).join("");
}

function renderSkills(d) {
    document.getElementById("skills-grid").innerHTML = d.skillGroups.map((g) => `
        <div class="card-glow skill-card reveal">
            <div class="skill-card-head">
                <div class="icon">${g.icon}</div>
                <h3>${escapeHtml(g.label)}</h3>
            </div>
            <div class="skill-tags">${g.skills.map((s) => `<span class="tag-pill">${escapeHtml(s)}</span>`).join("")}</div>
        </div>
    `).join("");
}

function renderCommunity(d) {
    document.getElementById("community-grid").innerHTML = d.community.map((c) => `
        <div class="card-glow community-card reveal">
            <div class="community-head">
                <div>
                    <div class="community-org">${escapeHtml(c.org)}</div>
                    <div class="community-org-full">${escapeHtml(c.orgFull)}</div>
                </div>
                ${c.url ? `<a href="${c.url}" target="_blank" rel="noreferrer" aria-label="${escapeHtml(c.org)} website" class="project-links"><svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" transform="rotate(-45 12 12)"/></svg></a>` : ""}
            </div>
            <div class="community-role">${escapeHtml(c.role)}</div>
            <ul class="community-points">${c.points.map((p) => `<li>${escapeHtml(p)}</li>`).join("")}</ul>
        </div>
    `).join("");

    if (d.achievement) {
        document.getElementById("achievement-text").textContent = d.achievement;
    }
}

function renderProjects(d) {
    const [flagship, ...rest] = d.projects;

    if (flagship) {
        document.getElementById("flagship-project").innerHTML = `
            <div>
                <div class="flagship-head">
                    <div class="flagship-icon">${flagship.icon}</div>
                    <div>
                        <div class="flagship-eyebrow">Flagship product</div>
                        <h3>${escapeHtml(flagship.title)}</h3>
                    </div>
                </div>
                <p class="flagship-role">${escapeHtml(flagship.role)}</p>
                ${flagship.team ? `<p class="flagship-team">👥 ${escapeHtml(flagship.team)}</p>` : ""}
                <div class="tag-row">${flagship.tags.map((t) => `<span class="tag-pill">${escapeHtml(t)}</span>`).join("")}</div>
                <div class="flagship-actions">
                    ${flagship.live ? `<a href="${flagship.live}" target="_blank" rel="noreferrer" class="btn btn-primary magnetic">Live Site ↗</a>` : ""}
                    ${flagship.github ? `<a href="${flagship.github}" target="_blank" rel="noreferrer" class="btn magnetic">GitHub</a>` : ""}
                </div>
            </div>
            <div class="flagship-detail">
                ${flagship.problem ? `<div><div class="label">The problem</div><p>${escapeHtml(flagship.problem)}</p></div>` : ""}
                ${flagship.solution ? `<div><div class="label">What I built</div><p>${escapeHtml(flagship.solution)}</p></div>` : ""}
            </div>
        `;
    }

    document.getElementById("projects-grid").innerHTML = rest.map((p) => `
        <article class="card-glow project-card reveal">
            <div class="bar" style="background:${resolveGradient(p.gradient)}"></div>
            <div class="body">
                <div class="project-card-head">
                    <div class="project-icon">${p.icon}</div>
                    <div class="project-links">
                        ${p.live ? `<a href="${p.live}" target="_blank" rel="noreferrer" aria-label="${escapeHtml(p.title)} live site">Live ↗</a>` : ""}
                        ${p.github ? `<a href="${p.github}" target="_blank" rel="noreferrer" aria-label="${escapeHtml(p.title)} on GitHub">GH ↗</a>` : ""}
                    </div>
                </div>
                <h3>${escapeHtml(p.title)}</h3>
                ${p.role ? `<p class="role">${escapeHtml(p.role)}</p>` : ""}
                <p>${escapeHtml(p.desc)}</p>
                <div class="tag-row">${p.tags.map((t) => `<span class="tag-pill">${escapeHtml(t)}</span>`).join("")}</div>
            </div>
        </article>
    `).join("");
}

function renderContact(d) {
    document.getElementById("contact-cta").textContent = d.contact.cta;
    document.getElementById("contact-info").innerHTML = `
        <div class="card-glow info-card">
            <div class="icon-wrap">📍</div>
            <div><div class="label">Location</div><div class="value">${escapeHtml(d.contact.location)}</div></div>
        </div>
        <a class="card-glow info-card" href="mailto:${d.meta.email}">
            <div class="icon-wrap">✉️</div>
            <div><div class="label">Email</div><div class="value">${escapeHtml(d.meta.email)}</div></div>
        </a>
        <a class="card-glow info-card" href="tel:${d.meta.phone}">
            <div class="icon-wrap">📞</div>
            <div><div class="label">Phone</div><div class="value">${escapeHtml(d.meta.phoneDisplay)}</div></div>
        </a>
    `;
    document.getElementById("contact-social").innerHTML = d.social.slice(0, 2).map((s) => `
        <a href="${s.url}" target="_blank" rel="noreferrer" class="btn magnetic">${escapeHtml(s.label)}</a>
    `).join("");
}

function renderFooter(d) {
    document.getElementById("footer-year-name").textContent = d.meta.name;
    document.getElementById("footer-social").innerHTML = d.social.slice(0, 3).map((s) => `
        <a href="${s.url}" target="_blank" rel="noreferrer" aria-label="${escapeHtml(s.label)}">${escapeHtml(s.short)}</a>
    `).join("");
}

/* ==========================================================================
   Contact form: honeypot + timing spam guard, Formspree with mailto fallback
   ========================================================================== */

function initContactForm() {
    const form = document.getElementById("contact-form");
    const mountedAt = Date.now();
    const statusEl = document.getElementById("form-status");
    const submitBtn = document.getElementById("form-submit");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const data = new FormData(form);
        const name = String(data.get("name") || "");
        const email = String(data.get("email") || "");
        const message = String(data.get("message") || "");
        const honeypot = String(data.get("company") || "");
        const elapsed = Date.now() - mountedAt;

        // Honeypot filled, or submitted faster than a human could type =
        // spam. Fake a normal "sent" response so scripted submitters get no
        // signal the message was silently dropped.
        if (honeypot !== "" || elapsed < MIN_FILL_TIME_MS) {
            showStatus("success", "Thanks — I'll get back to you soon!");
            form.reset();
            return;
        }

        if (!FORMSPREE_ID) {
            window.location.href = `mailto:${form.dataset.email}?subject=${encodeURIComponent(`Portfolio contact from ${name}`)}&body=${encodeURIComponent(`${message}\n\n— ${name} (${email})`)}`;
            return;
        }

        submitBtn.disabled = true;
        submitBtn.textContent = "Sending...";
        try {
            const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
                method: "POST",
                headers: { Accept: "application/json" },
                body: data,
            });
            if (res.ok) {
                showStatus("success", "Thanks — I'll get back to you soon!");
                form.reset();
            } else {
                showStatus("error", `Something went wrong — email me directly at ${form.dataset.email}.`);
            }
        } catch {
            showStatus("error", `Something went wrong — email me directly at ${form.dataset.email}.`);
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = "Send Message";
        }
    });

    function showStatus(kind, text) {
        statusEl.textContent = text;
        statusEl.className = `form-status ${kind}`;
    }
}

/* ==========================================================================
   Blog: grid + markdown modal
   ========================================================================== */

function loadBlog() {
    fetch("blogs/posts.json")
        .then((r) => r.json())
        .then((posts) => {
            const grid = document.getElementById("blog-grid");
            grid.innerHTML = posts.slice(0, 3).map((post) => `
                <article class="card-glow blog-card reveal" data-file="${post.file}" data-title="${escapeHtml(post.title)}" data-date="${escapeHtml(post.date)}" data-tags='${JSON.stringify(post.tags)}' tabindex="0" role="button" aria-label="Read: ${escapeHtml(post.title)}">
                    <div class="blog-cover">
                        <img src="${post.cover}" alt="" loading="lazy" />
                        <span class="blog-date">${escapeHtml(post.date)}</span>
                    </div>
                    <div class="blog-body">
                        <h3>${escapeHtml(post.title)}</h3>
                        <p>${escapeHtml(post.excerpt)}</p>
                        <div class="tag-row">${post.tags.map((t) => `<span class="tag-pill">${escapeHtml(t)}</span>`).join("")}</div>
                    </div>
                </article>
            `).join("");

            grid.querySelectorAll(".blog-card").forEach((card) => {
                const open = () => openBlogModal(card.dataset);
                card.addEventListener("click", open);
                card.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(); } });
            });
            initReveal();
            initMagnetic();
        })
        .catch(() => {
            document.getElementById("blog-grid").innerHTML = '<p class="font-mono" style="color:var(--subtle)">Could not load blog posts.</p>';
        });

    const overlay = document.getElementById("blog-modal");
    const closeBtn = document.getElementById("modal-close");
    const close = () => {
        overlay.classList.remove("open");
        document.body.style.overflow = "";
    };
    closeBtn.addEventListener("click", close);
    overlay.addEventListener("click", (e) => { if (e.target === overlay) close(); });
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") close(); });
}

function openBlogModal(dataset) {
    const overlay = document.getElementById("blog-modal");
    const content = document.getElementById("modal-content");
    document.getElementById("modal-title").textContent = dataset.title;
    document.getElementById("modal-meta").textContent = `${dataset.date} · ${JSON.parse(dataset.tags).join(", ")}`;
    content.innerHTML = '<p style="color:var(--subtle)">Loading…</p>';

    overlay.classList.add("open");
    document.body.style.overflow = "hidden";

    fetch(dataset.file)
        .then((r) => r.text())
        .then((md) => {
            // The post's own H1 duplicates the title already shown above
            // the content, so drop a leading "# ..." line if present.
            const trimmed = md.replace(/^#\s+.+\n+/, "");
            content.innerHTML = window.marked ? window.marked.parse(trimmed) : trimmed;
            if (window.hljs) content.querySelectorAll("pre code").forEach((el) => window.hljs.highlightElement(el));
        })
        .catch(() => { content.innerHTML = '<p style="color:var(--subtle)">Could not load this post.</p>'; });
}
