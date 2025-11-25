const scrollButtons = document.querySelectorAll(".scroll-btn");

const handleScroll = (event) => {
  const targetSelector = event.currentTarget.getAttribute("data-target");
  const target = document.querySelector(targetSelector);

  if (!target) return;

  // Smooth scroll with custom easing
  const headerOffset = 80;
  const elementPosition = target.getBoundingClientRect().top;
  const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

  // Custom smooth scroll with easing
  const startPosition = window.pageYOffset;
  const distance = offsetPosition - startPosition;
  const duration = 1000; // 1 second scroll
  let start = null;

  function easeInOutQuad(t) {
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
  }

  function animation(currentTime) {
    if (start === null) start = currentTime;
    const timeElapsed = currentTime - start;
    const progress = Math.min(timeElapsed / duration, 1);
    const ease = easeInOutQuad(progress);

    window.scrollTo(0, startPosition + distance * ease);

    if (progress < 1) {
      requestAnimationFrame(animation);
    }
  }

  requestAnimationFrame(animation);
};

scrollButtons.forEach((button, index) => {
  button.addEventListener("click", handleScroll);
  button.style.animationDelay = `${index * 0.1 + 0.8}s`;
});

const yearSpan = document.getElementById("year");
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

// Avatar carousel functionality
const avatarImages = document.querySelectorAll(".avatar-img");
if (avatarImages.length > 0) {
  let currentAvatarIndex = 0;

  function cycleAvatars() {
    // Remove active class from current image
    avatarImages[currentAvatarIndex].classList.remove("active");
    avatarImages[currentAvatarIndex].classList.add("prev");

    // Move to next image
    currentAvatarIndex = (currentAvatarIndex + 1) % avatarImages.length;

    // Add active class to new image
    avatarImages[currentAvatarIndex].classList.add("active");
    avatarImages[currentAvatarIndex].classList.remove("prev");
  }

  // Change avatar every 2 seconds
  setInterval(cycleAvatars, 4000);
}

const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");
const siteHeader = document.querySelector(".site-header");

// Smooth scroll for navigation links
const navLinkElements = document.querySelectorAll(".nav-link");
navLinkElements.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const targetId = link.getAttribute("href");
    const targetSection = document.querySelector(targetId);

    if (targetSection) {
      // Close mobile menu if open
      if (navToggle) {
        navToggle.setAttribute("aria-expanded", "false");
      }
      if (navLinks) {
        navLinks.classList.remove("is-open");
      }

      // Smooth scroll to section with custom easing
      const headerOffset = 80; // Height of sticky header
      const elementPosition = targetSection.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;

      // Custom smooth scroll with easing
      const startPosition = window.pageYOffset;
      const distance = offsetPosition - startPosition;
      const duration = 1000; // 1 second scroll
      let start = null;

      function easeInOutQuad(t) {
        return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
      }

      function animation(currentTime) {
        if (start === null) start = currentTime;
        const timeElapsed = currentTime - start;
        const progress = Math.min(timeElapsed / duration, 1);
        const ease = easeInOutQuad(progress);

        window.scrollTo(0, startPosition + distance * ease);

        if (progress < 1) {
          requestAnimationFrame(animation);
        }
      }

      requestAnimationFrame(animation);
    }
  });
});

// Navbar scroll effect
let lastScrollTop = 0;
window.addEventListener("scroll", () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  if (scrollTop > 50) {
    siteHeader.classList.add("scrolled");
  } else {
    siteHeader.classList.remove("scrolled");
  }

  lastScrollTop = scrollTop;
});

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    const isOpen = navToggle.getAttribute("aria-expanded") === "true";
    navToggle.setAttribute("aria-expanded", String(!isOpen));
    navLinks.classList.toggle("is-open");
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navToggle.setAttribute("aria-expanded", "false");
      navLinks.classList.remove("is-open");
    });
  });
  // Footer Script Placeholder
  console.log("Footer Loaded");
}

// Gallery modal logic - REMOVED (replaced with carousel modal)
// See carousel modal functionality below

