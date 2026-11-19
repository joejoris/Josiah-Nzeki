/* Josiah Nzeki — Portfolio interactions */

document.documentElement.classList.add("js");

/* Configuration — see README for setup notes.
   Analytics stays off until a provider ID/domain is added below. */
const SITE_CONFIG = {
  contactEndpoint: "https://formsubmit.co/ajax/josiahnzeki456@gmail.com",
  contactEmail: "josiahnzeki456@gmail.com",
  plausibleDomain: "", // e.g. "josiahnzeki.github.io"
  gaMeasurementId: ""  // e.g. "G-XXXXXXXXXX"
};

function trackEvent(name, props) {
  if (window.plausible) window.plausible(name, { props: props || {} });
  if (window.gtag) window.gtag("event", name, props || {});
}
window.portfolioTrack = trackEvent;

(function initAnalytics() {
  if (SITE_CONFIG.plausibleDomain) {
    const plausible = document.createElement("script");
    plausible.defer = true;
    plausible.src = "https://plausible.io/js/script.js";
    plausible.setAttribute("data-domain", SITE_CONFIG.plausibleDomain);
    document.head.appendChild(plausible);
  }

  if (SITE_CONFIG.gaMeasurementId) {
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag("js", new Date());
    window.gtag("config", SITE_CONFIG.gaMeasurementId, { anonymize_ip: true });

    const ga = document.createElement("script");
    ga.async = true;
    ga.src = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(SITE_CONFIG.gaMeasurementId);
    document.head.appendChild(ga);
  }
})();

