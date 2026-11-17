// ===================================
// 3D PORTFOLIO INTERACTIVE EFFECTS
// ===================================

// 1. Interactive 3D Profile Card

const profileCard = document.getElementById("profileCard");

if (profileCard) {

    profileCard.addEventListener("pointermove", (event) => {

        // Disable tilt on touch devices
        if (event.pointerType === "touch") return;

        const rect = profileCard.getBoundingClientRect();

        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateY = ((x - centerX) / centerX) * 10;
        const rotateX = ((centerY - y) / centerY) * 10;

        profileCard.classList.add("is-tilting");

        profileCard.style.transform =
            `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    profileCard.addEventListener("pointerleave", () => {

        profileCard.classList.remove("is-tilting");

        profileCard.style.transform = "";

    });
}


// 2. Smooth Reveal Animation on Scroll

const revealSections = document.querySelectorAll(
    ".section, .project-placeholder, .skill-card"
);

const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
).matches;

if ("IntersectionObserver" in window && !prefersReducedMotion) {

    revealSections.forEach((element) => {
        element.classList.add("reveal");
    });

    const observer = new IntersectionObserver(
        (entries, observerInstance) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    observerInstance.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.12
        }
    );

    revealSections.forEach((element) => {
        observer.observe(element);
    });

}
// ===================================
// 3. ACTIVE NAVIGATION BUTTON
// ===================================

const navLinks = document.querySelectorAll(".nav-links a");

const sections = document.querySelectorAll(
    "#home, #about, #skills, #projects, #contact"
);

// Update active button
function updateActiveLink() {

    let currentSection = "home";

    sections.forEach((section) => {

        const sectionTop = section.offsetTop - 150;

        if (window.scrollY >= sectionTop) {
            currentSection = section.id;
        }

    });

    navLinks.forEach((link) => {

        link.classList.remove("active");

        if (link.getAttribute("href") === `#${currentSection}`) {
            link.classList.add("active");
        }

    });

}

// Update when clicking navigation buttons
navLinks.forEach((link) => {

    link.addEventListener("click", () => {

        navLinks.forEach((item) => {
            item.classList.remove("active");
        });

        link.classList.add("active");

    });

});

// Update when scrolling
window.addEventListener("scroll", updateActiveLink);

updateActiveLink();