// ESC key handlers for modals
window.addEventListener("keydown", (e) => {
  if (e.key === "Escape" || e.key === "Esc") {
    // Close cover letter modal
    if (coverLetterModal && coverLetterModal.style.display === "flex") {
      closeCoverLetterModal();
    }
    // Close CV modal
    if (cvModal && cvModal.style.display === "flex") {
      closeCvModal();
    }
    // Close carousel modal
    if (carouselModal && carouselModal.style.display === "flex") {
      closeCarouselModal();
    }
  }
});

// Cover Letter Modal functionality
const coverLetterModal = document.getElementById("coverLetterModal");
const viewCoverLetterBtn = document.getElementById("viewCoverLetterBtn");
const coverLetterModalClose = coverLetterModal
  ? coverLetterModal.querySelector(".cover-letter-modal-close")
  : null;
const coverLetterModalOverlay = coverLetterModal
  ? coverLetterModal.querySelector(".cover-letter-modal-overlay")
  : null;
const coverLetterImg = coverLetterModal
  ? coverLetterModal.querySelector(".cover-letter-img")
  : null;
const zoomInBtn = coverLetterModal
  ? coverLetterModal.querySelector(".zoom-in")
  : null;
const zoomOutBtn = coverLetterModal
  ? coverLetterModal.querySelector(".zoom-out")
  : null;
const zoomResetBtn = coverLetterModal
  ? coverLetterModal.querySelector(".zoom-reset")
  : null;

let currentZoom = 0.5;
const zoomStep = 0.2;
const minZoom = 0.5;
const maxZoom = 3;

function updateZoom(newZoom) {
  currentZoom = Math.max(minZoom, Math.min(maxZoom, newZoom));
  if (coverLetterImg) {
    coverLetterImg.style.transform = `scale(${currentZoom})`;
  }
  if (zoomResetBtn) {
    zoomResetBtn.textContent = `${Math.round(currentZoom * 100)}%`;
  }
}

function openCoverLetterModal() {
  if (coverLetterModal) {
    coverLetterModal.style.display = "flex";
    coverLetterModal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    currentZoom = 0.5;
    updateZoom(0.5);
  }
}

function closeCoverLetterModal() {
  if (coverLetterModal) {
    coverLetterModal.style.display = "none";
    coverLetterModal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    currentZoom = 0.5;
    updateZoom(0.5);
  }
}

// Event listeners
if (viewCoverLetterBtn) {
  viewCoverLetterBtn.addEventListener("click", (e) => {
    e.preventDefault();
    openCoverLetterModal();
  });
}

if (coverLetterModalClose) {
  coverLetterModalClose.addEventListener("click", closeCoverLetterModal);
}

if (coverLetterModalOverlay) {
  coverLetterModalOverlay.addEventListener("click", closeCoverLetterModal);
}

if (zoomInBtn) {
  zoomInBtn.addEventListener("click", () => {
    updateZoom(currentZoom + zoomStep);
  });
}

if (zoomOutBtn) {
  zoomOutBtn.addEventListener("click", () => {
    updateZoom(currentZoom - zoomStep);
  });
}

if (zoomResetBtn) {
  zoomResetBtn.addEventListener("click", () => {
    updateZoom(1);
  });
}

// CV/Resume Modal functionality
const cvModal = document.getElementById("cvModal");
const viewCvBtn = document.getElementById("viewCvBtn");
const cvModalClose = cvModal ? cvModal.querySelector(".cv-modal-close") : null;
const cvModalOverlay = cvModal
  ? cvModal.querySelector(".cv-modal-overlay")
  : null;
const cvImg = cvModal ? cvModal.querySelector(".cv-img") : null;
const cvZoomInBtn = cvModal ? cvModal.querySelector(".cv-zoom-in") : null;
const cvZoomOutBtn = cvModal ? cvModal.querySelector(".cv-zoom-out") : null;
const cvZoomResetBtn = cvModal ? cvModal.querySelector(".cv-zoom-reset") : null;

let currentCvZoom = 0.5;

function updateCvZoom(newZoom) {
  currentCvZoom = Math.max(minZoom, Math.min(maxZoom, newZoom));
  if (cvImg) {
    cvImg.style.transform = `scale(${currentCvZoom})`;
  }
  if (cvZoomResetBtn) {
    cvZoomResetBtn.textContent = `${Math.round(currentCvZoom * 100)}%`;
  }
}

