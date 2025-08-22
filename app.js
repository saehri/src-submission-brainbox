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

// ------------------
// Navigation toggle
// ------------------

// Close nav when a link is clicked
headerNavLinks.forEach((link) => {
  link.addEventListener("click", () => {
    if (navigationContent.classList.contains("open")) {
      navigationContent.classList.remove("open");
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
