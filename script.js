/* ============================================================
   ATTICS — Landing Page Scripts
   ============================================================ */

(() => {
  "use strict";

  // ---------- Navbar scroll effect ----------
  const navbar = document.getElementById("navbar");
  let lastScroll = 0;

  window.addEventListener(
    "scroll",
    () => {
      const currentScroll = window.scrollY;
      navbar.classList.toggle("navbar--scrolled", currentScroll > 40);
      lastScroll = currentScroll;
    },
    { passive: true },
  );

  // ---------- Mobile menu toggle ----------
  const navToggle = document.getElementById("navToggle");
  const navLinks = document.getElementById("navLinks");

  navToggle?.addEventListener("click", () => {
    navLinks.classList.toggle("navbar__links--open");
    const spans = navToggle.querySelectorAll("span");
    const isOpen = navLinks.classList.contains("navbar__links--open");

    if (isOpen) {
      spans[0].style.transform = "rotate(45deg) translate(5px, 5px)";
      spans[1].style.opacity = "0";
      spans[2].style.transform = "rotate(-45deg) translate(5px, -5px)";
    } else {
      spans[0].style.transform = "";
      spans[1].style.opacity = "";
      spans[2].style.transform = "";
    }
  });

  // Close menu on link click
  navLinks?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("navbar__links--open");
      const spans = navToggle.querySelectorAll("span");
      spans[0].style.transform = "";
      spans[1].style.opacity = "";
      spans[2].style.transform = "";
    });
  });

  // ---------- Scroll reveal ----------
  const revealElements = document.querySelectorAll(
    ".feature-card, .step, .testimonial-card, .stat, .trusted__logo",
  );

  // Add the reveal class
  revealElements.forEach((el) => el.classList.add("reveal"));

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Stagger animation based on index within parent
          const parent = entry.target.parentElement;
          const siblings = parent
            ? Array.from(parent.children).filter((c) =>
                c.classList.contains("reveal"),
              )
            : [];
          const index = siblings.indexOf(entry.target);
          entry.target.style.transitionDelay = `${index * 0.08}s`;
          entry.target.classList.add("reveal--visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -40px 0px" },
  );

  revealElements.forEach((el) => revealObserver.observe(el));

  // ---------- Stat counter animation ----------
  const statNumbers = document.querySelectorAll(".stat__number");

  const formatNumber = (n) => {
    if (n >= 1000) return n.toLocaleString("en-US");
    return n.toString();
  };

  const countObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.dataset.target, 10);
          const suffix = el
            .closest(".stat")
            ?.querySelector(".stat__label")
            ?.textContent.includes("%")
            ? "%"
            : "+";
          let current = 0;
          const step = target / 60;
          const duration = 1500;
          const startTime = performance.now();

          const updateCounter = (timestamp) => {
            const elapsed = timestamp - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            current = Math.round(eased * target);
            el.textContent =
              formatNumber(current) +
              (progress >= 1 ? (suffix === "%" ? "%" : "+") : "");

            if (progress < 1) {
              requestAnimationFrame(updateCounter);
            }
          };

          requestAnimationFrame(updateCounter);
          countObserver.unobserve(el);
        }
      });
    },
    { threshold: 0.5 },
  );

  statNumbers.forEach((el) => countObserver.observe(el));

  // ---------- Smooth scroll for anchor links ----------
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      const target = document.querySelector(anchor.getAttribute("href"));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

  // ---------- Phone mockup card hover effect ----------
  const phoneCards = document.querySelectorAll(".phone-mockup__card");
  phoneCards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      card.style.transform = "scale(1.03)";
      card.style.background = "rgba(57, 36, 145, 0.05)";
    });
    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
      card.style.background = "";
    });
  });
})();
