// Initialize AOS Animations
AOS.init({ once: true, duration: 1000 });

// 1. Scroll Progress Bar (Optimized to prevent layout thrashing)
const scrollProgress = document.getElementById('scroll-progress');

window.addEventListener('scroll', () => {
    const totalScroll = document.documentElement.scrollTop;
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    // Calculate ratio instead of percentage string
    const scrollRatio = totalScroll / windowHeight; 
    // Apply via scaleX for GPU acceleration
    scrollProgress.style.transform = `scaleX(${scrollRatio})`;
});

// 2. Hamburger & Mobile Menu Toggle
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');
const closeMenu = document.getElementById('close-menu'); 

// Open menu
hamburger.addEventListener('click', () => {
    navLinks.classList.add('active');
});

// Close menu via 'X'
closeMenu.addEventListener('click', () => {
    navLinks.classList.remove('active');
});

// Close menu when clicking a navigation link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// 3. Reunion Countdown Logic
// Target Date: May 31, 2026 09:00:00 AM
const reunionDate = new Date("May 31, 2026 09:00:00").getTime();

const timer = setInterval(() => {
    const now = new Date().getTime();
    const distance = reunionDate - now;

    if (distance < 0) {
        clearInterval(timer);
        document.getElementById('countdown').innerHTML = "<h2 class='gold-text'>The Event is Live!</h2>";
        return;
    }

    document.getElementById('days').innerText = Math.floor(distance / (1000 * 60 * 60 * 24)).toString().padStart(2, '0');
    document.getElementById('hours').innerText = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)).toString().padStart(2, '0');
    document.getElementById('minutes').innerText = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, '0');
    document.getElementById('seconds').innerText = Math.floor((distance % (1000 * 60)) / 1000).toString().padStart(2, '0');
}, 1000);

// 4. Dynamic Gallery Injector (Updated to 187 images)
const galleryContainer = document.getElementById('dynamic-gallery');
const totalGalleryImages = 187; // Updated from 61

if (galleryContainer) {
    let galleryHTML = '';
    
    for (let i = 1; i <= totalGalleryImages; i++) {
        // Images 1-5 load instantly, 6-187 are lazy-loaded
        const loadingAttribute = (i <= 5) ? '' : 'loading="lazy"';
        
        galleryHTML += `
            <div class="masonry-item">
                <img src="assets/timeless-memories/img${i}.jpg" alt="SRKV 2006 Reunion Memory ${i}" class="gallery-img" ${loadingAttribute}>
            </div>
        `;
    }
    
    // Inject all HTML into the DOM at once
    galleryContainer.innerHTML = galleryHTML;
}

// 5. Global Lightbox Logic (Event Delegation)
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeLightbox = document.querySelector('.close-lightbox');

// We listen on the document body so dynamically added images still trigger the lightbox
document.body.addEventListener('click', (e) => {
    // If they click either a gallery image OR a tribute image
    if (e.target.classList.contains('gallery-img') || e.target.classList.contains('tribute-img')) {
        lightbox.style.display = 'flex';
        lightboxImg.src = e.target.src;
    }
});

closeLightbox.addEventListener('click', () => {
    lightbox.style.display = 'none';
});

lightbox.addEventListener('click', (e) => {
    if (e.target !== lightboxImg) {
        lightbox.style.display = 'none';
    }
});