function openCvModal() {
  if (cvModal) {
    cvModal.style.display = "flex";
    cvModal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    currentCvZoom = 0.5;
    updateCvZoom(0.5);
  }
}

function closeCvModal() {
  if (cvModal) {
    cvModal.style.display = "none";
    cvModal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    currentCvZoom = 0.5;
    updateCvZoom(0.5);
  }
}

// CV Event listeners
if (viewCvBtn) {
  viewCvBtn.addEventListener("click", (e) => {
    e.preventDefault();
    openCvModal();
  });
}

if (cvModalClose) {
  cvModalClose.addEventListener("click", closeCvModal);
}

if (cvModalOverlay) {
  cvModalOverlay.addEventListener("click", closeCvModal);
}

if (cvZoomInBtn) {
  cvZoomInBtn.addEventListener("click", () => {
    updateCvZoom(currentCvZoom + zoomStep);
  });
}

if (cvZoomOutBtn) {
  cvZoomOutBtn.addEventListener("click", () => {
    updateCvZoom(currentCvZoom - zoomStep);
  });
}

if (cvZoomResetBtn) {
  cvZoomResetBtn.addEventListener("click", () => {
    updateCvZoom(0.5);
  });
}

// Project Gallery Carousel functionality
const carouselContainer = document.querySelector(".carousel-container");
const carouselTrack = document.querySelector(".carousel-track");
const carouselSlides = document.querySelectorAll(".carousel-slide");
const prevBtn = document.querySelector(".carousel-nav.prev");
const nextBtn = document.querySelector(".carousel-nav.next");
const indicatorsContainer = document.querySelector(".carousel-indicators");

if (carouselSlides.length > 0) {
  let currentSlideIndex = 0;
  let autoPlayInterval = null;
  let isUserInteracting = false;
  let touchStartX = 0;
  let touchEndX = 0;

  // Create indicators
  carouselSlides.forEach((_, index) => {
    const indicator = document.createElement("button");
    indicator.classList.add("carousel-indicator");
    if (index === 0) indicator.classList.add("active");
    indicator.setAttribute("aria-label", `Go to slide ${index + 1}`);
    indicator.addEventListener("click", () => goToSlide(index));
    indicatorsContainer.appendChild(indicator);
  });

  const indicators = document.querySelectorAll(".carousel-indicator");

  function updateSlide() {
    carouselSlides.forEach((slide, index) => {
      slide.classList.remove("active");
      if (index === currentSlideIndex) {
        slide.classList.add("active");
      }
    });

    indicators.forEach((indicator, index) => {
      indicator.classList.remove("active");
      if (index === currentSlideIndex) {
        indicator.classList.add("active");
      }
    });
  }

  function nextSlide() {
    currentSlideIndex = (currentSlideIndex + 1) % carouselSlides.length;
    updateSlide();
  }

  function prevSlide() {
    currentSlideIndex =
      (currentSlideIndex - 1 + carouselSlides.length) % carouselSlides.length;
    updateSlide();
  }

  function goToSlide(index) {
    currentSlideIndex = index;
    updateSlide();
    resetAutoPlay();
  }

  function startAutoPlay() {
    if (!isUserInteracting) {
      autoPlayInterval = setInterval(nextSlide, 3000); // Auto-change every 3 seconds
    }
  }

  function stopAutoPlay() {
    if (autoPlayInterval) {
      clearInterval(autoPlayInterval);
      autoPlayInterval = null;
    }
  }

  function resetAutoPlay() {
    stopAutoPlay();
    isUserInteracting = true;
    setTimeout(() => {
      isUserInteracting = false;
      startAutoPlay();
    }, 5000); // Resume auto-play after 5 seconds of no interaction
  }

  // Touch/Swipe support
  function handleTouchStart(e) {
    touchStartX = e.touches[0].clientX;
    stopAutoPlay();
  }

  function handleTouchMove(e) {
    touchEndX = e.touches[0].clientX;
  }

  function handleTouchEnd() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;

    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
    resetAutoPlay();
  }

  // Mouse drag support
  let isDragging = false;
  let dragStartX = 0;
  let dragEndX = 0;

  function handleMouseDown(e) {
    isDragging = true;
    dragStartX = e.clientX;
    carouselContainer.style.cursor = "grabbing";
    stopAutoPlay();
  }

  function handleMouseMove(e) {
    if (!isDragging) return;
    dragEndX = e.clientX;
  }

  function handleMouseUp() {
    if (!isDragging) return;
    isDragging = false;
    carouselContainer.style.cursor = "grab";

    const swipeThreshold = 50;
    const diff = dragStartX - dragEndX;

    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
    resetAutoPlay();
  }

  // Event listeners
  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      prevSlide();
      resetAutoPlay();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      nextSlide();
      resetAutoPlay();
    });
  }

  // Touch events
  if (carouselTrack) {
    carouselTrack.addEventListener("touchstart", handleTouchStart, {
      passive: true,
    });
    carouselTrack.addEventListener("touchmove", handleTouchMove, {
      passive: true,
    });
    carouselTrack.addEventListener("touchend", handleTouchEnd);

    // Mouse events
    carouselTrack.addEventListener("mousedown", handleMouseDown);
    carouselTrack.addEventListener("mousemove", handleMouseMove);
    carouselTrack.addEventListener("mouseup", handleMouseUp);
    carouselTrack.addEventListener("mouseleave", () => {
      if (isDragging) {
        handleMouseUp();
      }
    });
  }

  // Pause auto-play when hovering (desktop only)
  if (carouselContainer) {
    carouselContainer.addEventListener("mouseenter", () => {
      isUserInteracting = true;
      stopAutoPlay();
    });

    carouselContainer.addEventListener("mouseleave", () => {
      isUserInteracting = false;
      startAutoPlay();
    });

    carouselContainer.style.cursor = "grab";
  }

  // Start auto-play on load
  startAutoPlay();
}

