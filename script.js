// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', event => {
    const id = anchor.getAttribute('href').slice(1);
    const element = document.getElementById(id);
    if (element) {
      event.preventDefault();
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// Contact form handler
function handleContact() {
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();
  
  if (!name || !email || !message) return;
  
  alert(`Thanks, ${name}! We'll get back to you at ${email}.`);
  
  // Clear form
  document.getElementById('name').value = '';
  document.getElementById('email').value = '';
  document.getElementById('message').value = '';
}

// Mobile menu toggle
function toggleMenu() {
  const navLinks = document.getElementById('navLinks');
  const menuBtn = document.querySelector('.mobile-menu-btn');
  navLinks.classList.toggle('active');
  
  // Toggle icon (optional - you can add animation here)
  if (navLinks.classList.contains('active')) {
    menuBtn.setAttribute('aria-expanded', 'true');
  } else {
    menuBtn.setAttribute('aria-expanded', 'false');
  }
}

// Close menu when clicking a link
function closeMenu() {
  const navLinks = document.getElementById('navLinks');
  navLinks.classList.remove('active');
  document.querySelector('.mobile-menu-btn')?.setAttribute('aria-expanded', 'false');
}

// Close menu when clicking outside
document.addEventListener('click', function(event) {
  const nav = document.querySelector('.nav');
  const navLinks = document.getElementById('navLinks');
  const menuBtn = document.querySelector('.mobile-menu-btn');
  
  if (!nav.contains(event.target) && navLinks.classList.contains('active')) {
    navLinks.classList.remove('active');
    menuBtn?.setAttribute('aria-expanded', 'false');
  }
});

// Livestream popup controls
function openLivestreamPopup() {
  document.getElementById('livestreamModal').style.display = 'flex';
  startCountdown();
}

function closeLivestreamPopup() {
  document.getElementById('livestreamModal').style.display = 'none';
}

// Livestream configuration
const eventDate = new Date('2025-10-18T16:00:00+01:00'); // 18 Oct 2025, 4 PM WAT
const eventName = "AGM 2025";
const livestreamURL = "https://web.facebook.com/events/2310266709401065/";

// Auto-calculated values
const endDate = new Date(eventDate.getTime() + 24 * 60 * 60 * 1000);
const embedURL = "https://www.facebook.com/plugins/video.php?href=" +
                 encodeURIComponent(livestreamURL) +
                 "&show_text=false&autoplay=true";

// Countdown and player logic
function startCountdown() {
  const countdownEl = document.getElementById('countdownText');
  const linkEl = document.getElementById('livestreamLink');
  const playerContainer = document.getElementById('playerContainer');
  const player = document.getElementById('livestreamPlayer');

  // Main section elements
  const mainSection = document.getElementById('livestreamSection');
  const mainCountdown = document.getElementById('liveCountdownMain');
  const mainPlayer = document.getElementById('livePlayerMain');
  const mainFrame = document.getElementById('livePlayerFrame');
  const mainJoin = document.getElementById('liveJoinMain');

  const now = new Date();
  if (now > endDate) {
    mainSection.style.display = 'none';
    return;
  }

  const timer = setInterval(() => {
    const now = new Date().getTime();
    if (now > endDate.getTime()) {
      clearInterval(timer);
      mainSection.style.display = 'none';
      return;
    }

    const distance = eventDate.getTime() - now;

    if (distance <= 0) {
      clearInterval(timer);
      const liveMsg = `🎥 ${eventName} Livestream is now live!`;
      
      if (countdownEl) countdownEl.innerHTML = liveMsg;
      if (mainCountdown) {
        mainCountdown.innerHTML = liveMsg;
        mainCountdown.style.color = '#ff073a';
      }

      // Show embedded players and links
      if (linkEl) {
        linkEl.href = livestreamURL;
        linkEl.style.display = 'inline-block';
      }
      if (mainJoin) {
        mainJoin.href = livestreamURL;
        mainJoin.style.display = 'inline-block';
      }
      if (playerContainer) playerContainer.style.display = 'block';
      if (player) player.src = embedURL;
      if (mainPlayer) mainPlayer.style.display = 'block';
      if (mainFrame) mainFrame.src = embedURL;
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    const formatted = `⏳ Live in <strong>${days}d ${hours}h ${minutes}m ${seconds}s</strong>`;
    
    if (countdownEl) countdownEl.innerHTML = formatted;
    if (mainCountdown) mainCountdown.innerHTML = formatted;
  }, 1000);
}

// Auto-start countdown on page load
document.addEventListener('DOMContentLoaded', () => {
  const now = new Date();
  if (now <= endDate) {
    startCountdown();
  } else {
    const mainSection = document.getElementById('livestreamSection');
    if (mainSection) mainSection.style.display = 'none';
  }
  
  // Set current year in footer
  const yearElement = document.getElementById('year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
});
