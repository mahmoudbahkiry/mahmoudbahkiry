'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });



// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// Only proceed with testimonials functionality if all required elements exist
if (testimonialsItem.length && modalContainer && modalCloseBtn && overlay) {
  // modal variable
  const modalImg = document.querySelector("[data-modal-img]");
  const modalTitle = document.querySelector("[data-modal-title]");
  const modalText = document.querySelector("[data-modal-text]");

  // modal toggle function
  const testimonialsModalFunc = function () {
    modalContainer.classList.toggle("active");
    overlay.classList.toggle("active");
  }

  // add click event to all modal items
  for (let i = 0; i < testimonialsItem.length; i++) {
    testimonialsItem[i].addEventListener("click", function () {
      modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
      modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
      modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
      modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

      testimonialsModalFunc();
    });
  }

  // add click event to modal close button
  modalCloseBtn.addEventListener("click", testimonialsModalFunc);
  overlay.addEventListener("click", testimonialsModalFunc);
}



// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

// Only proceed with select functionality if all required elements exist
if (select && selectItems.length && selectValue && filterBtn.length) {
  select.addEventListener("click", function () { elementToggleFunc(this); });

  // add event in all select items
  for (let i = 0; i < selectItems.length; i++) {
    selectItems[i].addEventListener("click", function () {
      let selectedValue = this.innerText.toLowerCase();
      selectValue.innerText = this.innerText;
      elementToggleFunc(select);
      filterFunc(selectedValue);
    });
  }

  // filter variables
  const filterItems = document.querySelectorAll("[data-filter-item]");

  const filterFunc = function (selectedValue) {
    for (let i = 0; i < filterItems.length; i++) {
      if (selectedValue === "all") {
        filterItems[i].classList.add("active");
      } else if (selectedValue === filterItems[i].dataset.category) {
        filterItems[i].classList.add("active");
      } else {
        filterItems[i].classList.remove("active");
      }
    }
  }

  // add event in all filter button items for large screen
  let lastClickedBtn = filterBtn[0];

  for (let i = 0; i < filterBtn.length; i++) {
    filterBtn[i].addEventListener("click", function () {
      let selectedValue = this.innerText.toLowerCase();
      selectValue.innerText = this.innerText;
      filterFunc(selectedValue);

      lastClickedBtn.classList.remove("active");
      this.classList.add("active");
      lastClickedBtn = this;
    });
  }
}



// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// Only proceed with form functionality if all required elements exist
if (form && formInputs.length && formBtn) {
  // add event to all form input field
  for (let i = 0; i < formInputs.length; i++) {
    formInputs[i].addEventListener("input", function () {
      // check form validation
      if (form.checkValidity()) {
        formBtn.removeAttribute("disabled");
      } else {
        formBtn.setAttribute("disabled", "");
      }
    });
  }
}



// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// Only proceed with navigation functionality if all required elements exist
if (navigationLinks.length && pages.length) {
  // add event to all nav link
  for (let i = 0; i < navigationLinks.length; i++) {
    navigationLinks[i].addEventListener("click", function () {
      // First, remove active class from all navigation links
      for (let k = 0; k < navigationLinks.length; k++) {
        navigationLinks[k].classList.remove("active");
      }
      
      // Add active class to the clicked navigation link
      this.classList.add("active");
      
      // Update page visibility based on the clicked navigation link
      for (let j = 0; j < pages.length; j++) {
        if (this.innerHTML.toLowerCase() === pages[j].dataset.page) {
          pages[j].classList.add("active");
          window.scrollTo(0, 0);
        } else {
          pages[j].classList.remove("active");
        }
      }
    });
  }
}

// Function to observe skill bars and animate them when visible
function setupSkillBarsObserver() {
  const skillBars = document.querySelectorAll(".skill-progress-fill");
  
  if (skillBars.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          // Add animation class with a staggered delay
          setTimeout(() => {
            entry.target.classList.add("animate");
          }, index * 100);
          
          // Once animated, no need to observe anymore
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 }); // Trigger when at least 20% of the element is visible
    
    // Observe each skill bar
    skillBars.forEach(bar => {
      // First, remove any existing animation class
      bar.classList.remove("animate");
      observer.observe(bar);
    });
  }
}

