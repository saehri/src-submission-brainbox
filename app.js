// Elements
const mouseFollower = document.getElementById("mouse-follower");
const mouseFollowerIcon = document.getElementById("mouse-follower-icon");
const header = document.querySelector(".header");
const rotatingCircle1 = document.querySelector(".rotatingCircle__1"); // not used yet
const heroSection = document.querySelector(".heroSection"); // not used yet
const navigationToggler = document.querySelector(".header__navToggle");
const navigationContent = document.querySelector(".header__nav");
const documentBody = document.body;
const headerNavLinks = document.querySelectorAll(".header__navItem");
const navLinks = Array.from(
  document.querySelectorAll(".header__navItem")
).filter((a) => a.hash && a.hash.length > 1);

const sections = navLinks
  .map((a) => document.getElementById(a.hash.slice(1)))
  .filter(Boolean);

const linkById = new Map(navLinks.map((a) => [a.hash.slice(1), a]));

// ------------------
// Navigation toggle
// ------------------

// Close nav when a link is clicked
headerNavLinks.forEach((link) => {
  link.addEventListener("click", () => {
    if (navigationContent.classList.contains("open")) {
      navigationContent.classList.remove("open");
      documentBody.style.overflow = "auto"; // unlock scroll
      navigationToggler.classList.remove("open");
    }
  });
});

// Handle mobile nav open/close
function handleMobileNavToggle() {
  navigationContent.classList.toggle("open");

  if (navigationContent.classList.contains("open")) {
    documentBody.style.overflow = "hidden"; // lock scroll
    navigationToggler.classList.add("open");
  } else {
    documentBody.style.overflow = "auto"; // unlock scroll
    navigationToggler.classList.remove("open");
  }
}

navigationToggler.addEventListener("click", handleMobileNavToggle);

window.addEventListener("resize", () => {
  const isDesktopSize = window.innerWidth === 1280;
  if (isDesktopSize) {
    navigationContent.classList.remove("open");
    navigationToggler.classList.remove("open");
    documentBody.style.overflow = "auto"; // unlock scroll
  }
});

// ------------------
// Mouse follower
// ------------------

// Move the follower and resize when interacting
function handleMouseFollowerMove(ev, interacting) {
  const x = ev.clientX - mouseFollower.offsetWidth / 2;
  const y = ev.clientY - mouseFollower.offsetHeight / 2;

  const keyframes = {
    transform: `translate(${x}px, ${y}px)`,
    width: interacting ? "50px" : "20px",
    height: interacting ? "50px" : "20px",
  };

  mouseFollower.animate(keyframes, { duration: 500, fill: "forwards" });
}

// Mousemove handler
window.addEventListener("mousemove", (ev) => {
  const interactable = ev.target.closest(".interactable");
  const interacting = interactable !== null;

  // move/resize
  handleMouseFollowerMove(ev, interacting);

  // toggle icon opacity
  mouseFollowerIcon.animate(
    { opacity: interacting ? 1 : 0 },
    { duration: 100, fill: "forwards" }
  );
});

// ------------------
// Scroll direction
// ------------------

// Utility to detect scroll direction
function onScrollDirection(callback) {
  let lastScrollY = window.scrollY;

  window.addEventListener(
    "scroll",
    () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY) {
        callback("down");
      } else if (currentScrollY < lastScrollY) {
        callback("up");
      }

      // avoid negative scrollY
      lastScrollY = Math.max(currentScrollY, 0);
    },
    { passive: true }
  );
}

// hide header when scrolling down, show when up
onScrollDirection((direction) => {
  header.animate(
    { top: direction === "down" ? "-60px" : "16px" },
    { duration: 500, fill: "forwards" }
  );
});

// ------------------
// Observer
// ------------------

// optional: account for sticky header height
const STICKY_HEADER = 16; // px, adjust to your header
const observer = new IntersectionObserver(
  (entries) => {
    // pick the most visible section
    let best = null;
    for (const entry of entries) {
      if (!best || entry.intersectionRatio > best.intersectionRatio)
        best = entry;
    }
    if (!best) return;

    const id = best.target.id;

    navLinks.forEach((a) => a.classList.remove("active"));
    const active = linkById.get(id);
    if (active) active.classList.add("active");
  },
  {
    threshold: [0, 0.5, 0.7, 1],
  }
);

// start observing
sections.forEach((sec) => observer.observe(sec));
