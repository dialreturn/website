const navToggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".site-nav");
const animatedItems = document.querySelectorAll("[data-animate]");
const contactForm = document.querySelector("#contact-form");
const formStatus = document.querySelector("#form-status");

if (navToggle && nav) {
  navToggle.addEventListener("click", () => {
    const isOpen = document.body.classList.toggle("nav-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  nav.addEventListener("click", (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      document.body.classList.remove("nav-open");
      navToggle.setAttribute("aria-expanded", "false");
    }
  });
}

const reveal = () => {
  if (!("IntersectionObserver" in window)) {
    animatedItems.forEach((item) => item.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.16 }
  );

  animatedItems.forEach((item) => observer.observe(item));
};

const openLegalSection = (id) => {
  const section = document.getElementById(id);

  if (section instanceof HTMLDetailsElement) {
    section.open = true;
    section.scrollIntoView({ behavior: "smooth", block: "center" });
  }
};

document.querySelectorAll("[data-open-legal]").forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    const targetId = link.getAttribute("data-open-legal");

    if (targetId) {
      openLegalSection(targetId);
    }
  });
});

if (contactForm && formStatus) {
  contactForm.addEventListener("submit", () => {
    formStatus.textContent = "Sending...";
    setTimeout(() => {
      formStatus.textContent = "Thanks — we received your message.";
      contactForm.reset();
    }, 600);
  });
}


reveal();