// Course links confirmation dialog
const courseLinks = document.querySelectorAll(".course-link");

if (courseLinks.length) {
  courseLinks.forEach(link => {
    link.addEventListener("click", function(e) {
      e.preventDefault(); 
      const url = this.getAttribute("data-url") || this.getAttribute("href");
      if (confirm("You are about to leave this site to visit an external course. Do you want to continue?")) {
        window.open(url, "_blank");
      }
    });
  });
}

// Set up observers when the page loads
document.addEventListener("DOMContentLoaded", function() {
  setupSkillBarsObserver();
  
  // Re-setup observers when navigation occurs
  navigationLinks.forEach(link => {
    link.addEventListener("click", function() {
      // Small delay to ensure page transition is complete
      setTimeout(setupSkillBarsObserver, 100);
    });
  });
});

// Certificate modal functionality
const certificateItems = document.querySelectorAll(".certificate-card");
const certificateModalContainer = document.querySelector("[data-certificate-modal-container]");
const certificateModalCloseBtn = document.querySelector("[data-certificate-modal-close-btn]");
const certificateOverlay = document.querySelector("[data-certificate-overlay]");

// Only proceed with certificate functionality if all required elements exist
if (certificateItems.length && certificateModalContainer && certificateModalCloseBtn && certificateOverlay) {
  // modal variables
  const certificateModalImg = document.querySelector("[data-certificate-modal-img]");
  const certificateDownloadBtn = document.querySelector("[data-certificate-download-btn]");
  const certificateModal = document.querySelector(".certificate-modal");

  // modal toggle function
  const certificateModalFunc = function () {
    certificateModalContainer.classList.toggle("active");
    document.body.classList.toggle("certificate-modal-open");
  }

  // add click event to all certificate items
  for (let i = 0; i < certificateItems.length; i++) {
    certificateItems[i].addEventListener("click", function () {
      const imgSrc = this.querySelector(".certificate-img img").src;
      const imgAlt = this.querySelector(".certificate-img img").alt;
      
      certificateModalImg.src = imgSrc;
      certificateModalImg.alt = imgAlt;
      
      // Set direct download link - no confirmation needed
      if (certificateDownloadBtn) {
        certificateDownloadBtn.href = imgSrc;
      }

      certificateModalFunc();
    });
  }

  // add click event to modal close button
  certificateModalCloseBtn.addEventListener("click", certificateModalFunc);
  
  // Close modal when clicking on the overlay (outside the certificate)
  certificateOverlay.addEventListener("click", certificateModalFunc);
  
  // Close modal when clicking outside the certificate modal content
  certificateModalContainer.addEventListener("click", function(event) {
    // Only close if clicking directly on the container, not its children
    if (event.target === certificateModalContainer) {
      certificateModalFunc();
    }
  });
  
  // Prevent clicks on the modal itself from bubbling up to the container
  if (certificateModal) {
    certificateModal.addEventListener("click", function(event) {
      event.stopPropagation();
    });
  }
}

// Contact links confirmation dialogs
const contactLinks = document.querySelectorAll("[data-contact]");

if (contactLinks.length) {
  contactLinks.forEach(link => {
    link.addEventListener("click", function(e) {
      e.preventDefault();
      const contactType = this.getAttribute("data-contact");
      const href = this.getAttribute("href");
      let confirmMessage = "";
      
      switch(contactType) {
        case "email":
          confirmMessage = "Would you like to send an email to Mahmoud Elbahkiry?";
          break;
        case "phone":
          confirmMessage = "Would you like to make a phone call to Mahmoud Elbahkiry?";
          break;
        case "location":
          confirmMessage = "Would you like to view Mahmoud Elbahkiry's location on Google Maps?";
          break;
        default:
          confirmMessage = "Would you like to proceed?";
      }
      
      if (confirm(confirmMessage)) {
        window.open(href, "_blank");
      }
    });
  });
}
