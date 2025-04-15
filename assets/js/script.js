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
          
          // Animate skill progress bars if this is the resume page
          if (pages[j].dataset.page === "resume") {
            setTimeout(() => {
              const skillBars = document.querySelectorAll(".skill-progress-fill");
              skillBars.forEach((bar, index) => {
                // Stagger the animations with a 200ms delay between each bar
                setTimeout(() => {
                  bar.classList.add("animate");
                }, index * 200);
              });
            }, 300);
          } else {
            // Reset animation for next time
            const skillBars = document.querySelectorAll(".skill-progress-fill");
            skillBars.forEach(bar => {
              bar.classList.remove("animate");
            });
          }
        } else {
          pages[j].classList.remove("active");
        }
      }
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

// Animate skill bars on page load if resume page is active
document.addEventListener("DOMContentLoaded", function() {
  const resumePage = document.querySelector('.resume');
  if (resumePage && resumePage.classList.contains('active')) {
    setTimeout(() => {
      const skillBars = document.querySelectorAll(".skill-progress-fill");
      skillBars.forEach((bar, index) => {
        setTimeout(() => {
          bar.classList.add("animate");
        }, index * 200);
      });
    }, 500);
  }
});
