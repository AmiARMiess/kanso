const filterButtons = document.querySelectorAll(".filter-chip");
const stayCards = document.querySelectorAll(".stay-card");
const menuToggle = document.querySelector(".menu-toggle");
const primaryNav = document.querySelector(".primary-nav");
const newsletterForm = document.querySelector(".newsletter-form");
const formMessage = document.querySelector(".form-message");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;

    filterButtons.forEach((chip) => {
      const isActive = chip === button;
      chip.classList.toggle("is-active", isActive);
      chip.setAttribute("aria-pressed", String(isActive));
    });

    stayCards.forEach((card) => {
      const shouldShow = filter === "all" || card.dataset.category === filter;
      card.classList.toggle("is-hidden", !shouldShow);
    });
  });
});

menuToggle.addEventListener("click", () => {
  const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isExpanded));
  primaryNav.classList.toggle("is-open", !isExpanded);
});

primaryNav.addEventListener("click", (event) => {
  if (event.target.closest("a")) {
    menuToggle.setAttribute("aria-expanded", "false");
    primaryNav.classList.remove("is-open");
  }
});

newsletterForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const emailInput = newsletterForm.querySelector('input[type="email"]');

  if (!emailInput.validity.valid) {
    emailInput.reportValidity();
    return;
  }

  formMessage.textContent = "You're on the list. A little something good is on its way.";
  emailInput.value = "";
});
