// JavaScript for Binoculars Pro page

document.addEventListener('DOMContentLoaded', () => {
  const themeToggleSwitch = document.getElementById('themeToggleSwitch');
  const body = document.body;
  const container = document.querySelector('.container');
  const nav = document.getElementById('mainNav');
  const footer = document.querySelector('.footer');
  const themeLabelBox = document.querySelector('.theme-label-box');

  function toggleTheme() {
    const isDark = themeToggleSwitch.checked;
    if (isDark) {
      body.style.background = 'linear-gradient(135deg, #121212, #2b2b2b, #121212)';
      body.style.color = 'var(--text-dark)';
      container.classList.add('dark');
      nav.classList.add('dark');
      footer.classList.add('dark');
      themeLabelBox.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
      themeLabelBox.style.color = 'var(--text-dark)';
      themeLabelBox.setAttribute('aria-pressed', 'true');
    } else {
      body.style.background = 'linear-gradient(135deg, #667eea, #764ba2, #4ca1af)';
      body.style.color = 'var(--text-light)';
      container.classList.remove('dark');
      nav.classList.remove('dark');
      footer.classList.remove('dark');
      themeLabelBox.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
      themeLabelBox.style.color = '#333333';
      themeLabelBox.setAttribute('aria-pressed', 'false');
    }
  }

  themeToggleSwitch.addEventListener('change', toggleTheme);

  // Load saved theme preference
  const savedTheme = localStorage.getItem('themePreference');
  if (savedTheme === 'dark') {
    themeToggleSwitch.checked = true;
    toggleTheme();
  }

  // Save theme preference on toggle
  themeToggleSwitch.addEventListener('change', () => {
    localStorage.setItem('themePreference', themeToggleSwitch.checked ? 'dark' : 'light');
  });

  const buyNowBtn = document.getElementById('buyNowBtn');
  const learnMoreBtn = document.getElementById('learnMoreBtn');

  buyNowBtn.addEventListener('click', () => {
    alert('Thank you for your interest! The purchase feature will be available soon.');
  });

  learnMoreBtn.addEventListener('click', () => {
    alert('Binoculars Pro offers advanced AI-powered virus detection, real-time scanning, and much more. Stay tuned for detailed info!');
  });
});
