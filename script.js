const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const yearNode = document.getElementById("currentYear");
const progressBar = document.getElementById("readingProgress") || document.getElementById("progressBar");
const contactForm = document.getElementById("contactForm");
const formMsg = document.getElementById("formMessage");
const newsletterForm = document.getElementById("newsletterForm");
const newsletterEmail = document.getElementById("newsletterEmail");

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

if (yearNode) {
  yearNode.textContent = "2026";
}

const updateReadingProgress = () => {
  if (!progressBar) return;
  const total = document.documentElement.scrollHeight - window.innerHeight;
  const percent = total > 0 ? (window.scrollY / total) * 100 : 0;
  progressBar.style.width = `${Math.max(0, Math.min(100, percent))}%`;
};

window.addEventListener("scroll", updateReadingProgress, { passive: true });
updateReadingProgress();

if (contactForm && formMsg) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(contactForm);
    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const message = String(formData.get("message") || "").trim();

    if (!name || !email || !message) {
      formMsg.style.color = "#9f1239";
      formMsg.textContent = "Please fill in all required fields.";
      return;
    }

    formMsg.style.color = "#0b7a52";
    formMsg.textContent = "Thanks, your message is prepared. You can now connect via email below.";
    contactForm.reset();
  });
}

if (newsletterForm && newsletterEmail && formMsg) {
  newsletterForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!newsletterEmail.checkValidity()) {
      formMsg.style.color = "#9f1239";
      formMsg.textContent = "Please enter a valid email address.";
      newsletterEmail.focus();
      return;
    }
    formMsg.style.color = "#0b7a52";
    formMsg.textContent = "Thanks for subscribing.";
    newsletterForm.reset();
  });
}

const longformArticleRoutes = {
  "article-1-budget-laptops-2026": "articles/best-budget-laptops-for-programming-students-2026/",
  "article-2-cs-laptops-2026": "articles/best-laptops-for-computer-science-students-2026/",
  "article-3-free-ai-tools-2026": "articles/best-free-ai-tools-for-students-2026/",
  "article-4-note-taking-apps": "articles/best-note-taking-apps-for-college-students/",
  "article-5-free-coding-sites": "articles/best-free-coding-websites-for-beginners/",
  "article-6-programming-laptop-guide": "articles/how-to-choose-a-laptop-for-programming-complete-guide/",
  "article-7-lightweight-laptops-students": "articles/best-lightweight-laptops-for-students-travel-friendly/",
  "article-8-productivity-apps-2026": "articles/best-productivity-apps-for-students-2026/",
  "article-9-python-laptops": "articles/best-laptops-for-python-programming-students/",
  "article-10-free-platforms-coding": "articles/best-online-platforms-to-learn-coding-for-free/",
};

Object.entries(longformArticleRoutes).forEach(([articleId, route]) => {
  const article = document.getElementById(articleId);
  if (!article) return;

  const heading = article.querySelector("h1");
  if (!heading) return;

  const openArticle = () => {
    window.location.href = route;
  };

  heading.style.cursor = "pointer";
  heading.setAttribute("role", "link");
  heading.setAttribute("tabindex", "0");
  heading.setAttribute("aria-label", `Open article page: ${heading.textContent?.trim() || "Article"}`);

  heading.addEventListener("click", openArticle);
  heading.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openArticle();
    }
  });
});