document.addEventListener("DOMContentLoaded", function () {
  const page = window.location.pathname.split("/").pop() || "index.html";
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Typing hero subtitle
  const typingText = document.getElementById("typing-text");
  if (typingText && !reduceMotion) {
    const phrases = [
      "Intermediate IT professional.",
      "IT support & networks.",
      "Inventory systems specialist.",
      "KCA University graduate."
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let deleting = false;

    function typeStep() {
      const phrase = phrases[phraseIndex];

      if (!deleting) {
        charIndex += 1;
        typingText.textContent = phrase.slice(0, charIndex);
        if (charIndex === phrase.length) {
          deleting = true;
          return setTimeout(typeStep, 1900);
        }
      } else {
        charIndex -= 1;
        typingText.textContent = phrase.slice(0, charIndex);
        if (charIndex === 0) {
          deleting = false;
          phraseIndex = (phraseIndex + 1) % phrases.length;
          return setTimeout(typeStep, 380);
        }
      }

      setTimeout(typeStep, deleting ? 42 : 82);
    }

    setTimeout(typeStep, 900);
  }

  // Mark the active page in navigation
  document.querySelectorAll(".nav-links a[data-page]").forEach(function (link) {
    if (link.dataset.page === page) {
      link.classList.add("active");
      link.setAttribute("aria-current", "page");
    }
  });

  // Infinite skills marquee on every page
  const marqueeItems = [
    "Technical Support",
    "Network Installation",
    "Sage Inventory",
    "IT Operations",
    "Computer Maintenance",
    "Programming",
    "Data Structures",
    "Teamwork",
    "Problem Solving"
  ];
  const marqueeMarkup = marqueeItems
    .concat(marqueeItems)
    .map(function (item) {
      return "<span>" + item + " <i>&#10022;</i></span>";
    })
    .join("");
  const marquee = document.createElement("div");
  marquee.className = "skills-marquee";
  marquee.setAttribute("aria-label", "Skills and tools");
  marquee.innerHTML = '<div class="marquee-track">' + marqueeMarkup + "</div>";
  const marqueeAnchor = document.querySelector(".stats-strip") || document.querySelector(".page-intro");
  if (marqueeAnchor) {
    marqueeAnchor.after(marquee);
  }

  // WhatsApp quick-contact button
  const whatsapp = document.createElement("a");
  whatsapp.className = "whatsapp-fab";
  whatsapp.href = "https://wa.me/254740471975?text=Hello%20Josiah%2C%20I%20would%20like%20to%20discuss%20an%20opportunity.";
  whatsapp.target = "_blank";
  whatsapp.rel = "noopener noreferrer";
  whatsapp.setAttribute("aria-label", "Chat with Josiah on WhatsApp");
  whatsapp.textContent = "WA";
  document.body.appendChild(whatsapp);

  // Accessibility controls: text size and contrast
  const storage = {
    get: function (key, fallback) {
      try { return localStorage.getItem(key) || fallback; } catch (e) { return fallback; }
    },
    set: function (key, value) {
      try { localStorage.setItem(key, value); } catch (e) {}
    }
  };

  const a11yFab = document.createElement("button");
  a11yFab.className = "a11y-fab";
  a11yFab.type = "button";
  a11yFab.setAttribute("aria-label", "Open accessibility controls");
  a11yFab.setAttribute("aria-expanded", "false");
  a11yFab.textContent = "Aa";

  const a11yPanel = document.createElement("div");
  a11yPanel.className = "a11y-panel";
  a11yPanel.hidden = true;
  a11yPanel.setAttribute("role", "group");
  a11yPanel.setAttribute("aria-label", "Accessibility controls");
  a11yPanel.innerHTML = [
    "<h3>Display settings</h3>",
    '<div class="a11y-row"><span>Text size</span><div class="a11y-options">',
    '<button class="a11y-btn" type="button" data-setting="size" data-value="100%" aria-label="Default text size">A</button>',
    '<button class="a11y-btn" type="button" data-setting="size" data-value="112.5%" aria-label="Large text size">A+</button>',
    '<button class="a11y-btn" type="button" data-setting="size" data-value="125%" aria-label="Larger text size">A++</button>',
    "</div></div>",
    '<div class="a11y-row"><span>Contrast</span><div class="a11y-options">',
    '<button class="a11y-btn" type="button" data-setting="contrast" data-value="normal">Normal</button>',
    '<button class="a11y-btn" type="button" data-setting="contrast" data-value="high">High</button>',
    "</div></div>",
    '<p class="a11y-note">Your choices are saved on this device.</p>'
  ].join("");

  document.body.appendChild(a11yPanel);
  document.body.appendChild(a11yFab);

  function markActive(setting, value) {
    a11yPanel.querySelectorAll('[data-setting="' + setting + '"]').forEach(function (button) {
      const active = button.dataset.value === value;
      button.classList.toggle("active", active);
      button.setAttribute("aria-pressed", String(active));
    });
  }

  // Clear the old theme preference so returning visitors stay on the light design.
  try { localStorage.removeItem("portfolio-theme"); } catch (e) {}
  delete document.documentElement.dataset.theme;

  function applyTextSize(value, silent) {
    document.documentElement.style.fontSize = value;
    markActive("size", value);
    if (!silent) trackEvent("text_size_change", { size: value });
  }

  function applyContrast(value, silent) {
    if (value === "high") {
      document.documentElement.dataset.contrast = "high";
    } else {
      delete document.documentElement.dataset.contrast;
    }
    markActive("contrast", value);
    if (!silent) trackEvent("contrast_change", { mode: value });
  }

  applyTextSize(storage.get("portfolio-text-size", "100%"), true);
  applyContrast(storage.get("portfolio-contrast", "normal"), true);

  a11yFab.addEventListener("click", function () {
    a11yPanel.hidden = !a11yPanel.hidden;
    a11yFab.setAttribute("aria-expanded", String(!a11yPanel.hidden));
    a11yFab.setAttribute("aria-label", a11yPanel.hidden ? "Open accessibility controls" : "Close accessibility controls");
  });

  a11yPanel.addEventListener("click", function (event) {
    const button = event.target.closest("[data-setting]");
    if (!button) return;

    const setting = button.dataset.setting;
    const value = button.dataset.value;

    if (setting === "size") {
      storage.set("portfolio-text-size", value);
      applyTextSize(value);
    } else if (setting === "contrast") {
      storage.set("portfolio-contrast", value);
      applyContrast(value);
    }
  });

  document.addEventListener("click", function (event) {
    if (!a11yPanel.hidden && !a11yPanel.contains(event.target) && event.target !== a11yFab) {
      a11yPanel.hidden = true;
      a11yFab.setAttribute("aria-expanded", "false");
      a11yFab.setAttribute("aria-label", "Open accessibility controls");
    }
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && !a11yPanel.hidden) {
      a11yPanel.hidden = true;
      a11yFab.setAttribute("aria-expanded", "false");
      a11yFab.setAttribute("aria-label", "Open accessibility controls");
      a11yFab.focus();
    }
  });

  // Offline support
  if ("serviceWorker" in navigator && /^https?:$/.test(window.location.protocol)) {
    window.addEventListener("load", function () {
      navigator.serviceWorker.register("sw.js").catch(function () {});
    });
  }

  // Mobile menu
  const toggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (toggle && navLinks) {
    toggle.addEventListener("click", function () {
      const isOpen = navLinks.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(isOpen));
      toggle.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
    });

    navLinks.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        navLinks.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", "Open navigation menu");
      });
    });
  }

  // Add visual thumbnails to project cards
  document.querySelectorAll(".project-card").forEach(function (card) {
    if (card.querySelector(".project-thumb")) return;

    const titleEl = card.querySelector("h3");
    const metaEl = card.querySelector(".project-meta");
    const title = titleEl ? titleEl.textContent.trim() : "Project";
    const meta = metaEl ? metaEl.textContent.trim() : "Project";
    const initials = title
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map(function (word) {
        return word.charAt(0);
      })
      .join("")
      .toUpperCase() || "JN";

    const thumb = document.createElement("div");
    thumb.className = "project-thumb" + (card.dataset.category === "personal" ? " personal" : "");

    const code = document.createElement("span");
    code.className = "project-thumb__code";
    code.textContent = initials;

    const label = document.createElement("span");
    label.className = "project-thumb__label";
    label.textContent = meta;

    thumb.appendChild(code);
    thumb.appendChild(label);
    card.prepend(thumb);
  });

  // Project filtering
  const filterButtons = document.querySelectorAll(".filter-btn[data-filter]");
  const projectCards = document.querySelectorAll(".project-card[data-category]");

  filterButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      const filter = button.dataset.filter;

      filterButtons.forEach(function (btn) {
        btn.setAttribute("aria-pressed", String(btn === button));
      });

      projectCards.forEach(function (card) {
        const show = filter === "all" || card.dataset.category === filter;
        card.hidden = !show;
      });
    });
  });

  // Contact form -> Formsubmit endpoint, with an email fallback
  const contactForm = document.getElementById("contact-form");
  const formStatus = document.getElementById("form-status");

  if (contactForm) {
    const submitButton = contactForm.querySelector('button[type="submit"]');

    contactForm.addEventListener("submit", async function (event) {
      event.preventDefault();

      const formData = new FormData(contactForm);
      const name = String(formData.get("name") || "").trim();
      const email = String(formData.get("email") || "").trim();
      const subject = String(formData.get("subject") || "Portfolio enquiry").trim();
      const message = String(formData.get("message") || "").trim();

      if (formStatus) {
        formStatus.className = "form-status is-sending";
        formStatus.textContent = "Sending your message...";
      }
      if (submitButton) submitButton.disabled = true;

      function showFallback() {
        const body = ["Name: " + name, "Email: " + email, "", message].join("\n");
        const mailto = "mailto:" + SITE_CONFIG.contactEmail +
          "?subject=" + encodeURIComponent(subject) +
          "&body=" + encodeURIComponent(body);

        if (formStatus) {
          formStatus.className = "form-status is-error";
          formStatus.innerHTML = "Could not send automatically. Email <a href=\"" + mailto + "\">" +
            SITE_CONFIG.contactEmail + "</a> directly instead.";
        }
        window.location.href = mailto;
      }

      try {
        const response = await fetch(SITE_CONFIG.contactEndpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({
            name: name,
            email: email,
            subject: subject,
            message: message,
            _subject: "Portfolio enquiry: " + subject,
            _replyto: email,
            _gotcha: String(formData.get("_gotcha") || "")
          })
        });

        if (!response.ok) throw new Error("Form service returned " + response.status);

        if (formStatus) {
          formStatus.className = "form-status";
          formStatus.textContent = "Thanks, " + name + "! Your message has been sent. I will reply soon.";
        }
        contactForm.reset();
        trackEvent("contact_form_submit");
      } catch (error) {
        showFallback();
      } finally {
        if (submitButton) submitButton.disabled = false;
      }
    });
  }

  // Track important interactions when analytics is enabled
  document.querySelectorAll('a[href$=".pdf"], a[href$=".vcf"]').forEach(function (link) {
    link.addEventListener("click", function () {
      trackEvent("download", { file: link.getAttribute("href").split("/").pop() });
    });
  });

  document.querySelectorAll('a[href^="mailto:"], a[href^="tel:"]').forEach(function (link) {
    link.addEventListener("click", function () {
      trackEvent(link.getAttribute("href").startsWith("tel:") ? "phone_click" : "email_click");
    });
  });

  document.querySelectorAll(".project-links a").forEach(function (link) {
    link.addEventListener("click", function () {
      trackEvent("project_link_click", { page: link.getAttribute("href") });
    });
  });

  whatsapp.addEventListener("click", function () {
    trackEvent("whatsapp_click");
  });

  // Print CV
  const printButton = document.getElementById("print-cv");
  if (printButton) {
    printButton.addEventListener("click", function () {
      window.print();
    });
  }

  // Footer year
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  // Scroll progress and back-to-top control
  const progressBar = document.createElement("div");
  progressBar.className = "scroll-progress";
  progressBar.setAttribute("aria-hidden", "true");
  document.body.appendChild(progressBar);

  const backToTop = document.createElement("button");
  backToTop.className = "back-to-top";
  backToTop.type = "button";
  backToTop.setAttribute("aria-label", "Back to top");
  backToTop.textContent = "↑";
  document.body.appendChild(backToTop);

  function updateScrollUI() {
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const percent = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
    progressBar.style.width = Math.min(100, Math.max(0, percent)) + "%";
    backToTop.classList.toggle("show", window.scrollY > 320);

    const heroFloats = document.querySelector(".hero-floats");
    if (heroFloats && window.scrollY < 900) {
      heroFloats.style.transform = "translateY(" + window.scrollY * 0.18 + "px)";
    }
  }

  window.addEventListener("scroll", updateScrollUI, { passive: true });
  window.addEventListener("resize", updateScrollUI);
  updateScrollUI();

  backToTop.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
  });

  // Hover effects only make sense for mouse/trackpad users, not touch screens.
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  if (!reduceMotion && finePointer) {
    // Mouse-follow glow on cards
    document.querySelectorAll(".card").forEach(function (card) {
      card.addEventListener("pointermove", function (event) {
        const rect = card.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / rect.width) * 100;
        const y = ((event.clientY - rect.top) / rect.height) * 100;
        card.style.setProperty("--mx", x + "%");
        card.style.setProperty("--my", y + "%");
      });
    });

    // Subtle 3D tilt on project cards
    document.querySelectorAll(".project-card").forEach(function (card) {
      card.addEventListener("pointermove", function (event) {
        const rect = card.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;
        card.style.transform =
          "perspective(900px) rotateX(" + -y * 5 + "deg) rotateY(" + x * 5 + "deg) translateY(-6px)";
      });
      card.addEventListener("pointerleave", function () {
        card.style.transform = "";
      });
    });

    // Magnetic nudge on buttons
    document.querySelectorAll(".btn").forEach(function (button) {
      button.addEventListener("pointermove", function (event) {
        const rect = button.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;
        button.style.translate = x * 4 + "px " + y * 4 + "px";
      });
      button.addEventListener("pointerleave", function () {
        button.style.translate = "";
      });
    });
  }

  // Count-up animation for stat cards (the number lives inside .stat-icon)
  function animateCount(el) {
    if (!el || el.dataset.counted) return;
    el.dataset.counted = "true";

    const target = parseInt(el.textContent.replace(/\D/g, ""), 10);
    if (isNaN(target)) return;

    const duration = 900;
    const start = performance.now();

    function frame(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = String(Math.round(target * eased)).padStart(2, "0");
      if (progress < 1) requestAnimationFrame(frame);
    }

    requestAnimationFrame(frame);
  }

  // Prepare skill bars to animate into place
  const skillBars = document.querySelectorAll(".bar span");
  skillBars.forEach(function (bar) {
    bar.dataset.target = bar.style.width || "0%";
    bar.style.width = "0%";
  });

  function animateSkillBars(scope) {
    scope.querySelectorAll(".bar span").forEach(function (bar) {
      if (bar.dataset.animated) return;
      bar.dataset.animated = "true";
      requestAnimationFrame(function () {
        bar.style.width = bar.dataset.target;
      });
    });
  }

  // Reveal on scroll with stagger, count-ups, and skill bar fills
  const revealItems = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window && revealItems.length) {
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;

          const el = entry.target;
          el.classList.add("is-visible");

          if (!reduceMotion) {
            if (el.classList.contains("stat-card")) {
              animateCount(el.querySelector(".stat-icon") || el.querySelector("strong"));
            }
            if (el.querySelector(".bar span")) {
              animateSkillBars(el);
            }
          } else {
            el.querySelectorAll(".bar span").forEach(function (bar) {
              bar.style.width = bar.dataset.target;
            });
          }

          observer.unobserve(el);
        });
      },
      { threshold: 0.12 }
    );

    revealItems.forEach(function (item) {
      if (!reduceMotion && item.parentElement) {
        const siblings = Array.from(item.parentElement.children).filter(function (el) {
          return el.classList.contains("reveal");
        });
        const index = siblings.indexOf(item);
        if (index > 0) {
          item.style.transitionDelay = Math.min(index * 70, 280) + "ms";
        }
      }
      observer.observe(item);
    });
  } else {
    revealItems.forEach(function (item) {
      item.classList.add("is-visible");
      if (item.classList.contains("stat-card")) {
        animateCount(item.querySelector(".stat-icon") || item.querySelector("strong"));
      }
      item.querySelectorAll(".bar span").forEach(function (bar) {
        bar.style.width = bar.dataset.target;
      });
    });
  }
});
