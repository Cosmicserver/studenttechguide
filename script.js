// Mobile menu, reading progress, and newsletter UI helpers
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const progressBar = document.getElementById("progressBar");
const yearNode = document.getElementById("currentYear");
const newsletterForm = document.getElementById("newsletterForm");
const newsletterEmail = document.getElementById("newsletterEmail");
const formMessage = document.getElementById("formMessage");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

const updateProgress = () => {
  if (!progressBar) return;
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  progressBar.style.width = `${Math.min(100, Math.max(0, progress))}%`;
};

window.addEventListener("scroll", updateProgress, { passive: true });
updateProgress();

if (yearNode) {
  yearNode.textContent = "2026";
}

if (newsletterForm && newsletterEmail && formMessage) {
  newsletterForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!newsletterEmail.checkValidity()) {
      formMessage.style.color = "#991b1b";
      formMessage.textContent = "Please enter a valid email address.";
      newsletterEmail.focus();
      return;
    }

    formMessage.style.color = "#166534";
    formMessage.textContent = "Thanks for subscribing. You are on the StudentTech Guide list.";
    newsletterForm.reset();
  });
}

