const mouseFollower = document.getElementById("mouse-follower");
const mouseFollowerIcon = document.getElementById("mouse-follower-icon");
const header = document.querySelector(".header");
const rotatingCircle1 = document.querySelector(".rotatingCircle__1");
const heroSection = document.querySelector(".heroSection");
const navigationToggler = document.querySelector(".header__navToggle");
const navigationContent = document.querySelector(".header__nav");
const documentBody = document.body;
const headerNavLinks = document.querySelectorAll(".header__navItem");

headerNavLinks.forEach((link) => {
  link.addEventListener("click", () => {
    const isNavigationOpen = navigationContent.classList.contains("open");

    if (isNavigationOpen) {
      navigationContent.classList.remove("open");
    }
  });
});

function handleMobileNavToggle() {
  navigationContent.classList.toggle("open");

  if (navigationContent.classList.contains("open")) {
    documentBody.style.overflow = "hidden";
    navigationToggler.classList.add("open");
  } else {
    documentBody.style.overflow = "auto";
    navigationToggler.classList.remove("open");
  }
}

navigationToggler.addEventListener("click", handleMobileNavToggle);

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

window.addEventListener("mousemove", (ev) => {
  const interactable = ev.target.closest(".interactable");
  const interacting = interactable !== null;

  handleMouseFollowerMove(ev, interacting);

  const keyframes = {
    opacity: interacting ? 1 : 0,
  };

  //   toggle the icon opacity
  mouseFollowerIcon.animate(keyframes, { duration: 100, fill: "forwards" });
});

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
      lastScrollY = currentScrollY <= 0 ? 0 : currentScrollY; // prevent negative
    },
    { passive: true }
  );
}

// Example usage:
onScrollDirection((direction) => {
  const keyframes = {
    top: direction === "down" ? "-60px" : "16px",
  };

  header.animate(keyframes, { duration: 500, fill: "forwards" });
});
