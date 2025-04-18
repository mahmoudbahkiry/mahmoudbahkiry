document.addEventListener('DOMContentLoaded', function() {
  const toggleButton = document.getElementById('theme-toggle');
  
  // Apply saved theme preference
  if (localStorage.getItem('theme') === 'light') {
    document.body.classList.add('light-mode');
    toggleButton.classList.add('light-active');
  }

  if (toggleButton) {
    toggleButton.addEventListener('click', function() {
      // Add animation class
      this.classList.add('animating');
      
      // Toggle theme
      document.body.classList.toggle('light-mode');
      
      // Toggle button appearance
      this.classList.toggle('light-active');
      
      // Save preference
      if (document.body.classList.contains('light-mode')) {
        localStorage.setItem('theme', 'light');
      } else {
        localStorage.setItem('theme', 'dark');
      }
      
      // Remove animation class after animation completes
      setTimeout(() => {
        this.classList.remove('animating');
      }, 500);
    });
  }
}); 