// Fullscreen Carousel Modal functionality
const carouselModal = document.getElementById("carouselModal");
const carouselModalImg = carouselModal
  ? carouselModal.querySelector(".carousel-modal-img")
  : null;
const carouselModalClose = carouselModal
  ? carouselModal.querySelector(".carousel-modal-close")
  : null;
const carouselModalOverlay = carouselModal
  ? carouselModal.querySelector(".carousel-modal-overlay")
  : null;
const carouselModalPrevBtn = carouselModal
  ? carouselModal.querySelector(".carousel-modal-nav.prev")
  : null;
const carouselModalNextBtn = carouselModal
  ? carouselModal.querySelector(".carousel-modal-nav.next")
  : null;
const carouselModalIndicatorsContainer = carouselModal
  ? carouselModal.querySelector(".carousel-modal-indicators")
  : null;
const carouselModalCounter = carouselModal
  ? carouselModal.querySelector(".carousel-modal-counter")
  : null;

// Array of all carousel images
const allCarouselImages = [
  {
    src: "./assets/images/placeholder carousal/IMG_0022.heic",
    alt: "Project Image 1",
  },
  {
    src: "./assets/images/placeholder carousal/IMG_0058.heic",
    alt: "Project Image 2",
  },
  {
    src: "./assets/images/placeholder carousal/IMG_5584.heic",
    alt: "Project Image 3",
  },
  {
    src: "./assets/images/placeholder carousal/IMG_5587.heic",
    alt: "Project Image 4",
  },
  {
    src: "./assets/images/placeholder carousal/IMG_5599.jpeg",
    alt: "Project Image 5",
  },
  {
    src: "./assets/images/placeholder carousal/IMG_5608.JPEG",
    alt: "Project Image 6",
  },
  {
    src: "./assets/images/placeholder carousal/IMG_5617.HEIC",
    alt: "Project Image 7",
  },
  {
    src: "./assets/images/placeholder carousal/IMG_9928.heic",
    alt: "Project Image 8",
  },
  {
    src: "./assets/images/placeholder carousal/IMG_9970.heic",
    alt: "Project Image 9",
  },
  {
    src: "./assets/images/placeholder carousal/placeholder1.heic",
    alt: "Project Image 10",
  },
  {
    src: "./assets/images/placeholder carousal/placeholder2.heic",
    alt: "Project Image 11",
  },
  {
    src: "./assets/images/placeholder carousal/placeholder3.heic",
    alt: "Project Image 12",
  },
];

if (carouselModal && carouselSlides.length > 0) {
  let currentModalIndex = 0;
  let modalTouchStartX = 0;
  let modalTouchEndX = 0;

  // Create modal indicators
  function createModalIndicators() {
    if (!carouselModalIndicatorsContainer) return;
    carouselModalIndicatorsContainer.innerHTML = "";
    allCarouselImages.forEach((_, index) => {
      const indicator = document.createElement("button");
      indicator.classList.add("carousel-modal-indicator");
      if (index === currentModalIndex) indicator.classList.add("active");
      indicator.setAttribute("aria-label", `Go to image ${index + 1}`);
      indicator.addEventListener("click", () => goToModalSlide(index));
      carouselModalIndicatorsContainer.appendChild(indicator);
    });
  }

  function updateModalDisplay() {
    if (carouselModalImg) {
      carouselModalImg.src = allCarouselImages[currentModalIndex].src;
      carouselModalImg.alt = allCarouselImages[currentModalIndex].alt;
    }

    // Update indicators
    const modalIndicators = carouselModal.querySelectorAll(
      ".carousel-modal-indicator"
    );
    modalIndicators.forEach((indicator, index) => {
      indicator.classList.remove("active");
      if (index === currentModalIndex) {
        indicator.classList.add("active");
      }
    });

    // Update counter
    if (carouselModalCounter) {
      carouselModalCounter.textContent = `${currentModalIndex + 1} / ${
        allCarouselImages.length
      }`;
    }
  }

  function openCarouselModal(index) {
    if (!carouselModal) return;
    currentModalIndex = index;
    createModalIndicators();
    updateModalDisplay();
    carouselModal.style.display = "flex";
    carouselModal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeCarouselModal() {
    if (!carouselModal) return;
    carouselModal.style.display = "none";
    carouselModal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  function nextModalSlide() {
    currentModalIndex = (currentModalIndex + 1) % allCarouselImages.length;
    updateModalDisplay();
  }

  function prevModalSlide() {
    currentModalIndex =
      (currentModalIndex - 1 + allCarouselImages.length) %
      allCarouselImages.length;
    updateModalDisplay();
  }

  function goToModalSlide(index) {
    currentModalIndex = index;
    updateModalDisplay();
  }

  // Touch/Swipe support for modal
  function handleModalTouchStart(e) {
    modalTouchStartX = e.touches[0].clientX;
  }

  function handleModalTouchMove(e) {
    modalTouchEndX = e.touches[0].clientX;
  }

  function handleModalTouchEnd() {
    const swipeThreshold = 50;
    const diff = modalTouchStartX - modalTouchEndX;

    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        nextModalSlide();
      } else {
        prevModalSlide();
      }
    }
  }

  // Click on carousel images to open modal
  carouselSlides.forEach((slide, index) => {
    const img = slide.querySelector(".carousel-img");
    if (img) {
      img.style.cursor = "pointer";
      img.addEventListener("click", () => {
        openCarouselModal(index);
      });
    }
  });

  // Modal navigation buttons
  if (carouselModalPrevBtn) {
    carouselModalPrevBtn.addEventListener("click", prevModalSlide);
  }

  if (carouselModalNextBtn) {
    carouselModalNextBtn.addEventListener("click", nextModalSlide);
  }

  // Close modal
  if (carouselModalClose) {
    carouselModalClose.addEventListener("click", closeCarouselModal);
  }

  if (carouselModalOverlay) {
    carouselModalOverlay.addEventListener("click", closeCarouselModal);
  }

  // Touch events for modal
  if (carouselModalImg) {
    carouselModalImg.addEventListener("touchstart", handleModalTouchStart, {
      passive: true,
    });
    carouselModalImg.addEventListener("touchmove", handleModalTouchMove, {
      passive: true,
    });
    carouselModalImg.addEventListener("touchend", handleModalTouchEnd);
  }

  // Keyboard navigation
  window.addEventListener("keydown", (e) => {
    if (carouselModal && carouselModal.style.display === "flex") {
      if (e.key === "ArrowLeft") {
        prevModalSlide();
      } else if (e.key === "ArrowRight") {
        nextModalSlide();
      }
    }
  });

  // Make function available globally for ESC key handler
  window.closeCarouselModal = closeCarouselModal;
}
